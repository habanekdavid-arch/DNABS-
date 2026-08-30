"use server";

import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { del } from "@vercel/blob";
import { isAdminEmail } from "@/lib/admin";
import { getSql } from "@/lib/db";
import { LEAD_STATUSES } from "@/lib/leadStatus";

async function requireAdmin() {
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress;
  if (!isAdminEmail(email)) throw new Error("Unauthorized");
}

export async function setLeadStatus(id: number, status: string) {
  await requireAdmin();

  const isValid = LEAD_STATUSES.some((s) => s.value === status);
  if (!isValid) throw new Error("Invalid status");

  const sql = getSql();
  await sql`UPDATE leads SET status = ${status} WHERE id = ${id}`;
  revalidatePath("/admin");
  revalidatePath(`/admin/leads/${id}`);
}

export async function deleteLead(id: number) {
  await requireAdmin();

  const sql = getSql();
  const rows = (await sql`SELECT attachment_url FROM leads WHERE id = ${id}`) as {
    attachment_url: string | null;
  }[];

  if (rows[0]?.attachment_url) {
    try {
      await del(rows[0].attachment_url);
    } catch (err) {
      console.error("deleteLead: failed to delete attachment blob:", err);
    }
  }

  await sql`DELETE FROM leads WHERE id = ${id}`;
  revalidatePath("/admin");
  redirect("/admin");
}
