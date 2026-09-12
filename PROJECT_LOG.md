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
- Comprehensive QA/Security/Performance review. Fixed: no fetch timeout on Jira calls (added 8s `AbortController` timeout), implicit dynamic rendering (made explicit via `export const dynamic = "force-dynamic"`), missing skip-to-content link, generic default 404 page (replaced with branded `not-found.tsx`), no tooltip on truncated titles, and a documentation inaccuracy in `SCHEMA.md` (corrected to match actual, better behavior).
- Verified: no XSS exposure, no leaked secrets, no CORS concerns, accessibility and responsive design all sound.
- Full end-to-end walkthrough passed on both localhost and production.

## Day 9 — Final Refinement & Demo Preparation
**Objective:** Fresh-eyes review of the live product, small low-risk fixes only, professional release polish, and a rehearsed demo script — no new features, protecting the stability of the deployed app this close to Day 10.

**Fresh-eyes review:** Completed on the live URL in an incognito window. No issues found — nothing confusing, rough, or in need of a copy/spacing fix.

**Professional release polish (all additive, no app-logic changes):**
- `README.md` — replaced the default `create-next-app` boilerplate with a full project README: problem statement, screens, tech stack, reliability/fallback behavior, local setup instructions, documentation index, scope, and license.
- `LICENSE` — added MIT license.
- `app/icon.svg` — added a custom "DG" monogram favicon via Next.js's automatic icon convention, replacing the default Next.js icon.
- `app/layout.tsx` — added SEO and social-sharing metadata (Open Graph + Twitter card fields, `metadataBase` pointing at the live URL).
- GitHub repo — added the live URL to the repo's "Website" field and relevant topics (`nextjs`, `typescript`, `jira-api`, `tailwindcss`, `vercel`, `claude-ai`) for discoverability.

**Demo preparation (required Blueprint deliverable):**
- `DEMO_SCRIPT.md` — written: a 4–5 minute walkthrough (problem statement → Dependency Map → Management Rollup → what's next roadmap) plus prepared answers to anticipated questions (Jira downtime handling, multi-team scalability, build timeline, no-auth rationale, hardest bug encountered).
- Demo rehearsed twice on the live URL (not localhost), both runs under 5 minutes.

**Verified live** at `https://dg-app-pink.vercel.app`: favicon updated, social-sharing metadata present (confirmed via page source `og:title`), both pages still rendering correctly, production matches local exactly.

**Blueprint status:** No new features, no risky refactors — exactly as scoped for Day 9. All End-of-Day Checklist items complete: fresh-eyes review done, `DEMO_SCRIPT.md` written, demo rehearsed 2x on live URL, all Day 1 deliverables (PRD, Blueprint, Pitch Deck) confirmed accessible for submission.

**Day 10 readiness:** DG v1.0 is fully live, tested, polished, and demo-ready. Per the Blueprint, Day 10 is presentation and reflection only — delivering the rehearsed demo, submitting deliverables, and documenting next steps. No further building planned.
