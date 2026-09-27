/* ══════════════════════════════════════════════════════════════════════
   OBSAH VRCHNEJ ČASTI WEBU — navigácia, hero a koláž realizácií.

   Toto je jediný súbor, ktorý treba upravovať. Mení sa tu text, farby,
   odkazy aj rozloženie kariet v koláži. Do ostatných súborov netreba
   siahať.

   Obrázky sa nahrávajú do priečinka  public/realizacie/  a tu sa na ne
   odkazuje cestou "/realizacie/nazov-suboru.svg".
   ══════════════════════════════════════════════════════════════════════ */

/* ── NAVIGÁCIA ──────────────────────────────────────────────────────── */

export const NAV_LINKS = [
  { label: "Služby", href: "#sluzby" },
  { label: "Realizácie", href: "#realizacie" },
  { label: "Vernostná karta", href: "#vernostna-karta" },
  { label: "Cenník", href: "#cennik" },
] as const;

export const NAV_CTA = { label: "Začať projekt", href: "#kontakt" };

/* ── HERO ───────────────────────────────────────────────────────────── */

export const HERO = {
  nadpis: "Digitálna DNA vašej značky.",
  podnadpis:
    "Robíme webstránky, aplikácie a reklamu na internete. Vy nám poviete, čo potrebujete — my sa postaráme o zvyšok, aby vás zákazníci našli a ozvali sa.",
  tlacidloHlavne: { label: "Konzultácia zdarma", href: "#kontakt" },
  tlacidloVedlajsie: { label: "Realizácie", href: "#realizacie" },
};

/* ── KOLÁŽ REALIZÁCIÍ ───────────────────────────────────────────────────

   Každý projekt je jedna „vrstva“ koláže. Prepína sa šípkami alebo sa
   po 6,5 sekundy prepne sám.

   Súradnice kariet (x, y, w, h) sú v pixeloch na návrhovej ploche
   1000 × 640 px. Tá sa potom celá zmenší podľa veľkosti okna, takže
   rozloženie ostane rovnaké na každej obrazovke.

   Typy kariet:
     { typ: "obrazok",  src, alt }          — fotka alebo grafika
     { typ: "video",    src, poster, alt }  — video s play tlačidlom
     { typ: "stitok",   text }              — sklenený štítok, napr. "Nový web"
     { typ: "notebook", screenshot, alt }   — 3D notebook so screenshotom webu

   Notebook by mal byť v každom projekte najviac jeden.
   ─────────────────────────────────────────────────────────────────────── */

export type KartaKolaze =
  | { typ: "obrazok"; x: number; y: number; w: number; h: number; z?: number; rot?: number; src: string; alt: string }
  | { typ: "video"; x: number; y: number; w: number; h: number; z?: number; rot?: number; src: string; poster?: string; alt: string }
  | { typ: "stitok"; x: number; y: number; z?: number; rot?: number; text: string }
  | { typ: "notebook"; x: number; y: number; z?: number; rot?: number; screenshot: string; alt: string };

export type Projekt = {
  /** Meno klienta — zobrazí sa, kým nie je nahraté logo. */
  nazov: string;
  /** Farba panela značky. Pokojne sem dajte firemnú farbu klienta. */
  farba: string;
  /** Adresa webu. Otvorí sa po kliknutí na notebook. */
  href: string;
  /** Logo klienta na paneli — priehľadné PNG alebo SVG. Nepovinné. */
  logo?: string;
  /** Riadok pod logom, napr. "2026 — Web a branding". */
  popis: string;
  karty: KartaKolaze[];
};

export const PROJEKTY: Projekt[] = [
  {
    nazov: "FRAID Coffee",
    farba: "#6637ED",
    href: "https://fraid-coffee.vercel.app",
    popis: "2026 — Web a branding",
    karty: [
      { typ: "notebook", x: 0, y: 150, z: 90, rot: -3, screenshot: "/realizacie/fraid-web.svg", alt: "Web FRAID Coffee" },
      { typ: "obrazok", x: 700, y: 60, w: 250, h: 180, z: 140, rot: 4, src: "/realizacie/fraid-1.svg", alt: "Balenie kávy FRAID" },
      { typ: "obrazok", x: 720, y: 400, w: 220, h: 200, z: 110, rot: -2, src: "/realizacie/fraid-2.svg", alt: "Interiér kaviarne" },
      { typ: "stitok", x: 620, y: 300, z: 150, rot: 2, text: "Nový web" },
    ],
  },
  {
    nazov: "Blog Dávid Habánek",
    farba: "#FF5A1F",
    href: "https://david-habanek-blog.vercel.app",
    popis: "2026 — Web",
    karty: [
      { typ: "notebook", x: 0, y: 150, z: 90, rot: -2, screenshot: "/realizacie/blog-web.svg", alt: "Blog Dávid Habánek" },
      { typ: "obrazok", x: 710, y: 90, w: 240, h: 300, z: 130, rot: 3, src: "/realizacie/blog-1.svg", alt: "Ukážka článku" },
      { typ: "stitok", x: 640, y: 440, z: 150, rot: -3, text: "Obsah a SEO" },
    ],
  },
  {
    nazov: "Vytlačto 3D",
    farba: "#404EE6",
    href: "https://vytlacto3d.sk",
    popis: "2026 — E-shop",
    karty: [
      { typ: "notebook", x: 0, y: 150, z: 90, rot: -3, screenshot: "/realizacie/vytlacto-web.svg", alt: "E-shop Vytlačto 3D" },
      { typ: "obrazok", x: 700, y: 70, w: 260, h: 190, z: 140, rot: 4, src: "/realizacie/vytlacto-1.svg", alt: "3D tlačené výrobky" },
      { typ: "stitok", x: 630, y: 320, z: 150, rot: 1, text: "E-shop" },
    ],
  },
  {
    nazov: "DNABS",
    farba: "#0E0E11",
    href: "https://dnabs.online",
    popis: "2026 — Vlastný web",
    karty: [
      { typ: "notebook", x: 0, y: 150, z: 90, rot: -2, screenshot: "/realizacie/dnabs-web.svg", alt: "Web DNABS" },
      { typ: "stitok", x: 650, y: 260, z: 150, rot: -2, text: "Branding" },
      { typ: "stitok", x: 690, y: 360, z: 150, rot: 3, text: "Web" },
    ],
  },
];

/** Po koľkých milisekundách sa koláž prepne sama. 0 = neprepínať. */
export const AUTO_PREPNUTIE_MS = 6500;
