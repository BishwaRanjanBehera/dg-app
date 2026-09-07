# DG (Dependency Guard) — PROJECT-STRUCTURE.md (Updated Day 5)

This updates the Day 3 version with what actually exists on disk after Day 4 (Jira integration layer) and Day 5 (Dependency Map View). No structural changes from the original design — everything below was already planned; items marked `✅ Built Day 4` / `✅ Built Day 5` are now real files.

```
dg-app/                          # Next.js project root ✅ created Day 3
│
├── app/
│   ├── page.tsx                 # ✅ Built Day 3 — redirects to /dependencies
│   ├── layout.tsx               # ✅ Built Day 3 — wraps every page, includes NavBar
│   ├── globals.css              # ✅ default from create-next-app
│   │
│   ├── dependencies/
│   │   └── page.tsx             # ✅ Built Day 5 — full Dependency Map View
│   │
│   ├── rollup/
│   │   └── page.tsx             # ✅ Built Day 3 (placeholder) — full view Day 6
│   │
│   └── api/
│       └── jira/
│           └── route.ts         # ✅ Built Day 4 — fetch + fallback logic
│
├── components/
│   ├── NavBar.tsx                # ✅ Built Day 3 — Dependency Map ↔ Rollup nav
│   ├── IssueCard.tsx             # ✅ Built Day 5 — single issue card, blocked styling
│   ├── StatusBadge.tsx           # ✅ Built Day 5 — colored status pill
│   ├── BlockerSourceTag.tsx      # ✅ Built Day 5 — colored source tag, blocked cards only
│   └── StatCard.tsx              # Planned Day 6
│
├── lib/
│   ├── types.ts                  # ✅ Built Day 4 — DGIssue / DGResponse interfaces
│   ├── jira-client.ts            # ✅ Built Day 4 — server-side Jira fetch + Basic Auth
│   ├── transform.ts              # ✅ Built Day 4 — mapJiraIssuesToDG()
│   ├── sample-data.ts            # ✅ Built Day 4 — hardcoded fallback dataset
│   └── aggregate.ts              # Planned Day 6
│
├── public/                        # ✅ default from create-next-app
│
├── .env.local                     # ✅ Built Day 3 — JIRA_DOMAIN/EMAIL/API_TOKEN, git-ignored
├── .gitignore                     # ✅ default, confirms .env.local excluded
├── tailwind.config.ts             # ✅ default
├── tsconfig.json                  # ✅ default
├── package.json                   # ✅ default
│
├── ARCHITECTURE.md                 # ✅ in repo root
├── SCHEMA.md                       # ✅ in repo root
├── API.md                          # ✅ in repo root
├── UI-WIREFRAMES.md                # ✅ in repo root
├── PROJECT_LOG.md                  # ✅ in repo root, updated each day
├── TESTING.md                      # Planned Day 7
├── DEMO_SCRIPT.md                  # Planned Day 9
└── RETROSPECTIVE.md                # Planned Day 10
```

## What Changed Since Day 3

- Day 4 built the entire `lib/` folder and the one API route — no UI yet, correctly deferred to Day 5/6 as designed.
- Day 5 built the Dependency Map View: the page itself plus three presentational components (`IssueCard`, `StatusBadge`, `BlockerSourceTag`). No changes to `lib/` — Day 5 only consumes `DGIssue[]`/`DGResponse` from Day 4, exactly as the Blueprint specified.
- No structural surprises — every file built matches what was already planned in this document.

## Verification Against This Structure

- [x] `app/dependencies/page.tsx` is now the real Dependency Map View (was placeholder)
- [x] `components/IssueCard.tsx`, `StatusBadge.tsx`, `BlockerSourceTag.tsx` exist and are wired together
- [x] Live Jira data renders correctly; blocked items visually distinct; source tags correct
- [x] No premature `lib/aggregate.ts` or `components/StatCard.tsx` built ahead of Day 6 schedule
- [ ] `app/rollup/page.tsx` still a placeholder — correctly deferred to Day 6
