import { IssueStatus } from "@/lib/types";

// Colors match SCHEMA.md's 4 sandbox statuses. Any other Jira status
// string still renders (falls to the default gray) rather than crashing —
// consistent with the "unrecognized status" handling noted in SCHEMA.md.
const STATUS_STYLES: Record<string, string> = {
  "To Do": "bg-gray-200 text-gray-800",
  "In Progress": "bg-blue-100 text-blue-800",
  Blocked: "bg-red-100 text-red-800",
  Done: "bg-green-100 text-green-800",
};

const DEFAULT_STYLE = "bg-gray-200 text-gray-800";

interface StatusBadgeProps {
  status: IssueStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const style = STATUS_STYLES[status] ?? DEFAULT_STYLE;

  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${style}`}
    >
      {status}
    </span>
  );
}
