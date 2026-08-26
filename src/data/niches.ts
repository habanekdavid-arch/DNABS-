type Bilingual = { sk: string; en: string };

export type Niche = {
  slug: string;
  headline: Bilingual;
  copy: Bilingual;
  bullets: Bilingual[];
  faq: { q: Bilingual; a: Bilingual }[];
  seo: { title: Bilingual; description: Bilingual };
  // Interná poznámka pre nás — nezobrazuje sa na stránke.
  cielStranky?: string;
};

export const niches: Niche[] = [
  {
    slug: "svadobne-salony",
    headline: {
      sk: "Web pre svadobný salón, ktorý zaplní kalendár skúšok",
      en: "A wedding salon website that fills up your fitting calendar",
    },
    copy: {
      sk: "Nevesty si salón vyberajú očami — skôr než príďu na skúšku, chcú vidieť tvoje šaty, tvoj štýl a to, že im dokážeš pomôcť práve teraz. Postavíme ti web, ktorý ukáže kolekciu, uľahčí objednanie termínu a funguje rovnako dobre na mobile ako na počítači.",
      en: "Brides pick a salon with their eyes — before they ever book a fitting, they want to see your dresses, your style, and that you can help them right now. We'll build a site that shows off the collection, makes booking a fitting effortless, and works just as well on mobile as on desktop.",
    },
    bullets: [
      {
        sk: "Galéria šiat, ktorá sa rýchlo načíta aj na mobile",
        en: "A dress gallery that loads fast even on mobile",
      },
      {
        sk: "Jednoduché objednanie termínu skúšky",
        en: "Simple fitting appointment booking",
      },
      {
        sk: "Web nájditeľný na Google, keď niekto hľadá svadobný salón vo vašom meste",
        en: "Findable on Google when someone searches for a wedding salon in your city",
      },
    ],
    faq: [
      {
        q: {
          sk: "Viete pracovať s fotkami, ktoré teraz mám na Instagrame?",
          en: "Can you work with the photos I already have on Instagram?",
        },
        a: {
          sk: "Áno, vieme vychádzať z fotiek, ktoré už máš na Instagrame alebo inde online — prípadne ti poradíme, čo by stálo za to doplniť.",
          en: "Yes, we can work from the photos you already have on Instagram or elsewhere online — and suggest what's worth adding.",
        },
      },
      {
        q: {
          sk: "Dá sa cez web priamo rezervovať termín skúšky?",
          en: "Can visitors book a fitting appointment directly on the site?",
        },
        a: {
          sk: "Áno, vieme na web napojiť jednoduchý rezervačný formulár alebo prepojenie na kalendár, aby si nevesty mohli termín dohodnúť priamo online.",
          en: "Yes, we can add a simple booking form or calendar integration so brides can arrange a fitting directly online.",
        },
      },
    ],
    seo: {
      title: {
        sk: "Weby pre svadobné salóny | DNABS",
        en: "Websites for wedding salons | DNABS",
      },
      description: {
        sk: "Bezplatný náhľad webu pre váš svadobný salón do 48 hodín. Galéria, rezervácia termínov, mobil aj Google.",
        en: "A free website preview for your wedding salon within 48 hours. Gallery, appointment booking, mobile and Google ready.",
      },
    },
    cielStranky: "Konverzia: dopyt na bezplatný náhľad cez kontaktný formulár.",
  },
  {
    slug: "restauracie",
    headline: {
      sk: "Web pre reštauráciu, ktorý priláka hostí namiesto tabuľky v PDF",
      en: "A restaurant website that brings in guests instead of a PDF menu",
    },
    copy: {
      sk: "Keď si niekto vyhľadá reštauráciu na telefóne pred rezerváciou stola, rozhoduje sa v priebehu pár sekúnd. Menu, fotky, otváracie hodiny a možnosť rezervácie musia byť jasné hneď po otvorení stránky — inak si vyberie inú prevádzku.",
      en: "When someone searches for a restaurant on their phone before booking a table, they decide within seconds. The menu, photos, opening hours and a way to reserve a table need to be obvious the moment the page loads — otherwise they'll pick somewhere else.",
    },
    bullets: [
      {
        sk: "Prehľadné menu, ktoré si kedykoľvek sami jednoducho upravíte",
        en: "A clear menu you can update yourself anytime",
      },
      {
        sk: "Rezervácia stola priamo z webu",
        en: "Table reservations straight from the site",
      },
      {
        sk: "Fotky jedál a interiéru, ktoré lákajú aj na malej obrazovke",
        en: "Food and interior photos that look appetizing even on a small screen",
      },
    ],
    faq: [
      {
        q: {
          sk: "Viem si menu meniť sám, keď zmeníte cenník?",
          en: "Can I update the menu myself when prices change?",
        },
        a: {
          sk: "Áno, po odovzdaní webu si menu vieš jednoducho upravovať sám, prípadne ti radi pomôžeme s úpravou kedykoľvek to budeš potrebovať.",
          en: "Yes, once the site is delivered you can update the menu yourself, or we're happy to help with changes whenever you need.",
        },
      },
      {
        q: {
          sk: "Dá sa napojiť online rezervácia stola?",
          en: "Can online table reservations be added?",
        },
        a: {
          sk: "Áno, vieme pridať jednoduchý rezervačný formulár priamo na web, prípadne ho prepojiť s existujúcim rezervačným systémom, ak už nejaký používate.",
          en: "Yes, we can add a simple reservation form directly to the site, or integrate it with a reservation system you already use.",
        },
      },
    ],
    seo: {
      title: {
        sk: "Weby pre reštaurácie | DNABS",
        en: "Websites for restaurants | DNABS",
      },
      description: {
        sk: "Bezplatný náhľad webu pre vašu reštauráciu do 48 hodín. Menu, rezervácie, fotky, ktoré predávajú.",
        en: "A free website preview for your restaurant within 48 hours. Menu, reservations, photos that sell.",
      },
    },
    cielStranky: "Konverzia: dopyt na bezplatný náhľad cez kontaktný formulár.",
  },
  {
    slug: "autoservisy",
    headline: {
      sk: "Web pre autoservis, ktorý dvíha telefón namiesto konkurencie",
      en: "An auto service website that gets the phone ringing instead of your competitor's",
    },
    copy: {
      sk: "Väčšina ľudí si servis vyberá podľa toho, čo nájde na Google v momente, keď im niečo v aute zahučí. Web s jasným zoznamom služieb, cenami a možnosťou rýchlo napísať alebo zavolať rozhoduje o tom, či sa ozvú vám, alebo susednej dielni.",
      en: "Most people pick a service shop based on whatever they find on Google the moment something starts rattling in their car. A site with a clear list of services, pricing and a fast way to call or message decides whether they contact you or the shop next door.",
    },
    bullets: [
      {
        sk: "Prehľadný zoznam služieb a orientačné ceny",
        en: "A clear list of services and ballpark pricing",
      },
      {
        sk: "Tlačidlo na rýchle zavolanie priamo z mobilu",
        en: "A one-tap call button on mobile",
      },
      {
        sk: "Web, ktorý sa zobrazí vo vyhľadávaní, keď niekto hľadá servis vo vašom okolí",
        en: "A site that shows up in search when someone looks for a shop nearby",
      },
    ],
    faq: [
      {
        q: {
          sk: "Viete pridať aj orientačný cenník opráv?",
          en: "Can you add a ballpark repair price list?",
        },
        a: {
          sk: "Áno, vieme pridať prehľadný zoznam služieb s orientačnými cenami, aby zákazníci hneď vedeli, na čom sú.",
          en: "Yes, we can add a clear list of services with ballpark pricing so customers know what to expect right away.",
        },
      },
      {
        q: {
          sk: "Dá sa na web napojiť objednávací formulár na servis?",
          en: "Can a service booking form be added to the site?",
        },
        a: {
          sk: "Áno, vieme pridať jednoduchý objednávkový formulár, cez ktorý si zákazníci dohodnú termín priamo z webu.",
          en: "Yes, we can add a simple booking form so customers can arrange an appointment directly from the site.",
        },
      },
    ],
    seo: {
      title: {
        sk: "Weby pre autoservisy | DNABS",
        en: "Websites for auto service shops | DNABS",
      },
      description: {
        sk: "Bezplatný náhľad webu pre váš autoservis do 48 hodín. Služby, ceny, rýchly kontakt z mobilu.",
        en: "A free website preview for your auto service shop within 48 hours. Services, pricing, fast mobile contact.",
      },
    },
    cielStranky: "Konverzia: dopyt na bezplatný náhľad cez kontaktný formulár.",
  },
];

export function getNiche(slug: string) {
  return niches.find((n) => n.slug === slug);
}
