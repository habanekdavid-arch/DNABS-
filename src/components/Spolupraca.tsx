"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import styles from "./Spolupraca.module.css";

/* Počet párov v závitnici a uhol, o ktorý sa každý ďalší pootočí. */
const PAROV = 26;
const UHOL_NA_PAR = 26;

/** Body, v ktorých sedí informácia. Index = ktorý pár závitnice. */
const UZLY: {
  par: number;
  farba: string;
  titul: { sk: string; en: string };
  text: { sk: string; en: string };
}[] = [
  {
    par: 2,
    farba: "#00E9FF",
    titul: { sk: "Dizajn na mieru", en: "Custom design" },
    text: {
      sk: "Žiadna šablóna. Návrh staviame na tom, čo predávate a komu.",
      en: "No template. We build the design around what you sell and to whom.",
    },
  },
  {
    par: 7,
    farba: "#6637ED",
    titul: { sk: "Rýchlosť", en: "Speed" },
    text: {
      sk: "Web vyladený na výkon, nie na efekty. Načítanie meriame, nie hádame.",
      en: "Tuned for performance, not for effects. We measure load time, not guess it.",
    },
  },
  {
    par: 12,
    farba: "#FF5A1F",
    titul: { sk: "Web aj reklama", en: "Site and ads" },
    text: {
      sk: "Jedni ľudia na web aj kampane. Nikto si neprehadzuje zodpovednosť.",
      en: "The same people for the site and the campaigns. Nobody passes the buck.",
    },
  },
  {
    par: 17,
    farba: "#54FA80",
    titul: { sk: "Merateľné dopyty", en: "Measurable leads" },
    text: {
      sk: "Každý dopyt viete dohľadať až ku kampani, z ktorej prišiel.",
      en: "Every lead can be traced back to the campaign it came from.",
    },
  },
  {
    par: 22,
    farba: "#FF3D8B",
    titul: { sk: "Ladenie podľa čísel", en: "Tuning by numbers" },
    text: {
      sk: "Web spustíme a potom ho upravujeme podľa toho, čo dáta ukážu.",
      en: "We launch, then keep adjusting based on what the data shows.",
    },
  },
];

const OBSAH = {
  label: { sk: "[ FIG.05 — SPOLUPRÁCA ]", en: "[ FIG.05 — PARTNERSHIP ]" },
  titul: { sk: "Digitálna DNA\nvašej značky", en: "The digital DNA\nof your brand" },
  sub: {
    sk: "Päť vecí, ktoré dostanete v každom projekte. Prejdite po bodoch závitnice.",
    en: "Five things you get in every project. Run over the nodes of the helix.",
  },
  cta: { sk: "Poďme do toho →", en: "Let's do it →" },
};

export default function Spolupraca() {
  const { lang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  const [aktivny, setAktivny] = useState<number | null>(null);

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

  const uzolPreZaklad = new Map(UZLY.map((u) => [u.par, u]));
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
          <p className={styles.sub}>{OBSAH.sub[lang]}</p>
        </div>

        <div
          ref={ref}
          className={`${styles.scena} ${on ? styles.on : ""} ${aktivny !== null ? styles.drzi : ""}`}
        >
          <div className={styles.helix}>
            {Array.from({ length: PAROV }, (_, i) => {
              const uzol = uzolPreZaklad.get(i);
              const uhol = i * UHOL_NA_PAR;
              return (
                <div
                  key={i}
                  className={styles.par}
                  style={
                    {
                      "--uhol": `${uhol}deg`,
                      "--y": `${(i - (PAROV - 1) / 2) * 26}px`,
                      "--c": uzol?.farba ?? "rgba(255,255,255,.5)",
                    } as React.CSSProperties
                  }
                >
                  <span className={styles.priecka} aria-hidden />
                  <span className={`${styles.gula} ${styles.gulaA}`} aria-hidden />
                  <span className={`${styles.gula} ${styles.gulaB}`} aria-hidden />

                  {uzol && (
                    <button
                      type="button"
                      className={`${styles.uzol} ${aktivny === i ? styles.uzolAktivny : ""}`}
                      onMouseEnter={() => setAktivny(i)}
                      onMouseLeave={() => setAktivny(null)}
                      onFocus={() => setAktivny(i)}
                      onBlur={() => setAktivny(null)}
                      aria-label={uzol.titul[lang]}
                    >
                      <span className={styles.uzolJadro} aria-hidden />
                      <span className={styles.uzolKruh} aria-hidden />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Karty sedia mimo točiacej sa scény, takže ostávajú čitateľné. */}
          <div className={styles.karty}>
            {UZLY.map((u, i) => (
              <div
                key={u.par}
                className={`${styles.karta} ${aktivny === u.par ? styles.kartaAktivna : ""}`}
                style={{ "--c": u.farba, "--i": i } as React.CSSProperties}
                onMouseEnter={() => setAktivny(u.par)}
                onMouseLeave={() => setAktivny(null)}
              >
                <span className={styles.kartaDioda} aria-hidden />
                <div>
                  <div className={styles.kartaTitul}>{u.titul[lang]}</div>
                  <p className={styles.kartaText}>{u.text[lang]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Link href="/#kontakt" className={styles.cta} data-cursor="cta" data-fx>
          {OBSAH.cta[lang]}
        </Link>
      </div>
    </section>
  );
}
