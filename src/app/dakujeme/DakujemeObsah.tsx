"use client";

import Link from "next/link";
import { useLanguage, type Preklad } from "@/lib/i18n";
import styles from "./page.module.css";

const OBSAH: Record<"kicker" | "nadpis" | "dodatok" | "text" | "spat", Preklad> = {
  kicker: { sk: "// Dopyt odoslaný", cs: "// Poptávka odeslána", en: "// Enquiry sent", hu: "// Ajánlatkérés elküldve", de: "// Anfrage gesendet" },
  nadpis: { sk: "Ďakujeme", cs: "Děkujeme", en: "Thank you", hu: "Köszönjük", de: "Danke" },
  dodatok: { sk: "— ozveme sa.", cs: "— ozveme se.", en: "— we'll be in touch.", hu: "— jelentkezünk.", de: "— wir melden uns." },
  text: {
    sk: "Tvoju správu sme prijali. Ozveme sa ti na e-mail alebo telefón, ktorý si nám nechal/-a, a dohodneme si rýchlu 30-minútovú konzultáciu — zadarmo a nezáväzne.",
    cs: "Tvou zprávu jsme přijali. Ozveme se ti na e-mail nebo telefon, který jsi nám nechal/-a, a domluvíme si rychlou 30minutovou konzultaci — zdarma a nezávazně.",
    en: "We've received your message. We'll get back to you on the e-mail or phone you left us and set up a quick 30-minute consultation — free and with no commitment.",
    hu: "Megkaptuk az üzenetedet. Jelentkezünk a megadott e-mail-címen vagy telefonszámon, és egyeztetünk egy gyors, 30 perces konzultációt — ingyen és kötelezettség nélkül.",
    de: "Wir haben deine Nachricht erhalten. Wir melden uns per E-Mail oder Telefon, wie du es uns hinterlassen hast, und vereinbaren eine kurze 30-Minuten-Beratung — kostenlos und unverbindlich.",
  },
  spat: { sk: "Späť na web →", cs: "Zpět na web →", en: "Back to the website →", hu: "Vissza a weboldalra →", de: "Zurück zur Website →" },
};

export default function DakujemeObsah() {
  const { lang } = useLanguage();

  return (
    <main className={styles.section}>
      <div className={styles.kicker}>{OBSAH.kicker[lang]}</div>
      <h1 className={styles.h1}>
        {OBSAH.nadpis[lang]}
        <span className={styles.script}>{OBSAH.dodatok[lang]}</span>
      </h1>
      <p className={styles.body}>{OBSAH.text[lang]}</p>
      <Link href="/" className={styles.cta}>
        {OBSAH.spat[lang]}
      </Link>
    </main>
  );
}
