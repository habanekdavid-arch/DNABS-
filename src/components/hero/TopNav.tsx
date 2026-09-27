"use client";

import { NAV_LINKS, NAV_CTA, NAV_LOGO } from "@/data/hlavicka";
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
          {NAV_LOGO ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={NAV_LOGO} alt="DNABS" className={styles.logoImg} />
          ) : (
            <LogoPlaceholder />
          )}
        </a>

        <div className={styles.links}>
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={styles.link}
              onClick={(e) => onClick(e, item.href)}
            >
              {/* Dva rovnaké nápisy nad sebou — pri hoveri sa vymenia. */}
              <span className={styles.linkText}>{item.label}</span>
              <span className={styles.linkTextHover} aria-hidden>{item.label}</span>
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
