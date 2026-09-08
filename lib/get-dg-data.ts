import { fetchJiraIssues } from "@/lib/jira-client";
import { mapJiraIssuesToDG } from "@/lib/transform";
import { sampleIssues } from "@/lib/sample-data";
import { DGResponse } from "@/lib/types";

/**
 * The single source of truth for "get me the current DG dataset."
 * Used directly by Server Component pages (no HTTP round-trip to our
 * own API route — avoids a class of production issues where an
 * absolute-URL self-fetch can be intercepted by platform-level
 * redirects/auth pages and returned as HTML instead of JSON) and by
 * the /api/jira route handler (kept for the documented API contract
 * in API.md).
 */
export async function getDGData(): Promise<DGResponse> {
  try {
    const rawIssues = await fetchJiraIssues();

    // Defensive check: a bad token can sometimes cause Jira to silently
    // fall back to anonymous access instead of returning 401 — this
    // would return 200 OK but an empty issue list. Treat that as a
    // failure too, so we fall back to sample data instead of showing
    // a false "live, but empty" state.
    if (rawIssues.length === 0) {
      throw new Error(
        "Live Jira fetch returned zero issues — likely an auth problem (bad token silently treated as anonymous access) rather than a genuinely empty project."
      );
    }

    const issues = mapJiraIssuesToDG(rawIssues);

    return { issues, source: "live" };
  } catch (error) {
    console.error("Jira live fetch failed, falling back to sample data:", error);
    return { issues: sampleIssues, source: "sample" };
  }
}
