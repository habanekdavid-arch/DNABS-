"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage, type DictKey } from "@/lib/i18n";
import Reveal from "./Reveal";
import styles from "./About.module.css";
import logo from "../assets/dnabs-logo.png";

const STAT_ITEMS: { value: ReactNode; labelKey: DictKey }[] = [
  { value: <>5<span className={styles.plus}>+</span></>, labelKey: "stat1" },
  { value: <>4</>, labelKey: "stat2" },
  { value: <>3<span className={styles.plus}>×</span></>, labelKey: "stat3" },
];

export default function About() {
  const { t } = useLanguage();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="o-nas" className={styles.section}>
      <Image src={logo} alt="" aria-hidden className={styles.ghostLogo} />
      <Reveal className={styles.inner}>
        <div className={styles.kicker}>{t("about_kicker")}</div>
        <h2 className={styles.h2}>
          <span className={styles.h2Line}>{t("about_h1")}</span>
          <span className={styles.h2Serif}>{t("about_h2")}</span>
        </h2>
        <p className={styles.body}>{t("about_body")}</p>

        <div className={styles.stats}>
          {STAT_ITEMS.map((stat, i) => (
            <div
              key={i}
              className={styles.stat}
              style={{ transform: hovered === i ? "translateY(-6px)" : "none" }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                className={styles.statNum}
                style={{ color: hovered === i ? "var(--green)" : undefined }}
              >
                {stat.value}
              </div>
              <div className={styles.statLabel}>{t(stat.labelKey)}</div>
            </div>
          ))}
        </div>
        <p className={styles.foundedNote}>{t("about_founded_note")}</p>
        <Link href="/o-nas" className={styles.moreLink}>
          {t("about_more_link")}
        </Link>
      </Reveal>
    </section>
  );
}
