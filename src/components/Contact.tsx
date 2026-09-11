"use client";

import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";
import { useLanguage, type DictKey } from "@/lib/i18n";
import { trackLead } from "@/lib/analytics";
import Emph from "./Emph";
import Reveal from "./Reveal";
import styles from "./Contact.module.css";

/* Rozpočet, termín aj typ subjektu ukladáme ako stabilné kódy, nie ako
   preložený text — inak by v databáze aj v GA4 skončilo raz „300 – 800 €“
   a raz „€300 – €800“ podľa jazyka návštevníka. */
const PROJECT_TYPES = [
  { value: "web", key: "opt_type_web" },
  { value: "eshop", key: "opt_type_eshop" },
  { value: "redesign", key: "opt_type_redesign" },
  { value: "app", key: "opt_type_app" },
  { value: "marketing", key: "opt_type_marketing" },
] as const;

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

const INDUSTRIES = [
  { value: "gastro", key: "opt_ind_gastro" },
  { value: "krasa", key: "opt_ind_krasa" },
  { value: "fitness", key: "opt_ind_fitness" },
  { value: "stavba", key: "opt_ind_stavba" },
  { value: "auto", key: "opt_ind_auto" },
  { value: "obchod", key: "opt_ind_obchod" },
  { value: "sluzby", key: "opt_ind_sluzby" },
  { value: "reality", key: "opt_ind_reality" },
  { value: "zdravie", key: "opt_ind_zdravie" },
  { value: "vzdelavanie", key: "opt_ind_vzdelavanie" },
  { value: "ine", key: "opt_ind_ine" },
] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

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
  error,
}: {
  name: string;
  label: string;
  options: readonly PickerOption[];
  value: string;
  onChange: (value: string) => void;
  openId: string | null;
  setOpenId: (id: string | null) => void;
  error?: string;
}) {
  const open = openId === name;
  const selected = options.find((option) => option.value === value);

  return (
    <div className={styles.picker} data-filled={value ? "true" : undefined}>
      <button
        type="button"
        id={`field-${name}`}
        className={styles.pickerHead}
        role="combobox"
        aria-haspopup="listbox"
        aria-controls={`panel-${name}`}
        aria-expanded={open}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `err-${name}` : undefined}
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
          <div className={styles.pickerOptions} id={`panel-${name}`} role="listbox">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={option.value === value}
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
      {error && (
        <p id={`err-${name}`} className={styles.fieldError} role="alert">
          {error}
        </p>
      )}
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
  const formRef = useRef<HTMLFormElement>(null);

  // Naraz nech je otvorený len jeden výber.
  const [openPicker, setOpenPicker] = useState<string | null>(null);
  const [industry, setIndustry] = useState("");
  const [projectType, setProjectType] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const removeFile = () => {
    setFile(null);
    setUploadState("idle");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  /** Vráti mapu chýb. Prázdna mapa = formulár sa môže odoslať. */
  const validate = (data: FormData) => {
    const text = (key: string) => String(data.get(key) ?? "").trim();
    const found: Record<string, string> = {};

    if (text("name").length < 2) found.name = t("err_required");
    if (!industry) found.industry = t("err_pick");
    if (industry === "ine" && !text("business")) found.business = t("err_required");
    if (!EMAIL_RE.test(text("email"))) found.email = t("err_email");
    if (text("phone").replace(/\D/g, "").length < 6) found.phone = t("err_phone");
    if (!projectType) found.projectType = t("err_pick");
    if (text("message").length < 20) found.message = t("err_min20");

    return found;
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

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("idle");
      const first = Object.keys(found)[0];
      const el = form.querySelector<HTMLElement>(`[name="${first}"], #field-${first}`);
      (el?.tagName === "INPUT" || el?.tagName === "TEXTAREA" ? el : form.querySelector<HTMLElement>(`#field-${first}`))?.focus();
      el?.scrollIntoView({ block: "center", behavior: "smooth" });
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
          business: industry === "ine" ? data.get("business") : industry,
          siteOrSocial: data.get("siteOrSocial"),
          projectType,
          budget,
          timeline,
          message: data.get("message"),
          website: data.get("website"),
          attachmentUrl,
          attachmentName,
          source: typeof window !== "undefined" ? window.location.pathname : undefined,
        }),
      });
      if (!res.ok) throw new Error("failed");

      // Konverzia sa počíta až po úspešnom odoslaní, nikdy pri chybe.
      trackLead({ formLocation: "kontakt", sluzba: projectType, odvetvie: industry });

      form.reset();
      removeFile();
      setIndustry("");
      setProjectType("");
      setBudget("");
      setTimeline("");
      setErrors({});
      sessionStorage.setItem("dnabs_conversion_pending", "1");
      router.push("/dakujeme");
    } catch {
      setStatus("error");
    }
  };

  // Názov poľa vo formulári nesedí vždy s názvom prekladového kľúča.
  const PLACEHOLDERS = {
    name: "ph_name",
    company: "ph_company",
    business: "ph_business_other",
    email: "ph_email",
    phone: "ph_phone",
    siteOrSocial: "ph_site",
    message: "ph_msg",
  } as const;

  /** Textové pole aj s chybovou hláškou pod ním. */
  const fieldProps = (name: keyof typeof PLACEHOLDERS) => ({
    name,
    className: `${styles.field} ${errors[name] ? styles.fieldInvalid : ""}`,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `err-${name}` : undefined,
    "aria-label": tPh(PLACEHOLDERS[name]),
    placeholder: tPh(PLACEHOLDERS[name]),
    onChange: () =>
      setErrors((prev) => {
        if (!prev[name]) return prev;
        const next = { ...prev };
        delete next[name];
        return next;
      }),
  });

  const fieldError = (name: string) =>
    errors[name] ? (
      <p id={`err-${name}`} className={styles.fieldError} role="alert">
        {errors[name]}
      </p>
    ) : null;

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

        <div>
          <p className={styles.prequal}>{t("contact_prequal")}</p>

          <form className={styles.form} onSubmit={handleSubmit} noValidate ref={formRef}>
            <input type="text" autoComplete="name" {...fieldProps("name")} />
            {fieldError("name")}

            <FieldPicker
              name="industry"
              label={tPh("ph_business")}
              options={INDUSTRIES.map((o) => ({ value: o.value, label: t(o.key as DictKey) }))}
              value={industry}
              onChange={(next) => {
                setIndustry(next);
                setErrors((prev) => {
                  if (!prev.industry) return prev;
                  const rest = { ...prev };
                  delete rest.industry;
                  return rest;
                });
              }}
              openId={openPicker}
              setOpenId={setOpenPicker}
              error={errors.industry}
            />
            {industry === "ine" && (
              <>
                <input type="text" {...fieldProps("business")} />
                {fieldError("business")}
              </>
            )}

            <FieldPicker
              name="projectType"
              label={tPh("ph_project_type")}
              options={PROJECT_TYPES.map((o) => ({ value: o.value, label: t(o.key as DictKey) }))}
              value={projectType}
              onChange={(next) => {
                setProjectType(next);
                setErrors((prev) => {
                  if (!prev.projectType) return prev;
                  const rest = { ...prev };
                  delete rest.projectType;
                  return rest;
                });
              }}
              openId={openPicker}
              setOpenId={setOpenPicker}
              error={errors.projectType}
            />

            <input type="email" autoComplete="email" {...fieldProps("email")} />
            {fieldError("email")}

            <input type="tel" autoComplete="tel" {...fieldProps("phone")} />
            {fieldError("phone")}



            <textarea rows={4} {...fieldProps("message")} />
            {fieldError("message")}

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
                <input type="text" autoComplete="organization" {...fieldProps("company")} />
                <div className={styles.fieldGroup}>
                  <input type="text" autoComplete="url" {...fieldProps("siteOrSocial")} />
                  <p className={styles.fieldHint}>
                    <span>{t("contact_site_hint")}</span>
                  </p>
                </div>
                <FieldPicker
                  name="budget"
                  label={tPh("ph_budget")}
                  options={BUDGETS.map((o) => ({ value: o.value, label: t(o.key as DictKey) }))}
                  value={budget}
                  onChange={setBudget}
                  openId={openPicker}
                  setOpenId={setOpenPicker}
                />
                <FieldPicker
                  name="timeline"
                  label={tPh("ph_when")}
                  options={WHEN.map((o) => ({ value: o.value, label: t(o.key as DictKey) }))}
                  value={timeline}
                  onChange={setTimeline}
                  openId={openPicker}
                  setOpenId={setOpenPicker}
                />
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
            {Object.keys(errors).length > 0 && (
              <p className={styles.errorMsg} role="alert">
                {t("err_summary")}
              </p>
            )}
            {status === "error" && (
              <p className={styles.errorMsg} role="alert">
                {uploadState === "error" ? t("upload_error") : t("contact_error")}
              </p>
            )}
          </form>
        </div>
      </Reveal>
    </section>
  );
}
