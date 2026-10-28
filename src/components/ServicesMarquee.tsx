"use client";

import { useLanguage, type Preklad } from "@/lib/i18n";
import styles from "./ServicesMarquee.module.css";

const NBSP = "  ";

const ITEMS: { label: Preklad; sepClass: string }[] = [
  { label: { sk: "WEBY", cs: "WEBY", en: "WEBSITES", hu: "WEBOLDALAK", de: "WEBSITES" }, sepClass: styles.accent },
  { label: { sk: "APLIKÁCIE", cs: "APLIKACE", en: "APPS", hu: "ALKALMAZÁSOK", de: "APPS" }, sepClass: styles.purple },
  { label: { sk: "DIGITÁLNY MARKETING", cs: "DIGITÁLNÍ MARKETING", en: "DIGITAL MARKETING", hu: "DIGITÁLIS MARKETING", de: "DIGITALES MARKETING" }, sepClass: styles.green },
  { label: { sk: "AI AGENTI", cs: "AI AGENTI", en: "AI AGENTS", hu: "AI-ÜGYNÖKÖK", de: "KI-AGENTEN" }, sepClass: styles.accent },
  { label: { sk: "UX · UI", cs: "UX · UI", en: "UX · UI", hu: "UX · UI", de: "UX · UI" }, sepClass: styles.purple },
  { label: { sk: "AUTOMATIZÁCIA", cs: "AUTOMATIZACE", en: "AUTOMATION", hu: "AUTOMATIZÁLÁS", de: "AUTOMATISIERUNG" }, sepClass: styles.purple },
  { label: { sk: "SEO", cs: "SEO", en: "SEO", hu: "SEO", de: "SEO" }, sepClass: styles.green },
];

function MarqueeSet() {
  const { lang } = useLanguage();

  return (
    <span>
      {ITEMS.map((item, i) => (
        <span key={i}>
          {item.label[lang]}
          {NBSP}
          <span className={item.sepClass}>/</span>
          {NBSP}
        </span>
      ))}
    </span>
  );
}

export default function ServicesMarquee() {
  return (
    <div className={styles.strip}>
      <div className={styles.track}>
        <MarqueeSet />
        <MarqueeSet />
      </div>
    </div>
  );
}
