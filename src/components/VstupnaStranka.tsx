"use client";

import { useLanguage } from "@/lib/i18n";
import Nav from "./Nav";
import Reveal from "./Reveal";
import Contact from "./Contact";
import Footer from "./Footer";
import Accordion from "./Accordion";
import AmbientBlobs from "./AmbientBlobs";
import type { VstupnaStranka as Data } from "@/data/vstupneStranky";
import styles from "./VstupnaStranka.module.css";

/**
 * Vstupná stránka pre jednu skupinu reklám.
 *
 * Poradie sekcií nie je náhodné. Človek z reklamy prichádza s jednou
 * otázkou — „riešia toto, čo potrebujem?“ — a odpoveď musí dostať skôr,
 * než začne rolovať. Preto hneď pod nadpisom je tlačidlo na formulár:
 * na mobile je nad zlomom tlačidlo, nie celý formulár, lebo formulár by
 * nadpis odsunul mimo obrazovku a stránka by pôsobila ako dotazník.
 */
export default function VstupnaStranka({ data }: { data: Data }) {
  const { t, lang } = useLanguage();

  const maUkazky = data.ukazky.some((u) => u.veta);

  /* Štítky sekcií sú číslované. Keď sekcia realizácií odpadne, číslovanie
     musí ostať súvislé — „01, 03, 04" vyzerá ako chyba, nie ako zámer. */
  let poradie = 0;
  const cislo = () => String(++poradie).padStart(2, "0");
  const stitok = (kluc: "prinosy" | "ukazky" | "kroky" | "faq") =>
    `[ ${cislo()} — ${t(`vs_stitok_${kluc}` as never)} ]`;

  return (
    <>
      <main id="top">
        <section className={styles.hero}>
          <div className={styles.mriezka} aria-hidden />
          <Nav vlastnyKontakt />
          <Reveal className={styles.heroVnutro}>
            <div className={styles.kicker}>{data.sluzbaNazov[lang]}</div>
            <h1 className={styles.h1}>{data.h1[lang]}</h1>
            <p className={styles.podnadpis}>{data.podnadpis[lang]}</p>
            <a href="#kontakt" className={styles.cta} data-cursor="cta">
              {t("contact_submit")}
              <span aria-hidden className={styles.ctaSipka}>›</span>
            </a>
            <p className={styles.heroMicro}>{t("contact_perk1")}</p>
          </Reveal>
        </section>

        <section className={styles.sekcia}>
          <AmbientBlobs soft />
          <Reveal className={styles.vnutro}>
            <div className={styles.stitok}>{stitok("prinosy")}</div>
            <h2 className={styles.h2}>{t("vs_prinosy")}</h2>
            <div className={styles.karty}>
              {data.prinosy.map((prinos) => (
                <article key={prinos.nadpis[lang]} className={styles.karta}>
                  <h3 className={styles.kartaNadpis}>{prinos.nadpis[lang]}</h3>
                  <p className={styles.kartaText}>{prinos.text[lang]}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </section>

        {/* Sekcia „Na čom to vieme“ sa vykreslí, až keď má overené vety.
            Prázdne miesto je lepšie než vymyslený príbeh o cudzom
            projekte — ten si návštevník overí jedným klikom. */}
        {maUkazky && (
          <section className={styles.sekcia}>
            <Reveal className={styles.vnutro}>
              <div className={styles.stitok}>{stitok("ukazky")}</div>
              <h2 className={styles.h2}>{t("vs_ukazky")}</h2>
              <ul className={styles.ukazky}>
                {data.ukazky
                  .filter((u) => u.veta)
                  .map((u) => (
                    <li key={u.nazov} className={styles.ukazka}>
                      <span className={styles.ukazkaNazov}>
                        {u.href ? (
                          <a href={u.href} target="_blank" rel="noopener noreferrer">
                            {u.nazov} ↗
                          </a>
                        ) : (
                          u.nazov
                        )}
                      </span>
                      <span className={styles.ukazkaVeta}>{u.veta![lang]}</span>
                    </li>
                  ))}
              </ul>
            </Reveal>
          </section>
        )}

        <section className={styles.sekciaTmava}>
          <Reveal className={styles.vnutro}>
            <div className={styles.stitokSvetly}>{stitok("kroky")}</div>
            <h2 className={styles.h2Svetly}>{t("vs_kroky")}</h2>
            <ol className={styles.kroky}>
              {data.kroky.map((krok, i) => (
                <li key={krok.nadpis[lang]} className={styles.krok}>
                  <span className={styles.krokCislo}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.krokNadpis}>{krok.nadpis[lang]}</span>
                  <span className={styles.krokText}>{krok.text[lang]}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </section>

        <section className={styles.sekcia}>
          <Reveal className={styles.vnutro}>
            <div className={styles.stitok}>{stitok("faq")}</div>
            <h2 className={styles.h2}>{t("vs_faq")}</h2>
            <Accordion
              items={data.faq.map((o) => ({ q: o.q[lang], a: o.a[lang] }))}
            />
          </Reveal>
        </section>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
