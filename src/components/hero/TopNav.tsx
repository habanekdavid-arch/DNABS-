"use client";

import { useRef } from "react";
import { NAV_LINKS, NAV_CTA } from "@/data/hlavicka";
import { scramble } from "@/lib/scramble";
import styles from "./TopNav.module.css";

/** Placeholder loga — nahraďte vlastným SVG, stačí zachovať fill="currentColor". */
function LogoPlaceholder() {
  return (
    <svg viewBox="0 0 96 24" role="img" aria-label="DNABS" fill="currentColor">
      <text x="0" y="18" fontFamily="var(--font-manrope), sans-serif" fontWeight="800" fontSize="19" letterSpacing="-0.04em">
        DNABS
      </text>
    </svg>
  );
}

export default function TopNav() {
  // Kým efekt na odkaze beží, druhé spustenie sa ignoruje.
  const running = useRef(new WeakMap<HTMLElement, () => void>());

  const onEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    if (running.current.has(el)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cancel = scramble(el);
    running.current.set(el, cancel);
    window.setTimeout(() => running.current.delete(el), 420);
  };

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Hlavná navigácia">
        <a href="#top" className={styles.logo} aria-label="DNABS — domov" onClick={(e) => onClick(e, "#top")}>
          <LogoPlaceholder />
        </a>

        <div className={styles.links}>
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={styles.link}
              data-label={item.label}
              onMouseEnter={onEnter}
              onClick={(e) => onClick(e, item.href)}
            >
              {item.label}
            </a>
          ))}
        </div>

        <a href={NAV_CTA.href} className={styles.cta} onClick={(e) => onClick(e, NAV_CTA.href)}>
          <span className={styles.dot} aria-hidden />
          {NAV_CTA.label}
        </a>
      </nav>
    </header>
  );
}
