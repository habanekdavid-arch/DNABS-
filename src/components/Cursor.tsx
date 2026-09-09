"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Cursor.module.css";

// Nad týmito prvkami sa prstenec nafúkne — plus čokoľvek s data-cursor.
const INTERACTIVE = "a, button, summary, input, textarea, select, [data-cursor]";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Na dotykových zariadeniach a pri obmedzenom pohybe vlastný kurzor nekreslíme.
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(fine.matches && !reduced.matches);
    sync();
    fine.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!enabled || !dot || !ring) return;

    document.documentElement.classList.add(styles.hideNative);

    let x = -100;
    let y = -100;
    let ringX = x;
    let ringY = y;
    let shown = false;
    let frame = 0;

    const show = () => {
      dot.classList.add(styles.visible);
      ring.classList.add(styles.visible);
    };
    const hide = () => {
      dot.classList.remove(styles.visible);
      ring.classList.remove(styles.visible);
    };

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!shown) {
        // Prvý pohyb: prstenec začína pod bodkou, nech sa nepriletí cez pol obrazovky.
        shown = true;
        ringX = x;
        ringY = y;
        show();
      }
    };
    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const hit = target?.closest?.(INTERACTIVE) ?? null;
      ring.classList.toggle(styles.ringActive, Boolean(hit));
    };
    const onDown = () => ring.classList.add(styles.ringDown);
    const onUp = () => ring.classList.remove(styles.ringDown);
    const onLeave = () => {
      shown = false;
      hide();
    };

    const tick = () => {
      ringX += (x - ringX) * 0.18;
      ringY += (y - ringY) * 0.18;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove(styles.hideNative);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={ringRef} className={styles.ring} aria-hidden />
      <div ref={dotRef} className={styles.dot} aria-hidden />
    </>
  );
}
