import { NextResponse } from "next/server";
import { fetchJiraIssues } from "@/lib/jira-client";
import { mapJiraIssuesToDG } from "@/lib/transform";
import { sampleIssues } from "@/lib/sample-data";
import { DGResponse } from "@/lib/types";

export async function GET() {
  try {
    const rawIssues = await fetchJiraIssues();

    // Defensive check: a bad token can sometimes cause Jira to silently
    // fall back to anonymous access instead of returning 401 — this
    // returns 200 OK but an empty issue list (since anonymous can't see
    // a private project). Treat that as a failure too, so we fall back
    // to sample data instead of showing a false "live, but empty" state.
    if (rawIssues.length === 0) {
      throw new Error(
        "Live Jira fetch returned zero issues — likely an auth problem (bad token silently treated as anonymous access) rather than a genuinely empty project."
      );
    }

    const issues = mapJiraIssuesToDG(rawIssues);

    const response: DGResponse = {
      issues,
      source: "live",
    };

    return NextResponse.json(response);
  } catch (error) {
    // Live Jira fetch failed (bad token, network error, misconfigured env
    // vars, etc.) — fall back to sample data so the app is always demoable.
    console.error("Jira live fetch failed, falling back to sample data:", error);

    const response: DGResponse = {
      issues: sampleIssues,
      source: "sample",
    };

    return NextResponse.json(response);
  }
}