import type { Preklad } from "@/lib/jazyky";

/**
 * ⚠ ILUSTRAČNÉ HODNOTY — NIE SÚ TO NAMERANÉ VÝSLEDKY KLIENTA.
 *
 * Tieto čísla nikto nenameral, sú tu ako ukážka. Preto musí byť pri
 * grafoch vždy viditeľné označenie, že ide o ilustráciu — bez neho by to
 * boli tvrdenia o výsledkoch, ktoré sa nestali, čo je klamlivá reklama
 * (smernica 2005/29/ES). O označenie sa stará IMPACT_IS_PLACEHOLDER.
 *
 * Keď budú k dispozícii skutočné namerané čísla z projektu: prepísať
 * hodnoty nižšie a prepnúť IMPACT_IS_PLACEHOLDER na false. Označenie
 * vtedy zmizne samo, lebo už nebude čo označovať.
 */
export const IMPACT_IS_PLACEHOLDER = true;

export const SPEED = {
  title: { sk: "Rýchlosť načítania", en: "Load time", cs: "Rychlost načítání", hu: "Betöltési idő", de: "Ladezeit" },
  unit: "s",
  before: 4.8,
  after: 1.2,
  beforeLabel: { sk: "Pôvodný web", en: "Old site", cs: "Původní web", hu: "Régi weboldal", de: "Alte Website" },
  afterLabel: { sk: "Po DNABS", en: "After DNABS", cs: "Po DNABS", hu: "A DNABS után", de: "Nach DNABS" },
};

export const LEADS = {
  title: { sk: "Dopyty z webu / mesiac", en: "Leads from the site / month", cs: "Poptávky z webu / měsíc", hu: "Ajánlatkérések a weboldalról / hónap", de: "Anfragen über die Website / Monat" },
  // 12 mesiacov — pred spustením nového webu (prvých 5) a po ňom.
  series: [6, 7, 5, 8, 7, 14, 18, 21, 24, 27, 31, 36],
  launchIndex: 5,
  launchLabel: { sk: "Spustenie", en: "Launch", cs: "Spuštění", hu: "Indulás", de: "Launch" },
};

export const CONVERSION = {
  title: { sk: "Konverzný pomer", en: "Conversion rate", cs: "Konverzní poměr", hu: "Konverziós arány", de: "Conversion-Rate" },
  before: 1.1,
  after: 3.4,
  unit: "%",
};

export const IMPACT_COPY: Record<string, Preklad> = {
  label: { sk: "[ FIG.03 — VÝSLEDKY ]", en: "[ FIG.03 — RESULTS ]", cs: "[ FIG.03 — VÝSLEDKY ]", hu: "[ FIG.03 — EREDMÉNYEK ]", de: "[ FIG.03 — ERGEBNISSE ]" },
  title: { sk: "Čísla, ktoré sa hýbu.", en: "Numbers that move.", cs: "Čísla, která se hýbou.", hu: "Számok, amelyek mozognak.", de: "Zahlen, die sich bewegen." },
  sub: {
    sk: "Rýchlejší web, viac dopytov, vyššia konverzia. Toto sledujeme pri každom projekte.",
    en: "A faster site, more leads, higher conversion. This is what we track on every project.",
    cs: "Rychlejší web, více poptávek, vyšší konverze. Tohle sledujeme u každého projektu.",
    hu: "Gyorsabb weboldal, több ajánlatkérés, magasabb konverzió. Ezt figyeljük minden projektnél.",
    de: "Schnellere Website, mehr Anfragen, höhere Conversion. Das verfolgen wir bei jedem Projekt.",
  },
  placeholder: {
    sk: "Ilustračný príklad — nejde o namerané výsledky klienta",
    en: "Illustrative example — not measured client results",
    cs: "Ilustrační příklad — nejde o naměřené výsledky klienta",
    hu: "Szemléltető példa — nem mért ügyféleredmények",
    de: "Illustratives Beispiel — keine gemessenen Kundenergebnisse",
  },
};
