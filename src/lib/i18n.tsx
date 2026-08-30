"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "sk" | "en";

const dict = {
  nav_services: { sk: "Služby", en: "Services" },
  nav_about: { sk: "O nás", en: "About" },
  nav_contact: { sk: "Kontakt", en: "Contact" },
  nav_cta: { sk: "Dopyt →", en: "Inquiry →" },
  hero_kicker: {
    sk: "// digitálne štúdio — weby · appky · marketing",
    en: "// digital studio — web · apps · marketing",
  },
  hero_l1: { sk: "Tvoj web,", en: "Your website," },
  hero_l2: { sk: "hotový", en: "ready" },
  hero_l3: { sk: "zadarmo.", en: "for free." },
  hero_sub: {
    sk: "Bezplatný náhľad tvojho webu do 48 hodín — postavený na tom, čo už robíš. Bez záväzkov, bez rizika. Ak sa ti nebude páčiť, nestojí ťa to nič.",
    en: "A free preview of your website within 48 hours — built around what you already do. No commitment, no risk. If you don't like it, it costs you nothing.",
  },
  hero_cta1: { sk: "Objednať bezplatný náhľad →", en: "Order my free preview →" },
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
    sk: "// bezplatný náhľad webu do 48 hodín",
    en: "// free website preview within 48 hours",
  },
  faq_kicker: { sk: "FAQ", en: "FAQ" },
  faq_title: { sk: "Časté otázky", en: "Frequently asked questions" },
  realizacia_kicker: { sk: "(01) — Realizácia", en: "(01) — Case study" },
  realizacia_title: { sk: "Toto sme postavili", en: "This is what we built" },
  realizacia_intro: {
    sk: "VytlačTo3D — online konfigurátor a e-shop pre 3D tlač. Zákazník si nahrá model, vyberie parametre tlače a systém mu rovno spočíta cenu.",
    en: "VytlačTo3D — an online configurator and e-shop for 3D printing. Customers upload a model, pick print parameters, and the system prices it instantly.",
  },
  realizacia_cta: { sk: "Live web", en: "Live site" },
  realizacia_cta2: { sk: "Chcem takýto web aj ja →", en: "I want a website like this →" },
  svc_kicker: { sk: "(02) — Čo robíme", en: "(02) — What we do" },
  svc_title: { sk: "Služby", en: "Services" },
  svc_intro: {
    sk: "Tri veci, ktoré robíme poriadne. Bez balastu, s dôrazom na výsledok a rýchlosť nasadenia.",
    en: "Three things we do properly. No fluff, focused on results and speed of delivery.",
  },
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
    sk: "Digitálny marketing, ktorý prináša klientov. Rozhodujeme sa podľa dát, nie dohadov — výkonnostné kampane, brand aj obsah.",
    en: "Digital marketing that brings clients. We decide by data, not guesses — performance campaigns, brand and content.",
  },
  about_kicker: { sk: "(03) — Kto sme", en: "(03) — Who we are" },
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
  contact_kicker: { sk: "(04) — Objednávka", en: "(04) — Order" },
  contact_h1: { sk: "Objednaj si", en: "Order your" },
  contact_h2: { sk: "bezplatný náhľad.", en: "free preview." },
  contact_intro: {
    sk: "Vyplň formulár nižšie — je to presne tá istá objednávka, akú spomíname na začiatku stránky. Žiadna faktúra, žiadne záväzky, kým sa sám nerozhodneš pokračovať.",
    en: "Fill in the form below — it's the exact same order we mention at the top of the page. No invoice, no commitment until you decide to move forward yourself.",
  },
  contact_perk1: { sk: "Bez záväzkov a bez rizika", en: "No commitment, no risk" },
  contact_perk2: { sk: "Odpovieme do 24 hodín", en: "We reply within 24 hours" },
  contact_perk3: { sk: "Nepáči sa ti? Nestojí ťa to nič.", en: "Don't like it? It costs you nothing." },
  msg_preset_label: { sk: "Nemáš predstavu? Vyber si:", en: "Not sure what to say? Pick one:" },
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
  contact_submit: { sk: "Objednať bezplatný náhľad →", en: "Order my free preview →" },
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
  opt_timeline_1: { sk: "Čo najskôr", en: "As soon as possible" },
  opt_timeline_2: { sk: "Do 2 týždňov", en: "Within 2 weeks" },
  opt_timeline_3: { sk: "Do mesiaca", en: "Within a month" },
  opt_timeline_4: { sk: "Nie je to naliehavé", en: "Not urgent" },
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
  ph_company: { sk: "Spoločnosť", en: "Company" },
  ph_phone: { sk: "Telefónne číslo", en: "Phone number" },
  ph_msg: { sk: "O čom je tvoj projekt?", en: "What is your project about?" },
  ph_project_type: { sk: "Typ projektu *", en: "Project type *" },
  ph_budget: { sk: "Rozpočet *", en: "Budget *" },
  ph_timeline: { sk: "Termín *", en: "Timeline *" },
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
