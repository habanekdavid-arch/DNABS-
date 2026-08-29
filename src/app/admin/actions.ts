"use server";

import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { isAdminEmail } from "@/lib/admin";
import { getSql } from "@/lib/db";

export async function toggleLeadStatus(id: number, currentStatus: string) {
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress;
  if (!isAdminEmail(email)) throw new Error("Unauthorized");

  const sql = getSql();
  const next = currentStatus === "new" ? "handled" : "new";
  await sql`UPDATE leads SET status = ${next} WHERE id = ${id}`;
  revalidatePath("/admin");
}
