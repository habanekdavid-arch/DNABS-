"use client";

import { useEffect } from "react";
import { trackAdsConversion } from "@/lib/analytics";

const FLAG_KEY = "dnabs_conversion_pending";

/**
 * Poistka ku konverzii, ktorá odchádza už z formulára (Contact.tsx).
 *
 * Spustí sa len vtedy, keď sa na túto stránku prišlo rovno po skutočnom
 * odoslaní formulára — podľa príznaku, ktorý formulár uloží. Priamy vstup
 * ani obnovenie /dakujeme teda žiadnu konverziu nevyrobí.
 *
 * Príznak nesie id leadu, ktoré ide do konverzie ako transaction_id, takže
 * Google tento druhý ping spáruje s tým z formulára a nezapočíta ho znova.
 */
export default function ConversionEvent() {
  useEffect(() => {
    let pending: string | null = null;
    try {
      pending = sessionStorage.getItem(FLAG_KEY);
      if (pending) sessionStorage.removeItem(FLAG_KEY);
    } catch {
      // Zablokované úložisko — konverzia už odišla z formulára.
      return;
    }
    if (!pending) return;

    // "1" znamená, že id leadu sa nepodarilo prečítať.
    trackAdsConversion(pending === "1" ? null : pending);
  }, []);

  return null;
}
