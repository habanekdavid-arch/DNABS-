import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const CONTACT_EMAIL = "contact.dnabs@gmail.com";

export async function POST(request: Request) {
  const { name, email, company, projectType, budget, timeline, message, website } =
    await request.json();

  // Honeypot — vyplnené len botmi. Predstierame úspech bez odoslania mailu.
  if (typeof website === "string" && website.trim()) {
    return NextResponse.json({ ok: true });
  }

  if (typeof name !== "string" || !name.trim() || typeof email !== "string" || !email.trim()) {
    return NextResponse.json({ error: "Meno a e-mail sú povinné." }, { status: 400 });
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailAppPassword) {
    return NextResponse.json(
      { error: "Odosielanie e-mailov nie je nakonfigurované." },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailUser, pass: gmailAppPassword },
  });

  try {
    await transporter.sendMail({
      from: `"DNABS web" <${gmailUser}>`,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `Nový dopyt z webu — ${name}`,
      text: [
        `Meno: ${name}`,
        `E-mail: ${email}`,
        company ? `Spoločnosť: ${company}` : null,
        projectType ? `Typ projektu: ${projectType}` : null,
        budget ? `Rozpočet: ${budget}` : null,
        timeline ? `Termín: ${timeline}` : null,
        "",
        message || "(bez správy)",
      ]
        .filter(Boolean)
        .join("\n"),
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Odoslanie zlyhalo, skús to prosím neskôr." }, { status: 502 });
  }
}
