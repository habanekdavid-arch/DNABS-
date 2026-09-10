import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getSql } from "@/lib/db";

const CONTACT_EMAIL = "contact.dnabs@gmail.com";

export async function POST(request: Request) {
  const {
    name,
    email,
    phone,
    company,
    projectType,
    budget,
    message,
    website,
    source,
    attachmentUrl,
    attachmentName,
  } = await request.json();

  // Honeypot — vyplnené len botmi. Predstierame úspech bez uloženia/odoslania.
  if (typeof website === "string" && website.trim()) {
    return NextResponse.json({ ok: true });
  }

  if (typeof name !== "string" || !name.trim() || typeof email !== "string" || !email.trim()) {
    return NextResponse.json({ error: "Meno a e-mail sú povinné." }, { status: 400 });
  }

  // Databáza je zdroj pravdy — dopyt sa uloží aj keby zlyhalo odoslanie e-mailu.
  let leadId: number | null = null;
  try {
    const sql = getSql();
    const rows = (await sql`
      INSERT INTO leads (name, email, phone, company, project_type, budget, message, source, attachment_url, attachment_name)
      VALUES (${name}, ${email}, ${phone || null}, ${company || null}, ${projectType || null}, ${budget || null}, ${message || null}, ${source || null}, ${attachmentUrl || null}, ${attachmentName || null})
      RETURNING id
    `) as { id: number }[];
    leadId = rows[0].id;
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
  const looksLikeEmail = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email.trim());
  if (looksLikeEmail) {
    const firstName = String(name).trim().split(/\s+/)[0];
    try {
      await transporter.sendMail({
        from: `"DNABS" <${gmailUser}>`,
        to: email.trim(),
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
  }

  try {
    await transporter.sendMail({
      from: `"DNABS web" <${gmailUser}>`,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `Nový dopyt z webu — ${name}`,
      text: [
        `Meno: ${name}`,
        `E-mail: ${email}`,
        phone ? `Telefón: ${phone}` : null,
        company ? `Spoločnosť: ${company}` : null,
        projectType ? `Typ projektu: ${projectType}` : null,
        budget ? `Rozpočet: ${budget}` : null,
        source ? `Zdroj: ${source}` : null,
        attachmentUrl ? `Príloha: ${attachmentName || "súbor"} — ${attachmentUrl}` : null,
        "",
        message || "(bez správy)",
      ]
        .filter(Boolean)
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
