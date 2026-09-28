"use client";

import { HERO } from "@/data/hlavicka";
import AmbientBlobs from "../AmbientBlobs";
import Collage from "./Collage";
import MagnetickeTlacidlo from "./MagnetickeTlacidlo";
import styles from "./HeroTop.module.css";

export default function HeroTop() {
  return (
    <section className={styles.hero} id="uvod">
      <AmbientBlobs />

      <div className={styles.grid}>
        <div className={styles.left}>
          {/* data-fx = z nadpisu vyletujú tvary, data-fx-idle = aj samo od seba */}
          <h1 className={styles.h1} data-fx data-fx-idle>
            {HERO.nadpis.map((riadok) => (
              <span key={riadok} className={styles.h1Riadok}>{riadok}</span>
            ))}
          </h1>

          {HERO.vyhody.length > 0 && (
            <ul className={styles.vyhody}>
              {HERO.vyhody.map((v) => (
                <li key={v} className={styles.vyhoda}>
                  <span className={styles.bodka} aria-hidden />
                  {v}
                </li>
              ))}
            </ul>
          )}

          <hr className={styles.divider} />

          <div className={styles.actions}>
            <MagnetickeTlacidlo href={HERO.tlacidlo.href}>
              {HERO.tlacidlo.label}
            </MagnetickeTlacidlo>
          </div>
        </div>

        <div className={styles.right}>
          <Collage />
        </div>
      </div>
    </section>
  );
}
