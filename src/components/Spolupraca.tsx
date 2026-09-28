"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import styles from "./Spolupraca.module.css";

/* Geometria závitnice. Rozostup je zámerne menší než priemer guľôčky —
   páry tak na seba nadväzujú a kostra vyzerá ako súvislá stuha, nie ako
   rad odstávajúcich bodiek. Uhol 34,3° dáva ~10,5 páru na otáčku, čo je
   pomer skutočnej B-DNA, vďaka čomu vzniknú aj žliabky medzi závitmi. */
const PAROV = 44;
const UHOL_NA_PAR = 34.3;

/* Štyri bázy ako v skutočnej molekule — A sa páruje s T, G s C. Strieda
   ich pevný vzorec, aby priečky neboli jednofarebné, ale ani náhodné pri
   každom vykreslení (to by sa po hydratácii rozišlo so serverom). */
const PARY_BAZ: [string, string][] = [
  ["#3FA46A", "#D9534F"], // A–T
  ["#3C6FB0", "#E0A33A"], // G–C
  ["#D9534F", "#3FA46A"], // T–A
  ["#E0A33A", "#3C6FB0"], // C–G
];
const VZOREC = [0, 1, 3, 2, 1, 0, 2, 3, 1, 2, 0, 3, 2, 1, 3, 0];

/** Body, v ktorých sedí informácia. Index = ktorý pár závitnice. */
const UZLY: {
  par: number;
  farba: string;
  titul: { sk: string; en: string };
  text: { sk: string; en: string };
}[] = [
  {
    par: 5,
    farba: "#00E9FF",
    titul: { sk: "Dizajn na mieru", en: "Custom design" },
    text: {
      sk: "Žiadna šablóna. Návrh staviame na tom, čo predávate a komu.",
      en: "No template. We build the design around what you sell and to whom.",
    },
  },
  {
    par: 13,
    farba: "#6637ED",
    titul: { sk: "Rýchlosť", en: "Speed" },
    text: {
      sk: "Web vyladený na výkon, nie na efekty. Načítanie meriame, nie hádame.",
      en: "Tuned for performance, not for effects. We measure load time, not guess it.",
    },
  },
  {
    par: 21,
    farba: "#FF5A1F",
    titul: { sk: "Web aj reklama", en: "Site and ads" },
    text: {
      sk: "Jedni ľudia na web aj kampane. Nikto si neprehadzuje zodpovednosť.",
      en: "The same people for the site and the campaigns. Nobody passes the buck.",
    },
  },
  {
    par: 29,
    farba: "#12A03F",
    titul: { sk: "Merateľné dopyty", en: "Measurable leads" },
    text: {
      sk: "Každý dopyt viete dohľadať až ku kampani, z ktorej prišiel.",
      en: "Every lead can be traced back to the campaign it came from.",
    },
  },
  {
    par: 37,
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

type Bublina = { par: number; x: number; y: number; vlavo: boolean };

export default function Spolupraca() {
  const { lang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const scena = useRef<HTMLDivElement>(null);
  const uzlyRef = useRef(new Map<number, HTMLButtonElement>());
  const [on, setOn] = useState(false);
  const [aktivny, setAktivny] = useState<number | null>(null);
  const [bublina, setBublina] = useState<Bublina | null>(null);

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

  /* Bublinu kreslíme mimo 3D scény a polohu jej dopočítame z toho, kde
     bod práve na obrazovke je. V scéne by sa totiž točila spolu s ňou a
     väčšinu času by stála bokom — čitateľná by bola len náhodou. */
  const zapni = useCallback((par: number) => {
    setAktivny(par);
    const uzol = uzlyRef.current.get(par);
    const box = scena.current;
    if (!uzol || !box) {
      setBublina(null);
      return;
    }
    const u = uzol.getBoundingClientRect();
    const b = box.getBoundingClientRect();
    const x = u.left + u.width / 2 - b.left;
    const y = u.top + u.height / 2 - b.top;
    setBublina({ par, x, y, vlavo: x > b.width * 0.55 });
  }, []);

  const vypni = useCallback(() => {
    setAktivny(null);
    setBublina(null);
  }, []);

  const uzolPreZaklad = new Map(UZLY.map((u) => [u.par, u]));
  const [r1, r2] = OBSAH.titul[lang].split("\n");
  const bublinaUzol = bublina ? uzolPreZaklad.get(bublina.par) : null;

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
          ref={(el) => {
            ref.current = el;
            scena.current = el;
          }}
          className={`${styles.scena} ${on ? styles.on : ""} ${aktivny !== null ? styles.drzi : ""}`}
        >
          {/* Obal drží zmenšenie na úzkych obrazovkách, prostredný prvok
              naklonenie a levitáciu, vnútorný točenie — na jednom prvku
              by si animácie prepisovali tú istú vlastnosť. */}
          <div className={styles.helixObal}>
            <div className={styles.helix}>
              <div className={styles.otacanie}>
                {Array.from({ length: PAROV }, (_, i) => {
                  const uzol = uzolPreZaklad.get(i);
                  const [bA, bB] = PARY_BAZ[VZOREC[i % VZOREC.length]];
                  /* Zadná strana je ďalej od oka — stmavíme ju a zmenšíme,
                     inak by závitnica vyzerala plocho. */
                  return (
                    <div
                      key={i}
                      className={styles.par}
                      style={
                        {
                          "--uhol": `${i * UHOL_NA_PAR}deg`,
                          "--y": `${(i - (PAROV - 1) / 2) * 15}px`,
                          "--bA": bA,
                          "--bB": bB,
                          "--c": uzol?.farba ?? "transparent",
                        } as React.CSSProperties
                      }
                    >
                      <span className={styles.priecka} aria-hidden />
                      <span className={`${styles.gula} ${styles.gulaA}`} aria-hidden />
                      <span className={`${styles.gula} ${styles.gulaB}`} aria-hidden />
                      {/* Spojnica k nasledujúcemu páru. Posun medzi dvoma
                          susednými pármi je stále rovnaký, tak stačí jeden
                          pevný uhol pre všetky — z guľôčok sa tým stane
                          súvislá kostra. Posledný pár už nemá kam viesť. */}
                      {i < PAROV - 1 && (
                        <>
                          <span className={`${styles.kostra} ${styles.kostraA}`} aria-hidden />
                          <span className={`${styles.kostra} ${styles.kostraB}`} aria-hidden />
                        </>
                      )}

                      {uzol && (
                        <button
                          type="button"
                          ref={(el) => {
                            if (el) uzlyRef.current.set(i, el);
                            else uzlyRef.current.delete(i);
                          }}
                          className={`${styles.uzol} ${aktivny === i ? styles.uzolAktivny : ""}`}
                          onMouseEnter={() => zapni(i)}
                          onMouseLeave={vypni}
                          onFocus={() => zapni(i)}
                          onBlur={vypni}
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
            </div>
          </div>

          {/* Bublina pri bode — obyčajná 2D vrstva nad scénou, takže je
              vždy čelom k čitateľovi. */}
          {bublina && bublinaUzol && (
            <div
              className={`${styles.bublina} ${bublina.vlavo ? styles.bublinaVlavo : ""}`}
              style={
                {
                  "--x": `${bublina.x}px`,
                  "--y": `${bublina.y}px`,
                  "--c": bublinaUzol.farba,
                } as React.CSSProperties
              }
              aria-hidden
            >
              <span className={styles.bublinaTitul}>{bublinaUzol.titul[lang]}</span>
              <span className={styles.bublinaText}>{bublinaUzol.text[lang]}</span>
            </div>
          )}

          {/* Karty sedia mimo točiacej sa scény, takže ostávajú čitateľné. */}
          <div className={styles.karty}>
            {UZLY.map((u, i) => (
              <div
                key={u.par}
                className={`${styles.karta} ${aktivny === u.par ? styles.kartaAktivna : ""}`}
                style={{ "--c": u.farba, "--i": i } as React.CSSProperties}
                onMouseEnter={() => zapni(u.par)}
                onMouseLeave={vypni}
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
