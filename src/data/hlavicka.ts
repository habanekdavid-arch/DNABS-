/* ══════════════════════════════════════════════════════════════════════
   OBSAH VRCHNEJ ČASTI WEBU — navigácia, hero a koláž realizácií.

   Toto je jediný súbor, ktorý treba upravovať. Mení sa tu text, farby,
   odkazy aj rozloženie kariet v koláži.

   Obrázky sa nahrávajú do  public/realizacie/  ako PNG a odkazuje sa
   na ne cestou "/realizacie/nazov-suboru.png". Sú tam už zástupné PNG
   so správnymi rozmermi — stačí ich prepísať vlastnými pod rovnakým
   názvom a v tomto súbore netreba meniť nič.
   ══════════════════════════════════════════════════════════════════════ */

/* ── NAVIGÁCIA ──────────────────────────────────────────────────────────
   Odkazy musia sedieť so sekciami, ktoré na stránke naozaj sú.
   Aktuálne existujú: #sluzby #ako-to-funguje #realizacia #spolupraca
   #navrh #referencie #faq #kontakt
   Plus samostatná stránka /o-nas.
   ─────────────────────────────────────────────────────────────────────── */

export const NAV_LINKS = [
  { label: "Služby", href: "#sluzby" },
  { label: "Ako to funguje", href: "#ako-to-funguje" },
  { label: "Realizácie", href: "#realizacia" },
  { label: "O nás", href: "/o-nas" },
] as const;

export const NAV_CTA = { label: "Začať projekt", href: "#kontakt" };

/** Logo v navigácii. Nahrajte SVG do public/ a cestu zadajte sem.
 *  Kým je prázdne, zobrazí sa nápis DNABS. */
export const NAV_LOGO = "/logo.svg";

/* ── HERO ───────────────────────────────────────────────────────────── */

export const HERO = {
  /** Každý riadok zvlášť — tu sa rozhoduje, kde sa nadpis zalomí.
   *  Vypisuje sa veľkými písmenami vo fialovej z loga, aj keď sú tu malé. */
  nadpis: ["Spolu tvoríme veci,", "ktoré majú hodnotu."],
  /** Jediné tlačidlo pod nadpisom — vedie na kontaktný formulár.
   *  Vypisuje sa veľkými písmenami, aj keď sú tu malé. */
  tlacidlo: { label: "Začať projekt", href: "#kontakt" },
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
     { typ: "logo",     src, alt }          — logo klienta, bez rámu
     { typ: "stitok",   text }              — sklenený štítok
     { typ: "notebook", screenshot, alt }   — 3D notebook so screenshotom

   Notebook má byť v každom projekte najviac jeden.
   ─────────────────────────────────────────────────────────────────────── */

export type KartaKolaze =
  | { typ: "obrazok"; x: number; y: number; w: number; h: number; z?: number; rot?: number; src: string; alt: string }
  | { typ: "video"; x: number; y: number; w: number; h: number; z?: number; rot?: number; src: string; poster?: string; alt: string }
  | { typ: "logo"; x: number; y: number; w: number; h: number; z?: number; rot?: number; src: string; alt: string }
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
  /** Kým projekt nie je doplnený, nastavte true — nezobrazí sa v koláži,
   *  jeho stránka /realizacie/<slug> neexistuje a nie je ani v sitemape.
   *  Keď sú obrázky a texty hotové, riadok stačí zmazať. */
  skryty?: boolean;
};

const VSETKY_PROJEKTY: Projekt[] = [
  {
    slug: "clever",
    nazov: "CLEVER",
    farba: "#E4191F",
    href: "https://clever.sk",
    // Prezentačná stránka projektu — klik na notebook ide rovno sem,
    // cez /realizacie/clever sa už neprechádza.
    klikNa: "https://claude.ai/artifact/UZeSfxNY5a2JzXvKvFm4Dn",
    logo: "/realizacie/clever-logo.svg",
    popis: "2026 — Branding a web",
    tagline: "AI asistentka, ktorá pomáha seniorom zvládnuť moderný telefón.",
    text: [
      "Lekár, banka aj vnúčatá sú dnes v aplikácii. Menu, skratky a cudzie slová ale vytvárajú strach — a rodina nemôže byť pri telefóne vždy.",
      "CLEVER je trpezlivá asistentka vo vrecku. Počúva, ukáže na obrazovke, kam ťuknúť, a počká. Toľkokrát, koľkokrát treba — pokojne a po slovensky.",
      "Logo sme postavili na pevných verzálkach pre istotu a čitateľnosť. Mozog namiesto písmena nesie inteligenciu — jednoducho, bez technického chladu. Písmo Outfit má veľké otvory, takže zostáva čitateľné aj pri slabšom zraku.",
      "Web vedie návštevníka 3D scrollom a sticky príbehom až k živému demu, kde si znak priamo ukáže, kam na mobile ťuknúť. Samostatná podstránka potom prevedie inštaláciou — aj na diaľku, do telefónu rodičov.",
    ],
    sluzby: [
      "Vizuálna identita",
      "Logo a znak",
      "Farby a typografia",
      "Dizajn a vývoj webu",
      "Interaktívne demo produktu",
    ],
    ukazky: [
      { src: "/realizacie/clever-galeria-1.png", alt: "Logo CLEVER — wordmark a znak", popis: "Logo — wordmark a znak" },
      { src: "/realizacie/clever-galeria-2.png", alt: "Živé demo na webe CLEVER", popis: "Živé demo priamo na webe" },
      { src: "/realizacie/clever-galeria-3.png", alt: "Podstránka na stiahnutie aplikácie", popis: "Podstránka na stiahnutie" },
    ],
    karty: [
      { typ: "logo", x: 42, y: 84, w: 230, h: 36, z: 140, rot: -2, src: "/realizacie/clever-logo-cervene.svg", alt: "Logo CLEVER" },
      { typ: "notebook", x: 20, y: 165, z: 90, rot: -3, screenshot: "/realizacie/clever-web.png", alt: "Web CLEVER" },
      // miesto 1 — siroke (320×205), lezi na farebnom paneli
      { typ: "obrazok", x: 600, y: 55, w: 320, h: 205, z: 150, rot: 3, src: "/realizacie/clever-1.png", alt: "CLEVER — podstránka na stiahnutie aplikácie" },
      // miesto 2 — vysoke (250×330)
      { typ: "obrazok", x: 735, y: 300, w: 250, h: 330, z: 120, rot: -2, src: "/realizacie/clever-2.png", alt: "CLEVER — web na mobile" },
      // miesto 3 — male (215×150)
      { typ: "obrazok", x: 410, y: 470, w: 215, h: 150, z: 100, rot: 2, src: "/realizacie/clever-3.png", alt: "CLEVER — sekcia Postráži pred podvodom" },
      { typ: "stitok", x: 430, y: 118, z: 150, rot: -2, text: "Nový web" },
      { typ: "stitok", x: 455, y: 385, z: 150, rot: 3, text: "Identita značky" },
    ],
  },
  {
    slug: "rozsvietto",
    nazov: "ROZSVIEŤTO",
    farba: "#FFAE00",               // žltá z loga
    href: "https://www.rozsvietto.sk",
    // Klik na notebook vedie rovno na živý web klienta.
    klikNa: "https://www.rozsvietto.sk",
    logo: "/realizacie/rozsvietto-logo.svg",
    popis: "2026 — Web",
    tagline: "Konfigurátor svetelných nápisov — v 3D náhľade hneď vidíte, ako bude text vyzerať na stene.",
    text: [],                       // TODO: odstavce na stránku projektu
    sluzby: [],                     // TODO: čo sme pre klienta spravili
    ukazky: [],                     // TODO: obrázky do galérie
    karty: [
      // Logo levituje mimo žltej plochy — panel začína až na x = 320.
      { typ: "logo", x: 42, y: 84, w: 220, h: 59, z: 140, rot: -2, src: "/realizacie/rozsvietto-logo.svg", alt: "Logo ROZSVIEŤTO" },
      { typ: "notebook", x: 20, y: 165, z: 90, rot: -3, screenshot: "/realizacie/rozsvietto-web.png", alt: "Web ROZSVIEŤTO — 3D konfigurátor svetelných nápisov" },
      // miesto 1 — v pomere 4:3, lezi na zltom paneli
      { typ: "obrazok", x: 600, y: 55, w: 320, h: 240, z: 150, rot: 3, src: "/realizacie/rozsvietto-1.png", alt: "ROZSVIEŤTO — ako to funguje" },
      // miesto 2 — vysoke (250x300)
      { typ: "obrazok", x: 735, y: 330, w: 250, h: 300, z: 120, rot: -2, src: "/realizacie/rozsvietto-2.png", alt: "ROZSVIEŤTO — konfigurátor na mobile" },
      // miesto 3 — male (215x150)
      { typ: "obrazok", x: 410, y: 470, w: 215, h: 150, z: 100, rot: 2, src: "/realizacie/rozsvietto-3.png", alt: "ROZSVIEŤTO — blog" },
      { typ: "stitok", x: 430, y: 118, z: 150, rot: -2, text: "Nový web" },
      { typ: "stitok", x: 455, y: 385, z: 150, rot: 3, text: "3D konfigurátor" },
    ],
  },
  {
    slug: "mnam",
    skryty: true,                   // nedoplnený — zatiaľ skrytý
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
      { typ: "notebook", x: 20, y: 165, z: 90, rot: -3, screenshot: "/realizacie/mnam-web.png", alt: "Web MŇAM" },
      // miesto 1 — siroke (320×205), lezi na farebnom paneli
      { typ: "obrazok", x: 600, y: 55, w: 320, h: 205, z: 150, rot: 3, src: "/realizacie/mnam-1.png", alt: "MŇAM — ukážka 1" },
      // miesto 2 — vysoke (250×330)
      { typ: "obrazok", x: 735, y: 300, w: 250, h: 330, z: 120, rot: -2, src: "/realizacie/mnam-2.png", alt: "MŇAM — ukážka 2" },
      // miesto 3 — male (215×150)
      { typ: "obrazok", x: 410, y: 470, w: 215, h: 150, z: 100, rot: 2, src: "/realizacie/mnam-3.png", alt: "MŇAM — ukážka 3" },
      { typ: "stitok", x: 430, y: 118, z: 150, rot: -2, text: "Nový web" },
      { typ: "stitok", x: 455, y: 385, z: 150, rot: 3, text: "Foto produktov" },
    ],
  },
  {
    slug: "happyhour",
    skryty: true,                   // nedoplnený — zatiaľ skrytý
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
      { typ: "notebook", x: 20, y: 165, z: 90, rot: -3, screenshot: "/realizacie/happyhour-web.png", alt: "Web HAPPYHOUR" },
      // miesto 1 — siroke (320×205), lezi na farebnom paneli
      { typ: "obrazok", x: 600, y: 55, w: 320, h: 205, z: 150, rot: 3, src: "/realizacie/happyhour-1.png", alt: "HAPPYHOUR — ukážka 1" },
      // miesto 2 — vysoke (250×330)
      { typ: "obrazok", x: 735, y: 300, w: 250, h: 330, z: 120, rot: -2, src: "/realizacie/happyhour-2.png", alt: "HAPPYHOUR — ukážka 2" },
      // miesto 3 — male (215×150)
      { typ: "obrazok", x: 410, y: 470, w: 215, h: 150, z: 100, rot: 2, src: "/realizacie/happyhour-3.png", alt: "HAPPYHOUR — ukážka 3" },
      { typ: "stitok", x: 430, y: 118, z: 150, rot: -2, text: "Nový web" },
      { typ: "stitok", x: 455, y: 385, z: 150, rot: 3, text: "Foto produktov" },
    ],
  },
  {
    slug: "omrvinka",
    skryty: true,                   // nedoplnený — zatiaľ skrytý
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
      { typ: "notebook", x: 20, y: 165, z: 90, rot: -3, screenshot: "/realizacie/omrvinka-web.png", alt: "Web OMRVINKA" },
      // miesto 1 — siroke (320×205), lezi na farebnom paneli
      { typ: "obrazok", x: 600, y: 55, w: 320, h: 205, z: 150, rot: 3, src: "/realizacie/omrvinka-1.png", alt: "OMRVINKA — ukážka 1" },
      // miesto 2 — vysoke (250×330)
      { typ: "obrazok", x: 735, y: 300, w: 250, h: 330, z: 120, rot: -2, src: "/realizacie/omrvinka-2.png", alt: "OMRVINKA — ukážka 2" },
      // miesto 3 — male (215×150)
      { typ: "obrazok", x: 410, y: 470, w: 215, h: 150, z: 100, rot: 2, src: "/realizacie/omrvinka-3.png", alt: "OMRVINKA — ukážka 3" },
      { typ: "stitok", x: 430, y: 118, z: 150, rot: -2, text: "Nový web" },
      { typ: "stitok", x: 455, y: 385, z: 150, rot: 3, text: "Foto produktov" },
    ],
  },
  {
    slug: "nicepoke",
    nazov: "NICEPOKE",
    farba: "#FFB921",               // žltá z loga
    href: "https://claude.ai/artifact/N82DWdTDuJ1YJu3q9ajdLc",
    // Prezentačná stránka projektu — klik na notebook ide rovno sem.
    klikNa: "https://claude.ai/artifact/N82DWdTDuJ1YJu3q9ajdLc",
    logo: "/realizacie/nicepoke-logo.svg",
    popis: "2026 — Branding a web",
    tagline: "Poke bowly na mieru — značka, prevádzka aj web s objednávaním.",
    text: [],                       // TODO: odstavce na stránku projektu
    sluzby: [],                     // TODO: čo sme pre klienta spravili
    ukazky: [],                     // TODO: obrázky do galérie
    karty: [
      // Logo levituje mimo žltej plochy — panel začína až na x = 320.
      { typ: "logo", x: 42, y: 84, w: 215, h: 67, z: 140, rot: -2, src: "/realizacie/nicepoke-logo.svg", alt: "Logo NICEPOKE" },
      { typ: "notebook", x: 20, y: 165, z: 90, rot: -3, screenshot: "/realizacie/nicepoke-web.jpg", alt: "Web NICEPOKE — objednávanie poke bowlov" },
      // miesto 1 — v pomere 4:3, lezi na zltom paneli
      { typ: "obrazok", x: 600, y: 55, w: 320, h: 240, z: 150, rot: 3, src: "/realizacie/nicepoke-1.jpg", alt: "NICEPOKE — interiér prevádzky" },
      // miesto 2 — vysoke (250x300)
      { typ: "obrazok", x: 735, y: 330, w: 250, h: 300, z: 120, rot: -2, src: "/realizacie/nicepoke-2.jpg", alt: "NICEPOKE — miska so značkou" },
      // miesto 3 — male (215x150)
      { typ: "obrazok", x: 410, y: 470, w: 215, h: 150, z: 100, rot: 2, src: "/realizacie/nicepoke-3.jpg", alt: "NICEPOKE — nočný pútač" },
      { typ: "stitok", x: 430, y: 118, z: 150, rot: -2, text: "Nový web" },
      { typ: "stitok", x: 455, y: 385, z: 150, rot: 3, text: "Identita a prevádzka" },
    ],
  },
  {
    slug: "risebloom",
    nazov: "RISEBLOOM",
    farba: "#87011A",               // bordovo-červená z loga
    href: "https://claude.ai/artifact/EJLpwqr9QotWrMNeHLEjj8",
    // Prezentačná stránka projektu — klik na notebook ide rovno sem.
    klikNa: "https://claude.ai/artifact/EJLpwqr9QotWrMNeHLEjj8",
    logo: "/realizacie/risebloom-logo.svg",
    popis: "2026 — Web",
    tagline: "Butikové kvetinárstvo — ručne viazané kytice, ateliér a donáška v jednom webe.",
    text: [],                       // TODO: odstavce na stránku projektu
    sluzby: [],                     // TODO: čo sme pre klienta spravili
    ukazky: [],                     // TODO: obrázky do galérie
    karty: [
      // Logo levituje mimo červenej plochy — panel začína až na x = 320.
      { typ: "logo", x: 42, y: 84, w: 220, h: 45, z: 140, rot: -2, src: "/realizacie/risebloom-logo.svg", alt: "Logo RISEBLOOM" },
      { typ: "notebook", x: 20, y: 165, z: 90, rot: -3, screenshot: "/realizacie/risebloom-web.jpg", alt: "Web RISEBLOOM — kvetinárstvo, ateliér a donáška" },
      // Levitujúca kytica — bez rámu, pláva nad červeným panelom.
      { typ: "logo", x: 445, y: 162, w: 140, h: 209, z: 130, rot: 4, src: "/realizacie/risebloom-kytica.webp", alt: "RISEBLOOM — kytica bielych pivoniek" },
      // miesto 1 — siroke (320×205), lezi na farebnom paneli
      { typ: "obrazok", x: 600, y: 55, w: 320, h: 205, z: 150, rot: 3, src: "/realizacie/risebloom-1.jpg", alt: "RISEBLOOM — anturie vo vázach" },
      // miesto 2 — vysoke (250×330)
      { typ: "obrazok", x: 735, y: 300, w: 250, h: 330, z: 120, rot: -2, src: "/realizacie/risebloom-2.jpg", alt: "RISEBLOOM — svadobná kytica" },
      // miesto 3 — male (215×150)
      { typ: "obrazok", x: 410, y: 470, w: 215, h: 150, z: 100, rot: 2, src: "/realizacie/risebloom-3.jpg", alt: "RISEBLOOM — darčeková krabica s kvetmi" },
      { typ: "stitok", x: 430, y: 118, z: 150, rot: -2, text: "Nový web" },
      { typ: "stitok", x: 455, y: 385, z: 150, rot: 3, text: "Foto produktov" },
    ],
  },
  {
    slug: "vytlacto-3d",
    nazov: "VYTLAČTO 3D",
    farba: "#FFAE00",               // žltá z loga
    href: "https://www.vytlacto3d.sk",
    // Klik na notebook vedie rovno na živý web klienta.
    klikNa: "https://www.vytlacto3d.sk",
    logo: "/realizacie/vytlacto-3d-logo.svg",
    popis: "2026 — Web",
    tagline: "Online konfigurátor 3D tlače — nahráte model, systém spočíta cenu a výtlačok príde poštou.",
    text: [],                       // TODO: odstavce na stránku projektu
    sluzby: [],                     // TODO: čo sme pre klienta spravili
    ukazky: [],                     // TODO: obrázky do galérie
    karty: [
      // Logo levituje mimo žltej plochy — panel začína až na x = 320.
      { typ: "logo", x: 42, y: 84, w: 220, h: 53, z: 140, rot: -2, src: "/realizacie/vytlacto-3d-logo.svg", alt: "Logo VYTLAČTO 3D" },
      { typ: "notebook", x: 20, y: 165, z: 90, rot: -3, screenshot: "/realizacie/vytlacto-3d-web.png", alt: "Web VYTLAČTO 3D — online konfigurátor 3D tlače" },
      // miesto 1 — v pomere 4:3, lezi na zltom paneli
      { typ: "obrazok", x: 600, y: 55, w: 320, h: 240, z: 150, rot: 3, src: "/realizacie/vytlacto-3d-1.png", alt: "VYTLAČTO 3D — blog o 3D tlači" },
      // miesto 2 — vysoke (250×300)
      { typ: "obrazok", x: 735, y: 330, w: 250, h: 300, z: 120, rot: -2, src: "/realizacie/vytlacto-3d-2.png", alt: "VYTLAČTO 3D — tlačený držiak na mieru" },
      // miesto 3 — male (215×150)
      { typ: "obrazok", x: 410, y: 470, w: 215, h: 150, z: 100, rot: 2, src: "/realizacie/vytlacto-3d-3.png", alt: "VYTLAČTO 3D — prehľad realizácií" },
      { typ: "stitok", x: 430, y: 118, z: 150, rot: -2, text: "Nový web" },
      { typ: "stitok", x: 455, y: 385, z: 150, rot: 3, text: "Konfigurátor, blog aj e-shop" },
    ],
  },
];

/** Projekty, ktoré sa naozaj zobrazujú — bez skrytých. */
export const PROJEKTY: Projekt[] = VSETKY_PROJEKTY.filter((p) => !p.skryty);

/** Po koľkých milisekundách sa koláž prepne sama. 0 = neprepínať. */
export const AUTO_PREPNUTIE_MS = 6500;
