import type { MetadataRoute } from "next";
import { niches } from "@/data/niches";

const BASE_URL = "https://dnabs.online";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/o-nas`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/obchodne-podmienky`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/cookies`, changeFrequency: "yearly", priority: 0.3 },
    ...niches.map((niche) => ({
      url: `${BASE_URL}/weby-pre/${niche.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];

  return staticRoutes;
}
