import type { Preklad } from "@/lib/jazyky";

export type Niche = {
  slug: string;
  // Krátky názov odboru pre dlaždice na domovskej stránke.
  label: Preklad;
  headline: Preklad;
  copy: Preklad;
  bullets: Preklad[];
  faq: { q: Preklad; a: Preklad }[];
  seo: { title: Preklad; description: Preklad };
  // Interná poznámka pre nás — nezobrazuje sa na stránke.
  cielStranky?: string;
};

export const niches: Niche[] = [
  {
    slug: "svadobne-salony",
    label: { sk: "Svadobné salóny", en: "Wedding salons", cs: "Svatební salony", hu: "Esküvői szalonok", de: "Brautmodengeschäfte" },
    headline: {
      sk: "Web pre svadobný salón, ktorý zaplní kalendár skúšok",
      en: "A wedding salon website that fills up your fitting calendar",
      cs: "Web pro svatební salon, který zaplní kalendář zkoušek",
      hu: "Weboldal esküvői szalonnak, amely megtölti a próbák naptárát",
      de: "Eine Website für dein Brautmodengeschäft, die den Anprobe-Kalender füllt",
    },
    copy: {
      sk: "Nevesty si salón vyberajú očami — skôr než príďu na skúšku, chcú vidieť tvoje šaty, tvoj štýl a to, že im dokážeš pomôcť práve teraz. Postavíme ti web, ktorý ukáže kolekciu, uľahčí objednanie termínu a funguje rovnako dobre na mobile ako na počítači.",
      en: "Brides pick a salon with their eyes — before they ever book a fitting, they want to see your dresses, your style, and that you can help them right now. We'll build a site that shows off the collection, makes booking a fitting effortless, and works just as well on mobile as on desktop.",
      cs: "Nevěsty si salon vybírají očima — dřív, než přijdou na zkoušku, chtějí vidět tvoje šaty, tvůj styl a to, že jim dokážeš pomoct právě teď. Postavíme ti web, který ukáže kolekci, usnadní objednání termínu a funguje stejně dobře na mobilu jako na počítači.",
      hu: "A menyasszonyok a szemükkel választanak szalont — mielőtt eljönnének próbára, látni akarják a ruháidat, a stílusodat, és azt, hogy most tudsz nekik segíteni. Olyan weboldalt építünk, amely bemutatja a kollekciót, megkönnyíti az időpontfoglalást, és mobilon ugyanolyan jól működik, mint számítógépen.",
      de: "Bräute wählen ein Geschäft mit den Augen — bevor sie zur Anprobe kommen, wollen sie deine Kleider sehen, deinen Stil und dass du ihnen jetzt helfen kannst. Wir bauen dir eine Website, die die Kollektion zeigt, die Terminbuchung erleichtert und auf dem Handy genauso gut funktioniert wie am Computer.",
    },
    bullets: [
      {
        sk: "Galéria šiat, ktorá sa rýchlo načíta aj na mobile",
        en: "A dress gallery that loads fast even on mobile",
        cs: "Galerie šatů, která se rychle načte i na mobilu",
        hu: "Ruhagaléria, amely mobilon is gyorsan betölt",
        de: "Eine Kleidergalerie, die auch auf dem Handy schnell lädt",
      },
      {
        sk: "Jednoduché objednanie termínu skúšky",
        en: "Simple fitting appointment booking",
        cs: "Jednoduché objednání termínu zkoušky",
        hu: "Egyszerű próbaidőpont-foglalás",
        de: "Einfache Buchung von Anprobeterminen",
      },
      {
        sk: "Web nájditeľný na Google, keď niekto hľadá svadobný salón vo vašom meste",
        en: "Findable on Google when someone searches for a wedding salon in your city",
        cs: "Web, který najdou na Googlu, když někdo hledá svatební salon ve vašem městě",
        hu: "Megtalálható a Google-ben, amikor valaki esküvői szalont keres a városában",
        de: "Auf Google auffindbar, wenn jemand ein Brautmodengeschäft in Ihrer Stadt sucht",
      },
    ],
    faq: [
      {
        q: {
          sk: "Viete pracovať s fotkami, ktoré teraz mám na Instagrame?",
          en: "Can you work with the photos I already have on Instagram?",
          cs: "Umíte pracovat s fotkami, které teď mám na Instagramu?",
          hu: "Tudtok dolgozni azokkal a fotókkal, amelyek most az Instagramomon vannak?",
          de: "Könnt ihr mit den Fotos arbeiten, die ich gerade auf Instagram habe?",
        },
        a: {
          sk: "Áno, vieme vychádzať z fotiek, ktoré už máš na Instagrame alebo inde online — prípadne ti poradíme, čo by stálo za to doplniť.",
          en: "Yes, we can work from the photos you already have on Instagram or elsewhere online — and suggest what's worth adding.",
          cs: "Ano, umíme vycházet z fotek, které už máš na Instagramu nebo jinde online — případně ti poradíme, co by stálo za to doplnit.",
          hu: "Igen, ki tudunk indulni azokból a fotókból, amelyek már fent vannak az Instagramodon vagy máshol online — és tanácsot adunk, mit érdemes kiegészíteni.",
          de: "Ja, wir können mit den Fotos arbeiten, die du schon auf Instagram oder anderswo online hast — und dir sagen, was sich zu ergänzen lohnt.",
        },
      },
      {
        q: {
          sk: "Dá sa cez web priamo rezervovať termín skúšky?",
          en: "Can visitors book a fitting appointment directly on the site?",
          cs: "Dá se přes web přímo rezervovat termín zkoušky?",
          hu: "Lehet a weboldalon közvetlenül próbaidőpontot foglalni?",
          de: "Kann man über die Website direkt einen Anprobetermin buchen?",
        },
        a: {
          sk: "Áno, vieme na web napojiť jednoduchý rezervačný formulár alebo prepojenie na kalendár, aby si nevesty mohli termín dohodnúť priamo online.",
          en: "Yes, we can add a simple booking form or calendar integration so brides can arrange a fitting directly online.",
          cs: "Ano, umíme na web napojit jednoduchý rezervační formulář nebo propojení s kalendářem, aby si nevěsty mohly termín domluvit přímo online.",
          hu: "Igen, egyszerű foglalási űrlapot vagy naptár-összekapcsolást tudunk a weboldalhoz adni, hogy a menyasszonyok közvetlenül online egyeztethessenek időpontot.",
          de: "Ja, wir können ein einfaches Buchungsformular oder eine Kalenderanbindung einbauen, damit Bräute ihren Termin direkt online vereinbaren können.",
        },
      },
    ],
    seo: {
      title: {
        sk: "Weby pre svadobné salóny | DNABS",
        en: "Websites for wedding salons | DNABS",
        cs: "Weby pro svatební salony | DNABS",
        hu: "Weboldalak esküvői szalonoknak | DNABS",
        de: "Websites für Brautmodengeschäfte | DNABS",
      },
      description: {
        sk: "Polhodinová konzultácia pre váš svadobný salón — zadarmo. Galéria, rezervácia termínov, mobil aj Google.",
        en: "A 30-minute consultation for your wedding salon — free. Gallery, appointment booking, mobile and Google ready.",
        cs: "Půlhodinová konzultace pro váš svatební salon — zdarma. Galerie, rezervace termínů, mobil i Google.",
        hu: "Félórás konzultáció az esküvői szalonjának — ingyen. Galéria, időpontfoglalás, mobil és Google.",
        de: "Halbstündige Beratung für Ihr Brautmodengeschäft — kostenlos. Galerie, Terminbuchung, Handy und Google.",
      },
    },
    cielStranky: "Konverzia: dopyt na bezplatnú 30-minútovú konzultáciu cez kontaktný formulár.",
  },
  {
    slug: "restauracie",
    label: { sk: "Reštaurácie", en: "Restaurants", cs: "Restaurace", hu: "Éttermek", de: "Restaurants" },
    headline: {
      sk: "Web pre reštauráciu, ktorý priláka hostí namiesto tabuľky v PDF",
      en: "A restaurant website that brings in guests instead of a PDF menu",
      cs: "Web pro restauraci, který přiláká hosty místo tabulky v PDF",
      hu: "Weboldal étteremnek, amely vendégeket vonz egy PDF-táblázat helyett",
      de: "Eine Restaurant-Website, die Gäste anlockt statt einer PDF-Tabelle",
    },
    copy: {
      sk: "Keď si niekto vyhľadá reštauráciu na telefóne pred rezerváciou stola, rozhoduje sa v priebehu pár sekúnd. Menu, fotky, otváracie hodiny a možnosť rezervácie musia byť jasné hneď po otvorení stránky — inak si vyberie inú prevádzku.",
      en: "When someone searches for a restaurant on their phone before booking a table, they decide within seconds. The menu, photos, opening hours and a way to reserve a table need to be obvious the moment the page loads — otherwise they'll pick somewhere else.",
      cs: "Když si někdo vyhledá restauraci na telefonu před rezervací stolu, rozhoduje se během pár sekund. Menu, fotky, otevírací doba a možnost rezervace musí být jasné hned po otevření stránky — jinak si vybere jiný podnik.",
      hu: "Amikor valaki asztalfoglalás előtt a telefonján keres éttermet, néhány másodperc alatt dönt. Az étlapnak, a fotóknak, a nyitvatartásnak és a foglalási lehetőségnek az oldal megnyitásakor azonnal egyértelműnek kell lennie — különben máshová megy.",
      de: "Wenn jemand vor einer Tischreservierung auf dem Handy nach einem Restaurant sucht, entscheidet er in wenigen Sekunden. Speisekarte, Fotos, Öffnungszeiten und Reservierungsmöglichkeit müssen sofort nach dem Öffnen der Seite klar sein — sonst wählt er ein anderes Lokal.",
    },
    bullets: [
      {
        sk: "Prehľadné menu, ktoré si kedykoľvek sami jednoducho upravíte",
        en: "A clear menu you can update yourself anytime",
        cs: "Přehledné menu, které si kdykoli sami jednoduše upravíte",
        hu: "Áttekinthető étlap, amelyet bármikor egyszerűen maga is módosíthat",
        de: "Eine übersichtliche Speisekarte, die Sie jederzeit selbst anpassen können",
      },
      {
        sk: "Rezervácia stola priamo z webu",
        en: "Table reservations straight from the site",
        cs: "Rezervace stolu přímo z webu",
        hu: "Asztalfoglalás közvetlenül a weboldalról",
        de: "Tischreservierung direkt über die Website",
      },
      {
        sk: "Fotky jedál a interiéru, ktoré lákajú aj na malej obrazovke",
        en: "Food and interior photos that look appetizing even on a small screen",
        cs: "Fotky jídel a interiéru, které lákají i na malé obrazovce",
        hu: "Ételek és a belső tér fotói, amelyek kis képernyőn is csábítanak",
        de: "Fotos von Gerichten und Interieur, die auch auf kleinen Bildschirmen Appetit machen",
      },
    ],
    faq: [
      {
        q: {
          sk: "Viem si menu meniť sám, keď zmeníte cenník?",
          en: "Can I update the menu myself when prices change?",
          cs: "Můžu si menu měnit sám, když změním ceník?",
          hu: "Módosíthatom magam az étlapot, ha változnak az árak?",
          de: "Kann ich die Speisekarte selbst ändern, wenn sich die Preise ändern?",
        },
        a: {
          sk: "Áno, po odovzdaní webu si menu vieš jednoducho upravovať sám, prípadne ti radi pomôžeme s úpravou kedykoľvek to budeš potrebovať.",
          en: "Yes, once the site is delivered you can update the menu yourself, or we're happy to help with changes whenever you need.",
          cs: "Ano, po předání webu si menu můžeš jednoduše upravovat sám, případně ti rádi pomůžeme s úpravou, kdykoli to budeš potřebovat.",
          hu: "Igen, a weboldal átadása után az étlapot egyszerűen magad is módosíthatod, vagy szívesen segítünk, amikor csak szükséged van rá.",
          de: "Ja, nach der Übergabe kannst du die Speisekarte einfach selbst bearbeiten, oder wir helfen dir gern, wann immer du es brauchst.",
        },
      },
      {
        q: {
          sk: "Dá sa napojiť online rezervácia stola?",
          en: "Can online table reservations be added?",
          cs: "Dá se napojit online rezervace stolu?",
          hu: "Be lehet kötni online asztalfoglalást?",
          de: "Lässt sich eine Online-Tischreservierung einbinden?",
        },
        a: {
          sk: "Áno, vieme pridať jednoduchý rezervačný formulár priamo na web, prípadne ho prepojiť s existujúcim rezervačným systémom, ak už nejaký používate.",
          en: "Yes, we can add a simple reservation form directly to the site, or integrate it with a reservation system you already use.",
          cs: "Ano, umíme přidat jednoduchý rezervační formulář přímo na web, případně ho propojit s existujícím rezervačním systémem, pokud už nějaký používáte.",
          hu: "Igen, egyszerű foglalási űrlapot tudunk közvetlenül a weboldalra tenni, vagy összekapcsolni egy meglévő foglalási rendszerrel, ha már használnak ilyet.",
          de: "Ja, wir können ein einfaches Reservierungsformular direkt auf der Website einbauen oder es mit einem bestehenden Reservierungssystem verbinden, falls Sie schon eines nutzen.",
        },
      },
    ],
    seo: {
      title: {
        sk: "Weby pre reštaurácie | DNABS",
        en: "Websites for restaurants | DNABS",
        cs: "Weby pro restaurace | DNABS",
        hu: "Weboldalak éttermeknek | DNABS",
        de: "Websites für Restaurants | DNABS",
      },
      description: {
        sk: "Polhodinová konzultácia pre vašu reštauráciu — zadarmo. Menu, rezervácie, fotky, ktoré predávajú.",
        en: "A 30-minute consultation for your restaurant — free. Menu, reservations, photos that sell.",
        cs: "Půlhodinová konzultace pro vaši restauraci — zdarma. Menu, rezervace, fotky, které prodávají.",
        hu: "Félórás konzultáció az éttermének — ingyen. Étlap, foglalás, fotók, amelyek eladnak.",
        de: "Halbstündige Beratung für Ihr Restaurant — kostenlos. Speisekarte, Reservierungen, Fotos, die verkaufen.",
      },
    },
    cielStranky: "Konverzia: dopyt na bezplatnú 30-minútovú konzultáciu cez kontaktný formulár.",
  },
  {
    slug: "autoservisy",
    label: { sk: "Autoservisy", en: "Auto service shops", cs: "Autoservisy", hu: "Autószervizek", de: "Autowerkstätten" },
    headline: {
      sk: "Web pre autoservis, ktorý dvíha telefón namiesto konkurencie",
      en: "An auto service website that gets the phone ringing instead of your competitor's",
      cs: "Web pro autoservis, který zvedá telefon místo konkurence",
      hu: "Weboldal autószerviznek, amelynél a te telefonod csörög a konkurencia helyett",
      de: "Eine Website für deine Autowerkstatt, bei der dein Telefon klingelt statt das der Konkurrenz",
    },
    copy: {
      sk: "Väčšina ľudí si servis vyberá podľa toho, čo nájde na Google v momente, keď im niečo v aute zahučí. Web s jasným zoznamom služieb, cenami a možnosťou rýchlo napísať alebo zavolať rozhoduje o tom, či sa ozvú vám, alebo susednej dielni.",
      en: "Most people pick a service shop based on whatever they find on Google the moment something starts rattling in their car. A site with a clear list of services, pricing and a fast way to call or message decides whether they contact you or the shop next door.",
      cs: "Většina lidí si servis vybírá podle toho, co najde na Googlu ve chvíli, kdy jim něco v autě zahučí. Web s jasným seznamem služeb, cenami a možností rychle napsat nebo zavolat rozhoduje o tom, jestli se ozvou vám, nebo sousední dílně.",
      hu: "A legtöbben aszerint választanak szervizt, amit a Google-ben találnak abban a pillanatban, amikor valami zúgni kezd az autójukban. Egy weboldal, ahol világos a szolgáltatások listája, az árak, és gyorsan lehet írni vagy telefonálni, eldönti, hogy Önt hívják-e, vagy a szomszéd műhelyt.",
      de: "Die meisten Leute wählen eine Werkstatt nach dem, was sie auf Google finden, sobald es im Auto brummt. Eine Website mit klarer Leistungsliste, Preisen und einer schnellen Möglichkeit zu schreiben oder anzurufen entscheidet, ob sie sich bei Ihnen melden oder bei der Werkstatt nebenan.",
    },
    bullets: [
      {
        sk: "Prehľadný zoznam služieb a orientačné ceny",
        en: "A clear list of services and ballpark pricing",
        cs: "Přehledný seznam služeb a orientační ceny",
        hu: "Áttekinthető szolgáltatáslista és irányárak",
        de: "Übersichtliche Leistungsliste und Richtpreise",
      },
      {
        sk: "Tlačidlo na rýchle zavolanie priamo z mobilu",
        en: "A one-tap call button on mobile",
        cs: "Tlačítko pro rychlé zavolání přímo z mobilu",
        hu: "Gomb a gyors híváshoz közvetlenül a mobilról",
        de: "Ein Button zum schnellen Anrufen direkt vom Handy",
      },
      {
        sk: "Web, ktorý sa zobrazí vo vyhľadávaní, keď niekto hľadá servis vo vašom okolí",
        en: "A site that shows up in search when someone looks for a shop nearby",
        cs: "Web, který se zobrazí ve vyhledávání, když někdo hledá servis ve vašem okolí",
        hu: "Weboldal, amely megjelenik a keresésben, amikor valaki szervizt keres a környéken",
        de: "Eine Website, die in der Suche erscheint, wenn jemand eine Werkstatt in Ihrer Nähe sucht",
      },
    ],
    faq: [
      {
        q: {
          sk: "Viete pridať aj orientačný cenník opráv?",
          en: "Can you add a ballpark repair price list?",
          cs: "Umíte přidat i orientační ceník oprav?",
          hu: "Fel tudtok tenni irányadó javítási árlistát is?",
          de: "Könnt ihr auch eine Richtpreisliste für Reparaturen einbauen?",
        },
        a: {
          sk: "Áno, vieme pridať prehľadný zoznam služieb s orientačnými cenami, aby zákazníci hneď vedeli, na čom sú.",
          en: "Yes, we can add a clear list of services with ballpark pricing so customers know what to expect right away.",
          cs: "Ano, umíme přidat přehledný seznam služeb s orientačními cenami, aby zákazníci hned věděli, na čem jsou.",
          hu: "Igen, fel tudunk tenni egy áttekinthető szolgáltatáslistát irányárakkal, hogy az ügyfelek azonnal tudják, mire számíthatnak.",
          de: "Ja, wir können eine übersichtliche Leistungsliste mit Richtpreisen einbauen, damit Kunden sofort wissen, woran sie sind.",
        },
      },
      {
        q: {
          sk: "Dá sa na web napojiť objednávací formulár na servis?",
          en: "Can a service booking form be added to the site?",
          cs: "Dá se na web napojit objednávkový formulář na servis?",
          hu: "Be lehet kötni a weboldalra szervizbejelentkezési űrlapot?",
          de: "Lässt sich ein Buchungsformular für den Service einbinden?",
        },
        a: {
          sk: "Áno, vieme pridať jednoduchý objednávkový formulár, cez ktorý si zákazníci dohodnú termín priamo z webu.",
          en: "Yes, we can add a simple booking form so customers can arrange an appointment directly from the site.",
          cs: "Ano, umíme přidat jednoduchý objednávkový formulář, přes který si zákazníci domluví termín přímo z webu.",
          hu: "Igen, egyszerű bejelentkezési űrlapot tudunk hozzáadni, amelyen keresztül az ügyfelek közvetlenül a weboldalról foglalhatnak időpontot.",
          de: "Ja, wir können ein einfaches Buchungsformular einbauen, über das Kunden ihren Termin direkt auf der Website vereinbaren.",
        },
      },
    ],
    seo: {
      title: {
        sk: "Weby pre autoservisy | DNABS",
        en: "Websites for auto service shops | DNABS",
        cs: "Weby pro autoservisy | DNABS",
        hu: "Weboldalak autószervizeknek | DNABS",
        de: "Websites für Autowerkstätten | DNABS",
      },
      description: {
        sk: "Polhodinová konzultácia pre váš autoservis — zadarmo. Služby, ceny, rýchly kontakt z mobilu.",
        en: "A 30-minute consultation for your auto service shop — free. Services, pricing, fast mobile contact.",
        cs: "Půlhodinová konzultace pro váš autoservis — zdarma. Služby, ceny, rychlý kontakt z mobilu.",
        hu: "Félórás konzultáció az autószervizének — ingyen. Szolgáltatások, árak, gyors kapcsolat mobilról.",
        de: "Halbstündige Beratung für Ihre Autowerkstatt — kostenlos. Leistungen, Preise, schneller Kontakt vom Handy.",
      },
    },
    cielStranky: "Konverzia: dopyt na bezplatnú 30-minútovú konzultáciu cez kontaktný formulár.",
  },
];

export function getNiche(slug: string) {
  return niches.find((n) => n.slug === slug);
}
