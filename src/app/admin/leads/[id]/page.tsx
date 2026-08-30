import Link from "next/link";
import { notFound } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { isAdminEmail } from "@/lib/admin";
import { getSql } from "@/lib/db";
import StatusSelect from "../../StatusSelect";
import DeleteLeadButton from "../../DeleteLeadButton";
import styles from "../../admin.module.css";

type Lead = {
  id: number;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  project_type: string | null;
  budget: string | null;
  timeline: string | null;
  message: string | null;
  source: string | null;
  status: string;
  attachment_url: string | null;
  attachment_name: string | null;
};

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress;

  if (!isAdminEmail(email)) {
    return (
      <div className={styles.deniedWrap}>
        <p>Prístup zamietnutý — tento účet nemá oprávnenie na admin sekciu.</p>
        <a href="/admin/sign-in" style={{ color: "#ff5a01" }}>
          Prihlásiť sa iným účtom →
        </a>
      </div>
    );
  }

  const sql = getSql();
  const rows = (await sql`SELECT * FROM leads WHERE id = ${Number(id)}`) as Lead[];
  const lead = rows[0];
  if (!lead) notFound();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.title}>Detail objednávky</div>
        <UserButton />
      </div>

      <Link href="/admin" className={styles.backLink}>
        ← Späť na zoznam
      </Link>

      <div className={styles.card}>
        <div className={styles.cardHead}>
          <div>
            <div className={styles.leadName}>{lead.name}</div>
            <div className={styles.leadDate}>
              {new Date(lead.created_at).toLocaleString("sk-SK")}
            </div>
          </div>
          <div className={styles.cardActions}>
            <StatusSelect id={lead.id} status={lead.status} />
            <DeleteLeadButton id={lead.id} />
          </div>
        </div>

        <div className={styles.fields}>
          <div className={styles.field}>
            <label>E-mail</label>
            <div>
              <a href={`mailto:${lead.email}`}>{lead.email}</a>
            </div>
          </div>
          <div className={styles.field}>
            <label>Telefón</label>
            <div>
              {lead.phone ? <a href={`tel:${lead.phone}`}>{lead.phone}</a> : "—"}
            </div>
          </div>
          <div className={styles.field}>
            <label>Firma</label>
            <div>{lead.company || "—"}</div>
          </div>
          <div className={styles.field}>
            <label>Typ projektu</label>
            <div>{lead.project_type || "—"}</div>
          </div>
          <div className={styles.field}>
            <label>Rozpočet</label>
            <div>{lead.budget || "—"}</div>
          </div>
          <div className={styles.field}>
            <label>Termín</label>
            <div>{lead.timeline || "—"}</div>
          </div>
          <div className={styles.field}>
            <label>Zdroj</label>
            <div>{lead.source || "—"}</div>
          </div>
        </div>

        <div className={styles.messageBlock}>
          <label>Správa</label>
          <div className={styles.messageBox}>{lead.message || "(bez správy)"}</div>
        </div>

        {lead.attachment_url && (
          <div className={styles.messageBlock} style={{ marginTop: 20 }}>
            <label>Príloha</label>
            <a
              href={`/api/admin/attachment?url=${encodeURIComponent(lead.attachment_url)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.attachmentLink}
            >
              📎 {lead.attachment_name || "Zobraziť súbor"}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
