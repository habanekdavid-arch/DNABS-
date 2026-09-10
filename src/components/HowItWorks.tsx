"use client";

import Link from "next/link";
import { useLanguage, type DictKey } from "@/lib/i18n";
import Reveal from "./Reveal";
import styles from "./HowItWorks.module.css";

const STEPS: { titleKey: DictKey; descKey: DictKey; noteKey: DictKey; color: string }[] = [
  { titleKey: "how1_t", descKey: "how1_d", noteKey: "how1_note", color: "var(--accent)" },
  { titleKey: "how2_t", descKey: "how2_d", noteKey: "how2_note", color: "var(--purple)" },
  { titleKey: "how3_t", descKey: "how3_d", noteKey: "how3_note", color: "var(--cyan)" },
  { titleKey: "how4_t", descKey: "how4_d", noteKey: "how4_note", color: "var(--green)" },
];

export default function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section id="ako-to-funguje" className={styles.section}>
      <Reveal className={styles.head}>
        <div>
          <div className={styles.kicker}>{t("how_kicker")}</div>
          <h2 className={styles.title}>{t("how_title")}</h2>
        </div>
        <p className={styles.intro}>{t("how_intro")}</p>
      </Reveal>

      <div className={styles.steps}>
        {STEPS.map((step, i) => (
          <Reveal
            key={step.titleKey}
            as="div"
            className={styles.step}
            style={{ transitionDelay: `${i * 90}ms` }}
          >
            <div className={styles.stepTop}>
              <span className={styles.num} style={{ color: step.color }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={styles.line} style={{ background: step.color }} />
            </div>
            <h3 className={styles.stepTitle}>{t(step.titleKey)}</h3>
            <p className={styles.stepDesc}>{t(step.descKey)}</p>
            <span className={styles.note} style={{ background: step.color }}>
              {t(step.noteKey)}
            </span>
          </Reveal>
        ))}
      </div>

      <Reveal className={styles.ctaWrap}>
        <Link href="/#kontakt" className={styles.cta} data-cursor="cta">
          {t("how_cta")}
        </Link>
      </Reveal>
    </section>
  );
}
