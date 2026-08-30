"use client";

import { resetConsent } from "@/lib/cookieConsent";

export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={resetConsent}
      style={{
        fontFamily: "var(--mono)",
        fontSize: "12px",
        textTransform: "uppercase",
        letterSpacing: ".04em",
        background: "transparent",
        color: "#0a0a0a",
        border: "2px solid #0a0a0a",
        borderRadius: "8px",
        padding: "11px 18px",
        cursor: "pointer",
      }}
    >
      Zmeniť nastavenia cookies
    </button>
  );
}
