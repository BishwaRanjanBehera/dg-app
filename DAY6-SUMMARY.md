# DG (Dependency Guard) — DAY6-SUMMARY.md

## Objective
Build the Management Rollup Dashboard (the second core screen), add the required attribution footer, and deploy a live, working MVP.

## What Was Completed

**Rollup Dashboard**
- Built `lib/aggregate.ts` — `getTotalBlocked()`, `getTopAgingBlockers()`, `getBlockerSourceBreakdown()`, all pure functions operating on `DGIssue[]`.
- Built `components/StatCard.tsx` — reusable large-number stat card.
- Built `app/rollup/page.tsx` — Total Blocked stat card, Longest-Running Blockers ranked list (oldest first), Blockers by Source horizontal bar breakdown, Demo Data Mode badge (reusing Day 5's pattern).

**Footer**
- Built `components/Footer.tsx` with the required text: "Built with Claude as part of the AB Talks 60-Day Claude AI Challenge."
- Wired into `app/layout.tsx` so it renders on every page, without touching the existing NavBar wiring.

**Deployment**
- Created a free Vercel account (Hobby tier) connected via GitHub.
- Imported the `dg-app` repo, configured `JIRA_DOMAIN`/`JIRA_EMAIL`/`JIRA_API_TOKEN` as Vercel Environment Variables.
- Deployed successfully to `https://dg-app-pink.vercel.app`.

## Issues Encountered & Resolved
- **Production crash on `/dependencies` and `/rollup`:** `SyntaxError: Unexpected token '<', "<!DOCTYPE"...`. Root cause: both pages were Server Components doing a self-fetch to their own `/api/jira` route via an absolute URL built from `process.env.VERCEL_URL`. In production this occasionally returned an HTML page instead of JSON, which crashed `.json()` parsing.
  - **Fix:** Extracted the fetch-with-fallback logic into `lib/get-dg-data.ts`. The API route now delegates to this shared function (keeping the documented `/api/jira` contract intact), and both pages call `getDGData()` directly — no more self-fetch over HTTP.
  - Verified fixed by testing the actual production domain directly (an earlier verification attempt mistakenly checked `localhost` and then the Vercel dashboard's own UI instead of the deployed app — corrected once caught).

## Blueprint Changes
- Feature scope (Management Rollup Dashboard) matched the Day 6 Blueprint section exactly.
- Deployment itself was originally scheduled for a later Blueprint day. At the user's explicit request for a working, shareable MVP today, deployment was pulled forward — no other scope changes, no redesign.

## Verification (on live production URL)
- [x] `https://dg-app-pink.vercel.app` redirects to `/dependencies`
- [x] `/dependencies` renders live Jira data (4 blocked, 10 unblocked), correct chips/tags, no console errors
- [x] `/rollup` renders live Jira data (Total Blocked: 4, correctly ranked aging list, source breakdown summing to 100%)
- [x] Nav bar works both directions
- [x] Footer visible at the bottom of both live pages

## Ready for Tomorrow
- [x] Both core screens live, functional, and deployed
- [x] `lib/get-dg-data.ts` proven working end-to-end in production (fixes a whole class of self-fetch issues)
- [x] Footer/attribution requirement satisfied on the deployed app
- [ ] Edge-case hardening and visual polish not yet done — that's Day 7's focus per the Blueprint
