"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "sk" | "en";

const dict = {
  nav_how: { sk: "Ako to funguje", en: "How it works" },
  nav_services: { sk: "Služby", en: "Services" },
  nav_blog: { sk: "Blog", en: "Blog" },
  nav_about: { sk: "O nás", en: "About" },
  nav_contact: { sk: "Kontakt", en: "Contact" },
  nav_cta: { sk: "Návrh do 24 h →", en: "Design in 24 h →" },
  nav_cta_short: { sk: "Návrh →", en: "Design →" },
  hero_kicker: {
    sk: "// návrh webu na mieru do 24 h — zadarmo",
    en: "// a custom website design within 24 h — free",
  },
  hero_l1: { sk: "Tvoj web,", en: "Your website," },
  hero_l2: { sk: "hotový", en: "ready" },
  hero_l3: { sk: "zadarmo.", en: "for free." },
  hero_l4: { sk: "do 24 hodín", en: "in 24 hours" },
  hero_sub: {
    sk: "Návrh webu na mieru, postavený na tom, čo už robíš. Bez záväzkov, bez rizika. Ak sa ti nebude páčiť, nestojí ťa to nič.",
    en: "A custom website design built around what you already do. No commitment, no risk. If you don't like it, it costs you nothing.",
  },
  hero_cta1: { sk: "Chcem návrh do 24 h →", en: "Get my design in 24 h →" },
  hero_cta2: { sk: "Naše služby", en: "Our services" },
  hero_cta_badge: { sk: "Zadarmo", en: "Free" },
  onas_kicker: { sk: "// O nás — DNABS", en: "// About us — DNABS" },
  onas_h1: {
    sk: "Toto nie je bežná stránka „o nás“.",
    en: "This isn't your typical about page.",
  },
  onas_intro: {
    sk: "Namiesto fráz o vášni a tímovom duchu ti ukážeme, ako rozmýšľame — cez päť krátkych kapitol. Scrolluj.",
    en: "Instead of clichés about passion and teamwork, we'll show you how we think — through five short chapters. Scroll.",
  },
  onas_cta_title: {
    sk: "Chceš vedieť, ako by to vyzeralo pre tvoju firmu?",
    en: "Want to see what this could look like for your business?",
  },
  niche_kicker: {
    sk: "// návrh webu na mieru do 24 h — zadarmo",
    en: "// a custom website design within 24 h — free",
  },
  faq_kicker: { sk: "FAQ", en: "FAQ" },
  faq_title: { sk: "Časté otázky", en: "Frequently asked questions" },
  faq_count_label: { sk: "otázok, na ktoré sa pýtajú najčastejšie", en: "questions we get asked the most" },
  how_kicker: { sk: "(01) — Ako to funguje", en: "(01) — How it works" },
  how_title: { sk: "Ako to funguje", en: "How it works" },
  how_intro: {
    sk: "Od formulára po hotový web — štyri kroky a žiadne prekvapenia. Platíš až vtedy, keď vieš, čo dostaneš.",
    en: "From the form to a finished website — four steps, no surprises. You only pay once you know exactly what you're getting.",
  },
  how1_t: { sk: "Vyplníš formulár", en: "Fill in the form" },
  how1_d: {
    sk: "Meno, e-mail a pár klikov. Zaberie to pár sekúnd, nič neplatíš a k ničomu sa nezaväzuješ.",
    en: "Your name, e-mail and a couple of clicks. It takes seconds, costs nothing and commits you to nothing.",
  },
  how1_note: { sk: "pár sekúnd", en: "a few seconds" },
  how2_t: { sk: "Príde ti návrh", en: "Your design arrives" },
  how2_d: {
    sk: "Pripravíme návrh tvojho webu na mieru a pošleme ti ho e-mailom alebo správou. Pozrieš si ho v pokoji, kedy chceš.",
    en: "We put together a custom design for your website and send it over by e-mail or message. You look at it whenever it suits you.",
  },
  how2_note: { sk: "do 24 hodín", en: "within 24 hours" },
  how3_t: { sk: "Prejdeme si ho spolu", en: "We go through it together" },
  how3_d: {
    sk: "Krátka konzultácia — povieš, čo zmeniť, čo doplniť a čo od webu naozaj potrebuješ. Návrh podľa toho upravíme.",
    en: "A short call — you tell us what to change, what to add and what you actually need from the site. We adjust the design accordingly.",
  },
  how3_note: { sk: "telefón alebo online", en: "call or online" },
  how4_t: { sk: "Platba a spustenie", en: "Payment and launch" },
  how4_d: {
    sk: "Až keď ti návrh sadne, dohodneme cenu a spôsob platby — vopred a bez skrytých položiek. Potom web dokončíme, nasadíme na doménu a odovzdáme.",
    en: "Only once the design works for you do we agree on the price and how you'll pay — upfront, with nothing hidden. Then we finish the site, deploy it to your domain and hand it over.",
  },
  how4_note: { sk: "až po tvojom odsúhlasení", en: "only after you approve" },
  how_cta: { sk: "Začať prvým krokom →", en: "Start with step one →" },
  niches_kicker: { sk: "// pre koho staviame", en: "// who we build for" },
  niches_title: { sk: "Weby pre tvoj odbor", en: "Websites for your field" },
  niches_intro: {
    sk: "Vieme, čo od webu potrebuje konkrétny odbor. Pozri sa, ako by mohol vyzerať ten tvoj.",
    en: "We know what a given field actually needs from a website. Take a look at what yours could be.",
  },
  niches_link: { sk: "Pozrieť →", en: "Take a look →" },
  niches_missing: {
    sk: "Tvoj odbor tu nie je? Nevadí — napíš nám a návrh pripravíme aj tak.",
    en: "Your field isn't listed? No problem — write to us and we'll prepare a design anyway.",
  },
  ref_kicker: { sk: "// čo hovoria klienti", en: "// what clients say" },
  ref_title: { sk: "Referencie", en: "Testimonials" },
  realizacia_kicker: { sk: "(02) — Realizácia", en: "(02) — Case study" },
  realizacia_title: { sk: "Toto sme postavili", en: "This is what we built" },
  realizacia_intro: {
    sk: "VytlačTo3D — online konfigurátor a e-shop pre 3D tlač. Zákazník si nahrá model, vyberie parametre tlače a systém mu rovno spočíta cenu.",
    en: "VytlačTo3D — an online configurator and e-shop for 3D printing. Customers upload a model, pick print parameters, and the system prices it instantly.",
  },
  realizacia_cta: { sk: "Live web", en: "Live site" },
  realizacia_cta2: { sk: "Chcem takýto web aj ja →", en: "I want a website like this →" },
  svc_kicker: { sk: "(03) — Čo robíme", en: "(03) — What we do" },
  svc_title: { sk: "Služby", en: "Services" },
  svc_intro: {
    sk: "Tri veci, ktoré robíme poriadne. Bez balastu, s dôrazom na výsledok a rýchlosť nasadenia.",
    en: "Three things we do properly. No fluff, focused on results and speed of delivery.",
  },
  svc_card_cta: { sk: "Chcem návrh →", en: "Get a design →" },
  svc1_t: { sk: "Weby", en: "Websites" },
  svc1_d: {
    sk: "Rýchle, škálovateľné weby na mieru — od landing page po e-shop. Postavené na moderných technológiách a vyladené na výkon.",
    en: "Fast, scalable custom websites — from landing pages to e-shops. Built on modern tech and tuned for performance.",
  },
  svc2_t: { sk: "Aplikácie", en: "Applications" },
  svc2_d: {
    sk: "Webové a mobilné aplikácie, ktoré automatizujú a zrýchľujú firemné procesy. Od interných nástrojov po zákaznícke platformy.",
    en: "Web and mobile apps that automate and accelerate business processes. From internal tools to customer platforms.",
  },
  svc3_t: { sk: "Marketing", en: "Marketing" },
  svc3_d: {
    sk: "Digitálny marketing, ktorý prináša klientov — od loga a fotiek až po kampane. Rozhodujeme sa podľa dát, nie dohadov.",
    en: "Digital marketing that brings clients — from your logo and photos all the way to campaigns. We decide by data, not guesses.",
  },
  band_kicker: { sk: "// bez záväzkov", en: "// no commitment" },
  band_title: {
    sk: "Návrh tvojho webu **do 24 hodín**. ++Zadarmo++.",
    en: "Your website design **in 24 hours**. ++Free++.",
  },
  band_sub: {
    sk: "Ukážeme ti návrh na mieru skôr, než sa rozhodneš čokoľvek zaplatiť. Nepáči sa ti? Nestojí ťa to nič.",
    en: "We'll show you a custom design before you decide to pay for anything. Don't like it? It costs you nothing.",
  },
  band_cta: { sk: "Chcem návrh do 24 h →", en: "Get my design in 24 h →" },
  about_kicker: { sk: "(04) — Kto sme", en: "(04) — Who we are" },
  about_h1: { sk: "Nerobíme weby do šuplíka.", en: "We don’t build websites for the drawer." },
  about_h2: {
    sk: "Staviame nástroje, čo zrýchlia tvoju firmu.",
    en: "We build tools that speed up your company.",
  },
  about_body: {
    sk: "DNABS je malé digitálne štúdio s veľkými nárokmi. Spájame dizajn, kód a marketing do jedného celku — od prvého kliknutia po posledný automatizovaný proces. Pracujeme s malými a strednými firmami, ktoré to myslia vážne.",
    en: "DNABS is a small digital studio with big standards. We combine design, code and marketing into one — from the first click to the last automated process. We work with small and mid-sized companies that mean business.",
  },
  stat1: { sk: "Dokončených projektov", en: "Completed projects" },
  stat2: { sk: "Rokov skúseností v obore", en: "Years of experience in the field" },
  stat3: { sk: "Rýchlejšie nasadenie", en: "Faster delivery" },
  about_founded_note: {
    sk: "Skúsenosti z predchádzajúcich rokov v obore · DNABS ako štúdio funguje od 2026.",
    en: "Experience carried over from prior years in the field · DNABS has operated as a studio since 2026.",
  },
  about_more_link: { sk: "Viac o nás →", en: "More about us →" },
  contact_kicker: { sk: "(05) — Objednávka", en: "(05) — Order" },
  contact_h1: { sk: "Objednaj si", en: "Order your" },
  contact_h2: { sk: "návrh zadarmo.", en: "free design." },
  contact_intro: {
    sk: "Stačí meno, e-mail a jeden klik. Návrh webu na mieru ti pošleme **do 24 hodín** — zadarmo, bez faktúry a bez záväzkov.",
    en: "Just your name, e-mail and one click. We'll send your custom website design **within 24 hours** — free, no invoice, no commitment.",
  },
  contact_perk1: { sk: "Zadarmo, bez záväzkov a bez rizika", en: "Free, no commitment, no risk" },
  contact_perk2: { sk: "Návrh na mieru do 24 hodín", en: "A custom design within 24 hours" },
  contact_perk3: { sk: "Nepáči sa ti? Nestojí ťa to nič.", en: "Don't like it? It costs you nothing." },
  msg_preset_label: { sk: "Nechce sa ti písať? Klikni:", en: "Don't feel like typing? Just click:" },
  msg_preset_1: {
    sk: "Zatiaľ len začínam — mám iba logo a žiadny funkčný web. Chcel by som sa opýtať, či mi viete pomôcť postaviť ho od základu.",
    en: "I'm just starting out — I only have a logo and no working website yet. I'd like to ask if you can help me build one from scratch.",
  },
  msg_preset_2: {
    sk: "Mám starý web, ktorý už nespĺňa moje predstavy. Potrebujem ho kompletne prerobiť.",
    en: "I have an old website that no longer meets my needs. I need it completely redone.",
  },
  msg_preset_3: {
    sk: "Chcem e-shop, cez ktorý budem môcť predávať produkty alebo služby online.",
    en: "I want an e-shop where I can sell products or services online.",
  },
  msg_preset_4: {
    sk: "Potrebujem hlavne viac zákazníkov cez Google a sociálne siete — zaujíma ma marketing a SEO.",
    en: "I mainly need more customers through Google and social media — I'm interested in marketing and SEO.",
  },
  msg_preset_5: {
    sk: "Ešte si nie som istý/á, čo presne potrebujem. Chcel by som sa len porozprávať o možnostiach.",
    en: "I'm not sure yet exactly what I need. I'd just like to talk through the options.",
  },
  msg_chip_1: { sk: "Začínam od nuly", en: "Starting from scratch" },
  msg_chip_2: { sk: "Mám starý web", en: "I have an old site" },
  msg_chip_3: { sk: "Chcem e-shop", en: "I want an e-shop" },
  msg_chip_4: { sk: "Viac zákazníkov", en: "More customers" },
  msg_chip_5: { sk: "Ešte neviem", en: "Not sure yet" },
  contact_more: { sk: "Nepovinné detaily (firma, rozpočet, príloha)", en: "Optional details (company, budget, attachment)" },
  contact_note: {
    sk: "Vyplnenie ti zaberie pár sekúnd. Návrh webu na mieru ti pošleme do 24 hodín.",
    en: "Takes a few seconds to fill in. We'll send your custom website design within 24 hours.",
  },
  upload_label: {
    sk: "Priložiť súbor (logo, návrh, dokument)",
    en: "Attach a file (logo, mockup, document)",
  },
  upload_hint: { sk: "PNG, JPG, PDF do 10 MB", en: "PNG, JPG, PDF up to 10 MB" },
  upload_uploading: { sk: "Nahrávam…", en: "Uploading…" },
  upload_remove: { sk: "Odstrániť", en: "Remove" },
  upload_error: {
    sk: "Nahrávanie zlyhalo, skús to znova alebo menší súbor.",
    en: "Upload failed, try again or a smaller file.",
  },
  contact_submit: { sk: "Objednať zadarmo návrh do 24 h →", en: "Order my free design in 24 h →" },
  contact_sending: { sk: "Odosielam objednávku…", en: "Sending your order…" },
  contact_error: {
    sk: "Niečo sa pokazilo, skús to prosím znova alebo napíš priamo na e-mail.",
    en: "Something went wrong, please try again or email us directly.",
  },
  opt_select: { sk: "Vyber možnosť", en: "Choose an option" },
  opt_type_web: { sk: "Web", en: "Website" },
  opt_type_eshop: { sk: "E-shop", en: "E-shop" },
  opt_type_app: { sk: "Aplikácia", en: "App" },
  opt_type_marketing: { sk: "Marketing", en: "Marketing" },
  opt_budget_1: { sk: "do 500 €", en: "Up to €500" },
  opt_budget_2: { sk: "500 – 1500 €", en: "€500 – €1,500" },
  opt_budget_3: { sk: "1500 – 3000 €", en: "€1,500 – €3,000" },
  opt_budget_4: { sk: "3000+ €", en: "€3,000+" },
  opt_budget_5: { sk: "Ešte neviem, poraďte mi", en: "Not sure yet, advise me" },
  contact_label_email: { sk: "E-mail", en: "E-mail" },
  contact_label_phone: { sk: "Telefón", en: "Phone" },
  contact_label_location: { sk: "Lokalita", en: "Location" },
  footer_tag: {
    sk: "Digitálne štúdio. Weby, aplikácie a marketing pre firmy, ktoré nechcú brzdiť.",
    en: "Digital studio. Web, apps and marketing for companies that refuse to slow down.",
  },
  footer_nav: { sk: "Navigácia", en: "Navigation" },
  footer_social: { sk: "Sieť", en: "Social" },
  footer_made: { sk: "Made in Slovakia 🇸🇰", en: "Made in Slovakia 🇸🇰" },
} as const;

const phDict = {
  ph_name: { sk: "Meno *", en: "Name *" },
  ph_email: { sk: "E-mail *", en: "E-mail *" },
  ph_company: { sk: "Spoločnosť (nepovinné)", en: "Company (optional)" },
  ph_phone: { sk: "Telefónne číslo (nepovinné)", en: "Phone number (optional)" },
  ph_msg: { sk: "O čom je tvoj projekt? (nepovinné)", en: "What is your project about? (optional)" },
  ph_project_type: { sk: "Typ projektu *", en: "Project type *" },
  ph_budget: { sk: "Rozpočet (nepovinné)", en: "Budget (optional)" },
} as const;

export type DictKey = keyof typeof dict;
export type PhDictKey = keyof typeof phDict;

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: DictKey) => string;
  tPh: (key: PhDictKey) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  children,
  defaultLang = "sk",
}: {
  children: ReactNode;
  defaultLang?: Lang;
}) {
  const [lang, setLang] = useState<Lang>(defaultLang);
  const t = (key: DictKey) => dict[key][lang];
  const tPh = (key: PhDictKey) => phDict[key][lang];
  return (
    <LanguageContext.Provider value={{ lang, setLang, t, tPh }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
