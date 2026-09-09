# DG (Dependency Guard) — TESTING.md

Manual test notes from Day 7 (Testing, Edge Cases & Visual Polish). DG has no automated test suite in v1.0 — per `SCHEMA.md`/`ARCHITECTURE.md`, the app is intentionally small and stateless, so manual end-to-end verification against both live Jira data and the sample-data fallback is the testing strategy for the capstone.

---

## 1. Tests Performed

### 1.1 Empty state (zero blocked items)
**Method:** Temporarily removed "is blocked by" links and reset status to "To Do" on all 4 blocked sandbox issues (SCRUM-10 through SCRUM-13).

**Result:** ✅ Pass.
- `/dependencies` showed "Blocked Items (0)" with the message "No blocked items right now — everything is moving." — no broken/empty layout.
- `/rollup` showed Total Blocked: 0, "No blocked items right now — nothing to rank." for the aging list, and "No blocked items right now — no breakdown to show." for the source breakdown.

Sandbox data was restored to its original blocked state immediately after this test.

### 1.2 Multiple blockers per item
**Method:** SCRUM-12 ("Vendor API contract") is blocked by two issues (SCRUM-5 and SCRUM-9) by design in the sandbox data.

**Result:** ✅ Pass. Both blocker keys render as separate chips on the card, confirmed visually on Day 5 and re-confirmed Day 7.

### 1.3 Unmapped blocker-source label
**Method:** Added a label (`source-random`) not present in `transform.ts`'s `LABEL_TO_SOURCE` map to a blocked issue.

**Result:** ✅ Pass. The issue rendered with a gray "Unspecified" source tag instead of crashing, showing nothing, or throwing a type error. Label removed after the test to restore original `source-vendor` labeling.

### 1.4 Full sample-data fallback run-through
**Method:** Temporarily corrupted `JIRA_API_TOKEN` in `.env.local` to force every live Jira call to fail, then restarted the dev server and walked through the entire demo flow using only `sample-data.ts`.

**Result:** ✅ Pass.
- Both `/dependencies` and `/rollup` displayed the "⚠ Demo Data Mode" badge.
- All 10 sample issues rendered correctly on the Dependency Map (4 blocked, 6 unblocked).
- Rollup Dashboard correctly computed Total Blocked (2, per `sample-data.ts`), aging ranking, and source breakdown entirely from the hardcoded dataset.
- No visual or functional difference in card/badge/tag rendering compared to live data — confirms `sample-data.ts` is a true drop-in replacement for the live shape, as designed in `SCHEMA.md`.

Real `JIRA_API_TOKEN` restored and re-verified afterward.

### 1.5 Slow-network loading state
**Method:** Chrome DevTools → Network tab → throttled to "Slow 3G," reloaded both pages.

**Result:** ✅ Pass. `app/dependencies/loading.tsx` and `app/rollup/loading.tsx` (added Day 7) render a skeleton/pulse placeholder matching each page's layout while the Jira fetch is in flight, instead of a blank white screen.

### 1.6 Total-failure error state
**Method:** Manually reviewed `app/error.tsx` and `app/global-error.tsx` (added Day 7) — these only trigger if both the live fetch and the sample-data fallback throw, which is not independently reproducible without editing `sample-data.ts` itself. Verified by code review that `getDGData()` in `lib/get-dg-data.ts` only reaches an unhandled state if `sample-data.ts` itself is malformed, and that `app/error.tsx` renders a friendly message with a "Try again" button rather than Next.js's raw crash screen in that case.

**Result:** ✅ Pass (by design/code review — this is a last-resort safety net, not an expected runtime path).

---

## 2. Known Limitations (v1.0, by design)

These are intentional simplifications, not bugs:

- **`blockedSince` uses the issue's `created` date, not true status-change history.** Jira's search API doesn't return status-change timestamps without a separate changelog call, which was out of scope for v1.0's time budget. Documented originally in `SCHEMA.md` §2.
- **Only 4 statuses are styled** (`To Do`, `In Progress`, `Blocked`, `Done`). Any other Jira status string still renders (falls back to a neutral gray badge) rather than crashing, but won't have a matching color.
- **Only 3 blocker-source labels are recognized** (`source-business`, `source-engineering`, `source-vendor`). Any blocked issue without one of these exact labels is bucketed as "Unspecified" — confirmed working in Test 1.3 above.
- **No pagination.** `jira-client.ts` fetches up to 100 issues in a single call. Fine for the sandbox project (12 issues); would need pagination for a larger real-world project.
- **No automated tests.** All verification in this document is manual, appropriate to the project's size and the capstone's time budget.

---

## 3. Not Yet Tested / Out of Scope for Day 7

- Deployment-specific behavior (covered separately once live — see `PROJECT_LOG.md` Day 6 entry for the one production-only bug found and fixed after deployment).
- Cross-browser testing beyond Chrome (not required for v1.0 per PRD scope).
