"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import Emph from "./Emph";
import Reveal from "./Reveal";
import styles from "./CtaBand.module.css";

export default function CtaBand() {
  const { t } = useLanguage();

  return (
    <section id="navrh" className={styles.section}>
      <Reveal className={styles.band}>
        <div>
          <div className={styles.kicker}>{t("band_kicker")}</div>
          <h2 className={styles.title}>
            <Emph text={t("band_title")} variant="text" />
          </h2>
          <p className={styles.sub}>
            <Emph text={t("band_sub")} />
          </p>
        </div>
        <Link href="/#kontakt" className={styles.cta} data-cursor="cta">
          <span className={styles.ctaBadge}>{t("hero_cta_badge")}</span>
          {t("band_cta")}
        </Link>
      </Reveal>
    </section>
  );
}
