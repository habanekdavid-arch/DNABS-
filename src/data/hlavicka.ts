/* ══════════════════════════════════════════════════════════════════════
   OBSAH VRCHNEJ ČASTI WEBU — navigácia, hero a koláž realizácií.

   Toto je jediný súbor, ktorý treba upravovať. Mení sa tu text, farby,
   odkazy aj rozloženie kariet v koláži.

   Obrázky sa nahrávajú do  public/realizacie/  a odkazuje sa na ne
   cestou "/realizacie/nazov-suboru.jpg".
   ══════════════════════════════════════════════════════════════════════ */

/* ── NAVIGÁCIA ──────────────────────────────────────────────────────────
   Odkazy musia sedieť so sekciami, ktoré na stránke naozaj sú.
   Aktuálne existujú: #sluzby #ako-to-funguje #realizacia #pre-koho
   #referencie #o-nas #faq #kontakt
   ─────────────────────────────────────────────────────────────────────── */

export const NAV_LINKS = [
  { label: "Služby", href: "#sluzby" },
  { label: "Ako to funguje", href: "#ako-to-funguje" },
  { label: "Realizácie", href: "#realizacia" },
  { label: "O nás", href: "#o-nas" },
] as const;

export const NAV_CTA = { label: "Začať projekt", href: "#kontakt" };

/** Logo v navigácii. Nahrajte SVG do public/ a cestu zadajte sem.
 *  Kým je prázdne, zobrazí sa nápis DNABS. */
export const NAV_LOGO = "/logo.svg";

/* ── HERO ───────────────────────────────────────────────────────────── */

export const HERO = {
  nadpis: "Digitálna DNA vašej značky.",
  podnadpis:
    "Robíme webstránky, aplikácie a reklamu na internete. Vy nám poviete, čo potrebujete — my sa postaráme o zvyšok, aby vás zákazníci našli a ozvali sa.",
  tlacidloHlavne: { label: "Kontaktujte nás", href: "#kontakt" },
  tlacidloVedlajsie: { label: "Realizácie", href: "#realizacia" },
};

/* ── KOLÁŽ REALIZÁCIÍ ───────────────────────────────────────────────────

   Každý projekt je jedna „vrstva" koláže. Prepína sa šípkami alebo sa
   po 6,5 sekundy prepne sám. Kliknutie na notebook otvorí stránku
   s prezentáciou projektu na /realizacie/<slug>.

   Súradnice kariet (x, y, w, h) sú v pixeloch na návrhovej ploche
   1000 × 640 px. Tá sa celá zmenší podľa veľkosti okna, takže
   rozloženie ostane rovnaké na každej obrazovke.

   Typy kariet:
     { typ: "obrazok",  src, alt }          — fotka alebo grafika
     { typ: "video",    src, poster, alt }  — video s play tlačidlom
     { typ: "stitok",   text }              — sklenený štítok
     { typ: "notebook", screenshot, alt }   — 3D notebook so screenshotom

   Notebook má byť v každom projekte najviac jeden.
   ─────────────────────────────────────────────────────────────────────── */

export type KartaKolaze =
  | { typ: "obrazok"; x: number; y: number; w: number; h: number; z?: number; rot?: number; src: string; alt: string }
  | { typ: "video"; x: number; y: number; w: number; h: number; z?: number; rot?: number; src: string; poster?: string; alt: string }
  | { typ: "stitok"; x: number; y: number; z?: number; rot?: number; text: string }
  | { typ: "notebook"; x: number; y: number; z?: number; rot?: number; screenshot: string; alt: string };

/** Jedna ukážka na stránke projektu — obrázok s popisom. */
export type UkazkaProjektu = { src: string; alt: string; popis?: string };

export type Projekt = {
  /** Časť adresy: /realizacie/<slug>. Iba malé písmená a pomlčky. */
  slug: string;
  nazov: string;
  /** Farba panela značky. Pokojne firemná farba klienta. */
  farba: string;
  /** Adresa živého webu — otvorí sa zo stránky projektu. */
  href: string;
  /** Kam vedie kliknutie na notebook. Prázdne = stránka projektu
   *  /realizacie/<slug>. Dá sa sem dať aj plná adresa (https://…). */
  klikNa?: string;
  /** Logo klienta — priehľadné SVG alebo PNG. Nepovinné. */
  logo?: string;
  /** Krátky riadok pod logom, napr. "2026 — Web a branding". */
  popis: string;
  /** Veta do koláže vedľa realizácie. */
  tagline: string;
  /** Odstavce na stránke projektu. */
  text: string[];
  /** Čo sme pre klienta spravili — odrážky. */
  sluzby: string[];
  /** Ukážky na stránke projektu. Sem pribúdajú nahraté obrázky. */
  ukazky: UkazkaProjektu[];
  karty: KartaKolaze[];
};

export const PROJEKTY: Projekt[] = [
  {
    slug: "clever",
    nazov: "CLEVER",
    farba: "#6637ED",              // TODO: firemná farba klienta
    href: "",                       // TODO: adresa živého webu
    klikNa: "",                     // TODO: kam vedie klik na notebook (prázdne = stránka projektu)
    logo: "",                       // TODO: /realizacie/clever-logo.svg
    popis: "2026 — Web",            // TODO
    tagline: "",                    // TODO: jedna veta o projekte
    text: [],                       // TODO: odstavce na stránku projektu
    sluzby: [],                     // TODO: čo ste pre klienta spravili
    ukazky: [],                     // TODO: obrázky do galérie
    karty: [
      { typ: "notebook", x: 20, y: 165, z: 90, rot: -3, screenshot: "/realizacie/clever-web.svg", alt: "Web CLEVER" },
      // miesto 1 — siroke (320×205)
      { typ: "obrazok", x: 690, y: 55, w: 320, h: 205, z: 150, rot: 3, src: "/realizacie/clever-1.svg", alt: "CLEVER — ukážka 1" },
      // miesto 2 — vysoke (250×330)
      { typ: "obrazok", x: 735, y: 300, w: 250, h: 330, z: 120, rot: -2, src: "/realizacie/clever-2.svg", alt: "CLEVER — ukážka 2" },
      // miesto 3 — male (215×150)
      { typ: "obrazok", x: 410, y: 470, w: 215, h: 150, z: 100, rot: 2, src: "/realizacie/clever-3.svg", alt: "CLEVER — ukážka 3" },
      { typ: "stitok", x: 430, y: 62, z: 150, rot: -2, text: "Nový web" },
      { typ: "stitok", x: 455, y: 385, z: 150, rot: 3, text: "Foto produktov" },
    ],
  },
  {
    slug: "mnam",
    nazov: "MŇAM",
    farba: "#404EE6",              // TODO: firemná farba klienta
    href: "",                       // TODO: adresa živého webu
    klikNa: "",                     // TODO: kam vedie klik na notebook (prázdne = stránka projektu)
    logo: "",                       // TODO: /realizacie/mnam-logo.svg
    popis: "2026 — Web",            // TODO
    tagline: "",                    // TODO: jedna veta o projekte
    text: [],                       // TODO: odstavce na stránku projektu
    sluzby: [],                     // TODO: čo ste pre klienta spravili
    ukazky: [],                     // TODO: obrázky do galérie
    karty: [
      { typ: "notebook", x: 20, y: 165, z: 90, rot: -3, screenshot: "/realizacie/mnam-web.svg", alt: "Web MŇAM" },
      // miesto 1 — siroke (320×205)
      { typ: "obrazok", x: 690, y: 55, w: 320, h: 205, z: 150, rot: 3, src: "/realizacie/mnam-1.svg", alt: "MŇAM — ukážka 1" },
      // miesto 2 — vysoke (250×330)
      { typ: "obrazok", x: 735, y: 300, w: 250, h: 330, z: 120, rot: -2, src: "/realizacie/mnam-2.svg", alt: "MŇAM — ukážka 2" },
      // miesto 3 — male (215×150)
      { typ: "obrazok", x: 410, y: 470, w: 215, h: 150, z: 100, rot: 2, src: "/realizacie/mnam-3.svg", alt: "MŇAM — ukážka 3" },
      { typ: "stitok", x: 430, y: 62, z: 150, rot: -2, text: "Nový web" },
      { typ: "stitok", x: 455, y: 385, z: 150, rot: 3, text: "Foto produktov" },
    ],
  },
  {
    slug: "happyhour",
    nazov: "HAPPYHOUR",
    farba: "#FF5A1F",              // TODO: firemná farba klienta
    href: "",                       // TODO: adresa živého webu
    klikNa: "",                     // TODO: kam vedie klik na notebook (prázdne = stránka projektu)
    logo: "",                       // TODO: /realizacie/happyhour-logo.svg
    popis: "2026 — Web",            // TODO
    tagline: "",                    // TODO: jedna veta o projekte
    text: [],                       // TODO: odstavce na stránku projektu
    sluzby: [],                     // TODO: čo ste pre klienta spravili
    ukazky: [],                     // TODO: obrázky do galérie
    karty: [
      { typ: "notebook", x: 20, y: 165, z: 90, rot: -3, screenshot: "/realizacie/happyhour-web.svg", alt: "Web HAPPYHOUR" },
      // miesto 1 — siroke (320×205)
      { typ: "obrazok", x: 690, y: 55, w: 320, h: 205, z: 150, rot: 3, src: "/realizacie/happyhour-1.svg", alt: "HAPPYHOUR — ukážka 1" },
      // miesto 2 — vysoke (250×330)
      { typ: "obrazok", x: 735, y: 300, w: 250, h: 330, z: 120, rot: -2, src: "/realizacie/happyhour-2.svg", alt: "HAPPYHOUR — ukážka 2" },
      // miesto 3 — male (215×150)
      { typ: "obrazok", x: 410, y: 470, w: 215, h: 150, z: 100, rot: 2, src: "/realizacie/happyhour-3.svg", alt: "HAPPYHOUR — ukážka 3" },
      { typ: "stitok", x: 430, y: 62, z: 150, rot: -2, text: "Nový web" },
      { typ: "stitok", x: 455, y: 385, z: 150, rot: 3, text: "Foto produktov" },
    ],
  },
  {
    slug: "omrvinka",
    nazov: "OMRVINKA",
    farba: "#C2410C",              // TODO: firemná farba klienta
    href: "",                       // TODO: adresa živého webu
    klikNa: "",                     // TODO: kam vedie klik na notebook (prázdne = stránka projektu)
    logo: "",                       // TODO: /realizacie/omrvinka-logo.svg
    popis: "2026 — Web",            // TODO
    tagline: "",                    // TODO: jedna veta o projekte
    text: [],                       // TODO: odstavce na stránku projektu
    sluzby: [],                     // TODO: čo ste pre klienta spravili
    ukazky: [],                     // TODO: obrázky do galérie
    karty: [
      { typ: "notebook", x: 20, y: 165, z: 90, rot: -3, screenshot: "/realizacie/omrvinka-web.svg", alt: "Web OMRVINKA" },
      // miesto 1 — siroke (320×205)
      { typ: "obrazok", x: 690, y: 55, w: 320, h: 205, z: 150, rot: 3, src: "/realizacie/omrvinka-1.svg", alt: "OMRVINKA — ukážka 1" },
      // miesto 2 — vysoke (250×330)
      { typ: "obrazok", x: 735, y: 300, w: 250, h: 330, z: 120, rot: -2, src: "/realizacie/omrvinka-2.svg", alt: "OMRVINKA — ukážka 2" },
      // miesto 3 — male (215×150)
      { typ: "obrazok", x: 410, y: 470, w: 215, h: 150, z: 100, rot: 2, src: "/realizacie/omrvinka-3.svg", alt: "OMRVINKA — ukážka 3" },
      { typ: "stitok", x: 430, y: 62, z: 150, rot: -2, text: "Nový web" },
      { typ: "stitok", x: 455, y: 385, z: 150, rot: 3, text: "Foto produktov" },
    ],
  },
  {
    slug: "nicepoke",
    nazov: "NICEPOKE",
    farba: "#0E7C66",              // TODO: firemná farba klienta
    href: "",                       // TODO: adresa živého webu
    klikNa: "",                     // TODO: kam vedie klik na notebook (prázdne = stránka projektu)
    logo: "",                       // TODO: /realizacie/nicepoke-logo.svg
    popis: "2026 — Web",            // TODO
    tagline: "",                    // TODO: jedna veta o projekte
    text: [],                       // TODO: odstavce na stránku projektu
    sluzby: [],                     // TODO: čo ste pre klienta spravili
    ukazky: [],                     // TODO: obrázky do galérie
    karty: [
      { typ: "notebook", x: 20, y: 165, z: 90, rot: -3, screenshot: "/realizacie/nicepoke-web.svg", alt: "Web NICEPOKE" },
      // miesto 1 — siroke (320×205)
      { typ: "obrazok", x: 690, y: 55, w: 320, h: 205, z: 150, rot: 3, src: "/realizacie/nicepoke-1.svg", alt: "NICEPOKE — ukážka 1" },
      // miesto 2 — vysoke (250×330)
      { typ: "obrazok", x: 735, y: 300, w: 250, h: 330, z: 120, rot: -2, src: "/realizacie/nicepoke-2.svg", alt: "NICEPOKE — ukážka 2" },
      // miesto 3 — male (215×150)
      { typ: "obrazok", x: 410, y: 470, w: 215, h: 150, z: 100, rot: 2, src: "/realizacie/nicepoke-3.svg", alt: "NICEPOKE — ukážka 3" },
      { typ: "stitok", x: 430, y: 62, z: 150, rot: -2, text: "Nový web" },
      { typ: "stitok", x: 455, y: 385, z: 150, rot: 3, text: "Foto produktov" },
    ],
  },
  {
    slug: "risebloom",
    nazov: "RISEBLOOM",
    farba: "#9333EA",              // TODO: firemná farba klienta
    href: "",                       // TODO: adresa živého webu
    klikNa: "",                     // TODO: kam vedie klik na notebook (prázdne = stránka projektu)
    logo: "",                       // TODO: /realizacie/risebloom-logo.svg
    popis: "2026 — Web",            // TODO
    tagline: "",                    // TODO: jedna veta o projekte
    text: [],                       // TODO: odstavce na stránku projektu
    sluzby: [],                     // TODO: čo ste pre klienta spravili
    ukazky: [],                     // TODO: obrázky do galérie
    karty: [
      { typ: "notebook", x: 20, y: 165, z: 90, rot: -3, screenshot: "/realizacie/risebloom-web.svg", alt: "Web RISEBLOOM" },
      // miesto 1 — siroke (320×205)
      { typ: "obrazok", x: 690, y: 55, w: 320, h: 205, z: 150, rot: 3, src: "/realizacie/risebloom-1.svg", alt: "RISEBLOOM — ukážka 1" },
      // miesto 2 — vysoke (250×330)
      { typ: "obrazok", x: 735, y: 300, w: 250, h: 330, z: 120, rot: -2, src: "/realizacie/risebloom-2.svg", alt: "RISEBLOOM — ukážka 2" },
      // miesto 3 — male (215×150)
      { typ: "obrazok", x: 410, y: 470, w: 215, h: 150, z: 100, rot: 2, src: "/realizacie/risebloom-3.svg", alt: "RISEBLOOM — ukážka 3" },
      { typ: "stitok", x: 430, y: 62, z: 150, rot: -2, text: "Nový web" },
      { typ: "stitok", x: 455, y: 385, z: 150, rot: 3, text: "Foto produktov" },
    ],
  },
  {
    slug: "vytlacto-3d",
    nazov: "VYTLAČTO 3D",
    farba: "#0E0E11",              // TODO: firemná farba klienta
    href: "",                       // TODO: adresa živého webu
    klikNa: "",                     // TODO: kam vedie klik na notebook (prázdne = stránka projektu)
    logo: "",                       // TODO: /realizacie/vytlacto-3d-logo.svg
    popis: "2026 — Web",            // TODO
    tagline: "",                    // TODO: jedna veta o projekte
    text: [],                       // TODO: odstavce na stránku projektu
    sluzby: [],                     // TODO: čo ste pre klienta spravili
    ukazky: [],                     // TODO: obrázky do galérie
    karty: [
      { typ: "notebook", x: 20, y: 165, z: 90, rot: -3, screenshot: "/realizacie/vytlacto-3d-web.svg", alt: "Web VYTLAČTO 3D" },
      // miesto 1 — siroke (320×205)
      { typ: "obrazok", x: 690, y: 55, w: 320, h: 205, z: 150, rot: 3, src: "/realizacie/vytlacto-3d-1.svg", alt: "VYTLAČTO 3D — ukážka 1" },
      // miesto 2 — vysoke (250×330)
      { typ: "obrazok", x: 735, y: 300, w: 250, h: 330, z: 120, rot: -2, src: "/realizacie/vytlacto-3d-2.svg", alt: "VYTLAČTO 3D — ukážka 2" },
      // miesto 3 — male (215×150)
      { typ: "obrazok", x: 410, y: 470, w: 215, h: 150, z: 100, rot: 2, src: "/realizacie/vytlacto-3d-3.svg", alt: "VYTLAČTO 3D — ukážka 3" },
      { typ: "stitok", x: 430, y: 62, z: 150, rot: -2, text: "Nový web" },
      { typ: "stitok", x: 455, y: 385, z: 150, rot: 3, text: "Foto produktov" },
    ],
  },
];

/** Po koľkých milisekundách sa koláž prepne sama. 0 = neprepínať. */
export const AUTO_PREPNUTIE_MS = 6500;
