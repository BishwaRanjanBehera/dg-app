import { DGIssue, BlockerSource } from "./types";

// Maps Jira labels (created in Day 3 sandbox setup) to our BlockerSource enum.
const LABEL_TO_SOURCE: Record<string, BlockerSource> = {
  "source-business": "Business",
  "source-engineering": "Engineering",
  "source-vendor": "Vendor",
};

/**
 * Extracts the keys of issues that block this issue (i.e. this issue
 * is "blocked by" them), from Jira's `issuelinks` field.
 *
 * Jira represents a "Blocks" link type with two directions:
 * - outwardIssue: this issue "blocks" the outward issue
 * - inwardIssue: this issue "is blocked by" the inward issue
 * We only care about the inward direction (is blocked by).
 */
function extractBlockedBy(issuelinks: any[] | undefined): string[] {
  if (!issuelinks || issuelinks.length === 0) return [];

  const blockedByKeys: string[] = [];

  for (const link of issuelinks) {
    const linkTypeName: string = link?.type?.name ?? "";
    // Jira's default "Blocks" link type has inward name "is blocked by"
    const inwardName: string = link?.type?.inward ?? "";

    if (
      linkTypeName.toLowerCase() === "blocks" &&
      inwardName.toLowerCase().includes("blocked by") &&
      link.inwardIssue
    ) {
      blockedByKeys.push(link.inwardIssue.key);
    }
  }

  return blockedByKeys;
}

/**
 * Determines blockerSource from an issue's labels.
 * If the issue is blocked but has no matching label, we bucket it
 * as "Unspecified" rather than leaving it null (Day 7 edge-case handling,
 * applied now so Day 6's aggregation never divides by an unhandled bucket).
 */
function extractBlockerSource(
  labels: string[] | undefined,
  isBlocked: boolean
): BlockerSource {
  if (!isBlocked) return null;
  if (!labels || labels.length === 0) return "Unspecified";

  for (const label of labels) {
    const normalized = label.toLowerCase();
    if (LABEL_TO_SOURCE[normalized]) {
      return LABEL_TO_SOURCE[normalized];
    }
  }

  return "Unspecified";
}

/**
 * Converts a single raw Jira issue (from /rest/api/3/search) into a DGIssue.
 */
function mapSingleIssue(rawIssue: any): DGIssue {
  const fields = rawIssue.fields ?? {};

  const blockedBy = extractBlockedBy(fields.issuelinks);
  const isBlocked = blockedBy.length > 0 || fields.status?.name === "Blocked";

  const blockerSource = extractBlockerSource(fields.labels, isBlocked);

  // v1.0 simplification: we don't have status-change history readily
  // available from the search endpoint, so we fall back to the issue's
  // `created` date as an approximation of "blockedSince". Documented
  // limitation (see TESTING.md, written on Day 7).
  const blockedSince = isBlocked ? fields.created ?? null : null;

  return {
    id: rawIssue.id,
    key: rawIssue.key,
    title: fields.summary ?? "(no title)",
    status: fields.status?.name ?? "Unknown",
    assignee: fields.assignee?.displayName ?? null,
    isBlocked,
    blockedBy,
    blockerSource,
    blockedSince,
  };
}

/**
 * Converts an array of raw Jira issues into DGIssue[].
 */
export function mapJiraIssuesToDG(rawIssues: any[]): DGIssue[] {
  if (!Array.isArray(rawIssues)) return [];
  return rawIssues.map(mapSingleIssue);
}