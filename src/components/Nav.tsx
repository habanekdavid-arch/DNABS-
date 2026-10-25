"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { VSTUPNE_STRANKY } from "@/data/vstupneStranky";
import PrepinacJazyka from "./PrepinacJazyka";
import styles from "./Nav.module.css";
import logo from "../assets/dnabs-logo-long.svg";

export default function Nav({ vlastnyKontakt = false }: { vlastnyKontakt?: boolean }) {
  const { t } = useLanguage();

  /* Na vstupných stránkach pre reklamu musí „Kontakt" aj tlačidlo viesť na
     formulár tej istej stránky. S absolútnym /#kontakt by sme zaplateného
     návštevníka poslali na domovskú stránku, kde by začínal odznova. */
  const kontakt = vlastnyKontakt ? "#kontakt" : "/#kontakt";
  const { lang } = useLanguage();

  /* Rozbaľovacie menu služieb. Vstupné stránky vznikli pre reklamu, ale
     musia sa dať nájsť aj z webu — inak existujú len pre toho, kto klikol
     na inzerát. */
  const [otvorene, setOtvorene] = useState(false);
  const obal = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!otvorene) return;
    const zavri = (e: MouseEvent) => {
      if (!obal.current?.contains(e.target as Node)) setOtvorene(false);
    };
    const klaves = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOtvorene(false);
    };
    document.addEventListener("mousedown", zavri);
    document.addEventListener("keydown", klaves);
    return () => {
      document.removeEventListener("mousedown", zavri);
      document.removeEventListener("keydown", klaves);
    };
  }, [otvorene]);

  /* V češtine vedieme na /cs/… adresy, inde na slovenské. Pre ostatné
     jazyky zatiaľ vlastné adresy nemáme, tak dostanú slovenské. */
  const adresa = (s: (typeof VSTUPNE_STRANKY)[number]) =>
    lang === "cs" ? `/cs/${s.slugCs}` : `/${s.slug}`;

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.brand} aria-label={t("nav_home")}>
        <Image src={logo} alt="DNABS" className={styles.logoImg} priority />
      </Link>
      <div className={styles.right}>
        <div className={styles.menuObal} ref={obal}>
          <button
            type="button"
            className={styles.link}
            aria-expanded={otvorene}
            aria-haspopup="true"
            onClick={() => setOtvorene((o) => !o)}
          >
            {t("nav_services")}
            <span className={`${styles.sipka} ${otvorene ? styles.sipkaOtvorena : ""}`} aria-hidden>
              ▾
            </span>
          </button>
          <div className={`${styles.menu} ${otvorene ? styles.menuOtvorene : ""}`}>
            {VSTUPNE_STRANKY.map((s) => (
              <Link
                key={s.slug}
                href={adresa(s)}
                className={styles.menuPolozka}
                onClick={() => setOtvorene(false)}
              >
                {s.sluzbaNazov[lang]}
              </Link>
            ))}
            <Link href="/#sluzby" className={styles.menuPolozkaVsetky} onClick={() => setOtvorene(false)}>
              {t("nav_services_all")}
            </Link>
          </div>
        </div>
        <Link href="/o-nas" className={styles.link}>{t("nav_blog")}</Link>
        <Link href="/o-nas" className={styles.link}>{t("nav_about")}</Link>
        <Link href={kontakt} className={styles.link}>{t("nav_contact")}</Link>
        <PrepinacJazyka />
        <Link href={kontakt} className={styles.cta} data-cursor="cta" data-fx>
          <span className={styles.ctaFull}>{t("nav_cta")}</span>
          <span className={styles.ctaShort}>{t("nav_cta_short")}</span>
        </Link>
      </div>
    </nav>
  );
}
