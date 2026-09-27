"use client";

import { HERO } from "@/data/hlavicka";
import AmbientBlobs from "../AmbientBlobs";
import Collage from "./Collage";
import styles from "./HeroTop.module.css";

export default function HeroTop() {
  return (
    <section className={styles.hero} id="uvod">
      <AmbientBlobs />

      <div className={styles.grid}>
        <div className={styles.left}>
          {/* data-fx = z nadpisu vyletujú tvary, data-fx-idle = aj samo od seba */}
          <h1 className={styles.h1} data-fx data-fx-idle>
            {HERO.nadpis}
          </h1>
          <p className={styles.sub}>{HERO.podnadpis}</p>
          <div className={styles.actions}>
            <a href={HERO.tlacidloHlavne.href} className={styles.primary} data-fx data-cursor="cta">
              {HERO.tlacidloHlavne.label}
              <span className={styles.arrow} aria-hidden>↗</span>
            </a>
            <a href={HERO.tlacidloVedlajsie.href} className={styles.secondary} data-fx>
              {HERO.tlacidloVedlajsie.label}
            </a>
          </div>
        </div>

        <div className={styles.right}>
          <Collage />
        </div>
      </div>
    </section>
  );
}
