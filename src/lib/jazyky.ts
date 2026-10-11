/* ── JAZYKY WEBU ─────────────────────────────────────────────────────
   Jediné miesto, kde sa definuje, aké jazyky web pozná. Každý text na
   webe je objekt typu Preklad — keď niektorý jazyk chýba, TypeScript
   zahlási chybu, takže sa nedá zabudnúť nič preložiť.

   Tento súbor nie je "use client", aby ho mohli importovať aj dátové
   súbory a serverové stránky.
   ─────────────────────────────────────────────────────────────────── */

/** Poradie je aj poradím v prepínači jazykov. */
export const JAZYKY = ["sk", "cs", "en", "hu", "de"] as const;

export type Lang = (typeof JAZYKY)[number];

/** Jeden text vo všetkých jazykoch webu. */
export type Preklad = Record<Lang, string>;

/** Názov jazyka v ňom samom — tak ho hľadá človek, ktorý ním hovorí. */
export const NAZVY_JAZYKOV: Record<Lang, string> = {
  sk: "Slovenčina",
  cs: "Čeština",
  en: "English",
  hu: "Magyar",
  de: "Deutsch",
};

/** Formát čísel a dátumov pre daný jazyk. */
export const LOCALE: Record<Lang, string> = {
  sk: "sk-SK",
  cs: "cs-CZ",
  en: "en-US",
  hu: "hu-HU",
  de: "de-DE",
};

export function jeJazyk(hodnota: unknown): hodnota is Lang {
  return typeof hodnota === "string" && (JAZYKY as readonly string[]).includes(hodnota);
}
