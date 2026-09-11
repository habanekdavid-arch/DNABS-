import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getSql } from "@/lib/db";
import { budgetLabel, entityLabel, projectTypeLabel, timelineLabel } from "@/lib/leadLabels";

const CONTACT_EMAIL = "contact.dnabs@gmail.com";
const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/;

const clean = (value: unknown) => (typeof value === "string" ? value.trim() : "");

export async function POST(request: Request) {
  const body = await request.json();

  // Honeypot — vyplnené len botmi. Predstierame úspech bez uloženia/odoslania.
  if (clean(body.website)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name);
  const company = clean(body.company);
  const business = clean(body.business);
  const entityType = clean(body.entityType);
  const email = clean(body.email);
  const phone = clean(body.phone);
  const siteOrSocial = clean(body.siteOrSocial);
  const projectType = clean(body.projectType);
  const budget = clean(body.budget);
  const timeline = clean(body.timeline);
  const message = clean(body.message);
  const source = clean(body.source);
  const attachmentUrl = clean(body.attachmentUrl) || null;
  const attachmentName = clean(body.attachmentName) || null;

  // Tá istá kontrola ako vo formulári — prehliadač sa dá obísť, server nie.
  const missing =
    name.length < 2 ||
    !company ||
    !business ||
    !entityType ||
    !EMAIL_RE.test(email) ||
    phone.replace(/\D/g, "").length < 6 ||
    !siteOrSocial ||
    !projectType ||
    !budget ||
    message.length < 20;

  if (missing) {
    return NextResponse.json(
      { error: "Formulár nie je vyplnený správne." },
      { status: 400 }
    );
  }

  // Databáza je zdroj pravdy — dopyt sa uloží aj keby zlyhalo odoslanie e-mailu.
  let leadId: number | null = null;
  try {
    const sql = getSql();
    try {
      const rows = (await sql`
        INSERT INTO leads (name, email, phone, company, business, entity_type, site_or_social, project_type, budget, timeline, message, source, attachment_url, attachment_name)
        VALUES (${name}, ${email}, ${phone}, ${company}, ${business}, ${entityType}, ${siteOrSocial}, ${projectType}, ${budget}, ${timeline || null}, ${message}, ${source || null}, ${attachmentUrl}, ${attachmentName})
        RETURNING id
      `) as { id: number }[];
      leadId = rows[0].id;
    } catch (err) {
      // Kým na databáze nebehla migrácia s novými stĺpcami, uložíme aspoň to,
      // čo tabuľka vie — dopyt nesmie spadnúť pod stolom.
      console.error("contact route: nový INSERT zlyhal, skúšam pôvodné stĺpce:", err);
      const rows = (await sql`
        INSERT INTO leads (name, email, phone, company, project_type, budget, timeline, message, source, attachment_url, attachment_name)
        VALUES (${name}, ${email}, ${phone}, ${company}, ${projectType}, ${budget}, ${timeline || null}, ${message}, ${source || null}, ${attachmentUrl}, ${attachmentName})
        RETURNING id
      `) as { id: number }[];
      leadId = rows[0].id;
    }
  } catch (err) {
    console.error("contact route DB insert failed:", err);
    return NextResponse.json({ error: "Odoslanie zlyhalo, skús to prosím neskôr." }, { status: 502 });
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailAppPassword) {
    return NextResponse.json({ ok: true });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailUser, pass: gmailAppPassword },
  });

  // Potvrdenie klientovi — nech vie, že dopyt dorazil, a má náš kontakt v schránke.
  const firstName = name.split(/\s+/)[0];
  try {
    await transporter.sendMail({
      from: `"DNABS" <${gmailUser}>`,
      to: email,
      replyTo: CONTACT_EMAIL,
      subject: "Máme tvoj dopyt — návrh ti pošleme do 24 hodín",
      text: [
        `Ahoj ${firstName},`,
        "",
        "ďakujeme za dopyt. Návrh tvojho webu na mieru pripravíme a pošleme ti ho do 24 hodín — zadarmo a nezáväzne.",
        "",
        "Ako to bude ďalej vyzerať:",
        "1. Do 24 hodín ti na tento e-mail príde návrh.",
        "2. Prejdeme si ho spolu a povieš, čo zmeniť alebo doplniť.",
        "3. Až keď ti návrh sadne, dohodneme cenu a spustenie.",
        "",
        "Ak si chceš čokoľvek doplniť, stačí odpovedať na tento e-mail alebo zavolať na +421 949 390 797.",
        "",
        "DNABS",
        "contact.dnabs@gmail.com · https://dnabs.online",
      ].join("\n"),
    });
  } catch (err) {
    // Potvrdenie je príjemnosť navyše — dopyt je uložený aj bez neho.
    console.error("contact route confirmation mail failed:", err);
  }

  // Notifikácia nám — v predmete typ projektu a rozpočet, nech sa lead dá
  // posúdiť už zo zoznamu v schránke.
  try {
    await transporter.sendMail({
      from: `"DNABS web" <${gmailUser}>`,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `${projectTypeLabel(projectType)} · ${budgetLabel(budget)} — nový dopyt`,
      text: [
        "KLIENT",
        `Meno:            ${name}`,
        `Firma:           ${company}`,
        `Typ subjektu:    ${entityLabel(entityType)}`,
        `Čo podniká:      ${business}`,
        `Web / Instagram: ${siteOrSocial}`,
        "",
        "KONTAKT",
        `E-mail:          ${email}`,
        `Telefón:         ${phone}`,
        "",
        "DOPYT",
        `Typ projektu:    ${projectTypeLabel(projectType)}`,
        `Rozpočet:        ${budgetLabel(budget)}`,
        `Kedy to rieši:   ${timelineLabel(timeline)}`,
        "",
        "POPIS",
        message,
        "",
        "OSTATNÉ",
        `Zdroj:           ${source || "—"}`,
        `Príloha:         ${attachmentUrl ? `${attachmentName || "súbor"} — ${attachmentUrl}` : "—"}`,
        leadId ? `Detail:          https://dnabs.online/admin/leads/${leadId}` : "",
      ]
        .filter((line) => line !== "")
        .join("\n"),
    });
    if (leadId) {
      const sql = getSql();
      await sql`UPDATE leads SET email_sent = true WHERE id = ${leadId}`;
    }
  } catch (err) {
    // E-mail zlyhal, ale dopyt je bezpečne uložený v databáze — stále vraciame úspech.
    console.error("contact route sendMail failed:", err);
  }

  return NextResponse.json({ ok: true });
}
