"use client";

import { useEffect, useState } from "react";
import { getStoredConsent, storeConsent } from "@/lib/cookieConsent";
import { useLanguage } from "@/lib/i18n";
import styles from "./CookieConsent.module.css";

export default function CookieConsent() {
  const { t } = useLanguage();
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
    <div className={styles.banner} role="dialog" aria-label={t("cookie_label")}>
      <p className={styles.text}>
        {t("cookie_text")}{" "}
        <a href="/cookies">{t("cookie_link")}</a>.
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
          {t("cookie_accept")}
        </button>
        <button
          type="button"
          className={styles.decline}
          onClick={() => {
            storeConsent("denied");
            setVisible(false);
          }}
        >
          {t("cookie_decline")}
        </button>
      </div>
    </div>
  );
}
