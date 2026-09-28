"use client";

import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useLanguage, type DictKey } from "@/lib/i18n";
import { trackLead } from "@/lib/analytics";
import Emph from "./Emph";
import Reveal from "./Reveal";
import AmbientBlobs from "./AmbientBlobs";
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
  const formRef = useRef<HTMLFormElement>(null);

  // Naraz nech je otvorený len jeden výber.
  const [openPicker, setOpenPicker] = useState<string | null>(null);
  const [projectType, setProjectType] = useState("");
  const [suhlas, setSuhlas] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  /** Vráti mapu chýb. Prázdna mapa = formulár sa môže odoslať. */
  const validate = (data: FormData) => {
    const text = (key: string) => String(data.get(key) ?? "").trim();
    const found: Record<string, string> = {};

    if (text("name").length < 2) found.name = t("err_required");
    if (!text("company")) found.company = t("err_required");
    if (!EMAIL_RE.test(text("email"))) found.email = t("err_email");
    if (text("phone").replace(/\D/g, "").length < 6) found.phone = t("err_phone");
    if (!projectType) found.projectType = t("err_pick");
    if (!text("message")) found.message = t("err_required");
    if (!suhlas) found.suhlas = t("err_required");

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

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          company: data.get("company"),
          projectType,
          message: data.get("message"),
          website: data.get("website"),
          source: typeof window !== "undefined" ? window.location.pathname : undefined,
        }),
      });
      if (!res.ok) throw new Error("failed");

      // Konverzia sa počíta až po úspešnom odoslaní, nikdy pri chybe.
      // E-mail a telefón slúžia len pre vylepšené konverzie — gtag ich
      // zahashuje, do parametrov udalosti sa nikdy nedostanú.
      trackLead({
        formLocation: "kontakt",
        sluzba: projectType,
        email: String(data.get("email") ?? ""),
        phone: String(data.get("phone") ?? ""),
      });

      form.reset();
      setProjectType("");
      setSuhlas(false);
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
    email: "ph_email",
    phone: "ph_phone",
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
      <AmbientBlobs soft />
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
            <div className={styles.dvojica}>
              <div className={styles.pole}>
                <input type="text" autoComplete="name" {...fieldProps("name")} />
                {fieldError("name")}
              </div>
              <div className={styles.pole}>
                <input type="text" autoComplete="organization" {...fieldProps("company")} />
                {fieldError("company")}
              </div>
            </div>

            <div className={styles.dvojica}>
              <div className={styles.pole}>
                <input type="email" autoComplete="email" {...fieldProps("email")} />
                {fieldError("email")}
              </div>
              <div className={styles.pole}>
                <input type="tel" autoComplete="tel" {...fieldProps("phone")} />
                {fieldError("phone")}
              </div>
            </div>

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

            <div className={styles.spodok}>
              <label className={styles.suhlas}>
                <input
                  type="checkbox"
                  checked={suhlas}
                  className={styles.suhlasVstup}
                  aria-invalid={errors.suhlas ? true : undefined}
                  onChange={(e) => {
                    setSuhlas(e.target.checked);
                    setErrors((prev) => {
                      if (!prev.suhlas) return prev;
                      const rest = { ...prev };
                      delete rest.suhlas;
                      return rest;
                    });
                  }}
                />
                <span className={styles.prepinac} aria-hidden />
                <span className={styles.suhlasText}>{t("contact_gdpr")}</span>
              </label>

              <button
                type="submit"
                disabled={status === "sending"}
                className={styles.submit}
                data-cursor="cta"
                data-fx
              >
                {status === "sending" ? t("contact_sending") : t("contact_submit")}
                <span className={styles.submitSipka} aria-hidden>›</span>
              </button>
            </div>

            {Object.keys(errors).length > 0 && (
              <p className={styles.errorMsg} role="alert">
                {t("err_summary")}
              </p>
            )}
            {status === "error" && (
              <p className={styles.errorMsg} role="alert">
                {t("contact_error")}
              </p>
            )}
          </form>
        </div>
      </Reveal>
    </section>
  );
}
