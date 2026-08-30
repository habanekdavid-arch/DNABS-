"use client";

import { useEffect, useState } from "react";
import { getStoredConsent, storeConsent } from "@/lib/cookieConsent";
import styles from "./CookieConsent.module.css";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      const stored = getStoredConsent();
      if (stored) {
        // Re-apply on every load — Google's default consent state resets per page load.
        if (stored === "granted") storeConsent("granted");
        setVisible(false);
      } else {
        setVisible(true);
      }
    };
    checkConsent();
    window.addEventListener("dnabs-consent-reset", checkConsent);
    return () => window.removeEventListener("dnabs-consent-reset", checkConsent);
  }, []);

  if (!visible) return null;

  return (
    <div className={styles.banner} role="dialog" aria-label="Súhlas s cookies">
      <p className={styles.text}>
        Používame nevyhnutné cookies na fungovanie webu a s tvojím súhlasom aj marketingové
        cookies (Google Ads) na meranie úspešnosti kampaní. Viac v{" "}
        <a href="/cookies">zásadách používania cookies</a>.
      </p>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.accept}
          onClick={() => {
            storeConsent("granted");
            setVisible(false);
          }}
        >
          Prijať všetko
        </button>
        <button
          type="button"
          className={styles.decline}
          onClick={() => {
            storeConsent("denied");
            setVisible(false);
          }}
        >
          Len nevyhnutné
        </button>
      </div>
    </div>
  );
}
