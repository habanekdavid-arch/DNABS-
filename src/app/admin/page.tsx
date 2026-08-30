import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { isAdminEmail } from "@/lib/admin";
import { getSql } from "@/lib/db";
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
  timeline: string | null;
  message: string | null;
  source: string | null;
  status: string;
  attachment_url: string | null;
  attachment_name: string | null;
};

export default async function AdminPage() {
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

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.title}>DNABS — Objednávky</div>
        <UserButton />
      </div>

      {leads.length === 0 ? (
        <p className={styles.empty}>Zatiaľ žiadne dopyty.</p>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Dátum</th>
                <th>Meno</th>
                <th>E-mail</th>
                <th>Telefón</th>
                <th>Firma</th>
                <th>Typ</th>
                <th>Rozpočet</th>
                <th>Termín</th>
                <th>Správa</th>
                <th>Príloha</th>
                <th>Zdroj</th>
                <th>Stav</th>
                <th>Akcie</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td>{new Date(lead.created_at).toLocaleString("sk-SK")}</td>
                  <td>
                    <Link href={`/admin/leads/${lead.id}`} className={styles.rowLink}>
                      {lead.name}
                    </Link>
                  </td>
                  <td>{lead.email}</td>
                  <td>{lead.phone || "—"}</td>
                  <td>{lead.company || "—"}</td>
                  <td>{lead.project_type || "—"}</td>
                  <td>{lead.budget || "—"}</td>
                  <td>{lead.timeline || "—"}</td>
                  <td className={styles.message}>{lead.message || "—"}</td>
                  <td>
                    {lead.attachment_url ? (
                      <a
                        href={`/api/admin/attachment?url=${encodeURIComponent(lead.attachment_url)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        📎 {lead.attachment_name || "súbor"}
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td>{lead.source || "—"}</td>
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
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
