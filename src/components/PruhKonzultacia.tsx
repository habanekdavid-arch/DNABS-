"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import styles from "./PruhKonzultacia.module.css";

const OBSAH = {
  text: {
    sk: ["Návrh webu na mieru ", "zadarmo", ", bez záväzkov."],
    en: ["A custom website design ", "free of charge", ", no commitment."],
  },
  tlacidlo: { sk: "Kontaktný formulár", en: "Contact form" },
};

/**
 * Tenký pruh medzi sekciami — jedna veta a tlačidlo na formulár.
 * Nahradil dlhú sekciu „o nás", ktorá tu len zdržiavala.
 */
export default function PruhKonzultacia() {
  const { lang } = useLanguage();
  const [pred, zvyraznene, za] = OBSAH.text[lang];

  return (
    <section className={styles.section} aria-label={OBSAH.tlacidlo[lang]}>
      <div className={styles.pruh}>
        <p className={styles.text}>
          {pred}
          <strong>{zvyraznene}</strong>
          {za}
        </p>

        <Link href="/#kontakt" className={styles.cta} data-cursor="cta">
          <span className={styles.ctaText}>{OBSAH.tlacidlo[lang]}</span>
          <span className={styles.ctaSipka} aria-hidden>›</span>
        </Link>
      </div>
    </section>
  );
}
