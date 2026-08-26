"use client";

import { useLanguage } from "@/lib/i18n";
import FaqSection from "./FaqSection";
import { homeFaq } from "@/data/faq";

export default function HomeFaq() {
  const { lang } = useLanguage();
  const items = homeFaq.map((item) => ({ q: item.q[lang], a: item.a[lang] }));

  return <FaqSection id="faq" items={items} />;
}
