# References Channel + Critic Stall Timeouts

**Goal:** Two small pipeline-plumbing fixes: reconnect the frozen references channel to CI, and make stall detection actually able to fire on the two critic calls where it currently can't.

**Branch:** `fix/ci-references-and-stall-timeouts`

---

## Fix 1: un-freeze the references channel

`signals/today.references.md` has been frozen since 2026-05-05 — `.github/workflows/daily-redesign.yml` never calls `scripts/collect-references.js`. Only the local runner (`scripts/run-pipeline.js`) does. Consequence: the curated reference library (`references/index.yml`, including the owner's gold-standard entry) has never reached an agent in a production run.

**Verified before changing anything:**
- `scripts/collect-references.js` makes no network calls itself. Layer 1 reads `references/index.yml`; layer 2 reads `signals/today.yml` (already populated by the "Collect signals" step, which runs the Dribbble/Awwwards providers). Both layers are wrapped in `try/catch` that logs and continues.
- The CLI entrypoint never calls `process.exit(1)`. On no output it logs and calls `process.exit(0)` explicitly. This mirrors `collect-signals.js`'s contract (provider failures caught internally, script always exits 0) — no `|| true` or `continue-on-error` needed on the workflow step, consistent with how the "Collect signals" step is already written.
- The push step's explicit `git add` path list already includes `signals/today.references.md` — nothing else to wire up there.

**Change:** add a "Collect references" step to `daily-redesign.yml`, directly after "Collect signals" and before "Run daily redesign" (it needs `signals/today.yml` as input and its output must exist before the Art Director runs).

## Fix 2: inert stall detection on two critic calls

`scripts/utils/claude-cli.js` defaults: `timeoutMs` 600000 (10m), `stallTimeoutMs` 900000 (15m). Any call site that doesn't override `stallTimeoutMs` gets the 15m default — which is longer than the 10m hard timeout, so a throttled-but-alive call rides straight to the hard cap and the stall check never gets a chance to fire.

Two call sites in `scripts/design-agents.js` were in exactly this state (only passing `{ model: modelFor(...) }`, no `stallTimeoutMs`):
- `spec-critic` call (~line 998)
- `screenshot-critic` call (~line 1571)

`mockup-critic.js` already sets an explicit `timeoutMs: 600000` / `stallTimeoutMs: 300000` (10m/5m) pair. Applied the same proportion to both call sites by adding `stallTimeoutMs: 300000` to their options objects — hard timeout stays the implicit default (10m), stall now fires at 5m as intended.

`art-director`, `mockup-designer`, and `react-engineer` call sites were not touched.

---

## Verification

- `pnpm test`
- `pnpm lint` (biome ci)
- `pnpm typecheck`
- `node --check` on both touched JS files
- Workflow YAML parses via `js-yaml` (`node -e "require('js-yaml').load(...)"`)
