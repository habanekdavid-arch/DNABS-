"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLanguage, type DictKey } from "@/lib/i18n";
import Reveal from "./Reveal";
import styles from "./Services.module.css";

type Chip = { sk: string; en: string };

const ROWS: {
  titleKey: DictKey;
  descKey: DictKey;
  /** Farba služby. Musí byť čitateľná na svetlom pozadí. */
  color: string;
  chips: Chip[];
}[] = [
  {
    titleKey: "svc1_t",
    descKey: "svc1_d",
    color: "#E24A08",
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
    color: "#563387",
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
    color: "#12A03F",
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

  /* Ukazovatele sa rozbehnú, až keď sa na sekciu doscrolluje — rovnako
     ako grafy vo výsledkoch. */
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Každá dlaždica sleduje kurzor sama za seba: podľa toho, kde na nej
     myš je, sa nakloní a posvieti si na to miesto. Hodnoty ukladáme ako
     premenné priamo na tú dlaždicu, takže susedné o sebe nevedia. */
  const naPohyb = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    /* Nad jednotlivým bodom náklon zmrazíme. Inak by sa dlaždica hýbala
       ďalej a bod by ušiel spod kurzora — pri malých cieľoch to znamená,
       že sa naň nedá udržať. */
    if ((e.target as HTMLElement).closest("[data-bod]")) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
    /* Naklonenie píšeme rovno do inline štýlu, nie cez :hover v CSS.
       Reveal si totiž transform drží tiež inline (kvôli nábehu zdola) a
       inline štýl prebije akékoľvek pravidlo zo súboru — hover cez CSS
       by sa sem nikdy nedostal. */
    /* Náklon je zámerne mierny. Dlaždica sa pri ňom posúva a body v nej
       sú malé ciele — pri väčšom náklone by spod kurzora ušli. */
    el.style.transform =
      `perspective(1000px) rotateY(${((x - 0.5) * 4).toFixed(2)}deg)` +
      ` rotateX(${((0.5 - y) * 4).toFixed(2)}deg) translateY(-4px) scale(1.008)`;
  };

  /* Späť na hodnotu, ktorú prvku dáva Reveal v odhalenom stave. */
  const naOdchod = (e: React.PointerEvent<HTMLElement>) => {
    e.currentTarget.style.transform = "none";
  };

  const stav = lang === "en" ? "AVAILABLE" : "DOSTUPNÉ";

  return (
    <section id="sluzby" className={styles.section}>
      <div className={styles.inner}>
        <Reveal className={styles.head}>
          <div>
            <div className={styles.label}>{t("svc_kicker")}</div>
            <h2 className={styles.title} data-fx>
              {t("svc_title")}
              <span className={styles.caret} aria-hidden />
            </h2>
          </div>
          <p className={styles.sub}>{t("svc_intro")}</p>
        </Reveal>

        <div ref={ref} className={`${styles.grid} ${on ? styles.on : ""}`}>
          {ROWS.map((row, i) => (
            <Reveal
              key={row.titleKey}
              as="article"
              className={styles.tile}
              onPointerMove={naPohyb}
              onPointerLeave={naOdchod}
              style={
                {
                  transitionDelay: `${i * 90}ms`,
                  "--c": row.color,
                  "--d": `${300 + i * 160}ms`,
                } as React.CSSProperties
              }
            >
              <div className={styles.tileHead}>
                <span>
                  {String(i + 1).padStart(2, "0")}
                  <span className={styles.sep}> / </span>
                  {t(row.titleKey)}
                </span>
                <span className={styles.stav}>
                  <span className={styles.dioda} aria-hidden />
                  {stav}
                </span>
              </div>

              <p className={styles.desc}>{t(row.descKey)}</p>

              <div className={styles.chips}>
                {row.chips.map((chip, j) => (
                  /* --n strieda smer náklonu, takže susedné body sa pri
                     nadvihnutí nakláňajú na opačnú stranu. */
                  <span
                    key={chip.en}
                    className={styles.chip}
                    data-bod
                    style={{ "--n": j % 2 === 0 ? 1 : -1 } as React.CSSProperties}
                  >
                    {chip[lang]}
                  </span>
                ))}
              </div>

              <span className={styles.track} aria-hidden>
                <span className={styles.fill} />
              </span>

              <Link href="/#kontakt" className={styles.cta} data-cursor="cta">
                {t("svc_card_cta")}
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
