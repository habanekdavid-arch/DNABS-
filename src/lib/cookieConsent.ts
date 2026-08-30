export const CONSENT_KEY = "dnabs_cookie_consent";
export type ConsentChoice = "granted" | "denied";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function applyConsent(choice: ConsentChoice) {
  window.gtag?.("consent", "update", {
    ad_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
    analytics_storage: choice,
  });
}

export function getStoredConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  const value = localStorage.getItem(CONSENT_KEY);
  return value === "granted" || value === "denied" ? value : null;
}

export function storeConsent(choice: ConsentChoice) {
  localStorage.setItem(CONSENT_KEY, choice);
  applyConsent(choice);
}

export function resetConsent() {
  localStorage.removeItem(CONSENT_KEY);
  window.dispatchEvent(new Event("dnabs-consent-reset"));
}
