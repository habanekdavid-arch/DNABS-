"use client";

import { useEffect, useRef, useState } from "react";
import { NAV_LINKS, NAV_CTA, NAV_LOGO } from "@/data/hlavicka";
import { VSTUPNE_STRANKY } from "@/data/vstupneStranky";
import { useLanguage } from "@/lib/i18n";
import PrepinacJazyka from "../PrepinacJazyka";
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
  const { lang, t } = useLanguage();
  const [otvorene, setOtvorene] = useState(false);
  /* Rozbaľovacie menu služieb na širokej obrazovke. Na telefóne sú služby
     vypísané priamo v paneli, tam by sa druhá úroveň len zle trafila. */
  const [sluzby, setSluzby] = useState(false);
  const header = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const sluzbyObal = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!sluzby) return;
    const zavri = (e: Event) => {
      if (!sluzbyObal.current?.contains(e.target as Node)) setSluzby(false);
    };
    const klaves = (e: KeyboardEvent) => { if (e.key === "Escape") setSluzby(false); };
    /* Capture fáza z rovnakého dôvodu ako vyššie: SmoothAnchors zastavuje
       bublanie klikov na kotvy, takže v bežnej fáze by sa sem nedostali. */
    document.addEventListener("click", zavri, true);
    document.addEventListener("keydown", klaves);
    return () => {
      document.removeEventListener("click", zavri, true);
      document.removeEventListener("keydown", klaves);
    };
  }, [sluzby]);

  /* V češtine vedieme na /cs/… adresy. Pre ostatné jazyky vlastné adresy
     zatiaľ nemáme, tak dostanú slovenské. */
  const adresaSluzby = (v: (typeof VSTUPNE_STRANKY)[number]) =>
    lang === "cs" ? `/cs/${v.slugCs}` : `/${v.slug}`;

  return (
    <header className={styles.header} ref={header}>
      <nav className={`${styles.nav} ${otvorene ? styles.navOtvorene : ""}`} aria-label={t("nav_label")}>
        <div className={styles.rad}>
          <a href="#top" className={styles.logo} aria-label={t("nav_home")}>
            {NAV_LOGO ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={NAV_LOGO} alt="DNABS" className={styles.logoImg} />
            ) : (
              <LogoPlaceholder />
            )}
          </a>

          <div className={styles.links}>
            {NAV_LINKS.map((item) =>
              item.href === "#sluzby" ? (
                /* Služby majú vlastné stránky — bez odkazu na ne by sa dali
                   nájsť len cez reklamu. */
                <div key={item.label.sk} className={styles.sluzbyObal} ref={sluzbyObal}>
                  <button
                    type="button"
                    className={styles.link}
                    aria-expanded={sluzby}
                    aria-haspopup="true"
                    onClick={() => setSluzby((v) => !v)}
                  >
                    <span className={styles.linkText}>{item.label[lang]}</span>
                    <span className={styles.linkTextHover} aria-hidden>{item.label[lang]}</span>
                    <span className={`${styles.sipka} ${sluzby ? styles.sipkaOtvorena : ""}`} aria-hidden>▾</span>
                  </button>
                  <div className={`${styles.sluzbyMenu} ${sluzby ? styles.sluzbyMenuOtvorene : ""}`}>
                    {VSTUPNE_STRANKY.map((v) => (
                      <a
                        key={v.slug}
                        href={adresaSluzby(v)}
                        className={styles.sluzbyPolozka}
                        onClick={() => setSluzby(false)}
                      >
                        {v.sluzbaNazov[lang]}
                      </a>
                    ))}
                    <a href="#sluzby" className={styles.sluzbyVsetky} onClick={() => setSluzby(false)}>
                      {t("nav_services_all")}
                    </a>
                  </div>
                </div>
              ) : (
                <a key={item.label.sk} href={item.href} className={styles.link}>
                  {/* Dva rovnaké nápisy nad sebou — pri hoveri sa vymenia. */}
                  <span className={styles.linkText}>{item.label[lang]}</span>
                  <span className={styles.linkTextHover} aria-hidden>{item.label[lang]}</span>
                </a>
              ),
            )}
          </div>

          <a href={NAV_CTA.href} className={styles.cta}>
            <span className={styles.dot} aria-hidden />
            {NAV_CTA.label[lang]}
          </a>

          {/* Prepínač jazyka v riadku navigácie — len na užších obrazovkách.
              Na širokých je samostatne v pravom hornom rohu (nižšie). */}
          <PrepinacJazyka className={styles.jazykVRade} />

          {/* Na telefóne je namiesto odkazov toto tlačidlo. */}
          <button
            type="button"
            className={styles.burger}
            aria-expanded={otvorene}
            aria-controls="mobilne-menu"
            aria-label={otvorene ? t("nav_menu_close") : t("nav_menu_open")}
            onClick={() => setOtvorene((v) => !v)}
          >
            <span className={styles.burgerCiara} aria-hidden />
            <span className={styles.burgerCiara} aria-hidden />
          </button>
        </div>

        {/* Rozbalené menu na telefóne. */}
        <div id="mobilne-menu" className={styles.panel} hidden={!otvorene} ref={panel}>
          {NAV_LINKS.map((item) => (
            <div key={item.label.sk}>
              <a href={item.href} className={styles.panelLink}>
                {item.label[lang]}
              </a>
              {/* Služby sú vypísané rovno, bez druhého ťuknutia — na telefóne
                  je rozbaľovanie v už rozbalenom menu zbytočná prekážka. */}
              {item.href === "#sluzby" &&
                VSTUPNE_STRANKY.map((v) => (
                  <a key={v.slug} href={adresaSluzby(v)} className={styles.panelPodlink}>
                    {v.sluzbaNazov[lang]}
                  </a>
                ))}
            </div>
          ))}
          <a href={NAV_CTA.href} className={styles.panelCta}>
            <span className={styles.dot} aria-hidden />
            {NAV_CTA.label[lang]}
          </a>
        </div>
      </nav>

      {/* Na širokej obrazovke prepínač jazyka v pravom hornom rohu,
          mimo pilulky navigácie. */}
      <div className={styles.jazykRoh}>
        <PrepinacJazyka />
      </div>
    </header>
  );
}
