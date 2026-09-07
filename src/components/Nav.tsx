"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import styles from "./Nav.module.css";
import logo from "../assets/dnabs-logo-long.svg";

export default function Nav() {
  const { lang, setLang, t } = useLanguage();

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <Link href="/#sluzby" className={styles.link}>{t("nav_services")}</Link>
        <Link href="/o-nas" className={styles.link}>{t("nav_blog")}</Link>
        <Link href="/#o-nas" className={styles.link}>{t("nav_about")}</Link>
        <Link href="/#kontakt" className={styles.link}>{t("nav_contact")}</Link>
        <div className={styles.langSwitch}>
          <button
            type="button"
            className={`${styles.langBtn} ${lang === "sk" ? styles.active : ""}`}
            onClick={() => setLang("sk")}
          >
            SK
          </button>
          <button
            type="button"
            className={`${styles.langBtn} ${lang === "en" ? styles.active : ""}`}
            onClick={() => setLang("en")}
          >
            EN
          </button>
        </div>
        <Link href="/#kontakt" className={styles.cta}>{t("nav_cta")}</Link>
      </div>
      <Link href="/" className={styles.brand} aria-label="DNABS — domov">
        <Image src={logo} alt="DNABS" className={styles.logoImg} priority />
      </Link>
    </nav>
  );
}
