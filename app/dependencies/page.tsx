import { getDGData } from "@/lib/get-dg-data";
import IssueCard from "@/components/IssueCard";

// See app/api/jira/route.ts for why this is explicit rather than implicit.
export const dynamic = "force-dynamic";

export default async function DependenciesPage() {
  const { issues, source } = await getDGData();

  const blockedIssues = issues.filter((issue) => issue.isBlocked);
  const otherIssues = issues.filter((issue) => !issue.isBlocked);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Dependency Map
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            A live view of every task and what&apos;s blocking it.
          </p>
        </div>
        {source === "sample" && (
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-yellow-300 bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800">
            <span aria-hidden="true">⚠</span> Demo Data Mode
          </span>
        )}
      </div>

      <section className="mb-10">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-red-700">
          <span aria-hidden="true">🔴</span> Blocked Items ({blockedIssues.length})
        </h2>
        {blockedIssues.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {blockedIssues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center rounded-xl border border-dashed border-gray-300 bg-white px-6 py-10 text-center">
            <span aria-hidden="true" className="text-3xl">
              ✅
            </span>
            <p className="mt-2 text-sm font-medium text-gray-700">
              No blocked items right now
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Everything is moving — nothing needs your attention.
            </p>
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          All Other Items ({otherIssues.length})
        </h2>
        {otherIssues.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otherIssues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white px-6 py-10 text-center">
            <p className="text-sm text-gray-500">No other items to show.</p>
          </div>
        )}
      </section>
    </div>
  );
}
