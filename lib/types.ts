// DGIssue: the normalized data model DG uses internally,
// independent of Jira's raw API shape.
// Defined in Day 2 (ARCHITECTURE.md / data-model.md), implemented Day 4.

export type BlockerSource = "Business" | "Engineering" | "Vendor" | "Unspecified" | null;

export type IssueStatus = "To Do" | "In Progress" | "Blocked" | "Done" | string;

export interface DGIssue {
  id: string;
  key: string;
  title: string;
  status: IssueStatus;
  assignee: string | null;
  isBlocked: boolean;
  blockedBy: string[]; // array of issue keys, e.g. ["SCRUM-3", "SCRUM-5"]
  blockerSource: BlockerSource;
  blockedSince: string | null; // ISO date string
}

// DGResponse: the shape returned by /api/jira.
// `source` tells the UI whether this is live Jira data or the
// hardcoded fallback dataset (used for the "Demo Data Mode" badge on Day 5).
export interface DGResponse {
  issues: DGIssue[];
  source: "live" | "sample";
}
