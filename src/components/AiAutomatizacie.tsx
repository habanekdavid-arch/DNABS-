"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLanguage, type Preklad } from "@/lib/i18n";
import type { Lang } from "@/lib/jazyky";
import Reveal from "./Reveal";
import styles from "./AiAutomatizacie.module.css";

/* ── AI AUTOMATIZÁCIE ─────────────────────────────────────────────────
   Reč FIG ako zvyšok webu: mono štítky v hranatých zátvorkách, dlaždice
   s tenkým rámom, blikajúce diódy a ukazovatele. Jadrom je živá ukážka —
   vľavo schéma krokov, vpravo terminál AI agenta, ktorý postupne vypíše,
   čo robí s jedným večerným dopytom.

   Žiadne vymyslené percentá ani ušetrené hodiny: tie sa dajú povedať až
   po meraní u konkrétnej firmy.
   ─────────────────────────────────────────────────────────────────── */

/** Ako dlho svieti jeden krok. Posledný drží dlhšie — je to pointa. */
const KROK_MS = 4300;
const POSLEDNY_NAVYSE_MS = 2600;
/** Po kliknutí na krok sa automatické prepínanie na chvíľu zastaví. */
const PAUZA_PO_KLIKU_MS = 15000;

const OBSAH: Record<
  | "label" | "titul" | "sub" | "terminal" | "bezi" | "hotovo" | "spracuvam" | "caka"
  | "schvalit" | "upravit" | "zasady" | "stav" | "cta" | "viacAgenti" | "viacProcesy",
  Preklad
> = {
  label: {
    sk: "[ FIG.08 — AI AUTOMATIZÁCIE ]",
    cs: "[ FIG.08 — AI AUTOMATIZACE ]",
    en: "[ FIG.08 — AI AUTOMATION ]",
    hu: "[ FIG.08 — AI AUTOMATIZÁCIÓ ]",
    de: "[ FIG.08 — KI-AUTOMATISIERUNG ]",
  },
  titul: {
    sk: "AI, ktorá robí\nprácu za vás",
    cs: "AI, která dělá\npráci za vás",
    en: "AI that does\nthe work for you",
    hu: "AI, amely elvégzi\na munkát",
    de: "KI, die Ihnen\nArbeit abnimmt",
  },
  sub: {
    sk: "Nie chatbot pre efekt. Automatizácie, ktoré každý deň zoberú opakovanú prácu — postavené na vašich podkladoch a podľa vašich pravidiel.",
    cs: "Ne chatbot pro efekt. Automatizace, které každý den převezmou opakovanou práci — postavené na vašich podkladech a podle vašich pravidel.",
    en: "Not a chatbot for show. Automations that take repetitive work off your plate every day — built on your own data and your own rules.",
    hu: "Nem látványchatbot. Olyan automatizációk, amelyek minden nap átveszik az ismétlődő munkát — az Ön adataira és szabályaira építve.",
    de: "Kein Chatbot für den Effekt. Automatisierungen, die Ihnen jeden Tag wiederkehrende Arbeit abnehmen — auf Ihren Unterlagen und nach Ihren Regeln.",
  },
  terminal: { sk: "DNABS · AI-AGENT", cs: "DNABS · AI-AGENT", en: "DNABS · AI AGENT", hu: "DNABS · AI-ÜGYNÖK", de: "DNABS · KI-AGENT" },
  bezi: { sk: "BEŽÍ", cs: "BĚŽÍ", en: "RUNNING", hu: "FUT", de: "LÄUFT" },
  hotovo: { sk: "HOTOVO", cs: "HOTOVO", en: "DONE", hu: "KÉSZ", de: "FERTIG" },
  spracuvam: { sk: "SPRACÚVAM", cs: "ZPRACOVÁVÁM", en: "WORKING", hu: "FELDOLGOZÁS", de: "IN ARBEIT" },
  caka: { sk: "ČAKÁ", cs: "ČEKÁ", en: "QUEUED", hu: "VÁR", de: "WARTET" },
  schvalit: { sk: "Schváliť a odoslať", cs: "Schválit a odeslat", en: "Approve & send", hu: "Jóváhagyás és küldés", de: "Freigeben & senden" },
  upravit: { sk: "Upraviť", cs: "Upravit", en: "Edit", hu: "Szerkesztés", de: "Bearbeiten" },
  zasady: { sk: "[ ZÁSADY ]", cs: "[ ZÁSADY ]", en: "[ PRINCIPLES ]", hu: "[ ELVEK ]", de: "[ PRINZIPIEN ]" },
  stav: { sk: "NASADITEĽNÉ", cs: "NASADITELNÉ", en: "READY", hu: "BEVETHETŐ", de: "EINSATZBEREIT" },
  cta: { sk: "Chcem AI automatizáciu →", cs: "Chci AI automatizaci →", en: "I want AI automation →", hu: "AI automatizációt kérek →", de: "KI-Automatisierung anfragen →" },
  viacAgenti: { sk: "AI agenti →", cs: "AI agenti →", en: "AI agents →", hu: "AI-ügynökök →", de: "KI-Agenten →" },
  viacProcesy: { sk: "Automatizácia procesov →", cs: "Automatizace procesů →", en: "Process automation →", hu: "Folyamat-automatizálás →", de: "Prozessautomatisierung →" },
};

/** Kroky jedného dopytu — vľavo ako schéma. */
const KROKY: { nadpis: Preklad; text: Preklad }[] = [
  {
    nadpis: { sk: "Príde e-mail", cs: "Přijde e-mail", en: "An e-mail arrives", hu: "Megérkezik egy e-mail", de: "Eine E-Mail kommt an" },
    text: {
      sk: "o 22:40, keď už nikto nepracuje",
      cs: "ve 22:40, kdy už nikdo nepracuje",
      en: "at 10:40 pm, when nobody is working",
      hu: "este 22:40-kor, amikor már senki sem dolgozik",
      de: "um 22:40 Uhr, wenn niemand mehr arbeitet",
    },
  },
  {
    nadpis: { sk: "AI ho prečíta a roztriedi", cs: "AI ho přečte a roztřídí", en: "AI reads and sorts it", hu: "Az AI elolvassa és besorolja", de: "Die KI liest und sortiert sie" },
    text: {
      sk: "dopyt, reklamácia, alebo len spam",
      cs: "poptávka, reklamace, nebo jen spam",
      en: "a lead, a complaint, or just spam",
      hu: "ajánlatkérés, reklamáció vagy csak spam",
      de: "Anfrage, Reklamation oder nur Spam",
    },
  },
  {
    nadpis: { sk: "Zapíše údaje do systému", cs: "Zapíše údaje do systému", en: "It logs the details", hu: "Rögzíti az adatokat", de: "Sie trägt die Daten ein" },
    text: {
      sk: "meno, termín, požiadavka — do tabuľky alebo CRM",
      cs: "jméno, termín, požadavek — do tabulky nebo CRM",
      en: "name, date, request — into a sheet or your CRM",
      hu: "név, időpont, igény — táblázatba vagy CRM-be",
      de: "Name, Termin, Anliegen — in die Tabelle oder ins CRM",
    },
  },
  {
    nadpis: { sk: "Vám ostane len rozhodnutie", cs: "Vám zbude jen rozhodnutí", en: "You only make the call", hu: "Önnek csak döntenie kell", de: "Ihnen bleibt nur die Entscheidung" },
    text: {
      sk: "ráno čaká návrh odpovede na schválenie",
      cs: "ráno čeká návrh odpovědi ke schválení",
      en: "a draft reply waits for your approval",
      hu: "reggel válaszjavaslat várja jóváhagyásra",
      de: "morgens wartet ein Antwortentwurf auf Freigabe",
    },
  },
];

/** Čo terminál vypíše pri jednotlivých krokoch. Jeden riadok = jeden záznam. */
const LOG: Record<Lang, string[]>[] = [
  {
    sk: ["› nová správa · 22:40", "  od: jana@kvetinarstvo.sk", "  predmet: Výzdoba na svadbu 14. júna"],
    cs: ["› nová zpráva · 22:40", "  od: jana@kvetinarstvo.sk", "  předmět: Výzdoba na svatbu 14. června"],
    en: ["› new message · 22:40", "  from: jana@kvetinarstvo.sk", "  subject: Wedding decorations for 14 June"],
    hu: ["› új üzenet · 22:40", "  feladó: jana@kvetinarstvo.sk", "  tárgy: Esküvői dekoráció június 14-re"],
    de: ["› neue Nachricht · 22:40", "  von: jana@kvetinarstvo.sk", "  Betreff: Hochzeitsdeko für den 14. Juni"],
  },
  {
    sk: ["› čítam správu…", "  kategória: DOPYT · priorita: VYSOKÁ", "  reklamácia: nie · spam: nie"],
    cs: ["› čtu zprávu…", "  kategorie: POPTÁVKA · priorita: VYSOKÁ", "  reklamace: ne · spam: ne"],
    en: ["› reading message…", "  category: LEAD · priority: HIGH", "  complaint: no · spam: no"],
    hu: ["› üzenet olvasása…", "  kategória: AJÁNLATKÉRÉS · prioritás: MAGAS", "  reklamáció: nem · spam: nem"],
    de: ["› lese Nachricht…", "  Kategorie: ANFRAGE · Priorität: HOCH", "  Reklamation: nein · Spam: nein"],
  },
  {
    sk: ["› zapisujem do CRM", "  meno: Jana K. · termín: 14. 6. · hostia: 80", "  ✓ záznam uložený"],
    cs: ["› zapisuji do CRM", "  jméno: Jana K. · termín: 14. 6. · hosté: 80", "  ✓ záznam uložen"],
    en: ["› writing to CRM", "  name: Jana K. · date: 14 June · guests: 80", "  ✓ record saved"],
    hu: ["› rögzítés a CRM-be", "  név: Jana K. · időpont: 06. 14. · vendégek: 80", "  ✓ bejegyzés mentve"],
    de: ["› schreibe ins CRM", "  Name: Jana K. · Termin: 14.06. · Gäste: 80", "  ✓ Eintrag gespeichert"],
  },
  {
    sk: ["› návrh odpovede pripravený", "  „Dobrý deň, ďakujeme za dopyt. 14. júna máme voľno…“", "  ⏸ čaká na schválenie človekom"],
    cs: ["› návrh odpovědi připraven", "  „Dobrý den, děkujeme za poptávku. 14. června máme volno…“", "  ⏸ čeká na schválení člověkem"],
    en: ["› draft reply ready", "  “Hello, thanks for your enquiry. We're free on 14 June…”", "  ⏸ awaiting human approval"],
    hu: ["› válaszjavaslat kész", "  „Jó napot, köszönjük az érdeklődést. Június 14-én szabadok vagyunk…”", "  ⏸ emberi jóváhagyásra vár"],
    de: ["› Antwortentwurf bereit", "  „Guten Tag, danke für Ihre Anfrage. Am 14. Juni haben wir Zeit…“", "  ⏸ wartet auf Freigabe durch einen Menschen"],
  },
];

type Pouzitie = { nadpis: Preklad; text: Preklad; farba: string; odkaz?: { sk: string; cs: string } };

/** Čo vie AI u malej a strednej firmy prevziať. Odkaz vedie na
 *  podrobnú vstupnú stránku, ak k téme existuje. */
const POUZITIA: Pouzitie[] = [
  {
    farba: "#6637ED",
    nadpis: { sk: "Odpovede 24/7", cs: "Odpovědi 24/7", en: "Answers 24/7", hu: "Válaszok 0–24", de: "Antworten 24/7" },
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
    farba: "#FF5A1F",
    nadpis: { sk: "Triedenie e-mailov", cs: "Třídění e-mailů", en: "E-mail sorting", hu: "E-mailek rendezése", de: "E-Mail-Sortierung" },
    text: {
      sk: "Každá správa dostane štítok a prioritu. To dôležité nájdete hneď, zvyšok počká.",
      cs: "Každá zpráva dostane štítek a prioritu. To důležité najdete hned, zbytek počká.",
      en: "Every message gets a label and a priority. What matters is right on top, the rest can wait.",
      hu: "Minden üzenet címkét és prioritást kap. A fontosat azonnal megtalálja, a többi várhat.",
      de: "Jede Nachricht bekommt ein Label und eine Priorität. Das Wichtige finden Sie sofort, der Rest kann warten.",
    },
  },
  {
    farba: "#0098B3",
    nadpis: { sk: "Prepis z dokumentov", cs: "Přepis z dokumentů", en: "Data from documents", hu: "Adatok dokumentumokból", de: "Daten aus Dokumenten" },
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
    farba: "#12A03F",
    nadpis: { sk: "Rezervácie a pripomienky", cs: "Rezervace a připomínky", en: "Bookings & reminders", hu: "Foglalás és emlékeztető", de: "Buchungen & Erinnerungen" },
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
    farba: "#FF3D8B",
    nadpis: { sk: "Návrhy odpovedí", cs: "Návrhy odpovědí", en: "Draft replies", hu: "Választervezetek", de: "Antwortentwürfe" },
    text: {
      sk: "AI pripraví koncept odpovede či ponuky, vy ho skontrolujete a odošlete. Posledné slovo má vždy človek.",
      cs: "AI připraví koncept odpovědi či nabídky, vy ho zkontrolujete a odešlete. Poslední slovo má vždy člověk.",
      en: "AI drafts the reply or quote, you check it and hit send. A person always has the final say.",
      hu: "Az AI elkészíti a válasz vagy ajánlat vázlatát, Ön ellenőrzi és elküldi. Az utolsó szó mindig az emberé.",
      de: "Die KI entwirft Antwort oder Angebot, Sie prüfen und senden. Das letzte Wort hat immer ein Mensch.",
    },
  },
  {
    farba: "#563387",
    nadpis: { sk: "Prehľady bez Excelu", cs: "Přehledy bez Excelu", en: "Reports without Excel", hu: "Kimutatás Excel nélkül", de: "Berichte ohne Excel" },
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
    nadpis: { sk: "Každý krok je zaznamenaný", cs: "Každý krok je zaznamenaný", en: "Every step is logged", hu: "Minden lépés naplózva", de: "Jeder Schritt protokolliert" },
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

const obmedzitPohyb = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Text, ktorý sa vypisuje po znakoch ako v termináli. Nový text = nový
 * kľúč komponentu, takže písanie začne odznova bez ďalšej logiky.
 */
function Pisanie({ text }: { text: string }) {
  /* Server aj prvé vykreslenie začínajú prázdne, aby sa zhodovali.
     Pri „obmedziť pohyb" sa celý text ukáže hneď v prvom kroku. */
  const [n, setN] = useState(0);

  useEffect(() => {
    if (n >= text.length) return;
    const naraz = obmedzitPohyb();
    const id = window.setTimeout(
      () => setN((x) => (naraz ? text.length : Math.min(text.length, x + 2))),
      naraz ? 0 : 22,
    );
    return () => window.clearTimeout(id);
  }, [n, text]);

  return (
    <>
      {text.slice(0, n).split("\n").map((riadok, i) => (
        <span key={i} className={styles.logRiadok}>{riadok || " "}</span>
      ))}
      <span className={styles.kurzor} aria-hidden />
    </>
  );
}

export default function AiAutomatizacie() {
  const { lang } = useLanguage();
  const demo = useRef<HTMLDivElement>(null);
  const [aktivny, setAktivny] = useState(0);
  const [viditelna, setViditelna] = useState(false);
  /* Po kliku na krok sa automatické prepínanie na chvíľu zastaví.
     Počítadlo klikov reštartuje časovač pauzy aj ukazovateľ kroku. */
  const [pozastavene, setPozastavene] = useState(false);
  const [kliky, setKliky] = useState(0);

  useEffect(() => {
    const el = demo.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setViditelna(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!pozastavene) return;
    const id = window.setTimeout(() => setPozastavene(false), PAUZA_PO_KLIKU_MS);
    return () => window.clearTimeout(id);
  }, [pozastavene, kliky]);

  /* Automatické prepínanie krokov — len kým je ukážka na obrazovke. */
  useEffect(() => {
    if (!viditelna || pozastavene || obmedzitPohyb()) return;
    const cakat = aktivny === KROKY.length - 1 ? KROK_MS + POSLEDNY_NAVYSE_MS : KROK_MS;
    const id = window.setTimeout(() => setAktivny((i) => (i + 1) % KROKY.length), cakat);
    return () => window.clearTimeout(id);
  }, [aktivny, viditelna, pozastavene]);

  const vyber = (i: number) => {
    setAktivny(i);
    setPozastavene(true);
    setKliky((k) => k + 1);
  };

  /* České stránky majú vlastné adresy, ostatné jazyky zatiaľ dostanú slovenské. */
  const adresa = (o: { sk: string; cs: string }) => (lang === "cs" ? o.cs : o.sk);
  const [r1, r2] = OBSAH.titul[lang].split("\n");
  const stavKroku = (i: number) =>
    i < aktivny ? OBSAH.hotovo[lang] : i === aktivny ? OBSAH.spracuvam[lang] : OBSAH.caka[lang];

  return (
    <section id="ai-automatizacie" className="fig-section">
      <div className="fig-inner">
        <Reveal className="fig-head">
          <div>
            <div className="fig-label">{OBSAH.label[lang]}</div>
            <h2 className="fig-title" data-fx>
              {r1}
              <br />
              <span className={styles.titulAkcent}>{r2}</span>
              <span className="fig-caret" aria-hidden />
            </h2>
          </div>
          <p className="fig-sub">{OBSAH.sub[lang]}</p>
        </Reveal>

        {/* ── Živá ukážka ─────────────────────────────────────────── */}
        <Reveal className={`fig-tile ${styles.demo}`}>
          <div ref={demo} className={styles.demoMriezka}>
            <ol className={styles.kroky}>
              {KROKY.map((krok, i) => {
                const stav = i < aktivny ? styles.krokHotovy : i === aktivny ? styles.krokAktivny : "";
                return (
                  <li key={i} className={`${styles.krok} ${stav}`}>
                    <button
                      type="button"
                      className={styles.krokTlacidlo}
                      onClick={() => vyber(i)}
                      aria-current={i === aktivny ? "step" : undefined}
                    >
                      <span className="fig-tileHead">
                        <span>
                          {String(i + 1).padStart(2, "0")}
                          <span className="fig-sep"> / </span>
                          {krok.nadpis[lang]}
                        </span>
                        <span className={`fig-stav ${styles.krokStav}`}>
                          <span className="fig-dioda" aria-hidden />
                          {stavKroku(i)}
                        </span>
                      </span>
                      <span className={styles.krokText}>{krok.text[lang]}</span>
                      <span className={`fig-track ${styles.krokTrack}`} aria-hidden>
                        {/* Kľúč reštartuje animáciu pri každom návrate na krok. */}
                        <span
                          key={`${aktivny}-${kliky}`}
                          className={styles.krokFill}
                          style={{ "--t": `${i === KROKY.length - 1 ? KROK_MS + POSLEDNY_NAVYSE_MS : KROK_MS}ms` } as React.CSSProperties}
                        />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            {/* Terminál AI agenta. Pre čítačky je to len ilustrácia. */}
            <div className={styles.terminal} aria-hidden>
              <div className={styles.terminalHlavicka}>
                <span className={styles.bodky}><i /><i /><i /></span>
                <span>{OBSAH.terminal[lang]}</span>
                <span className={styles.terminalStav}>
                  <span className={styles.terminalDioda} />
                  {OBSAH.bezi[lang]}
                </span>
              </div>
              <div className={styles.terminalTelo}>
                <div className={styles.skener} key={`sken-${aktivny}`} />
                {LOG.slice(0, aktivny).map((blok, i) => (
                  <div key={i} className={styles.logBlokHotovy}>
                    {blok[lang].map((riadok, j) => (
                      <span key={j} className={styles.logRiadok}>{riadok}</span>
                    ))}
                  </div>
                ))}
                <div className={styles.logBlok}>
                  <Pisanie key={`${aktivny}-${lang}`} text={LOG[aktivny][lang].join("\n")} />
                </div>
                {aktivny === KROKY.length - 1 && (
                  <div className={styles.schvalenie} key={`schv-${lang}`}>
                    <span className={styles.schvalit}>{OBSAH.schvalit[lang]}</span>
                    <span className={styles.upravit}>{OBSAH.upravit[lang]}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── Použitia ───────────────────────────────────────────── */}
        <div className={styles.pouzitia}>
          {POUZITIA.map((p, i) => {
            const obsah = (
              <>
                <span className="fig-tileHead">
                  <span>
                    {String(i + 1).padStart(2, "0")}
                    <span className="fig-sep"> / </span>
                    AI
                  </span>
                  <span className="fig-stav">
                    <span className="fig-dioda" aria-hidden />
                    {OBSAH.stav[lang]}
                  </span>
                </span>
                <h3 className={styles.kartaNadpis}>{p.nadpis[lang]}</h3>
                <p className={styles.kartaText}>{p.text[lang]}</p>
                <span className={styles.kartaPata}>
                  <span className="fig-track" aria-hidden>
                    <span className={styles.kartaFill} />
                  </span>
                  {p.odkaz && <span className={styles.kartaSipka} aria-hidden>→</span>}
                </span>
              </>
            );
            return (
              <Reveal
                key={p.nadpis.sk}
                className={styles.kartaObal}
                style={{ transitionDelay: `${i * 70}ms`, "--c": p.farba } as React.CSSProperties}
              >
                {p.odkaz ? (
                  <Link href={adresa(p.odkaz)} className={`fig-tile ${styles.karta}`}>
                    {obsah}
                  </Link>
                ) : (
                  <article className={`fig-tile ${styles.karta}`}>{obsah}</article>
                )}
              </Reveal>
            );
          })}
        </div>

        {/* ── Zásady a akcie ─────────────────────────────────────── */}
        <Reveal className={styles.spodok}>
          <div className={styles.zasady}>
            <div className="fig-label">{OBSAH.zasady[lang]}</div>
            <ul className={styles.zasadyZoznam}>
              {ZASADY.map((z, i) => (
                <li key={z.nadpis.sk} className={styles.zasada}>
                  <span className={styles.zasadaCislo}>{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className={styles.zasadaNadpis}>{z.nadpis[lang]}</span>
                    <span className={styles.zasadaText}>{z.text[lang]}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.akcie}>
            <Link href="#kontakt" className="fig-cta" data-cursor="cta">
              {OBSAH.cta[lang]}
            </Link>
            <Link href={adresa({ sk: "/ai-agenti", cs: "/cs/ai-agenti" })} className={styles.odkaz}>
              {OBSAH.viacAgenti[lang]}
            </Link>
            <Link href={adresa({ sk: "/automatizacia-procesov", cs: "/cs/automatizace-procesu" })} className={styles.odkaz}>
              {OBSAH.viacProcesy[lang]}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
