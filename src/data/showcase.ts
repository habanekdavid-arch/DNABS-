export type ShowcaseItem = {
  firma: string;
  nika: { sk: string; en: string };
  imgBefore: string;
  imgAfter: string;
  poznamka: { sk: string; en: string };
};

// TODO: nahraď obrázky v public/showcase/ a texty nižšie reálnymi prípadmi.
// Pridanie ďalšej položky = jeden ďalší objekt do tohto poľa.
export const showcase: ShowcaseItem[] = [
  {
    firma: "PLACEHOLDER — Názov firmy 1",
    nika: { sk: "Reštaurácia", en: "Restaurant" },
    imgBefore: "/showcase/1-before.jpg",
    imgAfter: "/showcase/1-after.jpg",
    poznamka: {
      sk: "PLACEHOLDER — krátka poznámka o výsledku (napr. o koľko stúpli rezervácie po novom webe).",
      en: "PLACEHOLDER — short note about the result (e.g. how much bookings grew after the new site).",
    },
  },
  {
    firma: "PLACEHOLDER — Názov firmy 2",
    nika: { sk: "Svadobný salón", en: "Wedding salon" },
    imgBefore: "/showcase/2-before.jpg",
    imgAfter: "/showcase/2-after.jpg",
    poznamka: {
      sk: "PLACEHOLDER — krátka poznámka o výsledku.",
      en: "PLACEHOLDER — short note about the result.",
    },
  },
  {
    firma: "PLACEHOLDER — Názov firmy 3",
    nika: { sk: "Autoservis", en: "Auto service" },
    imgBefore: "/showcase/3-before.jpg",
    imgAfter: "/showcase/3-after.jpg",
    poznamka: {
      sk: "PLACEHOLDER — krátka poznámka o výsledku.",
      en: "PLACEHOLDER — short note about the result.",
    },
  },
];
