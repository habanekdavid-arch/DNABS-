"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n";
import Reveal from "./Reveal";
import styles from "./Contact.module.css";

export default function Contact() {
  const { t, tPh } = useLanguage();
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot — skryté pole, ktoré vypĺňajú len boti. Ak je vyplnené,
    // predstierame úspech bez toho, aby sme čokoľvek reálne odoslali.
    if (data.get("website")) {
      form.reset();
      router.push("/dakujeme");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          projectType: data.get("projectType"),
          budget: data.get("budget"),
          timeline: data.get("timeline"),
          message: data.get("message"),
          website: data.get("website"),
          source: typeof window !== "undefined" ? window.location.pathname : undefined,
        }),
      });
      if (!res.ok) throw new Error("failed");
      form.reset();
      sessionStorage.setItem("dnabs_conversion_pending", "1");
      router.push("/dakujeme");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="kontakt" className={styles.section}>
      <Reveal className={styles.grid}>
        <div>
          <div className={styles.kicker}>{t("contact_kicker")}</div>
          <h2 className={styles.h2}>
            <span className={styles.h2Line}>{t("contact_h1")}</span>
            <span className={styles.h2Script}>{t("contact_h2")}</span>
          </h2>
          <p className={styles.intro}>{t("contact_intro")}</p>
          <ul className={styles.perks}>
            <li>
              <span className={styles.perkIcon}>✓</span> {t("contact_perk1")}
            </li>
            <li>
              <span className={styles.perkIcon}>✓</span> {t("contact_perk2")}
            </li>
            <li>
              <span className={styles.perkIcon}>✓</span> {t("contact_perk3")}
            </li>
          </ul>
          <div className={styles.infoBlock}>
            <div className={styles.infoLabel}>{t("contact_label_email")}</div>
            <a href="mailto:contact.dnabs@gmail.com" className={styles.emailLink}>contact.dnabs@gmail.com</a>
            <div className={styles.infoLabel}>{t("contact_label_phone")}</div>
            <div>+421 949 390 797</div>
            <div className={styles.infoLabel}>{t("contact_label_location")}</div>
            <div>Bratislava, Slovensko</div>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            required
            aria-label={tPh("ph_name")}
            placeholder={tPh("ph_name")}
            className={styles.field}
          />
          <input
            type="email"
            name="email"
            required
            aria-label={tPh("ph_email")}
            placeholder={tPh("ph_email")}
            className={styles.field}
          />
          <input
            type="text"
            name="company"
            aria-label={tPh("ph_company")}
            placeholder={tPh("ph_company")}
            className={styles.field}
          />
          <select
            name="projectType"
            required
            defaultValue=""
            aria-label={tPh("ph_project_type")}
            className={styles.field}
          >
            <option value="" disabled>
              {tPh("ph_project_type")}
            </option>
            <option value="web">{t("opt_type_web")}</option>
            <option value="eshop">{t("opt_type_eshop")}</option>
            <option value="app">{t("opt_type_app")}</option>
            <option value="marketing">{t("opt_type_marketing")}</option>
          </select>
          <select
            name="budget"
            required
            defaultValue=""
            aria-label={tPh("ph_budget")}
            className={styles.field}
          >
            <option value="" disabled>
              {tPh("ph_budget")}
            </option>
            <option value={t("opt_budget_1")}>{t("opt_budget_1")}</option>
            <option value={t("opt_budget_2")}>{t("opt_budget_2")}</option>
            <option value={t("opt_budget_3")}>{t("opt_budget_3")}</option>
            <option value={t("opt_budget_4")}>{t("opt_budget_4")}</option>
            <option value={t("opt_budget_5")}>{t("opt_budget_5")}</option>
          </select>
          <select
            name="timeline"
            required
            defaultValue=""
            aria-label={tPh("ph_timeline")}
            className={styles.field}
          >
            <option value="" disabled>
              {tPh("ph_timeline")}
            </option>
            <option value={t("opt_timeline_1")}>{t("opt_timeline_1")}</option>
            <option value={t("opt_timeline_2")}>{t("opt_timeline_2")}</option>
            <option value={t("opt_timeline_3")}>{t("opt_timeline_3")}</option>
            <option value={t("opt_timeline_4")}>{t("opt_timeline_4")}</option>
          </select>
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className={styles.honeypot}
          />
          <textarea
            rows={4}
            name="message"
            aria-label={tPh("ph_msg")}
            placeholder={tPh("ph_msg")}
            className={styles.field}
          />
          <button type="submit" disabled={status === "sending"} className={styles.submit}>
            {status !== "sending" && (
              <span className={styles.submitBadge}>{t("hero_cta_badge")}</span>
            )}
            {status === "sending" ? t("contact_sending") : t("contact_submit")}
          </button>
          {status === "error" && <p className={styles.errorMsg}>{t("contact_error")}</p>}
        </form>
      </Reveal>
    </section>
  );
}
