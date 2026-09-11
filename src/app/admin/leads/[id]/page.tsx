import Link from "next/link";
import { notFound } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { isAdminEmail } from "@/lib/admin";
import { getSql } from "@/lib/db";
import { LEAD_STATUSES } from "@/lib/leadStatus";
import { budgetLabel, entityLabel, industryLabel, projectTypeLabel, timelineLabel } from "@/lib/leadLabels";
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
  business: string | null;
  entity_type: string | null;
  site_or_social: string | null;
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
        <div className={styles.headerActions}>
          <Link href="/" className={styles.backToSite}>
            ← Späť na web
          </Link>
          <UserButton />
        </div>
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

        {/* Kde sa objednávka nachádza — zvýraznené sú fázy, ktoré už majú byť za nami. */}
        <div className={styles.stages}>
          {LEAD_STATUSES.map((stage, i) => {
            const currentIndex = LEAD_STATUSES.findIndex((s) => s.value === lead.status);
            const reached = i <= currentIndex;
            return (
              <div
                key={stage.value}
                className={`${styles.stage} ${reached ? styles.stageDone : ""}`}
                style={reached ? { background: stage.color, color: stage.text } : undefined}
              >
                {stage.label}
              </div>
            );
          })}
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
            <label>Typ subjektu</label>
            <div>{entityLabel(lead.entity_type)}</div>
          </div>
          <div className={styles.field}>
            <label>Odvetvie</label>
            <div>{industryLabel(lead.business)}</div>
          </div>
          <div className={styles.field}>
            <label>Web / Instagram</label>
            <div>{lead.site_or_social || "—"}</div>
          </div>
          <div className={styles.field}>
            <label>Typ projektu</label>
            <div>{projectTypeLabel(lead.project_type)}</div>
          </div>
          <div className={styles.field}>
            <label>Rozpočet</label>
            <div>{budgetLabel(lead.budget)}</div>
          </div>
          {lead.timeline && (
            <div className={styles.field}>
              <label>Kedy to rieši</label>
              <div>{timelineLabel(lead.timeline)}</div>
            </div>
          )}
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
