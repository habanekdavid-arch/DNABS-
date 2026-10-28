"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLanguage, type Preklad } from "@/lib/i18n";
import Reveal from "./Reveal";
import styles from "./AiAutomatizacie.module.css";

/* ── AI AUTOMATIZÁCIE ─────────────────────────────────────────────────
   Sekcia na úvodnej stránke. Ukazuje, čo AI u klienta reálne robí —
   konkrétne úlohy, nie sľuby. Žiadne vymyslené percentá ani ušetrené
   hodiny: tie sa dajú povedať až po meraní u konkrétnej firmy.
   ─────────────────────────────────────────────────────────────────── */

const OBSAH: Record<
  "label" | "titul" | "sub" | "tokNadpis" | "zasadyNadpis" | "cta" | "viacAgenti" | "viacProcesy",
  Preklad
> = {
  label: {
    sk: "[ AI AUTOMATIZÁCIE ]",
    cs: "[ AI AUTOMATIZACE ]",
    en: "[ AI AUTOMATION ]",
    hu: "[ AI AUTOMATIZÁCIÓ ]",
    de: "[ KI-AUTOMATISIERUNG ]",
  },
  titul: {
    sk: "AI, ktorá robí\nprácu za vás",
    cs: "AI, která dělá\npráci za vás",
    en: "AI that does\nthe work for you",
    hu: "AI, amely elvégzi\na munkát Ön helyett",
    de: "KI, die Ihnen\nArbeit abnimmt",
  },
  sub: {
    sk: "Nie chatbot pre efekt. Automatizácie, ktoré každý deň zoberú opakovanú prácu — postavené na vašich podkladoch a podľa vašich pravidiel.",
    cs: "Ne chatbot pro efekt. Automatizace, které každý den převezmou opakovanou práci — postavené na vašich podkladech a podle vašich pravidel.",
    en: "Not a chatbot for show. Automations that take repetitive work off your plate every day — built on your own data and your own rules.",
    hu: "Nem látványchatbot. Olyan automatizációk, amelyek minden nap átveszik az ismétlődő munkát — az Ön adataira és szabályaira építve.",
    de: "Kein Chatbot für den Effekt. Automatisierungen, die Ihnen jeden Tag wiederkehrende Arbeit abnehmen — auf Ihren Unterlagen und nach Ihren Regeln.",
  },
  tokNadpis: {
    sk: "Ako to vyzerá v praxi",
    cs: "Jak to vypadá v praxi",
    en: "What it looks like in practice",
    hu: "Hogyan néz ki a gyakorlatban",
    de: "So sieht es in der Praxis aus",
  },
  zasadyNadpis: {
    sk: "Ako to staviame",
    cs: "Jak to stavíme",
    en: "How we build it",
    hu: "Hogyan építjük",
    de: "Wie wir es bauen",
  },
  cta: {
    sk: "Chcem AI automatizáciu",
    cs: "Chci AI automatizaci",
    en: "I want AI automation",
    hu: "AI automatizációt kérek",
    de: "KI-Automatisierung anfragen",
  },
  viacAgenti: {
    sk: "AI agenti →",
    cs: "AI agenti →",
    en: "AI agents →",
    hu: "AI-ügynökök →",
    de: "KI-Agenten →",
  },
  viacProcesy: {
    sk: "Automatizácia procesov →",
    cs: "Automatizace procesů →",
    en: "Process automation →",
    hu: "Folyamat-automatizálás →",
    de: "Prozessautomatisierung →",
  },
};

/** Jeden konkrétny prípad — e-mail, ktorý príde večer, a čo sa s ním stane. */
const TOK: { nadpis: Preklad; text: Preklad }[] = [
  {
    nadpis: {
      sk: "Príde e-mail s dopytom",
      cs: "Přijde e-mail s poptávkou",
      en: "An enquiry arrives by e-mail",
      hu: "Megérkezik egy ajánlatkérés",
      de: "Eine Anfrage kommt per E-Mail",
    },
    text: {
      sk: "o 22:40, keď už nikto nepracuje",
      cs: "ve 22:40, kdy už nikdo nepracuje",
      en: "at 10:40 pm, when nobody is working",
      hu: "este 22:40-kor, amikor már senki sem dolgozik",
      de: "um 22:40 Uhr, wenn niemand mehr arbeitet",
    },
  },
  {
    nadpis: {
      sk: "AI ho prečíta a roztriedi",
      cs: "AI ho přečte a roztřídí",
      en: "AI reads and sorts it",
      hu: "Az AI elolvassa és besorolja",
      de: "Die KI liest und sortiert sie",
    },
    text: {
      sk: "dopyt, reklamácia, alebo len spam",
      cs: "poptávka, reklamace, nebo jen spam",
      en: "a lead, a complaint, or just spam",
      hu: "ajánlatkérés, reklamáció vagy csak spam",
      de: "Anfrage, Reklamation oder nur Spam",
    },
  },
  {
    nadpis: {
      sk: "Údaje zapíše do systému",
      cs: "Údaje zapíše do systému",
      en: "It logs the details",
      hu: "Rögzíti az adatokat",
      de: "Sie trägt die Daten ein",
    },
    text: {
      sk: "meno, termín, požiadavka — do tabuľky alebo CRM",
      cs: "jméno, termín, požadavek — do tabulky nebo CRM",
      en: "name, date, request — into a sheet or your CRM",
      hu: "név, időpont, igény — táblázatba vagy CRM-be",
      de: "Name, Termin, Anliegen — in die Tabelle oder ins CRM",
    },
  },
  {
    nadpis: {
      sk: "Vám ostane len rozhodnutie",
      cs: "Vám zbude jen rozhodnutí",
      en: "You only make the call",
      hu: "Önnek csak döntenie kell",
      de: "Ihnen bleibt nur die Entscheidung",
    },
    text: {
      sk: "ráno čaká pripravený návrh odpovede na schválenie",
      cs: "ráno čeká připravený návrh odpovědi ke schválení",
      en: "in the morning a draft reply is waiting for approval",
      hu: "reggel már kész válaszjavaslat várja jóváhagyásra",
      de: "morgens wartet ein Antwortentwurf auf Ihre Freigabe",
    },
  },
];

type Pouzitie = { nadpis: Preklad; text: Preklad; odkaz?: { sk: string; cs: string } };

/** Čo vie AI u malej a strednej firmy prevziať. Odkaz vedie na
 *  podrobnú vstupnú stránku, ak k téme existuje. */
const POUZITIA: Pouzitie[] = [
  {
    nadpis: {
      sk: "Odpovede zákazníkom 24/7",
      cs: "Odpovědi zákazníkům 24/7",
      en: "Customer answers 24/7",
      hu: "Válaszok ügyfeleknek 0–24",
      de: "Kundenantworten rund um die Uhr",
    },
    text: {
      sk: "Na otázky o cenách, termínoch a službách odpovedá z vašich podkladov. Keď si nie je istý, pošle otázku vám.",
      cs: "Na otázky o cenách, termínech a službách odpovídá z vašich podkladů. Když si není jistý, pošle otázku vám.",
      en: "Answers questions about prices, dates and services from your own materials. When it isn't sure, it passes the question to you.",
      hu: "Az árakkal, időpontokkal és szolgáltatásokkal kapcsolatos kérdésekre az Ön anyagaiból válaszol. Ha nem biztos, továbbítja Önnek.",
      de: "Beantwortet Fragen zu Preisen, Terminen und Leistungen aus Ihren Unterlagen. Wenn sie unsicher ist, leitet sie die Frage an Sie weiter.",
    },
    odkaz: { sk: "/ai-agenti", cs: "/cs/ai-agenti" },
  },
  {
    nadpis: {
      sk: "Triedenie e-mailov a dopytov",
      cs: "Třídění e-mailů a poptávek",
      en: "Sorting e-mails and leads",
      hu: "E-mailek és ajánlatkérések rendezése",
      de: "E-Mails und Anfragen sortieren",
    },
    text: {
      sk: "Každá správa dostane štítok a prioritu. To dôležité nájdete hneď, zvyšok počká.",
      cs: "Každá zpráva dostane štítek a prioritu. To důležité najdete hned, zbytek počká.",
      en: "Every message gets a label and a priority. What matters is right on top, the rest can wait.",
      hu: "Minden üzenet címkét és prioritást kap. A fontosat azonnal megtalálja, a többi várhat.",
      de: "Jede Nachricht bekommt ein Label und eine Priorität. Das Wichtige finden Sie sofort, der Rest kann warten.",
    },
  },
  {
    nadpis: {
      sk: "Prepis z dokumentov",
      cs: "Přepis z dokumentů",
      en: "Data out of documents",
      hu: "Adatok kinyerése dokumentumokból",
      de: "Daten aus Dokumenten",
    },
    text: {
      sk: "Faktúry, objednávky a formuláre prepíše do tabuľky alebo účtovného systému — bez ručného opisovania.",
      cs: "Faktury, objednávky a formuláře přepíše do tabulky nebo účetního systému — bez ručního opisování.",
      en: "Invoices, orders and forms go straight into a spreadsheet or your accounting system — no retyping.",
      hu: "Számlákat, rendeléseket és űrlapokat visz át táblázatba vagy könyvelőprogramba — kézi gépelés nélkül.",
      de: "Rechnungen, Bestellungen und Formulare landen direkt in der Tabelle oder Buchhaltung — ohne Abtippen.",
    },
    odkaz: { sk: "/automatizacia-procesov", cs: "/cs/automatizace-procesu" },
  },
  {
    nadpis: {
      sk: "Rezervácie a pripomienky",
      cs: "Rezervace a připomínky",
      en: "Bookings and reminders",
      hu: "Foglalások és emlékeztetők",
      de: "Buchungen und Erinnerungen",
    },
    text: {
      sk: "Termíny sa zapíšu samy a zákazník dostane pripomienku deň vopred. Menej zabudnutých termínov.",
      cs: "Termíny se zapíšou samy a zákazník dostane připomínku den předem. Méně zapomenutých termínů.",
      en: "Appointments book themselves and customers get a reminder the day before. Fewer no-shows.",
      hu: "Az időpontok maguktól rögzülnek, az ügyfél pedig előző nap emlékeztetőt kap. Kevesebb elfelejtett időpont.",
      de: "Termine tragen sich selbst ein, Kunden bekommen am Vortag eine Erinnerung. Weniger verpasste Termine.",
    },
    odkaz: { sk: "/rezervacne-systemy", cs: "/cs/rezervacni-systemy" },
  },
  {
    nadpis: {
      sk: "Návrhy odpovedí a ponúk",
      cs: "Návrhy odpovědí a nabídek",
      en: "Draft replies and quotes",
      hu: "Válasz- és ajánlattervezetek",
      de: "Entwürfe für Antworten und Angebote",
    },
    text: {
      sk: "AI pripraví koncept, vy ho skontrolujete a odošlete. Posledné slovo má vždy človek.",
      cs: "AI připraví koncept, vy ho zkontrolujete a odešlete. Poslední slovo má vždy člověk.",
      en: "AI drafts it, you check it and hit send. A person always has the final say.",
      hu: "Az AI elkészíti a vázlatot, Ön ellenőrzi és elküldi. Az utolsó szó mindig az emberé.",
      de: "Die KI schreibt den Entwurf, Sie prüfen und senden ihn. Das letzte Wort hat immer ein Mensch.",
    },
  },
  {
    nadpis: {
      sk: "Prehľady bez Excelu",
      cs: "Přehledy bez Excelu",
      en: "Reports without Excel",
      hu: "Kimutatások Excel nélkül",
      de: "Berichte ohne Excel",
    },
    text: {
      sk: "Každý pondelok súhrn v e-maile: koľko dopytov prišlo, odkiaľ a čo ešte čaká na vybavenie.",
      cs: "Každé pondělí souhrn v e-mailu: kolik poptávek přišlo, odkud a co ještě čeká na vyřízení.",
      en: "Every Monday a summary in your inbox: how many leads came in, from where, and what is still open.",
      hu: "Minden hétfőn összefoglaló e-mailben: hány ajánlatkérés érkezett, honnan, és mi vár még elintézésre.",
      de: "Jeden Montag eine Zusammenfassung per E-Mail: wie viele Anfragen kamen, woher und was noch offen ist.",
    },
  },
];

/** Zásady — odpoveď na otázku „nebude to robiť hlúposti?". */
const ZASADY: { nadpis: Preklad; text: Preklad }[] = [
  {
    nadpis: { sk: "Na vašich podkladoch", cs: "Na vašich podkladech", en: "Built on your data", hu: "Az Ön adataira építve", de: "Auf Ihren Unterlagen" },
    text: {
      sk: "Odpovedá z toho, čo mu dáte, nie z toho, čo kedysi videl na internete.",
      cs: "Odpovídá z toho, co mu dáte, ne z toho, co kdysi viděl na internetu.",
      en: "It answers from what you give it, not from whatever it once saw online.",
      hu: "Abból válaszol, amit Ön megad neki, nem abból, amit valaha az interneten látott.",
      de: "Sie antwortet aus dem, was Sie ihr geben — nicht aus dem, was sie irgendwann im Internet gesehen hat.",
    },
  },
  {
    nadpis: { sk: "Neistú vec pošle človeku", cs: "Nejistou věc pošle člověku", en: "Unsure? It asks a human", hu: "Ha bizonytalan, emberhez fordul", de: "Im Zweifel fragt sie einen Menschen" },
    text: {
      sk: "Radšej povie „neviem“, ako by si niečo vymyslel vaším menom.",
      cs: "Raději řekne „nevím“, než aby si něco vymyslel vaším jménem.",
      en: "It would rather say “I don't know” than make something up in your name.",
      hu: "Inkább azt mondja, „nem tudom”, mint hogy kitaláljon valamit az Ön nevében.",
      de: "Lieber sagt sie „weiß ich nicht“, als sich in Ihrem Namen etwas auszudenken.",
    },
  },
  {
    nadpis: { sk: "Každý krok je zaznamenaný", cs: "Každý krok je zaznamenaný", en: "Every step is logged", hu: "Minden lépés naplózva", de: "Jeder Schritt wird protokolliert" },
    text: {
      sk: "Viete, čo urobil, kedy a prečo. Nič sa nedeje potichu.",
      cs: "Víte, co udělal, kdy a proč. Nic se neděje potichu.",
      en: "You know what it did, when and why. Nothing happens behind your back.",
      hu: "Tudja, mit csinált, mikor és miért. Semmi sem történik a háta mögött.",
      de: "Sie wissen, was sie wann und warum getan hat. Nichts passiert heimlich.",
    },
  },
  {
    nadpis: { sk: "Dá sa vypnúť za minútu", cs: "Dá se vypnout za minutu", en: "Off in a minute", hu: "Egy perc alatt kikapcsolható", de: "In einer Minute abgeschaltet" },
    text: {
      sk: "Keď sa neosvedčí, vypne sa a vrátite sa tam, kde ste boli.",
      cs: "Když se neosvědčí, vypne se a vrátíte se tam, kde jste byli.",
      en: "If it doesn't prove itself, switch it off and you're back where you started.",
      hu: "Ha nem válik be, kikapcsolja, és ott folytatja, ahol tartott.",
      de: "Wenn sie sich nicht bewährt, schalten Sie sie ab und sind wieder am Ausgangspunkt.",
    },
  },
];

export default function AiAutomatizacie() {
  const { lang } = useLanguage();
  const tok = useRef<HTMLDivElement>(null);
  /** Krok toku, ktorý práve svieti. Kým sekcia nie je na obrazovke, stojí. */
  const [aktivny, setAktivny] = useState(0);
  const [beziaci, setBeziaci] = useState(false);

  useEffect(() => {
    const el = tok.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => setBeziaci(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!beziaci) return;
    const id = window.setInterval(() => setAktivny((i) => (i + 1) % TOK.length), 1900);
    return () => window.clearInterval(id);
  }, [beziaci]);

  /* České stránky majú vlastné adresy, ostatné jazyky zatiaľ dostanú slovenské. */
  const adresa = (o: { sk: string; cs: string }) => (lang === "cs" ? o.cs : o.sk);
  const [r1, r2] = OBSAH.titul[lang].split("\n");

  return (
    <section id="ai-automatizacie" className={styles.section}>
      <div className={styles.inner}>
        <Reveal className={styles.head}>
          <div>
            <div className={styles.label}>{OBSAH.label[lang]}</div>
            <h2 className={styles.title} data-fx>
              {r1}
              <br />
              <span className={styles.titleAkcent}>{r2}</span>
            </h2>
          </div>
          <p className={styles.sub}>{OBSAH.sub[lang]}</p>
        </Reveal>

        <div className={styles.rozlozenie}>
          {/* Tok jedného dopytu — kroky sa rozsvecujú postupne. */}
          <Reveal className={styles.tok}>
            <div ref={tok}>
              <div className={styles.tokNadpis}>{OBSAH.tokNadpis[lang]}</div>
              <ol className={styles.tokZoznam}>
                {TOK.map((krok, i) => (
                  <li
                    key={i}
                    className={`${styles.tokKrok} ${i === aktivny ? styles.tokAktivny : ""} ${i < aktivny ? styles.tokHotovy : ""}`}
                  >
                    <span className={styles.tokCislo} aria-hidden>{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <span className={styles.tokKrokNadpis}>{krok.nadpis[lang]}</span>
                      <span className={styles.tokKrokText}>{krok.text[lang]}</span>
                    </span>
                  </li>
                ))}
              </ol>

              <div className={styles.zasadyNadpis}>{OBSAH.zasadyNadpis[lang]}</div>
              <ul className={styles.zasady}>
                {ZASADY.map((z) => (
                  <li key={z.nadpis.sk} className={styles.zasada}>
                    <span className={styles.zasadaNadpis}>{z.nadpis[lang]}</span>
                    <span className={styles.zasadaText}>{z.text[lang]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <div className={styles.pouzitia}>
            {POUZITIA.map((p, i) => {
              const obsah = (
                <>
                  <span className={styles.kartaCislo}>{String(i + 1).padStart(2, "0")}</span>
                  <h3 className={styles.kartaNadpis}>{p.nadpis[lang]}</h3>
                  <p className={styles.kartaText}>{p.text[lang]}</p>
                  {p.odkaz && <span className={styles.kartaOdkaz} aria-hidden>→</span>}
                </>
              );
              return (
                <Reveal
                  key={p.nadpis.sk}
                  className={styles.kartaObal}
                  style={{ transitionDelay: `${i * 70}ms` } as React.CSSProperties}
                >
                  {p.odkaz ? (
                    <Link href={adresa(p.odkaz)} className={`${styles.karta} ${styles.kartaKlik}`}>
                      {obsah}
                    </Link>
                  ) : (
                    <article className={styles.karta}>{obsah}</article>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>

        <Reveal className={styles.akcie}>
          <Link href="#kontakt" className={styles.cta} data-cursor="cta">
            {OBSAH.cta[lang]}
            <span aria-hidden className={styles.ctaSipka}>›</span>
          </Link>
          <Link href={adresa({ sk: "/ai-agenti", cs: "/cs/ai-agenti" })} className={styles.odkaz}>
            {OBSAH.viacAgenti[lang]}
          </Link>
          <Link href={adresa({ sk: "/automatizacia-procesov", cs: "/cs/automatizace-procesu" })} className={styles.odkaz}>
            {OBSAH.viacProcesy[lang]}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
