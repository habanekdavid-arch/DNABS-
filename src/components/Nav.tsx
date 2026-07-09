"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n";
import styles from "./Nav.module.css";
import logo from "../assets/dnabs-logo.png";

export default function Nav() {
  const { lang, setLang, t } = useLanguage();

  return (
    <nav className={styles.nav}>
      <a href="#top" className={styles.brand}>
        <Image src={logo} alt="DNABS" width={30} height={30} style={{ objectFit: "contain" }} />
        <span className={styles.brandName}>DNABS</span>
        <span className={styles.reg}>®</span>
      </a>
      <div className={styles.right}>
        <a href="#sluzby" className={styles.link}>{t("nav_services")}</a>
        <a href="#o-nas" className={styles.link}>{t("nav_about")}</a>
        <a href="#kontakt" className={styles.link}>{t("nav_contact")}</a>
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
        <a href="#kontakt" className={styles.cta}>{t("nav_cta")}</a>
      </div>
    </nav>
  );
}
