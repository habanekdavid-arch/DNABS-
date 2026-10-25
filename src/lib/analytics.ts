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

/**
 * Konverzná akcia v Google Ads: „DNABS – Lead (ďakovná stránka)“, kategória
 * Odoslanie formulára pre potenciálnych zákazníkov, počítaná raz za dopyt.
 *
 * Label nájdeš v Ads → Ciele → Súhrn → konverzná akcia → Nastaviť značku →
 * Použiť Google tag, v tvare `send_to: 'AW-18360461587/<LABEL>'`.
 *
 * Zámerne tu nie je žiadny zapísaný label ako záloha. Starý
 * `Ctr6CJKaj9kcEJPS-bJE` patril akcii „Zobrazenie stránky“, ktorá je dnes
 * sekundárna — keby ostal ako fallback, pri chýbajúcej premennej by sa ticho
 * merala nesprávna akcia a čísla v Ads by vyzerali v poriadku. Radšej nech
 * konverzia neodíde vôbec a je to vidieť.
 */
const ADS_ID = process.env.NEXT_PUBLIC_ADS_ID ?? "AW-18360461587";
const ADS_LABEL = process.env.NEXT_PUBLIC_ADS_CONVERSION_LABEL;
export const ADS_SEND_TO = ADS_LABEL ? `${ADS_ID}/${ADS_LABEL}` : null;

/** Jeden lead berieme ako hodnotu 1 € — Ads potrebuje nejakú hodnotu, aby
 *  vedelo optimalizovať, a skutočnú hodnotu zákazky v tej chvíli nepoznáme. */
export const LEAD_VALUE = 1;
export const LEAD_CURRENCY = "EUR";

export type LeadEvent = {
  /** Ktorý formulár to bol — keby pribudol druhý, vieme ich odlíšiť. */
  formLocation: string;
  /** Kód služby z formulára: web | eshop | redesign | app | marketing */
  sluzba: string;
  /** ID leadu z databázy. Slúži ako transaction_id — Google podľa neho
   *  zahodí druhý ping o tej istej konverzii (napr. z /dakujeme). */
  leadId?: number | string | null;
  /** Kód odvetvia. Formulár sa naň už nepýta, tak je nepovinné — staré
   *  volania s ním fungujú ďalej. */
  odvetvie?: string;
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

/**
 * Konverzia priamo do Google Ads. Spúšťa sa hneď po úspešnom uložení leadu,
 * nie až na ďakovacej stránke — ak návštevník zavrie tab skôr, než sa
 * /dakujeme načíta, konverzia by sa inak stratila. Druhý ping z /dakujeme
 * zahodí Google podľa transaction_id.
 */
export function trackAdsConversion(leadId?: number | string | null): boolean {
  if (typeof window === "undefined") return false;
  if (!ADS_SEND_TO) {
    console.warn(
      "Ads konverzia sa neodoslala: chýba NEXT_PUBLIC_ADS_CONVERSION_LABEL.",
    );
    return false;
  }
  if (typeof window.gtag !== "function") return false;
  try {
    window.gtag("event", "conversion", {
      send_to: ADS_SEND_TO,
      value: LEAD_VALUE,
      currency: LEAD_CURRENCY,
      ...(leadId != null ? { transaction_id: String(leadId) } : {}),
    });
    return true;
  } catch (err) {
    console.error("trackAdsConversion: gtag zlyhal", err);
    return false;
  }
}

/** Vráti true, ak sa Ads konverziu podarilo odoslať. Pri false ju musí
 *  doposlať ďakovacia stránka. */
export function trackLead({ formLocation, sluzba, odvetvie, leadId, email, phone }: LeadEvent): boolean {
  if (typeof window === "undefined") return false;

  // Musí ísť pred udalosťou, inak ju Google spáruje bez údajov o používateľovi.
  setUserData({ email, phone });

  const payload = {
    form_location: formLocation,
    sluzba: sluzba || "neuvedene",
    odvetvie: odvetvie || "neuvedene",
    value: LEAD_VALUE,
    currency: LEAD_CURRENCY,
    ...(leadId != null ? { transaction_id: String(leadId) } : {}),
  };

  try {
    window.gtag?.("event", "generate_lead", payload);
  } catch (err) {
    console.error("trackLead: gtag zlyhal", err);
  }

  return trackAdsConversion(leadId);

  // Ak by web niekedy prešiel na Google Tag Manager, udalosť tam už čaká.
  // Osobné údaje sem nepatria — dataLayer vidí každý skript na stránke.
  try {
    window.dataLayer?.push({ event: "generate_lead", ...payload });
  } catch (err) {
    console.error("trackLead: dataLayer zlyhal", err);
  }
}

/**
 * Klik na telefón alebo e-mail. Pre časť návštevníkov je to jediný prejav
 * záujmu — formulár nevyplnia, ale zavolajú. V Ads sa to dá označiť ako
 * druhotná konverzia, preto to meriame zvlášť od generate_lead.
 */
export function trackContactClick(kind: "phone" | "email", where: string) {
  if (typeof window === "undefined") return;
  const name = kind === "phone" ? "contact_phone_click" : "contact_email_click";
  const payload = { form_location: where };
  try {
    window.gtag?.("event", name, payload);
  } catch (err) {
    console.error(`${name}: gtag zlyhal`, err);
  }
  try {
    window.dataLayer?.push({ event: name, ...payload });
  } catch (err) {
    console.error(`${name}: dataLayer zlyhal`, err);
  }
}
