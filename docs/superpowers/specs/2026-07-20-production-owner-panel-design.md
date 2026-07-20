# Production Owner Panel — Design

**Date:** 2026-07-20
**Status:** Approved (sections reviewed individually by Doug)

## Problem

The design-feedback loop exists (daily `Rate:` GitHub issue → `collect-ratings.js` harvest → `archive/{date}/rating-*.json` → Art Director "Owner Ratings" prompt block) but is awkward to use — ratings have lapsed (one harvested since March; issues for 2026-07-14 → 07-20 sit open and unrated). Doug wants to log in on the production site (doug-march.com) and operate the pipeline from there: rate designs, browse history, adjust creative weights, and trigger runs — the capabilities of the local dev panel, in production.

## Constraints

- doug-march.com is a static TanStack Start SPA (`spa: {}`) on Vercel; `outputDirectory: dist/client`, catch-all rewrite to `/_shell.html`. No server code deployed today.
- The pipeline runs in GitHub Actions (`daily-redesign.yml`, cron 10:00 UTC). The repo is the system of record for ratings, weights, archive.
- Single user (Doug). Public site must stay public.
- Stack rules: pnpm, TypeScript strict, PandaCSS, Base UI, Vitest.

## Architecture (chosen: GitHub-backed panel)

The panel is a remote control for GitHub. Vercel serverless functions proxy every write to the GitHub API; the existing pipeline intake is untouched. Rejected alternatives: Supabase backend (new infra + second source of truth for a single-user tool), Vercel KV (pipeline state leaves the repo).

```
Browser (/panel, basic auth)
  → Vercel Edge Middleware (basic-auth gate)
  → api/panel/* serverless functions (GH_PANEL_TOKEN)
      rate    → comment/create `Rate: {date}` issue  ─┐
      weights → GitHub Actions repository variables   ├─→ daily-redesign.yml
      run     → workflow_dispatch                    ─┘   (existing harvest & prompts)
      status  → issues + variables + latest run (read)
```

## 1. Auth & access

- `middleware.ts` at repo root (Vercel Edge Middleware; runs before rewrites, works with static output). Matcher: `/panel`, `/panel/*`, `/api/panel/*`.
- Enforces HTTP Basic Auth against `PANEL_USER` / `PANEL_PASSWORD` env vars using constant-time comparison. Missing/wrong → `401` + `WWW-Authenticate: Basic realm="owner panel"` (native browser prompt, works on mobile).
- Every `api/panel/*` function re-checks the same `Authorization` header (defense in depth).
- Vercel env secrets: `PANEL_USER`, `PANEL_PASSWORD`, `GH_PANEL_TOKEN` — fine-grained PAT scoped to this repo only: Issues RW, Variables RW, Actions RW.
- Rest of the site: unchanged, fully public. Panel route code shipping in the public JS bundle is acceptable (no secrets client-side; all actions gated server-side).

## 2. Panel UI

New lean `/panel` route in the TanStack Router SPA. **Not** a port of `app/dev-panel.tsx` (localhost-only wiring, far larger scope). Mobile-first. PandaCSS + Base UI (Tabs, Slider, Field primitives). Four tabs:

- **Rate** — today's brief + archive thumbnail, grade buttons A–D, three text fields (`worked`, `didnt`, `try`), submit. Below: list of older unrated days (open `Rate:` issues) to clear the backlog, same form inline.
- **Archive** — reads existing static `public/archive/index.json` + `{date}/detail.json` (extended with grades, see §4). Newest first: date, brief, archetype, grade badge, notes.
- **Weights** — four sliders 0–10 (signals / inspiration / ratings / risk), current values from `GET status`, explicit Save button. Note in UI: "applies to the next run."
- **Run** — "Trigger build" button with dry-run toggle; shows latest `daily-redesign.yml` run status (in progress / success / failure + link).

## 3. API functions

Four TypeScript serverless functions under `api/panel/`, thin proxies using `GH_PANEL_TOKEN`:

- `POST /api/panel/rate` — body `{ date?, grade, worked, didnt, try }` (`date` defaults to today UTC; `grade` validated `A–D`). Finds the **open** issue titled `Rate: {date}` (label `daily-rating`); posts a comment containing the ```yaml fence in exactly the shape `collect-ratings.js#parseRatingFromIssue` parses. If no open issue exists for that date, creates one (`Rate: {date}`, label `daily-rating`, YAML in body) so the harvest still collects it. Response includes the issue URL.
- `GET /api/panel/status` — returns `{ unrated: [{date, title, url}], weights: {signals, inspiration, ratings, risk}, latestRun: {status, conclusion, url, created_at} }` from open `daily-rating` issues, repo variables, and the latest `daily-redesign.yml` run.
- `PUT /api/panel/weights` — body `{ signals, inspiration, ratings, risk }` (integers 0–10). Upserts repo variables `WEIGHT_SIGNALS`, `WEIGHT_INSPIRATION`, `WEIGHT_RATINGS`, `WEIGHT_RISK`.
- `POST /api/panel/run` — body `{ dry_run? }`. `workflow_dispatch` on `daily-redesign.yml` (input already exists).

Error handling: non-2xx → JSON `{ error: "<human message>" }`; panel shows the message inline near the triggering control. No server-side retries — every action is safely re-tappable (comment/create is idempotent-enough: harvest takes the newest valid YAML per issue).

## 4. Pipeline changes (minimal)

1. `daily-redesign.yml`: read weights from repository variables with today's values as fallbacks — `WEIGHT_SIGNALS: ${{ vars.WEIGHT_SIGNALS || '5' }}`, `WEIGHT_INSPIRATION: ${{ vars.WEIGHT_INSPIRATION || '5' }}`, `WEIGHT_RATINGS: ${{ vars.WEIGHT_RATINGS || '5' }}`, `WEIGHT_RISK: ${{ vars.WEIGHT_RISK || '8' }}`. Env var names already match `scripts/design-agents.js:421-424`.
2. `scripts/generate-archive-json.js`: include harvested rating (`grade`, `worked`, `didnt`, `try`) in `index.json` entries and `detail.json` so the Archive tab can render grades. Reuse `scripts/utils/ratings.js` read logic (one rating per date, newest valid file).

`collect-ratings.js`, `ratings.js`, and the Art Director prompt flow are **unchanged**.

## Testing & verification

- **Vitest:** round-trip test — the exact comment string `POST rate` produces must parse via `parseRatingFromIssue` (import it directly); basic-auth header check (valid/invalid/missing); weights payload validation; archive JSON gains rating fields.
- **Manual E2E (per verification rule):** on a deployed preview — hit `/panel` unauthenticated (expect 401 prompt), log in, submit a real rating, confirm the YAML comment lands on the correct issue, save weights and confirm repo variables changed, trigger a dry run and watch it start. Screenshots of each.

## Out of scope

- Porting dev-panel extras (signal overrides, live pipeline logs, responsive metrics).
- Retiring the GitHub-issue rating flow — it remains the intake; the panel writes to it.
- Public display of grades on the site's archive page (data will be there; UI decision deferred).
