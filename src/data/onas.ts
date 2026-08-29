type Bilingual = { sk: string; en: string };

export type OnasChapter = {
  num: string;
  image: string;
  imageAlt: Bilingual;
  kicker: Bilingual;
  headline: Bilingual;
  paragraphs: Bilingual[];
};

export const onasChapters: OnasChapter[] = [
  {
    num: "01",
    image: "/png/DNABS_1.png",
    imageAlt: { sk: "Šachový kráľ ako symbol stratégie", en: "A chess king as a symbol of strategy" },
    kicker: { sk: "Kapitola 01 — Stratégia", en: "Chapter 01 — Strategy" },
    headline: {
      sk: "Web nie je náhoda. Je to premyslený ťah.",
      en: "A website isn't luck. It's a calculated move.",
    },
    paragraphs: [
      {
        sk: "Skôr než napíšeme jediný riadok kódu, pýtame sa: kto je tvoj zákazník, čo hľadá a prečo by mal skončiť práve na tvojom webe. Tvorba webových stránok bez stratégie je ako hra bez plánu — vyzerá to dobre, kým sa nezačne hrať doopravdy. Preto každý projekt — jednoduchá prezentačná stránka, firemný web, alebo komplexný e-shop — začína analýzou konkurencie, cieľovej skupiny a kľúčových slov, podľa ktorých ťa zákazníci reálne hľadajú na Googli.",
        en: "Before we write a single line of code, we ask: who is your customer, what are they looking for, and why should they land on your site specifically. Building a website without strategy is like playing a game without a plan — it looks fine until the game actually starts. That's why every project — a simple landing page, a company website, or a full e-shop — begins with competitor analysis, audience research, and the actual keywords your customers use to find you on Google.",
      },
      {
        sk: "Výsledkom nie je len pekný dizajn, ale webová stránka postavená tak, aby konvertovala návštevníkov na zákazníkov. Premyslená štruktúra, jasná ponuka a technické SEO nastavenie od prvého dňa — to je rozdiel medzi webom, ktorý len existuje, a webom, ktorý reálne prináša dopyty.",
        en: "The result isn't just a good-looking design — it's a website built to convert visitors into customers. A deliberate structure, a clear offer, and technical SEO from day one: that's the difference between a website that merely exists and one that actually brings in leads.",
      },
    ],
  },
  {
    num: "02",
    image: "/png/DNABS_5.png",
    imageAlt: { sk: "Croissant ako symbol remesla a detailu", en: "A croissant as a symbol of craft and detail" },
    kicker: { sk: "Kapitola 02 — Remeslo", en: "Chapter 02 — Craft" },
    headline: {
      sk: "Detail rozhoduje o tom, či web pôsobí lacno, alebo profesionálne.",
      en: "Detail is what makes a website feel cheap — or professional.",
    },
    paragraphs: [
      {
        sk: "Dobrý croissant nevznikne narýchlo — vrstvy cesta, presný čas a teplota rozhodujú o výsledku. Rovnako pristupujeme k webdesignu a vývoju: každý detail, od typografie cez rozostupy až po rýchlosť načítania stránky, má svoje miesto a svoj dôvod. Pixel, ktorý je o milimeter mimo, si možno nevšimneš vedome — ale podvedome ho zaregistruje každý návštevník tvojho webu.",
        en: "A good croissant isn't rushed — the layers of dough, the exact timing and temperature decide the outcome. We approach web design and development the same way: every detail, from typography to spacing to page load speed, has its place and its reason. A pixel that's a millimeter off might not register consciously — but every visitor feels it subconsciously.",
      },
      {
        sk: "Pracujeme s modernými technológiami (Next.js, React), ktoré zabezpečia, že tvoja stránka bude rýchla, responzívna na mobile aj desktope, a pripravená rásť spolu s tvojou firmou. Remeslo nie je o tom robiť veľa vecí naraz — je to o tom robiť správne veci poriadne.",
        en: "We build with modern technology (Next.js, React) that keeps your site fast, responsive on mobile and desktop, and ready to grow alongside your business. Craft isn't about doing many things at once — it's about doing the right things properly.",
      },
    ],
  },
  {
    num: "03",
    image: "/png/DNABS_2.png",
    imageAlt: { sk: "Mrakodrap ako symbol rastu", en: "A skyscraper as a symbol of growth" },
    kicker: { sk: "Kapitola 03 — Rast", en: "Chapter 03 — Growth" },
    headline: {
      sk: "Digitál, čo rastie s tebou — nie web, ktorý o rok prerastieš.",
      en: "Digital that grows with you — not a website you'll outgrow in a year.",
    },
    paragraphs: [
      {
        sk: "Mnoho malých a stredných firiem na Slovensku má web, ktorý im niekto spravil pred piatimi rokmi a odvtedy sa ho nikto nedotkol. Medzitým sa zmenilo všetko — mobilné vyhľadávanie, nároky Googlu na rýchlosť, aj to, ako ľudia nakupujú online. Staviame weby a e-shopy na architektúre, ktorá sa dá rozširovať — pridať nový jazyk, novú sekciu, nový spôsob platby — bez toho, aby sme museli stavať odznova.",
        en: "Many small and mid-sized businesses in Slovakia have a website someone built them five years ago and nobody's touched since. Meanwhile everything changed — mobile search, Google's speed requirements, and how people shop online. We build websites and e-shops on architecture that can expand — a new language, a new section, a new payment method — without rebuilding from scratch.",
      },
      {
        sk: "To isté platí pre digitálny marketing: kampane a SEO stratégia sa priebežne vyhodnocujú podľa reálnych dát, nie podľa pocitu. Rast nie je jednorazová udalosť, je to spôsob, akým je tvoja digitálna prítomnosť od základu postavená.",
        en: "The same applies to digital marketing: campaigns and SEO strategy get evaluated continuously against real data, not gut feeling. Growth isn't a one-time event — it's how your digital presence is built from the ground up.",
      },
    ],
  },
  {
    num: "04",
    image: "/png/DNABS_4.png",
    imageAlt: {
      sk: "Mramorová busta s telefónom ako symbol tradície stretávajúcej digitál",
      en: "A marble bust with a phone as a symbol of tradition meeting digital",
    },
    kicker: { sk: "Kapitola 04 — Tradícia stretáva digitál", en: "Chapter 04 — Tradition meets digital" },
    headline: {
      sk: "Nezáleží, ako dlho podnikáš — záleží, či ťa nájdu online.",
      en: "It doesn't matter how long you've been in business — it matters whether people can find you online.",
    },
    paragraphs: [
      {
        sk: "Reštaurácia s tridsaťročnou tradíciou, rodinný autoservis, svadobný salón, ktorý si ľudia odovzdávajú z ruky do ruky — to všetko sú firmy, ktoré vedia, čo robia, ale ich web tomu často nezodpovedá. Digitalizácia neznamená zahodiť to, čo funguje. Znamená to ukázať to isté remeslo a tú istú dôveryhodnosť aj človeku, ktorý vás prvýkrát vidí na mobile, cez Google vyhľadávanie o desiatej večer.",
        en: "A restaurant with thirty years of tradition, a family-run auto shop, a wedding salon people pass along by word of mouth — these are businesses that know their craft, but their website often doesn't show it. Going digital doesn't mean throwing away what works. It means showing that same craft and trustworthiness to someone seeing you for the first time on their phone, through a Google search at ten at night.",
      },
      {
        sk: "Preto robíme weby pre konkrétne odvetvia — reštaurácie, svadobné salóny, autoservisy a ďalšie lokálne prevádzky — tak, aby hovorili jazykom ich zákazníkov a ukázali sa vo vyhľadávaní presne vtedy, keď ich niekto potrebuje.",
        en: "That's why we build websites for specific industries — restaurants, wedding salons, auto service shops and other local businesses — so they speak their customers' language and show up in search exactly when someone needs them.",
      },
    ],
  },
  {
    num: "05",
    image: "/png/DNABS_3.png",
    imageAlt: { sk: "Sako bez tela ako symbol výsledku bez ega", en: "A bodiless blazer as a symbol of results without ego" },
    kicker: { sk: "Kapitola 05 — Výsledok", en: "Chapter 05 — Result" },
    headline: {
      sk: "Nepredávame hodiny práce. Predávame výsledok.",
      en: "We don't sell hours of work. We sell results.",
    },
    paragraphs: [
      {
        sk: "Sako, ktoré stojí samo, bez tela, ktoré by ho nosilo, je dobrou metaforou pre to, ako pristupujeme k práci — chceme, aby hovoril výsledok, nie my. Bezplatný náhľad webu do 48 hodín nie je marketingový trik, je to spôsob, ako ti ukázať, čo vieme spraviť, skôr než sa rozhodneš investovať čas alebo peniaze.",
        en: "A blazer standing on its own, with no body wearing it, is a fitting metaphor for how we approach work — we want the result to speak, not us. A free website preview within 48 hours isn't a marketing gimmick — it's a way to show you what we can do before you decide to invest time or money.",
      },
      {
        sk: "DNABS je malé digitálne štúdio z Bratislavy s veľkými nárokmi na kvalitu. Nerobíme weby do šuplíka — robíme weby, aplikácie a digitálny marketing, ktoré majú jeden jediný cieľ: priniesť tvojej firme viac zákazníkov.",
        en: "DNABS is a small digital studio from Bratislava with big standards for quality. We don't build websites for the drawer — we build websites, apps and digital marketing with one single goal: bringing your business more customers.",
      },
    ],
  },
];
