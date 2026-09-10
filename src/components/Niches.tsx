"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { niches } from "@/data/niches";
import Reveal from "./Reveal";
import styles from "./Niches.module.css";

const COLORS = ["var(--accent)", "var(--purple)", "var(--cyan)", "var(--green)"];

export default function Niches() {
  const { t, lang } = useLanguage();

  return (
    <section id="pre-koho" className={styles.section}>
      <Reveal className={styles.head}>
        <div>
          <div className={styles.kicker}>{t("niches_kicker")}</div>
          <h2 className={styles.title}>{t("niches_title")}</h2>
        </div>
        <p className={styles.intro}>{t("niches_intro")}</p>
      </Reveal>

      <div className={styles.grid}>
        {niches.map((niche, i) => (
          <Reveal
            key={niche.slug}
            as={Link}
            href={`/weby-pre/${niche.slug}`}
            className={styles.card}
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <span className={styles.bar} style={{ background: COLORS[i % COLORS.length] }} />
            <h3 className={styles.cardTitle}>{niche.label[lang]}</h3>
            <p className={styles.cardText}>{niche.bullets[0][lang]}</p>
            <span className={styles.cardLink}>{t("niches_link")}</span>
          </Reveal>
        ))}
      </div>

      <Reveal className={styles.missing}>
        <span>{t("niches_missing")}</span>
        <Link href="/#kontakt" className={styles.missingLink} data-cursor="cta">
          {t("band_cta")}
        </Link>
      </Reveal>
    </section>
  );
}
