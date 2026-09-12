# DG (Dependency Guard) — PROJECT LOG

## Day 1 — Requirements & Pitch
- Delivered: PRD.docx, Implementation Blueprint (Days 2–10).docx, Pitch Deck.pptx.

## Day 2 — Design & Architecture (no code)
- Finalized: Next.js (App Router, TS) + Tailwind, no database, no auth, one API endpoint, grouped-list/card UI, Vercel hosting.
- Deliverables: `ARCHITECTURE.md`, `SCHEMA.md`, `API.md`, `UI-WIREFRAMES.md`, `PROJECT-STRUCTURE.md`.

## Day 3 — Environment Setup
- `dg-app` scaffolded, GitHub repo connected, Jira Cloud sandbox created and populated, `.env.local` configured, `NavBar.tsx` + placeholder pages built.

## Day 4 — Jira Integration Layer
- `lib/types.ts`, `lib/jira-client.ts`, `lib/transform.ts`, `lib/sample-data.ts`, `app/api/jira/route.ts` with live/sample fallback.

## Day 5 — Dependency Map View
- `StatusBadge`, `BlockerSourceTag`, `IssueCard`; full `app/dependencies/page.tsx`.

## Day 6 — Management Rollup Dashboard + MVP Deployment
- `lib/aggregate.ts`, `StatCard`, full `app/rollup/page.tsx`; attribution footer; deployed live to `https://dg-app-pink.vercel.app`.
- Fixed a production-only crash (Server Component self-fetch pattern) via `lib/get-dg-data.ts`.

## Day 7 — Testing, Edge Cases & Visual Polish
- All Blueprint edge cases tested and passing (empty state, multi-blocker, unmapped source, sample-data fallback, slow network).
- Added `loading.tsx` for both pages, `error.tsx`/`global-error.tsx`, `TESTING.md`.
- Full UX/accessibility polish pass: active nav state, sticky nav, consistent spacing/typography, hover micro-interactions, ARIA labels.

## Day 8 — Production Hardening & Release-Readiness Review
**Objective:** Comprehensive QA/Security/Performance review as if launching publicly tomorrow — find and fix real production risks, not cosmetic changes.

**Review conducted across:** bugs, edge cases, error handling, API failure modes, loading/empty/offline states, responsive design, accessibility, performance, duplicate code, security, console warnings, production-readiness.

**Issues found & fixed:**
1. **No fetch timeout on Jira API calls** — `lib/jira-client.ts` could hang indefinitely if Jira Cloud stalled rather than erroring outright, violating the PRD's "always demoable" requirement. Fixed with an 8-second `AbortController` timeout that falls through to the sample-data fallback like any other failure.
2. **Implicit dynamic rendering** — pages relied on Next.js inferring dynamic rendering from a `cache: "no-store"` fetch buried in the call chain. Made explicit with `export const dynamic = "force-dynamic"` on `/api/jira/route.ts`, `/dependencies/page.tsx`, and `/rollup/page.tsx`, removing any risk of a future refactor silently reintroducing stale cached data.
3. **No skip-to-content link** — added to `app/layout.tsx` for keyboard/screen-reader users, per the Day 8 accessibility checklist.
4. **Generic default 404 page** — replaced with a branded `app/not-found.tsx` matching the app's design, with a link back to the Dependency Map.
5. **Truncated card titles had no way to see full text** — added a native `title` tooltip attribute to `IssueCard.tsx`.
6. **Documentation inaccuracy** — `SCHEMA.md` claimed unrecognized Jira statuses get coerced to `"To Do"`; the actual (better) implementation passes the real status through with a safe default badge style. Corrected the doc to match the verified-working behavior rather than changing working code to match an inferior documented spec.

**Reviewed and confirmed already sound (no changes needed):** XSS exposure (React auto-escaping, no `dangerouslySetInnerHTML` anywhere), secrets handling (token never logged, `.env.local` git-ignored), CORS (no external API consumers), form validation (N/A, no forms in the app), color-contrast and color-only-signal accessibility, responsive layout, empty/loading/error state coverage from Day 7.

**Verified live** at `https://dg-app-pink.vercel.app` after deployment: full end-to-end walkthrough (redirect, both pages' live data, nav/hover/footer, branded 404, zero console errors) confirmed clean.

**Blueprint status:** No new features, no redesign — pure hardening and a documentation correction, as scoped. (Note: this project's actual Blueprint schedules Deployment as Day 8, already completed Day 6 at the user's request; today's session covered the comprehensive QA/production-readiness review requested for "Day 8" in this session's framing.)

**Remaining before a true v1.0 "launch":** Per the Blueprint, Days 9–10 cover Final Refinement & Demo Prep and a closing retrospective — not yet started. The application itself has no known open bugs or production risks as of this review.
