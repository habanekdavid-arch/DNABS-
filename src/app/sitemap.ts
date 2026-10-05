import type { MetadataRoute } from "next";
import { niches } from "@/data/niches";
import { PROJEKTY } from "@/data/hlavicka";

const BASE_URL = "https://dnabs.online";

/* Jeden čas pre celý beh — v builde je to dátum nasadenia. Google berie
   lastModified ako pomôcku pri rozhodovaní, čo prejsť znova. */
const UPRAVENE = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE_URL}/`, lastModified: UPRAVENE, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/o-nas`, lastModified: UPRAVENE, changeFrequency: "monthly", priority: 0.9 },
    /* Podstránky realizácií doteraz v mape chýbali, takže sa k nim Google
       dostal len preklikom z koláže na úvode — a k tým, čo sú v koláži nižšie,
       často vôbec. */
    ...PROJEKTY.map((projekt) => ({
      url: `${BASE_URL}/realizacie/${projekt.slug}`,
      lastModified: UPRAVENE,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...niches.map((niche) => ({
      url: `${BASE_URL}/weby-pre/${niche.slug}`,
      lastModified: UPRAVENE,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${BASE_URL}/obchodne-podmienky`, lastModified: UPRAVENE, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/cookies`, lastModified: UPRAVENE, changeFrequency: "yearly", priority: 0.3 },
  ];
}
