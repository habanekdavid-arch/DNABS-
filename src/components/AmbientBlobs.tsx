"use client";

import { useEffect, useRef } from "react";
import styles from "./Ambient.module.css";

/** k = (i+1) * 22 — vzdialenejšie škvrny sa hýbu viac, vzniká paralaxa. */
const PARALLAX_STEP = 22;

export default function AmbientBlobs({ soft = false }: { soft?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const blobs = Array.from(wrap.children) as HTMLElement[];
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let frame = 0;

    const onMove = (e: MouseEvent) => {
      // -0.5 … 0.5, teda stred obrazovky je nula
      targetX = e.clientX / window.innerWidth - 0.5;
      targetY = e.clientY / window.innerHeight - 0.5;
    };

    const tick = (t: number) => {
      x += (targetX - x) * 0.08;
      y += (targetY - y) * 0.08;
      blobs.forEach((blob, i) => {
        const k = (i + 1) * PARALLAX_STEP;
        const dx = x * k + Math.sin(t / 3000 + i) * 20;
        const dy = y * k + Math.cos(t / 3500 + i) * 20;
        blob.style.transform = `translate(${dx}px, ${dy}px)`;
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div ref={wrapRef} className={`${styles.blobs} ${soft ? styles.soft : ""}`} aria-hidden>
      <div className={`${styles.blob} ${styles.blue}`} />
      <div className={`${styles.blob} ${styles.orange}`} />
      <div className={`${styles.blob} ${styles.purple}`} />
    </div>
  );
}
