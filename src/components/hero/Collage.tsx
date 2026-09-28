"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { PROJEKTY, AUTO_PREPNUTIE_MS, type KartaKolaze, type Projekt } from "@/data/hlavicka";
import Laptop from "./Laptop";
import styles from "./Collage.module.css";

/** Bez myši a pri obmedzenom pohybe hover nerobíme vôbec. */
function jemnyUkazovatel() {
  return window.matchMedia("(pointer: fine)").matches
    && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const DESIGN_W = 1040;
const DESIGN_H = 680;

/** Každý typ prvku reaguje na kurzor inak. */
type Hover = "tilt" | "lift" | "pop" | "tag" | "laptop" | "znacka";

/**
 * Každý typ karty má vlastný hover. Obrázky sa rozlišujú podľa poradia
 * medzi obrázkami (nie medzi všetkými kartami) — inak by sa varianty
 * posunuli vždy, keď do koláže pribudne štítok alebo logo.
 */
function hoverPreKartu(karta: KartaKolaze, obrazokPoradie: number): Hover {
  if (karta.typ === "notebook") return "laptop";
  if (karta.typ === "stitok") return "tag";
  if (karta.typ === "logo") return "znacka";
  // Prvý obrázok je široký, druhý vysoký, tretí menší.
  return (["tilt", "lift", "pop"] as const)[Math.min(obrazokPoradie, 2)] ?? "tilt";
}

/**
 * Zloží transform pre daný hover. Posun a otočenie karty (`base`) musia
 * ostať, inak by prvok odskočil z miesta.
 */
function hoverTransform(variant: Hover, posun: string, otocenie: string, px: number, py: number) {
  switch (variant) {
    // Nakláňa sa za kurzorom.
    case "tilt":
      return `${posun} ${otocenie} translateZ(70px) scale(1.05)`
        + ` rotateX(${(0.5 - py) * 20}deg) rotateY(${(px - 0.5) * 20}deg)`;
    // Zdvihne sa priamo hore a mierne sa narovná.
    case "lift":
      return `${posun} translateZ(100px) translateY(-20px) scale(1.06) rotateZ(0deg)`;
    // Vyskočí a vyrovná sa.
    case "pop":
      return `${posun} translateZ(70px) scale(1.14) rotateZ(0deg)`;
    // Logo sa narovná a jemne priblíži — nič viac, je to značka klienta.
    case "znacka":
      return `${posun} translateZ(80px) scale(1.07) rotateZ(0deg)`;
    // Štítok sa len priblíži.
    case "tag":
      return `${posun} ${otocenie} translateZ(90px) scale(1.12)`;
    // Notebook sa jemne priblíži, zvyšok rieši otvorenie veka v CSS.
    case "laptop":
      return `${posun} ${otocenie} translateZ(45px) scale(1.03)`;
  }
}

export default function Collage() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [zoom, setZoom] = useState<{ projekt: Projekt; from: DOMRect } | null>(null);

  const viewportRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const go = useCallback((delta: number) => {
    setIndex((i) => (i + delta + PROJEKTY.length) % PROJEKTY.length);
  }, []);

  /* Scéna sa zmenší podľa kontajnera a natáča sa za myšou. */
  useEffect(() => {
    const viewport = viewportRef.current;
    const stage = stageRef.current;
    if (!viewport || !stage) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    let scale = 1;
    const resize = () => {
      const { width, height } = viewport.getBoundingClientRect();
      scale = Math.min(width / DESIGN_W, height / DESIGN_H);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(viewport);

    // Bez naklápania stačí jeden prepočet — scéna sa nehýbe.
    if (reduced || coarse) {
      const apply = () => { stage.style.transform = `scale(${scale})`; };
      apply();
      const ro = new ResizeObserver(apply);
      ro.observe(viewport);
      return () => { observer.disconnect(); ro.disconnect(); };
    }

    let targetX = 0, targetY = 0, x = 0, y = 0, frame = 0;
    const onMove = (e: MouseEvent) => {
      const rect = viewport.getBoundingClientRect();
      targetX = (e.clientX - rect.left) / rect.width - 0.5;
      targetY = (e.clientY - rect.top) / rect.height - 0.5;
    };
    const tick = () => {
      x += (targetX - x) * 0.06;
      y += (targetY - y) * 0.06;
      stage.style.transform = `scale(${scale}) rotateX(${-y * 8}deg) rotateY(${x * 12}deg)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    viewport.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      viewport.removeEventListener("mousemove", onMove);
      observer.disconnect();
    };
  }, []);

  /* Automatické prepínanie — stojí, kým je myš nad kolážou alebo beží zoom. */
  useEffect(() => {
    if (!AUTO_PREPNUTIE_MS || paused || zoom) return;
    const timer = window.setTimeout(() => go(1), AUTO_PREPNUTIE_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused, zoom, go]);

  return (
    <div
      className={styles.wrap}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div ref={viewportRef} className={styles.viewport}>
        <div ref={stageRef} className={styles.stage}>
          {PROJEKTY.map((projekt, i) => (
            <ProjectLayer
              key={projekt.nazov}
              projekt={projekt}
              active={i === index}
              onZoom={(from) => setZoom({ projekt, from })}
            />
          ))}
        </div>
      </div>

      {PROJEKTY[index].tagline && (
        <p className={styles.tagline}>{PROJEKTY[index].tagline}</p>
      )}

      <div className={styles.controls}>
        <button type="button" className={`${styles.navBtn} ${styles.prev}`} onClick={() => go(-1)} aria-label="Predchádzajúca realizácia">←</button>
        <span className={styles.counter} aria-live="polite">
          {String(index + 1).padStart(2, "0")} / {String(PROJEKTY.length).padStart(2, "0")}
        </span>
        <button type="button" className={`${styles.navBtn} ${styles.next}`} onClick={() => go(1)} aria-label="Ďalšia realizácia">→</button>
      </div>

      {zoom && <ZoomOverlay projekt={zoom.projekt} from={zoom.from} onDone={() => setZoom(null)} />}
    </div>
  );
}

/* ── Jedna vrstva koláže ─────────────────────────────────────────────── */

function ProjectLayer({ projekt, active, onZoom }:
  { projekt: Projekt; active: boolean; onZoom: (from: DOMRect) => void }) {
  // Keď má projekt logo priamo v koláži, na paneli ho už neopakujeme —
  // panel ostane čistou plochou vo firemnej farbe.
  const logoVKolazi = projekt.karty.some((k) => k.typ === "logo");

  return (
    <div className={`${styles.project} ${active ? styles.projectActive : ""}`} aria-hidden={!active}>
      <div
        className={styles.panel}
        style={{ background: projekt.farba, boxShadow: `0 50px 90px -40px ${projekt.farba}` }}
      >
        {!logoVKolazi && (projekt.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={projekt.logo} alt={`Logo ${projekt.nazov}`} className={styles.panelLogo} />
        ) : (
          <>
            <span className={styles.logoSlot} aria-hidden>+ logo (svg)</span>
            <span className={styles.panelName}>{projekt.nazov}</span>
          </>
        ))}
        <span className={styles.panelMeta}>{projekt.popis}</span>
      </div>

      {(() => {
        let obrazok = 0;
        return projekt.karty.map((karta, i) => {
          const poradie = karta.typ === "obrazok" || karta.typ === "video" ? obrazok++ : -1;
          return (
            <Card key={i} karta={karta} order={i} obrazokPoradie={poradie}
                  active={active} projekt={projekt} onZoom={onZoom} />
          );
        });
      })()}
    </div>
  );
}

function Card({ karta, order, obrazokPoradie, active, projekt, onZoom }:
  { karta: KartaKolaze; order: number; obrazokPoradie: number; active: boolean;
    projekt: Projekt; onZoom: (from: DOMRect) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const posun = `translate3d(${karta.x}px, ${karta.y}px, ${karta.z ?? 80}px)`;
  const otocenie = `rotateZ(${karta.rot ?? 0}deg)`;
  const base = `${posun} ${otocenie}`;
  const variant = hoverPreKartu(karta, obrazokPoradie);

  // Nábeh: karty prichádzajú postupne zdola.
  const style = {
    transform: active ? base : `${base} translateY(40px)`,
    transitionDelay: active ? `${order * 70}ms` : "0ms",
    ...(karta.typ === "obrazok" || karta.typ === "video" || karta.typ === "logo"
      ? { width: karta.w, height: karta.h } : {}),
    "--znacka": projekt.farba,
  } as React.CSSProperties;

  // Každá karta pláva inak — inak by sa celá koláž hojdala ako jeden kus.
  const floatStyle = {
    "--trvanie": `${5.4 + order * 0.9}s`,
    "--posun": `${order * -0.7}s`,
    "--dy": `${order % 2 === 0 ? -11 : -7}px`,
    "--dx": `${order % 2 === 0 ? 4 : -5}px`,
    "--rot": `${order % 2 === 0 ? 0.9 : -1.1}deg`,
  } as React.CSSProperties;

  const onEnter = () => {
    if (!ref.current) return;
    if (!jemnyUkazovatel()) return;
    // Varianty bez sledovania kurzora stačí nastaviť raz.
    if (variant !== "tilt") ref.current.style.transform = hoverTransform(variant, posun, otocenie, .5, .5);
  };
  const onMove = (e: React.MouseEvent) => {
    if (!ref.current || !jemnyUkazovatel()) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    if (variant === "tilt") {
      ref.current.style.transform = hoverTransform(variant, posun, otocenie, px, py);
      ref.current.style.setProperty("--mx", `${px * 100}%`);
      ref.current.style.setProperty("--my", `${py * 100}%`);
    }
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = base; };

  if (karta.typ === "notebook") {
    return (
      <div ref={ref} className={`${styles.card} ${styles.laptopSlot} ${styles.hoverLaptop}`} style={style}
           onMouseEnter={onEnter} onMouseMove={onMove} onMouseLeave={onLeave}>
        <button type="button" className={styles.laptopCard}
                onClick={(e) => {
                  const screen = e.currentTarget.querySelector('[class*="screen"]');
                  onZoom((screen ?? e.currentTarget).getBoundingClientRect());
                }}
                aria-label={`Otvoriť web ${projekt.nazov}`}>
          <span className={styles.openBtn} aria-hidden>
            <span className={styles.openDot} />
            Otvoriť web ↗
          </span>
          <span className={styles.float} style={floatStyle}>
            <span className={styles.laptopScale}>
              <Laptop screenshot={karta.screenshot} alt={karta.alt} />
            </span>
          </span>
        </button>
      </div>
    );
  }

  if (karta.typ === "logo") {
    return (
      <div ref={ref} className={`${styles.card} ${styles.hoverZnacka}`} style={style}
           onMouseEnter={onEnter} onMouseMove={onMove} onMouseLeave={onLeave}>
        <span className={styles.float} style={floatStyle}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={karta.src} alt={karta.alt} className={styles.znackaLogo} />
        </span>
      </div>
    );
  }

  if (karta.typ === "stitok") {
    return (
      <div ref={ref} className={`${styles.card} ${styles.hoverTag}`} style={style}
           onMouseEnter={onEnter} onMouseMove={onMove} onMouseLeave={onLeave}>
        <span className={styles.float} style={floatStyle}>
          <span className={styles.tag}>{karta.text}</span>
        </span>
      </div>
    );
  }

  const hoverTrieda = variant === "lift" ? styles.hoverLift
    : variant === "pop" ? styles.hoverPop : styles.hoverTilt;

  return (
    <div ref={ref} className={`${styles.card} ${hoverTrieda}`} style={style}
         onMouseEnter={onEnter} onMouseMove={onMove} onMouseLeave={onLeave}>
      <span className={styles.float} style={floatStyle}>
      <div className={styles.media}>
        {karta.typ === "video" ? (
          <>
            <video src={karta.src} poster={karta.poster} muted loop playsInline aria-label={karta.alt} />
            <span className={styles.play} aria-hidden>▶</span>
          </>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={karta.src} alt={karta.alt} loading="lazy" />
        )}
        <span className={styles.sheen} aria-hidden />
      </div>
      </span>
    </div>
  );
}

/* ── Zoom pri kliknutí na notebook ───────────────────────────────────── */

/**
 * Let dovnútra notebooku. Rám sa spustí presne tam, kde je displej na
 * stránke, roztiahne sa cez celé okno a potom sa prejde na stránku
 * s prezentáciou projektu.
 */
function ZoomOverlay({ projekt, from, onDone }:
  { projekt: Projekt; from: DOMRect; onDone: () => void }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const notebook = projekt.karty.find((k) => k.typ === "notebook");
  // Keď je vyplnené klikNa, ide sa tam; inak na stránku projektu.
  const cielova = projekt.klikNa || `/realizacie/${projekt.slug}`;
  const jeExterny = /^https?:\/\//.test(cielova);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      if (jeExterny) window.location.href = cielova;
      else router.push(cielova);
      return;
    }

    const raf = requestAnimationFrame(() => setOpen(true));
    // Prejdeme až keď je obrazovka roztiahnutá — prechod tak plynie ďalej.
    const goTimer = window.setTimeout(() => {
      if (jeExterny) window.location.href = cielova;
      else router.push(cielova);
    }, 900);
    const doneTimer = window.setTimeout(onDone, 1500);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(goTimer);
      window.clearTimeout(doneTimer);
    };
  }, [router, cielova, jeExterny, onDone]);

  // Štart presne na displeji notebooku, cieľ cez celé okno.
  const frameStyle: React.CSSProperties = open
    ? { left: 0, top: 0, width: "100vw", height: "100vh", borderRadius: 0, padding: 0 }
    : { left: from.left, top: from.top, width: from.width, height: from.height };

  return (
    <div className={styles.overlay} role="status" aria-live="polite">
      <div className={`${styles.backdrop} ${open ? styles.backdropOn : ""}`} />
      <div className={styles.zoomFrame} style={frameStyle}>
        {notebook?.typ === "notebook" && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={notebook.screenshot} alt={notebook.alt} />
        )}
      </div>
      <div className={`${styles.opening} ${open ? styles.openingOn : ""}`}>
        Otváram {projekt.nazov}
        <div className={styles.progress}>
          <div className={`${styles.progressBar} ${open ? styles.progressOn : ""}`} />
        </div>
      </div>
    </div>
  );
}
