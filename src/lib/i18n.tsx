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
  hero_l1: { sk: "Digitál,", en: "Digital" },
  hero_l2: { sk: "čo", en: "that" },
  hero_l3: { sk: "rastie.", en: "grows." },
  hero_sub: {
    sk: "Weby, aplikácie a digitálny marketing pre firmy — postavené tak, aby zrýchlili tvoje procesy. Žiadne brzdy, žiadne kompromisy.",
    en: "Websites, apps and digital marketing for companies — built to speed up your processes. No brakes, no compromises.",
  },
  hero_cta1: { sk: "Začať projekt →", en: "Start a project →" },
  hero_cta2: { sk: "Naše služby", en: "Our services" },
  svc_kicker: { sk: "(01) — Čo robíme", en: "(01) — What we do" },
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
  about_kicker: { sk: "(02) — Kto sme", en: "(02) — Who we are" },
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
  stat2: { sk: "Rokov skúseností", en: "Years of experience" },
  stat3: { sk: "Rýchlejšie nasadenie", en: "Faster delivery" },
  contact_kicker: { sk: "(03) — Dopyt", en: "(03) — Inquiry" },
  contact_h1: { sk: "Poďme", en: "Let’s" },
  contact_h2: { sk: "do toho.", en: "do it." },
  contact_submit: { sk: "Odoslať dopyt →", en: "Send inquiry →" },
  contact_success: { sk: "✓ Ďakujeme — ozveme sa", en: "✓ Thank you — we’ll be in touch" },
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
