/**
 * Globálne typy pre skripty tretích strán.
 *
 * gtag definuje útržok v layout.tsx ešte pred načítaním gtag.js, takže na
 * stránke existuje hneď a udalosti sa medzitým hromadia v dataLayer. Napriek
 * tomu je nepovinný: adblock alebo firemná CSP ho môžu odstrániť úplne, a
 * meranie nikdy nesmie zhodiť formulár — preto `?`, nie `!`.
 */
export {};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}
