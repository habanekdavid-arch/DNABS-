"use client";

import { useRef } from "react";
import styles from "./MagnetickeTlacidlo.module.css";

/**
 * Tlačidlo, ktoré sa pri myši správa živo:
 *  — mierne sa ťahá ku kurzoru,
 *  — farebná výplň sa rozleje presne z miesta, kde kurzor vošiel,
 *  — nápis sa vymení po písmenách, jedno po druhom zľava doprava.
 *
 * Na dotykových displejoch a pri „obmedziť pohyb" je z toho obyčajné
 * veľké tlačidlo — efekt sa vôbec nezapne.
 */
export default function MagnetickeTlacidlo(
  { href, label }: { href: string; label: string },
) {
  const ref = useRef<HTMLAnchorElement>(null);
  const pismena = [...label];

  const jemnyUkazovatel = () =>
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const nastav = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el || !jemnyUkazovatel()) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el || !jemnyUkazovatel()) return;
    nastav(e);
    const r = el.getBoundingClientRect();
    // Ťahá sa ku kurzoru, ale len kúsok — inak by ušlo spod ruky.
    const dx = (e.clientX - (r.left + r.width / 2)) * 0.22;
    const dy = (e.clientY - (r.top + r.height / 2)) * 0.34;
    el.style.setProperty("--tx", `${dx}px`);
    el.style.setProperty("--ty", `${dy}px`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--tx", "0px");
    el.style.setProperty("--ty", "0px");
  };

  /* Nápis rozobratý na písmená. Čítačke obrazovky ho podáva aria-label
     na odkaze, samotné písmená sú pred ňou schované. */
  const riadok = (trieda: string) => (
    <span className={trieda} aria-hidden>
      {pismena.map((z, i) => (
        <span key={i} className={styles.pismeno} style={{ "--i": i } as React.CSSProperties}>
          {z === " " ? " " : z}
        </span>
      ))}
    </span>
  );

  return (
    <a
      ref={ref}
      href={href}
      aria-label={label}
      className={styles.btn}
      onMouseEnter={nastav}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor="cta"
    >
      <span className={styles.vypln} aria-hidden />
      <span className={styles.popisBox}>
        {riadok(styles.popis)}
        {riadok(styles.popisHover)}
      </span>
      <span className={styles.sipka} aria-hidden>
        <span className={styles.sipkaZnak}>→</span>
      </span>
    </a>
  );
}
