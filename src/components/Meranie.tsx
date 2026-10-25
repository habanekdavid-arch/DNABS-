"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { zachytZdroj } from "@/lib/zdroj";
import { trackContactClick } from "@/lib/analytics";

/**
 * Dve drobnosti, ktoré musia bežať na každej stránke:
 *  1. zachytenie zdroja návštevy (gclid, UTM) pri prvom vstupe,
 *  2. meranie klikov na telefón a e-mail.
 *
 * Kliky riešime jedným poslucháčom na dokumente a nie onClick na každom
 * odkaze — odkazov na kontakt je po webe viac (pätička, kontakt, nové
 * vstupné stránky) a takto sa na žiadny nedá zabudnúť.
 */
export default function Meranie() {
  const pathname = usePathname();

  useEffect(() => {
    zachytZdroj();
  }, [pathname]);

  useEffect(() => {
    // V administrácii klikáme na čísla leadov my sami — to nie sú dopyty.
    if (pathname?.startsWith("/admin")) return;

    const naKlik = (e: MouseEvent) => {
      const odkaz = (e.target as HTMLElement | null)?.closest?.("a[href]");
      if (!odkaz) return;
      const href = odkaz.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) trackContactClick("phone", pathname ?? "/");
      else if (href.startsWith("mailto:")) trackContactClick("email", pathname ?? "/");
    };

    // Zachytávacia fáza: udalosť zmeriame aj vtedy, keď niektorý komponent
    // klik po ceste zastaví cez stopPropagation.
    document.addEventListener("click", naKlik, true);
    return () => document.removeEventListener("click", naKlik, true);
  }, [pathname]);

  return null;
}
