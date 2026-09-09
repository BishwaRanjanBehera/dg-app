import { DGIssue } from "@/lib/types";
import StatusBadge from "./StatusBadge";
import BlockerSourceTag from "./BlockerSourceTag";

interface IssueCardProps {
  issue: DGIssue;
}

export default function IssueCard({ issue }: IssueCardProps) {
  const { key, title, status, assignee, isBlocked, blockedBy, blockerSource } =
    issue;

  return (
    <div
      className={`rounded-xl border p-4 shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md ${
        isBlocked
          ? "border-red-200 bg-red-50/60"
          : "border-gray-200 bg-white"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-mono text-xs text-gray-500">{key}</p>
          <h3 className="mt-0.5 truncate font-semibold text-gray-900">
            {title}
          </h3>
        </div>
        <StatusBadge status={status} />
      </div>

      <p className="mt-2 text-sm text-gray-600">
        {assignee ? (
          assignee
        ) : (
          <span className="italic text-gray-400">Unassigned</span>
        )}
      </p>

      {isBlocked && (
        <div className="mt-3 space-y-2 border-t border-red-200/70 pt-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-sm font-medium text-red-700">
              <span aria-hidden="true">🔴</span> Blocked by:
            </span>
            {blockedBy.length > 0 ? (
              blockedBy.map((blockerKey) => (
                <span
                  key={blockerKey}
                  className="rounded bg-red-100 px-2 py-0.5 font-mono text-xs font-medium text-red-800"
                >
                  {blockerKey}
                </span>
              ))
            ) : (
              <span className="text-xs italic text-red-600">
                (status marked Blocked, no linked issue found)
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm text-gray-600">Source:</span>
            <BlockerSourceTag source={blockerSource} />
          </div>
        </div>
      )}
    </div>
  );
}
