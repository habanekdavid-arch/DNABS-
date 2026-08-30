"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n";
import Reveal from "./Reveal";
import styles from "./Footer.module.css";
import logo from "../assets/dnabs-logo.png";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className={styles.footer}>
      <Reveal className={styles.top}>
        <div className={styles.brandCol}>
          <div className={styles.brandRow}>
            <Image src={logo} alt="DNABS" width={26} height={26} className={styles.logo} />
            <span className={styles.brandName}>DNABS</span>
          </div>
          <p className={styles.tag}>{t("footer_tag")}</p>
        </div>
        <div className={styles.cols}>
          <div className={styles.col}>
            <div className={styles.colTitle}>{t("footer_nav")}</div>
            <a href="#sluzby" className={styles.colLink}>{t("nav_services")}</a>
            <a href="#o-nas" className={styles.colLink}>{t("nav_about")}</a>
            <a href="#kontakt" className={styles.colLink}>{t("nav_contact")}</a>
          </div>
          <div className={styles.col}>
            <div className={styles.colTitle}>{t("footer_social")}</div>
            <a href="https://www.instagram.com/dnabs.sk/" target="_blank" rel="noopener noreferrer" className={styles.colLink}>Instagram</a>
            <a href="mailto:contact.dnabs@gmail.com" className={styles.colLink}>contact.dnabs@gmail.com</a>
          </div>
          <div className={styles.col}>
            <div className={styles.colTitle}>Právne</div>
            <a href="/obchodne-podmienky" className={styles.colLink}>Obchodné podmienky</a>
            <a href="/cookies" className={styles.colLink}>Cookies</a>
          </div>
        </div>
      </Reveal>
      <div className={styles.bottomBar}>
        <span>© 2026 DNABS®</span>
        <span>{t("footer_made")}</span>
        <span>All rights reserved</span>
        <a href="/obchodne-podmienky" className={styles.bottomLink}>Obchodné podmienky</a>
        <a href="/cookies" className={styles.bottomLink}>Cookies</a>
      </div>
      <div className={styles.wordmark} aria-hidden="true">DNABS</div>
    </footer>
  );
}
