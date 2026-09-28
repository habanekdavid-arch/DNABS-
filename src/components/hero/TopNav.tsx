"use client";

import { useEffect, useRef, useState } from "react";
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
  const [otvorene, setOtvorene] = useState(false);
  const header = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  /* Zatváranie menu.
     Pozor na dve veci:
     1. Plynulé posúvanie na sekcie rieši komponent SmoothAnchors, ktorý
        odchytáva kliky na odkazy s „#" v capture fáze na dokumente a volá
        stopPropagation(). K onClick priamo na odkaze sa klik nedostane.
        Preto počúvame tiež na dokumente v capture fáze — stopPropagation
        nezastaví poslucháčov na tom istom uzle.
     2. Odkaz v menu nesmieme skryť skôr, ako klik prebehne. Pri zatváraní
        na pointerdown odkaz zmizol medzi stlačením a kliknutím a stránka
        sa nikam nepresunula. */
  useEffect(() => {
    if (!otvorene) return;

    const naKlaves = (e: KeyboardEvent) => { if (e.key === "Escape") setOtvorene(false); };

    // Odkaz v menu — zatvárame až pri kliku, aby stihol spraviť svoje.
    const naKlik = (e: MouseEvent) => {
      const ciel = e.target as Element | null;
      if (ciel && panel.current?.contains(ciel) && ciel.closest("a")) setOtvorene(false);
    };

    // Čokoľvek mimo hlavičky zatvára hneď pri stlačení.
    const naStlacenie = (e: PointerEvent) => {
      const ciel = e.target as Element | null;
      if (ciel && header.current && !header.current.contains(ciel)) setOtvorene(false);
    };

    document.addEventListener("keydown", naKlaves);
    document.addEventListener("click", naKlik, true);
    document.addEventListener("pointerdown", naStlacenie);
    return () => {
      document.removeEventListener("keydown", naKlaves);
      document.removeEventListener("click", naKlik, true);
      document.removeEventListener("pointerdown", naStlacenie);
    };
  }, [otvorene]);

  return (
    <header className={styles.header} ref={header}>
      <nav className={`${styles.nav} ${otvorene ? styles.navOtvorene : ""}`} aria-label="Hlavná navigácia">
        <div className={styles.rad}>
          <a href="#top" className={styles.logo} aria-label="DNABS — domov">
            {NAV_LOGO ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={NAV_LOGO} alt="DNABS" className={styles.logoImg} />
            ) : (
              <LogoPlaceholder />
            )}
          </a>

          <div className={styles.links}>
            {NAV_LINKS.map((item) => (
              <a key={item.href} href={item.href} className={styles.link}>
                {/* Dva rovnaké nápisy nad sebou — pri hoveri sa vymenia. */}
                <span className={styles.linkText}>{item.label}</span>
                <span className={styles.linkTextHover} aria-hidden>{item.label}</span>
              </a>
            ))}
          </div>

          <a href={NAV_CTA.href} className={styles.cta}>
            <span className={styles.dot} aria-hidden />
            {NAV_CTA.label}
          </a>

          {/* Na telefóne je namiesto odkazov toto tlačidlo. */}
          <button
            type="button"
            className={styles.burger}
            aria-expanded={otvorene}
            aria-controls="mobilne-menu"
            aria-label={otvorene ? "Zavrieť menu" : "Otvoriť menu"}
            onClick={() => setOtvorene((v) => !v)}
          >
            <span className={styles.burgerCiara} aria-hidden />
            <span className={styles.burgerCiara} aria-hidden />
          </button>
        </div>

        {/* Rozbalené menu na telefóne. */}
        <div id="mobilne-menu" className={styles.panel} hidden={!otvorene} ref={panel}>
          {NAV_LINKS.map((item) => (
            <a key={item.href} href={item.href} className={styles.panelLink}>
              {item.label}
            </a>
          ))}
          <a href={NAV_CTA.href} className={styles.panelCta}>
            <span className={styles.dot} aria-hidden />
            {NAV_CTA.label}
          </a>
        </div>
      </nav>
    </header>
  );
}
