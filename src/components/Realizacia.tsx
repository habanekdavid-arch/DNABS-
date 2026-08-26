"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n";
import Reveal from "./Reveal";
import styles from "./Realizacia.module.css";
import screenshot from "../assets/vytlacto3d.png";

export default function Realizacia() {
  const { t } = useLanguage();

  return (
    <section id="realizacia" className={styles.section}>
      <Reveal className={styles.head}>
        <div className={styles.kicker}>{t("realizacia_kicker")}</div>
        <h2 className={styles.title}>{t("realizacia_title")}</h2>
        <p className={styles.intro}>{t("realizacia_intro")}</p>
      </Reveal>

      <Reveal className={styles.wrap}>
        <a
          href="https://www.vytlacto3d.sk/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.card}
        >
          <div className={styles.imgWrap}>
            <Image
              src={screenshot}
              alt="VytlačTo3D — online konfigurátor a e-shop pre 3D tlač"
              fill
              sizes="420px"
              className={styles.img}
            />
          </div>
          <div className={styles.body}>
            <div className={styles.name}>VytlačTo3D</div>
            <span className={styles.link}>
              {t("realizacia_cta")}
              <span className={styles.linkArrow} aria-hidden>
                →
              </span>
            </span>
          </div>
        </a>
        <a href="#kontakt" className={styles.cta2}>
          {t("realizacia_cta2")}
        </a>
      </Reveal>
    </section>
  );
}
