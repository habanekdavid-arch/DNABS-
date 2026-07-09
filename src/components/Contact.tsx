"use client";

import { useState, type FormEvent } from "react";
import { useLanguage } from "@/lib/i18n";
import Reveal from "./Reveal";
import styles from "./Contact.module.css";

export default function Contact() {
  const { t, tPh } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
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
          <div className={styles.infoBlock}>
            <div className={styles.infoLabel}>{t("contact_label_email")}</div>
            <a href="mailto:hello@dnabs.sk" className={styles.emailLink}>hello@dnabs.sk</a>
            <div className={styles.infoLabel}>{t("contact_label_phone")}</div>
            <div>+421 900 000 000</div>
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
          <textarea
            rows={4}
            name="message"
            aria-label={tPh("ph_msg")}
            placeholder={tPh("ph_msg")}
            className={styles.field}
          />
          <button
            type="submit"
            className={`${styles.submit} ${submitted ? styles.success : ""}`}
          >
            {submitted ? t("contact_success") : t("contact_submit")}
          </button>
        </form>
      </Reveal>
    </section>
  );
}
