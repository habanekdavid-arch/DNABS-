"use server";

import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { isAdminEmail } from "@/lib/admin";
import { getSql } from "@/lib/db";
import { LEAD_STATUSES } from "@/lib/leadStatus";

export async function setLeadStatus(id: number, status: string) {
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress;
  if (!isAdminEmail(email)) throw new Error("Unauthorized");

  const isValid = LEAD_STATUSES.some((s) => s.value === status);
  if (!isValid) throw new Error("Invalid status");

  const sql = getSql();
  await sql`UPDATE leads SET status = ${status} WHERE id = ${id}`;
  revalidatePath("/admin");
  revalidatePath(`/admin/leads/${id}`);
}
