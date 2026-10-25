import type { Preklad } from "@/lib/jazyky";

/* ══════════════════════════════════════════════════════════════════════
   VSTUPNÉ STRÁNKY PRE SKUPINY REKLÁM

   Každá skupina reklám v Google Ads má vlastnú stránku. Dôvod: človek,
   ktorý klikol na reklamu o rezervačných systémoch, musí na stránke vidieť
   presne to, čo hľadal — nie všeobecný web o digitálnom štúdiu. Nadpis
   stránky sa preto zhoduje s textom reklamy.

   Pravidlo pre texty: žiadne čísla, ktoré nevieme doložiť, a žiadne ceny.
   Cena sa hovorí až po konzultácii, keď vieme, čo sa robí.
   ══════════════════════════════════════════════════════════════════════ */

export type Prinos = { nadpis: Preklad; text: Preklad };
export type Krok = { nadpis: Preklad; text: Preklad };
export type Otazka = { q: Preklad; a: Preklad };

/**
 * Jedna realizácia v sekcii „Na čom to vieme" — iba odkaz na slug
 * projektu v hlavicka.ts.
 *
 * Naschvál sa tu neopakuje názov ani veta: obsah má jedno miesto. Keby
 * sa texty písali aj sem, časom by sa rozišli a na vstupnej stránke by
 * o projekte stálo niečo iné než v realizáciách.
 */
export type Ukazka = { projekt: string };

/** Dlhšia pasáž textu — nadpis a pár odstavcov pod ním. */
export type Pasaz = { nadpis: Preklad; odstavce: Preklad[] };

export type VstupnaStranka = {
  slug: string;
  /** Úvodné odstavce hneď pod nadpisom. Človek z reklamy musí v prvých
   *  vetách nájsť svoj problém opísaný vlastnými slovami — až potom číta
   *  ďalej. */
  uvod?: Preklad[];
  /** Hlavný text stránky. Vykresľuje sa ako článok, v čitateľnom stĺpci. */
  pasaze?: Pasaz[];
  /** Česká adresa pod /cs/. Prekladá sa aj URL, nielen text — Čech hľadá
   *  „rezervační systémy", nie „rezervačné systémy", a adresa je jeden
   *  z mála signálov, ktoré Google vidí ešte pred otvorením stránky. */
  slugCs: string;
  /** Názov služby do schema.org a do titulku. */
  sluzbaNazov: Preklad;
  h1: Preklad;
  podnadpis: Preklad;
  prinosy: Prinos[];
  ukazky: Ukazka[];
  kroky: Krok[];
  faq: Otazka[];
  seo: { title: Preklad; description: Preklad };
};

/* Kroky a časté otázky sú pre všetky tri stránky rovnaké — proces aj
   odpovede sú rovnaké bez ohľadu na to, čo sa stavia. Keby sa niekedy
   rozišli, stačí ich prepísať priamo pri konkrétnej stránke. */
const KROKY: Krok[] = [
  {
    nadpis: { sk: "Napíšete nám", cs: "Napíšete nám", en: "You get in touch", hu: "Ír nekünk", de: "Sie schreiben uns" },
    text: {
      sk: "Stačí pár viet o tom, čo vás trápi. Ozveme sa do 24 hodín.",
      cs: "Stačí pár vět o tom, co vás trápí. Ozveme se do 24 hodin.",
      en: "A few sentences about what's bothering you is enough. We reply within 24 hours.",
      hu: "Elég néhány mondat arról, mi okoz gondot. 24 órán belül jelentkezünk.",
      de: "Ein paar Sätze darüber, was Sie stört, reichen. Wir melden uns innerhalb von 24 Stunden.",
    },
  },
  {
    nadpis: { sk: "Polhodina zadarmo", cs: "Půlhodina zdarma", en: "A free half hour", hu: "Ingyenes félóra", de: "Eine kostenlose halbe Stunde" },
    text: {
      sk: "Prejdeme si, ako to u vás funguje dnes a čo sa dá zjednodušiť. Bez záväzku a bez faktúry.",
      cs: "Projdeme si, jak to u vás funguje dnes a co se dá zjednodušit. Bez závazku a bez faktury.",
      en: "We go through how things work for you today and what can be simplified. No commitment, no invoice.",
      hu: "Átnézzük, hogyan működik ez most Önöknél, és mit lehet egyszerűsíteni. Kötelezettség és számla nélkül.",
      de: "Wir gehen durch, wie es bei Ihnen heute läuft und was sich vereinfachen lässt. Unverbindlich und ohne Rechnung.",
    },
  },
  {
    nadpis: { sk: "Návrh a cena", cs: "Návrh a cena", en: "Proposal and price", hu: "Javaslat és ár", de: "Vorschlag und Preis" },
    text: {
      sk: "Dostanete konkrétny rozsah, termín aj cenu. Až potom sa rozhodujete.",
      cs: "Dostanete konkrétní rozsah, termín i cenu. Až potom se rozhodujete.",
      en: "You get a concrete scope, timeline and price. Only then do you decide.",
      hu: "Konkrét terjedelmet, határidőt és árat kap. Csak ezután dönt.",
      de: "Sie erhalten konkreten Umfang, Termin und Preis. Erst dann entscheiden Sie.",
    },
  },
  {
    nadpis: { sk: "Spustenie", cs: "Spuštění", en: "Launch", hu: "Indítás", de: "Start" },
    text: {
      sk: "Postavíme to, ukážeme vám, ako to ovládať, a zostávame na príjme.",
      cs: "Postavíme to, ukážeme vám, jak to ovládat, a zůstáváme na příjmu.",
      en: "We build it, show you how to run it, and stay reachable.",
      hu: "Megépítjük, megmutatjuk, hogyan kezelje, és elérhetők maradunk.",
      de: "Wir bauen es, zeigen Ihnen die Bedienung und bleiben erreichbar.",
    },
  },
];

const FAQ: Otazka[] = [
  {
    q: { sk: "Koľko to stojí?", cs: "Kolik to stojí?", en: "How much does it cost?", hu: "Mennyibe kerül?", de: "Was kostet das?" },
    a: {
      sk: "Záleží na rozsahu — iné je jeden formulár a iné systém pre celú prevádzku. Cenu preto nehádžeme do vzduchu: po bezplatnej polhodine vieme, čo sa má spraviť, a dostanete konkrétnu sumu aj termín. Dovtedy vás nič nestojí.",
      cs: "Záleží na rozsahu — jiné je jeden formulář a jiné systém pro celý provoz. Cenu proto neházíme do vzduchu: po bezplatné půlhodině víme, co se má udělat, a dostanete konkrétní částku i termín. Do té doby vás nic nestojí.",
      en: "It depends on scope — a single form is one thing, a system for a whole operation another. So we don't guess at a price: after the free half hour we know what needs doing, and you get a concrete figure and timeline. Until then it costs you nothing.",
      hu: "A terjedelemtől függ — más egy űrlap és más egy egész üzemre szóló rendszer. Ezért nem tippelünk árat: az ingyenes félóra után tudjuk, mit kell csinálni, és konkrét összeget és határidőt kap. Addig semmibe nem kerül.",
      de: "Das hängt vom Umfang ab — ein einzelnes Formular ist etwas anderes als ein System für den ganzen Betrieb. Deshalb raten wir keinen Preis: Nach der kostenlosen halben Stunde wissen wir, was zu tun ist, und Sie bekommen eine konkrete Summe und einen Termin. Bis dahin kostet Sie das nichts.",
    },
  },
  {
    q: { sk: "Ako dlho to trvá?", cs: "Jak dlouho to trvá?", en: "How long does it take?", hu: "Mennyi ideig tart?", de: "Wie lange dauert das?" },
    a: {
      sk: "Menšie veci bývajú otázkou dní, väčšie systémy týždňov. Presný termín dostanete spolu s cenou — a keď sa niečo posunie, povieme vám to skôr, než sa spýtate.",
      cs: "Menší věci bývají otázkou dní, větší systémy týdnů. Přesný termín dostanete spolu s cenou — a když se něco posune, řekneme vám to dřív, než se zeptáte.",
      en: "Smaller things are usually a matter of days, bigger systems of weeks. You get the exact timeline along with the price — and if something slips, you'll hear it from us before you ask.",
      hu: "A kisebb dolgok napok, a nagyobb rendszerek hetek kérdése. A pontos határidőt az árral együtt kapja meg — és ha valami csúszik, tőlünk hallja, mielőtt kérdezné.",
      de: "Kleinere Dinge sind meist eine Frage von Tagen, größere Systeme von Wochen. Den genauen Termin bekommen Sie zusammen mit dem Preis — und wenn sich etwas verschiebt, hören Sie es von uns, bevor Sie fragen.",
    },
  },
  {
    q: { sk: "Čo si mám pripraviť na konzultáciu?", cs: "Co si mám připravit na konzultaci?", en: "What should I prepare for the consultation?", hu: "Mit készítsek elő a konzultációra?", de: "Was soll ich für das Gespräch vorbereiten?" },
    a: {
      sk: "Nič. Stačí, keď viete popísať, ako to u vás chodí dnes — kde vám to drhne a čo robíte ručne. Ostatné sa opýtame my.",
      cs: "Nic. Stačí, když umíte popsat, jak to u vás chodí dnes — kde to drhne a co děláte ručně. Ostatní se zeptáme my.",
      en: "Nothing. It's enough if you can describe how things run today — where it grinds and what you do by hand. We'll ask about the rest.",
      hu: "Semmit. Elég, ha el tudja mondani, hogyan megy ez ma — hol akad el, és mit csinál kézzel. A többit mi kérdezzük.",
      de: "Nichts. Es reicht, wenn Sie beschreiben können, wie es heute läuft — wo es hakt und was Sie von Hand machen. Den Rest fragen wir.",
    },
  },
  {
    q: { sk: "Nemám podklady ani texty. Je to problém?", cs: "Nemám podklady ani texty. Je to problém?", en: "I have no materials or copy. Is that a problem?", hu: "Nincsenek anyagaim és szövegeim. Ez gond?", de: "Ich habe keine Unterlagen oder Texte. Ist das ein Problem?" },
    a: {
      sk: "Nie. Väčšina klientov ich nemá. Texty aj štruktúru pripravíme my a vy ich len odobríte — vy viete, čo robíte, my to vieme napísať.",
      cs: "Ne. Většina klientů je nemá. Texty i strukturu připravíme my a vy je jen odsouhlasíte — vy víte, co děláte, my to umíme napsat.",
      en: "No. Most clients don't have them. We prepare the copy and structure and you just sign off — you know your work, we know how to put it into words.",
      hu: "Nem. A legtöbb ügyfélnek nincsenek. A szövegeket és a szerkezetet mi készítjük el, Ön csak jóváhagyja — Ön érti a szakmáját, mi meg tudjuk fogalmazni.",
      de: "Nein. Die meisten Kunden haben sie nicht. Texte und Struktur bereiten wir vor, Sie geben nur Ihr Okay — Sie kennen Ihre Arbeit, wir können sie formulieren.",
    },
  },
  {
    q: { sk: "Čo sa deje po odovzdaní?", cs: "Co se děje po předání?", en: "What happens after handover?", hu: "Mi történik az átadás után?", de: "Was passiert nach der Übergabe?" },
    a: {
      sk: "Ukážeme vám, ako to ovládať, a necháme vám prístupy — nie ste na nás uviazaní. Keď budete chcieť, staráme sa o prevádzku aj ďalej a pridávame, čo postupne treba.",
      cs: "Ukážeme vám, jak to ovládat, a necháme vám přístupy — nejste na nás uvázaní. Když budete chtít, staráme se o provoz i dál a přidáváme, co postupně potřebujete.",
      en: "We show you how to run it and leave you the access — you're not locked in. If you want, we keep looking after it and add what you need over time.",
      hu: "Megmutatjuk, hogyan kezelje, és Önnél hagyjuk a hozzáféréseket — nincs hozzánk kötve. Ha szeretné, tovább is üzemeltetjük, és hozzátesszük, amire idővel szükség van.",
      de: "Wir zeigen Ihnen die Bedienung und überlassen Ihnen die Zugänge — Sie sind nicht an uns gebunden. Auf Wunsch kümmern wir uns weiter um den Betrieb und ergänzen, was nach und nach nötig ist.",
    },
  },
];

/* Pri AI ľudia riešia iné obavy než pri bežnom softvéri — či to nahradí
   zamestnanca a odkiaľ to berie odpovede. Ak tieto dve otázky stránka
   nezodpovie, zodpovie si ich návštevník sám a väčšinou v náš neprospech. */
const AI_FAQ: Otazka[] = [
  {
    q: {
      sk: "Nahradí to zamestnanca?",
      cs: "Nahradí to zaměstnance?",
      en: "Will it replace an employee?",
      hu: "Kivált ez egy alkalmazottat?",
      de: "Ersetzt das einen Mitarbeiter?",
    },
    a: {
      sk: "Nie. Preberá opakovanú prácu — prepisovanie, triedenie, odpovede na tie isté otázky. Rozhodovanie, ponuky a vzťah so zákazníkom zostávajú na ľuďoch. Zmysel to dáva tam, kde na dôležitú prácu nezostáva čas.",
      cs: "Ne. Přebírá opakovanou práci — přepisování, třídění, odpovědi na tytéž dotazy. Rozhodování, nabídky a vztah se zákazníkem zůstávají na lidech. Smysl to dává tam, kde na důležitou práci nezbývá čas.",
      en: "No. It takes over the repetitive work — retyping, sorting, answering the same questions. Decisions, quotes and the customer relationship stay with people. It makes sense where there's no time left for the important work.",
      hu: "Nem. Az ismétlődő munkát veszi át — átgépelés, rendezés, ugyanazon kérdések megválaszolása. A döntés, az ajánlat és az ügyfélkapcsolat az embereknél marad. Ott van értelme, ahol a fontos munkára nem jut idő.",
      de: "Nein. Sie übernimmt die wiederkehrende Arbeit — Abtippen, Sortieren, immer gleiche Fragen beantworten. Entscheidungen, Angebote und die Kundenbeziehung bleiben bei Menschen. Sinnvoll ist das dort, wo für die wichtige Arbeit keine Zeit bleibt.",
    },
  },
  {
    q: {
      sk: "Odkiaľ berie AI odpovede? Nevymyslí si ich?",
      cs: "Odkud bere AI odpovědi? Nevymyslí si je?",
      en: "Where does the AI get its answers? Can it make things up?",
      hu: "Honnan veszi az AI a válaszokat? Nem találja ki őket?",
      de: "Woher nimmt die KI ihre Antworten? Erfindet sie etwas?",
    },
    a: {
      sk: "Z vašich podkladov — cenníka, otváracích hodín, popisov služieb, čoho si určíte. Nastavíme to tak, aby odpovedala len z nich, a keď na otázku odpoveď nemá, povie to a pošle ju vám. To je dôležitejšie než to, aby odpovedala vždy.",
      cs: "Z vašich podkladů — ceníku, otevírací doby, popisů služeb, čeho si určíte. Nastavíme to tak, aby odpovídala jen z nich, a když na dotaz odpověď nemá, řekne to a pošle ho vám. To je důležitější než to, aby odpovídala vždy.",
      en: "From your own material — price list, opening hours, service descriptions, whatever you decide. We set it up to answer only from those, and when it doesn't have an answer it says so and passes the question to you. That matters more than always having an answer.",
      hu: "Az Önök anyagaiból — árlista, nyitvatartás, szolgáltatásleírások, amit meghatároznak. Úgy állítjuk be, hogy csak ezekből válaszoljon, és ha nincs válasza, ezt megmondja, és továbbítja Önöknek a kérdést. Ez fontosabb, mint hogy mindig válaszoljon.",
      de: "Aus Ihren eigenen Unterlagen — Preisliste, Öffnungszeiten, Leistungsbeschreibungen, was Sie festlegen. Wir richten es so ein, dass nur daraus geantwortet wird, und wenn keine Antwort da ist, sagt sie das und leitet die Frage an Sie weiter. Das ist wichtiger, als immer eine Antwort zu haben.",
    },
  },
];

/* Ku každej stránke tie projekty, ktoré k nej naozaj patria — nie všetky,
   čo máme. Štyri nesúvisiace ukážky presvedčia menej než dve trefné. */
const U = (...slugy: string[]): Ukazka[] => slugy.map((projekt) => ({ projekt }));

export const VSTUPNE_STRANKY: VstupnaStranka[] = [
  {
    slug: "automatizacia-procesov",
    slugCs: "automatizace-procesu",
    sluzbaNazov: {
      sk: "Automatizácia procesov a AI agenti",
      cs: "Automatizace procesů a AI agenti",
      en: "Process automation and AI agents",
      hu: "Folyamatautomatizálás és AI-ügynökök",
      de: "Prozessautomatisierung und KI-Agenten",
    },
    h1: {
      sk: "Automatizácia procesov pre firmy, ktoré robia priveľa ručne",
      cs: "Automatizace procesů pro firmy, které dělají příliš mnoho ručně",
      en: "Process automation for companies doing too much by hand",
      hu: "Folyamatautomatizálás cégeknek, akik túl sokat csinálnak kézzel",
      de: "Prozessautomatisierung für Firmen, die zu viel von Hand machen",
    },
    podnadpis: {
      sk: "Prepíšeme ručné kroky do procesov, ktoré bežia samy — od prepisovania objednávok po odpovede na opakované otázky.",
      cs: "Přepíšeme ruční kroky do procesů, které běží samy — od přepisování objednávek po odpovědi na opakované dotazy.",
      en: "We turn manual steps into processes that run themselves — from retyping orders to answering the same questions over and over.",
      hu: "A kézi lépéseket önállóan futó folyamatokká alakítjuk — a rendelések átgépelésétől az ismétlődő kérdések megválaszolásáig.",
      de: "Wir machen aus manuellen Schritten Abläufe, die von selbst laufen — vom Abtippen von Bestellungen bis zu immer gleichen Rückfragen.",
    },
    prinosy: [
      {
        nadpis: { sk: "Menej prepisovania", cs: "Méně přepisování", en: "Less retyping", hu: "Kevesebb átgépelés", de: "Weniger Abtippen" },
        text: {
          sk: "Údaje si medzi e-mailom, tabuľkou a systémom putujú samy. Nikto ich nevkladá druhýkrát.",
          cs: "Údaje si mezi e-mailem, tabulkou a systémem putují samy. Nikdo je nevkládá podruhé.",
          en: "Data moves between e-mail, spreadsheet and system on its own. Nobody enters it twice.",
          hu: "Az adatok maguktól vándorolnak e-mail, táblázat és rendszer között. Senki nem viszi be kétszer.",
          de: "Daten wandern von selbst zwischen E-Mail, Tabelle und System. Niemand gibt sie zweimal ein.",
        },
      },
      {
        nadpis: { sk: "Menej chýb", cs: "Méně chyb", en: "Fewer mistakes", hu: "Kevesebb hiba", de: "Weniger Fehler" },
        text: {
          sk: "Čo nerobí človek ručne, to si neprehliadne ani neprepíše zle. Proces spraví vždy to isté.",
          cs: "Co nedělá člověk ručně, to nepřehlédne ani nepřepíše špatně. Proces udělá vždy totéž.",
          en: "What a person doesn't do by hand can't be overlooked or mistyped. The process does the same thing every time.",
          hu: "Amit nem ember csinál kézzel, azt nem nézi el és nem gépeli el. A folyamat mindig ugyanazt teszi.",
          de: "Was kein Mensch von Hand macht, wird weder übersehen noch vertippt. Der Ablauf macht jedes Mal dasselbe.",
        },
      },
      {
        nadpis: { sk: "Rýchlejšie vybavenie", cs: "Rychlejší vyřízení", en: "Faster turnaround", hu: "Gyorsabb ügyintézés", de: "Schnellere Abwicklung" },
        text: {
          sk: "Zákazník dostane odpoveď aj potvrdenie hneď, nie až keď sa k tomu niekto dostane.",
          cs: "Zákazník dostane odpověď i potvrzení hned, ne až když se k tomu někdo dostane.",
          en: "The customer gets an answer and a confirmation right away, not when someone finally gets to it.",
          hu: "Az ügyfél azonnal kap választ és visszaigazolást, nem akkor, amikor valaki végre hozzájut.",
          de: "Der Kunde bekommt Antwort und Bestätigung sofort, nicht erst wenn jemand dazu kommt.",
        },
      },
      {
        nadpis: { sk: "Nič sa neprepisuje dvakrát", cs: "Nic se nepřepisuje dvakrát", en: "Nothing is typed twice", hu: "Semmit nem kell kétszer begépelni", de: "Nichts wird zweimal eingetippt" },
        text: { sk: "Údaje si medzi formulárom, tabuľkou a systémom putujú samy. Odpadá najčastejší zdroj preklepov.", cs: "Údaje si mezi formulářem, tabulkou a systémem putují samy. Odpadá nejčastější zdroj překlepů.", en: "Data moves between form, spreadsheet and system by itself. The most common source of typos disappears.", hu: "Az adatok maguktól vándorolnak űrlap, táblázat és rendszer között. Megszűnik az elgépelések leggyakoribb forrása.", de: "Daten wandern von selbst zwischen Formular, Tabelle und System. Die häufigste Quelle für Tippfehler entfällt." },
      },
      {
        nadpis: { sk: "Na nič sa nezabudne", cs: "Na nic se nezapomene", en: "Nothing gets forgotten", hu: "Semmi nem marad el", de: "Nichts wird vergessen" },
        text: { sk: "Pripomienky a kontroly bežia samy. Zistíte, že objednávka visí bez odpovede, skôr než to zistí zákazník.", cs: "Připomínky a kontroly běží samy. Zjistíte, že objednávka visí bez odpovědi, dřív než to zjistí zákazník.", en: "Reminders and checks run on their own. You find out an order is sitting unanswered before the customer does.", hu: "Az emlékeztetők és ellenőrzések maguktól futnak. Előbb veszi észre, hogy egy rendelés válasz nélkül áll, mint az ügyfél.", de: "Erinnerungen und Prüfungen laufen von selbst. Sie merken, dass eine Bestellung unbeantwortet liegt, bevor es der Kunde merkt." },
      },
      {
        nadpis: { sk: "Zvládne to aj zástup", cs: "Zvládne to i zástup", en: "A stand-in can run it", hu: "A helyettes is elboldogul vele", de: "Auch die Vertretung kommt klar" },
        text: { sk: "Keď proces beží podľa pravidiel, nie podľa toho, kto má službu, nerozpadne sa počas dovolenky ani pri zaučovaní.", cs: "Když proces běží podle pravidel, ne podle toho, kdo má službu, nerozpadne se během dovolené ani při zaučování.", en: "When a process runs by rules rather than by who is on shift, it does not fall apart over a holiday or during training.", hu: "Ha a folyamat szabályok szerint fut, nem aszerint, ki van szolgálatban, nem esik szét szabadság alatt vagy betanításkor.", de: "Läuft ein Ablauf nach Regeln statt danach, wer gerade Dienst hat, bricht er weder im Urlaub noch beim Einarbeiten zusammen." },
      },
    ],
    uvod: [
      { sk: "Každá firma má zoznam vecí, ktoré sa robia ručne, lebo sa to tak kedysi začalo a nikto to odvtedy nespochybnil. Prepísať objednávku z e-mailu do tabuľky. Skontrolovať, či klient zaplatil. Poslať tú istú správu desiatemu zákazníkovi v tom týždni. Samostatne je každá z nich otázka dvoch minút.", cs: "Každá firma má seznam věcí, které se dělají ručně, protože to tak kdysi začalo a nikdo to od té doby nezpochybnil. Přepsat objednávku z e-mailu do tabulky. Zkontrolovat, jestli klient zaplatil. Poslat tutéž zprávu desátému zákazníkovi v tom týdnu. Samostatně je každá z nich otázka dvou minut.", en: "Every company has a list of things done by hand because that is how it started and nobody has questioned it since. Copying an order from an e-mail into a spreadsheet. Checking whether a client has paid. Sending the same message to the tenth customer that week. On its own, each one takes two minutes.", hu: "Minden cégnek van egy listája azokról a dolgokról, amelyeket kézzel csinálnak, mert valamikor így kezdődött, és azóta senki nem kérdőjelezte meg. Rendelés átmásolása e-mailből táblázatba. Ellenőrizni, fizetett-e az ügyfél. Elküldeni ugyanazt az üzenetet a hét tizedik vásárlójának. Külön-külön mindegyik két perc.", de: "Jede Firma hat eine Liste von Dingen, die von Hand erledigt werden, weil es irgendwann so angefangen hat und seitdem niemand gefragt hat. Eine Bestellung aus der E-Mail in die Tabelle übertragen. Prüfen, ob ein Kunde bezahlt hat. Dieselbe Nachricht an den zehnten Kunden dieser Woche schicken. Einzeln ist jede davon eine Sache von zwei Minuten." },
      { sk: "Spolu je to ale hodina denne, ktorú nikto nefakturuje, a ktorá sa robí popri inej práci — teda presne v stave, v ktorom sa robia chyby. Nejde o to, že sú ľudia pomalí. Ide o to, že robia prácu, ktorú nemá robiť človek.", cs: "Dohromady je to ale hodina denně, kterou nikdo nefakturuje, a která se dělá vedle jiné práce — tedy přesně ve stavu, ve kterém se dělají chyby. Nejde o to, že jsou lidé pomalí. Jde o to, že dělají práci, kterou nemá dělat člověk.", en: "Together, though, it is an hour a day that nobody invoices, done alongside other work — in exactly the state in which mistakes happen. It is not that people are slow. It is that they are doing work a person should not be doing.", hu: "Együtt viszont ez napi egy óra, amit senki nem számláz ki, és amit más munka mellett végeznek — pontosan abban az állapotban, amikor hibák születnek. Nem arról van szó, hogy az emberek lassúak. Arról, hogy olyan munkát végeznek, amit nem embernek kellene.", de: "Zusammen ist es aber eine Stunde täglich, die niemand abrechnet, und die nebenher erledigt wird — also genau in dem Zustand, in dem Fehler passieren. Es liegt nicht daran, dass Menschen langsam sind. Es liegt daran, dass sie Arbeit machen, die kein Mensch machen sollte." },
      { sk: "Nižšie je, ako sa taká práca hľadá, čo sa dá previesť na automatický proces a čo radšej nie, a ako to prebieha u nás. Ak vám to bude znieť povedome, prvá polhodina je zadarmo a nezáväzne.", cs: "Níže je, jak se taková práce hledá, co se dá převést na automatický proces a co raději ne, a jak to probíhá u nás. Pokud vám to bude znít povědomě, první půlhodina je zdarma a nezávazně.", en: "Below is how that kind of work is found, what can be turned into an automatic process and what is better left alone, and how we go about it. If it sounds familiar, the first half hour is free and without commitment.", hu: "Alább leírjuk, hogyan keressük meg az ilyen munkát, mi alakítható automatikus folyamattá és mi inkább ne, és hogyan zajlik ez nálunk. Ha ismerősen hangzik, az első félóra ingyenes és kötelezettség nélküli.", de: "Unten steht, wie man solche Arbeit findet, was sich in einen automatischen Ablauf überführen lässt und was besser nicht, und wie wir dabei vorgehen. Wenn Ihnen das bekannt vorkommt: Die erste halbe Stunde ist kostenlos und unverbindlich." },
    ],
    pasaze: [
      {
        nadpis: { sk: "Ako sa hľadá, čo automatizovať", cs: "Jak se hledá, co automatizovat", en: "How to find what to automate", hu: "Hogyan találjuk meg, mit automatizáljunk", de: "Wie man findet, was zu automatisieren ist" },
        odstavce: [
          { sk: "Nie podľa toho, čo je technicky zaujímavé, ale podľa toho, čo vás najviac zdržuje. Obvykle stačí jedna otázka: ktorú vec robíte každý deň a pri ktorej si hovoríte, že toto by mal robiť stroj? Odpoveď poznáte vy, nie my — preto sa na konzultácii pýtame hlavne my.", cs: "Ne podle toho, co je technicky zajímavé, ale podle toho, co vás nejvíc zdržuje. Obvykle stačí jedna otázka: kterou věc děláte každý den a u které si říkáte, že tohle by měl dělat stroj? Odpověď znáte vy, ne my — proto se na konzultaci ptáme hlavně my.", en: "Not by what is technically interesting, but by what slows you down most. Usually one question is enough: which thing do you do every day while thinking a machine should be doing it? You know the answer, we do not — which is why on the consultation we mostly ask.", hu: "Nem az alapján, ami technikailag érdekes, hanem az alapján, ami a legjobban hátráltatja. Általában egy kérdés elég: melyik az a dolog, amit minden nap csinál, és közben arra gondol, hogy ezt gépnek kellene? A választ Ön tudja, nem mi — ezért a konzultáción főleg mi kérdezünk.", de: "Nicht danach, was technisch interessant ist, sondern danach, was Sie am meisten aufhält. Meist reicht eine Frage: Welche Sache machen Sie jeden Tag und denken dabei, das sollte eine Maschine erledigen? Die Antwort kennen Sie, nicht wir — deshalb fragen im Gespräch vor allem wir." },
          { sk: "Dobrý kandidát má tri znaky: deje sa často, prebieha vždy rovnako a dá sa popísať vetami typu keď príde toto, sprav tamto. Zlý kandidát je práca, pri ktorej sa zakaždým rozhodujete inak — tam by automat len rýchlejšie robil nesprávne veci.", cs: "Dobrý kandidát má tři znaky: děje se často, probíhá vždy stejně a dá se popsat větami typu když přijde tohle, udělej tamto. Špatný kandidát je práce, u které se pokaždé rozhodujete jinak — tam by automat jen rychleji dělal nesprávné věci.", en: "A good candidate has three signs: it happens often, it runs the same way every time, and it can be described as when this arrives, do that. A bad candidate is work where you decide differently each time — there an automation would just do the wrong things faster.", hu: "A jó jelöltnek három jele van: gyakran történik, mindig ugyanúgy zajlik, és leírható olyan mondatokkal, hogy ha ez érkezik, csináld azt. Rossz jelölt az a munka, amelynél minden alkalommal másképp dönt — ott az automatizmus csak gyorsabban csinálná a rossz dolgokat.", de: "Ein guter Kandidat hat drei Merkmale: Er passiert häufig, läuft immer gleich ab und lässt sich beschreiben als wenn das kommt, tu jenes. Ein schlechter Kandidat ist Arbeit, bei der Sie jedes Mal anders entscheiden — dort würde eine Automatik nur schneller das Falsche tun." },
        ],
      },
      {
        nadpis: { sk: "Čo sa dá previesť na proces", cs: "Co se dá převést na proces", en: "What can become a process", hu: "Mi alakítható folyamattá", de: "Was sich in einen Ablauf überführen lässt" },
        odstavce: [
          { sk: "Presúvanie údajov medzi miestami, kde ich máte. Z formulára do tabuľky, z e-mailu do systému, z objednávky do faktúry. Toto je najčastejší prípad a zvyčajne aj najrýchlejší na nasadenie — žiadne údaje sa nikam neprepisujú druhýkrát.", cs: "Přesouvání údajů mezi místy, kde je máte. Z formuláře do tabulky, z e-mailu do systému, z objednávky do faktury. Tohle je nejčastější případ a obvykle i nejrychlejší na nasazení — žádné údaje se nikam nepřepisují podruhé.", en: "Moving data between the places where you keep it. From a form into a spreadsheet, from an e-mail into a system, from an order into an invoice. This is the most common case and usually the quickest to set up — no data gets typed in twice.", hu: "Adatok mozgatása azok közt a helyek közt, ahol tartja őket. Űrlapból táblázatba, e-mailből rendszerbe, rendelésből számlába. Ez a leggyakoribb eset, és általában a leggyorsabban bevezethető — semmit nem kell kétszer begépelni.", de: "Daten zwischen den Orten bewegen, an denen Sie sie haben. Vom Formular in die Tabelle, aus der E-Mail ins System, von der Bestellung in die Rechnung. Das ist der häufigste Fall und meist auch am schnellsten umgesetzt — nichts wird ein zweites Mal eingetippt." },
          { sk: "Potom sú to pripomienky a potvrdenia, ktoré sa posielajú vždy a vždy rovnako. A kontroly, na ktoré si človek spomenie, až keď je neskoro — napríklad že objednávka visí tretí deň bez odpovede. Tu je prínosom hlavne to, že sa na nič nezabudne, nie to, že sa niečo zrýchli.", cs: "Potom jsou to připomínky a potvrzení, která se posílají vždy a vždy stejně. A kontroly, na které si člověk vzpomene, až když je pozdě — třeba že objednávka visí třetí den bez odpovědi. Tady je přínosem hlavně to, že se na nic nezapomene, ne to, že se něco zrychlí.", en: "Then reminders and confirmations that always go out, always the same. And the checks you remember only when it is too late — an order sitting unanswered for a third day, say. Here the gain is mostly that nothing gets forgotten, not that anything gets faster.", hu: "Aztán az emlékeztetők és visszaigazolások, amelyek mindig és mindig ugyanúgy mennek ki. És az ellenőrzések, amelyek csak akkor jutnak eszébe, amikor már késő — például hogy egy rendelés harmadik napja válasz nélkül áll. Itt a haszon főleg az, hogy semmi nem marad el, nem az, hogy bármi gyorsabb lesz.", de: "Dann Erinnerungen und Bestätigungen, die immer und immer gleich rausgehen. Und Prüfungen, an die man erst denkt, wenn es zu spät ist — etwa dass eine Bestellung seit drei Tagen unbeantwortet liegt. Der Gewinn liegt hier vor allem darin, dass nichts vergessen wird, nicht darin, dass etwas schneller wird." },
        ],
      },
      {
        nadpis: { sk: "Čo automatizovať neodporúčame", cs: "Co automatizovat nedoporučujeme", en: "What we do not recommend automating", hu: "Mit nem javaslunk automatizálni", de: "Wovon wir bei der Automatisierung abraten" },
        odstavce: [
          { sk: "Všetko, kde sa rozhoduje podľa citu alebo podľa vzťahu so zákazníkom. Ceny na mieru, riešenie reklamácií, komunikáciu, ktorá môže ísť zle. Automat tam síce ušetrí minúty, ale raz za čas spôsobí problém, ktorého náprava stojí oveľa viac.", cs: "Všechno, kde se rozhoduje podle citu nebo podle vztahu se zákazníkem. Ceny na míru, řešení reklamací, komunikaci, která může jít špatně. Automat tam sice ušetří minuty, ale jednou za čas způsobí problém, jehož náprava stojí mnohem víc.", en: "Anything decided by feel or by the relationship with a customer. Custom pricing, handling complaints, communication that can go wrong. An automation saves minutes there, but every so often causes a problem whose repair costs far more.", hu: "Mindazt, ahol érzés vagy az ügyfélkapcsolat alapján dönt. Egyedi árak, reklamációk kezelése, olyan kommunikáció, amely rosszul is elsülhet. Az automatizmus percet spórol, de időnként olyan problémát okoz, amelynek helyrehozása sokkal többe kerül.", de: "Alles, wo nach Gefühl oder nach der Kundenbeziehung entschieden wird. Individuelle Preise, Reklamationen, Kommunikation, die schiefgehen kann. Eine Automatik spart dort Minuten, verursacht aber ab und zu ein Problem, dessen Behebung weit mehr kostet." },
          { sk: "A tiež procesy, ktoré sa práve menia. Keď niečo prerábate, nemá zmysel to zatiaľ zabetónovať do automatu — len by ste zaplatili dvakrát. Povieme vám to rovno, keď to na konzultácii vyjde najavo.", cs: "A také procesy, které se právě mění. Když něco předěláváte, nemá smysl to zatím zabetonovat do automatu — jen byste zaplatili dvakrát. Řekneme vám to rovnou, když to na konzultaci vyjde najevo.", en: "Also processes that are currently changing. If you are reworking something, there is no point setting it in stone yet — you would just pay twice. We will say so directly if it comes up on the consultation.", hu: "És azok a folyamatok is, amelyek éppen változnak. Ha valamit átalakít, nincs értelme most betonba önteni — csak kétszer fizetne. Ezt rögtön megmondjuk, ha a konzultáción kiderül.", de: "Ebenso Abläufe, die sich gerade ändern. Wenn Sie etwas umbauen, lohnt es nicht, es jetzt festzuzurren — Sie würden doppelt zahlen. Wir sagen das direkt, wenn es im Gespräch herauskommt." },
        ],
      },
    ],
    ukazky: U("vytlacto-3d", "nicepoke"),
    kroky: KROKY,
    faq: FAQ,
    seo: {
      title: {
        sk: "Automatizácia procesov a AI agenti pre firmy",
        cs: "Automatizace procesů a AI agenti pro firmy",
        en: "Process automation and AI agents for businesses",
        hu: "Folyamatautomatizálás és AI-ügynökök cégeknek",
        de: "Prozessautomatisierung und KI-Agenten für Unternehmen",
      },
      description: {
        sk: "Prepíšeme ručné kroky do procesov, ktoré bežia samy. Bezplatná 30-minútová konzultácia, cena a termín až po nej.",
        cs: "Přepíšeme ruční kroky do procesů, které běží samy. Bezplatná 30minutová konzultace, cena a termín až po ní.",
        en: "We turn manual steps into processes that run themselves. Free 30-minute consultation; price and timeline come after it.",
        hu: "A kézi lépéseket önállóan futó folyamatokká alakítjuk. Ingyenes 30 perces konzultáció, az ár és a határidő utána jön.",
        de: "Wir machen aus manuellen Schritten Abläufe, die von selbst laufen. Kostenlose 30-Minuten-Beratung, Preis und Termin danach.",
      },
    },
  },
  {
    slug: "ai-agenti",
    slugCs: "ai-agenti",
    sluzbaNazov: {
      sk: "AI agenti a AI riešenia pre firmy",
      cs: "AI agenti a AI řešení pro firmy",
      en: "AI agents and AI solutions for business",
      hu: "AI-ügynökök és AI-megoldások cégeknek",
      de: "KI-Agenten und KI-Lösungen für Unternehmen",
    },
    h1: {
      sk: "AI agenti, ktorí preberú prácu, čo sa opakuje každý deň",
      cs: "AI agenti, kteří převezmou práci, co se opakuje každý den",
      en: "AI agents that take over the work you repeat every day",
      hu: "AI-ügynökök, amelyek átveszik a naponta ismétlődő munkát",
      de: "KI-Agenten, die die täglich wiederkehrende Arbeit übernehmen",
    },
    podnadpis: {
      sk: "Odpovedajú na otázky zákazníkov, triedia dopyty a pripravujú podklady — z vašich údajov a podľa vašich pravidiel.",
      cs: "Odpovídají na dotazy zákazníků, třídí poptávky a připravují podklady — z vašich údajů a podle vašich pravidel.",
      en: "They answer customer questions, sort enquiries and prepare materials — from your data and by your rules.",
      hu: "Megválaszolják az ügyfélkérdéseket, rendezik a megkereséseket és előkészítik az anyagokat — az Önök adataiból és szabályai szerint.",
      de: "Sie beantworten Kundenfragen, sortieren Anfragen und bereiten Unterlagen vor — aus Ihren Daten und nach Ihren Regeln.",
    },
    prinosy: [
      {
        nadpis: { sk: "Odpovedá aj v noci", cs: "Odpovídá i v noci", en: "Answers at night too", hu: "Éjszaka is válaszol", de: "Antwortet auch nachts" },
        text: {
          sk: "Zákazník sa pýta večer a odpoveď dostane večer. Vy si ju ráno len prejdete.",
          cs: "Zákazník se ptá večer a odpověď dostane večer. Vy si ji ráno jen projdete.",
          en: "A customer asks in the evening and gets an answer in the evening. You just review it in the morning.",
          hu: "Az ügyfél este kérdez, és este kap választ. Ön reggel csak átnézi.",
          de: "Ein Kunde fragt abends und bekommt abends eine Antwort. Sie sehen sie morgens nur durch.",
        },
      },
      {
        nadpis: { sk: "Odpovedá z vašich údajov", cs: "Odpovídá z vašich údajů", en: "Answers from your own data", hu: "Az Önök adataiból válaszol", de: "Antwortet aus Ihren Daten" },
        text: {
          sk: "Pozná váš cenník, služby aj hodiny. Keď odpoveď nemá, povie to a pošle otázku vám.",
          cs: "Zná váš ceník, služby i hodiny. Když odpověď nemá, řekne to a pošle dotaz vám.",
          en: "It knows your prices, services and hours. When it has no answer, it says so and passes the question to you.",
          hu: "Ismeri az árlistát, a szolgáltatásokat és a nyitvatartást. Ha nincs válasza, szól, és továbbítja a kérdést.",
          de: "Sie kennt Ihre Preise, Leistungen und Zeiten. Hat sie keine Antwort, sagt sie das und leitet die Frage weiter.",
        },
      },
      {
        nadpis: { sk: "Dopyty prichádzajú roztriedené", cs: "Poptávky přicházejí roztříděné", en: "Enquiries arrive sorted", hu: "A megkeresések rendezve érkeznek", de: "Anfragen kommen sortiert an" },
        text: {
          sk: "Čo je naozaj vaše, dostanete oddelené od zvyšku. Nečítate všetko, len to podstatné.",
          cs: "Co je doopravdy vaše, dostanete oddělené od zbytku. Nečtete všechno, jen to podstatné.",
          en: "What's genuinely for you arrives separated from the rest. You don't read everything, just what matters.",
          hu: "Ami valóban Önöké, azt a többitől elkülönítve kapja. Nem mindent olvas, csak a lényeget.",
          de: "Was wirklich für Sie ist, kommt getrennt vom Rest. Sie lesen nicht alles, nur das Wesentliche.",
        },
      },
      {
        nadpis: { sk: "Povie, keď nevie", cs: "Řekne, když neví", en: "It says when it does not know", hu: "Megmondja, ha nem tudja", de: "Er sagt, wenn er es nicht weiß" },
        text: { sk: "Neistú otázku pošle vám namiesto toho, aby si vymyslel odpoveď. Toto nastavenie je dôležitejšie než všetko ostatné.", cs: "Nejistý dotaz pošle vám místo toho, aby si vymyslel odpověď. Tohle nastavení je důležitější než všechno ostatní.", en: "An uncertain question goes to you instead of getting an invented answer. This setting matters more than anything else.", hu: "A bizonytalan kérdést Önnek továbbítja ahelyett, hogy kitalálna rá választ. Ez a beállítás mindennél fontosabb.", de: "Eine unsichere Frage geht an Sie, statt erfunden beantwortet zu werden. Diese Einstellung ist wichtiger als alles andere." },
      },
      {
        nadpis: { sk: "Zvládne aj nápor", cs: "Zvládne i nápor", en: "It handles a rush", hu: "Bírja a rohamot", de: "Er hält Ansturm aus" },
        text: { sk: "Desať otázok naraz vybaví rovnako ako jednu. Nerastú mu fronty a nepotrebuje sa nikam ponáhľať.", cs: "Deset dotazů naráz vyřídí stejně jako jeden. Nerostou mu fronty a nepotřebuje nikam spěchat.", en: "Ten questions at once go the same as one. No queue builds up and nothing has to be rushed.", hu: "Tíz kérdést egyszerre ugyanúgy kezel, mint egyet. Nem áll sor, és nem kell sietnie.", de: "Zehn Fragen gleichzeitig erledigt er wie eine. Es bildet sich keine Warteschlange und nichts muss gehetzt werden." },
      },
      {
        nadpis: { sk: "Dá sa vypnúť", cs: "Dá se vypnout", en: "It can be switched off", hu: "Kikapcsolható", de: "Er lässt sich abschalten" },
        text: { sk: "Keď sa neosvedčí, vypne sa za minútu a vraciate sa tam, kde ste boli. Nie je to zásah, z ktorého niet cesty späť.", cs: "Když se neosvědčí, vypne se za minutu a vracíte se tam, kde jste byli. Není to zásah, ze kterého není cesty zpět.", en: "If it does not prove itself, it is off in a minute and you are back where you were. It is not a one-way change.", hu: "Ha nem válik be, egy perc alatt kikapcsolható, és ott folytatja, ahol abbahagyta. Ez nem visszafordíthatatlan lépés.", de: "Bewährt er sich nicht, ist er in einer Minute aus und Sie sind da, wo Sie vorher waren. Es ist kein Schritt ohne Rückweg." },
      },
    ],
    uvod: [
      { sk: "Okolo AI je dnes toľko hluku, že sa ťažko rozlišuje, čo je naozaj použiteľné a čo je len dobre natočené video. Skúsme to teda bez prísľubov: AI agent je program, ktorý vie čítať text, rozumieť otázke a odpovedať podľa pravidiel, ktoré mu dáte. Nič viac a nič menej.", cs: "Kolem AI je dnes tolik hluku, že se těžko rozlišuje, co je opravdu použitelné a co je jen dobře natočené video. Zkusme to tedy bez slibů: AI agent je program, který umí číst text, rozumět otázce a odpovídat podle pravidel, která mu dáte. Nic víc a nic míň.", en: "There is so much noise around AI that it is hard to tell what is actually usable from what is just a well-shot video. So, without promises: an AI agent is a program that reads text, understands a question and answers according to rules you give it. No more and no less.", hu: "Az AI körül ma akkora a zaj, hogy nehéz megkülönböztetni, mi használható valóban, és mi csak egy jól megvágott videó. Próbáljuk hát ígéretek nélkül: az AI-ügynök egy program, amely szöveget olvas, megérti a kérdést, és az Ön által megadott szabályok szerint válaszol. Se több, se kevesebb.", de: "Rund um KI ist so viel Lärm, dass sich kaum unterscheiden lässt, was wirklich brauchbar ist und was nur ein gut gedrehtes Video. Also ohne Versprechen: Ein KI-Agent ist ein Programm, das Text liest, eine Frage versteht und nach Ihren Regeln antwortet. Nicht mehr und nicht weniger." },
      { sk: "To, či vám to pomôže, nezávisí od technológie. Závisí od toho, či máte prácu, ktorá sa opakuje a dá sa popísať pravidlami. Odpovedanie na tie isté otázky, triedenie dopytov, vypisovanie údajov z e-mailov. Keď takú prácu máte, agent ju vie prevziať. Keď nie, nepomôže ani najlepší model.", cs: "To, jestli vám to pomůže, nezávisí na technologii. Závisí na tom, jestli máte práci, která se opakuje a dá se popsat pravidly. Odpovídání na tytéž dotazy, třídění poptávek, vypisování údajů z e-mailů. Když takovou práci máte, agent ji umí převzít. Když ne, nepomůže ani nejlepší model.", en: "Whether it helps you does not depend on the technology. It depends on whether you have work that repeats and can be described by rules. Answering the same questions, sorting enquiries, pulling details out of e-mails. If you have that work, an agent can take it over. If not, not even the best model will help.", hu: "Hogy segít-e Önnek, nem a technológián múlik. Azon múlik, van-e olyan munkája, amely ismétlődik és szabályokkal leírható. Ugyanazon kérdések megválaszolása, megkeresések rendezése, adatok kiszedése e-mailekből. Ha van ilyen munkája, az ügynök átveheti. Ha nincs, a legjobb modell sem segít.", de: "Ob es Ihnen hilft, hängt nicht von der Technik ab. Es hängt davon ab, ob Sie Arbeit haben, die sich wiederholt und sich in Regeln fassen lässt. Dieselben Fragen beantworten, Anfragen sortieren, Angaben aus E-Mails herausschreiben. Haben Sie diese Arbeit, kann ein Agent sie übernehmen. Wenn nicht, hilft auch das beste Modell nicht." },
      { sk: "Nižšie je, čo taký agent reálne robí, odkiaľ berie odpovede, kde sú jeho hranice a čo sa stane, keď si nie je istý. Ak vám to bude dávať zmysel, prvá polhodina je zadarmo a nezáväzne.", cs: "Níže je, co takový agent reálně dělá, odkud bere odpovědi, kde jsou jeho hranice a co se stane, když si není jistý. Pokud vám to bude dávat smysl, první půlhodina je zdarma a nezávazně.", en: "Below is what such an agent actually does, where its answers come from, where its limits are and what happens when it is not sure. If it makes sense to you, the first half hour is free and without commitment.", hu: "Alább olvasható, mit csinál valójában egy ilyen ügynök, honnan veszi a válaszokat, hol vannak a korlátai, és mi történik, ha bizonytalan. Ha mindez értelmesnek tűnik, az első félóra ingyenes és kötelezettség nélküli.", de: "Unten steht, was so ein Agent wirklich tut, woher seine Antworten kommen, wo seine Grenzen liegen und was passiert, wenn er unsicher ist. Wenn das für Sie Sinn ergibt: Die erste halbe Stunde ist kostenlos und unverbindlich." },
    ],
    pasaze: [
      {
        nadpis: { sk: "Čo agent reálne robí", cs: "Co agent reálně dělá", en: "What an agent actually does", hu: "Mit csinál valójában egy ügynök", de: "Was ein Agent wirklich tut" },
        odstavce: [
          { sk: "Najčastejšie tri veci. Odpovedá na otázky zákazníkov z vašich podkladov — otváracie hodiny, ceny, čo presne ponúkate, ako prebieha objednávka. Triedi, čo príde, aby ste nečítali všetko, ale len to, čo je naozaj vaše. A vypisuje údaje z textu do systému: z e-mailu vytiahne meno, termín a požiadavku a uloží ich tam, kde ich hľadáte.", cs: "Nejčastěji tři věci. Odpovídá na dotazy zákazníků z vašich podkladů — otevírací doba, ceny, co přesně nabízíte, jak probíhá objednávka. Třídí, co přijde, abyste nečetli všechno, ale jen to, co je opravdu vaše. A vypisuje údaje z textu do systému: z e-mailu vytáhne jméno, termín a požadavek a uloží je tam, kde je hledáte.", en: "Usually three things. It answers customer questions from your own material — opening hours, prices, what exactly you offer, how ordering works. It sorts what comes in, so you do not read everything, only what is genuinely yours. And it writes details from text into a system: it pulls a name, a date and a request out of an e-mail and files them where you look for them.", hu: "Leggyakrabban három dolgot. Megválaszolja az ügyfélkérdéseket az Önök anyagaiból — nyitvatartás, árak, mit kínálnak pontosan, hogyan zajlik a rendelés. Rendezi a beérkezőt, hogy ne mindent olvasson, csak azt, ami valóban Öné. És adatokat ír ki szövegből a rendszerbe: az e-mailből kiszedi a nevet, az időpontot és a kérést, és oda menti, ahol keresi.", de: "Meist drei Dinge. Er beantwortet Kundenfragen aus Ihren Unterlagen — Öffnungszeiten, Preise, was genau Sie anbieten, wie eine Bestellung abläuft. Er sortiert, was hereinkommt, damit Sie nicht alles lesen, sondern nur das, was wirklich Ihres ist. Und er überträgt Angaben aus Text ins System: Aus einer E-Mail zieht er Name, Termin und Anliegen und legt sie dort ab, wo Sie sie suchen." },
          { sk: "Čo nerobí: nerozhoduje za vás, neposiela ponuky bez schválenia a nevyjednáva ceny. To nie je technické obmedzenie, ale rozhodnutie. Chyba v odpovedi na otázku sa opraví vetou. Chyba v odoslanej ponuke sa opravuje horšie.", cs: "Co nedělá: nerozhoduje za vás, neposílá nabídky bez schválení a nevyjednává ceny. To není technické omezení, ale rozhodnutí. Chyba v odpovědi na dotaz se opraví větou. Chyba v odeslané nabídce se opravuje hůř.", en: "What it does not do: decide for you, send quotes without approval, or negotiate prices. That is not a technical limit, it is a decision. A mistake in an answer is fixed with a sentence. A mistake in a quote you already sent is harder to fix.", hu: "Amit nem csinál: nem dönt Ön helyett, nem küld ajánlatot jóváhagyás nélkül, és nem alkudozik árakról. Ez nem technikai korlát, hanem döntés. Egy válaszban lévő hiba egy mondattal javítható. Egy elküldött ajánlatban lévő hiba sokkal nehezebben.", de: "Was er nicht tut: für Sie entscheiden, Angebote ohne Freigabe verschicken oder Preise verhandeln. Das ist keine technische Grenze, sondern eine Entscheidung. Ein Fehler in einer Antwort ist mit einem Satz behoben. Ein Fehler in einem verschickten Angebot nicht." },
        ],
      },
      {
        nadpis: { sk: "Odkiaľ berie odpovede", cs: "Odkud bere odpovědi", en: "Where the answers come from", hu: "Honnan jönnek a válaszok", de: "Woher die Antworten kommen" },
        odstavce: [
          { sk: "Z toho, čo mu dáte. Cenník, popisy služieb, otváracie hodiny, obchodné podmienky, časté otázky — čokoľvek, čo máte napísané. Nastavíme to tak, aby odpovedal len z týchto podkladov, a nie z toho, čo sa kedysi naučil na internete. To je rozdiel medzi agentom, ktorý vám pomáha, a chatbotom, ktorý vám robí hanbu.", cs: "Z toho, co mu dáte. Ceník, popisy služeb, otevírací doba, obchodní podmínky, časté dotazy — cokoli, co máte napsané. Nastavíme to tak, aby odpovídal jen z těchto podkladů, a ne z toho, co se kdysi naučil na internetu. To je rozdíl mezi agentem, který vám pomáhá, a chatbotem, který vám dělá ostudu.", en: "From what you give it. Price list, service descriptions, opening hours, terms, FAQs — anything you have written down. We set it up to answer only from those, not from whatever it once learned on the internet. That is the difference between an agent that helps you and a chatbot that embarrasses you.", hu: "Abból, amit megad neki. Árlista, szolgáltatásleírások, nyitvatartás, üzletszabályzat, gyakori kérdések — bármi, ami le van írva. Úgy állítjuk be, hogy csak ezekből válaszoljon, ne abból, amit valaha az interneten tanult. Ez a különbség a segítő ügynök és a szégyent hozó chatbot között.", de: "Aus dem, was Sie ihm geben. Preisliste, Leistungsbeschreibungen, Öffnungszeiten, AGB, häufige Fragen — alles, was Sie schriftlich haben. Wir richten ihn so ein, dass er nur daraus antwortet, nicht aus dem, was er irgendwann im Internet gelernt hat. Das ist der Unterschied zwischen einem Agenten, der hilft, und einem Chatbot, der Sie blamiert." },
          { sk: "A keď odpoveď nemá, povie to. Nevymýšľa si, nehádže niečo približné — napíše, že si tým nie je istý, a otázku pošle vám. Znie to ako maličkosť, ale je to najdôležitejšie nastavenie z celého projektu. Agent, ktorý odpovedá vždy, je agent, ktorý občas klame vášmu zákazníkovi vaším menom.", cs: "A když odpověď nemá, řekne to. Nevymýšlí si, nehází něco přibližného — napíše, že si tím není jistý, a dotaz pošle vám. Zní to jako maličkost, ale je to nejdůležitější nastavení z celého projektu. Agent, který odpovídá vždy, je agent, který občas lže vašemu zákazníkovi vaším jménem.", en: "And when it has no answer, it says so. It does not invent, does not throw out something approximate — it writes that it is not sure and passes the question to you. It sounds like a detail, but it is the single most important setting in the project. An agent that always answers is an agent that occasionally lies to your customer in your name.", hu: "És ha nincs válasza, megmondja. Nem talál ki semmit, nem dob be valami hozzávetőlegeset — leírja, hogy nem biztos benne, és továbbítja a kérdést Önnek. Apróságnak hangzik, de ez a projekt legfontosabb beállítása. Az ügynök, amely mindig válaszol, olyan ügynök, amely időnként az Ön nevében hazudik az ügyfelének.", de: "Und wenn er keine Antwort hat, sagt er das. Er erfindet nichts und wirft nichts Ungefähres hin — er schreibt, dass er unsicher ist, und gibt die Frage an Sie weiter. Das klingt nach einer Kleinigkeit, ist aber die wichtigste Einstellung im ganzen Projekt. Ein Agent, der immer antwortet, ist ein Agent, der gelegentlich in Ihrem Namen lügt." },
        ],
      },
      {
        nadpis: { sk: "Kde má zmysel začať", cs: "Kde má smysl začít", en: "Where it makes sense to start", hu: "Hol érdemes kezdeni", de: "Wo es sinnvoll ist anzufangen" },
        odstavce: [
          { sk: "Najlepšie tam, kde vás tlačí topánka a kde sa chyba dá ľahko napraviť. Typicky odpovedanie na opakované otázky mimo pracovného času alebo predtriedenie dopytov. Oboje je merateľné a oboje sa dá vypnúť za minútu, keby to nefungovalo.", cs: "Nejlépe tam, kde vás tlačí bota a kde se chyba dá snadno napravit. Typicky odpovídání na opakované dotazy mimo pracovní dobu nebo předtřídění poptávek. Obojí je měřitelné a obojí se dá vypnout za minutu, kdyby to nefungovalo.", en: "Best where the shoe pinches and where a mistake is easy to undo. Typically answering repeat questions outside working hours, or pre-sorting enquiries. Both are measurable and both can be switched off in a minute if they do not work out.", hu: "Legjobb ott, ahol szorít a cipő, és ahol a hiba könnyen helyrehozható. Jellemzően ismétlődő kérdések megválaszolása munkaidőn kívül, vagy a megkeresések előrendezése. Mindkettő mérhető, és mindkettő egy perc alatt kikapcsolható, ha nem válna be.", de: "Am besten dort, wo der Schuh drückt und wo ein Fehler leicht rückgängig zu machen ist. Typisch: wiederkehrende Fragen außerhalb der Arbeitszeit beantworten oder Anfragen vorsortieren. Beides ist messbar und beides lässt sich in einer Minute abschalten, falls es nicht funktioniert." },
          { sk: "Čo neodporúčame: začínať tým, že agent prevezme komunikáciu so stálymi zákazníkmi, alebo že bude posielať cenové ponuky. Tam sa chyba počíta draho a dôvera sa vracia pomaly. Keď prvá vec zabehne, ďalšie sa pridávajú ľahko.", cs: "Co nedoporučujeme: začínat tím, že agent převezme komunikaci se stálými zákazníky, nebo že bude posílat cenové nabídky. Tam se chyba počítá draho a důvěra se vrací pomalu. Když první věc zaběhne, další se přidávají snadno.", en: "What we do not recommend: starting by having an agent take over communication with regular customers, or send quotes. There a mistake is expensive and trust comes back slowly. Once the first thing runs well, adding more is easy.", hu: "Amit nem javaslunk: azzal kezdeni, hogy az ügynök átveszi a kommunikációt a törzsvendégekkel, vagy ajánlatokat küld. Ott a hiba drága, és a bizalom lassan tér vissza. Ha az első dolog beválik, a többit könnyű hozzátenni.", de: "Wovon wir abraten: damit anzufangen, dass ein Agent die Kommunikation mit Stammkunden übernimmt oder Angebote verschickt. Dort ist ein Fehler teuer und Vertrauen kommt langsam zurück. Läuft das Erste gut, lässt sich Weiteres leicht ergänzen." },
        ],
      },
    ],
    ukazky: U("clever"),
    kroky: KROKY,
    faq: [...AI_FAQ, ...FAQ],
    seo: {
      title: {
        sk: "AI agenti a AI riešenia pre firmy",
        cs: "AI agenti a AI řešení pro firmy",
        en: "AI agents and AI solutions for business",
        hu: "AI-ügynökök és AI-megoldások cégeknek",
        de: "KI-Agenten und KI-Lösungen für Unternehmen",
      },
      description: {
        sk: "AI agenti, ktorí odpovedajú zákazníkom a triedia dopyty z vašich údajov. Bezplatná 30-minútová konzultácia, cena a termín až po nej.",
        cs: "AI agenti, kteří odpovídají zákazníkům a třídí poptávky z vašich údajů. Bezplatná 30minutová konzultace, cena a termín až po ní.",
        en: "AI agents that answer customers and sort enquiries from your own data. Free 30-minute consultation; price and timeline come after it.",
        hu: "AI-ügynökök, amelyek az Önök adataiból válaszolnak az ügyfeleknek és rendezik a megkereséseket. Ingyenes 30 perces konzultáció, az ár és a határidő utána jön.",
        de: "KI-Agenten, die aus Ihren Daten Kunden beantworten und Anfragen sortieren. Kostenlose 30-Minuten-Beratung, Preis und Termin danach.",
      },
    },
  },
  {
    slug: "aplikacie-na-mieru",
    slugCs: "aplikace-na-miru",
    sluzbaNazov: {
      sk: "Aplikácie a interné systémy na mieru",
      cs: "Aplikace a interní systémy na míru",
      en: "Custom applications and internal systems",
      hu: "Egyedi alkalmazások és belső rendszerek",
      de: "Individuelle Anwendungen und interne Systeme",
    },
    h1: {
      sk: "Aplikácie a softvér na mieru — presne na to, ako pracujete",
      cs: "Aplikace a software na míru — přesně na to, jak pracujete",
      en: "Custom applications and software — built around how you work",
      hu: "Egyedi alkalmazások és szoftver — pontosan az Önök munkamódjára",
      de: "Individuelle Anwendungen und Software — genau auf Ihre Arbeitsweise",
    },
    podnadpis: {
      sk: "Keď hotové riešenie neposkytuje to, čo potrebujete, postavíme vám vlastné — a vy sa nemusíte prispôsobovať cudziemu programu.",
      cs: "Když hotové řešení neposkytuje to, co potřebujete, postavíme vám vlastní — a vy se nemusíte přizpůsobovat cizímu programu.",
      en: "When off-the-shelf software doesn't do what you need, we build your own — so you don't have to bend around someone else's program.",
      hu: "Ha a kész megoldás nem azt tudja, amire szüksége van, sajátot építünk — így nem Önnek kell idomulnia egy idegen programhoz.",
      de: "Wenn Standardsoftware nicht leistet, was Sie brauchen, bauen wir Ihre eigene — damit Sie sich nicht einem fremden Programm anpassen müssen.",
    },
    prinosy: [
      {
        nadpis: { sk: "Robí presne to vaše", cs: "Dělá přesně to vaše", en: "Does exactly your job", hu: "Pontosan azt csinálja, amit Ön", de: "Macht genau Ihre Arbeit" },
        text: {
          sk: "Žiadne polia navyše ani kroky, ktoré u vás nedávajú zmysel. Systém kopíruje to, ako naozaj pracujete.",
          cs: "Žádná pole navíc ani kroky, které u vás nedávají smysl. Systém kopíruje to, jak doopravdy pracujete.",
          en: "No extra fields or steps that make no sense for you. The system mirrors how you actually work.",
          hu: "Nincsenek fölösleges mezők vagy lépések, amelyeknek Önöknél nincs értelme. A rendszer azt követi, ahogy valóban dolgoznak.",
          de: "Keine überflüssigen Felder oder Schritte, die bei Ihnen keinen Sinn ergeben. Das System bildet ab, wie Sie wirklich arbeiten.",
        },
      },
      {
        nadpis: { sk: "Všetko na jednom mieste", cs: "Všechno na jednom místě", en: "Everything in one place", hu: "Minden egy helyen", de: "Alles an einem Ort" },
        text: {
          sk: "Koniec hľadania v tabuľkách, e-mailoch a správach. Jeden prehľad, do ktorého vidí celý tím.",
          cs: "Konec hledání v tabulkách, e-mailech a zprávách. Jeden přehled, do kterého vidí celý tým.",
          en: "No more digging through spreadsheets, e-mails and chats. One overview the whole team can see.",
          hu: "Vége a táblázatok, e-mailek és üzenetek közti keresgélésnek. Egy áttekintés, amelybe az egész csapat belelát.",
          de: "Schluss mit der Suche in Tabellen, E-Mails und Nachrichten. Eine Übersicht, die das ganze Team sieht.",
        },
      },
      {
        nadpis: { sk: "Rastie s vami", cs: "Roste s vámi", en: "Grows with you", hu: "Önökkel együtt nő", de: "Wächst mit Ihnen" },
        text: {
          sk: "Keď sa firma zmení, systém sa doplní. Nečakáte, kým to dodávateľ zaradí do svojho plánu.",
          cs: "Když se firma změní, systém se doplní. Nečekáte, až to dodavatel zařadí do svého plánu.",
          en: "When the business changes, the system gets extended. You don't wait for a vendor to put it on their roadmap.",
          hu: "Ha a cég változik, a rendszer bővül. Nem kell várni, míg a szállító beveszi a tervébe.",
          de: "Ändert sich das Unternehmen, wird das System erweitert. Sie warten nicht, bis ein Anbieter es einplant.",
        },
      },
      {
        nadpis: { sk: "Jedna pravda namiesto troch tabuliek", cs: "Jedna pravda místo tří tabulek", en: "One truth instead of three spreadsheets", hu: "Egy igazság három táblázat helyett", de: "Eine Wahrheit statt drei Tabellen" },
        text: { sk: "Koniec otázky, ktorá verzia platí. Čísla sú na jednom mieste a vidí ich celý tím.", cs: "Konec otázky, která verze platí. Čísla jsou na jednom místě a vidí je celý tým.", en: "No more asking which version is current. The numbers live in one place and the whole team sees them.", hu: "Vége a kérdésnek, melyik verzió érvényes. A számok egy helyen vannak, és az egész csapat látja őket.", de: "Keine Frage mehr, welche Version gilt. Die Zahlen liegen an einem Ort und das ganze Team sieht sie." },
      },
      {
        nadpis: { sk: "Kód a prístupy sú vaše", cs: "Kód a přístupy jsou vaše", en: "The code and access are yours", hu: "A kód és a hozzáférések az Önéi", de: "Code und Zugänge gehören Ihnen" },
        text: { sk: "Dostanete zdrojový kód aj databázu. Nedržíme si kľúče ako poistku, že u nás zostanete.", cs: "Dostanete zdrojový kód i databázi. Nedržíme si klíče jako pojistku, že u nás zůstanete.", en: "You get the source code and the database. We do not keep the keys as insurance that you stay.", hu: "Megkapja a forráskódot és az adatbázist. Nem tartjuk magunknál a kulcsokat biztosítékként, hogy maradjon.", de: "Sie bekommen Quellcode und Datenbank. Wir behalten die Schlüssel nicht als Absicherung, dass Sie bleiben." },
      },
      {
        nadpis: { sk: "Začína sa v malom", cs: "Začíná se v malém", en: "It starts small", hu: "Kicsiben kezdődik", de: "Es beginnt klein" },
        text: { sk: "Najprv jedna vec, ktorá vás najviac bolí. Po mesiaci používania viete, čo ďalej — alebo že stačí, čo máte.", cs: "Nejdřív jedna věc, která vás nejvíc bolí. Po měsíci používání víte, co dál — nebo že stačí, co máte.", en: "First the one thing that hurts most. After a month of use you know what comes next — or that what you have is enough.", hu: "Először az az egy dolog, amelyik a legjobban fáj. Egy hónap használat után tudja, mi jön — vagy hogy elég, ami van.", de: "Zuerst die eine Sache, die am meisten schmerzt. Nach einem Monat Nutzung wissen Sie, was als Nächstes kommt — oder dass das Vorhandene reicht." },
      },
    ],
    uvod: [
      { sk: "Väčšina firiem sa k vlastnému systému nedostane preto, že by chcela niečo výnimočné. Dostane sa k nemu preto, že vyskúšala tri hotové programy a v každom jej chýbala jedna vec, bez ktorej to nefunguje — a okolo nej bolo tridsať funkcií, ktoré nikdy nepoužije.", cs: "Většina firem se k vlastnímu systému nedostane proto, že by chtěla něco výjimečného. Dostane se k němu proto, že vyzkoušela tři hotové programy a v každém jí chyběla jedna věc, bez které to nefunguje — a kolem ní bylo třicet funkcí, které nikdy nepoužije.", en: "Most companies do not end up with custom software because they want something exceptional. They end up there because they tried three off-the-shelf tools and each was missing the one thing they cannot work without — surrounded by thirty features they will never use.", hu: "A legtöbb cég nem azért jut el a saját rendszerig, mert valami különlegeset akar. Azért jut el oda, mert kipróbált három kész programot, és mindegyikből hiányzott az az egy dolog, ami nélkül nem megy — körülötte pedig harminc funkció volt, amit soha nem használ.", de: "Die meisten Firmen kommen nicht zu eigener Software, weil sie etwas Außergewöhnliches wollen. Sie kommen dazu, weil sie drei fertige Programme getestet haben und in jedem die eine Sache fehlte, ohne die es nicht geht — drumherum dreißig Funktionen, die sie nie nutzen werden." },
      { sk: "Medzitým sa realita rieši v tabuľkách. Jedna na objednávky, druhá na sklad, tretia u kolegu na ploche. Funguje to prekvapivo dlho — až do dňa, keď sa dve verzie rozídu a nikto nevie, ktorá platí.", cs: "Mezitím se realita řeší v tabulkách. Jedna na objednávky, druhá na sklad, třetí u kolegy na ploše. Funguje to překvapivě dlouho — až do dne, kdy se dvě verze rozejdou a nikdo neví, která platí.", en: "In the meantime, reality runs on spreadsheets. One for orders, one for stock, a third on a colleague's desktop. It works surprisingly long — until the day two versions drift apart and nobody knows which one is right.", hu: "Közben a valóságot táblázatokban kezelik. Egy a rendelésekre, egy a készletre, egy harmadik a kolléga asztalán. Meglepően sokáig működik — egészen addig a napig, amíg két verzió szét nem válik, és senki nem tudja, melyik az érvényes.", de: "Währenddessen läuft die Realität über Tabellen. Eine für Bestellungen, eine fürs Lager, eine dritte auf dem Desktop des Kollegen. Das funktioniert erstaunlich lange — bis zu dem Tag, an dem zwei Versionen auseinanderlaufen und niemand weiß, welche gilt." },
      { sk: "Nižšie je, kedy sa vlastný systém oplatí a kedy nie, ako sa dá začať v malom bez toho, aby ste do toho museli dať všetko naraz, a čo sa stane, keď sa rozhodnete pokračovať bez nás. Prvá polhodina je zadarmo a nezáväzne.", cs: "Níže je, kdy se vlastní systém vyplatí a kdy ne, jak se dá začít v malém, aniž byste do toho museli dát všechno naráz, a co se stane, když se rozhodnete pokračovat bez nás. První půlhodina je zdarma a nezávazně.", en: "Below is when custom software is worth it and when it is not, how to start small without betting everything at once, and what happens if you decide to carry on without us. The first half hour is free and without commitment.", hu: "Alább olvasható, mikor éri meg a saját rendszer és mikor nem, hogyan lehet kicsiben kezdeni anélkül, hogy mindent egyszerre kellene beletenni, és mi történik, ha úgy dönt, nélkülünk folytatja. Az első félóra ingyenes és kötelezettség nélküli.", de: "Unten steht, wann sich eigene Software lohnt und wann nicht, wie man klein anfangen kann, ohne alles auf einmal zu setzen, und was passiert, wenn Sie ohne uns weitermachen. Die erste halbe Stunde ist kostenlos und unverbindlich." },
    ],
    pasaze: [
      {
        nadpis: { sk: "Kedy sa vlastný systém oplatí", cs: "Kdy se vlastní systém vyplatí", en: "When custom software is worth it", hu: "Mikor éri meg a saját rendszer", de: "Wann sich eigene Software lohnt" },
        odstavce: [
          { sk: "Keď hotové riešenie existuje, ale museli by ste si kvôli nemu zmeniť spôsob práce. Alebo keď platíte za tri nástroje, z ktorých každý robí štvrtinu toho, čo potrebujete, a nikto z nich nevie o tých ostatných. Vtedy sa vlastný systém zvyčajne zaplatí sám tým, čo prestanete platiť inde.", cs: "Když hotové řešení existuje, ale museli byste si kvůli němu změnit způsob práce. Nebo když platíte za tři nástroje, z nichž každý dělá čtvrtinu toho, co potřebujete, a žádný z nich neví o těch ostatních. Tehdy se vlastní systém obvykle zaplatí sám tím, co přestanete platit jinde.", en: "When an off-the-shelf tool exists but you would have to change how you work to fit it. Or when you pay for three tools, each doing a quarter of what you need, none of them aware of the others. Then custom software usually pays for itself with what you stop paying elsewhere.", hu: "Amikor létezik kész megoldás, de miatta meg kellene változtatnia a munkamódját. Vagy amikor három eszközért fizet, amelyek mindegyike a szükséges dolgok negyedét tudja, és egyik sem tud a többiről. Ilyenkor a saját rendszer rendszerint megtérül abból, amit máshol már nem fizet.", de: "Wenn es eine fertige Lösung gibt, Sie dafür aber Ihre Arbeitsweise ändern müssten. Oder wenn Sie drei Werkzeuge bezahlen, von denen jedes ein Viertel dessen kann, was Sie brauchen, und keines von den anderen weiß. Dann zahlt sich eigene Software meist durch das aus, was Sie anderswo nicht mehr zahlen." },
          { sk: "Neoplatí sa, keď existuje hotová vec, ktorá robí, čo potrebujete, za pár eur mesačne. Povieme vám to rovno a odporučíme ju — aj keď na tom nič nezarobíme. Je to lacnejšie pre vás a pre nás lepšie než klient, ktorý o pol roka zistí, že si kúpil niečo zbytočné.", cs: "Nevyplatí se, když existuje hotová věc, která dělá, co potřebujete, za pár eur měsíčně. Řekneme vám to rovnou a doporučíme ji — i když na tom nic nevyděláme. Je to levnější pro vás a pro nás lepší než klient, který za půl roku zjistí, že si koupil něco zbytečného.", en: "It is not worth it when something ready-made does what you need for a few euros a month. We will say so and point you to it — even though we earn nothing from that. It is cheaper for you, and better for us than a client who realises in six months they bought something they did not need.", hu: "Nem éri meg, ha létezik kész dolog, amely havi pár euróért azt tudja, amire szüksége van. Ezt rögtön megmondjuk, és ajánljuk — akkor is, ha ezen nem keresünk. Önnek olcsóbb, nekünk pedig jobb, mint egy ügyfél, aki fél év múlva jön rá, hogy fölöslegeset vett.", de: "Nicht lohnend ist es, wenn es etwas Fertiges gibt, das für ein paar Euro im Monat leistet, was Sie brauchen. Das sagen wir direkt und empfehlen es — auch wenn wir daran nichts verdienen. Für Sie ist es günstiger und für uns besser als ein Kunde, der in einem halben Jahr merkt, dass er Unnötiges gekauft hat." },
        ],
      },
      {
        nadpis: { sk: "Ako začať v malom", cs: "Jak začít v malém", en: "How to start small", hu: "Hogyan kezdjünk kicsiben", de: "Wie man klein anfängt" },
        odstavce: [
          { sk: "Nestaviame celý systém naraz. Začíname jednou vecou, ktorá vás najviac bolí, a tú spustíme do prevádzky. Vy ju mesiac používate a zistíte, čo ste si predstavovali inak — a to zistíte len používaním, nie na stretnutí nad zoznamom funkcií.", cs: "Nestavíme celý systém naráz. Začínáme jednou věcí, která vás nejvíc bolí, a tu spustíme do provozu. Vy ji měsíc používáte a zjistíte, co jste si představovali jinak — a to zjistíte jen používáním, ne na schůzce nad seznamem funkcí.", en: "We do not build the whole system at once. We start with the one thing that hurts most and put it into use. You use it for a month and find out what you had pictured differently — and you only find that out by using it, not in a meeting over a feature list.", hu: "Nem építjük meg az egész rendszert egyszerre. Egy dologgal kezdünk, amelyik a legjobban fáj, és azt élesítjük. Ön egy hónapig használja, és kiderül, mit képzelt másképp — ez pedig csak használat közben derül ki, nem egy funkciólista fölötti megbeszélésen.", de: "Wir bauen nicht das ganze System auf einmal. Wir beginnen mit der einen Sache, die am meisten schmerzt, und nehmen sie in Betrieb. Sie nutzen sie einen Monat und merken, was Sie sich anders vorgestellt hatten — und das merkt man nur durch Nutzung, nicht in einer Besprechung über eine Funktionsliste." },
          { sk: "Až potom sa pridáva ďalšie. Výhoda je, že po prvom kroku viete, ako sa s nami pracuje, a môžete sa rozhodnúť nepokračovať — bez toho, aby ste prišli o to, čo už beží. Nevýhoda je, že to celé trvá dlhšie, než keby sme to postavili naraz. Stojíme si za tým, lebo postavené naraz znamená postavené podľa odhadov.", cs: "Až potom se přidává další. Výhoda je, že po prvním kroku víte, jak se s námi pracuje, a můžete se rozhodnout nepokračovat — aniž byste přišli o to, co už běží. Nevýhoda je, že to celé trvá déle, než kdybychom to postavili naráz. Stojíme si za tím, protože postavené naráz znamená postavené podle odhadů.", en: "Only then do we add more. The advantage is that after the first step you know what working with us is like and can decide not to continue — without losing what already runs. The downside is that it takes longer than building it all at once. We stand by it, because all at once means built on guesses.", hu: "Csak ezután jön a következő. Az előny, hogy az első lépés után tudja, milyen velünk dolgozni, és dönthet úgy, hogy nem folytatja — anélkül, hogy elveszítené azt, ami már működik. A hátrány, hogy tovább tart, mintha egyszerre építenénk meg. Kitartunk emellett, mert az egyszerre azt jelenti: becslésekre építve.", de: "Erst danach kommt das Nächste. Der Vorteil: Nach dem ersten Schritt wissen Sie, wie die Zusammenarbeit läuft, und können sich gegen eine Fortsetzung entscheiden — ohne zu verlieren, was bereits läuft. Der Nachteil: Es dauert länger, als alles auf einmal zu bauen. Wir stehen dazu, denn alles auf einmal heißt: nach Vermutungen gebaut." },
        ],
      },
      {
        nadpis: { sk: "Čo keď sa rozhodnete pokračovať bez nás", cs: "Co když se rozhodnete pokračovat bez nás", en: "What if you carry on without us", hu: "Mi van, ha nélkülünk folytatja", de: "Was, wenn Sie ohne uns weitermachen" },
        odstavce: [
          { sk: "Dostanete prístupy, zdrojový kód aj prístup k databáze. Nestaviame nič, z čoho by sa nedalo odísť, a nedržíme si kľúče ako poistku. Keď si neskôr nájdete iného dodávateľa, prevezme to.", cs: "Dostanete přístupy, zdrojový kód i přístup k databázi. Nestavíme nic, z čeho by se nedalo odejít, a nedržíme si klíče jako pojistku. Když si později najdete jiného dodavatele, převezme to.", en: "You get the access, the source code and the database. We do not build anything you cannot walk away from, and we do not keep the keys as insurance. If you find another supplier later, they can take it over.", hu: "Megkapja a hozzáféréseket, a forráskódot és az adatbázist is. Nem építünk olyat, amiből ne lehetne kilépni, és nem tartjuk magunknál a kulcsokat biztosítékként. Ha később más szállítót talál, át tudja venni.", de: "Sie erhalten die Zugänge, den Quellcode und die Datenbank. Wir bauen nichts, von dem man nicht wieder wegkommt, und behalten die Schlüssel nicht als Absicherung. Finden Sie später einen anderen Dienstleister, kann der übernehmen." },
          { sk: "Hovoríme to na začiatku naschvál. Je to jediný spôsob, ako sa dá veriť tomu, že vám neodporučíme zbytočne veľké riešenie — keď od vás nič nedrží okrem toho, že ste spokojní.", cs: "Říkáme to na začátku naschvál. Je to jediný způsob, jak se dá věřit tomu, že vám nedoporučíme zbytečně velké řešení — když vás u nás nic nedrží kromě toho, že jste spokojení.", en: "We say this up front on purpose. It is the only way you can believe we will not recommend an oversized solution — when nothing holds you here except being satisfied.", hu: "Ezt szándékosan mondjuk el az elején. Csak így lehet elhinni, hogy nem fogunk fölöslegesen nagy megoldást ajánlani — ha semmi nem tartja Önt nálunk azon kívül, hogy elégedett.", de: "Das sagen wir bewusst zu Beginn. Nur so lässt sich glauben, dass wir Ihnen keine überdimensionierte Lösung empfehlen — wenn Sie nichts hält außer Zufriedenheit." },
        ],
      },
    ],
    ukazky: U("clever", "rozsvietto", "vytlacto-3d"),
    kroky: KROKY,
    faq: FAQ,
    seo: {
      title: {
        sk: "Aplikácie a softvér na mieru",
        cs: "Aplikace a software na míru",
        en: "Custom applications and software",
        hu: "Egyedi alkalmazások és szoftver",
        de: "Individuelle Anwendungen und Software",
      },
      description: {
        sk: "Interné systémy a aplikácie postavené na to, ako naozaj pracujete. Bezplatná 30-minútová konzultácia, cena a termín až po nej.",
        cs: "Interní systémy a aplikace postavené na to, jak doopravdy pracujete. Bezplatná 30minutová konzultace, cena a termín až po ní.",
        en: "Internal systems and applications built around how you actually work. Free 30-minute consultation; price and timeline come after it.",
        hu: "Belső rendszerek és alkalmazások arra építve, ahogy valóban dolgoznak. Ingyenes 30 perces konzultáció, az ár és a határidő utána jön.",
        de: "Interne Systeme und Anwendungen, gebaut auf Ihre tatsächliche Arbeitsweise. Kostenlose 30-Minuten-Beratung, Preis und Termin danach.",
      },
    },
  },
  {
    slug: "rezervacne-systemy",
    slugCs: "rezervacni-systemy",
    uvod: [
      {
        sk: "Väčšina prevádzok na Slovensku dnes berie rezervácie a objednávky cez tri kanály naraz: telefón, Instagram a Messenger. Funguje to presne dovtedy, kým je ich málo. Potom príde deň, keď jeden termín potvrdíte dvakrát, na druhý zabudnete, a tretí zákazník odíde ku konkurencii, lebo mu nikto neodpísal do večera.",
        cs: "Většina provozoven dnes bere rezervace a objednávky přes tři kanály naráz: telefon, Instagram a Messenger. Funguje to přesně do chvíle, než jich je moc. Pak přijde den, kdy jeden termín potvrdíte dvakrát, na druhý zapomenete, a třetí zákazník odejde ke konkurenci, protože mu nikdo neodepsal do večera.",
        en: "Most businesses still take bookings and orders through three channels at once: phone, Instagram and Messenger. That works right up until there are too many. Then comes the day you confirm one slot twice, forget another, and a third customer goes to a competitor because nobody replied by evening.",
        hu: "A legtöbb üzlet ma három csatornán egyszerre fogad foglalásokat és rendeléseket: telefon, Instagram, Messenger. Pontosan addig működik, amíg kevés van belőlük. Aztán jön a nap, amikor egy időpontot kétszer visszaigazol, egy másikról megfeledkezik, a harmadik vendég pedig a konkurenciához megy, mert estig nem válaszolt neki senki.",
        de: "Die meisten Betriebe nehmen Reservierungen und Bestellungen über drei Kanäle gleichzeitig entgegen: Telefon, Instagram und Messenger. Das funktioniert genau so lange, wie es wenige sind. Dann kommt der Tag, an dem Sie einen Termin doppelt bestätigen, einen zweiten vergessen und ein dritter Kunde zur Konkurrenz geht, weil ihm bis zum Abend niemand geantwortet hat.",
      },
      {
        sk: "Rezervačný systém nie je o technológii. Je o tom, že objednávka má jedno miesto, kde vždy je, a že si ju zákazník vybaví sám — aj o jedenástej večer, aj keď máte plné ruky práce.",
        cs: "Rezervační systém není o technologii. Je o tom, že objednávka má jedno místo, kde vždycky je, a že si ji zákazník vyřídí sám — i v jedenáct večer, i když máte plné ruce práce.",
        en: "A booking system isn't about technology. It's about an order having one place where it always is, and the customer handling it themselves — at eleven at night, and while your hands are full.",
        hu: "A foglalási rendszer nem a technológiáról szól. Arról szól, hogy a rendelésnek egyetlen helye van, ahol mindig megtalálható, és hogy az ügyfél maga intézi — este tizenegykor is, és akkor is, amikor Önnek tele a keze.",
        de: "Ein Reservierungssystem ist keine Technikfrage. Es geht darum, dass eine Bestellung einen Ort hat, an dem sie immer ist, und dass der Kunde sie selbst erledigt — auch um elf Uhr abends und auch, wenn Sie alle Hände voll zu tun haben.",
      },
      {
        sk: "Nižšie je rozpísané, čo taký systém reálne rieši, čo do neho patrí, pre koho má zmysel a pre koho nie, a ako celé nasadenie prebieha. Ak sa vám to bude zdať ako váš prípad, napíšte nám — prvá polhodina je zadarmo a nezáväzne.",
        cs: "Níže je rozepsané, co takový systém reálně řeší, co do něj patří, pro koho má smysl a pro koho ne, a jak celé nasazení probíhá. Pokud vám to bude připadat jako váš případ, napište nám — první půlhodina je zdarma a nezávazně.",
        en: "Below is what such a system actually solves, what goes into it, who it makes sense for and who not, and how a rollout works. If it sounds like your situation, get in touch — the first half hour is free and without commitment.",
        hu: "Alább leírjuk, mit old meg valójában egy ilyen rendszer, mi tartozik bele, kinek van értelme és kinek nincs, és hogyan zajlik a bevezetés. Ha ez ismerősen hangzik, írjon nekünk — az első félóra ingyenes és kötelezettség nélküli.",
        de: "Unten steht, was so ein System wirklich löst, was dazugehört, für wen es sinnvoll ist und für wen nicht, und wie die Einführung abläuft. Wenn Ihnen das bekannt vorkommt, schreiben Sie uns — die erste halbe Stunde ist kostenlos und unverbindlich.",
      },
    ],
    sluzbaNazov: {
      sk: "Rezervačné a objednávkové systémy",
      cs: "Rezervační a objednávkové systémy",
      en: "Booking and ordering systems",
      hu: "Foglalási és rendelési rendszerek",
      de: "Reservierungs- und Bestellsysteme",
    },
    h1: {
      sk: "Rezervačné a objednávkové systémy, ktoré si zákazník vybaví sám",
      cs: "Rezervační a objednávkové systémy, které si zákazník vyřídí sám",
      en: "Booking and ordering systems customers can handle themselves",
      hu: "Foglalási és rendelési rendszerek, amelyeket az ügyfél maga intéz",
      de: "Reservierungs- und Bestellsysteme, die Kunden selbst erledigen",
    },
    podnadpis: {
      sk: "Termíny a objednávky prestanú chodiť cez správy a telefonáty — a prestanú sa strácať.",
      cs: "Termíny a objednávky přestanou chodit přes zprávy a telefonáty — a přestanou se ztrácet.",
      en: "Bookings and orders stop arriving through messages and phone calls — and stop getting lost.",
      hu: "A időpontok és rendelések nem üzenetekben és telefonhívásokban érkeznek — és nem vesznek el.",
      de: "Termine und Bestellungen kommen nicht mehr über Nachrichten und Anrufe — und gehen nicht mehr verloren.",
    },
    prinosy: [
      {
        nadpis: { sk: "Objednávky nikdy nezmiznú", cs: "Objednávky nikdy nezmizí", en: "Orders never vanish", hu: "A rendelések sosem tűnnek el", de: "Bestellungen gehen nie verloren" },
        text: {
          sk: "Všetko príde na jedno miesto s dátumom aj kontaktom. Nič sa nestratí v chate ani v zmeškanom hovore.",
          cs: "Všechno přijde na jedno místo s datem i kontaktem. Nic se neztratí v chatu ani v zmeškaném hovoru.",
          en: "Everything lands in one place with a date and a contact. Nothing gets lost in a chat or a missed call.",
          hu: "Minden egy helyre érkezik dátummal és elérhetőséggel. Semmi nem vész el chatben vagy nem fogadott hívásban.",
          de: "Alles landet an einem Ort mit Datum und Kontakt. Nichts geht im Chat oder in einem verpassten Anruf unter.",
        },
      },
      {
        nadpis: { sk: "Funguje aj po zatvorení", cs: "Funguje i po zavření", en: "Works after hours", hu: "Zárás után is működik", de: "Funktioniert auch nach Feierabend" },
        text: {
          sk: "Zákazník si rezervuje večer aj cez víkend. Vy sa k tomu dostanete, keď máte čas.",
          cs: "Zákazník si rezervuje večer i o víkendu. Vy se k tomu dostanete, až budete mít čas.",
          en: "Customers book in the evening and at weekends. You get to it when you have time.",
          hu: "Az ügyfél este és hétvégén is foglal. Ön akkor néz rá, amikor ideje van.",
          de: "Kunden buchen abends und am Wochenende. Sie kümmern sich darum, wenn Sie Zeit haben.",
        },
      },
      {
        nadpis: { sk: "Menej telefonovania", cs: "Méně telefonování", en: "Less phone time", hu: "Kevesebb telefonálás", de: "Weniger Telefonieren" },
        text: {
          sk: "Voľné termíny, ceny aj možnosti si zákazník pozrie sám. Voláte už len vtedy, keď to má zmysel.",
          cs: "Volné termíny, ceny i možnosti si zákazník prohlédne sám. Voláte už jen tehdy, když to má smysl.",
          en: "Customers check free slots, prices and options themselves. You only call when it actually matters.",
          hu: "A szabad időpontokat, árakat és lehetőségeket az ügyfél maga nézi meg. Csak akkor telefonál, ha tényleg van értelme.",
          de: "Freie Termine, Preise und Optionen sehen Kunden selbst. Sie rufen nur noch an, wenn es wirklich nötig ist.",
        },
      },
      {
        nadpis: { sk: "Prehľad namiesto hľadania", cs: "Přehled místo hledání", en: "An overview instead of a search", hu: "Áttekintés keresgélés helyett", de: "Überblick statt Suche" },
        text: { sk: "Čo prišlo, čo je vybavené a čo čaká, vidíte na jednej obrazovke. Nie v troch aplikáciách a jednom zošite.", cs: "Co přišlo, co je vyřízené a co čeká, vidíte na jedné obrazovce. Ne ve třech aplikacích a jednom sešitě.", en: "What came in, what's done and what's waiting — on one screen. Not across three apps and a notebook.", hu: "Mi érkezett, mi van kész és mi vár — egy képernyőn. Nem három alkalmazásban és egy füzetben.", de: "Was eingegangen, erledigt und offen ist — auf einem Bildschirm. Nicht in drei Apps und einem Heft." },
      },
      {
        nadpis: { sk: "Zákazník dostane potvrdenie", cs: "Zákazník dostane potvrzení", en: "The customer gets a confirmation", hu: "Az ügyfél visszaigazolást kap", de: "Der Kunde bekommt eine Bestätigung" },
        text: { sk: "Automatický e-mail hneď po odoslaní. Zákazník vie, že objednávka dorazila, a nepíše druhýkrát, či ste ju videli.", cs: "Automatický e-mail hned po odeslání. Zákazník ví, že objednávka dorazila, a nepíše podruhé, jestli jste ji viděli.", en: "An automatic e-mail right after submission. They know the order arrived and don't write again asking whether you saw it.", hu: "Automatikus e-mail azonnal a beküldés után. Tudja, hogy a rendelés megérkezett, és nem ír másodszor, hogy látta-e.", de: "Eine automatische E-Mail direkt nach dem Absenden. Der Kunde weiß, dass die Bestellung da ist, und fragt nicht nochmal nach." },
      },
      {
        nadpis: { sk: "Dáta, nie dohady", cs: "Data, ne dohady", en: "Data, not guesswork", hu: "Adatok, nem találgatás", de: "Daten statt Vermutungen" },
        text: { sk: "Vidíte, čo si ľudia objednávajú najčastejšie a kedy. Pri správach to neviete zistiť, pri systéme je to jeden pohľad.", cs: "Vidíte, co si lidé objednávají nejčastěji a kdy. U zpráv to nezjistíte, u systému je to jeden pohled.", en: "You see what people order most and when. With messages you can't find out; with a system it's one glance.", hu: "Látja, mit rendelnek a legtöbben és mikor. Üzenetekből ezt nem tudja meg, rendszerből egy pillantás.", de: "Sie sehen, was am häufigsten und wann bestellt wird. Aus Nachrichten lässt sich das nicht ablesen, im System ist es ein Blick." },
      },
    ],
pasaze: [
      {
        nadpis: { sk: "Čo sa deje, keď objednávky chodia cez správy", cs: "Co se děje, když objednávky chodí přes zprávy", en: "What happens when orders arrive through messages", hu: "Mi történik, ha a rendelések üzenetben jönnek", de: "Was passiert, wenn Bestellungen über Nachrichten kommen" },
        odstavce: [
          { sk: "Správa v Instagrame nie je objednávka. Je to text, ktorý si musíte prečítať, pochopiť, niekam si ho poznačiť a potom naň odpovedať. Pri piatich za deň to nie je problém. Pri dvadsiatich je to hodina práce denne, ktorú nikto neplatí, a pri ktorej sa nedá nerobiť chyby — lebo sa robí medzi inou prácou.", cs: "Zpráva na Instagramu není objednávka. Je to text, který si musíte přečíst, pochopit, někam si ho poznamenat a pak na něj odpovědět. Při pěti za den to není problém. Při dvaceti je to hodina práce denně, kterou nikdo neplatí, a u které se nedá nedělat chyby — protože se dělá mezi jinou prací.", en: "An Instagram message is not an order. It's text you have to read, understand, note down somewhere and then reply to. At five a day that's fine. At twenty it's an hour of unpaid work a day, and work where mistakes are unavoidable, because it happens between other work.", hu: "Egy Instagram-üzenet nem rendelés. Szöveg, amit el kell olvasni, megérteni, lejegyezni, majd válaszolni rá. Napi ötnél ez nem gond. Napi húsznál ez napi egy óra fizetetlen munka, amiben elkerülhetetlen a hiba, mert más munka közben történik.", de: "Eine Instagram-Nachricht ist keine Bestellung. Sie ist Text, den Sie lesen, verstehen, irgendwo notieren und dann beantworten müssen. Bei fünf am Tag ist das kein Problem. Bei zwanzig ist es eine Stunde unbezahlte Arbeit täglich, bei der Fehler unvermeidlich sind, weil sie zwischen anderer Arbeit passiert." },
          { sk: "A je tu druhá, tichšia strata. Zákazník, ktorý píše o deviatej večer, väčšinou nečaká do rána. Napíše trom prevádzkam a ide k tej, ktorá odpovie prvá. Pri správach odpovedáte, keď máte čas. Pri rezervačnom systéme odpovedá formulár hneď — potvrdením, že objednávka dorazila.", cs: "A je tu druhá, tišší ztráta. Zákazník, který píše v devět večer, většinou nečeká do rána. Napíše třem provozovnám a jde k té, která odpoví první. U zpráv odpovídáte, až máte čas. U rezervačního systému odpovídá formulář hned — potvrzením, že objednávka dorazila.", en: "And there's a second, quieter loss. Someone writing at nine in the evening usually won't wait until morning. They message three places and go with whoever answers first. With messages, you answer when you have time. With a booking system, the form answers immediately — with a confirmation that the order arrived.", hu: "És van egy második, csendesebb veszteség. Aki este kilenckor ír, általában nem vár reggelig. Ír három helyre, és ahhoz megy, aki először válaszol. Üzeneteknél akkor válaszol, amikor ideje van. Foglalási rendszernél az űrlap azonnal válaszol — visszaigazolással, hogy a rendelés megérkezett.", de: "Und es gibt einen zweiten, leiseren Verlust. Wer um neun Uhr abends schreibt, wartet meist nicht bis zum Morgen. Er schreibt drei Betriebe an und geht zu dem, der zuerst antwortet. Bei Nachrichten antworten Sie, wenn Sie Zeit haben. Beim Reservierungssystem antwortet das Formular sofort — mit der Bestätigung, dass die Bestellung angekommen ist." },
        ],
      },
      {
        nadpis: { sk: "Čo do takého systému patrí", cs: "Co do takového systému patří", en: "What goes into a system like this", hu: "Mi tartozik egy ilyen rendszerbe", de: "Was zu so einem System gehört" },
        odstavce: [
          { sk: "Základ je vždy rovnaký: formulár, ktorý sa pýta presne na to, čo potrebujete vedieť, a nič navyše. Prehľad, v ktorom vidíte, čo prišlo, čo je vybavené a čo čaká. A automatický e-mail zákazníkovi, že objednávku máte. Tieto tri veci vyriešia väčšinu problému.", cs: "Základ je vždy stejný: formulář, který se ptá přesně na to, co potřebujete vědět, a nic navíc. Přehled, ve kterém vidíte, co přišlo, co je vyřízené a co čeká. A automatický e-mail zákazníkovi, že objednávku máte. Tyhle tři věci vyřeší většinu problému.", en: "The core is always the same: a form that asks exactly what you need to know and nothing more. An overview showing what came in, what's done and what's waiting. And an automatic e-mail telling the customer you have their order. Those three things solve most of it.", hu: "Az alap mindig ugyanaz: űrlap, amely pontosan azt kérdezi, amit tudni kell, és semmi mást. Áttekintés, amelyben látja, mi érkezett, mi van kész és mi vár. És automatikus e-mail az ügyfélnek, hogy megvan a rendelés. Ez a három dolog a probléma nagy részét megoldja.", de: "Die Basis ist immer gleich: ein Formular, das genau das fragt, was Sie wissen müssen, und nichts weiter. Eine Übersicht, die zeigt, was eingegangen ist, was erledigt ist und was wartet. Und eine automatische E-Mail an den Kunden, dass die Bestellung da ist. Diese drei Dinge lösen das meiste." },
          { sk: "Nad tým sa stavia podľa toho, čo robíte. Kalendár s voľnými termínmi, keď predávate čas. Konfigurátor s cenou, keď má každá objednávka iné parametre — presne to sme robili pre VYTLAČTO 3D, kde si zákazník nahrá model a cenu spočíta systém. Platba vopred, keď vás trápia nedovolané rezervácie. Nič z toho ale nie je povinné a nemá zmysel to stavať dopredu.", cs: "Nad tím se staví podle toho, co děláte. Kalendář s volnými termíny, když prodáváte čas. Konfigurátor s cenou, když má každá objednávka jiné parametry — přesně to jsme dělali pro VYTLAČTO 3D, kde si zákazník nahraje model a cenu spočítá systém. Platba předem, když vás trápí nedorazivší rezervace. Nic z toho ale není povinné a nemá smysl to stavět dopředu.", en: "On top of that it depends on what you do. A calendar of free slots if you sell time. A configurator with pricing if every order has different parameters — exactly what we built for VYTLAČTO 3D, where the customer uploads a model and the system works out the price. Prepayment if no-shows are your problem. None of it is mandatory and there's no point building it up front.", hu: "Erre épül az, ami az Ön tevékenységétől függ. Naptár szabad időpontokkal, ha időt árul. Konfigurátor árral, ha minden rendelés más paraméterű — pontosan ezt építettük a VYTLAČTO 3D-nek, ahol az ügyfél feltölti a modellt, az árat pedig a rendszer számolja. Előre fizetés, ha a meg nem jelenés a gond. Ebből semmi nem kötelező, és nincs értelme előre megépíteni.", de: "Darauf baut auf, was zu Ihrer Arbeit passt. Ein Kalender mit freien Terminen, wenn Sie Zeit verkaufen. Ein Konfigurator mit Preis, wenn jede Bestellung andere Parameter hat — genau das haben wir für VYTLAČTO 3D gebaut, wo der Kunde ein Modell hochlädt und das System den Preis berechnet. Vorauszahlung, wenn Nichterscheinen Ihr Problem ist. Nichts davon ist Pflicht, und es lohnt nicht, es auf Vorrat zu bauen." },
        ],
      },
      {
        nadpis: { sk: "Pre koho to má zmysel — a pre koho nie", cs: "Pro koho to má smysl — a pro koho ne", en: "Who it makes sense for — and who not", hu: "Kinek van értelme — és kinek nincs", de: "Für wen es sinnvoll ist — und für wen nicht" },
        odstavce: [
          { sk: "Zmysel to dáva, keď objednávky chodia aspoň párkrát denne, keď sa opakuje tá istá otázka dookola, alebo keď na ne odpovedá viac ľudí a nikto nevie, čo už ten druhý potvrdil. Typicky prevádzky so službami na objednávku, malé e-shopy s výrobou na mieru, servisy a všetko, kde sa predáva čas.", cs: "Smysl to dává, když objednávky chodí aspoň párkrát denně, když se opakuje tatáž otázka dokola, nebo když na ně odpovídá víc lidí a nikdo neví, co už ten druhý potvrdil. Typicky provozovny se službami na objednávku, malé e-shopy s výrobou na míru, servisy a všechno, kde se prodává čas.", en: "It makes sense when orders come in at least a few times a day, when the same question keeps repeating, or when several people answer them and nobody knows what the other already confirmed. Typically appointment-based businesses, small made-to-order shops, workshops, and anywhere time is what you sell.", hu: "Akkor van értelme, ha naponta legalább néhányszor érkezik rendelés, ha ugyanaz a kérdés ismétlődik, vagy ha többen válaszolnak rájuk, és senki nem tudja, mit igazolt vissza a másik. Jellemzően időpontos szolgáltatások, kis egyedi gyártású webshopok, szervizek, és minden, ahol az időt adják el.", de: "Sinnvoll ist es, wenn Bestellungen mindestens ein paar Mal täglich kommen, wenn sich dieselbe Frage ständig wiederholt, oder wenn mehrere Leute antworten und niemand weiß, was der andere schon bestätigt hat. Typisch: Terminbetriebe, kleine Shops mit Maßanfertigung, Werkstätten und alles, wo Zeit verkauft wird." },
          { sk: "Zmysel to nedáva, keď máte dve objednávky týždenne a každú riešite polhodinovým telefonátom, pri ktorom aj tak predávate. Vtedy je systém len ďalšia vec, ktorú treba udržiavať. Povieme vám to rovno na konzultácii — radšej, než by sme vám predali niečo, čo nebudete používať.", cs: "Smysl to nedává, když máte dvě objednávky týdně a každou řešíte půlhodinovým telefonátem, při kterém stejně prodáváte. Tehdy je systém jen další věc, kterou je třeba udržovat. Řekneme vám to rovnou na konzultaci — radši, než abychom vám prodali něco, co nebudete používat.", en: "It doesn't make sense if you get two orders a week and handle each with a half-hour call during which you're selling anyway. Then a system is just one more thing to maintain. We'll say so on the consultation — rather than sell you something you won't use.", hu: "Nincs értelme, ha heti két rendelése van, és mindegyiket félórás telefonnal intézi, amely közben amúgy is értékesít. Akkor a rendszer csak egy újabb fenntartandó dolog. A konzultáción ezt megmondjuk — inkább, mint hogy eladjunk valamit, amit nem fog használni.", de: "Nicht sinnvoll ist es, wenn Sie zwei Bestellungen pro Woche haben und jede in einem halbstündigen Telefonat klären, bei dem Sie ohnehin verkaufen. Dann ist ein System nur eine weitere Sache zum Pflegen. Das sagen wir Ihnen im Gespräch — lieber, als Ihnen etwas zu verkaufen, das Sie nicht nutzen." },
        ],
      },
    ],
        ukazky: U("nicepoke", "vytlacto-3d", "risebloom"),
    kroky: KROKY,
    faq: FAQ,
    seo: {
      title: {
        sk: "Rezervačné a objednávkové systémy na mieru",
        cs: "Rezervační a objednávkové systémy na míru",
        en: "Custom booking and ordering systems",
        hu: "Egyedi foglalási és rendelési rendszerek",
        de: "Individuelle Reservierungs- und Bestellsysteme",
      },
      description: {
        sk: "Termíny a objednávky na jednom mieste, bez správ a telefonátov. Bezplatná 30-minútová konzultácia, cena a termín až po nej.",
        cs: "Termíny a objednávky na jednom místě, bez zpráv a telefonátů. Bezplatná 30minutová konzultace, cena a termín až po ní.",
        en: "Bookings and orders in one place, without messages and phone calls. Free 30-minute consultation; price and timeline come after it.",
        hu: "Időpontok és rendelések egy helyen, üzenetek és telefonhívások nélkül. Ingyenes 30 perces konzultáció, az ár és a határidő utána jön.",
        de: "Termine und Bestellungen an einem Ort, ohne Nachrichten und Anrufe. Kostenlose 30-Minuten-Beratung, Preis und Termin danach.",
      },
    },
  },
];

export function getVstupnaStranka(slug: string): VstupnaStranka | undefined {
  return VSTUPNE_STRANKY.find((s) => s.slug === slug);
}

/** Stránka podľa českej adresy. */
export function getVstupnaStrankaCs(slugCs: string): VstupnaStranka | undefined {
  return VSTUPNE_STRANKY.find((s) => s.slugCs === slugCs);
}
