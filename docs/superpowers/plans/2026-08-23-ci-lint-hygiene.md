# CI / lint hygiene — clear the green-but-noisy annotations

**Goal:** The gate is green but every run prints a Node-20-deprecation notice on all three
jobs plus ~10 Biome lint annotations. Clear the noise without touching design-pipeline
behavior. Three independent phases — can land as one PR or three.

**Non-goal:** This does not touch `scripts/` pipeline logic, prompts, or design output.
Pure CI/tooling hygiene.

---

## Phase 1 — Bump CI actions off the deprecated Node 20 runtime

**Root cause:** `actions/checkout@v4`, `actions/setup-node@v4`, `pnpm/action-setup@v4` all
ship a `node20` runtime internally. GitHub is deprecating Node 20 runners and already
force-upgrading these actions to Node 24 at execution time — hence the warning on every
job, even though nothing is broken yet.

**Fix — bump the major on all three actions, in all three workflow files that use them:**

| Action | Current | Target | Confirmed `node24` runtime |
|---|---|---|---|
| `actions/checkout` | v4 | v7 | yes (checked `action.yml` at v7.0.1) |
| `actions/setup-node` | v4 | v7 | yes (checked `action.yml` at v7.0.0) |
| `pnpm/action-setup` | v4 | v6 | yes (checked `action.yml` at v6.0.10) |

Files to update (same three `uses:` lines appear in each):
- `.github/workflows/ci.yml` (3 jobs: lint, typecheck, test)
- `.github/workflows/daily-redesign.yml`
- `.github/workflows/rollback.yml`

**Breaking-change check (done, low risk):**
- `actions/checkout` v4→v7: no breaking changes, runtime bump only.
- `actions/setup-node` v5 breaking change: auto-detects `packageManager` in `package.json`
  for caching when `cache` isn't explicitly set. This repo always passes
  `cache: 'pnpm'` explicitly, so the new auto-detect path never triggers — no behavior
  change expected.
- `pnpm/action-setup` v5: runtime bump only. `package.json` already pins
  `"packageManager": "pnpm@11.20.0"`, which all majors read the same way (no `version:`
  input used in any workflow) — no behavior change expected.

**Verification:** push a throwaway commit on the branch and confirm the Node-20 notice is
gone from all three jobs' annotations; confirm `daily-redesign.yml` and `rollback.yml`
still trigger correctly (these aren't exercised by a normal PR — a manual `workflow_dispatch`
or close reading of the diff is the practical check here, per the standing CI blockers in
[[project-task-list]]: the pipeline hasn't had a green armed run since 2026-07-30 regardless).

---

## Phase 2 — Biome config: `recommended` → `preset`

**Root cause:** `biome.json`'s top-level `linter.rules.recommended: true` is deprecated in
Biome 2.5 in favor of `linter.rules.preset: "recommended"`. (Confirmed via Biome's own
docs — Context7 `/biomejs/website`.) The group-level `a11y.recommended: true` is a
*different*, non-deprecated field — leave it alone.

**Fix:** run `pnpm exec biome migrate --write` (Biome's own first-party migration
command) and diff the result — expect exactly `recommended: true` → `preset: "recommended"`
at the top level of `linter.rules`, nothing else.

**Verification:** `pnpm lint` warning/error count unchanged before and after (this is a
config-shape migration, not a rule-set change).

---

## Phase 3 — Lint warnings

**Current state (measured just now, not the 143 previously tracked in memory — that
number was stale; corrected here):** `pnpm lint` reports **106 warnings** across 14 rules,
in 255 files scanned. The ~10 annotations visible on PR #150 were the subset touching
files in that diff's neighborhood, not the full count.

By rule (top offenders):

| Rule | Count |
|---|---|
| `style/noNonNullAssertion` | 21 |
| `a11y/useButtonType` | 10 (PR #150's annotations showed only 1 — the rest sit outside that diff) |
| `suspicious/noArrayIndexKey` | 19 |
| `suspicious/noCommentText` | 15 |
| `suspicious/noAssignInExpressions` | 11 |
| `correctness/noUnusedImports` | 8 |
| `correctness/noUnusedVariables` | 6 |
| `correctness/noUnusedFunctionParameters` | 4 |
| `a11y/noSvgWithoutTitle` | 3 |
| `a11y/useSemanticElements` | 2 |
| `a11y/useKeyWithClickEvents` | 2 |
| `correctness/useExhaustiveDependencies` | 2 |
| `suspicious/noExplicitAny` | 1 |
| `a11y/useFocusableInteractive` | 1 |
| `a11y/noStaticElementInteractions` | 1 |

**Concentration:** `app/dev-panel.tsx` (a large, old, single-file dev tool — flagged
separately in [[design-quality-pipeline]] as having its own inline-style/a11y debt) and
`tests/server/archive-detail.test.ts` (15 warnings alone, likely one repeated pattern)
account for a large share. Confirmed by spot-check, not yet fully attributed per-file.

**Recommendation — two-speed approach, not one 106-item sweep:**

1. **Now, scoped to what's actually visible in review** (~9 locations, all genuine, not
   false positives — spot-checked):
   - `app/dev-panel.tsx:618-619` — `<span role="button">` refresh icon → real `<button
     type="button">` (currently not keyboard-focusable — a real a11y bug, not just lint
     noise).
   - `app/dev-panel.tsx:2919` — `books!.currently_reading!` → use the already-narrowed
     `books?.currently_reading` binding instead of re-asserting.
   - `app/dev-entry.tsx:4` — `document.getElementById('dev-root')!` → explicit null-check
     + throw instead of asserting (matches the repo's `unknown`-over-`any` narrowing
     convention).
   - `app/dev-panel.tsx:2787` — `<span>// PRODUCT HUNT</span>` is *intentional* decorative
     UI copy (terminal-style section labels — 10 similar occurrences elsewhere in the same
     file, only this one happens to trip the rule). Fix with a scoped
     `// biome-ignore lint/suspicious/noCommentText: decorative label text, not a code
     comment` rather than rewriting working UI.
   - `app/components/responsive-trend.tsx:38` — `data.map((d, i) => <circle key={i}...>)`
     → key off `d.x` (stable, already unique per point) instead of index.
   - `app/components/responsive-trend.tsx:35` — bare `<svg>` with a per-point `<title>`
     but no title on the SVG itself → add a `<title>` describing the chart, or
     `role="img" aria-label="..."` if decorative.
   - `app/components/panel/RateTab.tsx:63` — `<div role="group">` grade selector →
     `<fieldset>` (genuine semantic improvement, this is a real radio-like control group).
   - `app/assets/logo.svg`, `app/assets/logo-mono.svg` — add a `<title>` element inside
     each SVG (static brand assets, cheap fix).

2. **Deferred, tracked in the existing backlog item** ([[project-task-list]] → "Promote
   Biome warn rules to error as violations burn down"): the remaining ~97 warnings,
   concentrated in `dev-panel.tsx` and the test suite. Recommend burning these down
   file-by-file in future PRs that touch those files anyway, rather than a standalone
   sweep — `dev-panel.tsx` in particular is due its own pass (inline styles → Panda is
   already tracked separately) and doing lint + styling together avoids touching the same
   1000+-line file twice.

**Verification:** `pnpm lint` warning count drops by exactly the count of items fixed in
step 1 (9, or however many actually land); `pnpm vitest run` and `pnpm exec tsc --noEmit`
stay green; screenshot the dev-panel refresh button and grade selector to confirm no
visual regression (both are real UI, not just markup changes).

---

## Suggested sequencing

Phase 1 and Phase 2 are independent, low-risk, and small — good candidates for one
combined PR. Phase 3's scoped fixes (item 1 above) can ride in the same PR or a
follow-up; the deferred burndown (item 2) is explicitly *not* part of this PR — it's
backlog, not blocking.
