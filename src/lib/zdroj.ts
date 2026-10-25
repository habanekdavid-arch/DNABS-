/**
 * Zdroj návštevy — odkiaľ človek prišiel, zachytené pri prvom vstupe.
 *
 * Prečo to vôbec robíme: gclid je v adrese len na tej úplne prvej stránke.
 * Kým sa návštevník preklikne k formuláru a odošle ho, je dávno preč, takže
 * v databáze by sme pri leade nemali ako zistiť, či prišiel z reklamy.
 * Uložíme ho teda hneď a k formuláru ho pripojíme až pri odoslaní.
 *
 * sessionStorage naschvál a nie localStorage: zdroj má platiť pre jednu
 * návštevu. Keby sa držal natrvalo, lead z priameho vstupu o mesiac neskôr
 * by sa tváril, že prišiel z reklamy, a skresľoval by vyhodnotenie kampane.
 */

const KLUC = "dnabs_zdroj";

export type Zdroj = {
  gclid: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  landing: string | null;
  referrer: string | null;
};

const PRAZDNY: Zdroj = {
  gclid: null,
  utm_source: null,
  utm_medium: null,
  utm_campaign: null,
  utm_term: null,
  landing: null,
  referrer: null,
};

/* Dlhé hodnoty nemá zmysel ukladať — gclid má bežne do 100 znakov a
   stĺpce v databáze sú obmedzené. Zároveň je to strop pre prípad, že by
   niekto skúsil cez adresu natlačiť do databázy kilobajty textu. */
const MAX = 512;

const orez = (hodnota: string | null): string | null => {
  const text = (hodnota ?? "").trim();
  return text ? text.slice(0, MAX) : null;
};

/**
 * Zapíše zdroj, ak preň ešte nič uložené nie je. Druhé a ďalšie volanie
 * v tej istej návšteve nespraví nič — prvý vstup je ten, ktorý platí.
 * Výnimka: ak v adrese pribudol gclid a dovtedy sme žiadny nemali,
 * doplníme ho (človek sa mohol vrátiť cez reklamu v tej istej návšteve).
 */
export function zachytZdroj(): void {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const ulozeny = nacitajZdroj();
    const gclid = orez(params.get("gclid"));

    if (ulozeny) {
      if (gclid && !ulozeny.gclid) {
        zapis({ ...ulozeny, gclid });
      }
      return;
    }

    zapis({
      gclid,
      utm_source: orez(params.get("utm_source")),
      utm_medium: orez(params.get("utm_medium")),
      utm_campaign: orez(params.get("utm_campaign")),
      utm_term: orez(params.get("utm_term")),
      landing: orez(window.location.pathname + window.location.search),
      /* Referrer z vlastného webu nie je zdroj návštevy, len predošlá
         stránka — zaujíma nás, odkiaľ človek na web prišiel. */
      referrer: orez(jeCudzi(document.referrer) ? document.referrer : null),
    });
  } catch {
    // Privátne okno alebo zablokované úložisko. Zdroj je nadstavba,
    // formulár musí fungovať aj bez neho.
  }
}

function jeCudzi(referrer: string): boolean {
  if (!referrer) return false;
  try {
    return new URL(referrer).hostname !== window.location.hostname;
  } catch {
    return false;
  }
}

function zapis(zdroj: Zdroj): void {
  try {
    sessionStorage.setItem(KLUC, JSON.stringify(zdroj));
  } catch {
    // viď zachytZdroj
  }
}

/** Uložený zdroj, alebo null. Nikdy nevyhodí výnimku. */
export function nacitajZdroj(): Zdroj | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(KLUC);
    if (!raw) return null;
    const data = JSON.parse(raw) as Partial<Zdroj>;
    /* Rozložené cez PRAZDNY, aby staršie uložené záznamy bez niektorého
       kľúča nepadli na undefined pri odosielaní. */
    return { ...PRAZDNY, ...data };
  } catch {
    return null;
  }
}

/** Zdroj pripravený na pripojenie k telu požiadavky formulára. */
export function zdrojDoFormulara(): Zdroj {
  return nacitajZdroj() ?? PRAZDNY;
}
