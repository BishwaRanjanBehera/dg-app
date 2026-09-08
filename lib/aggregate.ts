import { DGIssue, BlockerSource } from "./types";

/**
 * Total number of currently blocked issues.
 */
export function getTotalBlocked(issues: DGIssue[]): number {
  return issues.filter((issue) => issue.isBlocked).length;
}

/**
 * Returns the top N longest-running blocked issues, oldest first.
 * "Aging" is measured from blockedSince to now, in whole days.
 * Issues with a missing/invalid blockedSince are sorted to the end
 * (never crash on bad data — SCHEMA.md's documented limitation).
 */
export interface AgingBlocker {
  key: string;
  title: string;
  daysBlocked: number;
}

export function getTopAgingBlockers(
  issues: DGIssue[],
  limit: number = 10
): AgingBlocker[] {
  const now = new Date();

  const blocked = issues.filter((issue) => issue.isBlocked);

  const withAge: AgingBlocker[] = blocked.map((issue) => {
    const blockedDate = issue.blockedSince ? new Date(issue.blockedSince) : null;
    const isValidDate = blockedDate !== null && !isNaN(blockedDate.getTime());

    const daysBlocked = isValidDate
      ? Math.max(
          0,
          Math.floor(
            (now.getTime() - blockedDate.getTime()) / (1000 * 60 * 60 * 24)
          )
        )
      : -1; // sentinel: unknown age, sorts last

    return {
      key: issue.key,
      title: issue.title,
      daysBlocked,
    };
  });

  // Oldest (largest daysBlocked) first. Unknown age (-1) sinks to the bottom.
  withAge.sort((a, b) => b.daysBlocked - a.daysBlocked);

  return withAge.slice(0, limit);
}

/**
 * Groups blocked issues by blockerSource and returns count + percentage
 * for each source present in the data. Percentages are rounded but the
 * function guarantees they sum to 100 (any rounding remainder is added
 * to the largest bucket) so the UI never visibly fails to add up.
 */
export interface SourceBreakdownEntry {
  source: Exclude<BlockerSource, null>;
  count: number;
  percentage: number;
}

export function getBlockerSourceBreakdown(
  issues: DGIssue[]
): SourceBreakdownEntry[] {
  const blocked = issues.filter((issue) => issue.isBlocked);
  const total = blocked.length;

  if (total === 0) return [];

  const counts: Record<string, number> = {};

  for (const issue of blocked) {
    // isBlocked with a null blockerSource shouldn't happen per transform.ts,
    // but bucket defensively as "Unspecified" rather than dropping the issue.
    const source = issue.blockerSource ?? "Unspecified";
    counts[source] = (counts[source] ?? 0) + 1;
  }

  const entries: SourceBreakdownEntry[] = Object.entries(counts).map(
    ([source, count]) => ({
      source: source as Exclude<BlockerSource, null>,
      count,
      percentage: Math.floor((count / total) * 100),
    })
  );

  // Fix rounding so percentages sum to exactly 100.
  const sum = entries.reduce((acc, e) => acc + e.percentage, 0);
  const remainder = 100 - sum;
  if (remainder > 0 && entries.length > 0) {
    // Add the remainder to the largest bucket for the least visual distortion.
    entries.sort((a, b) => b.count - a.count);
    entries[0].percentage += remainder;
  }

  // Sort final output by count descending for display.
  entries.sort((a, b) => b.count - a.count);

  return entries;
}
