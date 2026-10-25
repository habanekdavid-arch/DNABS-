"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { jeJazyk, type Lang, type Preklad } from "./jazyky";

export type { Lang, Preklad } from "./jazyky";

/** Kľúč v localStorage, pod ktorým si prehliadač pamätá zvolený jazyk. */
const ULOZENY_JAZYK = "dnabs-jazyk";

const dict = {
  nav_how: { sk: "Ako to funguje", en: "How it works", cs: "Jak to funguje", hu: "Hogyan működik", de: "So funktioniert's" },
  nav_services: { sk: "Služby", en: "Services", cs: "Služby", hu: "Szolgáltatások", de: "Leistungen" },
  nav_blog: { sk: "Blog", en: "Blog", cs: "Blog", hu: "Blog", de: "Blog" },
  nav_about: { sk: "O nás", en: "About", cs: "O nás", hu: "Rólunk", de: "Über uns" },
  nav_contact: { sk: "Kontakt", en: "Contact", cs: "Kontakt", hu: "Kapcsolat", de: "Kontakt" },
  nav_cta: { sk: "Konzultácia zadarmo →", en: "Free consultation →", cs: "Konzultace zdarma →", hu: "Ingyenes konzultáció →", de: "Kostenlose Beratung →" },
  nav_cta_short: { sk: "Návrh →", en: "Design →", cs: "Návrh →", hu: "Terv →", de: "Entwurf →" },
  hero_kicker: {
    sk: "// bezplatná 30-minútová konzultácia",
    en: "// a free 30-minute consultation",
    cs: "// bezplatná 30minutová konzultace",
    hu: "// ingyenes 30 perces konzultáció",
    de: "// kostenlose 30-Minuten-Beratung",
  },
  hero_l1: { sk: "Tvoj web,", en: "Your website,", cs: "Tvůj web,", hu: "A weboldalad,", de: "Deine Website," },
  hero_l2: { sk: "navrhnutý", en: "designed", cs: "navržený", hu: "megtervezve", de: "entworfen" },
  hero_l3: { sk: "zadarmo.", en: "for free.", cs: "zdarma.", hu: "ingyen.", de: "kostenlos." },
  hero_l4: { sk: "za 30 minút", en: "in 30 minutes", cs: "za 30 minut", hu: "30 perc alatt", de: "in 30 Minuten" },
  hero_sub: {
    sk: "Prejdeme si, čo tvoj web potrebuje, a povieme ti to na rovinu. Bez záväzkov, bez rizika. Konzultácia ťa nestojí nič.",
    en: "We go through what your site actually needs and tell you straight. No commitment, no risk. The consultation costs you nothing.",
    cs: "Projdeme si, co tvůj web potřebuje, a řekneme ti to na rovinu. Bez závazků, bez rizika. Konzultace tě nestojí nic.",
    hu: "Átnézzük, mire van szüksége a weboldaladnak, és őszintén megmondjuk. Kötelezettség és kockázat nélkül. A konzultáció semmibe sem kerül.",
    de: "Wir schauen uns an, was deine Website braucht, und sagen es dir ganz offen. Ohne Verpflichtung, ohne Risiko. Die Beratung kostet dich nichts.",
  },
  hero_cta1: { sk: "Chcem konzultáciu →", en: "Book a consultation →", cs: "Chci konzultaci →", hu: "Konzultációt kérek →", de: "Beratung anfragen →" },
  hero_cta2: { sk: "Naše služby", en: "Our services", cs: "Naše služby", hu: "Szolgáltatásaink", de: "Unsere Leistungen" },
  hero_cta_badge: { sk: "Zadarmo", en: "Free", cs: "Zdarma", hu: "Ingyenes", de: "Kostenlos" },
  onas_kicker: { sk: "// O nás — DNABS", en: "// About us — DNABS", cs: "// O nás — DNABS", hu: "// Rólunk — DNABS", de: "// Über uns — DNABS" },
  onas_h1: {
    sk: "Toto nie je bežná stránka „o nás“.",
    en: "This isn't your typical about page.",
    cs: "Tohle není běžná stránka „o nás“.",
    hu: "Ez nem egy szokásos „rólunk” oldal.",
    de: "Das ist keine gewöhnliche „Über uns“-Seite.",
  },
  onas_intro: {
    sk: "Namiesto fráz o vášni a tímovom duchu ti ukážeme, ako rozmýšľame — cez päť krátkych kapitol. Scrolluj.",
    en: "Instead of clichés about passion and teamwork, we'll show you how we think — through five short chapters. Scroll.",
    cs: "Místo frází o vášni a týmovém duchu ti ukážeme, jak přemýšlíme — v pěti krátkých kapitolách. Scrolluj.",
    hu: "A szenvedélyről és csapatszellemről szóló frázisok helyett megmutatjuk, hogyan gondolkodunk — öt rövid fejezetben. Görgess tovább.",
    de: "Statt Floskeln über Leidenschaft und Teamgeist zeigen wir dir, wie wir denken — in fünf kurzen Kapiteln. Scroll weiter.",
  },
  onas_cta_title: {
    sk: "Chceš vedieť, ako by to vyzeralo pre tvoju firmu?",
    en: "Want to see what this could look like for your business?",
    cs: "Chceš vědět, jak by to vypadalo pro tvou firmu?",
    hu: "Szeretnéd tudni, hogyan nézne ki ez a te cégednél?",
    de: "Willst du wissen, wie das für dein Unternehmen aussehen würde?",
  },
  niche_kicker: {
    sk: "// bezplatná 30-minútová konzultácia",
    en: "// a free 30-minute consultation",
    cs: "// bezplatná 30minutová konzultace",
    hu: "// ingyenes 30 perces konzultáció",
    de: "// kostenlose 30-Minuten-Beratung",
  },
  faq_kicker: { sk: "[ FIG.09 — OTÁZKY ]", en: "[ FIG.09 — QUESTIONS ]", cs: "[ FIG.09 — OTÁZKY ]", hu: "[ FIG.09 — KÉRDÉSEK ]", de: "[ FIG.09 — FRAGEN ]" },
  faq_title: { sk: "Časté otázky", en: "Frequently asked questions", cs: "Časté otázky", hu: "Gyakori kérdések", de: "Häufige Fragen" },
  faq_count_label: { sk: "otázok, na ktoré sa pýtajú najčastejšie", en: "questions we get asked the most", cs: "otázek, na které se ptáte nejčastěji", hu: "kérdés, amelyet a leggyakrabban feltesznek", de: "Fragen, die uns am häufigsten gestellt werden" },
  how_kicker: { sk: "[ FIG.02 — AKO TO FUNGUJE ]", en: "[ FIG.02 — HOW IT WORKS ]", cs: "[ FIG.02 — JAK TO FUNGUJE ]", hu: "[ FIG.02 — HOGYAN MŰKÖDIK ]", de: "[ FIG.02 — SO FUNKTIONIERT'S ]" },
  how_title: { sk: "Ako to funguje", en: "How it works", cs: "Jak to funguje", hu: "Hogyan működik", de: "So funktioniert's" },
  how_intro: {
    sk: "Od formulára po hotový web — štyri kroky a žiadne prekvapenia. Prvá polhodina je zadarmo a k ničomu vás nezaväzuje.",
    en: "From the form to a finished website — four steps, no surprises. The first half hour is free and commits you to nothing.",
    cs: "Od formuláře po hotový web — čtyři kroky a žádná překvapení. První půlhodina je zdarma a k ničemu vás nezavazuje.",
    hu: "Az űrlaptól a kész weboldalig — négy lépés, meglepetések nélkül. Az első félóra ingyenes, és semmire sem kötelezi.",
    de: "Vom Formular bis zur fertigen Website — vier Schritte, keine Überraschungen. Die erste halbe Stunde ist kostenlos und verpflichtet Sie zu nichts.",
  },
  how1_t: { sk: "Vyplníš formulár", en: "Fill in the form", cs: "Vyplníš formulář", hu: "Kitöltöd az űrlapot", de: "Du füllst das Formular aus" },
  how1_d: {
    sk: "Meno, e-mail a pár klikov. Zaberie to pár sekúnd, nič neplatíš a k ničomu sa nezaväzuješ.",
    en: "Your name, e-mail and a couple of clicks. It takes seconds, costs nothing and commits you to nothing.",
    cs: "Jméno, e-mail a pár kliknutí. Zabere to pár sekund, nic neplatíš a k ničemu se nezavazuješ.",
    hu: "Név, e-mail és pár kattintás. Néhány másodperc az egész, nem fizetsz semmit, és semmire sem kötelezed magad.",
    de: "Name, E-Mail und ein paar Klicks. Das dauert nur Sekunden, du zahlst nichts und gehst keine Verpflichtung ein.",
  },
  how1_note: { sk: "pár sekúnd", en: "a few seconds", cs: "pár sekund", hu: "pár másodperc", de: "ein paar Sekunden" },
  how2_t: { sk: "Polhodinová konzultácia", en: "A 30-minute call", cs: "Půlhodinová konzultace", hu: "Félórás konzultáció", de: "Halbstündige Beratung" },
  how2_d: {
    sk: "Ozveme sa a dohodneme si 30 minút. Prejdeme, čo potrebujete, čo dáva zmysel a čo nie.",
    en: "We get in touch and book 30 minutes. We go through what you need, what makes sense and what doesn't.",
    cs: "Ozveme se a domluvíme si 30 minut. Projdeme, co potřebujete, co dává smysl a co ne.",
    hu: "Jelentkezünk, és egyeztetünk 30 percet. Átbeszéljük, mire van szüksége, mi ésszerű és mi nem.",
    de: "Wir melden uns und vereinbaren 30 Minuten. Wir gehen durch, was Sie brauchen, was sinnvoll ist und was nicht.",
  },
  how2_note: { sk: "zadarmo", en: "free", cs: "zdarma", hu: "ingyenes", de: "kostenlos" },
  how3_t: { sk: "Návrh a cena", en: "Proposal and price", cs: "Návrh a cena", hu: "Terv és ár", de: "Entwurf und Preis" },
  how3_d: {
    sk: "Pripravíme riešenie a cenu presne pre váš prípad. Vopred, bez skrytých položiek.",
    en: "We put together a solution and a price for your case. Upfront, with nothing hidden.",
    cs: "Připravíme řešení a cenu přesně pro váš případ. Předem, bez skrytých položek.",
    hu: "Elkészítjük a megoldást és az árat pontosan az Ön esetére. Előre, rejtett tételek nélkül.",
    de: "Wir erarbeiten eine Lösung und einen Preis genau für Ihren Fall. Im Voraus, ohne versteckte Posten.",
  },
  how3_note: { sk: "na mieru", en: "tailored", cs: "na míru", hu: "személyre szabva", de: "maßgeschneidert" },
  how4_t: { sk: "Spustenie", en: "Launch", cs: "Spuštění", hu: "Indulás", de: "Launch" },
  how4_d: {
    sk: "Až keď vám návrh sadne, pustíme sa do práce. Web dokončíme, nasadíme na doménu a odovzdáme.",
    en: "Only once the proposal works for you do we start. We finish the site, deploy it to your domain and hand it over.",
    cs: "Až když vám návrh sedne, pustíme se do práce. Web dokončíme, nasadíme na doménu a předáme.",
    hu: "Csak akkor kezdünk bele, ha a terv tetszik Önnek. Befejezzük a weboldalt, feltöltjük a domainre és átadjuk.",
    de: "Erst wenn Ihnen der Entwurf zusagt, legen wir los. Wir stellen die Website fertig, schalten sie auf Ihrer Domain live und übergeben sie.",
  },
  how4_note: { sk: "až po tvojom odsúhlasení", en: "only after you approve", cs: "až po tvém odsouhlasení", hu: "csak a jóváhagyásod után", de: "erst nach deiner Zustimmung" },
  how_cta: { sk: "Začať prvým krokom →", en: "Start with step one →", cs: "Začít prvním krokem →", hu: "Kezdjük az első lépéssel →", de: "Mit Schritt eins starten →" },
  niches_kicker: { sk: "// pre koho staviame", en: "// who we build for", cs: "// pro koho stavíme", hu: "// kiknek építünk", de: "// für wen wir bauen" },
  niches_title: { sk: "Weby pre tvoj odbor", en: "Websites for your field", cs: "Weby pro tvůj obor", hu: "Weboldalak a szakmádhoz", de: "Websites für deine Branche" },
  niches_intro: {
    sk: "Vieme, čo od webu potrebuje konkrétny odbor. Pozri sa, ako by mohol vyzerať ten tvoj.",
    en: "We know what a given field actually needs from a website. Take a look at what yours could be.",
    cs: "Víme, co od webu potřebuje konkrétní obor. Podívej se, jak by mohl vypadat ten tvůj.",
    hu: "Tudjuk, mire van szüksége egy adott szakmának egy weboldaltól. Nézd meg, hogyan nézhetne ki a tiéd.",
    de: "Wir wissen, was eine bestimmte Branche von einer Website braucht. Sieh dir an, wie deine aussehen könnte.",
  },
  niches_link: { sk: "Pozrieť →", en: "Take a look →", cs: "Podívat se →", hu: "Megnézem →", de: "Ansehen →" },
  niches_missing: {
    sk: "Tvoj odbor tu nie je? Nevadí — napíš nám a návrh pripravíme aj tak.",
    en: "Your field isn't listed? No problem — write to us and we'll prepare a design anyway.",
    cs: "Tvůj obor tu není? Nevadí — napiš nám a návrh připravíme i tak.",
    hu: "Nincs itt a szakmád? Semmi gond — írj nekünk, és így is elkészítjük a tervet.",
    de: "Deine Branche ist nicht dabei? Kein Problem — schreib uns und wir erstellen trotzdem einen Entwurf.",
  },
  ref_kicker: { sk: "[ FIG.08 — REFERENCIE ]", en: "[ FIG.08 — TESTIMONIALS ]", cs: "[ FIG.08 — REFERENCE ]", hu: "[ FIG.08 — VÉLEMÉNYEK ]", de: "[ FIG.08 — REFERENZEN ]" },
  ref_title: { sk: "Referencie", en: "Testimonials", cs: "Reference", hu: "Vélemények", de: "Referenzen" },
  realizacia_kicker: { sk: "(02) — Realizácia", en: "(02) — Case study", cs: "(02) — Realizace", hu: "(02) — Referenciamunka", de: "(02) — Projekt" },
  realizacia_title: { sk: "Toto sme postavili", en: "This is what we built", cs: "Tohle jsme postavili", hu: "Ezt építettük", de: "Das haben wir gebaut" },
  realizacia_intro: {
    sk: "VytlačTo3D — online konfigurátor a e-shop pre 3D tlač. Zákazník si nahrá model, vyberie parametre tlače a systém mu rovno spočíta cenu.",
    en: "VytlačTo3D — an online configurator and e-shop for 3D printing. Customers upload a model, pick print parameters, and the system prices it instantly.",
    cs: "VytlačTo3D — online konfigurátor a e-shop pro 3D tisk. Zákazník nahraje model, vybere parametry tisku a systém mu rovnou spočítá cenu.",
    hu: "VytlačTo3D — online konfigurátor és webáruház 3D nyomtatáshoz. Az ügyfél feltölti a modellt, kiválasztja a nyomtatási paramétereket, és a rendszer azonnal kiszámolja az árat.",
    de: "VytlačTo3D — ein Online-Konfigurator und Shop für 3D-Druck. Kunden laden ein Modell hoch, wählen die Druckparameter und das System berechnet sofort den Preis.",
  },
  realizacia_cta: { sk: "Live web", en: "Live site", cs: "Živý web", hu: "Élő oldal", de: "Live-Website" },
  realizacia_cta2: { sk: "Chcem takýto web aj ja →", en: "I want a website like this →", cs: "Chci takový web i já →", hu: "Én is ilyen weboldalt szeretnék →", de: "So eine Website will ich auch →" },
  svc_kicker: { sk: "[ FIG.04 — SLUŽBY ]", en: "[ FIG.04 — SERVICES ]", cs: "[ FIG.04 — SLUŽBY ]", hu: "[ FIG.04 — SZOLGÁLTATÁSOK ]", de: "[ FIG.04 — LEISTUNGEN ]" },
  svc_title: { sk: "Služby", en: "Services", cs: "Služby", hu: "Szolgáltatások", de: "Leistungen" },
  svc_intro: {
    sk: "Tri veci, ktoré robíme poriadne. Bez balastu, s dôrazom na výsledok a rýchlosť nasadenia.",
    en: "Three things we do properly. No fluff, focused on results and speed of delivery.",
    cs: "Tři věci, které děláme pořádně. Bez balastu, s důrazem na výsledek a rychlost nasazení.",
    hu: "Három dolog, amit alaposan csinálunk. Felesleges körök nélkül, az eredményre és a gyors indulásra koncentrálva.",
    de: "Drei Dinge, die wir richtig machen. Ohne Ballast, mit Fokus auf Ergebnis und schnellen Livegang.",
  },
  svc_card_cta: { sk: "Chcem konzultáciu →", en: "Book a consultation →", cs: "Chci konzultaci →", hu: "Konzultációt kérek →", de: "Beratung anfragen →" },
  svc1_t: { sk: "Weby", en: "Websites", cs: "Weby", hu: "Weboldalak", de: "Websites" },
  svc1_d: {
    sk: "Rýchle, škálovateľné weby na mieru — od landing page po e-shop. Postavené na moderných technológiách a vyladené na výkon.",
    en: "Fast, scalable custom websites — from landing pages to e-shops. Built on modern tech and tuned for performance.",
    cs: "Rychlé, škálovatelné weby na míru — od landing page po e-shop. Postavené na moderních technologiích a vyladěné na výkon.",
    hu: "Gyors, skálázható, egyedi weboldalak — a landing page-től a webáruházig. Modern technológiákra építve, teljesítményre hangolva.",
    de: "Schnelle, skalierbare Websites nach Maß — von der Landingpage bis zum Onlineshop. Auf moderner Technik gebaut und auf Performance getrimmt.",
  },
  svc2_t: { sk: "Aplikácie", en: "Applications", cs: "Aplikace", hu: "Alkalmazások", de: "Anwendungen" },
  svc2_d: {
    sk: "Webové a mobilné aplikácie, ktoré automatizujú a zrýchľujú firemné procesy. Od interných nástrojov po zákaznícke platformy.",
    en: "Web and mobile apps that automate and accelerate business processes. From internal tools to customer platforms.",
    cs: "Webové a mobilní aplikace, které automatizují a zrychlují firemní procesy. Od interních nástrojů po zákaznické platformy.",
    hu: "Webes és mobilalkalmazások, amelyek automatizálják és felgyorsítják a vállalati folyamatokat. A belső eszközöktől az ügyfélplatformokig.",
    de: "Web- und Mobile-Apps, die Unternehmensprozesse automatisieren und beschleunigen. Von internen Tools bis zu Kundenplattformen.",
  },
  svc3_t: { sk: "Marketing", en: "Marketing", cs: "Marketing", hu: "Marketing", de: "Marketing" },
  svc3_d: {
    sk: "Digitálny marketing, ktorý prináša klientov — od loga a fotiek až po kampane. Rozhodujeme sa podľa dát, nie dohadov.",
    en: "Digital marketing that brings clients — from your logo and photos all the way to campaigns. We decide by data, not guesses.",
    cs: "Digitální marketing, který přináší klienty — od loga a fotek až po kampaně. Rozhodujeme se podle dat, ne dohadů.",
    hu: "Digitális marketing, amely ügyfeleket hoz — a logótól és a fotóktól a kampányokig. Adatok alapján döntünk, nem találgatásból.",
    de: "Digitales Marketing, das Kunden bringt — vom Logo und den Fotos bis zu den Kampagnen. Wir entscheiden nach Daten, nicht nach Bauchgefühl.",
  },
  band_kicker: { sk: "[ BEZ ZÁVÄZKOV ]", en: "[ NO COMMITMENT ]", cs: "[ BEZ ZÁVAZKŮ ]", hu: "[ KÖTELEZETTSÉG NÉLKÜL ]", de: "[ UNVERBINDLICH ]" },
  band_title: {
    sk: "Polhodinová konzultácia. ++Zadarmo++.",
    en: "A 30-minute consultation. ++Free++.",
    cs: "Půlhodinová konzultace. ++Zdarma++.",
    hu: "Félórás konzultáció. ++Ingyen++.",
    de: "Halbstündige Beratung. ++Kostenlos++.",
  },
  band_sub: {
    sk: "Prejdeme, čo potrebujete, a povieme, čo by sme spravili. Bez záväzkov a bez faktúry.",
    en: "We'll show you a custom design before you decide to pay for anything. Don't like it? It costs you nothing.",
    cs: "Projdeme, co potřebujete, a řekneme, co bychom udělali. Bez závazků a bez faktury.",
    hu: "Átbeszéljük, mire van szüksége, és elmondjuk, mit csinálnánk. Kötelezettség és számla nélkül.",
    de: "Wir gehen durch, was Sie brauchen, und sagen, was wir tun würden. Unverbindlich und ohne Rechnung.",
  },
  band_cta: { sk: "Chcem konzultáciu →", en: "Book a consultation →", cs: "Chci konzultaci →", hu: "Konzultációt kérek →", de: "Beratung anfragen →" },
  about_kicker: { sk: "[ FIG.07 — O NÁS ]", en: "[ FIG.07 — ABOUT US ]", cs: "[ FIG.07 — O NÁS ]", hu: "[ FIG.07 — RÓLUNK ]", de: "[ FIG.07 — ÜBER UNS ]" },
  about_h1: { sk: "Nerobíme weby do šuplíka.", en: "We don’t build websites for the drawer.", cs: "Neděláme weby do šuplíku.", hu: "Nem a fióknak készítünk weboldalakat.", de: "Wir bauen keine Websites für die Schublade." },
  about_h2: {
    sk: "Staviame nástroje, čo zrýchlia tvoju firmu.",
    en: "We build tools that speed up your company.",
    cs: "Stavíme nástroje, které zrychlí tvou firmu.",
    hu: "Olyan eszközöket építünk, amelyek felgyorsítják a cégedet.",
    de: "Wir bauen Werkzeuge, die dein Unternehmen schneller machen.",
  },
  about_body: {
    sk: "DNABS je malé digitálne štúdio s veľkými nárokmi. Spájame dizajn, kód a marketing do jedného celku — od prvého kliknutia po posledný automatizovaný proces. Pracujeme s malými a strednými firmami, ktoré to myslia vážne.",
    en: "DNABS is a small digital studio with big standards. We combine design, code and marketing into one — from the first click to the last automated process. We work with small and mid-sized companies that mean business.",
    cs: "DNABS je malé digitální studio s velkými nároky. Spojujeme design, kód a marketing do jednoho celku — od prvního kliknutí po poslední automatizovaný proces. Pracujeme s malými a středními firmami, které to myslí vážně.",
    hu: "A DNABS egy kis digitális stúdió nagy elvárásokkal. A dizájnt, a kódot és a marketinget egy egésszé kapcsoljuk össze — az első kattintástól az utolsó automatizált folyamatig. Olyan kis- és középvállalkozásokkal dolgozunk, amelyek komolyan gondolják.",
    de: "DNABS ist ein kleines Digitalstudio mit großen Ansprüchen. Wir verbinden Design, Code und Marketing zu einem Ganzen — vom ersten Klick bis zum letzten automatisierten Prozess. Wir arbeiten mit kleinen und mittleren Unternehmen, die es ernst meinen.",
  },
  stat1: { sk: "Dokončených projektov", en: "Completed projects", cs: "Dokončených projektů", hu: "Befejezett projekt", de: "Abgeschlossene Projekte" },
  stat2: { sk: "Rokov skúseností v obore", en: "Years of experience in the field", cs: "Let zkušeností v oboru", hu: "Év szakmai tapasztalat", de: "Jahre Erfahrung in der Branche" },
  stat3: { sk: "Rýchlejšie nasadenie", en: "Faster delivery", cs: "Rychlejší nasazení", hu: "Gyorsabb indulás", de: "Schnellerer Livegang" },
  about_founded_note: {
    sk: "Skúsenosti z predchádzajúcich rokov v obore · DNABS ako štúdio funguje od 2026.",
    en: "Experience carried over from prior years in the field · DNABS has operated as a studio since 2026.",
    cs: "Zkušenosti z předchozích let v oboru · DNABS jako studio funguje od roku 2026.",
    hu: "Tapasztalat a korábbi évekből a szakmában · A DNABS stúdióként 2026 óta működik.",
    de: "Erfahrung aus den Vorjahren in der Branche · DNABS ist seit 2026 als Studio tätig.",
  },
  about_more_link: { sk: "Viac o nás →", en: "More about us →", cs: "Více o nás →", hu: "Többet rólunk →", de: "Mehr über uns →" },
  contact_kicker: { sk: "[ FIG.06 — KONTAKT ]", en: "[ FIG.06 — CONTACT ]", cs: "[ FIG.06 — KONTAKT ]", hu: "[ FIG.06 — KAPCSOLAT ]", de: "[ FIG.06 — KONTAKT ]" },
  contact_h1: { sk: "Pomôžeme", en: "We'll help", cs: "Pomůžeme", hu: "Segítünk", de: "Wir helfen" },
  contact_h2: { sk: "vám rásť!", en: "you grow!", cs: "vám růst!", hu: "növekedni!", de: "Ihnen zu wachsen!" },
  contact_intro: {
    sk: "Vyplňte krátky formulár a ozveme sa vám. Prvá **polhodinová konzultácia je zadarmo**, bez faktúry a bez záväzkov.",
    en: "Fill in the short form and we'll get in touch. The first **30-minute consultation is free**, no invoice, no commitment.",
    cs: "Vyplňte krátký formulář a ozveme se vám. První **půlhodinová konzultace je zdarma**, bez faktury a bez závazků.",
    hu: "Töltse ki a rövid űrlapot, és jelentkezünk. Az első **félórás konzultáció ingyenes**, számla és kötelezettség nélkül.",
    de: "Füllen Sie das kurze Formular aus und wir melden uns. Die erste **halbstündige Beratung ist kostenlos**, ohne Rechnung und ohne Verpflichtung.",
  },
  contact_perk1: { sk: "Konzultácia zadarmo, bez záväzkov", en: "A free consultation, no commitment", cs: "Konzultace zdarma, bez závazků", hu: "Ingyenes konzultáció, kötelezettség nélkül", de: "Kostenlose Beratung, unverbindlich" },
  contact_perk2: { sk: "30 minút, počas ktorých si prejdeme váš prípad", en: "30 minutes going through your case", cs: "30 minut, během kterých projdeme váš případ", hu: "30 perc, amely alatt átnézzük az Ön esetét", de: "30 Minuten, in denen wir Ihren Fall durchgehen" },
  contact_perk3: { sk: "Bez záväzku pokračovať — rozhodnete sa až potom", en: "No obligation to continue — you decide afterwards", cs: "Bez závazku pokračovat — rozhodnete se až potom", hu: "Nem kötelező folytatni — csak utána dönt", de: "Keine Pflicht weiterzumachen — Sie entscheiden erst danach" },
  contact_prequal: {
    sk: "Čím konkrétnejšie napíšete, o čo ide, tým užitočnejšia bude tá polhodina.",
    en: "The more specific you are about what you need, the more useful that half hour will be.",
    cs: "Čím konkrétněji napíšete, o co jde, tím užitečnější bude ta půlhodina.",
    hu: "Minél konkrétabban írja le, miről van szó, annál hasznosabb lesz az a félóra.",
    de: "Je genauer Sie beschreiben, worum es geht, desto nützlicher wird die halbe Stunde.",
  },
  contact_business_hint: {
    sk: "Detaily doplňte nižšie v popise — napr. kaderníctvo v Prievidzi.",
    en: "Add the details below in the description — e.g. a hair salon in Prievidza.",
    cs: "Detaily doplňte níže v popisu — např. kadeřnictví v Prievidzi.",
    hu: "A részleteket lent, a leírásban adja meg — pl. fodrászat Privigyén.",
    de: "Details bitte unten in der Beschreibung ergänzen — z. B. Friseursalon in Prievidza.",
  },
  err_required: { sk: "Toto pole je povinné.", en: "This field is required.", cs: "Toto pole je povinné.", hu: "Ez a mező kötelező.", de: "Dieses Feld ist erforderlich." },
  err_email: { sk: "Zadajte platný e-mail.", en: "Enter a valid e-mail address.", cs: "Zadejte platný e-mail.", hu: "Adjon meg érvényes e-mail-címet.", de: "Bitte geben Sie eine gültige E-Mail-Adresse ein." },
  err_phone: { sk: "Zadajte telefónne číslo, na ktorom vás zastihneme.", en: "Enter a phone number where we can reach you.", cs: "Zadejte telefonní číslo, na kterém vás zastihneme.", hu: "Adja meg a telefonszámot, amelyen elérjük.", de: "Bitte geben Sie eine Telefonnummer an, unter der wir Sie erreichen." },
  err_pick: { sk: "Vyberte jednu z možností.", en: "Pick one of the options.", cs: "Vyberte jednu z možností.", hu: "Válasszon egyet a lehetőségek közül.", de: "Bitte wählen Sie eine der Optionen." },
  err_summary: {
    sk: "Formulár sa nedá odoslať — skontrolujte označené polia.",
    en: "The form can't be sent — please check the highlighted fields.",
    cs: "Formulář nelze odeslat — zkontrolujte označená pole.",
    hu: "Az űrlapot nem lehet elküldeni — ellenőrizze a megjelölt mezőket.",
    de: "Das Formular kann nicht gesendet werden — bitte prüfen Sie die markierten Felder.",
  },
  contact_site_hint: {
    sk: "Odkaz na váš web alebo profil. Pomôže nám pri návrhu, ale nie je povinný.",
    en: "A link to your site or profile. It helps us design, but it's not required.",
    cs: "Odkaz na váš web nebo profil. Pomůže nám s návrhem, ale není povinný.",
    hu: "Link a weboldalára vagy profiljára. Segít a tervezésben, de nem kötelező.",
    de: "Ein Link zu Ihrer Website oder Ihrem Profil. Hilft uns beim Entwurf, ist aber nicht erforderlich.",
  },
  contact_more: {
    sk: "Nepovinné — firma, web, rozpočet, termín, prílohy",
    en: "Optional — company, website, budget, timing, attachments",
    cs: "Nepovinné — firma, web, rozpočet, termín, přílohy",
    hu: "Nem kötelező — cég, weboldal, költségkeret, határidő, mellékletek",
    de: "Optional — Firma, Website, Budget, Zeitrahmen, Anhänge",
  },
  contact_note: {
    sk: "Vyplnenie zaberie pár sekúnd. Ozveme sa a dohodneme termín konzultácie.",
    en: "Takes a few seconds to fill in. We'll get back to you and set up a free 30-minute consultation.",
    cs: "Vyplnění zabere pár sekund. Ozveme se a domluvíme termín konzultace.",
    hu: "A kitöltés pár másodperc. Jelentkezünk, és egyeztetjük a konzultáció időpontját.",
    de: "Das Ausfüllen dauert nur Sekunden. Wir melden uns und vereinbaren einen Beratungstermin.",
  },
  upload_label: {
    sk: "Priložiť súbor (logo, návrh, dokument)",
    en: "Attach a file (logo, mockup, document)",
    cs: "Přiložit soubor (logo, návrh, dokument)",
    hu: "Fájl csatolása (logó, terv, dokumentum)",
    de: "Datei anhängen (Logo, Entwurf, Dokument)",
  },
  upload_hint: { sk: "PNG, JPG, PDF do 10 MB", en: "PNG, JPG, PDF up to 10 MB", cs: "PNG, JPG, PDF do 10 MB", hu: "PNG, JPG, PDF legfeljebb 10 MB", de: "PNG, JPG, PDF bis 10 MB" },
  upload_uploading: { sk: "Nahrávam…", en: "Uploading…", cs: "Nahrávám…", hu: "Feltöltés…", de: "Wird hochgeladen…" },
  upload_remove: { sk: "Odstrániť", en: "Remove", cs: "Odstranit", hu: "Eltávolítás", de: "Entfernen" },
  upload_error: {
    sk: "Nahrávanie zlyhalo, skús to znova alebo menší súbor.",
    en: "Upload failed, try again or a smaller file.",
    cs: "Nahrávání selhalo, zkus to znovu nebo menší soubor.",
    hu: "A feltöltés nem sikerült, próbáld újra vagy kisebb fájllal.",
    de: "Hochladen fehlgeschlagen, versuch es noch einmal oder mit einer kleineren Datei.",
  },
  contact_gdpr: {
    sk: "Súhlasím so spracovaním osobných údajov v súlade s GDPR.",
    en: "I agree to the processing of my personal data in line with GDPR.",
    cs: "Souhlasím se zpracováním osobních údajů v souladu s GDPR.",
    hu: "Hozzájárulok személyes adataim kezeléséhez a GDPR szerint.",
    de: "Ich stimme der Verarbeitung meiner personenbezogenen Daten gemäß DSGVO zu.",
  },
  contact_submit: { sk: "Začať spoluprácu", en: "Start working together", cs: "Začít spolupráci", hu: "Kezdjük el az együttműködést", de: "Zusammenarbeit starten" },
  contact_sending: { sk: "Odosielam objednávku…", en: "Sending your order…", cs: "Odesílám objednávku…", hu: "Megrendelés küldése…", de: "Anfrage wird gesendet…" },
  contact_error: {
    sk: "Niečo sa pokazilo, skús to prosím znova alebo napíš priamo na e-mail.",
    en: "Something went wrong, please try again or email us directly.",
    cs: "Něco se pokazilo, zkus to prosím znovu nebo napiš přímo na e-mail.",
    hu: "Valami hiba történt, kérlek, próbáld újra, vagy írj közvetlenül e-mailt.",
    de: "Etwas ist schiefgelaufen, bitte versuch es noch einmal oder schreib uns direkt eine E-Mail.",
  },
  contact_error_siet: {
    sk: "Spojenie sa nepodarilo nadviazať. Skontroluj pripojenie a skús to znova — alebo nám napíš priamo:",
    en: "We couldn't reach the server. Check your connection and try again — or contact us directly:",
    cs: "Spojení se nepodařilo navázat. Zkontroluj připojení a zkus to znovu — nebo nám napiš přímo:",
    hu: "Nem sikerült kapcsolódni. Ellenőrizd a kapcsolatot, és próbáld újra — vagy keress minket közvetlenül:",
    de: "Verbindung fehlgeschlagen. Prüf deine Verbindung und versuch es erneut — oder kontaktier uns direkt:",
  },
  contact_error_direct: {
    sk: "Napíš nám prosím priamo, dopyt sa k nám takto dostane určite:",
    en: "Please contact us directly — your enquiry will definitely reach us:",
    cs: "Napiš nám prosím přímo, dotaz se k nám takto dostane určitě:",
    hu: "Kérlek, keress minket közvetlenül — így biztosan megkapjuk:",
    de: "Schreib uns bitte direkt — so erreicht uns deine Anfrage sicher:",
  },
  opt_select: { sk: "Vyber možnosť", en: "Choose an option", cs: "Vyber možnost", hu: "Válassz egy lehetőséget", de: "Option wählen" },
  opt_type_web: { sk: "Web", en: "Website", cs: "Web", hu: "Weboldal", de: "Website" },
  opt_type_eshop: { sk: "E-shop", en: "E-shop", cs: "E-shop", hu: "Webáruház", de: "Onlineshop" },
  opt_type_redesign: { sk: "Redizajn", en: "Redesign", cs: "Redesign", hu: "Újratervezés", de: "Redesign" },
  opt_type_app: { sk: "Aplikácia", en: "App", cs: "Aplikace", hu: "Alkalmazás", de: "App" },
  opt_type_marketing: { sk: "Marketing", en: "Marketing", cs: "Marketing", hu: "Marketing", de: "Marketing" },
  opt_budget_1: { sk: "do 300 €", en: "Up to €300", cs: "do 300 €", hu: "300 € alatt", de: "bis 300 €" },
  opt_budget_2: { sk: "300 – 800 €", en: "€300 – €800", cs: "300 – 800 €", hu: "300 – 800 €", de: "300 – 800 €" },
  opt_budget_3: { sk: "800 – 2 000 €", en: "€800 – €2,000", cs: "800 – 2 000 €", hu: "800 – 2 000 €", de: "800 – 2.000 €" },
  opt_budget_4: { sk: "2 000 € a viac", en: "€2,000 and up", cs: "2 000 € a více", hu: "2 000 € felett", de: "ab 2.000 €" },
  opt_ind_gastro: { sk: "Gastro a pohostinstvo", en: "Food & hospitality", cs: "Gastro a pohostinství", hu: "Vendéglátás", de: "Gastronomie und Hotellerie" },
  opt_ind_krasa: { sk: "Krása a wellness", en: "Beauty & wellness", cs: "Krása a wellness", hu: "Szépségápolás és wellness", de: "Beauty und Wellness" },
  opt_ind_fitness: { sk: "Fitness a šport", en: "Fitness & sport", cs: "Fitness a sport", hu: "Fitnesz és sport", de: "Fitness und Sport" },
  opt_ind_stavba: { sk: "Stavebníctvo a remeslá", en: "Construction & trades", cs: "Stavebnictví a řemesla", hu: "Építőipar és szakmák", de: "Bau und Handwerk" },
  opt_ind_auto: { sk: "Auto-moto", en: "Automotive", cs: "Auto-moto", hu: "Autó-motor", de: "Kfz" },
  opt_ind_obchod: { sk: "Obchod a e-shop", en: "Retail & e-commerce", cs: "Obchod a e-shop", hu: "Kereskedelem és webáruház", de: "Handel und Onlineshop" },
  opt_ind_sluzby: { sk: "Služby a poradenstvo", en: "Services & consulting", cs: "Služby a poradenství", hu: "Szolgáltatás és tanácsadás", de: "Dienstleistungen und Beratung" },
  opt_ind_reality: { sk: "Reality", en: "Real estate", cs: "Reality", hu: "Ingatlan", de: "Immobilien" },
  opt_ind_zdravie: { sk: "Zdravotníctvo", en: "Healthcare", cs: "Zdravotnictví", hu: "Egészségügy", de: "Gesundheitswesen" },
  opt_ind_vzdelavanie: { sk: "Vzdelávanie", en: "Education", cs: "Vzdělávání", hu: "Oktatás", de: "Bildung" },
  opt_ind_ine: { sk: "Iné", en: "Other", cs: "Jiné", hu: "Egyéb", de: "Sonstiges" },
  opt_when_1: { sk: "Čo najskôr", en: "As soon as possible", cs: "Co nejdříve", hu: "Minél előbb", de: "So schnell wie möglich" },
  opt_when_2: { sk: "Do 1 – 2 mesiacov", en: "Within 1 – 2 months", cs: "Do 1 – 2 měsíců", hu: "1 – 2 hónapon belül", de: "Innerhalb von 1 – 2 Monaten" },
  opt_when_3: { sk: "Len zisťujem", en: "Just exploring", cs: "Jen zjišťuji", hu: "Csak tájékozódom", de: "Ich informiere mich nur" },
  contact_label_email: { sk: "E-mail", en: "E-mail", cs: "E-mail", hu: "E-mail", de: "E-Mail" },
  contact_label_phone: { sk: "Telefón", en: "Phone", cs: "Telefon", hu: "Telefon", de: "Telefon" },
  contact_label_location: { sk: "Lokalita", en: "Location", cs: "Lokalita", hu: "Helyszín", de: "Standort" },
  footer_tag: {
    sk: "Digitálne štúdio. Weby, aplikácie a marketing pre firmy, ktoré nechcú brzdiť.",
    en: "Digital studio. Web, apps and marketing for companies that refuse to slow down.",
    cs: "Digitální studio. Weby, aplikace a marketing pro firmy, které nechtějí brzdit.",
    hu: "Digitális stúdió. Weboldalak, alkalmazások és marketing olyan cégeknek, amelyek nem akarnak lassítani.",
    de: "Digitalstudio. Websites, Apps und Marketing für Unternehmen, die nicht bremsen wollen.",
  },
  footer_nav: { sk: "Navigácia", en: "Navigation", cs: "Navigace", hu: "Navigáció", de: "Navigation" },
  footer_social: { sk: "Sieť", en: "Social", cs: "Síť", hu: "Közösség", de: "Social" },
  footer_legal: { sk: "Právne", en: "Legal", cs: "Právní", hu: "Jogi információk", de: "Rechtliches" },
  footer_terms: { sk: "Obchodné podmienky", en: "Terms and conditions", cs: "Obchodní podmínky", hu: "Általános szerződési feltételek", de: "AGB" },
  footer_rights: { sk: "Všetky práva vyhradené", en: "All rights reserved", cs: "Všechna práva vyhrazena", hu: "Minden jog fenntartva", de: "Alle Rechte vorbehalten" },
  svc_available: { sk: "DOSTUPNÉ", en: "AVAILABLE", cs: "DOSTUPNÉ", hu: "ELÉRHETŐ", de: "VERFÜGBAR" },
  how_step: { sk: "KROK", en: "STEP", cs: "KROK", hu: "LÉPÉS", de: "SCHRITT" },
  impact_before: { sk: "predtým", en: "before", cs: "předtím", hu: "korábban", de: "vorher" },
  legal_updated: { sk: "Posledná aktualizácia:", en: "Last updated:", cs: "Poslední aktualizace:", hu: "Utolsó frissítés:", de: "Zuletzt aktualisiert:" },
  legal_note: {
    sk: "",
    en: "This legal document is available in Slovak only.",
    cs: "Tento právní dokument je k dispozici pouze ve slovenštině.",
    hu: "Ez a jogi dokumentum csak szlovák nyelven érhető el.",
    de: "Dieses rechtliche Dokument ist nur auf Slowakisch verfügbar.",
  },
  cookie_label: { sk: "Súhlas s cookies", en: "Cookie consent", cs: "Souhlas s cookies", hu: "Hozzájárulás a sütikhez", de: "Cookie-Einwilligung" },
  cookie_text: {
    sk: "Používame nevyhnutné cookies na fungovanie webu a s tvojím súhlasom aj marketingové cookies (Google Ads) na meranie úspešnosti kampaní. Viac v",
    en: "We use essential cookies to run the site and, with your consent, marketing cookies (Google Ads) to measure how our campaigns perform. More in our",
    cs: "Používáme nezbytné cookies pro fungování webu a s tvým souhlasem i marketingové cookies (Google Ads) k měření úspěšnosti kampaní. Více v",
    hu: "A weboldal működéséhez szükséges sütiket használunk, a hozzájárulásoddal pedig marketingsütiket (Google Ads) is a kampányok mérésére. Bővebben a",
    de: "Wir verwenden notwendige Cookies für den Betrieb der Website und mit deiner Zustimmung auch Marketing-Cookies (Google Ads), um den Erfolg von Kampagnen zu messen. Mehr dazu in unserer",
  },
  cookie_link: { sk: "zásadách používania cookies", en: "cookie policy", cs: "zásadách používání cookies", hu: "sütikezelési szabályzatban", de: "Cookie-Richtlinie" },
  cookie_accept: { sk: "Prijať všetko", en: "Accept all", cs: "Přijmout vše", hu: "Összes elfogadása", de: "Alle akzeptieren" },
  cookie_decline: { sk: "Len nevyhnutné", en: "Essential only", cs: "Jen nezbytné", hu: "Csak a szükségesek", de: "Nur notwendige" },
  collage_prev: { sk: "Predchádzajúca realizácia", en: "Previous project", cs: "Předchozí realizace", hu: "Előző munka", de: "Vorheriges Projekt" },
  collage_next: { sk: "Ďalšia realizácia", en: "Next project", cs: "Další realizace", hu: "Következő munka", de: "Nächstes Projekt" },
  collage_open: { sk: "Otvoriť web", en: "Open website", cs: "Otevřít web", hu: "Weboldal megnyitása", de: "Website öffnen" },
  collage_opening: { sk: "Otváram", en: "Opening", cs: "Otevírám", hu: "Megnyitás:", de: "Wird geöffnet:" },
  nav_label: { sk: "Hlavná navigácia", en: "Main navigation", cs: "Hlavní navigace", hu: "Fő navigáció", de: "Hauptnavigation" },
  nav_home: { sk: "DNABS — domov", en: "DNABS — home", cs: "DNABS — domů", hu: "DNABS — kezdőlap", de: "DNABS — Startseite" },
  nav_menu_open: { sk: "Otvoriť menu", en: "Open menu", cs: "Otevřít menu", hu: "Menü megnyitása", de: "Menü öffnen" },
  nav_menu_close: { sk: "Zavrieť menu", en: "Close menu", cs: "Zavřít menu", hu: "Menü bezárása", de: "Menü schließen" },
  lang_label: { sk: "Jazyk", en: "Language", cs: "Jazyk", hu: "Nyelv", de: "Sprache" },
  footer_made: { sk: "Made in Slovakia 🇸🇰", en: "Made in Slovakia 🇸🇰", cs: "Made in Slovakia 🇸🇰", hu: "Made in Slovakia 🇸🇰", de: "Made in Slovakia 🇸🇰" },
} satisfies Record<string, Preklad>;

const phDict = {
  ph_name: { sk: "Meno a priezvisko *", en: "Full name *", cs: "Jméno a příjmení *", hu: "Teljes név *", de: "Vor- und Nachname *" },
  ph_company: { sk: "Názov firmy / prevádzky *", en: "Company / business name *", cs: "Název firmy / provozovny *", hu: "Cég / üzlet neve *", de: "Name der Firma / des Betriebs *" },
  ph_email: { sk: "E-mail *", en: "E-mail *", cs: "E-mail *", hu: "E-mail *", de: "E-Mail *" },
  ph_phone: { sk: "Telefón *", en: "Phone *", cs: "Telefon *", hu: "Telefon *", de: "Telefon *" },
  ph_site: { sk: "Web alebo Instagram", en: "Website or Instagram", cs: "Web nebo Instagram", hu: "Weboldal vagy Instagram", de: "Website oder Instagram" },
  ph_business: { sk: "V akom odvetví podnikáte? *", en: "What industry are you in? *", cs: "V jakém oboru podnikáte? *", hu: "Milyen ágazatban tevékenykedik? *", de: "In welcher Branche sind Sie tätig? *" },
  ph_business_other: { sk: "Napíšte svoje odvetvie *", en: "Write your industry *", cs: "Napište svůj obor *", hu: "Írja be az ágazatát *", de: "Ihre Branche eingeben *" },
  ph_project_type: { sk: "Typ projektu *", en: "Project type *", cs: "Typ projektu *", hu: "Projekt típusa *", de: "Projektart *" },
  ph_budget: { sk: "Rozpočet", en: "Budget", cs: "Rozpočet", hu: "Költségkeret", de: "Budget" },
  ph_when: { sk: "Kedy to riešite", en: "When are you tackling this", cs: "Kdy to řešíte", hu: "Mikorra tervezi", de: "Wann soll es losgehen" },
  ph_msg: {
    sk: "Čo presne potrebujete? *",
    en: "What exactly do you need? *",
    cs: "Co přesně potřebujete? *",
    hu: "Pontosan mire van szüksége? *",
    de: "Was genau brauchen Sie? *",
  },
} satisfies Record<string, Preklad>;

export type DictKey = keyof typeof dict;
export type PhDictKey = keyof typeof phDict;

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: DictKey) => string;
  tPh: (key: PhDictKey) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

/**
 * Jazyk webu. Server vždy vyrenderuje slovenčinu (stránky sú statické),
 * prehliadač po načítaní prepne na jazyk, ktorý si návštevník zvolil
 * naposledy — pamätá si ho v localStorage, takže platí na všetkých
 * podstránkach aj pri ďalšej návšteve.
 */
export function LanguageProvider({
  children,
  defaultLang = "sk",
}: {
  children: ReactNode;
  defaultLang?: Lang;
}) {
  const [lang, nastavLang] = useState<Lang>(defaultLang);

  useEffect(() => {
    try {
      const ulozeny = window.localStorage.getItem(ULOZENY_JAZYK);
      // Jednorazové zosúladenie s localStorage po hydratácii — počas
      // renderu na serveri localStorage neexistuje.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (jeJazyk(ulozeny)) nastavLang(ulozeny);
    } catch {
      /* Súkromné okno alebo zablokované úložisko — ostane predvolený jazyk. */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((novy: Lang) => {
    nastavLang(novy);
    try {
      window.localStorage.setItem(ULOZENY_JAZYK, novy);
    } catch {
      /* Bez úložiska jazyk platí len do obnovenia stránky. */
    }
  }, []);

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
