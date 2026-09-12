# DG (Dependency Guard) — DEMO_SCRIPT.md

A 4–5 minute walkthrough for Day 10. Live URL: **https://dg-app-pink.vercel.app**

---

## 1. The Problem (1 sentence)

> "TPMs spend real time manually clicking through linked Jira tickets just to figure out what's blocked and why — the data already exists in Jira, it's just never surfaced as a dependency map."

## 2. Dependency Map Walkthrough (~90 seconds)

Open **`/dependencies`** on the live URL.

- "This is the Dependency Map — every task in the project, with blocked items pulled to the top and visually flagged in red."
- Point at **SCRUM-13 (Legal sign-off)**: "This is blocked by SCRUM-5, and it's tagged as a Business-source blocker — someone outside engineering needs to act before this can move."
- Point at **SCRUM-12 (Vendor API contract)**: "This one has *two* blockers — SCRUM-5 and SCRUM-9 — which is common in real projects and something Jira itself never shows you in one place."
- Point at **SCRUM-10 (Set up staging environment)**: "This is a Vendor-sourced blocker — so at a glance, I already know this needs a vendor conversation, not an engineering fix."
- "Below the fold, every other in-flight task is still visible, so this is a complete picture, not just the bad news."

## 3. Management Rollup Walkthrough (~90 seconds)

Click **Management Rollup** in the nav.

- "This is the leadership view — same underlying data, summarized for a 10-second read."
- Point at the **Total Blocked** stat card: "Four items blocked right now — that's the first number any manager wants."
- Point at the **Longest-Running Blockers** list: "Ranked oldest-first, so I immediately know Legal sign-off has been stuck the longest and probably needs an escalation."
- Point at the **Blockers by Source** breakdown: "50% of our blockers are coming from Business, 25% Engineering, 25% Vendor — that tells a manager exactly where to focus a conversation, without reading a single ticket."

## 4. What's Next (1 sentence)

> "v1.0 is intentionally scoped to one team and read-only visibility — the natural next step is multi-team support and Slack/email alerts when something's been blocked too long, both already scoped in the roadmap."

---

## Anticipated Questions & Answers

**"What happens if Jira is down?"**
> "DG has a built-in sample-data fallback — if the live connection fails for any reason, it automatically switches to a hardcoded dataset that renders identically, with a visible 'Demo Data Mode' badge so it's never ambiguous which you're looking at. I stress-tested this on Day 7 by deliberately invalidating my API token and running the full demo flow on sample data alone — it worked flawlessly."

**"Could this scale to multiple teams?"**
> "Yes — that's the first item on the v2.0 roadmap. v1.0 is intentionally scoped to one Jira project to fit a 10-day build, but the data model doesn't assume a single team; extending it to multi-project support is additive, not a rebuild."

**"How long did this take?"**
> "About 1–2 hours a day over 10 days — roughly 15–20 hours total, start to finish, including design, a real Jira integration, two full UI screens, testing, and a production-hardening pass. It's a strong example of what's achievable in a tight, consistent time budget rather than a huge sprint."

**"Why no login/authentication?"**
> "Explicitly out of scope for v1.0 per the PRD — this is a single shared team workspace, not a multi-tenant product yet. Adding real auth is a deliberate, documented v2.0 decision, not an oversight."

**"What was the hardest part?"**
> "A bug that only showed up in production, not locally — a page was making an internal call to its own API route over HTTP, which worked on localhost but failed once deployed. Tracing it back to the actual root cause, rather than patching around the symptom, was the most valuable debugging of the whole project."

---

## Rehearsal Log

- [ ] Rehearsal 1 — time: _____ — notes: _____
- [ ] Rehearsal 2 — time: _____ — notes: _____

Target: comfortably under 5 minutes, using the live URL (not localhost), on the first take.
