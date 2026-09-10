"use client";

import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";
import { useLanguage } from "@/lib/i18n";
import Emph from "./Emph";
import Reveal from "./Reveal";
import styles from "./Contact.module.css";

/* Rozpočet aj termín ukladáme ako stabilné kódy, nie ako preložený text —
   inak by v databáze skončilo raz „300 – 800 €“ a raz „€300 – €800“. */
const BUDGETS = [
  { value: "lt300", key: "opt_budget_1" },
  { value: "300_800", key: "opt_budget_2" },
  { value: "800_2000", key: "opt_budget_3" },
  { value: "2000plus", key: "opt_budget_4" },
] as const;

const WHEN = [
  { value: "asap", key: "opt_when_1" },
  { value: "1_2m", key: "opt_when_2" },
  { value: "research", key: "opt_when_3" },
] as const;

const PROJECT_TYPES = [
  { value: "web", key: "opt_type_web" },
  { value: "eshop", key: "opt_type_eshop" },
  { value: "redesign", key: "opt_type_redesign" },
  { value: "app", key: "opt_type_app" },
  { value: "marketing", key: "opt_type_marketing" },
] as const;


type PickerOption = { value: string; label: string };

/** Výber, ktorý sa rozklikne priamo vo formulári — natívny select otvára
 *  systémové okno, ktoré na tmavom formulári pôsobí ako cudzí prvok. */
function FieldPicker({
  name,
  label,
  options,
  value,
  onChange,
  openId,
  setOpenId,
}: {
  name: string;
  label: string;
  options: readonly PickerOption[];
  value: string;
  onChange: (value: string) => void;
  openId: string | null;
  setOpenId: (id: string | null) => void;
}) {
  const open = openId === name;
  const selected = options.find((option) => option.value === value);

  return (
    <div className={styles.picker} data-filled={value ? "true" : undefined}>
      <button
        type="button"
        className={styles.pickerHead}
        aria-expanded={open}
        onClick={() => setOpenId(open ? null : name)}
      >
        <span className={selected ? styles.pickerValue : styles.pickerLabel}>
          {selected ? selected.label : label}
        </span>
        <span className={`${styles.pickerIcon} ${open ? styles.pickerIconOpen : ""}`} aria-hidden>
          +
        </span>
      </button>
      <div className={`${styles.pickerPanel} ${open ? styles.pickerPanelOpen : ""}`}>
        <div className={styles.pickerPanelInner}>
          <div className={styles.pickerOptions}>
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`${styles.pickerOption} ${
                  option.value === value ? styles.pickerOptionActive : ""
                }`}
                onClick={() => {
                  onChange(option.value);
                  setOpenId(null);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <input type="hidden" name={name} value={value} />
    </div>
  );
}

export default function Contact() {
  const { t, tPh } = useLanguage();
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [file, setFile] = useState<File | null>(null);
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "error">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Naraz nech je otvorený len jeden výber.
  const [openPicker, setOpenPicker] = useState<string | null>(null);
  const [projectType, setProjectType] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");

  const removeFile = () => {
    setFile(null);
    setUploadState("idle");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

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

    let attachmentUrl: string | null = null;
    let attachmentName: string | null = null;

    if (file) {
      setUploadState("uploading");
      try {
        const blob = await upload(file.name, file, {
          access: "private",
          handleUploadUrl: "/api/upload",
        });
        attachmentUrl = blob.url;
        attachmentName = file.name;
        setUploadState("idle");
      } catch {
        setUploadState("error");
        setStatus("error");
        return;
      }
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          company: data.get("company"),
          siteOrSocial: data.get("siteOrSocial"),
          projectType: data.get("projectType"),
          budget: data.get("budget"),
          timeline: data.get("timeline"),
          message: data.get("message"),
          website: data.get("website"),
          attachmentUrl,
          attachmentName,
          source: typeof window !== "undefined" ? window.location.pathname : undefined,
        }),
      });
      if (!res.ok) throw new Error("failed");
      form.reset();
      removeFile();
      setProjectType("");
      setBudget("");
      setTimeline("");
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
          <p className={styles.intro}>
            <Emph text={t("contact_intro")} />
          </p>
          <ul className={styles.perks}>
            <li>
              <span className={styles.perkIcon}>✓</span> <Emph text={t("contact_perk1")} />
            </li>
            <li>
              <span className={styles.perkIcon}>✓</span> <Emph text={t("contact_perk2")} />
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

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            aria-label={tPh("ph_name")}
            placeholder={tPh("ph_name")}
            className={styles.field}
          />
          <input
            type="text"
            name="company"
            required
            autoComplete="organization"
            aria-label={tPh("ph_company")}
            placeholder={tPh("ph_company")}
            className={styles.field}
          />
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            aria-label={tPh("ph_email")}
            placeholder={tPh("ph_email")}
            className={styles.field}
          />
          <input
            type="tel"
            name="phone"
            required
            autoComplete="tel"
            aria-label={tPh("ph_phone")}
            placeholder={tPh("ph_phone")}
            className={styles.field}
          />
          <div className={styles.fieldGroup}>
            <input
              type="text"
              name="siteOrSocial"
              required
              autoComplete="url"
              aria-label={tPh("ph_site")}
              placeholder={tPh("ph_site")}
              className={styles.field}
            />
            <p className={styles.fieldHint}>
              <span>{t("contact_site_hint")}</span>
            </p>
          </div>
          <FieldPicker
            name="projectType"
            label={tPh("ph_project_type")}
            options={PROJECT_TYPES.map((o) => ({ value: o.value, label: t(o.key) }))}
            value={projectType}
            onChange={setProjectType}
            openId={openPicker}
            setOpenId={setOpenPicker}
          />
          <FieldPicker
            name="budget"
            label={tPh("ph_budget")}
            options={BUDGETS.map((o) => ({ value: o.value, label: t(o.key) }))}
            value={budget}
            onChange={setBudget}
            openId={openPicker}
            setOpenId={setOpenPicker}
          />
          <FieldPicker
            name="timeline"
            label={tPh("ph_when")}
            options={WHEN.map((o) => ({ value: o.value, label: t(o.key) }))}
            value={timeline}
            onChange={setTimeline}
            openId={openPicker}
            setOpenId={setOpenPicker}
          />
          <textarea
            rows={4}
            name="message"
            required
            minLength={20}
            aria-label={tPh("ph_msg")}
            placeholder={tPh("ph_msg")}
            className={styles.field}
          />

          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className={styles.honeypot}
          />

          <details className={styles.more}>
            <summary className={styles.moreSummary}>{t("contact_more")}</summary>
            <div className={styles.moreInner}>
              <div className={styles.uploadWrap}>
                <input
                  ref={fileInputRef}
                  id="attachment"
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif,application/pdf"
                  className={styles.uploadInput}
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                />
                {!file ? (
                  <label htmlFor="attachment" className={styles.uploadLabel}>
                    <span className={styles.uploadIcon} aria-hidden>
                      +
                    </span>
                    <span>
                      <span className={styles.uploadTitle}>{t("upload_label")}</span>
                      <span className={styles.uploadHint}>{t("upload_hint")}</span>
                    </span>
                  </label>
                ) : (
                  <div className={styles.uploadFile}>
                    <span className={styles.uploadFileName}>{file.name}</span>
                    {uploadState === "uploading" ? (
                      <span className={styles.uploadStatus}>{t("upload_uploading")}</span>
                    ) : (
                      <button type="button" className={styles.uploadRemove} onClick={removeFile}>
                        {t("upload_remove")}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </details>

          <button
            type="submit"
            disabled={status === "sending"}
            className={styles.submit}
            data-cursor="cta"
          >
            {status === "sending" ? t("contact_sending") : t("contact_submit")}
          </button>
          <p className={styles.formNote}>
            <Emph text={t("contact_note")} />
          </p>
          {status === "error" && (
            <p className={styles.errorMsg}>
              {uploadState === "error" ? t("upload_error") : t("contact_error")}
            </p>
          )}
        </form>
      </Reveal>
    </section>
  );
}
