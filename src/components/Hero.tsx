"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n";
import Nav from "./Nav";
import styles from "./Hero.module.css";
import laptop from "../assets/laptop-glitch.png";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className={styles.hero}>
      <div className={styles.grid} />
      <div className={styles.scanlines} />

      <div className={styles.coordMarker}>N48.1486° / E17.1077° — BRATISLAVA / SK</div>
      <div className={styles.figMarker}>
        [ FIG.01 — HERO ]<br />EST. 2026
      </div>

      <Nav />

      <div className={styles.laptopWrap}>
        <Image src={laptop} alt="" aria-hidden className={styles.laptopImg} priority />
      </div>

      <div className={styles.dot} />
      <div className={styles.renderTag}>[ RENDER · 3× SPEED ]</div>
      <div className={styles.barPurple} />
      <div className={styles.barCyan} />
      <div className={styles.barAccent} />
      <div className={styles.barPurple2} />
      <div className={styles.sysTag}>SYS://DNABS.EXE</div>
      <div className={styles.hexTag}>0xFF — REBUILD_OK</div>

      <div className={styles.headline}>
        <div className={styles.kicker}>{t("hero_kicker")}</div>
        <h1 className={styles.h1}>
          <span className={styles.h1Line}>{t("hero_l1")}</span>
          <span className={styles.h1Line}>
            {t("hero_l2")} <span className={styles.script}>{t("hero_l3")}</span>
          </span>
        </h1>
        <p className={styles.sub}>{t("hero_sub")}</p>
        <div className={styles.ctaRow}>
          <a href="#kontakt" className={styles.ctaPrimary}>
            <span className={styles.ctaBadge}>{t("hero_cta_badge")}</span>
            {t("hero_cta1")}
          </a>
          <a href="#sluzby" className={styles.ctaSecondary}>{t("hero_cta2")}</a>
        </div>
      </div>
    </section>
  );
}
