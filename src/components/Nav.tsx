"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import PrepinacJazyka from "./PrepinacJazyka";
import styles from "./Nav.module.css";
import logo from "../assets/dnabs-logo-long.svg";

export default function Nav({ vlastnyKontakt = false }: { vlastnyKontakt?: boolean }) {
  const { t } = useLanguage();

  /* Na vstupných stránkach pre reklamu musí „Kontakt" aj tlačidlo viesť na
     formulár tej istej stránky. S absolútnym /#kontakt by sme zaplateného
     návštevníka poslali na domovskú stránku, kde by začínal odznova. */
  const kontakt = vlastnyKontakt ? "#kontakt" : "/#kontakt";

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.brand} aria-label={t("nav_home")}>
        <Image src={logo} alt="DNABS" className={styles.logoImg} priority />
      </Link>
      <div className={styles.right}>
        <Link href="/#sluzby" className={styles.link}>{t("nav_services")}</Link>
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
