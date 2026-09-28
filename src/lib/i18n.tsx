"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "sk" | "en";

const dict = {
  nav_how: { sk: "Ako to funguje", en: "How it works" },
  nav_services: { sk: "Služby", en: "Services" },
  nav_blog: { sk: "Blog", en: "Blog" },
  nav_about: { sk: "O nás", en: "About" },
  nav_contact: { sk: "Kontakt", en: "Contact" },
  nav_cta: { sk: "Konzultácia zadarmo →", en: "Free consultation →" },
  nav_cta_short: { sk: "Návrh →", en: "Design →" },
  hero_kicker: {
    sk: "// bezplatná 30-minútová konzultácia",
    en: "// a free 30-minute consultation",
  },
  hero_l1: { sk: "Tvoj web,", en: "Your website," },
  hero_l2: { sk: "navrhnutý", en: "designed" },
  hero_l3: { sk: "zadarmo.", en: "for free." },
  hero_l4: { sk: "za 30 minút", en: "in 30 minutes" },
  hero_sub: {
    sk: "Prejdeme si, čo tvoj web potrebuje, a povieme ti to na rovinu. Bez záväzkov, bez rizika. Konzultácia ťa nestojí nič.",
    en: "We go through what your site actually needs and tell you straight. No commitment, no risk. The consultation costs you nothing.",
  },
  hero_cta1: { sk: "Chcem konzultáciu →", en: "Book a consultation →" },
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
    sk: "// bezplatná 30-minútová konzultácia",
    en: "// a free 30-minute consultation",
  },
  faq_kicker: { sk: "[ FIG.09 — OTÁZKY ]", en: "[ FIG.09 — QUESTIONS ]" },
  faq_title: { sk: "Časté otázky", en: "Frequently asked questions" },
  faq_count_label: { sk: "otázok, na ktoré sa pýtajú najčastejšie", en: "questions we get asked the most" },
  how_kicker: { sk: "[ FIG.02 — AKO TO FUNGUJE ]", en: "[ FIG.02 — HOW IT WORKS ]" },
  how_title: { sk: "Ako to funguje", en: "How it works" },
  how_intro: {
    sk: "Od formulára po hotový web — štyri kroky a žiadne prekvapenia. Prvá polhodina je zadarmo a k ničomu vás nezaväzuje.",
    en: "From the form to a finished website — four steps, no surprises. The first half hour is free and commits you to nothing.",
  },
  how1_t: { sk: "Vyplníš formulár", en: "Fill in the form" },
  how1_d: {
    sk: "Meno, e-mail a pár klikov. Zaberie to pár sekúnd, nič neplatíš a k ničomu sa nezaväzuješ.",
    en: "Your name, e-mail and a couple of clicks. It takes seconds, costs nothing and commits you to nothing.",
  },
  how1_note: { sk: "pár sekúnd", en: "a few seconds" },
  how2_t: { sk: "Polhodinová konzultácia", en: "A 30-minute call" },
  how2_d: {
    sk: "Ozveme sa a dohodneme si 30 minút. Prejdeme, čo potrebujete, čo dáva zmysel a čo nie.",
    en: "We get in touch and book 30 minutes. We go through what you need, what makes sense and what doesn't.",
  },
  how2_note: { sk: "zadarmo", en: "free" },
  how3_t: { sk: "Návrh a cena", en: "Proposal and price" },
  how3_d: {
    sk: "Pripravíme riešenie a cenu presne pre váš prípad. Vopred, bez skrytých položiek.",
    en: "We put together a solution and a price for your case. Upfront, with nothing hidden.",
  },
  how3_note: { sk: "na mieru", en: "tailored" },
  how4_t: { sk: "Spustenie", en: "Launch" },
  how4_d: {
    sk: "Až keď vám návrh sadne, pustíme sa do práce. Web dokončíme, nasadíme na doménu a odovzdáme.",
    en: "Only once the proposal works for you do we start. We finish the site, deploy it to your domain and hand it over.",
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
  ref_kicker: { sk: "[ FIG.08 — REFERENCIE ]", en: "[ FIG.08 — TESTIMONIALS ]" },
  ref_title: { sk: "Referencie", en: "Testimonials" },
  realizacia_kicker: { sk: "(02) — Realizácia", en: "(02) — Case study" },
  realizacia_title: { sk: "Toto sme postavili", en: "This is what we built" },
  realizacia_intro: {
    sk: "VytlačTo3D — online konfigurátor a e-shop pre 3D tlač. Zákazník si nahrá model, vyberie parametre tlače a systém mu rovno spočíta cenu.",
    en: "VytlačTo3D — an online configurator and e-shop for 3D printing. Customers upload a model, pick print parameters, and the system prices it instantly.",
  },
  realizacia_cta: { sk: "Live web", en: "Live site" },
  realizacia_cta2: { sk: "Chcem takýto web aj ja →", en: "I want a website like this →" },
  svc_kicker: { sk: "[ FIG.04 — SLUŽBY ]", en: "[ FIG.04 — SERVICES ]" },
  svc_title: { sk: "Služby", en: "Services" },
  svc_intro: {
    sk: "Tri veci, ktoré robíme poriadne. Bez balastu, s dôrazom na výsledok a rýchlosť nasadenia.",
    en: "Three things we do properly. No fluff, focused on results and speed of delivery.",
  },
  svc_card_cta: { sk: "Chcem konzultáciu →", en: "Book a consultation →" },
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
  band_kicker: { sk: "[ BEZ ZÁVÄZKOV ]", en: "[ NO COMMITMENT ]" },
  band_title: {
    sk: "Polhodinová konzultácia. ++Zadarmo++.",
    en: "A 30-minute consultation. ++Free++.",
  },
  band_sub: {
    sk: "Prejdeme, čo potrebujete, a povieme, čo by sme spravili. Bez záväzkov a bez faktúry.",
    en: "We'll show you a custom design before you decide to pay for anything. Don't like it? It costs you nothing.",
  },
  band_cta: { sk: "Chcem konzultáciu →", en: "Book a consultation →" },
  about_kicker: { sk: "[ FIG.07 — O NÁS ]", en: "[ FIG.07 — ABOUT US ]" },
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
  contact_kicker: { sk: "[ FIG.06 — KONTAKT ]", en: "[ FIG.06 — CONTACT ]" },
  contact_h1: { sk: "Pomôžeme", en: "We'll help" },
  contact_h2: { sk: "vám rásť!", en: "you grow!" },
  contact_intro: {
    sk: "Vyplňte krátky formulár a ozveme sa vám. Prvá **polhodinová konzultácia je zadarmo**, bez faktúry a bez záväzkov.",
    en: "Fill in the short form and we'll get in touch. The first **30-minute consultation is free**, no invoice, no commitment.",
  },
  contact_perk1: { sk: "Konzultácia zadarmo, bez záväzkov", en: "A free consultation, no commitment" },
  contact_perk2: { sk: "30 minút, počas ktorých si prejdeme váš prípad", en: "30 minutes going through your case" },
  contact_perk3: { sk: "Bez záväzku pokračovať — rozhodnete sa až potom", en: "No obligation to continue — you decide afterwards" },
  contact_prequal: {
    sk: "Čím konkrétnejšie napíšete, o čo ide, tým užitočnejšia bude tá polhodina.",
    en: "The more specific you are about what you need, the more useful that half hour will be.",
  },
  contact_business_hint: {
    sk: "Detaily doplňte nižšie v popise — napr. kaderníctvo v Prievidzi.",
    en: "Add the details below in the description — e.g. a hair salon in Prievidza.",
  },
  err_required: { sk: "Toto pole je povinné.", en: "This field is required." },
  err_email: { sk: "Zadajte platný e-mail.", en: "Enter a valid e-mail address." },
  err_phone: { sk: "Zadajte telefónne číslo, na ktorom vás zastihneme.", en: "Enter a phone number where we can reach you." },
  err_pick: { sk: "Vyberte jednu z možností.", en: "Pick one of the options." },
  err_summary: {
    sk: "Formulár sa nedá odoslať — skontrolujte označené polia.",
    en: "The form can't be sent — please check the highlighted fields.",
  },
  contact_site_hint: {
    sk: "Odkaz na váš web alebo profil. Pomôže nám pri návrhu, ale nie je povinný.",
    en: "A link to your site or profile. It helps us design, but it's not required.",
  },
  contact_more: {
    sk: "Nepovinné — firma, web, rozpočet, termín, prílohy",
    en: "Optional — company, website, budget, timing, attachments",
  },
  contact_note: {
    sk: "Vyplnenie zaberie pár sekúnd. Ozveme sa a dohodneme termín konzultácie.",
    en: "Takes a few seconds to fill in. We'll get back to you and set up a free 30-minute consultation.",
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
  contact_gdpr: {
    sk: "Súhlasím so spracovaním osobných údajov v súlade s GDPR.",
    en: "I agree to the processing of my personal data in line with GDPR.",
  },
  contact_submit: { sk: "Začať spoluprácu", en: "Start working together" },
  contact_sending: { sk: "Odosielam objednávku…", en: "Sending your order…" },
  contact_error: {
    sk: "Niečo sa pokazilo, skús to prosím znova alebo napíš priamo na e-mail.",
    en: "Something went wrong, please try again or email us directly.",
  },
  opt_select: { sk: "Vyber možnosť", en: "Choose an option" },
  opt_type_web: { sk: "Web", en: "Website" },
  opt_type_eshop: { sk: "E-shop", en: "E-shop" },
  opt_type_redesign: { sk: "Redizajn", en: "Redesign" },
  opt_type_app: { sk: "Aplikácia", en: "App" },
  opt_type_marketing: { sk: "Marketing", en: "Marketing" },
  opt_budget_1: { sk: "do 300 €", en: "Up to €300" },
  opt_budget_2: { sk: "300 – 800 €", en: "€300 – €800" },
  opt_budget_3: { sk: "800 – 2 000 €", en: "€800 – €2,000" },
  opt_budget_4: { sk: "2 000 € a viac", en: "€2,000 and up" },
  opt_ind_gastro: { sk: "Gastro a pohostinstvo", en: "Food & hospitality" },
  opt_ind_krasa: { sk: "Krása a wellness", en: "Beauty & wellness" },
  opt_ind_fitness: { sk: "Fitness a šport", en: "Fitness & sport" },
  opt_ind_stavba: { sk: "Stavebníctvo a remeslá", en: "Construction & trades" },
  opt_ind_auto: { sk: "Auto-moto", en: "Automotive" },
  opt_ind_obchod: { sk: "Obchod a e-shop", en: "Retail & e-commerce" },
  opt_ind_sluzby: { sk: "Služby a poradenstvo", en: "Services & consulting" },
  opt_ind_reality: { sk: "Reality", en: "Real estate" },
  opt_ind_zdravie: { sk: "Zdravotníctvo", en: "Healthcare" },
  opt_ind_vzdelavanie: { sk: "Vzdelávanie", en: "Education" },
  opt_ind_ine: { sk: "Iné", en: "Other" },
  opt_when_1: { sk: "Čo najskôr", en: "As soon as possible" },
  opt_when_2: { sk: "Do 1 – 2 mesiacov", en: "Within 1 – 2 months" },
  opt_when_3: { sk: "Len zisťujem", en: "Just exploring" },
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
  ph_name: { sk: "Meno a priezvisko *", en: "Full name *" },
  ph_company: { sk: "Názov firmy / prevádzky *", en: "Company / business name *" },
  ph_email: { sk: "E-mail *", en: "E-mail *" },
  ph_phone: { sk: "Telefón *", en: "Phone *" },
  ph_site: { sk: "Web alebo Instagram", en: "Website or Instagram" },
  ph_business: { sk: "V akom odvetví podnikáte? *", en: "What industry are you in? *" },
  ph_business_other: { sk: "Napíšte svoje odvetvie *", en: "Write your industry *" },
  ph_project_type: { sk: "Typ projektu *", en: "Project type *" },
  ph_budget: { sk: "Rozpočet", en: "Budget" },
  ph_when: { sk: "Kedy to riešite", en: "When are you tackling this" },
  ph_msg: {
    sk: "Čo presne potrebujete? *",
    en: "What exactly do you need? *",
  },
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
