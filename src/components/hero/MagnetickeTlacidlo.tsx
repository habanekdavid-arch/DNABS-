"use client";

import { useRef } from "react";
import styles from "./MagnetickeTlacidlo.module.css";

/**
 * Tlačidlo, ktoré sa pri myši správa živo: mierne sa nakloní ku kurzoru
 * a farebná výplň sa rozleje presne z miesta, kde kurzor vošiel.
 *
 * Na dotykových displejoch a pri „obmedziť pohyb" je z toho obyčajné
 * veľké tlačidlo — efekt sa vôbec nezapne.
 */
export default function MagnetickeTlacidlo(
  { href, children }: { href: string; children: React.ReactNode },
) {
  const ref = useRef<HTMLAnchorElement>(null);

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

  return (
    <a
      ref={ref}
      href={href}
      className={styles.btn}
      onMouseEnter={nastav}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor="cta"
    >
      <span className={styles.vypln} aria-hidden />
      {/* Dva rovnaké nápisy nad sebou — pri hoveri sa vymenia. */}
      <span className={styles.popisBox}>
        <span className={styles.popis}>{children}</span>
        <span className={styles.popisHover} aria-hidden>{children}</span>
      </span>
      <span className={styles.sipka} aria-hidden>→</span>
    </a>
  );
}
