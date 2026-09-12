# DG — Dependency Guard

A team dependency-visibility dashboard for Technical Program Managers. DG connects to a live Jira Cloud instance, pulls issues and their linked-issue (dependency) data, and turns that scattered information into a clear, at-a-glance view of what's blocked, what's blocking it, and how long it's been stuck.

**Live demo:** https://dg-app-pink.vercel.app

Built as a 10-day capstone project for the AB Talks 60-Day Claude AI Challenge, using Claude as the primary development partner.

---

## The Problem

Dependencies and blockers already exist as data inside Jira (via issue links like "blocks" / "is blocked by"), but Jira doesn't present this data as a dependency map. TPMs spend real time manually clicking through linked tickets to reconstruct the blocker picture for a project, and leadership has no fast way to see how many items are blocked, for how long, or where the blockers are coming from.

DG surfaces this automatically, in two focused screens.

## Screens

**Dependency Map** (`/dependencies`) — every issue in the project, with blocked items grouped first and clearly flagged: what's blocking them, and where the blocker originates (Business / Engineering / Vendor).

**Management Rollup** (`/rollup`) — a leadership-level view: total blocked count, the longest-running blockers ranked by age, and a breakdown of blockers by source.

## Tech Stack

- **Next.js 16** (App Router, TypeScript) — single deployable app for both UI and backend
- **Tailwind CSS** — styling
- **Jira Cloud REST API v3** — live data source, against a personal free sandbox
- **Vercel** — hosting, free Hobby tier, GitHub-integrated auto-deploy
- **No database** — DG is stateless; it fetches and normalizes Jira data live on every request

See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for the full technical design, [`SCHEMA.md`](./SCHEMA.md) for the data model, and [`API.md`](./API.md) for the API contract.

## Reliability

If the live Jira connection ever fails or times out — bad credentials, network issues, Jira downtime — DG automatically falls back to a built-in sample dataset that renders identically to live data, with a visible "Demo Data Mode" badge. The app is always demoable, even offline from Jira. See [`TESTING.md`](./TESTING.md) for the full test log.

## Running Locally

**Prerequisites:** Node.js 18+ and npm.

1. Clone the repository:
   ```
   git clone https://github.com/BishwaRanjanBehera/dg-app.git
   cd dg-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env.local` file in the project root with your own Jira Cloud sandbox credentials:
   ```
   JIRA_DOMAIN=your-site-name
   JIRA_EMAIL=you@example.com
   JIRA_API_TOKEN=your-api-token
   ```
   Generate an API token at https://id.atlassian.com/manage-profile/security/api-tokens. `JIRA_DOMAIN` is just the subdomain — e.g. for `your-site-name.atlassian.net`, use `your-site-name`.

   If you don't configure Jira credentials, the app still runs and automatically shows the sample-data fallback.

4. Run the dev server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

## Project Documentation

| Document | Contents |
|---|---|
| [`DG_PRD_v1.docx`](./DG_PRD_v1.docx) | Product requirements — problem, scope, goals |
| [`ARCHITECTURE.md`](./ARCHITECTURE.md) | Tech stack, component diagram, data flow, security |
| [`SCHEMA.md`](./SCHEMA.md) | The `DGIssue` data model and Jira field mapping |
| [`API.md`](./API.md) | The `/api/jira` endpoint contract |
| [`UI-WIREFRAMES.md`](./UI-WIREFRAMES.md) | Screen wireframes and user flow |
| [`TESTING.md`](./TESTING.md) | Manual test log and known v1.0 limitations |
| [`DEMO_SCRIPT.md`](./DEMO_SCRIPT.md) | Rehearsed demo walkthrough |
| [`PROJECT_LOG.md`](./PROJECT_LOG.md) | Day-by-day build log across the 10-day capstone |

## Scope

**In scope (v1.0):** Jira Cloud integration, Dependency Map view, blocker-source tagging, Management Rollup dashboard, sample-data fallback, single shared workspace (no login), public deployment.

**Explicitly out of scope (v1.0):** user authentication, multi-team/multi-project support, notifications, editing Jira data, predictive forecasting, exported reports. See the PRD's Future Roadmap for what's next.

## License

MIT — see [`LICENSE`](./LICENSE).
