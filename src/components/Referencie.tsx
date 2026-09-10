"use client";

import { useLanguage } from "@/lib/i18n";
import { referencie } from "@/data/referencie";
import Reveal from "./Reveal";
import styles from "./Referencie.module.css";

const COLORS = ["var(--accent)", "var(--purple)", "var(--cyan)", "var(--green)"];

export default function Referencie() {
  const { t, lang } = useLanguage();

  // Kým nemáme skutočné referencie, sekciu radšej nezobrazujeme vôbec.
  if (referencie.length === 0) return null;

  return (
    <section id="referencie" className={styles.section}>
      <Reveal className={styles.head}>
        <div className={styles.kicker}>{t("ref_kicker")}</div>
        <h2 className={styles.title}>{t("ref_title")}</h2>
      </Reveal>

      <div className={styles.grid}>
        {referencie.map((item, i) => (
          <Reveal
            key={item.name + i}
            as="figure"
            className={styles.card}
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <span className={styles.mark} style={{ color: COLORS[i % COLORS.length] }}>
              „
            </span>
            <blockquote className={styles.quote}>{item.quote[lang]}</blockquote>
            <figcaption className={styles.who}>
              <span className={styles.name}>{item.name}</span>
              <span className={styles.role}>{item.role}</span>
            </figcaption>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
