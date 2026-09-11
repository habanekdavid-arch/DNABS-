/** Formulár posiela stabilné kódy — pre e-mail a admin ich prekladáme do slovenčiny. */

const PROJECT_TYPE: Record<string, string> = {
  web: "Web",
  eshop: "E-shop",
  redesign: "Redizajn",
  app: "Aplikácia",
  marketing: "Marketing",
};

const BUDGET: Record<string, string> = {
  lt300: "do 300 €",
  "300_800": "300 – 800 €",
  "800_2000": "800 – 2 000 €",
  "2000plus": "2 000 € a viac",
};

const TIMELINE: Record<string, string> = {
  asap: "Čo najskôr",
  "1_2m": "Do 1 – 2 mesiacov",
  research: "Len zisťuje",
};

const ENTITY: Record<string, string> = {
  firma: "Firma (s.r.o.)",
  zivnostnik: "Živnostník",
  nepodnikam: "Zatiaľ nepodniká",
};

const INDUSTRY: Record<string, string> = {
  gastro: "Gastro a pohostinstvo",
  krasa: "Krása a wellness",
  fitness: "Fitness a šport",
  stavba: "Stavebníctvo a remeslá",
  auto: "Auto-moto",
  obchod: "Obchod a e-shop",
  sluzby: "Služby a poradenstvo",
  reality: "Reality",
  zdravie: "Zdravotníctvo",
  vzdelavanie: "Vzdelávanie",
};

const label = (map: Record<string, string>, value: string | null | undefined) =>
  value ? map[value] ?? value : "—";

export const projectTypeLabel = (value: string | null | undefined) => label(PROJECT_TYPE, value);
export const budgetLabel = (value: string | null | undefined) => label(BUDGET, value);
export const timelineLabel = (value: string | null | undefined) => label(TIMELINE, value);
export const entityLabel = (value: string | null | undefined) => label(ENTITY, value);
/** Pri voľbe „Iné“ posiela formulár rovno napísaný text — ten sa vráti nezmenený. */
export const industryLabel = (value: string | null | undefined) => label(INDUSTRY, value);
