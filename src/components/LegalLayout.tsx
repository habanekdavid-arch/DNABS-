"use client";

import type { ReactNode } from "react";
import { useLanguage } from "@/lib/i18n";
import Nav from "./Nav";
import Footer from "./Footer";
import Reveal from "./Reveal";
import styles from "./LegalLayout.module.css";

export default function LegalLayout({
  kicker,
  title,
  updated,
  children,
}: {
  kicker: string;
  title: string;
  updated: string;
  children: ReactNode;
}) {
  const { t } = useLanguage();

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.grid} />
        <Nav />
        <Reveal className={styles.heroInner}>
          <div className={styles.kicker}>{kicker}</div>
          <h1 className={styles.h1}>{title}</h1>
          <p className={styles.updated}>{t("legal_updated")} {updated}</p>
          {/* Právne texty sú len po slovensky — v inom jazyku na to upozorníme. */}
          {t("legal_note") && <p className={styles.updated}>{t("legal_note")}</p>}
        </Reveal>
      </section>
      <div className={styles.body}>
        <div className={styles.bodyInner}>{children}</div>
      </div>
      <Footer />
    </>
  );
}
