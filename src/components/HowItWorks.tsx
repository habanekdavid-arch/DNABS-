"use client";

import Link from "next/link";
import type { ReactNode } from "react";
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
      <path d="M17.2 15.9l6.4 2.6-2.8 1-1 2.8z" className={styles.iconCursor} />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...svg}>
      <rect x="2.4" y="5.2" width="19.2" height="14" rx="2.4" />
      <path d="M3.2 7l8.8 6 8.8-6" />
      <path d="M20.4 0.6l.8 1.9 1.9.8-1.9.8-.8 1.9-.8-1.9-1.9-.8 1.9-.8z" className={styles.iconSpark} />
    </svg>
  );
}

function TalkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...svg}>
      <path d="M2.6 6.4a2.4 2.4 0 012.4-2.4h8.4a2.4 2.4 0 012.4 2.4v4.4a2.4 2.4 0 01-2.4 2.4H7.4l-3.6 2.8v-2.8a2.4 2.4 0 01-1.2-2.1z" />
      <path
        d="M18 9.2h1.4a2.4 2.4 0 012.4 2.4v4.4a2.4 2.4 0 01-1.2 2.1v2.8l-3.6-2.8h-5.2"
        className={styles.iconBubble}
      />
    </svg>
  );
}

function PayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...svg}>
      <rect x="2.4" y="4.6" width="19.2" height="13" rx="2.4" />
      <path d="M2.4 9.2h19.2" />
      <path d="M6 13.6h3.4" />
      <path d="M15 20.4l2.4 2.4 4.8-5" className={styles.iconCheck} />
    </svg>
  );
}

const STEPS: {
  titleKey: DictKey;
  descKey: DictKey;
  noteKey: DictKey;
  /** Značková farba — číslo, ukazovateľ, štítok, závoj. */
  color: string;
  /** Výplň dlaždice s ikonou; tmavší odtieň, nech je biela ikona vidieť. */
  tile: string;
  /** Text na štítku vo výraznej farbe. */
  ink: string;
  icon: ReactNode;
}[] = [
  {
    titleKey: "how1_t",
    descKey: "how1_d",
    noteKey: "how1_note",
    color: "var(--accent)",
    tile: "#e64f00",
    ink: "#0a0a0a",
    icon: <FormIcon />,
  },
  {
    titleKey: "how2_t",
    descKey: "how2_d",
    noteKey: "how2_note",
    color: "var(--purple)",
    tile: "#6637ed",
    ink: "#fff",
    icon: <MailIcon />,
  },
  {
    titleKey: "how3_t",
    descKey: "how3_d",
    noteKey: "how3_note",
    color: "var(--cyan)",
    tile: "#0090a8",
    ink: "#0a0a0a",
    icon: <TalkIcon />,
  },
  {
    titleKey: "how4_t",
    descKey: "how4_d",
    noteKey: "how4_note",
    color: "var(--green)",
    tile: "#12a03f",
    ink: "#0a0a0a",
    icon: <PayIcon />,
  },
];

export default function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section id="ako-to-funguje" className={styles.section}>
      <Reveal className={styles.head}>
        <div>
          <div className={styles.kicker}>{t("how_kicker")}</div>
          <h2 className={styles.title}>{t("how_title")}</h2>
        </div>
        <p className={styles.intro}>{t("how_intro")}</p>
      </Reveal>

      <div className={styles.steps}>
        {STEPS.map((step, i) => (
          <Reveal
            key={step.titleKey}
            as="article"
            className={styles.step}
            style={
              {
                transitionDelay: `${i * 90}ms`,
                "--c": step.color,
                "--tile": step.tile,
                "--ink": step.ink,
              } as React.CSSProperties
            }
          >
            <div className={styles.stepTop}>
              <span className={styles.icon}>{step.icon}</span>
              <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
            </div>

            <span className={styles.track}>
              <span className={styles.fill} />
            </span>

            <h3 className={styles.stepTitle}>{t(step.titleKey)}</h3>
            <p className={styles.stepDesc}>{t(step.descKey)}</p>
            <span className={styles.note}>{t(step.noteKey)}</span>
          </Reveal>
        ))}
      </div>

      <Reveal className={styles.ctaWrap}>
        <Link href="/#kontakt" className={styles.cta} data-cursor="cta">
          {t("how_cta")}
        </Link>
      </Reveal>
    </section>
  );
}
