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

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          message: data.get("message"),
        }),
      });
      if (!res.ok) throw new Error("failed");
      form.reset();
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
          <textarea
            rows={4}
            name="message"
            aria-label={tPh("ph_msg")}
            placeholder={tPh("ph_msg")}
            className={styles.field}
          />
          <button type="submit" disabled={status === "sending"} className={styles.submit}>
            {status === "sending" ? t("contact_sending") : t("contact_submit")}
          </button>
          {status === "error" && <p className={styles.errorMsg}>{t("contact_error")}</p>}
        </form>
      </Reveal>
    </section>
  );
}
