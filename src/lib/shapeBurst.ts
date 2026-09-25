/**
 * Vektorové tvary vyletujúce z textu.
 *
 * Jeden prepínač pre celý efekt — keď je false, nenaviaže sa ani jeden
 * poslucháč a na stránke nevznikne žiadny overlay.
 */
export const SHAPE_BURST_ENABLED = true;

/** Tmavá je na svetlom pozadí, svetlá na tmavom — zvyšok je značková paleta. */
const COLORS_ON_LIGHT = ["#6637ED", "#FF5A1F", "#2F6BFF", "#0E0E11"];
const COLORS_ON_DARK = ["#6637ED", "#FF5A1F", "#2F6BFF", "#F2F2F4"];

type Kind = "square" | "circle" | "squareOutline" | "circleOutline" | "bar";
const KINDS: Kind[] = ["square", "circle", "squareOutline", "circleOutline", "bar"];

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const pick = <T,>(list: readonly T[]) => list[Math.floor(Math.random() * list.length)];

/**
 * Rozhodne, či prvok sedí na tmavom podklade — čierne tvary by na ňom zanikli.
 * Ide sa po rodičoch, kým sa nenájde nepriehľadné pozadie.
 */
function isOnDark(el: Element): boolean {
  let node: Element | null = el;
  while (node && node !== document.documentElement) {
    const bg = getComputedStyle(node).backgroundColor;
    const m = bg.match(/rgba?\(([^)]+)\)/);
    if (m) {
      const [r, g, b, a = 1] = m[1].split(",").map((v) => parseFloat(v));
      if (a > 0.5) return 0.299 * r + 0.587 * g + 0.114 * b < 128;
    }
    node = node.parentElement;
  }
  return false;
}

/** Veľké nadpisy dostanú väčšie tvary, aby sa v nich nestratili. */
function sizeRange(el: Element): [number, number] {
  const fontSize = parseFloat(getComputedStyle(el).fontSize) || 16;
  if (fontSize >= 64) return [8, 20];
  if (fontSize >= 32) return [6, 15];
  return [4, 11];
}

function styleShape(node: HTMLElement, kind: Kind, size: number, color: string) {
  node.style.position = "absolute";
  node.style.left = "0";
  node.style.top = "0";
  node.style.willChange = "transform, opacity";

  if (kind === "bar") {
    node.style.width = `${size * 2.4}px`;
    node.style.height = "2px";
    node.style.background = color;
    return;
  }

  node.style.width = `${size}px`;
  node.style.height = `${size}px`;
  if (kind === "circle" || kind === "circleOutline") node.style.borderRadius = "50%";

  if (kind === "squareOutline" || kind === "circleOutline") {
    node.style.border = `1.5px solid ${color}`;
  } else {
    node.style.background = color;
  }
}

export type BurstController = { destroy: () => void };

export function initShapeBurst(): BurstController | null {
  if (!SHAPE_BURST_ENABLED) return null;
  if (typeof window === "undefined") return null;

  // Jemný efekt sa nevnucuje: bez myši a pri obmedzenom pohybe ho vynechávame.
  const fine = window.matchMedia("(pointer: fine)");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!fine.matches || reduced.matches) return null;

  const layer = document.createElement("div");
  layer.setAttribute("aria-hidden", "true");
  layer.style.cssText =
    "position:fixed;inset:0;pointer-events:none;z-index:9995;overflow:hidden;";
  document.body.appendChild(layer);

  /** Vystrelí jeden tvar z bodu (x, y) smerom preč od stredu prvku. */
  const spawn = (x: number, y: number, originX: number, originY: number, el: Element) => {
    const node = document.createElement("div");
    const kind = pick(KINDS);
    const [minSize, maxSize] = sizeRange(el);
    const size = rand(minSize, maxSize);
    const color = pick(isOnDark(el) ? COLORS_ON_DARK : COLORS_ON_LIGHT);
    styleShape(node, kind, size, color);

    // Základný smer je od stredu textu, s rozptylom ±0.7 rad.
    const base = Math.atan2(y - originY, x - originX) || rand(-Math.PI, Math.PI);
    const angle = base + rand(-0.7, 0.7);
    const distance = rand(30, 170);
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance - rand(10, 34); // mierne nahor
    const spin = rand(-180, 180);

    layer.appendChild(node);
    const animation = node.animate(
      [
        { transform: `translate(${x}px, ${y}px) scale(0) rotate(0deg)`, opacity: 0 },
        {
          transform: `translate(${x + dx * 0.25}px, ${y + dy * 0.25}px) scale(1) rotate(${spin * 0.25}deg)`,
          opacity: 1,
          offset: 0.2,
        },
        {
          transform: `translate(${x + dx}px, ${y + dy}px) scale(.4) rotate(${spin}deg)`,
          opacity: 0,
        },
      ],
      { duration: rand(700, 1300), easing: "cubic-bezier(.2,.8,.2,1)", fill: "forwards" },
    );
    animation.onfinish = () => node.remove();
    animation.oncancel = () => node.remove();
  };

  /** Výbuch z celej plochy prvku — body sa rozsypú po jeho obvode. */
  const burst = (el: Element, count: number) => {
    const rect = el.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    for (let i = 0; i < count; i++) {
      const x = rand(rect.left, rect.right);
      const y = rand(rect.top, rect.bottom);
      spawn(x, y, cx, cy, el);
    }
  };

  const lastBurst = new WeakMap<Element, number>();
  const THROTTLE_MS = 700;

  const onOver = (e: PointerEvent) => {
    const el = (e.target as Element | null)?.closest?.("[data-fx]");
    if (!el) return;
    const now = performance.now();
    if (now - (lastBurst.get(el) ?? -Infinity) < THROTTLE_MS) return;
    lastBurst.set(el, now);
    burst(el, Math.round(rand(14, 16)));
  };

  // Pri ťahaní myšou nad prvkom sype tvary priamo z kurzora.
  let lastTrail = 0;
  const TRAIL_MS = 80;
  const onMove = (e: PointerEvent) => {
    const el = (e.target as Element | null)?.closest?.("[data-fx]");
    if (!el) return;
    const now = performance.now();
    if (now - lastTrail < TRAIL_MS) return;
    lastTrail = now;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    spawn(e.clientX, e.clientY, cx, cy, el);
    spawn(e.clientX, e.clientY, cx, cy, el);
  };

  window.addEventListener("pointerover", onOver, { passive: true });
  window.addEventListener("pointermove", onMove, { passive: true });

  // Hlavný nadpis si sám od seba každé ~4 s cvrnkne pár tvarov.
  const idle = window.setInterval(() => {
    if (document.hidden) return;
    const hero = document.querySelector("[data-fx-idle]");
    if (!hero) return;
    const rect = hero.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;
    burst(hero, Math.round(rand(6, 7)));
  }, 4000);

  return {
    destroy: () => {
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointermove", onMove);
      window.clearInterval(idle);
      layer.remove();
    },
  };
}
