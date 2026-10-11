import type { Preklad } from "@/lib/jazyky";

export type OnasChapter = {
  num: string;
  image: string;
  imageAlt: Preklad;
  kicker: Preklad;
  headline: Preklad;
  paragraphs: Preklad[];
};

export const onasChapters: OnasChapter[] = [
  {
    num: "01",
    image: "/png/DNABS_1.png",
    imageAlt: { sk: "Šachový kráľ ako symbol stratégie", en: "A chess king as a symbol of strategy", cs: "Šachový král jako symbol strategie", hu: "Sakkkirály mint a stratégia szimbóluma", de: "Ein Schachkönig als Symbol für Strategie" },
    kicker: { sk: "Kapitola 01 — Stratégia", en: "Chapter 01 — Strategy", cs: "Kapitola 01 — Strategie", hu: "01. fejezet — Stratégia", de: "Kapitel 01 — Strategie" },
    headline: {
      sk: "Web nie je náhoda. Je to premyslený ťah.",
      en: "A website isn't luck. It's a calculated move.",
      cs: "Web není náhoda. Je to promyšlený tah.",
      hu: "A weboldal nem a véletlen műve. Átgondolt lépés.",
      de: "Eine Website ist kein Zufall. Sie ist ein durchdachter Zug.",
    },
    paragraphs: [
      {
        sk: "Skôr než napíšeme jediný riadok kódu, pýtame sa: kto je tvoj zákazník, čo hľadá a prečo by mal skončiť práve na tvojom webe. Tvorba webových stránok bez stratégie je ako hra bez plánu — vyzerá to dobre, kým sa nezačne hrať doopravdy. Preto každý projekt — jednoduchá prezentačná stránka, firemný web, alebo komplexný e-shop — začína analýzou konkurencie, cieľovej skupiny a kľúčových slov, podľa ktorých ťa zákazníci reálne hľadajú na Googli.",
        en: "Before we write a single line of code, we ask: who is your customer, what are they looking for, and why should they land on your site specifically. Building a website without strategy is like playing a game without a plan — it looks fine until the game actually starts. That's why every project — a simple landing page, a company website, or a full e-shop — begins with competitor analysis, audience research, and the actual keywords your customers use to find you on Google.",
        cs: "Dřív než napíšeme jediný řádek kódu, ptáme se: kdo je tvůj zákazník, co hledá a proč by měl skončit právě na tvém webu. Tvorba webových stránek bez strategie je jako hra bez plánu — vypadá to dobře, dokud se nezačne hrát doopravdy. Proto každý projekt — jednoduchá prezentační stránka, firemní web nebo komplexní e-shop — začíná analýzou konkurence, cílové skupiny a klíčových slov, podle kterých tě zákazníci reálně hledají na Googlu.",
        hu: "Mielőtt egyetlen sor kódot írnánk, megkérdezzük: ki a vásárlód, mit keres, és miért éppen a te weboldaladon kötne ki. Weboldalt stratégia nélkül készíteni olyan, mint terv nélkül játszani — jól néz ki, amíg nem kezdődik el igazán a játék. Ezért minden projekt — legyen az egyszerű bemutatkozó oldal, céges weboldal vagy összetett webáruház — a konkurencia, a célcsoport és azoknak a kulcsszavaknak az elemzésével kezdődik, amelyekkel a vásárlók valójában keresnek téged a Google-ben.",
        de: "Bevor wir eine einzige Zeile Code schreiben, fragen wir: Wer ist dein Kunde, was sucht er und warum sollte er ausgerechnet auf deiner Website landen? Eine Website ohne Strategie zu bauen ist wie ein Spiel ohne Plan — es sieht gut aus, bis das Spiel wirklich beginnt. Deshalb beginnt jedes Projekt — ob einfache Präsentationsseite, Firmenwebsite oder komplexer Onlineshop — mit einer Analyse der Konkurrenz, der Zielgruppe und der Suchbegriffe, mit denen dich Kunden tatsächlich auf Google finden.",
      },
      {
        sk: "Výsledkom nie je len pekný dizajn, ale webová stránka postavená tak, aby konvertovala návštevníkov na zákazníkov. Premyslená štruktúra, jasná ponuka a technické SEO nastavenie od prvého dňa — to je rozdiel medzi webom, ktorý len existuje, a webom, ktorý reálne prináša dopyty.",
        en: "The result isn't just a good-looking design — it's a website built to convert visitors into customers. A deliberate structure, a clear offer, and technical SEO from day one: that's the difference between a website that merely exists and one that actually brings in leads.",
        cs: "Výsledkem není jen pěkný design, ale webová stránka postavená tak, aby konvertovala návštěvníky na zákazníky. Promyšlená struktura, jasná nabídka a technické nastavení SEO od prvního dne — to je rozdíl mezi webem, který jen existuje, a webem, který reálně přináší poptávky.",
        hu: "Az eredmény nem csupán egy szép dizájn, hanem olyan weboldal, amely a látogatókat vásárlókká alakítja. Átgondolt szerkezet, világos ajánlat és technikai SEO az első naptól — ez a különbség a csak létező weboldal és a valóban ajánlatkéréseket hozó weboldal között.",
        de: "Das Ergebnis ist nicht nur ein schönes Design, sondern eine Website, die Besucher zu Kunden macht. Eine durchdachte Struktur, ein klares Angebot und technisches SEO ab dem ersten Tag — das ist der Unterschied zwischen einer Website, die nur existiert, und einer, die wirklich Anfragen bringt.",
      },
    ],
  },
  {
    num: "02",
    image: "/png/DNABS_5.png",
    imageAlt: { sk: "Croissant ako symbol remesla a detailu", en: "A croissant as a symbol of craft and detail", cs: "Croissant jako symbol řemesla a detailu", hu: "Croissant mint a mesterség és a részletek szimbóluma", de: "Ein Croissant als Symbol für Handwerk und Detail" },
    kicker: { sk: "Kapitola 02 — Remeslo", en: "Chapter 02 — Craft", cs: "Kapitola 02 — Řemeslo", hu: "02. fejezet — Mesterség", de: "Kapitel 02 — Handwerk" },
    headline: {
      sk: "Detail rozhoduje o tom, či web pôsobí lacno, alebo profesionálne.",
      en: "Detail is what makes a website feel cheap — or professional.",
      cs: "Detail rozhoduje o tom, jestli web působí levně, nebo profesionálně.",
      hu: "A részleteken múlik, hogy egy weboldal olcsónak vagy profinak hat.",
      de: "Das Detail entscheidet, ob eine Website billig oder professionell wirkt.",
    },
    paragraphs: [
      {
        sk: "Dobrý croissant nevznikne narýchlo — vrstvy cesta, presný čas a teplota rozhodujú o výsledku. Rovnako pristupujeme k webdesignu a vývoju: každý detail, od typografie cez rozostupy až po rýchlosť načítania stránky, má svoje miesto a svoj dôvod. Pixel, ktorý je o milimeter mimo, si možno nevšimneš vedome — ale podvedome ho zaregistruje každý návštevník tvojho webu.",
        en: "A good croissant isn't rushed — the layers of dough, the exact timing and temperature decide the outcome. We approach web design and development the same way: every detail, from typography to spacing to page load speed, has its place and its reason. A pixel that's a millimeter off might not register consciously — but every visitor feels it subconsciously.",
        cs: "Dobrý croissant nevznikne narychlo — vrstvy těsta, přesný čas a teplota rozhodují o výsledku. Stejně přistupujeme k webdesignu a vývoji: každý detail, od typografie přes rozestupy až po rychlost načítání stránky, má své místo a svůj důvod. Pixel, který je o milimetr vedle, si možná vědomě nevšimneš — ale podvědomě ho zaregistruje každý návštěvník tvého webu.",
        hu: "Egy jó croissant nem készül el sietve — a tésztarétegek, a pontos idő és a hőmérséklet döntik el az eredményt. Ugyanígy állunk a webdizájnhoz és a fejlesztéshez: minden részletnek, a tipográfiától a térközökön át az oldal betöltési sebességéig, megvan a helye és az oka. Egy milliméterrel elcsúszott pixelt talán tudatosan nem veszel észre — de tudat alatt a weboldalad minden látogatója érzékeli.",
        de: "Ein gutes Croissant entsteht nicht in Eile — die Teigschichten, die genaue Zeit und die Temperatur entscheiden über das Ergebnis. Genauso gehen wir an Webdesign und Entwicklung heran: Jedes Detail, von der Typografie über die Abstände bis zur Ladezeit, hat seinen Platz und seinen Grund. Ein Pixel, der einen Millimeter daneben liegt, fällt dir vielleicht nicht bewusst auf — aber jeder Besucher deiner Website nimmt ihn unbewusst wahr.",
      },
      {
        sk: "Pracujeme s modernými technológiami (Next.js, React), ktoré zabezpečia, že tvoja stránka bude rýchla, responzívna na mobile aj desktope, a pripravená rásť spolu s tvojou firmou. Remeslo nie je o tom robiť veľa vecí naraz — je to o tom robiť správne veci poriadne.",
        en: "We build with modern technology (Next.js, React) that keeps your site fast, responsive on mobile and desktop, and ready to grow alongside your business. Craft isn't about doing many things at once — it's about doing the right things properly.",
        cs: "Pracujeme s moderními technologiemi (Next.js, React), které zajistí, že tvoje stránka bude rychlá, responzivní na mobilu i desktopu a připravená růst spolu s tvou firmou. Řemeslo není o tom dělat hodně věcí najednou — je o tom dělat správné věci pořádně.",
        hu: "Modern technológiákkal (Next.js, React) dolgozunk, amelyek biztosítják, hogy az oldalad gyors legyen, mobilon és asztali gépen is reszponzív, és készen álljon a céged növekedésére. A mesterség nem arról szól, hogy sok mindent csinálunk egyszerre — hanem arról, hogy a helyes dolgokat alaposan csináljuk.",
        de: "Wir arbeiten mit modernen Technologien (Next.js, React), die dafür sorgen, dass deine Seite schnell ist, auf Handy und Desktop responsiv und bereit, mit deinem Unternehmen zu wachsen. Handwerk heißt nicht, viele Dinge gleichzeitig zu tun — sondern die richtigen Dinge ordentlich.",
      },
    ],
  },
  {
    num: "03",
    image: "/png/DNABS_2.png",
    imageAlt: { sk: "Mrakodrap ako symbol rastu", en: "A skyscraper as a symbol of growth", cs: "Mrakodrap jako symbol růstu", hu: "Felhőkarcoló mint a növekedés szimbóluma", de: "Ein Wolkenkratzer als Symbol für Wachstum" },
    kicker: { sk: "Kapitola 03 — Rast", en: "Chapter 03 — Growth", cs: "Kapitola 03 — Růst", hu: "03. fejezet — Növekedés", de: "Kapitel 03 — Wachstum" },
    headline: {
      sk: "Digitál, čo rastie s tebou — nie web, ktorý o rok prerastieš.",
      en: "Digital that grows with you — not a website you'll outgrow in a year.",
      cs: "Digitál, který roste s tebou — ne web, který za rok přerosteš.",
      hu: "Digitális jelenlét, amely veled nő — nem egy weboldal, amelyet egy év alatt kinősz.",
      de: "Digitales, das mit dir wächst — keine Website, aus der du in einem Jahr herausgewachsen bist.",
    },
    paragraphs: [
      {
        sk: "Mnoho malých a stredných firiem na Slovensku má web, ktorý im niekto spravil pred piatimi rokmi a odvtedy sa ho nikto nedotkol. Medzitým sa zmenilo všetko — mobilné vyhľadávanie, nároky Googlu na rýchlosť, aj to, ako ľudia nakupujú online. Staviame weby a e-shopy na architektúre, ktorá sa dá rozširovať — pridať nový jazyk, novú sekciu, nový spôsob platby — bez toho, aby sme museli stavať odznova.",
        en: "Many small and mid-sized businesses in Slovakia have a website someone built them five years ago and nobody's touched since. Meanwhile everything changed — mobile search, Google's speed requirements, and how people shop online. We build websites and e-shops on architecture that can expand — a new language, a new section, a new payment method — without rebuilding from scratch.",
        cs: "Mnoho malých a středních firem na Slovensku má web, který jim někdo udělal před pěti lety a od té doby se ho nikdo nedotkl. Mezitím se změnilo všechno — mobilní vyhledávání, nároky Googlu na rychlost i to, jak lidé nakupují online. Stavíme weby a e-shopy na architektuře, kterou lze rozšiřovat — přidat nový jazyk, novou sekci, nový způsob platby — aniž bychom museli stavět znovu.",
        hu: "Sok szlovákiai kis- és középvállalkozásnak olyan weboldala van, amelyet valaki öt éve készített nekik, és azóta senki sem nyúlt hozzá. Közben minden megváltozott — a mobilos keresés, a Google sebességigényei, és az is, ahogyan az emberek online vásárolnak. Olyan architektúrára építünk weboldalakat és webáruházakat, amely bővíthető — új nyelv, új szekció, új fizetési mód — anélkül, hogy elölről kellene kezdeni.",
        de: "Viele kleine und mittlere Unternehmen in der Slowakei haben eine Website, die ihnen vor fünf Jahren jemand gebaut hat und die seitdem niemand angefasst hat. Inzwischen hat sich alles verändert — die mobile Suche, Googles Anforderungen an die Geschwindigkeit und die Art, wie Menschen online einkaufen. Wir bauen Websites und Onlineshops auf einer Architektur, die sich erweitern lässt — eine neue Sprache, ein neuer Bereich, eine neue Zahlungsart — ohne alles neu bauen zu müssen.",
      },
      {
        sk: "To isté platí pre digitálny marketing: kampane a SEO stratégia sa priebežne vyhodnocujú podľa reálnych dát, nie podľa pocitu. Rast nie je jednorazová udalosť, je to spôsob, akým je tvoja digitálna prítomnosť od základu postavená.",
        en: "The same applies to digital marketing: campaigns and SEO strategy get evaluated continuously against real data, not gut feeling. Growth isn't a one-time event — it's how your digital presence is built from the ground up.",
        cs: "Totéž platí pro digitální marketing: kampaně a SEO strategie se průběžně vyhodnocují podle reálných dat, ne podle pocitu. Růst není jednorázová událost, je to způsob, jakým je tvoje digitální přítomnost od základu postavená.",
        hu: "Ugyanez érvényes a digitális marketingre: a kampányokat és a SEO-stratégiát folyamatosan valós adatok alapján értékeljük, nem megérzésből. A növekedés nem egyszeri esemény, hanem az, ahogyan a digitális jelenléted az alapoktól fel van építve.",
        de: "Dasselbe gilt für digitales Marketing: Kampagnen und SEO-Strategie werden laufend anhand echter Daten ausgewertet, nicht nach Gefühl. Wachstum ist kein einmaliges Ereignis — es ist die Art, wie deine digitale Präsenz von Grund auf gebaut ist.",
      },
    ],
  },
  {
    num: "04",
    image: "/png/DNABS_4.png",
    imageAlt: {
      sk: "Mramorová busta s telefónom ako symbol tradície stretávajúcej digitál",
      en: "A marble bust with a phone as a symbol of tradition meeting digital",
      cs: "Mramorová busta s telefonem jako symbol tradice, která potkává digitál",
      hu: "Márvány mellszobor telefonnal mint a hagyomány és a digitális világ találkozásának szimbóluma",
      de: "Eine Marmorbüste mit Handy als Symbol für Tradition, die auf Digitales trifft",
    },
    kicker: { sk: "Kapitola 04 — Tradícia stretáva digitál", en: "Chapter 04 — Tradition meets digital", cs: "Kapitola 04 — Tradice potkává digitál", hu: "04. fejezet — A hagyomány találkozik a digitálissal", de: "Kapitel 04 — Tradition trifft Digital" },
    headline: {
      sk: "Nezáleží, ako dlho podnikáš — záleží, či ťa nájdu online.",
      en: "It doesn't matter how long you've been in business — it matters whether people can find you online.",
      cs: "Nezáleží na tom, jak dlouho podnikáš — záleží na tom, jestli tě najdou online.",
      hu: "Nem az számít, mióta vállalkozol — hanem az, hogy megtalálnak-e online.",
      de: "Es kommt nicht darauf an, wie lange du schon im Geschäft bist — sondern darauf, ob man dich online findet.",
    },
    paragraphs: [
      {
        sk: "Reštaurácia s tridsaťročnou tradíciou, rodinný autoservis, svadobný salón, ktorý si ľudia odovzdávajú z ruky do ruky — to všetko sú firmy, ktoré vedia, čo robia, ale ich web tomu často nezodpovedá. Digitalizácia neznamená zahodiť to, čo funguje. Znamená to ukázať to isté remeslo a tú istú dôveryhodnosť aj človeku, ktorý vás prvýkrát vidí na mobile, cez Google vyhľadávanie o desiatej večer.",
        en: "A restaurant with thirty years of tradition, a family-run auto shop, a wedding salon people pass along by word of mouth — these are businesses that know their craft, but their website often doesn't show it. Going digital doesn't mean throwing away what works. It means showing that same craft and trustworthiness to someone seeing you for the first time on their phone, through a Google search at ten at night.",
        cs: "Restaurace s třicetiletou tradicí, rodinný autoservis, svatební salon, který si lidé předávají z ruky do ruky — to všechno jsou firmy, které vědí, co dělají, ale jejich web tomu často neodpovídá. Digitalizace neznamená zahodit to, co funguje. Znamená ukázat stejné řemeslo a stejnou důvěryhodnost i člověku, který vás poprvé vidí na mobilu, přes vyhledávání Google v deset večer.",
        hu: "Egy harmincéves hagyománnyal rendelkező étterem, egy családi autószerviz, egy esküvői szalon, amelyet szájról szájra ajánlanak — ezek mind olyan cégek, amelyek tudják, mit csinálnak, de a weboldaluk ezt gyakran nem tükrözi. A digitalizáció nem azt jelenti, hogy eldobjuk, ami működik. Azt jelenti, hogy ugyanazt a szakértelmet és megbízhatóságot megmutatjuk annak is, aki először lát minket a mobilján, egy esti tízórás Google-keresés során.",
        de: "Ein Restaurant mit dreißigjähriger Tradition, eine familiengeführte Autowerkstatt, ein Brautmodengeschäft, das man sich weiterempfiehlt — all das sind Unternehmen, die wissen, was sie tun, aber ihre Website spiegelt das oft nicht wider. Digitalisierung heißt nicht, wegzuwerfen, was funktioniert. Sie heißt, dasselbe Handwerk und dieselbe Vertrauenswürdigkeit auch jemandem zu zeigen, der Sie zum ersten Mal auf dem Handy sieht, über eine Google-Suche um zehn Uhr abends.",
      },
      {
        sk: "Preto robíme weby pre konkrétne odvetvia — reštaurácie, svadobné salóny, autoservisy a ďalšie lokálne prevádzky — tak, aby hovorili jazykom ich zákazníkov a ukázali sa vo vyhľadávaní presne vtedy, keď ich niekto potrebuje.",
        en: "That's why we build websites for specific industries — restaurants, wedding salons, auto service shops and other local businesses — so they speak their customers' language and show up in search exactly when someone needs them.",
        cs: "Proto děláme weby pro konkrétní obory — restaurace, svatební salony, autoservisy a další místní provozovny — tak, aby mluvily jazykem jejich zákazníků a ukázaly se ve vyhledávání přesně tehdy, když je někdo potřebuje.",
        hu: "Ezért készítünk weboldalakat konkrét ágazatoknak — éttermeknek, esküvői szalonoknak, autószervizeknek és más helyi vállalkozásoknak — úgy, hogy az ügyfeleik nyelvén szóljanak, és pontosan akkor jelenjenek meg a keresésben, amikor valakinek szüksége van rájuk.",
        de: "Deshalb bauen wir Websites für bestimmte Branchen — Restaurants, Brautmodengeschäfte, Autowerkstätten und andere lokale Betriebe — so, dass sie die Sprache ihrer Kunden sprechen und genau dann in der Suche erscheinen, wenn jemand sie braucht.",
      },
    ],
  },
  {
    num: "05",
    image: "/png/DNABS_3.png",
    imageAlt: { sk: "Sako bez tela ako symbol výsledku bez ega", en: "A bodiless blazer as a symbol of results without ego", cs: "Sako bez těla jako symbol výsledku bez ega", hu: "Test nélküli zakó mint az ego nélküli eredmény szimbóluma", de: "Ein Sakko ohne Körper als Symbol für Ergebnisse ohne Ego" },
    kicker: { sk: "Kapitola 05 — Výsledok", en: "Chapter 05 — Result", cs: "Kapitola 05 — Výsledek", hu: "05. fejezet — Eredmény", de: "Kapitel 05 — Ergebnis" },
    headline: {
      sk: "Nepredávame hodiny práce. Predávame výsledok.",
      en: "We don't sell hours of work. We sell results.",
      cs: "Neprodáváme hodiny práce. Prodáváme výsledek.",
      hu: "Nem munkaórákat árulunk. Eredményt.",
      de: "Wir verkaufen keine Arbeitsstunden. Wir verkaufen Ergebnisse.",
    },
    paragraphs: [
      {
        sk: "Sako, ktoré stojí samo, bez tela, ktoré by ho nosilo, je dobrou metaforou pre to, ako pristupujeme k práci — chceme, aby hovoril výsledok, nie my. Bezplatná polhodinová konzultácia nie je marketingový trik, je to spôsob, ako si overiť, či si sadneme, skôr než sa rozhodneš investovať čas alebo peniaze.",
        en: "A blazer standing on its own, with no body wearing it, is a fitting metaphor for how we approach work — we want the result to speak, not us. A free 30-minute consultation isn't a marketing gimmick — it's a way to show you what we can do before you decide to invest time or money.",
        cs: "Sako, které stojí samo, bez těla, které by ho nosilo, je dobrou metaforou toho, jak přistupujeme k práci — chceme, aby mluvil výsledek, ne my. Bezplatná půlhodinová konzultace není marketingový trik, je to způsob, jak si ověřit, jestli si sedneme, dřív než se rozhodneš investovat čas nebo peníze.",
        hu: "Egy zakó, amely magától áll, test nélkül, jó metaforája annak, ahogyan a munkához állunk — azt akarjuk, hogy az eredmény beszéljen, ne mi. Az ingyenes félórás konzultáció nem marketingtrükk, hanem lehetőség arra, hogy kiderüljön, egymásra találunk-e, mielőtt időt vagy pénzt fektetnél be.",
        de: "Ein Sakko, das von allein steht, ohne einen Körper, der es trägt, ist eine gute Metapher dafür, wie wir arbeiten — wir wollen, dass das Ergebnis spricht, nicht wir. Die kostenlose halbstündige Beratung ist kein Marketingtrick, sondern eine Möglichkeit herauszufinden, ob wir zusammenpassen, bevor du Zeit oder Geld investierst.",
      },
      {
        sk: "DNABS je malé digitálne štúdio z Bratislavy s veľkými nárokmi na kvalitu. Nerobíme weby do šuplíka — robíme weby, aplikácie a digitálny marketing, ktoré majú jeden jediný cieľ: priniesť tvojej firme viac zákazníkov.",
        en: "DNABS is a small digital studio from Bratislava with big standards for quality. We don't build websites for the drawer — we build websites, apps and digital marketing with one single goal: bringing your business more customers.",
        cs: "DNABS je malé digitální studio z Bratislavy s velkými nároky na kvalitu. Neděláme weby do šuplíku — děláme weby, aplikace a digitální marketing, které mají jediný cíl: přivést tvé firmě více zákazníků.",
        hu: "A DNABS egy kis pozsonyi digitális stúdió, nagy minőségi elvárásokkal. Nem a fióknak készítünk weboldalakat — olyan weboldalakat, alkalmazásokat és digitális marketinget készítünk, amelyeknek egyetlen célja van: több ügyfelet hozni a cégednek.",
        de: "DNABS ist ein kleines Digitalstudio aus Bratislava mit hohen Qualitätsansprüchen. Wir bauen keine Websites für die Schublade — wir machen Websites, Apps und digitales Marketing mit einem einzigen Ziel: deinem Unternehmen mehr Kunden zu bringen.",
      },
    ],
  },
];
