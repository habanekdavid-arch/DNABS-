"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import styles from "./Spolupraca.module.css";

/* Písmená loga. Každé má nad sebou číslo a pri hoveri sa rozsype. */
const PISMENA = ["D", "N", "A", "B", "S"];

const OBSAH = {
  label: { sk: "[ FIG.05 — SPOLUPRÁCA ]", en: "[ FIG.05 — PARTNERSHIP ]" },
  podpis: { sk: "DIGITÁLNE ŠTÚDIO", en: "DIGITAL STUDIO" },
  tvrdenia: {
    sk: [
      ["Web, ktorý", "ľudia naozaj používajú."],
      ["Reklama, ktorá", "má dôvod fungovať."],
      ["Čísla, ktoré", "si viete overiť."],
    ],
    en: [
      ["A site people", "actually use."],
      ["Ads that have", "a reason to work."],
      ["Numbers you", "can verify."],
    ],
  },
  anoTitul: { sk: "Pre koho", en: "Who it's" },
  anoZvyrazne: { sk: "ÁNO", en: "FOR" },
  nieTitul: { sk: "Pre koho", en: "Who it's" },
  nieZvyrazne: { sk: "NIE", en: "NOT" },
  ano: {
    sk: [
      ["Firmy, ktoré rastú", "Chcú web, ktorý im vozí dopyty, nie len vizitku."],
      ["Jasné zadanie", "Viete, čo predávate a komu. Zvyšok doriešime spolu."],
      ["Dlhodobá spolupráca", "Web spustíme a potom ho ladíme podľa čísel."],
    ],
    en: [
      ["Companies that grow", "They want a site that brings leads, not just a business card."],
      ["A clear brief", "You know what you sell and to whom. We work out the rest together."],
      ["Long-term work", "We launch, then tune it against the numbers."],
    ],
  },
  nie: {
    sk: [
      ["Najlacnejšie riešenie", "Ak rozhoduje len cena, nájdete lacnejšieho dodávateľa."],
      ["Web za dva dni", "Poriadny návrh a texty potrebujú čas. Rýchlokvasku nerobíme."],
      ["Hotovo a zabudnuté", "Web bez merania a údržby prestane fungovať do roka."],
    ],
    en: [
      ["The cheapest option", "If price is all that counts, you'll find someone cheaper."],
      ["A site in two days", "A proper design and copy take time. We don't do rush jobs."],
      ["Done and forgotten", "A site with no measurement or upkeep stops working within a year."],
    ],
  },
  cta: { sk: "Poďme do toho →", en: "Let's do it →" },
};

export default function Spolupraca() {
  const { lang } = useLanguage();
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
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="spolupraca" className={`fig-section ${styles.section}`}>
      <div className="fig-inner">
        <div className="fig-label">{OBSAH.label[lang]}</div>

        {/* ── Lockup loga ─────────────────────────────────────────── */}
        <div ref={ref} className={`${styles.lockup} ${on ? styles.on : ""}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="DNABS" className={styles.znak} />

          <div className={styles.pismena}>
            {PISMENA.map((p, i) => (
              <span
                key={p}
                className={styles.pismeno}
                style={{ "--i": i } as React.CSSProperties}
              >
                <span className={styles.pismenoZnak} data-text={p}>{p}</span>
                <span className={styles.cislo}>{i + 1}</span>
              </span>
            ))}
          </div>
        </div>

        <div className={styles.podpis} aria-hidden>
          {[...OBSAH.podpis[lang]].map((z, i) => (
            <span key={i}>{z === " " ? " " : z}</span>
          ))}
        </div>

        {/* ── Tmavý pás s tvrdeniami ──────────────────────────────── */}
        <div className={styles.pas}>
          <DnaStuha />
          <div className={styles.pasText}>
            {OBSAH.tvrdenia[lang].map(([a, b], i) => (
              <p key={i} className={styles.tvrdenie} style={{ "--i": i } as React.CSSProperties}>
                <span className={styles.tvrdenieDioda} aria-hidden />
                {a} <strong>{b}</strong>
              </p>
            ))}
          </div>
        </div>

        {/* ── Pre koho áno / nie ──────────────────────────────────── */}
        <div className={styles.stlpce}>
          <div className={styles.stlpec} style={{ "--c": "#12A03F" } as React.CSSProperties}>
            <h3 className={styles.stlpecTitul}>
              {OBSAH.anoTitul[lang]} <em>{OBSAH.anoZvyrazne[lang]}</em>
            </h3>
            {OBSAH.ano[lang].map(([t, d]) => (
              <div key={t} className={styles.polozka}>
                <div className={styles.polozkaTitul}>
                  <span className={styles.krizik} aria-hidden>◇</span>
                  {t}
                </div>
                <p className={styles.polozkaText}>{d}</p>
              </div>
            ))}
          </div>

          <div className={`${styles.stlpec} ${styles.stlpecNie}`} style={{ "--c": "#D11149" } as React.CSSProperties}>
            <h3 className={styles.stlpecTitul}>
              {OBSAH.nieTitul[lang]} <em>{OBSAH.nieZvyrazne[lang]}</em>
            </h3>
            {OBSAH.nie[lang].map(([t, d]) => (
              <div key={t} className={styles.polozka}>
                <div className={styles.polozkaTitul}>
                  {t}
                  <span className={styles.krizik} aria-hidden>◈</span>
                </div>
                <p className={styles.polozkaText}>{d}</p>
              </div>
            ))}
          </div>
        </div>

        <Link href="/#kontakt" className={`fig-cta ${styles.cta}`} data-cursor="cta" data-fx>
          {OBSAH.cta[lang]}
        </Link>
      </div>
    </section>
  );
}

/**
 * Dvojzávitnica v pozadí tmavého pásu. Dve sínusovky z bodov, ktoré sa
 * proti sebe vlnia — obe sú len SVG, takže to nestojí skoro nič.
 */
function DnaStuha() {
  const bodov = 44;
  const sirka = 1200;
  const vyska = 120;
  const krok = sirka / (bodov - 1);

  return (
    <svg className={styles.dna} viewBox={`0 0 ${sirka} ${vyska}`} preserveAspectRatio="none" aria-hidden>
      {Array.from({ length: bodov }, (_, i) => {
        const x = i * krok;
        const posun = `${(i / bodov) * -2.2}s`;
        return (
          <g key={i} style={{ "--posun": posun } as React.CSSProperties} className={styles.dnaPar}>
            <line x1={x} x2={x} y1={vyska * 0.5 - 26} y2={vyska * 0.5 + 26} className={styles.dnaSpojka} />
            <circle cx={x} cy={vyska * 0.5} r="3.2" className={styles.dnaBodA} />
            <circle cx={x} cy={vyska * 0.5} r="3.2" className={styles.dnaBodB} />
          </g>
        );
      })}
    </svg>
  );
}
