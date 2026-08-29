"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./ScrollText.module.css";

const GLITCH_COLORS = ["var(--accent)", "var(--cyan)", "var(--purple)"];
const REVEAL_WINDOW = 0.035;

export default function ScrollText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;
    const measure = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.92;
      const end = vh * 0.4;
      const raw = (start - rect.top) / (start - end);
      setProgress(Math.min(1, Math.max(0, raw)));
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <p ref={ref} className={`${styles.text} ${className || ""}`}>
      {words.map((word, i) => {
        const threshold = words.length <= 1 ? 0 : i / (words.length - 1);
        const distance = progress - threshold;
        const color = GLITCH_COLORS[i % GLITCH_COLORS.length];

        let style: CSSProperties;
        if (distance < 0) {
          style = { opacity: 0.15, color: "inherit", transform: "translateY(5px)" };
        } else if (distance < REVEAL_WINDOW) {
          style = {
            opacity: 1,
            color,
            textShadow: `1.5px 0 var(--cyan), -1.5px 0 var(--accent)`,
            transform: "translateY(0)",
          };
        } else {
          style = { opacity: 1, color: "inherit", textShadow: "none", transform: "translateY(0)" };
        }

        return (
          <span key={i}>
            <span className={styles.word} style={style}>
              {word}
            </span>
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </p>
  );
}
