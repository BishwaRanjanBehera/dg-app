import { getDGData } from "@/lib/get-dg-data";
import {
  getTotalBlocked,
  getTopAgingBlockers,
  getBlockerSourceBreakdown,
} from "@/lib/aggregate";
import StatCard from "@/components/StatCard";

// Distinct bar colors per source, matching BlockerSourceTag's palette
// from Day 5 for visual consistency across both screens.
const SOURCE_BAR_COLORS: Record<string, string> = {
  Business: "bg-purple-500",
  Engineering: "bg-orange-500",
  Vendor: "bg-teal-500",
  Unspecified: "bg-gray-400",
};

export default async function RollupPage() {
  const { issues, source } = await getDGData();

  const totalBlocked = getTotalBlocked(issues);
  const agingBlockers = getTopAgingBlockers(issues, 10);
  const sourceBreakdown = getBlockerSourceBreakdown(issues);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Management Rollup
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            A leadership-level view of blocked-item risk.
          </p>
        </div>
        {source === "sample" && (
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-yellow-300 bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800">
            <span aria-hidden="true">⚠</span> Demo Data Mode
          </span>
        )}
      </div>

      <section className="mb-10 flex justify-center">
        <StatCard label="Total Blocked" value={totalBlocked} />
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          Longest-Running Blockers
        </h2>
        {agingBlockers.length > 0 ? (
          <ol className="divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white shadow-sm">
            {agingBlockers.map((blocker, index) => (
              <li
                key={blocker.key}
                className="flex flex-wrap items-center justify-between gap-2 px-4 py-3"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="w-4 shrink-0 text-sm font-semibold text-gray-400">
                    {index + 1}.
                  </span>
                  <span className="shrink-0 rounded bg-gray-100 px-2 py-0.5 font-mono text-xs font-medium text-gray-700">
                    {blocker.key}
                  </span>
                  <span className="truncate text-sm text-gray-900">
                    {blocker.title}
                  </span>
                </div>
                <span className="whitespace-nowrap text-sm font-medium text-red-700">
                  {blocker.daysBlocked >= 0
                    ? `${blocker.daysBlocked} day${
                        blocker.daysBlocked === 1 ? "" : "s"
                      } blocked`
                    : "Age unknown"}
                </span>
              </li>
            ))}
          </ol>
        ) : (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white px-6 py-10 text-center">
            <p className="text-sm text-gray-500">
              No blocked items right now — nothing to rank.
            </p>
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          Blockers by Source
        </h2>
        {sourceBreakdown.length > 0 ? (
          <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            {sourceBreakdown.map((entry) => (
              <div key={entry.source}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-800">
                    {entry.source}
                  </span>
                  <span className="tabular-nums text-gray-600">
                    {entry.count} ({entry.percentage}%)
                  </span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className={`h-full rounded-full transition-[width] duration-500 ease-out ${
                      SOURCE_BAR_COLORS[entry.source] ?? "bg-gray-400"
                    }`}
                    style={{ width: `${entry.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white px-6 py-10 text-center">
            <p className="text-sm text-gray-500">
              No blocked items right now — no breakdown to show.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
