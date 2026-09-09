# DG (Dependency Guard) — PROJECT LOG

## Day 1 — Requirements & Pitch
- Delivered: PRD.docx, Implementation Blueprint (Days 2–10).docx, Pitch Deck.pptx
- Defined problem, scope (in/out), target users, and the 10-day plan.

## Day 2 — Design & Architecture (no code)
**Decisions finalized:** Next.js (App Router, TS) + Tailwind, no database, no auth, one API endpoint (`GET /api/jira`), grouped-list/card UI, Vercel hosting.
**Deliverables:** `ARCHITECTURE.md`, `SCHEMA.md`, `API.md`, `UI-WIREFRAMES.md`, `PROJECT-STRUCTURE.md`.
**Blueprint status:** No changes needed.

## Day 3 — Environment Setup
**Completed:** Node/npm/Git verified, `dg-app` scaffolded, GitHub repo connected, Jira Cloud sandbox created (project `SCRUM`, 12 issues, 4 blocked-by links, blocker-source labels), `.env.local` configured, `NavBar.tsx` + placeholder pages built.
**Blueprint status:** No changes. See `DAY3-SUMMARY.md`.

## Day 4 — Core Implementation Part 1: Jira Integration Layer
**Completed:** `lib/types.ts`, `lib/jira-client.ts`, `lib/transform.ts`, `lib/sample-data.ts`, `app/api/jira/route.ts` with live/sample fallback.
**Blueprint status:** No changes. `DGIssue[]`/`DGResponse` shape locked for all future days.

## Day 5 — Core Implementation Part 2: Dependency Map View
**Completed:** `StatusBadge`, `BlockerSourceTag`, `IssueCard` components; full `app/dependencies/page.tsx` replacing the Day 3 placeholder. Verified against live Jira sandbox data.
**Blueprint status:** No changes. See `DAY5-SUMMARY.md`.

## Day 6 — Core Implementation Part 3: Management Rollup Dashboard + MVP Deployment
**Completed:** `lib/aggregate.ts`, `StatCard`, full `app/rollup/page.tsx`; required attribution footer added; full MVP deployed live on Vercel (`https://dg-app-pink.vercel.app`).
**Issue found & fixed:** Production-only crash from a Server Component self-fetch pattern — replaced with `lib/get-dg-data.ts`, called directly by both pages and by the API route.
**Blueprint status:** Feature scope matched Day 6 exactly; deployment intentionally pulled forward from its later Blueprint day at the user's explicit request. See `DAY6-SUMMARY.md`.

## Day 7 — Testing, Edge Cases & Visual Polish
**Objective:** Harden DG for a real demo — test edge cases, fix visual rough edges, ensure the sample-data fallback is bulletproof — then do a full UX/accessibility polish pass. No new features.

**Edge-case testing (all passed):**
- Empty state (zero blocked items): confirmed graceful "No blocked items right now" messaging on both pages, no broken layout.
- Multiple blockers per item: confirmed via SCRUM-12 (blocked by 2 issues), renders as separate chips.
- Unmapped blocker-source label: confirmed falls back to gray "Unspecified" tag rather than crashing.
- Full sample-data fallback run-through: confirmed both pages render correctly and identically in structure when `JIRA_API_TOKEN` is invalidated, with the "Demo Data Mode" badge showing correctly.
- Slow-network loading state: confirmed via DevTools throttling.

**Stabilization work:**
- `app/dependencies/loading.tsx`, `app/rollup/loading.tsx` — skeleton loading states for both pages
- `app/error.tsx`, `app/global-error.tsx` — friendly error boundaries instead of raw crash screens
- `TESTING.md` — full test notes and documented v1.0 limitations

**Visual/UX polish pass (Senior Product Designer + Engineer review):**
- `components/NavBar.tsx` — rebuilt as a client component with active-link highlighting (`aria-current`), sticky positioning with backdrop blur, focus-visible rings
- `app/layout.tsx` — fixed leftover default metadata (title/description), added page background for card contrast
- `components/Footer.tsx`, `components/StatusBadge.tsx`, `components/BlockerSourceTag.tsx`, `components/IssueCard.tsx`, `components/StatCard.tsx` — refined spacing/typography rhythm, added accessibility labels, subtle hover/transition micro-interactions
- `app/dependencies/page.tsx`, `app/rollup/page.tsx` — consistent responsive padding and heading scale across both pages, improved empty-state visuals with icons

**Verified live** at `https://dg-app-pink.vercel.app` after deployment: active nav highlighting, sticky nav, card hover effects, and both pages rendering real Jira data correctly with no errors.

**Blueprint status:** No changes — today's work was entirely testing, hardening, and polish, exactly as scoped for Day 7. No new features, no redesign.

**Day 8 readiness:** App is feature-complete, tested, and polished, running correctly both locally and in production. Per the Blueprint, Day 8 is normally "Deployment" — already done as part of Day 6/7 in this project's actual pacing. Next real work: whatever Days 9–10 of the Blueprint specify (demo script rehearsal, retrospective, final readiness check) — to be confirmed from the Blueprint before starting.
