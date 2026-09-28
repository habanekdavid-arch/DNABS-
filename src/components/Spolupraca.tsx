"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import DnaPlatno from "./DnaPlatno";
import styles from "./Spolupraca.module.css";

/* ── SPOLUPRÁCA ───────────────────────────────────────────────────────
   Časticová dvojzávitnica a vedľa nej grafy, ktoré hovoria, čo zo
   spolupráce vzíde. Čísla v grafoch sú buď verejné hranice Googlu, alebo
   opis toho, čo naozaj nastavujeme — nie vymyslené výsledky klientov.
   ─────────────────────────────────────────────────────────────────── */

const RYCHLOST = [
  { kod: "LCP", hodnota: "2,5 s", podiel: 100, farba: "#6637ED",
    popis: { sk: "kým sa zobrazí hlavný obsah", en: "until the main content shows" } },
  { kod: "INP", hodnota: "200 ms", podiel: 78, farba: "#9B4BE8",
    popis: { sk: "kým web odpovie na klik", en: "until the page answers a tap" } },
  { kod: "CLS", hodnota: "0,1", podiel: 56, farba: "#FF3D8B",
    popis: { sk: "koľko sa obsah pri načítaní pohne", en: "how much content shifts while loading" } },
];

const MERANIE = [
  { podiel: 100, farba: "#6637ED",
    text: { sk: "Dopyt z formulára", en: "Form enquiry" } },
  { podiel: 100, farba: "#9B4BE8",
    text: { sk: "Zdroj kampane pri dopyte", en: "Campaign source of the enquiry" } },
  { podiel: 100, farba: "#00C6DE",
    text: { sk: "Klik na telefón a e-mail", en: "Phone and e-mail taps" } },
  { podiel: 100, farba: "#FF5A1F",
    text: { sk: "Rozpracovaný formulár", en: "Abandoned form" } },
];

const KROKY = [
  { sk: "Konzultácia", en: "Consultation" },
  { sk: "Návrh", en: "Design" },
  { sk: "Spustenie", en: "Launch" },
  { sk: "Ladenie podľa čísel", en: "Tuning by numbers" },
];

const OBSAH = {
  label: { sk: "[ FIG.05 — SPOLUPRÁCA ]", en: "[ FIG.05 — PARTNERSHIP ]" },
  titul: { sk: "Digitálna DNA\nvašej značky", en: "The digital DNA\nof your brand" },
  sub: {
    sk: "Čo zo spolupráce vzíde — a podľa čoho to poznáte.",
    en: "What comes out of working together — and how you'll know.",
  },
  /* Nápoveda len tam, kde je kurzor — na dotyku by mýlila. */
  napoveda: {
    sk: "Prejdite myšou po závitnici.",
    en: "Run your cursor over the helix.",
  },
  cta: { sk: "Poďme do toho →", en: "Let's do it →" },

  rychlostLabel: { sk: "[ RÝCHLOSŤ ]", en: "[ SPEED ]" },
  rychlostTitul: { sk: "Na čo web ladíme", en: "What we tune for" },
  rychlostPata: {
    sk: "Hranice, pod ktorými Google hodnotí načítanie ako dobré. Merateľné kedykoľvek v PageSpeed Insights.",
    en: "The thresholds Google rates as good. Measurable any time in PageSpeed Insights.",
  },

  meranieLabel: { sk: "[ MERATEĽNOSŤ ]", en: "[ MEASURABILITY ]" },
  meranieTitul: { sk: "Čo uvidíte v reporte", en: "What you'll see in the report" },
  meraniePata: {
    sk: "Každý dopyt viete dohľadať až ku kampani, z ktorej prišiel.",
    en: "Every enquiry can be traced back to the campaign it came from.",
  },

  krokyLabel: { sk: "[ PRIEBEH ]", en: "[ PROCESS ]" },
  krokyTitul: { sk: "Ako to beží", en: "How it runs" },
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

  const [r1, r2] = OBSAH.titul[lang].split("\n");

  return (
    <section id="spolupraca" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.hlava}>
          <div>
            <div className={styles.label}>{OBSAH.label[lang]}</div>
            <h2 className={styles.titul}>
              <span>{r1}</span>
              <span className={styles.titulZvyr}>{r2}</span>
            </h2>
          </div>
          <p className={styles.sub}>
            {OBSAH.sub[lang]}
            <span className={styles.napoveda}> {OBSAH.napoveda[lang]}</span>
          </p>
        </div>

        <div ref={ref} className={`${styles.scena} ${on ? styles.on : ""}`}>
          <DnaPlatno />

          <div className={styles.grafy}>
            {/* Rýchlosť */}
            <div className={styles.karta} style={{ "--i": 0 } as React.CSSProperties}>
              <div className={styles.kartaHlava}>
                <span className={styles.kartaLabel}>{OBSAH.rychlostLabel[lang]}</span>
                <span className={styles.dioda} aria-hidden />
              </div>
              <div className={styles.kartaTitul}>{OBSAH.rychlostTitul[lang]}</div>

              {RYCHLOST.map((m, i) => (
                <div key={m.kod} className={styles.riadok}>
                  <div className={styles.riadokHlava}>
                    <span className={styles.kod}>{m.kod}</span>
                    <span className={styles.riadokPopis}>{m.popis[lang]}</span>
                    <span className={styles.hodnota}>≤&nbsp;{m.hodnota}</span>
                  </div>
                  <div className={styles.drazka}>
                    <span
                      className={styles.vypln}
                      style={
                        {
                          "--p": `${m.podiel}%`,
                          "--c": m.farba,
                          "--d": `${180 + i * 130}ms`,
                        } as React.CSSProperties
                      }
                    />
                  </div>
                </div>
              ))}

              <p className={styles.pata}>{OBSAH.rychlostPata[lang]}</p>
            </div>

            {/* Merateľnosť */}
            <div className={styles.karta} style={{ "--i": 1 } as React.CSSProperties}>
              <div className={styles.kartaHlava}>
                <span className={styles.kartaLabel}>{OBSAH.meranieLabel[lang]}</span>
                <span className={styles.dioda} aria-hidden />
              </div>
              <div className={styles.kartaTitul}>{OBSAH.meranieTitul[lang]}</div>

              {MERANIE.map((m, i) => (
                <div key={m.text.sk} className={styles.riadok}>
                  <div className={styles.riadokHlava}>
                    <span className={styles.riadokPopis}>{m.text[lang]}</span>
                    <span className={styles.fajka} style={{ "--c": m.farba } as React.CSSProperties}>
                      ✓
                    </span>
                  </div>
                  <div className={styles.drazka}>
                    <span
                      className={styles.vypln}
                      style={
                        {
                          "--p": `${m.podiel}%`,
                          "--c": m.farba,
                          "--d": `${240 + i * 120}ms`,
                        } as React.CSSProperties
                      }
                    />
                  </div>
                </div>
              ))}

              <p className={styles.pata}>{OBSAH.meraniePata[lang]}</p>
            </div>

            {/* Priebeh */}
            <div className={styles.karta} style={{ "--i": 2 } as React.CSSProperties}>
              <div className={styles.kartaHlava}>
                <span className={styles.kartaLabel}>{OBSAH.krokyLabel[lang]}</span>
                <span className={styles.dioda} aria-hidden />
              </div>
              <div className={styles.kartaTitul}>{OBSAH.krokyTitul[lang]}</div>

              <ol className={styles.kroky}>
                {KROKY.map((k, i) => (
                  <li
                    key={k.sk}
                    className={styles.krok}
                    style={{ "--d": `${300 + i * 140}ms` } as React.CSSProperties}
                  >
                    <span className={styles.krokBod} aria-hidden />
                    <span className={styles.krokCislo}>0{i + 1}</span>
                    <span className={styles.krokText}>{k[lang]}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <Link href="/#kontakt" className={styles.cta} data-cursor="cta" data-fx>
          {OBSAH.cta[lang]}
        </Link>
      </div>
    </section>
  );
}
