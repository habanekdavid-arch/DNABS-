/**
 * GA4 udalosti. Meranie je dobrovoľná nadstavba — keď nie je nastavené
 * NEXT_PUBLIC_GA4_ID, keď gtag zablokuje adblock alebo keď návštevník
 * odmietne súhlas, formulár musí odísť úplne rovnako.
 *
 * Do GA4 neposielame žiadne osobné údaje — len typ služby a odvetvie.
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
};

export function trackLead({ formLocation, sluzba, odvetvie }: LeadEvent) {
  if (typeof window === "undefined") return;

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
  try {
    window.dataLayer?.push({ event: "generate_lead", ...payload });
  } catch (err) {
    console.error("trackLead: dataLayer zlyhal", err);
  }
}
