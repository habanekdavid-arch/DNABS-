"use client";

import { useEffect, useRef } from "react";
import styles from "./Ambient.module.css";

const TILE = 160;

/** Textúra sa generuje raz a použije ako opakované pozadie. */
function makeNoiseUrl(): string | null {
  const canvas = document.createElement("canvas");
  canvas.width = TILE;
  canvas.height = TILE;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const image = ctx.createImageData(TILE, TILE);
  for (let i = 0; i < image.data.length; i += 4) {
    const shade = 120 + Math.random() * 135;
    image.data[i] = shade;
    image.data[i + 1] = shade;
    image.data[i + 2] = shade;
    image.data[i + 3] = 255;
  }
  ctx.putImageData(image, 0, 0);
  return canvas.toDataURL("image/png");
}

export default function Grain() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const url = makeNoiseUrl();
    if (!url) return;
    node.style.backgroundImage = `url(${url})`;
    node.style.backgroundRepeat = "repeat";

    // Posúvanie textúry je len oživenie — pri obmedzenom pohybe ho vynecháme.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      if (document.hidden) return;
      const dx = Math.floor(Math.random() * TILE);
      const dy = Math.floor(Math.random() * TILE);
      node.style.backgroundPosition = `${dx}px ${dy}px`;
    }, 120);

    return () => window.clearInterval(timer);
  }, []);

  return <div ref={ref} className={styles.grain} aria-hidden />;
}
