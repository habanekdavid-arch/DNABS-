"use client";

import { useLanguage } from "@/lib/i18n";
import FaqSection from "./FaqSection";
import type { Niche } from "@/data/niches";

export default function NicheFaq({ niche }: { niche: Niche }) {
  const { lang } = useLanguage();
  const items = niche.faq.map((item) => ({ q: item.q[lang], a: item.a[lang] }));

  return <FaqSection id="faq" items={items} />;
}
