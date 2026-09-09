"use client";

import { useLanguage } from "@/lib/i18n";
import Reveal from "./Reveal";
import Accordion, { type AccordionItem } from "./Accordion";
import styles from "./FaqSection.module.css";

export default function FaqSection({
  id,
  items,
}: {
  id?: string;
  items: AccordionItem[];
}) {
  const { t } = useLanguage();

  return (
    <section id={id} className={styles.section}>
      <Reveal className={styles.inner}>
        <div className={styles.head}>
          <div>
            <div className={styles.kicker}>{t("faq_kicker")}</div>
            <h2 className={styles.title}>{t("faq_title")}</h2>
          </div>
          <div className={styles.count}>
            <span className={styles.countNum}>{String(items.length).padStart(2, "0")}</span>
            <span className={styles.countLabel}>{t("faq_count_label")}</span>
          </div>
        </div>
        <Accordion items={items} />
      </Reveal>
    </section>
  );
}
