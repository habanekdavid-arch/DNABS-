"use client";

import { useState } from "react";
import { useLanguage, type DictKey } from "@/lib/i18n";
import Reveal from "./Reveal";
import styles from "./Services.module.css";

const SVC_COLORS = ["var(--accent)", "var(--purple)", "var(--green)"];

const ROWS: {
  titleKey: DictKey;
  descKey: DictKey;
  chips: string[];
}[] = [
  { titleKey: "svc1_t", descKey: "svc1_d", chips: ["Next.js", "Webflow", "E-commerce"] },
  { titleKey: "svc2_t", descKey: "svc2_d", chips: ["Web app", "iOS / Android", "Automatizácia"] },
  { titleKey: "svc3_t", descKey: "svc3_d", chips: ["Performance", "Brand", "SEO / Obsah"] },
];

export default function Services() {
  const { t } = useLanguage();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="sluzby" className={styles.section}>
      <Reveal className={styles.head}>
        <div>
          <div className={styles.kicker}>{t("svc_kicker")}</div>
          <h2 className={styles.title}>{t("svc_title")}</h2>
        </div>
        <p className={styles.intro}>{t("svc_intro")}</p>
      </Reveal>

      {ROWS.map((row, i) => {
        const isHovered = hovered === i;
        const color = SVC_COLORS[i % SVC_COLORS.length];
        const textColor = color === "var(--green)" ? "#0a0a0a" : "#fff";
        return (
          <Reveal
            key={i}
            as="div"
            className={`${styles.row} ${i === ROWS.length - 1 ? styles.last : ""}`}
            style={{
              background: isHovered ? color : "transparent",
              color: isHovered ? textColor : "#0a0a0a",
            }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <div
              className={styles.num}
              style={{
                color: isHovered ? textColor : undefined,
                transform: isHovered ? "translateX(8px)" : "none",
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className={styles.body}>
              <h3>{t(row.titleKey)}</h3>
              <p>{t(row.descKey)}</p>
              <div className={styles.chips}>
                {row.chips.map((chip) => (
                  <span key={chip} className={styles.chip}>{chip}</span>
                ))}
              </div>
            </div>
            <div
              className={styles.arrow}
              style={{
                color: isHovered ? textColor : undefined,
                transform: isHovered ? "translateX(12px)" : "none",
              }}
            >
              ↗
            </div>
          </Reveal>
        );
      })}
    </section>
  );
}
