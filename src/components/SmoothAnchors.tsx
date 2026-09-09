"use client";

import { useEffect } from "react";

/**
 * Odkazy na sekcie tej istej stránky (#sluzby, #kontakt, …) rieši prehliadač
 * sám — bez toho by ich Next.js najprv preroutoval a stránka poskočila hore.
 * Vďaka tomu sa všetky tlačidlá presúvajú na sekciu rovnako a plynulo.
 */
export default function SmoothAnchors() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const link = (e.target as Element | null)?.closest?.("a");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href || !href.includes("#")) return;
      if (link.getAttribute("target") === "_blank") return;

      const url = new URL(href, window.location.href);
      // Iný web alebo iná podstránka — nechaj to na Next.js.
      if (url.origin !== window.location.origin) return;
      if (url.pathname !== window.location.pathname) return;

      const id = decodeURIComponent(url.hash.slice(1));
      const target = id ? document.getElementById(id) : null;
      if (!target) return;

      e.preventDefault();
      e.stopPropagation();
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
      window.history.replaceState(null, "", url.hash);
    };

    // Capture, aby sme boli skôr ako router.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
