"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage, type DictKey } from "@/lib/i18n";
import Reveal from "./Reveal";
import styles from "./Services.module.css";

const SVC_COLORS = ["var(--accent)", "var(--purple)", "var(--green)"];

type Chip = { sk: string; en: string };

const ROWS: {
  titleKey: DictKey;
  descKey: DictKey;
  chips: Chip[];
}[] = [
  {
    titleKey: "svc1_t",
    descKey: "svc1_d",
    chips: [
      { sk: "Next.js", en: "Next.js" },
      { sk: "Webflow", en: "Webflow" },
      { sk: "E-shop", en: "E-commerce" },
      { sk: "Responzívny dizajn", en: "Responsive design" },
      { sk: "SEO základ", en: "SEO foundations" },
      { sk: "Doména a hosting", en: "Domain and hosting" },
    ],
  },
  {
    titleKey: "svc2_t",
    descKey: "svc2_d",
    chips: [
      { sk: "Webové aplikácie", en: "Web apps" },
      { sk: "iOS / Android", en: "iOS / Android" },
      { sk: "Rezervačné systémy", en: "Booking systems" },
      { sk: "Automatizácia", en: "Automation" },
      { sk: "Napojenie na API", en: "API integrations" },
      { sk: "Interné nástroje", en: "Internal tools" },
    ],
  },
  {
    titleKey: "svc3_t",
    descKey: "svc3_d",
    chips: [
      { sk: "Logo a brand identita", en: "Logo and brand identity" },
      { sk: "Fotografie", en: "Photography" },
      { sk: "Google Ads", en: "Google Ads" },
      { sk: "Sociálne siete", en: "Social media" },
      { sk: "Výkonnostné kampane", en: "Performance campaigns" },
      { sk: "SEO a obsah", en: "SEO and content" },
    ],
  },
];

export default function Services() {
  const { t, lang } = useLanguage();
  const [hovered, setHovered] = useState<number | null>(null);
  // Na dotyku by klik na celú kartu odpálil scroll k formuláru skôr, než si
  // človek stihne kartu prečítať. Tam preto karta nie je odkaz a klikacie je
  // len tlačidlo v nej.
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: none)");
    const sync = () => setTouch(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

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
        // Na oranžovej aj zelenej sa biely text zle číta, tak tam ide tmavý.
        const ctaInk = color === "var(--purple)" ? "#fff" : "#0a0a0a";
        return (
          <Reveal
            key={i}
            as={touch ? "article" : Link}
            {...(touch ? {} : { href: "/#kontakt" })}
            className={`${styles.row} ${i === ROWS.length - 1 ? styles.last : ""}`}
            style={{
              background: isHovered ? color : "#fff",
              color: isHovered ? textColor : "#0a0a0a",
              transform: isHovered ? "translateY(-4px)" : "none",
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
                  <span key={chip.en} className={styles.chip}>
                    {chip[lang]}
                  </span>
                ))}
              </div>

              {touch && (
                <Link
                  href="/#kontakt"
                  className={styles.cardCta}
                  style={
                    // Na vyfarbenej karte by tlačidlo v tej istej farbe zaniklo.
                    isHovered
                      ? { background: "#fff", color: "#0a0a0a" }
                      : { background: color, color: ctaInk }
                  }
                >
                  {t("svc_card_cta")}
                </Link>
              )}
            </div>
          </Reveal>
        );
      })}
    </section>
  );
}
