"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const FLAG_KEY = "dnabs_conversion_pending";

/**
 * Fires the "Zobrazenie stránky" Google Ads conversion, but only when this
 * page was reached right after a real contact-form submission (flag set in
 * Contact.tsx). A direct visit/refresh of /dakujeme without that flag does
 * not fire the event, so it doesn't get counted as a false conversion.
 */
export default function ConversionEvent({ sendTo }: { sendTo: string }) {
  useEffect(() => {
    const pending = sessionStorage.getItem(FLAG_KEY);
    if (!pending) return;
    sessionStorage.removeItem(FLAG_KEY);

    window.gtag?.("event", "conversion", {
      send_to: sendTo,
      value: 1.0,
      currency: "EUR",
    });
  }, [sendTo]);

  return null;
}
