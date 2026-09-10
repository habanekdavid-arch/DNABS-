import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { isAdminEmail } from "@/lib/admin";
import { getSql } from "@/lib/db";
import { LEAD_STATUSES, getStatus } from "@/lib/leadStatus";
import { projectTypeLabel } from "@/lib/projectType";
import StatusSelect from "./StatusSelect";
import DeleteLeadButton from "./DeleteLeadButton";
import styles from "./admin.module.css";

type Lead = {
  id: number;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  project_type: string | null;
  budget: string | null;
  message: string | null;
  source: string | null;
  status: string;
  attachment_url: string | null;
  attachment_name: string | null;
};

function relativeTime(iso: string) {
  const minutes = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (minutes < 1) return "práve teraz";
  if (minutes < 60) return `pred ${minutes} min`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `pred ${hours} h`;
  const days = Math.round(hours / 24);
  if (days < 31) return `pred ${days} d`;
  return "";
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ stav?: string }>;
}) {
  const { stav } = await searchParams;
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
  const leads = (await sql`SELECT * FROM leads ORDER BY created_at DESC LIMIT 200`) as Lead[];

  const counts = LEAD_STATUSES.map((status) => ({
    ...status,
    count: leads.filter((lead) => lead.status === status.value).length,
  }));
  const activeStatus = LEAD_STATUSES.some((s) => s.value === stav) ? stav : null;
  const visible = activeStatus ? leads.filter((l) => l.status === activeStatus) : leads;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <div className={styles.title}>Objednávky</div>
          <div className={styles.subtitle}>
            {leads.length} {leads.length === 1 ? "dopyt" : leads.length < 5 ? "dopyty" : "dopytov"} celkom
          </div>
        </div>
        <div className={styles.headerActions}>
          <Link href="/" className={styles.backToSite}>
            ← Späť na web
          </Link>
          <UserButton />
        </div>
      </div>

      {/* Prehľad stavov — každý dlaždica zároveň filtruje zoznam. */}
      <div className={styles.pipeline}>
        <Link
          href="/admin"
          className={`${styles.stat} ${activeStatus ? "" : styles.statActive}`}
        >
          <span className={styles.statNum}>{leads.length}</span>
          <span className={styles.statLabel}>Všetky</span>
        </Link>
        {counts.map((status) => (
          <Link
            key={status.value}
            href={`/admin?stav=${status.value}`}
            className={`${styles.stat} ${activeStatus === status.value ? styles.statActive : ""}`}
          >
            <span className={styles.statDot} style={{ background: status.color }} />
            <span className={styles.statNum}>{status.count}</span>
            <span className={styles.statLabel}>{status.label}</span>
          </Link>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className={styles.empty}>
          {activeStatus ? "V tomto stave nie je žiadny dopyt." : "Zatiaľ žiadne dopyty."}
        </p>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Prišlo</th>
                <th>Klient</th>
                <th>Projekt</th>
                <th>Správa</th>
                <th>Stav</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {visible.map((lead) => {
                const status = getStatus(lead.status);
                return (
                  <tr key={lead.id}>
                    <td style={{ boxShadow: `inset 4px 0 0 ${status.color}` }}>
                      <div className={styles.when}>{relativeTime(lead.created_at)}</div>
                      <div className={styles.whenExact}>
                        {new Date(lead.created_at).toLocaleDateString("sk-SK")}
                      </div>
                    </td>
                    <td>
                      <Link href={`/admin/leads/${lead.id}`} className={styles.rowLink}>
                        {lead.name}
                      </Link>
                      <div className={styles.sub}>
                        <a href={`mailto:${lead.email}`}>{lead.email}</a>
                      </div>
                      {lead.phone && (
                        <div className={styles.sub}>
                          <a href={`tel:${lead.phone}`}>{lead.phone}</a>
                        </div>
                      )}
                    </td>
                    <td>
                      <div className={styles.projectType}>{projectTypeLabel(lead.project_type)}</div>
                      {lead.budget && <div className={styles.sub}>{lead.budget}</div>}
                      {lead.company && <div className={styles.sub}>{lead.company}</div>}
                    </td>
                    <td className={styles.message}>
                      {lead.message || <span className={styles.sub}>(bez správy)</span>}
                      {lead.attachment_url && (
                        <a
                          href={`/api/admin/attachment?url=${encodeURIComponent(lead.attachment_url)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.attachmentChip}
                        >
                          📎 {lead.attachment_name || "príloha"}
                        </a>
                      )}
                    </td>
                    <td>
                      <StatusSelect id={lead.id} status={lead.status} />
                    </td>
                    <td>
                      <div className={styles.actionsRow}>
                        <Link href={`/admin/leads/${lead.id}`} className={styles.detailLink}>
                          Detail →
                        </Link>
                        <DeleteLeadButton id={lead.id} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
