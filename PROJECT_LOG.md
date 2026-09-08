# DG (Dependency Guard) — PROJECT LOG

## Day 1 — Requirements & Pitch
- Delivered: PRD.docx, Implementation Blueprint (Days 2–10).docx, Pitch Deck.pptx
- Defined problem, scope (in/out), target users, and the 10-day plan.

## Day 2 — Design & Architecture (no code)
**Objective:** Turn the PRD into a concrete technical design before any implementation begins.

**Decisions finalized:**
- Tech stack confirmed: Next.js (App Router, TypeScript) + Tailwind CSS, single deployable app, hosted on Vercel.
- No database in v1.0 — DG is stateless, fetching and normalizing Jira data live on every request. Reasoning documented in `SCHEMA.md`.
- No user authentication in v1.0 — single shared workspace, consistent with PRD scope.
- One backend endpoint for v1.0: `GET /api/jira`, returning normalized `DGIssue[]` with a `source: "live" | "sample"` flag.
- Dependency Map visual approach: grouped-list/card view (not a node-graph). A graph view remains an optional Day 8 stretch goal only.
- Repository Setup deliberately kept on Day 3 as originally planned in the Blueprint — Day 2 stayed design-only, no code or repo created today.

**Deliverables produced and approved today:**
- `ARCHITECTURE.md`, `SCHEMA.md`, `API.md`, `UI-WIREFRAMES.md`, `PROJECT-STRUCTURE.md`

**Blueprint status:** No changes needed.

## Day 3 — Environment Setup
**Completed:** Node/npm/Git verified, `dg-app` scaffolded via `create-next-app`, GitHub repo connected, Jira Cloud sandbox created (project `SCRUM`, 12 issues, 4 blocked-by links, blocker-source labels), `.env.local` configured, `NavBar.tsx` + placeholder `dependencies`/`rollup` pages built and wired into `layout.tsx`.

**Blueprint status:** No changes. See `DAY3-SUMMARY.md` for full detail.

## Day 4 — Core Implementation Part 1: Jira Integration Layer
**Completed:**
- `lib/types.ts`, `lib/jira-client.ts`, `lib/transform.ts`, `lib/sample-data.ts`
- `app/api/jira/route.ts` — returns live `DGIssue[]` on success; falls back to sample data on any failure

**Blueprint status:** No changes. `DGIssue[]`/`DGResponse` shape finalized and treated as locked for all future days.

## Day 5 — Core Implementation Part 2: Dependency Map View
**Completed:**
- `components/StatusBadge.tsx`, `components/BlockerSourceTag.tsx`, `components/IssueCard.tsx`
- `app/dependencies/page.tsx` — Blocked Items section first, All Other Items below, Demo Data Mode badge, empty states, responsive grid
- Verified end-to-end against live Jira sandbox data

**Blueprint status:** No changes. See `DAY5-SUMMARY.md` for full detail.

## Day 6 — Core Implementation Part 3: Management Rollup Dashboard + MVP Deployment
**Objective:** Build the second core screen (leadership rollup), add the required attribution footer, and deploy a live, working MVP.

**Completed:**
- `lib/aggregate.ts` — `getTotalBlocked`, `getTopAgingBlockers`, `getBlockerSourceBreakdown` (pure functions, rounding-safe percentages)
- `components/StatCard.tsx` — reusable large-number stat card
- `app/rollup/page.tsx` — Total Blocked stat, Longest-Running Blockers ranked list, Blockers by Source bar breakdown, Demo Data Mode badge (same pattern as Day 5)
- `components/Footer.tsx` + `app/layout.tsx` updated — required attribution footer ("Built with Claude as part of the AB Talks 60-Day Claude AI Challenge.") now renders on every page
- Verified locally against live Jira data: total count (4) matches sandbox, aging list correctly sorted oldest-first, source breakdown counts/percentages sum correctly (50%/25%/25%)

**Deployment (pulled forward from Blueprint's later deployment day, per today's explicit MVP/demo goal):**
- Created free Vercel account (Hobby tier, GitHub-integrated)
- Imported `dg-app` GitHub repo into Vercel, added `JIRA_DOMAIN`/`JIRA_EMAIL`/`JIRA_API_TOKEN` as Vercel Environment Variables
- First deploy succeeded but `/dependencies` and `/rollup` crashed in production with `SyntaxError: Unexpected token '<'` — root cause: pages were doing a server-side self-fetch to their own `/api/jira` route via an absolute URL, which in production returned an HTML page instead of JSON in some cases
- **Fix:** extracted the Jira-fetch-with-fallback logic into `lib/get-dg-data.ts`; `app/api/jira/route.ts` now delegates to it (API contract unchanged, per `API.md`), and both pages call `getDGData()` directly instead of doing an HTTP round-trip to themselves — removes a fragile pattern entirely rather than patching around it
- Verified live at `https://dg-app-pink.vercel.app`: root redirects to `/dependencies`, both pages render live Jira data correctly with no errors, nav works both directions, footer visible on both pages

**Issues encountered & resolved:**
- Production-only crash caused by the Server Component self-fetch pattern (see above) — fixed by removing the HTTP round-trip in favor of a direct function call. Confirmed fixed by re-testing the actual `.vercel.app` production URL (an earlier check mistakenly tested `localhost` and then the Vercel dashboard's own URL rather than the deployed app).

**Blueprint status:** Feature scope (Rollup Dashboard) matched Day 6 exactly, no changes. Deployment was intentionally pulled forward from its originally later Blueprint day, at the user's explicit request, to deliver a working shareable MVP today — no other scope changes.

**Day 7 readiness:** Both core screens are live, functionally complete, and deployed. `/api/jira` and `lib/get-dg-data.ts` are proven working end-to-end in production. Next: Testing, Edge Cases & Visual Polish (per Blueprint Day 7) — hardening the sample-data fallback, handling edge cases, and visual refinement, with no architecture changes expected.
