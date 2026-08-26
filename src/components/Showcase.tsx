"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n";
import Reveal from "./Reveal";
import { showcase } from "@/data/showcase";
import styles from "./Showcase.module.css";

export default function Showcase() {
  const { t, lang } = useLanguage();

  return (
    <section id="ukazky" className={styles.section}>
      <Reveal className={styles.head}>
        <div>
          <div className={styles.kicker}>{t("showcase_kicker")}</div>
          <h2 className={styles.title}>{t("showcase_title")}</h2>
        </div>
        <p className={styles.intro}>{t("showcase_intro")}</p>
      </Reveal>

      {showcase.map((item, i) => (
        <Reveal
          key={item.firma}
          as="div"
          className={`${styles.item} ${i === showcase.length - 1 ? styles.last : ""}`}
        >
          <div className={styles.imgGrid}>
            <div className={styles.imgCol}>
              <span className={styles.imgLabel}>{t("showcase_before")}</span>
              <Image
                src={item.imgBefore}
                alt={`${item.firma} — ${t("showcase_before").toLowerCase()}`}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className={styles.img}
                loading="lazy"
              />
            </div>
            <div className={styles.imgCol}>
              <span className={styles.imgLabel}>{t("showcase_after")}</span>
              <Image
                src={item.imgAfter}
                alt={`${item.firma} — ${t("showcase_after").toLowerCase()}`}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className={styles.img}
                loading="lazy"
              />
            </div>
          </div>
          <div className={styles.caption}>
            <div className={styles.firma}>{item.firma}</div>
            <div className={styles.nika}>{item.nika[lang]}</div>
          </div>
          <p className={styles.poznamka}>{item.poznamka[lang]}</p>
        </Reveal>
      ))}

      <div className={styles.ctaRow}>
        <a href="#kontakt" className={styles.cta}>
          {t("showcase_cta")}
        </a>
      </div>
    </section>
  );
}
