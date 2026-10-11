"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { JAZYKY, NAZVY_JAZYKOV } from "@/lib/jazyky";
import styles from "./PrepinacJazyka.module.css";

/**
 * Prepínač jazyka — tlačidlo so skratkou aktuálneho jazyka, po kliknutí
 * sa rozbalí zoznam všetkých jazykov. Zvolený jazyk si prehliadač
 * zapamätá (rieši LanguageProvider).
 *
 * `tmavy` = na tmavom pozadí (stará navigácia na podstránkach).
 */
export default function PrepinacJazyka({ tmavy = false, className = "" }: { tmavy?: boolean; className?: string }) {
  const { lang, setLang, t } = useLanguage();
  const [otvoreny, setOtvoreny] = useState(false);
  const koren = useRef<HTMLDivElement>(null);
  const idZoznamu = useId();

  useEffect(() => {
    if (!otvoreny) return;
    const naKlaves = (e: KeyboardEvent) => { if (e.key === "Escape") setOtvoreny(false); };
    const naStlacenie = (e: PointerEvent) => {
      if (koren.current && !koren.current.contains(e.target as Node)) setOtvoreny(false);
    };
    document.addEventListener("keydown", naKlaves);
    document.addEventListener("pointerdown", naStlacenie);
    return () => {
      document.removeEventListener("keydown", naKlaves);
      document.removeEventListener("pointerdown", naStlacenie);
    };
  }, [otvoreny]);

  return (
    <div ref={koren} className={`${styles.prepinac} ${tmavy ? styles.tmavy : ""} ${className}`}>
      <button
        type="button"
        className={styles.tlacidlo}
        aria-haspopup="true"
        aria-expanded={otvoreny}
        aria-controls={idZoznamu}
        aria-label={`${t("lang_label")}: ${NAZVY_JAZYKOV[lang]}`}
        onClick={() => setOtvoreny((v) => !v)}
      >
        <GlobusIkona />
        <span className={styles.kod}>{lang.toUpperCase()}</span>
        <span className={`${styles.sipka} ${otvoreny ? styles.sipkaHore : ""}`} aria-hidden>▾</span>
      </button>

      <ul id={idZoznamu} className={styles.zoznam} hidden={!otvoreny} aria-label={t("lang_label")}>
        {JAZYKY.map((jazyk) => (
          <li key={jazyk}>
            <button
              type="button"
              lang={jazyk}
              className={`${styles.moznost} ${jazyk === lang ? styles.aktivna : ""}`}
              aria-current={jazyk === lang ? "true" : undefined}
              onClick={() => {
                setLang(jazyk);
                setOtvoreny(false);
              }}
            >
              <span className={styles.moznostKod}>{jazyk.toUpperCase()}</span>
              <span>{NAZVY_JAZYKOV[jazyk]}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function GlobusIkona() {
  return (
    <svg viewBox="0 0 24 24" className={styles.globus} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.6 2.5 3.9 5.5 3.9 9s-1.3 6.5-3.9 9c-2.6-2.5-3.9-5.5-3.9-9S9.4 5.5 12 3z" />
    </svg>
  );
}
