"use client";

import { useEffect, useRef } from "react";
import styles from "./DnaPlatno.module.css";

/* ── ČASTICOVÁ DNA ────────────────────────────────────────────────────
   Tisícky bodov v tvare dvojzávitnice. Kreslia sa na plátno, nie ako
   prvky stránky — pri takomto počte by DOM prehliadač položil (presne
   to zhodilo mobilnú verziu, keď tu bolo 72 vrstiev s 3D transformáciou).
   Plátno je jedna vrstva bez ohľadu na to, koľko bodov nesie.
   ─────────────────────────────────────────────────────────────────── */

const FARBY = ["#6637ED", "#9B4BE8", "#FF3D8B", "#00C6DE", "#FF5A1F"];

/* Geometria závitnice v jej vlastných súradniciach. */
const POLOMER = 112;
const VYSKA = 680;
const ZAVITOV = 3.4;

/* Koľko bodov. Na telefóne menej — nie kvôli pamäti, ale aby sa každý
   snímok stihol vykresliť aj na slabšom procesore. */
const BODOV_VELKE = 16000;
const BODOV_MALE = 4800;

/* Do koľkých vrstiev priehľadnosti body rozdelíme. Vrstva zároveň
   znamená hĺbku, takže kreslenie po vrstvách od najvzdialenejšej
   nahrádza triedenie podľa z — a to v lineárnom čase. */
const VRSTIEV = 9;

/** Deterministický generátor — rovnaký obraz pri každom načítaní. */
function nahodne(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Bod = {
  x: number;
  y: number;
  z: number;
  farba: number;
  velkost: number;
  /** Výchylka od kurzora v rovine obrazovky — sama sa vracia späť. */
  ox: number;
  oy: number;
};

function vyrobBody(pocet: number): Bod[] {
  const r = nahodne(20260928);
  /* Súčet troch náhodných čísel dáva zvon okolo nuly — body sa tak
     zhlukujú pri závitnici a redšie sa rozptyľujú do okolia. */
  const zvon = () => (r() + r() + r() - 1.5) * 0.9;
  const body: Bod[] = [];

  for (let i = 0; i < pocet; i++) {
    const podiel = i / pocet;
    const t = r();
    const uhol = t * ZAVITOV * Math.PI * 2;
    let x: number, y: number, z: number, rozptyl: number;

    if (podiel < 0.56) {
      /* Kostra — dve vlákna oproti sebe. Tesný rozptyl, aby závitnica
         ostala čitateľná aj keď je z bodov. */
      const vlakno = i % 2 === 0 ? 0 : Math.PI;
      const u = uhol + vlakno;
      rozptyl = 6;
      x = Math.cos(u) * POLOMER;
      z = Math.sin(u) * POLOMER;
      y = (t - 0.5) * VYSKA;
    } else if (podiel < 0.8) {
      /* Priečky — body rozosiate po spojnici medzi vláknami. */
      const k = r();
      rozptyl = 4.5;
      x = Math.cos(uhol) * POLOMER * (1 - 2 * k);
      z = Math.sin(uhol) * POLOMER * (1 - 2 * k);
      y = (t - 0.5) * VYSKA;
    } else {
      /* Prach navôkol — bez neho by tvar pôsobil ako drôtený model. */
      rozptyl = 54;
      x = Math.cos(uhol) * POLOMER;
      z = Math.sin(uhol) * POLOMER;
      y = (t - 0.5) * VYSKA;
    }

    body.push({
      x: x + zvon() * rozptyl,
      y: y + zvon() * rozptyl * 0.7,
      z: z + zvon() * rozptyl,
      /* Farba sa mení pozdĺž osi, takže závitnica prechádza z fialovej
         do ružovej — nie je to náhodná zmes. */
      farba: Math.min(FARBY.length - 1, Math.floor(t * FARBY.length + zvon() * 0.6)),
      velkost: 0.7 + r() * r() * 2.1,
      ox: 0,
      oy: 0,
    });
  }
  return body;
}

export default function DnaPlatno() {
  const platno = useRef<HTMLCanvasElement>(null);
  const obal = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const c = platno.current;
    const box = obal.current;
    if (!c || !box) return;
    const ctx = c.getContext("2d", { alpha: true });
    if (!ctx) return;

    const tiche = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const male = window.matchMedia("(max-width: 900px)").matches;
    const body = vyrobBody(male ? BODOV_MALE : BODOV_VELKE);

    let sirka = 0;
    let vyska = 0;
    let mierka = 1;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const premeraj = () => {
      const r = box.getBoundingClientRect();
      sirka = Math.max(1, Math.round(r.width));
      vyska = Math.max(1, Math.round(r.height));
      c.width = Math.round(sirka * dpr);
      c.height = Math.round(vyska * dpr);
      c.style.width = sirka + "px";
      c.style.height = vyska + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      /* Závitnica sa zmestí na výšku aj na šírku, nech je box akýkoľvek. */
      mierka = Math.min(vyska / (VYSKA + 120), sirka / (POLOMER * 2 + 190));
    };
    premeraj();

    /* Kurzor držíme v súradniciach plátna. Mimo neho je -9999, takže
       žiadny bod naň nereaguje. */
    let mx = -9999;
    let my = -9999;
    const naPohyb = (e: PointerEvent) => {
      const r = c.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    };
    const naOdchod = () => {
      mx = -9999;
      my = -9999;
    };

    let vidno = true;
    const io =
      "IntersectionObserver" in window
        ? new IntersectionObserver(([e]) => (vidno = e.isIntersecting), { threshold: 0 })
        : null;
    io?.observe(box);

    const ro = "ResizeObserver" in window ? new ResizeObserver(premeraj) : null;
    ro?.observe(box);

    box.addEventListener("pointermove", naPohyb);
    box.addEventListener("pointerleave", naOdchod);

    /* Sklon dopredu a nábeh do strany — závitnica stojí pod uhlom, nie
       kolmo, tak ako na predlohe. */
    const SKLON = 0.26;
    const NAKLON = -0.3;
    const DOSAH = 118;
    const OHNISKO = 980;

    let uhol = 0;
    let posledny = performance.now();
    let ziadost = 0;

    /* Triedenie podľa hĺbky nahrádza priehradkové triedenie: každý bod
       spadne do priehradky podľa (vrstva hĺbky, farba). Priehradky potom
       kreslíme od najvzdialenejšej vrstvy po najbližšiu, takže poradie
       sedí — a fillStyle sa nastaví len raz na priehradku, nie na bod.
       Celé je to lineárne, tak uveze aj šestnásťtisíc bodov. */
    const PRIEHRADOK = VRSTIEV * FARBY.length;
    const pocty = new Int32Array(PRIEHRADOK);
    const zaciatky = new Int32Array(PRIEHRADOK + 1);
    const kos = new Int32Array(body.length);
    const dx3 = new Float32Array(body.length);
    const dy3 = new Float32Array(body.length);
    const dv3 = new Float32Array(body.length);
    const ox3 = new Float32Array(body.length);
    const oy3 = new Float32Array(body.length);
    const ov3 = new Float32Array(body.length);
    /* Farby si pripravíme aj s priehľadnosťou dopredu — skladať reťazec
       pri každom bode by bolo drahšie než samotné kreslenie. */
    const stylBody: string[] = [];
    for (let v = 0; v < VRSTIEV; v++) {
      const a = 0.16 + (v / (VRSTIEV - 1)) * 0.82;
      for (let f = 0; f < FARBY.length; f++) {
        const h = FARBY[f];
        stylBody.push(
          `rgba(${parseInt(h.slice(1, 3), 16)},${parseInt(h.slice(3, 5), 16)},${parseInt(h.slice(5, 7), 16)},${a.toFixed(3)})`,
        );
      }
    }

    const snimok = (teraz: number) => {
      ziadost = requestAnimationFrame(snimok);
      const dt = Math.min(64, teraz - posledny);
      posledny = teraz;
      if (!vidno) return;

      if (!tiche) uhol += dt * 0.00021;

      ctx.clearRect(0, 0, sirka, vyska);
      const cx = sirka / 2;
      const cy = vyska / 2;
      const cosU = Math.cos(uhol);
      const sinU = Math.sin(uhol);
      const cosS = Math.cos(SKLON);
      const sinS = Math.sin(SKLON);
      const cosN = Math.cos(NAKLON);
      const sinN = Math.sin(NAKLON);

      for (let i = 0; i < body.length; i++) {
        const b = body[i];
        /* Otočenie okolo zvislej osi. */
        const x1 = b.x * cosU + b.z * sinU;
        const z1 = -b.x * sinU + b.z * cosU;
        /* Sklon dopredu. */
        const y2 = b.y * cosS - z1 * sinS;
        const z2 = b.y * sinS + z1 * cosS;
        /* Nábeh do strany. */
        const x3 = x1 * cosN - y2 * sinN;
        const y3 = x1 * sinN + y2 * cosN;

        const k = OHNISKO / (OHNISKO + z2 * mierka);
        let px = cx + x3 * mierka * k;
        let py = cy + y3 * mierka * k;

        /* Kurzor bod odtlačí, potom sa sám vráti. Sila klesá so
           štvorcom vzdialenosti, takže dotyk je mäkký. */
        const dx = px - mx;
        const dy = py - my;
        const d2 = dx * dx + dy * dy;
        if (d2 < DOSAH * DOSAH) {
          const d = Math.sqrt(d2) || 1;
          const sila = (1 - d / DOSAH) ** 2 * 46;
          b.ox += (dx / d) * sila * 0.16;
          b.oy += (dy / d) * sila * 0.16;
        }
        b.ox *= 0.9;
        b.oy *= 0.9;
        px += b.ox;
        py += b.oy;

        dx3[i] = px;
        dy3[i] = py;
        dv3[i] = Math.max(0.4, b.velkost * k);

        /* Vrstva 0 je najďalej, posledná najbližšie. Hĺbku orežeme na
           rozsah závitnice, aby prach vzadu nespadol mimo stupnice. */
        let v = Math.round(((-z2 / 190 + 1) / 2) * (VRSTIEV - 1));
        if (v < 0) v = 0;
        else if (v > VRSTIEV - 1) v = VRSTIEV - 1;
        const k2 = v * FARBY.length + b.farba;
        kos[i] = k2;
        pocty[k2]++;
      }

      /* Prefixové súčty dajú každej priehradke jej úsek v poli, potom
         body rozsypeme na miesto. */
      let beh = 0;
      for (let q = 0; q < PRIEHRADOK; q++) {
        zaciatky[q] = beh;
        beh += pocty[q];
        pocty[q] = 0;
      }
      zaciatky[PRIEHRADOK] = beh;
      for (let i = 0; i < body.length; i++) {
        const q = kos[i];
        const poz = zaciatky[q] + pocty[q]++;
        ox3[poz] = dx3[i];
        oy3[poz] = dy3[i];
        ov3[poz] = dv3[i];
      }

      for (let q = 0; q < PRIEHRADOK; q++) {
        const od = zaciatky[q];
        const po = zaciatky[q] + pocty[q];
        if (od === po) continue;
        ctx.fillStyle = stylBody[q];
        for (let n = od; n < po; n++) {
          const v2 = ov3[n];
          ctx.fillRect(ox3[n] - v2 / 2, oy3[n] - v2 / 2, v2, v2);
        }
      }
      pocty.fill(0);
    };

    ziadost = requestAnimationFrame(snimok);

    return () => {
      cancelAnimationFrame(ziadost);
      io?.disconnect();
      ro?.disconnect();
      box.removeEventListener("pointermove", naPohyb);
      box.removeEventListener("pointerleave", naOdchod);
    };
  }, []);

  return (
    <div ref={obal} className={styles.obal}>
      <canvas ref={platno} className={styles.platno} aria-hidden />
    </div>
  );
}
