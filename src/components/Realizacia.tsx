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
      </Reveal>

      <Reveal className={styles.card}>
        <div className={styles.imgWrap}>
          <Image
            src={screenshot}
            alt="VytlačTo3D — online konfigurátor a e-shop pre 3D tlač"
            fill
            sizes="(max-width: 900px) 100vw, 1100px"
            className={styles.img}
          />
        </div>
        <div className={styles.body}>
          <div className={styles.text}>
            <div className={styles.name}>VytlačTo3D</div>
            <p className={styles.intro}>{t("realizacia_intro")}</p>
          </div>
          <div className={styles.ctas}>
            <a
              href="https://www.vytlacto3d.sk/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaSecondary}
            >
              {t("realizacia_cta")}
            </a>
            <a href="#kontakt" className={styles.ctaPrimary}>
              {t("realizacia_cta2")}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
