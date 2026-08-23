# Anti-Sameness Variance Mandates

**Goal:** Add three deterministic, zero-LLM variance mandates to the nightly design pipeline — palette formula, hero-source rotation, and layout signature — cloning the proven `shell-mandate.js`/`color-mandate.js` pattern, per the 2026-08-23 audit of 122 archived builds.

**Motivating audit (122 archived builds):**
- Hue rotation works: only 4/92 near-repeats.
- 49% of days land on the same "saturated accent on near-black void" palette FORMULA, regardless of hue.
- 45% of heroes are quote-derived.
- Layout composition (columns, axis, symmetry, hero placement) has no variance lever at all.

**Architecture:** Each mandate is a pure-JS reader over archived build metadata (no LLM calls), soft-forbidding recently-used values in the Art Director's user prompt — advisory language only, matching the 2026-04-28 finding that hard lockouts caused fit regressions. The Art Director declares the new fields as part of its existing delimiter-block output; the orchestrator persists them as build artifacts and feeds them back through the mandate readers on the next run.

**Declaration mechanism (least-invasive choice per field):**
- **Ground strategy** (Mandate 1) — a new `ground_strategy` key inside the existing `===SHELL===` block, parsed by `parseShellBlock`. It piggybacks on `shell.json`, which the orchestrator already writes, so no new persistence path was needed.
- **Hero source** (Mandate 2) — a new scalar block, `===HERO_SOURCE===`, parsed the same way as `===ARCHETYPE===`/`===CHASSIS_ID===`. Persisted as a new `hero-source.json` artifact.
- **Layout signature** (Mandate 3) — a new structured block, `===LAYOUT_SIGNATURE===`, parsed by a new `parseLayoutSignatureBlock` (same key:value shape as `parseShellBlock`/`parseMeasurablesBlock`). Persisted as a new `layout-signature.json` artifact.

All three fields are optional in validation — `validateArtDirectorResult` does not require them, so a response (or an old archive) missing them degrades gracefully instead of failing the run.

**Tech stack:** Node ESM scripts, vitest, no new dependencies.

**Branch:** `feat/variance-mandates`.

---

## File structure

**New files:**

| Path | Responsibility |
|---|---|
| `scripts/utils/palette-formula-mandate.js` | Ground-strategy history extraction + soft-forbidden + prompt block (clone of shell-mandate) |
| `scripts/utils/hero-source-mandate.js` | Hero-source history extraction + 2-consecutive-quote soft-forbid + prompt block |
| `scripts/utils/layout-signature-mandate.js` | Layout-signature history extraction + exact-tuple soft-forbidden + prompt block |
| `tests/utils/palette-formula-mandate.test.js`, `tests/utils/hero-source-mandate.test.js`, `tests/utils/layout-signature-mandate.test.js` | Unit tests: empty history, partial history, forbid-list correctness |

**Modified:**
- `scripts/utils/spec-blocks.js` — `parseShellBlock` gains `ground_strategy`; new `parseLayoutSignatureBlock`.
- `scripts/utils/delimiter-parser.js` — captures `===HERO_SOURCE===` and `===LAYOUT_SIGNATURE===`; both added to the `===FILE:===` termination lookahead so a file block can't swallow their content.
- `scripts/agents/art-director.js` — `buildArtDirectorUserPrompt` injects the three new mandate sections; `runArtDirector` returns `heroSource` and `layoutSignature`.
- `scripts/design-agents.js` — mandate-injection region (next to the existing color/shell mandate) computes the three new mandates and passes their sections into all three `runArtDirector` call sites (initial, validation-retry, codegen-retry); the shell/measurables parsing region also parses `layoutSignatureDecl`; the archive-artifact region persists `hero-source.json` and `layout-signature.json` alongside the existing `shell.json`.
- `scripts/prompts/art-director.md` — reorders the hero-source preference list (composed → content-lifted → signal-event → quote, "a quote is a lane, not the default"); adds Ground Strategy and Layout Signature declaration guidance; extends the `===SHELL===` block and adds `===HERO_SOURCE===`/`===LAYOUT_SIGNATURE===` to the response format.
- `tests/utils/spec-blocks.test.js`, `tests/utils/delimiter-parser-new-blocks.test.js`, `tests/scripts/agents/art-director.test.js`, `tests/scripts/agents/art-director-blocks.test.js` — coverage for the new fields, including the optional/graceful-degradation cases.

---

## Task 1: Parsing — SHELL's `ground_strategy` + new `LAYOUT_SIGNATURE` block

- [x] Extend `parseShellBlock` with `ground_strategy` (lowercase-normalized, defaults to `null`).
- [x] Add `parseLayoutSignatureBlock` (columns, axis, symmetry, hero_zone — same shape as the other spec-block parsers).
- [x] Extend `delimiter-parser.js`: capture `hero_source` and `layout_signature`; add both delimiter names to the `===FILE:===` block's termination lookahead.
- [x] Tests: `tests/utils/spec-blocks.test.js` (ground_strategy present/absent/case-normalized; layout signature fields), `tests/utils/delimiter-parser-new-blocks.test.js` (blocks captured, blocks absent doesn't break the parse, FILE block still terminates correctly at the new delimiters).

## Task 2: Mandate 1 — Palette formula (ground strategy)

- [x] `scripts/utils/palette-formula-mandate.js`: read the last 7 builds' `shell.json`, extract `ground_strategy`, soft-forbid the last 3 distinct values.
- [x] `formatPaletteFormulaMandateForPrompt` returns `''` when no build has a declared ground strategy (old archives) — the section is omitted from the prompt rather than showing empty guidance.
- [x] Tests: empty history → `''`; old-shaped `shell.json` (no `ground_strategy` key) → skipped, not counted; forbid-list correctness (last 3 distinct, newest-first).

## Task 3: Mandate 2 — Hero-source rotation

- [x] `scripts/utils/hero-source-mandate.js`: read the last 7 builds' `hero-source.json`, soft-forbid `quote` only when the last 2 consecutive builds were both quote-sourced.
- [x] `scripts/prompts/art-director.md`: demoted `signals.quote` from preference #1 to #4 ("a quote is a lane, not the default"); each source now maps directly to a `HERO_SOURCE` enum value.
- [x] Tests: empty history → `''`; single quote day → not forbidden; broken streak → not forbidden; two-in-a-row → forbidden.

## Task 4: Mandate 3 — Layout signature

- [x] `scripts/utils/layout-signature-mandate.js`: read the last 7 builds' `layout-signature.json`, soft-forbid the last 3 distinct signatures, exact-match on the full (columns, axis, symmetry, hero_zone) tuple.
- [x] Tests: empty history → `''`; partial/old-shaped artifact (missing a field) → skipped; forbid-list correctness; repeated exact tuple counted once.

## Task 5: Wire into the orchestrator

- [x] `scripts/design-agents.js`: compute all three mandates next to the existing color/shell mandate computation, each independently try/caught (a mandate failure never blocks a run).
- [x] Pass the three new sections into all three `runArtDirector` call sites (initial call, validation-failure retry, codegen-failure retry).
- [x] Parse `layoutSignatureDecl` alongside the existing `shellDecl`/`measurablesDecl`.
- [x] Persist `hero-source.json` and `layout-signature.json` as archive artifacts alongside `shell.json`.

---

## Verification

- `pnpm test` — 416/416 passing (53 in the 7 new/modified test files).
- `pnpm lint` — clean (0 errors; pre-existing warnings in `vite.config.ts`/`design-agents.js` untouched by this change).
- `pnpm typecheck` — clean.
- `node --check` on every touched `.js` file — clean.
