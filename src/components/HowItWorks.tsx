"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLanguage, type DictKey } from "@/lib/i18n";
import Reveal from "./Reveal";
import styles from "./HowItWorks.module.css";

/* Ikony kreslíme rovnakým perom ako zvyšok webu — tenká linka, žiadna výplň. */
const svg = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function FormIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...svg}>
      <rect x="3.2" y="2.5" width="13" height="18" rx="2.4" />
      <path d="M6.6 7.2h6.2M6.6 11h6.2M6.6 14.8h3.2" />
      <path d="M18.8 17.5l6.4 2.6-2.8 1-1 2.8z" className={styles.iconCursor} />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...svg}>
      <rect x="2.4" y="5.2" width="19.2" height="14" rx="2.4" />
      <path d="M3.2 7l8.8 6 8.8-6" />
      <path d="M21.8 -0.8l.8 1.9 1.9.8-1.9.8-.8 1.9-.8-1.9-1.9-.8 1.9-.8z" className={styles.iconSpark} />
    </svg>
  );
}

function TalkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...svg}>
      <rect x="1.8" y="3.2" width="12.4" height="9" rx="2.6" />
      <path d="M5.6 12.2v3.4l3.6-3.4" />
      <g className={styles.iconBubble}>
        <rect x="11.6" y="12.8" width="10.6" height="7.6" rx="2.4" />
        <path d="M19.4 20.4v3l-3.2-3" />
      </g>
    </svg>
  );
}

function PayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...svg}>
      <rect x="2.4" y="4.6" width="19.2" height="13" rx="2.4" />
      <path d="M2.4 9.2h19.2" />
      <path d="M6 13.6h3.4" />
      <path d="M16.4 21.8l2.4 2.4 4.8-5" className={styles.iconCheck} />
    </svg>
  );
}

const STEPS: {
  titleKey: DictKey;
  descKey: DictKey;
  noteKey: DictKey;
  /** Značková farba kroku. Musí byť čitateľná na svetlom pozadí. */
  color: string;
  icon: ReactNode;
}[] = [
  { titleKey: "how1_t", descKey: "how1_d", noteKey: "how1_note", color: "#E24A08", icon: <FormIcon /> },
  { titleKey: "how2_t", descKey: "how2_d", noteKey: "how2_note", color: "#563387", icon: <MailIcon /> },
  { titleKey: "how3_t", descKey: "how3_d", noteKey: "how3_note", color: "#1E6FA8", icon: <TalkIcon /> },
  { titleKey: "how4_t", descKey: "how4_d", noteKey: "how4_note", color: "#12A03F", icon: <PayIcon /> },
];

export default function HowItWorks() {
  const { t, lang } = useLanguage();

  /* Ukazovatele sa naplnia až keď sa na sekciu doscrolluje — rovnako
     ako grafy v sekcii s výsledkami. */
  const ref = useRef<HTMLDivElement>(null);
  const [nabehnute, setNabehnute] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setNabehnute(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNabehnute(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const krok = lang === "en" ? "STEP" : "KROK";

  return (
    <section id="ako-to-funguje" className={styles.section}>
      <div className={styles.inner}>
        <Reveal className={styles.head}>
          <div>
            <div className={styles.label}>{t("how_kicker")}</div>
            <h2 className={styles.title} data-fx>{t("how_title")}</h2>
          </div>
          <p className={styles.sub}>{t("how_intro")}</p>
        </Reveal>

        <div ref={ref} className={`${styles.grid} ${nabehnute ? styles.on : ""}`}>
          {/* Schematická linka, na ktorej kroky sedia. */}
          <span className={styles.rail} aria-hidden />

          {STEPS.map((step, i) => (
            <Reveal
              key={step.titleKey}
              as="article"
              className={styles.tile}
              style={
                {
                  transitionDelay: `${i * 90}ms`,
                  "--c": step.color,
                  "--p": `${((i + 1) / STEPS.length) * 100}%`,
                  "--d": `${300 + i * 140}ms`,
                } as React.CSSProperties
              }
            >
              <span className={styles.uzol} aria-hidden />

              <div className={styles.tileHead}>
                <span>
                  {krok} {String(i + 1).padStart(2, "0")}
                  <span className={styles.zo}> / {String(STEPS.length).padStart(2, "0")}</span>
                </span>
                <span className={styles.delta}>{t(step.noteKey)}</span>
              </div>

              <span className={styles.icon}>{step.icon}</span>

              <h3 className={styles.stepTitle}>{t(step.titleKey)}</h3>
              <p className={styles.stepDesc}>{t(step.descKey)}</p>

              <span className={styles.track} aria-hidden>
                <span className={styles.fill} />
              </span>
            </Reveal>
          ))}
        </div>

        <Reveal className={styles.ctaWrap}>
          <Link href="/#kontakt" className={styles.cta} data-cursor="cta" data-fx>
            {t("how_cta")}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
