import { IssueStatus } from "@/lib/types";

// Colors match SCHEMA.md's 4 sandbox statuses. Any other Jira status
// string still renders (falls to the default gray) rather than crashing —
// consistent with the "unrecognized status" handling noted in SCHEMA.md.
const STATUS_STYLES: Record<string, string> = {
  "To Do": "bg-gray-100 text-gray-700 ring-1 ring-inset ring-gray-300",
  "In Progress": "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200",
  Blocked: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200",
  Done: "bg-green-50 text-green-700 ring-1 ring-inset ring-green-200",
};

const DEFAULT_STYLE = "bg-gray-100 text-gray-700 ring-1 ring-inset ring-gray-300";

interface StatusBadgeProps {
  status: IssueStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const style = STATUS_STYLES[status] ?? DEFAULT_STYLE;

  return (
    <span
      className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ${style}`}
      aria-label={`Status: ${status}`}
    >
      {status}
    </span>
  );
}
