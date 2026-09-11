import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

// Základná tabuľka — ak už existuje, nič nerobí.
await sql`
  CREATE TABLE IF NOT EXISTS leads (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    project_type TEXT,
    budget TEXT,
    timeline TEXT,
    message TEXT,
    source TEXT,
    status TEXT NOT NULL DEFAULT 'new',
    email_sent BOOLEAN NOT NULL DEFAULT false
  )
`;

// Stĺpce, ktoré pribudli neskôr. ADD COLUMN IF NOT EXISTS je idempotentné,
// takže skript sa dá pustiť koľkokrát treba.
const columns = [
  ["phone", "TEXT"],
  ["attachment_url", "TEXT"],
  ["attachment_name", "TEXT"],
  ["business", "TEXT"],
  ["entity_type", "TEXT"],
  ["site_or_social", "TEXT"],
];

for (const [name, type] of columns) {
  await sql(`ALTER TABLE leads ADD COLUMN IF NOT EXISTS ${name} ${type}`);
  console.log(`  ✓ ${name}`);
}

console.log("Migration done: leads table ready.");
