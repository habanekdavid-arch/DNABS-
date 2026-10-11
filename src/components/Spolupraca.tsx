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

/** Kartičky vedľa závitnice: čo konkrétna služba prinesie. Každá si
    nesie svoj účinok na DNA — index tvaru a farbu, do ktorej sa naladí. */
const POLICKA = [
  {
    tvar: 0,
    farba: "#6637ED",
    label: { sk: "[ WEBY ]", en: "[ WEBSITES ]", cs: "[ WEBY ]", hu: "[ WEBOLDALAK ]", de: "[ WEBSITES ]" },
    titul: { sk: "Rýchlosť, ktorá udrží návštevníka", en: "Speed that keeps visitors", cs: "Rychlost, která udrží návštěvníka", hu: "Sebesség, amely megtartja a látogatót", de: "Tempo, das Besucher hält" },
    text: {
      sk: "Web ladíme na hranice, pod ktorými Google hodnotí načítanie ako dobré. Overíte si to kedykoľvek v PageSpeed Insights.",
      en: "We tune the site to the thresholds Google rates as good. You can verify it any time in PageSpeed Insights.",
      cs: "Web ladíme na hranice, pod kterými Google hodnotí načítání jako dobré. Ověříte si to kdykoli v PageSpeed Insights.",
      hu: "A weboldalt azokra a határértékekre hangoljuk, amelyek alatt a Google jónak értékeli a betöltést. Bármikor ellenőrizheti a PageSpeed Insightsban.",
      de: "Wir optimieren die Website auf die Grenzwerte, die Google als gut bewertet. Prüfen können Sie das jederzeit in PageSpeed Insights.",
    },
    metriky: [
      { kod: "LCP", hodnota: "≤ 2,5 s", podiel: 100 },
      { kod: "INP", hodnota: "≤ 200 ms", podiel: 76 },
      { kod: "CLS", hodnota: "≤ 0,1", podiel: 54 },
    ],
  },
  {
    tvar: 1,
    farba: "#00C6DE",
    label: { sk: "[ APLIKÁCIE ]", en: "[ APPS ]", cs: "[ APLIKACE ]", hu: "[ ALKALMAZÁSOK ]", de: "[ APPS ]" },
    titul: { sk: "Rutinu prevezme aplikácia", en: "The app takes over the routine", cs: "Rutinu převezme aplikace", hu: "A rutint átveszi az alkalmazás", de: "Die Routine übernimmt die App" },
    text: {
      sk: "Objednávky, rezervácie aj prepisovanie údajov do tabuliek zvládne systém sám. Váš čas tak ostane na zákazníkov.",
      en: "Orders, bookings and copying data into spreadsheets are handled by the system itself, so your time stays with customers.",
      cs: "Objednávky, rezervace i přepisování údajů do tabulek zvládne systém sám. Váš čas tak zůstane zákazníkům.",
      hu: "A megrendeléseket, a foglalásokat és az adatok táblázatokba másolását a rendszer maga intézi. Így az ideje az ügyfeleké marad.",
      de: "Bestellungen, Reservierungen und das Übertragen von Daten in Tabellen erledigt das System selbst. So bleibt Ihre Zeit für die Kunden.",
    },
    zoznam: {
      sk: ["Objednávky a rezervácie", "Napojenie na vaše nástroje", "Interné postupy na jedno miesto"],
      en: ["Orders and bookings", "Hooked into your tools", "Internal steps in one place"],
      cs: ["Objednávky a rezervace", "Napojení na vaše nástroje", "Interní postupy na jednom místě"],
      hu: ["Megrendelések és foglalások", "Összekapcsolás az eszközeivel", "Belső folyamatok egy helyen"],
      de: ["Bestellungen und Reservierungen", "Anbindung an Ihre Tools", "Interne Abläufe an einem Ort"],
    },
  },
  {
    tvar: 2,
    farba: "#FF5A1F",
    label: { sk: "[ MARKETING ]", en: "[ MARKETING ]", cs: "[ MARKETING ]", hu: "[ MARKETING ]", de: "[ MARKETING ]" },
    titul: { sk: "Viete, za čo platíte", en: "You know what you pay for", cs: "Víte, za co platíte", hu: "Tudja, miért fizet", de: "Sie wissen, wofür Sie zahlen" },
    text: {
      sk: "Každý dopyt viete dohľadať až ku kampani, z ktorej prišiel. Prestanete platiť za to, čo nefunguje.",
      en: "Every enquiry can be traced back to the campaign it came from. You stop paying for what does not work.",
      cs: "Každou poptávku dohledáte až ke kampani, ze které přišla. Přestanete platit za to, co nefunguje.",
      hu: "Minden ajánlatkérést visszakövethet egészen ahhoz a kampányhoz, amelyből érkezett. Nem fizet többé azért, ami nem működik.",
      de: "Jede Anfrage lässt sich bis zur Kampagne zurückverfolgen, aus der sie kam. Sie zahlen nicht mehr für das, was nicht funktioniert.",
    },
    zoznam: {
      sk: ["Dopyt z formulára", "Zdroj kampane pri dopyte", "Klik na telefón a e-mail"],
      en: ["Form enquiry", "Campaign source of the enquiry", "Phone and e-mail taps"],
      cs: ["Poptávka z formuláře", "Zdroj kampaně u poptávky", "Kliknutí na telefon a e-mail"],
      hu: ["Ajánlatkérés űrlapról", "A kampány forrása az ajánlatkérésnél", "Kattintás a telefonra és az e-mailre"],
      de: ["Anfrage über das Formular", "Kampagnenquelle der Anfrage", "Klicks auf Telefon und E-Mail"],
    },
  },
  {
    tvar: 3,
    farba: "#FF3D8B",
    label: { sk: "[ SPOLUPRÁCA ]", en: "[ PARTNERSHIP ]", cs: "[ SPOLUPRÁCE ]", hu: "[ EGYÜTTMŰKÖDÉS ]", de: "[ ZUSAMMENARBEIT ]" },
    titul: { sk: "Jedni ľudia na web aj kampane", en: "One team for site and ads", cs: "Jedni lidé na web i kampaně", hu: "Egy csapat a weboldalra és a kampányokra", de: "Ein Team für Website und Kampagnen" },
    text: {
      sk: "Nikto si neprehadzuje zodpovednosť medzi agentúrou a programátorom. Web spustíme a ďalej ho ladíme podľa čísel.",
      en: "Nobody passes the buck between the agency and the developer. We launch, then keep tuning by the numbers.",
      cs: "Nikdo si nepřehazuje odpovědnost mezi agenturou a programátorem. Web spustíme a dál ho ladíme podle čísel.",
      hu: "Senki sem tolja át a felelősséget az ügynökség és a programozó között. Elindítjuk a weboldalt, és a számok alapján tovább finomítjuk.",
      de: "Niemand schiebt die Verantwortung zwischen Agentur und Programmierer hin und her. Wir bringen die Website live und optimieren sie danach weiter nach Zahlen.",
    },
    kroky: {
      sk: ["Konzultácia", "Návrh", "Spustenie", "Ladenie podľa čísel"],
      en: ["Consultation", "Design", "Launch", "Tuning by numbers"],
      cs: ["Konzultace", "Návrh", "Spuštění", "Ladění podle čísel"],
      hu: ["Konzultáció", "Terv", "Indulás", "Finomítás a számok alapján"],
      de: ["Beratung", "Entwurf", "Livegang", "Optimierung nach Zahlen"],
    },
  },
] as const;

const OBSAH = {
  label: { sk: "[ FIG.05 — SPOLUPRÁCA ]", en: "[ FIG.05 — PARTNERSHIP ]", cs: "[ FIG.05 — SPOLUPRÁCE ]", hu: "[ FIG.05 — EGYÜTTMŰKÖDÉS ]", de: "[ FIG.05 — ZUSAMMENARBEIT ]" },
  titul: { sk: "Digitálna DNA\nvašej značky", en: "The digital DNA\nof your brand", cs: "Digitální DNA\nvaší značky", hu: "Márkája\ndigitális DNS-e", de: "Die digitale DNA\nIhrer Marke" },
  sub: {
    sk: "Čo zo spolupráce vzíde — a podľa čoho to poznáte.",
    en: "What comes out of working together — and how you'll know.",
    cs: "Co ze spolupráce vzejde — a podle čeho to poznáte.",
    hu: "Mi születik az együttműködésből — és miből ismeri fel.",
    de: "Was aus der Zusammenarbeit entsteht — und woran Sie es erkennen.",
  },
  /* Nápoveda len tam, kde je kurzor — na dotyku by mýlila. */
  napoveda: {
    sk: "Prejdite po kartičkách, závitnica zareaguje.",
    en: "Run over the cards, the helix will react.",
    cs: "Přejeďte po kartičkách, šroubovice zareaguje.",
    hu: "Húzza végig az egeret a kártyákon, a spirál reagál.",
    de: "Fahren Sie über die Karten, die Helix reagiert.",
  },
  cta: { sk: "Poďme do toho →", en: "Let's do it →", cs: "Pojďme do toho →", hu: "Vágjunk bele →", de: "Legen wir los →" },
};

export default function Spolupraca() {
  const { lang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  /* Ktorá kartička je práve pod kurzorom. Podľa nej sa naladí závitnica. */
  const [aktivna, setAktivna] = useState<number | null>(null);

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
  const p = aktivna === null ? null : POLICKA[aktivna];

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
          <DnaPlatno ucinok={p ? { tvar: p.tvar, farba: p.farba } : null} />

          <div className={styles.grafy}>
            {POLICKA.map((k, i) => (
              <div
                key={k.titul.sk}
                className={`${styles.karta} ${aktivna === i ? styles.kartaAktivna : ""}`}
                style={{ "--c": k.farba, "--i": i } as React.CSSProperties}
                onMouseEnter={() => setAktivna(i)}
                onMouseLeave={() => setAktivna((b) => (b === i ? null : b))}
              >
                <div className={styles.kartaHlava}>
                  <span className={styles.kartaLabel}>{k.label[lang]}</span>
                  <span className={styles.dioda} aria-hidden />
                </div>
                <div className={styles.kartaTitul}>{k.titul[lang]}</div>
                <p className={styles.kartaText}>{k.text[lang]}</p>

                {"metriky" in k && (
                  <div className={styles.metriky}>
                    {k.metriky.map((m, j) => (
                      <div key={m.kod} className={styles.riadok}>
                        <div className={styles.riadokHlava}>
                          <span className={styles.kod}>{m.kod}</span>
                          <span className={styles.hodnota}>{m.hodnota}</span>
                        </div>
                        <div className={styles.drazka}>
                          <span
                            className={styles.vypln}
                            style={
                              {
                                "--p": `${m.podiel}%`,
                                "--d": `${200 + j * 120}ms`,
                              } as React.CSSProperties
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {"zoznam" in k && (
                  <ul className={styles.zoznam}>
                    {k.zoznam[lang].map((z) => (
                      <li key={z} className={styles.polozka}>
                        <span className={styles.fajka} aria-hidden>
                          ✓
                        </span>
                        {z}
                      </li>
                    ))}
                  </ul>
                )}

                {"kroky" in k && (
                  <ol className={styles.kroky}>
                    {k.kroky[lang].map((z, j) => (
                      <li key={z} className={styles.krok}>
                        <span className={styles.krokBod} aria-hidden />
                        <span className={styles.krokCislo}>0{j + 1}</span>
                        <span className={styles.krokText}>{z}</span>
                      </li>
                    ))}
                  </ol>
                )}
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
