import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

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

console.log("Migration done: leads table ready.");
