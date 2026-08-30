"use client";

import type { ReactNode } from "react";
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
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.grid} />
        <Nav />
        <Reveal className={styles.heroInner}>
          <div className={styles.kicker}>{kicker}</div>
          <h1 className={styles.h1}>{title}</h1>
          <p className={styles.updated}>Posledná aktualizácia: {updated}</p>
        </Reveal>
      </section>
      <div className={styles.body}>
        <div className={styles.bodyInner}>{children}</div>
      </div>
      <Footer />
    </>
  );
}
