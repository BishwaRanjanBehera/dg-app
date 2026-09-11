import { NextResponse } from "next/server";
import { getDGData } from "@/lib/get-dg-data";

// Explicit, not implicit: this route must never be statically cached at
// build time — every request needs fresh Jira data (or a fresh fallback
// decision). fetchJiraIssues() already uses cache: "no-store", which
// causes Next.js to infer dynamic rendering automatically, but declaring
// it here removes any dependency on that implicit behavior surviving a
// future refactor.
export const dynamic = "force-dynamic";

export async function GET() {
  const response = await getDGData();
  return NextResponse.json(response);
}
