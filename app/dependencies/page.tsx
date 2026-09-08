import { getDGData } from "@/lib/get-dg-data";
import IssueCard from "@/components/IssueCard";

export default async function DependenciesPage() {
  const { issues, source } = await getDGData();

  const blockedIssues = issues.filter((issue) => issue.isBlocked);
  const otherIssues = issues.filter((issue) => !issue.isBlocked);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dependency Map</h1>
          <p className="mt-1 text-sm text-gray-600">
            A live view of every task and what&apos;s blocking it.
          </p>
        </div>
        {source === "sample" && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800 border border-yellow-300">
            ⚠ Demo Data Mode
          </span>
        )}
      </div>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold text-red-700">
          🔴 Blocked Items ({blockedIssues.length})
        </h2>
        {blockedIssues.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {blockedIssues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        ) : (
          <p className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-500">
            No blocked items right now — everything is moving.
          </p>
        )}
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold text-gray-700">
          All Other Items ({otherIssues.length})
        </h2>
        {otherIssues.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otherIssues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        ) : (
          <p className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-500">
            No other items to show.
          </p>
        )}
      </section>
    </div>
  );
}
