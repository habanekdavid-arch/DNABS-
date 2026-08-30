import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { get } from "@vercel/blob";
import { isAdminEmail } from "@/lib/admin";

export async function GET(request: Request) {
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress;
  if (!isAdminEmail(email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url).searchParams.get("url");
  if (!url) {
    return NextResponse.json({ error: "Missing url" }, { status: 400 });
  }

  const result = await get(url, { access: "private" });
  if (!result || !result.stream) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return new Response(result.stream, {
    headers: {
      "Content-Type": result.blob.contentType || "application/octet-stream",
      "Content-Disposition": `inline; filename="${result.blob.pathname.split("/").pop()}"`,
    },
  });
}
