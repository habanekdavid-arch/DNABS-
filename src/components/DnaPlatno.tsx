"use client";

import { useEffect, useRef } from "react";
import styles from "./DnaPlatno.module.css";

/* ── ČASTICOVÁ DNA ────────────────────────────────────────────────────
   Tisícky bodov v tvare dvojzávitnice. Kreslia sa na plátno, nie ako
   prvky stránky — pri takomto počte by DOM prehliadač položil (presne
   to zhodilo mobilnú verziu, keď tu bolo 72 vrstiev s 3D transformáciou).
   Plátno je jedna vrstva bez ohľadu na to, koľko bodov nesie.

   Keď návštevník prejde po niektorej kartičke vedľa, závitnica sa na to
   naladí: stiahne sa alebo rozšíri, inak sa skrúti a prefarbí. Po
   odchode sa plynule vráti do pokoja.
   ─────────────────────────────────────────────────────────────────── */

const FARBY = ["#6637ED", "#9B4BE8", "#FF3D8B", "#00C6DE", "#FF5A1F"];

const POLOMER = 112;
const VYSKA = 680;
const ZAVITOV = 3.4;

const BODOV_VELKE = 16000;
const BODOV_MALE = 4800;

/* Do koľkých vrstiev priehľadnosti body rozdelíme. Vrstva zároveň
   znamená hĺbku, takže kreslenie po vrstvách od najvzdialenejšej
   nahrádza triedenie podľa z — a to v lineárnom čase. */
const VRSTIEV = 9;

/* Závitnicu delíme na vodorovné pásy. Skrútenie aj rozvlnenie závisia od
   výšky, takže stačí spočítať sínus a kosínus raz na pás — nie na každý
   z šestnástich tisíc bodov. */
const PASOV = 72;

/** Ako sa závitnica zachová pri jednotlivých kartičkách. */
export type Ucinok = { tvar: number; farba: string } | null;

const TVARY = [
  /* Pri „rýchlosti" sa závitnica stiahne, zatočí a roztočí sa citeľne
     rýchlejšie — na tom je tá kartička celá postavená. */
  { roztiahnutie: -0.3, krut: 1.6, vlna: 4, rychlost: 3.4 },
  { roztiahnutie: 0.42, krut: -0.7, vlna: 12, rychlost: 0.75 }, // rozostúpi sa
  { roztiahnutie: 0.1, krut: 0.5, vlna: 30, rychlost: 1.15 }, // rozvlní sa
  { roztiahnutie: 0.26, krut: 2.3, vlna: 8, rychlost: 1.5 }, // pevne sa zovrie
];
const POKOJ = { roztiahnutie: 0, krut: 0, vlna: 0, rychlost: 1 };

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

const naRGB = (h: string): [number, number, number] => [
  parseInt(h.slice(1, 3), 16),
  parseInt(h.slice(3, 5), 16),
  parseInt(h.slice(5, 7), 16),
];

type Bod = {
  x: number;
  y: number;
  z: number;
  pas: number;
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
      /* Kostra — dve vlákna oproti sebe. */
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

    const yv = y + zvon() * rozptyl * 0.7;
    let pas = Math.round((yv / VYSKA + 0.5) * (PASOV - 1));
    if (pas < 0) pas = 0;
    else if (pas > PASOV - 1) pas = PASOV - 1;

    body.push({
      x: x + zvon() * rozptyl,
      y: yv,
      z: z + zvon() * rozptyl,
      pas,
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

export default function DnaPlatno({ ucinok }: { ucinok?: Ucinok }) {
  const platno = useRef<HTMLCanvasElement>(null);
  const obal = useRef<HTMLDivElement>(null);
  /* Cez ref, nie cez závislosť efektu — inak by sa pri každom prejdení
     myšou celá scéna postavila nanovo a body by odskočili. */
  const ucinokRef = useRef<Ucinok>(null);
  ucinokRef.current = ucinok ?? null;

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
      /* Závitnica sa zmestí na výšku aj na šírku, nech je box akýkoľvek.
         Rátame s tým, že sa môže rozšíriť, nech pri účinku nepresahuje. */
      mierka = Math.min(vyska / (VYSKA + 120), sirka / (POLOMER * 2.9 + 150));
    };
    premeraj();

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

    const SKLON = 0.26;
    const NAKLON = -0.3;
    const DOSAH = 118;
    const OHNISKO = 980;

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

    /* Pásy: kosínus, sínus a rozťah sa počítajú raz na pás. */
    const pasCos = new Float32Array(PASOV);
    const pasSin = new Float32Array(PASOV);
    const pasRoz = new Float32Array(PASOV);

    const zakladRGB = FARBY.map(naRGB);
    let stylBody: string[] = [];
    let stylTon = -1;
    let stylFarba = "";
    /* Farby aj s priehľadnosťou si pripravíme dopredu — skladať reťazec
       pri každom bode by bolo drahšie než samotné kreslenie. Prepočítajú
       sa, len keď sa odtieň viditeľne pohne. */
    const prepocitajStyly = (ton: number, akcent: string) => {
      const a2 = akcent ? naRGB(akcent) : null;
      const nove: string[] = [];
      for (let v = 0; v < VRSTIEV; v++) {
        const a = 0.16 + (v / (VRSTIEV - 1)) * 0.82;
        for (let f = 0; f < FARBY.length; f++) {
          const z = zakladRGB[f];
          const r = a2 ? Math.round(z[0] + (a2[0] - z[0]) * ton) : z[0];
          const g = a2 ? Math.round(z[1] + (a2[1] - z[1]) * ton) : z[1];
          const b2 = a2 ? Math.round(z[2] + (a2[2] - z[2]) * ton) : z[2];
          nove.push(`rgba(${r},${g},${b2},${a.toFixed(3)})`);
        }
      }
      stylBody = nove;
    };
    prepocitajStyly(0, "");

    /* Aktuálny stav sa k cieľu len približuje, nikdy naň neskočí — vďaka
       tomu sa závitnica pri odchode myši plynule vráti. */
    const akt = { roztiahnutie: 0, krut: 0, vlna: 0, ton: 0, rychlost: 1 };
    let poslednyAkcent = FARBY[0];

    let uhol = 0;
    let cas = 0;
    let posledny = performance.now();
    let ziadost = 0;

    const snimok = (teraz: number) => {
      ziadost = requestAnimationFrame(snimok);
      const dt = Math.min(64, teraz - posledny);
      posledny = teraz;
      if (!vidno) return;

      const u = ucinokRef.current;
      const ciel = u ? TVARY[u.tvar % TVARY.length] : POKOJ;
      const cielTon = u ? 1 : 0;
      if (u) poslednyAkcent = u.farba;

      /* Exponenciálne dobiehanie — nezávislé od počtu snímkov. */
      const k = 1 - Math.pow(0.0016, dt / 1000);
      akt.roztiahnutie += (ciel.roztiahnutie - akt.roztiahnutie) * k;
      akt.krut += (ciel.krut - akt.krut) * k;
      akt.vlna += (ciel.vlna - akt.vlna) * k;
      akt.ton += (cielTon - akt.ton) * k;
      akt.rychlost += (ciel.rychlost - akt.rychlost) * k;

      /* Otáčanie posúvame až po dobehnutí, nech sa zrýchlenie nabehne
         plynule a nie skokom. */
      if (!tiche) {
        uhol += dt * 0.00021 * akt.rychlost;
        cas += dt * 0.0016 * akt.rychlost;
      }

      const tonKrok = Math.round(akt.ton * 24) / 24;
      if (tonKrok !== stylTon || poslednyAkcent !== stylFarba) {
        prepocitajStyly(tonKrok, poslednyAkcent);
        stylTon = tonKrok;
        stylFarba = poslednyAkcent;
      }

      ctx.clearRect(0, 0, sirka, vyska);
      const cx = sirka / 2;
      const cy = vyska / 2;
      const cosS = Math.cos(SKLON);
      const sinS = Math.sin(SKLON);
      const cosN = Math.cos(NAKLON);
      const sinN = Math.sin(NAKLON);

      for (let p = 0; p < PASOV; p++) {
        const podiel = p / (PASOV - 1) - 0.5;
        const up = uhol + akt.krut * podiel;
        pasCos[p] = Math.cos(up);
        pasSin[p] = Math.sin(up);
        pasRoz[p] =
          1 + akt.roztiahnutie + (akt.vlna / POLOMER) * Math.sin(podiel * 9 + cas);
      }

      for (let i = 0; i < body.length; i++) {
        const b = body[i];
        const cU = pasCos[b.pas];
        const sU = pasSin[b.pas];
        const rz = pasRoz[b.pas];
        /* Otočenie okolo zvislej osi, zároveň rozťah do strán. */
        const x1 = (b.x * cU + b.z * sU) * rz;
        const z1 = (-b.x * sU + b.z * cU) * rz;
        const y2 = b.y * cosS - z1 * sinS;
        const z2 = b.y * sinS + z1 * cosS;
        const x3 = x1 * cosN - y2 * sinN;
        const y3 = x1 * sinN + y2 * cosN;

        const kp = OHNISKO / (OHNISKO + z2 * mierka);
        let px = cx + x3 * mierka * kp;
        let py = cy + y3 * mierka * kp;

        /* Kurzor bod odtlačí, potom sa sám vráti. Sila klesá so
           štvorcom vzdialenosti, takže dotyk je mäkký. */
        const ddx = px - mx;
        const ddy = py - my;
        const d2 = ddx * ddx + ddy * ddy;
        if (d2 < DOSAH * DOSAH) {
          const d = Math.sqrt(d2) || 1;
          const sila = (1 - d / DOSAH) ** 2 * 46;
          b.ox += (ddx / d) * sila * 0.16;
          b.oy += (ddy / d) * sila * 0.16;
        }
        b.ox *= 0.9;
        b.oy *= 0.9;
        px += b.ox;
        py += b.oy;

        dx3[i] = px;
        dy3[i] = py;
        dv3[i] = Math.max(0.4, b.velkost * kp);

        /* Vrstva 0 je najďalej, posledná najbližšie. */
        let v = Math.round(((-z2 / 190 + 1) / 2) * (VRSTIEV - 1));
        if (v < 0) v = 0;
        else if (v > VRSTIEV - 1) v = VRSTIEV - 1;
        const k2 = v * FARBY.length + b.farba;
        kos[i] = k2;
        pocty[k2]++;
      }

      /* Priehradkové triedenie: prefixové súčty dajú každej priehradke
         jej úsek, potom body rozsypeme na miesto. */
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
