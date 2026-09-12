import { getStoredConsent } from "@/lib/cookieConsent";

/**
 * GA4 a Google Ads udalosti. Meranie je dobrovoľná nadstavba — keď nie je
 * nastavené NEXT_PUBLIC_GA4_ID, keď gtag zablokuje adblock alebo keď
 * návštevník odmietne súhlas, formulár musí odísť úplne rovnako.
 *
 * Do samotnej udalosti neposielame žiadne osobné údaje — len typ služby
 * a odvetvie. E-mail a telefón idú výhradne cez gtag('set', 'user_data'),
 * kde ich Google pred odoslaním zahashuje (SHA-256) priamo v prehliadači.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export type LeadEvent = {
  /** Ktorý formulár to bol — keby pribudol druhý, vieme ich odlíšiť. */
  formLocation: string;
  /** Kód služby z formulára: web | eshop | redesign | app | marketing */
  sluzba: string;
  /** Kód odvetvia z formulára: gastro | krasa | fitness | stavba | auto |
   *  obchod | sluzby | reality | zdravie | vzdelavanie, alebo pri voľbe
   *  „Iné“ text, ktorý návštevník napísal. */
  odvetvie: string;
  /** Pre vylepšené konverzie. Nikdy sa nedostane do parametrov udalosti. */
  email?: string;
  /** Pre vylepšené konverzie. Nikdy sa nedostane do parametrov udalosti. */
  phone?: string;
};

/** E.164: plus, prvá číslica nie nula, spolu 8 až 15 číslic. */
const E164 = /^\+[1-9]\d{7,14}$/;

/** Google porovnáva e-maily po orezaní a v malých písmenách. */
export function normalizeEmail(raw: string | undefined | null): string | null {
  const email = (raw ?? "").trim().toLowerCase();
  return email || null;
}

/**
 * Telefón do tvaru E.164. Medzery, zátvorky, pomlčky a bodky sú len
 * formátovanie. Číslo s úvodnou nulou berieme ako slovenské, „00“ je
 * medzinárodná predvoľba. Čokoľvek iné (napr. „949 390 797“ bez predvoľby)
 * radšej neposielame než by sme hádali krajinu.
 */
export function normalizePhone(raw: string | undefined | null): string | null {
  if (!raw) return null;
  const cleaned = raw.replace(/[\s()\-.]/g, "");

  let e164: string;
  if (cleaned.startsWith("+")) e164 = cleaned;
  else if (cleaned.startsWith("00")) e164 = `+${cleaned.slice(2)}`;
  else if (cleaned.startsWith("0")) e164 = `+421${cleaned.slice(1)}`;
  else return null;

  return E164.test(e164) ? e164 : null;
}

/**
 * Údaje poskytnuté používateľom pre vylepšené konverzie. Posielame ich len
 * so súhlasom — bez neho by Google dostal osobné údaje, na ktoré nemá mandát.
 * Hashovanie nechávame na gtag, ručné by len rozbilo párovanie.
 */
function setUserData({ email, phone }: Pick<LeadEvent, "email" | "phone">) {
  try {
    if (getStoredConsent() !== "granted") return;

    const userData: { email?: string; phone_number?: string } = {};
    const normalizedEmail = normalizeEmail(email);
    const normalizedPhone = normalizePhone(phone);
    if (normalizedEmail) userData.email = normalizedEmail;
    if (normalizedPhone) userData.phone_number = normalizedPhone;
    if (!normalizedEmail && !normalizedPhone) return;

    window.gtag?.("set", "user_data", userData);
  } catch (err) {
    // Zámerne bez hodnôt — do konzoly nesmie uniknúť e-mail ani telefón.
    console.error("trackLead: user_data sa nepodarilo nastaviť", err);
  }
}

export function trackLead({ formLocation, sluzba, odvetvie, email, phone }: LeadEvent) {
  if (typeof window === "undefined") return;

  // Musí ísť pred udalosťou, inak ju Google spáruje bez údajov o používateľovi.
  setUserData({ email, phone });

  const payload = {
    form_location: formLocation,
    sluzba: sluzba || "neuvedene",
    odvetvie: odvetvie || "neuvedene",
  };

  try {
    window.gtag?.("event", "generate_lead", payload);
  } catch (err) {
    console.error("trackLead: gtag zlyhal", err);
  }

  // Ak by web niekedy prešiel na Google Tag Manager, udalosť tam už čaká.
  // Osobné údaje sem nepatria — dataLayer vidí každý skript na stránke.
  try {
    window.dataLayer?.push({ event: "generate_lead", ...payload });
  } catch (err) {
    console.error("trackLead: dataLayer zlyhal", err);
  }
}
