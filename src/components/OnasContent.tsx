"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n";
import Nav from "./Nav";
import Reveal from "./Reveal";
import ScrollText from "./ScrollText";
import { onasChapters } from "@/data/onas";
import styles from "@/app/o-nas/page.module.css";

export default function OnasContent() {
  const { t, lang } = useLanguage();

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.grid} />
        <Nav />
        <Reveal className={styles.heroInner}>
          <div className={styles.kicker}>{t("onas_kicker")}</div>
          <h1 className={styles.h1}>{t("onas_h1")}</h1>
          <p className={styles.intro}>{t("onas_intro")}</p>
        </Reveal>
      </section>

      {onasChapters.map((chapter) => (
        <section key={chapter.num} className={styles.chapter}>
          <div className={styles.chapterInner}>
            <Reveal className={styles.imgWrap}>
              <Image
                src={chapter.image}
                alt={chapter.imageAlt[lang]}
                fill
                sizes="(max-width: 860px) 100vw, 50vw"
                className={styles.img}
              />
            </Reveal>
            <div>
              <div className={styles.kickerSmall}>{chapter.kicker[lang]}</div>
              <Reveal as="h2" className={styles.headline}>
                {chapter.headline[lang]}
              </Reveal>
              {chapter.paragraphs.map((p, i) => (
                <ScrollText key={i} text={p[lang]} className={styles.body} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>{t("onas_cta_title")}</h2>
        <a href="/#kontakt" className={styles.ctaBtn}>
          {t("hero_cta1")}
        </a>
      </section>
    </>
  );
}
