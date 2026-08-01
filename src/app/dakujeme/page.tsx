import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Ďakujeme — DNABS",
};

export default function DakujemePage() {
  return (
    <>
      <head>
        {/* Event snippet for Zobrazenie stránky conversion page */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              gtag('event', 'conversion', {
                  'send_to': 'AW-18360461587/Ctr6CJKaj9kcEJPS-bJE',
                  'value': 1.0,
                  'currency': 'EUR'
              });
            `,
          }}
        />
      </head>
      <section className={styles.section}>
        <div className={styles.kicker}>// Dopyt odoslaný</div>
        <h1 className={styles.h1}>
          Ďakujeme
          <span className={styles.script}>— ozveme sa.</span>
        </h1>
        <p className={styles.body}>
          Tvoju správu sme prijali a čoskoro sa ti ozveme na e-mail alebo telefón, ktorý si nám nechal/-a.
        </p>
        <Link href="/" className={styles.cta}>
          Späť na web →
        </Link>
      </section>
    </>
  );
}
