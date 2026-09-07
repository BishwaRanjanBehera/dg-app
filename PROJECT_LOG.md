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
- `ARCHITECTURE.md` — finalized stack, component diagram, data flow, request lifecycle, external services, security notes, PRD traceability
- `SCHEMA.md` — `DGIssue` data model, Jira-to-DG field mapping, validation against every PRD user story, rationale for no database
- `API.md` — full contract for the single `/api/jira` endpoint: request, response, validation, auth, error/fallback cases
- `UI-WIREFRAMES.md` — user flow, screen inventory, low-fidelity wireframes for Dependency Map View and Management Rollup Dashboard, navigation model
- `PROJECT-STRUCTURE.md` — complete folder structure for the Next.js app, mapped to every file the Blueprint calls for on Days 4–10

**Blueprint status:** No changes needed — today's design matched the approved Day 2 section exactly. No scope added, no scope cut.

**Day 3 readiness:** Confirmed ready to begin environment setup (Node install, `create-next-app`, GitHub repo, Jira Cloud sandbox) immediately, with no open design questions remaining.

## Day 3 — Environment Setup
**Objective:** Build the project's foundation: environment, scaffolding, repo, Jira sandbox, and basic navigation — with no feature work yet.

**Completed:** Node/npm/Git verified, `dg-app` scaffolded via `create-next-app`, GitHub repo connected (`main` branch, one-branch-per-day convention), Jira Cloud sandbox created (project `SCRUM`, 12 issues, 4 blocked-by links, blocker-source labels), `.env.local` configured, `NavBar.tsx` + placeholder `dependencies`/`rollup` pages built and wired into `layout.tsx`.

**Blueprint status:** No changes. See `DAY3-SUMMARY.md` for full detail.

## Day 4 — Core Implementation Part 1: Jira Integration Layer
**Objective:** Build the backend logic connecting to the Jira sandbox, fetching issues and links, and transforming them into the `DGIssue` model.

**Completed:**
- `lib/types.ts` — `DGIssue` / `DGResponse` interfaces
- `lib/jira-client.ts` — server-side Jira fetch with Basic Auth, using the current `/rest/api/3/search/jql` endpoint (Atlassian retired the old `/search` path)
- `lib/transform.ts` — `mapJiraIssuesToDG()`, parses `issuelinks` for `blockedBy` and `labels` for `blockerSource`, buckets unmapped blocked issues as `"Unspecified"`
- `lib/sample-data.ts` — hardcoded 10-issue fallback dataset mirroring the sandbox
- `app/api/jira/route.ts` — returns live `DGIssue[]` on success; falls back to sample data (with `source: "sample"`) on any failure, including the edge case where a bad token silently returns zero issues instead of a 401

**Blueprint status:** No changes. `DGIssue[]`/`DGResponse` shape finalized and treated as locked for all future days.

## Day 5 — Core Implementation Part 2: Dependency Map View
**Objective:** Build the primary contributor-facing screen, consuming the `/api/jira` endpoint built Day 4.

**Completed:**
- `components/StatusBadge.tsx`, `components/BlockerSourceTag.tsx`, `components/IssueCard.tsx`
- `app/dependencies/page.tsx` replaced (Server Component fetch, Blocked Items section shown first and visually distinct, All Other Items below, Demo Data Mode badge, empty states, responsive grid)
- Verified end-to-end against live Jira sandbox data: all 4 blocked issues and 10 unblocked issues render correctly with correct chips/tags/badges

**Issues encountered:** None.

**Blueprint status:** No changes. See `DAY5-SUMMARY.md` for full detail.

**Day 6 readiness:** `/api/jira` and the `DGIssue[]` shape are proven working end-to-end through a real UI. Next: Management Rollup Dashboard (`app/rollup/page.tsx`, `lib/aggregate.ts`, `components/StatCard.tsx`), reusing today's components/patterns for visual consistency.
