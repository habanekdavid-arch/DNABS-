"use client";

import { useLanguage } from "@/lib/i18n";
import Nav from "./Nav";
import Reveal from "./Reveal";
import type { Niche } from "@/data/niches";
import styles from "./NicheHero.module.css";

export default function NicheHero({ niche }: { niche: Niche }) {
  const { t, lang } = useLanguage();

  return (
    <section className={styles.section}>
      <div className={styles.grid} />
      <Nav />
      <Reveal className={styles.inner}>
        <div className={styles.kicker}>{t("niche_kicker")}</div>
        <h1 className={styles.h1}>{niche.headline[lang]}</h1>
        <p className={styles.copy}>{niche.copy[lang]}</p>
        <ul className={styles.bullets}>
          {niche.bullets.map((bullet) => (
            <li key={bullet[lang]} className={styles.bullet}>
              <span className={styles.bulletMark} aria-hidden>
                →
              </span>
              <span>{bullet[lang]}</span>
            </li>
          ))}
        </ul>
        <a href="#kontakt" className={styles.cta}>
          {t("hero_cta1")}
        </a>
      </Reveal>
    </section>
  );
}
