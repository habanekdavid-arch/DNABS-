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
  hero_cta1: { sk: "Chcem bezplatný náhľad →", en: "I want my free preview →" },
  hero_cta2: { sk: "Naše služby", en: "Our services" },
  niche_kicker: {
    sk: "// bezplatný náhľad webu do 48 hodín",
    en: "// free website preview within 48 hours",
  },
  faq_kicker: { sk: "FAQ", en: "FAQ" },
  faq_title: { sk: "Časté otázky", en: "Frequently asked questions" },
  showcase_kicker: { sk: "(01) — Dôkaz", en: "(01) — Proof" },
  showcase_title: { sk: "Pred a po", en: "Before & after" },
  showcase_intro: {
    sk: "Toto sme spravili pre firmy, ktoré to mysleli vážne. Žiadne mockupy — reálne weby, reálne výsledky.",
    en: "This is what we built for companies that meant business. No mockups — real websites, real results.",
  },
  showcase_before: { sk: "Pred", en: "Before" },
  showcase_after: { sk: "Po", en: "After" },
  showcase_cta: { sk: "Chcem takýto náhľad aj ja →", en: "I want a preview like this →" },
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
  team_kicker: { sk: "(04) — Kto za tým stojí", en: "(04) — Who's behind it" },
  team_name: { sk: "PLACEHOLDER — Meno Priezvisko", en: "PLACEHOLDER — Full Name" },
  team_role: { sk: "PLACEHOLDER — pozícia", en: "PLACEHOLDER — role" },
  team_company: { sk: "4from media s.r.o.", en: "4from media s.r.o." },
  team_promise: { sk: "Odpíšeme do 24 hodín.", en: "We'll reply within 24 hours." },
  team_photo_note: { sk: "// TODO: nahraď fotkou", en: "// TODO: replace with photo" },
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
  contact_kicker: { sk: "(05) — Dopyt", en: "(05) — Inquiry" },
  contact_h1: { sk: "Poďme", en: "Let’s" },
  contact_h2: { sk: "do toho.", en: "do it." },
  contact_submit: { sk: "Odoslať dopyt →", en: "Send inquiry →" },
  contact_sending: { sk: "Odosielam…", en: "Sending…" },
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
