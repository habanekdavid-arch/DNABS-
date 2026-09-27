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
export const NAV_LOGO = "";

/* ── HERO ───────────────────────────────────────────────────────────── */

export const HERO = {
  nadpis: "Digitálna DNA vašej značky.",
  podnadpis:
    "Robíme webstránky, aplikácie a reklamu na internete. Vy nám poviete, čo potrebujete — my sa postaráme o zvyšok, aby vás zákazníci našli a ozvali sa.",
  tlacidloHlavne: { label: "Konzultácia zdarma", href: "#kontakt" },
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
    slug: "fraid-coffee",
    nazov: "FRAID Coffee",
    farba: "#6637ED",
    href: "https://fraid-coffee.vercel.app",
    popis: "2026 — Web a branding",
    tagline: "Moderný web, ktorý predáva kávu aj cez obrazovku.",
    text: [
      "Kaviareň mala skvelú kávu a žiadny web. Ľudia ju našli, len keď šli okolo.",
      "Postavili sme stránku, ktorá ukazuje, čo je na nich iné — pôvod zrna, ľudí za pultom aj miesto samotné. K tomu jednoduchú objednávku zrna domov.",
    ],
    sluzby: ["Web na mieru", "Logo a vizuálny štýl", "Fotografie", "Napojenie na objednávky"],
    ukazky: [],
    karty: [
      { typ: "notebook", x: 20, y: 170, z: 90, rot: -3, screenshot: "/realizacie/fraid-web.svg", alt: "Web FRAID Coffee" },
      { typ: "obrazok", x: 700, y: 60, w: 250, h: 180, z: 140, rot: 4, src: "/realizacie/fraid-1.svg", alt: "Balenie kávy FRAID" },
      { typ: "obrazok", x: 720, y: 400, w: 220, h: 200, z: 110, rot: -2, src: "/realizacie/fraid-2.svg", alt: "Interiér kaviarne" },
      { typ: "stitok", x: 640, y: 310, z: 150, rot: 2, text: "Nový web" },
    ],
  },
  {
    slug: "blog-david-habanek",
    nazov: "Blog Dávid Habánek",
    farba: "#FF5A1F",
    href: "https://david-habanek-blog.vercel.app",
    popis: "2026 — Web",
    tagline: "Miesto na písanie, ktoré sa dobre číta aj na mobile.",
    text: [
      "Blog o technológiách potreboval hlavne jedno — aby sa dal čítať bez rušenia.",
      "Typografia, rýchlosť načítania a jednoduché pridávanie článkov. Nič navyše.",
    ],
    sluzby: ["Web na mieru", "Typografia", "SEO základ", "Správa obsahu"],
    ukazky: [],
    karty: [
      { typ: "notebook", x: 20, y: 170, z: 90, rot: -2, screenshot: "/realizacie/blog-web.svg", alt: "Blog Dávid Habánek" },
      { typ: "obrazok", x: 710, y: 90, w: 240, h: 300, z: 130, rot: 3, src: "/realizacie/blog-1.svg", alt: "Ukážka článku" },
      { typ: "stitok", x: 660, y: 450, z: 150, rot: -3, text: "Obsah a SEO" },
    ],
  },
  {
    slug: "vytlacto-3d",
    nazov: "Vytlačto 3D",
    farba: "#404EE6",
    href: "https://vytlacto3d.sk",
    popis: "2026 — E-shop",
    tagline: "E-shop, kde si zákazník navrhne výrobok sám.",
    text: [
      "3D tlač sa ťažko predáva z katalógu — každá zákazka je iná.",
      "Spravili sme e-shop, kde zákazník nahrá svoj model alebo si vyberie z hotových, a hneď vidí cenu aj termín.",
    ],
    sluzby: ["E-shop na mieru", "Nahrávanie modelov", "Výpočet ceny", "Platobná brána"],
    ukazky: [],
    karty: [
      { typ: "notebook", x: 20, y: 170, z: 90, rot: -3, screenshot: "/realizacie/vytlacto-web.svg", alt: "E-shop Vytlačto 3D" },
      { typ: "obrazok", x: 700, y: 70, w: 260, h: 190, z: 140, rot: 4, src: "/realizacie/vytlacto-1.svg", alt: "3D tlačené výrobky" },
      { typ: "stitok", x: 650, y: 330, z: 150, rot: 1, text: "E-shop" },
    ],
  },
  {
    slug: "dnabs",
    nazov: "DNABS",
    farba: "#0E0E11",
    href: "https://dnabs.online",
    popis: "2026 — Vlastný web",
    tagline: "Náš web. Skúšame na ňom všetko skôr, než to dáme klientom.",
    text: [
      "Vlastný web je najlepšia vizitka. Preto na ňom skúšame veci, ktoré potom ponúkame ďalej.",
      "Od animácií cez meranie konverzií až po formulár, ktorý dopyty rovno triedi.",
    ],
    sluzby: ["Web na mieru", "Animácie", "Meranie konverzií", "Predkvalifikácia dopytov"],
    ukazky: [],
    karty: [
      { typ: "notebook", x: 20, y: 170, z: 90, rot: -2, screenshot: "/realizacie/dnabs-web.svg", alt: "Web DNABS" },
      { typ: "stitok", x: 670, y: 270, z: 150, rot: -2, text: "Branding" },
      { typ: "stitok", x: 710, y: 370, z: 150, rot: 3, text: "Web" },
    ],
  },
];

/** Po koľkých milisekundách sa koláž prepne sama. 0 = neprepínať. */
export const AUTO_PREPNUTIE_MS = 6500;
