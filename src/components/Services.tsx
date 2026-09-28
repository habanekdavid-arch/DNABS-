"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLanguage, type DictKey } from "@/lib/i18n";
import Reveal from "./Reveal";
import styles from "./Services.module.css";

type Chip = { sk: string; en: string; detail: { sk: string; en: string } };

const ROWS: {
  titleKey: DictKey;
  descKey: DictKey;
  /** Farba služby. Musí byť čitateľná na svetlom pozadí. */
  color: string;
  chips: Chip[];
}[] = [
  {
    titleKey: "svc1_t",
    descKey: "svc1_d",
    color: "#E24A08",
    chips: [
      {
        sk: "Next.js", en: "Next.js",
        detail: {
          sk: "Stránky sa predrenderujú dopredu, takže sa načítajú takmer okamžite. Beží na ňom aj tento web.",
          en: "Pages are pre-rendered ahead of time, so they load almost instantly. This site runs on it too.",
        },
      },
      {
        sk: "Webflow", en: "Webflow",
        detail: {
          sk: "Keď si chcete obsah spravovať sami bez programátora. Vhodné na menšie prezentačné weby.",
          en: "For when you want to manage content yourself without a developer. Good for smaller sites.",
        },
      },
      {
        sk: "E-shop", en: "E-commerce",
        detail: {
          sk: "Produkty, sklad, doprava a platby. Napojené na fakturáciu, ktorú už používate.",
          en: "Products, stock, shipping and payments. Hooked into the invoicing you already use.",
        },
      },
      {
        sk: "Responzívny dizajn", en: "Responsive design",
        detail: {
          sk: "Web sa navrhuje od telefónu nahor — väčšina návštev chodí práve odtiaľ.",
          en: "Designed from the phone up — that is where most visits come from.",
        },
      },
      {
        sk: "SEO základ", en: "SEO foundations",
        detail: {
          sk: "Nadpisy, popisy, mapa stránok a štruktúrované dáta, aby web Google vedel správne prečítať.",
          en: "Headings, descriptions, sitemap and structured data so Google can read the site properly.",
        },
      },
      {
        sk: "Doména a hosting", en: "Domain and hosting",
        detail: {
          sk: "Nastavíme doménu, certifikát aj nasadenie. Nemusíte riešiť nič technické.",
          en: "We set up the domain, certificate and deployment. Nothing technical on your side.",
        },
      },
    ],
  },
  {
    titleKey: "svc2_t",
    descKey: "svc2_d",
    color: "#563387",
    chips: [
      {
        sk: "Webové aplikácie", en: "Web apps",
        detail: {
          sk: "Nástroj, ktorý beží v prehliadači — bez inštalácie a dostupný odkiaľkoľvek.",
          en: "A tool that runs in the browser — no install, reachable from anywhere.",
        },
      },
      {
        sk: "iOS / Android", en: "iOS / Android",
        detail: {
          sk: "Jedna aplikácia pre obidva systémy, keď ju zákazníci majú mať priamo v telefóne.",
          en: "One app for both systems, for when customers should have it right on their phone.",
        },
      },
      {
        sk: "Rezervačné systémy", en: "Booking systems",
        detail: {
          sk: "Termíny, obsadenosť a potvrdzovacie e-maily. Koniec zapisovania do zošita.",
          en: "Slots, availability and confirmation e-mails. No more writing it in a notebook.",
        },
      },
      {
        sk: "Automatizácia", en: "Automation",
        detail: {
          sk: "Kroky, ktoré dnes robíte ručne každý deň, prevezme systém a spustí ich sám.",
          en: "The steps you do by hand every day get taken over and run on their own.",
        },
      },
      {
        sk: "Napojenie na API", en: "API integrations",
        detail: {
          sk: "Prepojíme to, čo už používate — fakturáciu, sklad, CRM — nech si dáta podávajú samy.",
          en: "We connect what you already use — invoicing, stock, CRM — so the data flows by itself.",
        },
      },
      {
        sk: "Interné nástroje", en: "Internal tools",
        detail: {
          sk: "Prehľady a ovládanie pre váš tím na jednom mieste, nie roztrúsené po tabuľkách.",
          en: "Overviews and controls for your team in one place, not scattered across spreadsheets.",
        },
      },
    ],
  },
  {
    titleKey: "svc3_t",
    descKey: "svc3_d",
    color: "#12A03F",
    chips: [
      {
        sk: "Logo a brand identita", en: "Logo and brand identity",
        detail: {
          sk: "Logo, farby a písma v jednom dokumente, aby značka vyzerala všade rovnako.",
          en: "Logo, colours and fonts in one document, so the brand looks the same everywhere.",
        },
      },
      {
        sk: "Fotografie", en: "Photography",
        detail: {
          sk: "Vlastné fotky prevádzky a produktov. Fotobanka je na webe hneď poznať.",
          en: "Your own photos of the place and products. Stock imagery is spotted straight away.",
        },
      },
      {
        sk: "Google Ads", en: "Google Ads",
        detail: {
          sk: "Kampane cielené na ľudí, ktorí vašu službu práve hľadajú. Merané až po dopyt.",
          en: "Campaigns aimed at people searching for your service right now. Measured down to the enquiry.",
        },
      },
      {
        sk: "Sociálne siete", en: "Social media",
        detail: {
          sk: "Príspevky a kampane, ktoré vedú späť na web — nie len na lajky.",
          en: "Posts and campaigns that lead back to the site — not just to likes.",
        },
      },
      {
        sk: "Výkonnostné kampane", en: "Performance campaigns",
        detail: {
          sk: "Rozpočet presúvame tam, odkiaľ chodia dopyty. Zvyšok vypíname.",
          en: "Budget moves to where the enquiries come from. The rest gets switched off.",
        },
      },
      {
        sk: "SEO a obsah", en: "SEO and content",
        detail: {
          sk: "Texty na otázky, ktoré vaši zákazníci naozaj hľadajú. Dlhodobo lacnejšie než reklama.",
          en: "Texts answering what your customers actually search for. Cheaper than ads long term.",
        },
      },
    ],
  },
];

export default function Services() {
  const { t, lang } = useLanguage();

  /* Ukazovatele sa rozbehnú, až keď sa na sekciu doscrolluje — rovnako
     ako grafy vo výsledkoch. */
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Každá dlaždica sleduje kurzor sama za seba: podľa toho, kde na nej
     myš je, sa nakloní a posvieti si na to miesto. Hodnoty ukladáme ako
     premenné priamo na tú dlaždicu, takže susedné o sebe nevedia. */
  const naPohyb = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    /* Nad jednotlivým bodom náklon zmrazíme. Inak by sa dlaždica hýbala
       ďalej a bod by ušiel spod kurzora — pri malých cieľoch to znamená,
       že sa naň nedá udržať. */
    if ((e.target as HTMLElement).closest("button")) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
    /* Naklonenie píšeme rovno do inline štýlu, nie cez :hover v CSS.
       Reveal si totiž transform drží tiež inline (kvôli nábehu zdola) a
       inline štýl prebije akékoľvek pravidlo zo súboru — hover cez CSS
       by sa sem nikdy nedostal. */
    /* Náklon je zámerne mierny. Dlaždica sa pri ňom posúva a body v nej
       sú malé ciele — pri väčšom náklone by spod kurzora ušli. */
    el.style.transform =
      `perspective(1000px) rotateY(${((x - 0.5) * 4).toFixed(2)}deg)` +
      ` rotateX(${((0.5 - y) * 4).toFixed(2)}deg) translateY(-4px) scale(1.008)`;
  };

  /* Späť na hodnotu, ktorú prvku dáva Reveal v odhalenom stave. */
  const naOdchod = (e: React.PointerEvent<HTMLElement>) => {
    e.currentTarget.style.transform = "none";
  };

  const stav = lang === "en" ? "AVAILABLE" : "DOSTUPNÉ";

  return (
    <section id="sluzby" className={styles.section}>
      <div className={styles.inner}>
        <Reveal className={styles.head}>
          <div>
            <div className={styles.label}>{t("svc_kicker")}</div>
            <h2 className={styles.title} data-fx>
              {t("svc_title")}
              <span className={styles.caret} aria-hidden />
            </h2>
          </div>
          <p className={styles.sub}>{t("svc_intro")}</p>
        </Reveal>

        <div ref={ref} className={`${styles.grid} ${on ? styles.on : ""}`}>
          {ROWS.map((row, i) => (
            <Reveal
              key={row.titleKey}
              as="article"
              className={styles.tile}
              onPointerMove={naPohyb}
              onPointerLeave={naOdchod}
              style={
                {
                  transitionDelay: `${i * 90}ms`,
                  "--c": row.color,
                  "--d": `${300 + i * 160}ms`,
                } as React.CSSProperties
              }
            >
              <div className={styles.tileHead}>
                <span>
                  {String(i + 1).padStart(2, "0")}
                  <span className={styles.sep}> / </span>
                  {t(row.titleKey)}
                </span>
                <span className={styles.stav}>
                  <span className={styles.dioda} aria-hidden />
                  {stav}
                </span>
              </div>

              <p className={styles.desc}>{t(row.descKey)}</p>

              <div className={styles.chips}>
                {row.chips.map((chip, j) => (
                  /* Každý bod je tlačidlo, nie text — aby sa naň dalo prejsť
                     aj klávesnicou a vysvetlenie sa ukázalo rovnako ako pri
                     myši. --n strieda smer náklonu, takže susedné body
                     nereagujú rovnako. */
                  <button
                    key={chip.en}
                    type="button"
                    className={styles.chip}
                    style={{ "--n": j % 2 === 0 ? 1 : -1 } as React.CSSProperties}
                  >
                    <span className={styles.chipText}>{chip[lang]}</span>
                    <span className={styles.chipDetail} role="tooltip">
                      {chip.detail[lang]}
                    </span>
                  </button>
                ))}
              </div>

              <span className={styles.track} aria-hidden>
                <span className={styles.fill} />
              </span>

              <Link href="/#kontakt" className={styles.cta} data-cursor="cta">
                {t("svc_card_cta")}
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
