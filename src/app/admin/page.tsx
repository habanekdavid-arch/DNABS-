import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { isAdminEmail } from "@/lib/admin";
import { getSql } from "@/lib/db";
import { toggleLeadStatus } from "./actions";
import styles from "./admin.module.css";

type Lead = {
  id: number;
  created_at: string;
  name: string;
  email: string;
  company: string | null;
  project_type: string | null;
  budget: string | null;
  timeline: string | null;
  message: string | null;
  source: string | null;
  status: string;
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
        <div className={styles.title}>DNABS — Dopyty</div>
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
                <th>Firma</th>
                <th>Typ</th>
                <th>Rozpočet</th>
                <th>Termín</th>
                <th>Správa</th>
                <th>Zdroj</th>
                <th>Stav</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td>{new Date(lead.created_at).toLocaleString("sk-SK")}</td>
                  <td>{lead.name}</td>
                  <td>
                    <a href={`mailto:${lead.email}`} style={{ color: "#fff" }}>
                      {lead.email}
                    </a>
                  </td>
                  <td>{lead.company || "—"}</td>
                  <td>{lead.project_type || "—"}</td>
                  <td>{lead.budget || "—"}</td>
                  <td>{lead.timeline || "—"}</td>
                  <td className={styles.message}>{lead.message || "—"}</td>
                  <td>{lead.source || "—"}</td>
                  <td>
                    <span
                      className={`${styles.badge} ${
                        lead.status === "new" ? styles.badgeNew : styles.badgeHandled
                      }`}
                    >
                      {lead.status === "new" ? "Nový" : "Vybavený"}
                    </span>
                  </td>
                  <td>
                    <form action={toggleLeadStatus.bind(null, lead.id, lead.status)}>
                      <button type="submit" className={styles.toggleBtn}>
                        {lead.status === "new" ? "Označiť vybavené" : "Vrátiť na nový"}
                      </button>
                    </form>
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
