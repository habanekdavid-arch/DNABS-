"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n";
import type { Lang } from "@/lib/jazyky";
import Nav from "./Nav";
import Reveal from "./Reveal";
import Contact from "./Contact";
import Footer from "./Footer";
import Accordion from "./Accordion";
import AmbientBlobs from "./AmbientBlobs";
import { PROJEKTY } from "@/data/hlavicka";
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
export default function VstupnaStranka({
  data,
  jazykZAdresy,
}: {
  data: Data;
  /** Jazyk, ktorý určuje adresa (/cs/…). Prebije uloženú voľbu, ale
   *  sám sa neuloží — návštevník si ho nevybral. */
  jazykZAdresy?: Lang;
}) {
  const { t, lang, setLangZAdresy } = useLanguage();

  useEffect(() => {
    if (jazykZAdresy) setLangZAdresy(jazykZAdresy);
  }, [jazykZAdresy, setLangZAdresy]);

  /* Ukážky si doťahujú obsah zo skutočných realizácií — názov, vetu aj
     screenshot živého webu. Projekt bez screenshotu preskakujeme, prázdny
     rám vyzerá ako chyba. */
  const ukazky = data.ukazky
    .map((u) => PROJEKTY.find((p) => p.slug === u.projekt))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .map((p) => ({
      slug: p.slug,
      nazov: p.nazov,
      popis: p.popis,
      tagline: p.tagline,
      href: p.href,
      snimka: p.karty.find((k) => k.typ === "notebook")?.screenshot,
    }))
    .filter((p) => p.snimka && p.tagline);

  const maUkazky = ukazky.length > 0;

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
            {data.uvod?.map((o) => (
              <p key={o[lang]} className={styles.uvod}>{o[lang]}</p>
            ))}
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
        {data.pasaze && data.pasaze.length > 0 && (
          <section className={styles.sekciaClanok}>
            <Reveal className={styles.clanok}>
              {data.pasaze.map((pasaz) => (
                <article key={pasaz.nadpis[lang]} className={styles.pasaz}>
                  <h2 className={styles.pasazNadpis}>{pasaz.nadpis[lang]}</h2>
                  {pasaz.odstavce.map((o) => (
                    <p key={o[lang]} className={styles.pasazText}>{o[lang]}</p>
                  ))}
                </article>
              ))}
            </Reveal>
          </section>
        )}

        {maUkazky && (
          <section className={styles.sekcia}>
            <Reveal className={styles.vnutro}>
              <div className={styles.stitok}>{stitok("ukazky")}</div>
              <h2 className={styles.h2}>{t("vs_ukazky")}</h2>
              <div className={styles.ukazky}>
                {ukazky.map((u) => (
                  <a
                    key={u.slug}
                    href={`/realizacie/${u.slug}`}
                    className={styles.ukazka}
                  >
                    <span className={styles.ukazkaRam}>
                      {/* Pomer 16:10 drží výšku ešte pred načítaním obrázka,
                          takže sa pri ňom obsah pod ním neposunie. */}
                      <Image
                        src={u.snimka!}
                        alt={`${u.nazov} — web, ktorý sme postavili`}
                        width={1600}
                        height={1000}
                        sizes="(max-width:620px) 100vw, (max-width:980px) 50vw, 33vw"
                        className={styles.ukazkaObrazok}
                      />
                    </span>
                    <span className={styles.ukazkaHlavicka}>
                      <span className={styles.ukazkaNazov}>{u.nazov}</span>
                      <span className={styles.ukazkaPopis}>{u.popis}</span>
                    </span>
                    <span className={styles.ukazkaVeta}>{u.tagline}</span>
                    <span className={styles.ukazkaOdkaz}>{t("vs_ukazka_detail")}</span>
                  </a>
                ))}
              </div>
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
