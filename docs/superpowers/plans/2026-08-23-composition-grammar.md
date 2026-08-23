# Composition Grammar — replacing the 8-archetype cage

**Goal:** Replace the fixed 8-name archetype validator with a generated composition
grammar, so the daily design composes from independent axes instead of picking a
silhouette off a shortlist. Target space: ~230,000 tuples against the current 8.

**Motivating audit (2026-08-23, 122 archived builds):**
- Archetypes rotate evenly — Specimen 22 / Gallery Wall 17 / Broadsheet 16 / Poster 15 /
  Split 14 / Stack 13 / Index 13 / Scroll 11 — so a silhouette recurs every ~8 days.
- `scripts/agents/art-director.js:97` throws on any archetype outside the 8-name Set.
  `scripts/prompts/art-director.md:230` tells the Art Director this outright
  ("Not a novel archetype … there is no code path where an invented archetype survives").
- Every one of the last 11 shipped pages has exactly one `<nav>`. Shell treatment
  varies; shell *structure* never does.
- Owner rating 2026-07-22: "still feels like it is cycling through 4 or 5 different
  templates." Owner rating 2026-07-20: "get away from naming layouts."

**Core insight:** the template feeling has two sources, and the validator is only one.
The other is `scripts/prompts/seeds/` — the pipeline hands the designer 5–8KB of canned
prose describing how the chosen archetype works. That is a template, literally. With 8
files × 2–3 lanes, the entire system holds ~20 compositional briefs.

**Architecture:** Split what the seed files currently fuse into two independent
dimensions.

| Dimension | Source | Varies by |
|---|---|---|
| **Composition** | Generated axis tuple, deterministic from date + soft-forbid history | ~230,000 combinations |
| **Aesthetic lane** | Curated prose, retained from today's seed files | ~20 hand-written lanes |

Today these are welded together — lane `swiss` only ever reaches the Art Director when
the archetype is `Poster`. Decoupled, a Swiss lane can land on a broken-symmetry
diagonal composition. This preserves the quality the seeds carry (concrete references,
named anti-patterns) while removing the silhouette lock-in.

**Non-goal:** random tuples. Coherence is the reason the 8 archetypes existed. The
grammar carries a coherence contract (Task 4) and the Art Director must justify its
tuple, exactly as it justifies a recently-used hue today.

**Tech stack:** Node ESM, vitest, no new dependencies. Same soft-forbid pattern as
`color-mandate.js` / `shell-mandate.js`.

**Branch:** `feat/composition-grammar`.

---

## Known risk, accepted up front

Removing the archetype name removes a coherence anchor the system has relied on for
122 builds. Two mitigations are load-bearing:

1. **The aesthetic lane survives** (Task 3) — the designer still receives concrete
   reference prose, just no longer bound to a silhouette.
2. **The vision critics are the coherence gate — and they have never fired in
   production.** 15 `verdicts.json` across 122 builds, all spec-critic. The mockup
   critic and screenshot critic left zero trace; PR #136 (Playwright in CI) and #140
   (SDK image blocks) merged 2026-08-23 and have not survived an armed run.

   **Task 0 is therefore a hard prerequisite for Task 4's coherence gate.** Tasks 1–3
   can land and be verified locally on the dev tier without it.

---

## Phase 0 — Instrumentation (prerequisite)

Nothing in this plan is falsifiable without it. ~10 lines.

## Task 0.1: Capture cost from the CLI result event

- [x] `scripts/utils/claude-cli.js` — `extractResultUsage()` pulls `total_cost_usd`, `usage`,
      `duration_ms`, `num_turns` off the result event.
- [x] **Deviation:** records are appended to a module-level ledger
      (`scripts/utils/cost-ledger.js`), not threaded through return values. `callClaudeCLI`
      resolves a plain string that ~20 call sites destructure; widening it touches all of
      them, and the swarm runs calls concurrently, where append-on-completion is the safer
      shape. `runAgentSwarm` calls `resetLedger()`; the four retry sites call `noteRetry()`.
- [x] `scripts/utils/archiver.js` — persists `cost.json` in the build dir.
- [x] `scripts/generate-archive-json.js` — `readCost()` surfaces the headline number in
      `_data.json` and the per-agent breakdown in `_detail.json`; pre-telemetry builds and
      malformed files read as `null`.
- [x] Tests: 18 in `tests/utils/cost-ledger.test.js` + 2 in `claude-sdk.test.js`.
- [x] **Verified live**: a real haiku CLI call booked `$0.002934` at 2564 in / 74 out,
      `estimated: false`. The CLI's own figure matches this module's price table exactly.
      Archive read path verified by injecting a `cost.json`, regenerating, and confirming
      the other 119 builds still render with `cost: null`.

**Note:** `claude-sdk.js:136` already logs `usage.input_tokens` / `output_tokens` for the
vision calls but discards them. Same capture path.

---

## Phase 1 — The grammar

## Task 1: Composition axes module

- [ ] New `scripts/utils/composition-grammar.js`. Export `COMPOSITION_AXES`:

  | Axis | Values | n |
  |---|---|---|
  | `columns` | `single` `two-asymmetric` `two-equal` `three` `irregular-twelve` `masonry` | 6 |
  | `axis` | `vertical` `horizontal` `diagonal` `radial` | 4 |
  | `symmetry` | `symmetric` `left-weighted` `right-weighted` `broken` `mirrored` | 5 |
  | `hero_zone` | `full-bleed` `upper-left` `center` `lower-third` `edge-bound` `interleaved` | 6 |
  | `density` | `sparse` `measured` `dense` `crowded` | 4 |
  | `rhythm` | `even` `accelerating` `syncopated` `interrupted` | 4 |
  | `shell_posture` | `standard` `marginal` `none` `folded-into-hero` `footer-only` | 5 |
  | `field_ratio` | `type-dominant` `balanced` `field-dominant` `drenched` | 4 |

  6·4·5·6·4·4·5·4 = **230,400**.

- [x] `describeAxisValue(axis, value)` → one-sentence compositional meaning, used to
      synthesize the prompt block. This is the text that replaces the canned seed prose.
- [x] `isValidTuple(tuple)` — every key present, every value in its axis. No name check.
- [x] Also exports `tupleSpaceSize()`, `formatTuple()`, `formatCompositionForPrompt()`.
- [x] Tests: 16 in `tests/utils/composition-grammar.test.js` — cardinality (230,400 asserted),
      all 38 descriptions present and substantive, invalid tuples, no legacy name in any axis.

## Task 2: Composition mandate (soft-forbid over history)

- [x] Extend `scripts/utils/spec-blocks.js` `parseLayoutSignatureBlock` from 4 keys to all 8.
      Missing keys stay `null`.
- [x] New `scripts/utils/composition-mandate.js` with **per-axis** recency over the last 3
      builds. Reads `composition.json`, falling back to `layout-signature.json`, so history
      spans the changeover. Values no longer in the vocabulary are dropped, not forbidden.
      (`layout-signature-mandate.js` still present — it is deleted in Task 4 with its
      call site.)
- [x] Date-derived suggestion tuple via `hashToRange`, salted per axis so the axes don't
      move in lockstep. Nudged off discouraged values.
- [x] **CORRECTION — the plan's premise was wrong.** There are **zero**
      `layout-signature.json` files in the archive, not ~15: the artifact shipped in #142 on
      2026-08-23 and the pipeline has not run since 2026-07-30. So "return `''` on empty
      history" would have silenced the mandate on precisely the first three armed runs,
      leaving them steered by the model's priors — the sameness this arc exists to break.
      Changed: with no history the block drops its avoid-clauses and carries the starting
      tuple alone. `''` is now returned only for an unusable mandate object.
- [x] Tests: 24 in `tests/utils/composition-mandate.test.js`.
- [x] **Verified against the real archive**: 2026-08-24/25/26 produce three tuples sharing
      no axis value.

## Task 3: Decouple aesthetic lanes from archetypes

- [x] Flattened `scripts/prompts/seeds/*.md` into `scripts/prompts/lanes/` — one file per
      lane. **Correction: 17 lanes, not ~20** (8 seed files: one holds 3 lanes, seven hold 2 —
      3 + 7×2 = 17). Each keeps its reference material and named anti-patterns; the
      archetype-mechanics prose is stripped: every `## Spatial rhythm` section is gone
      (columns/axis/hero-zone/density claims are now the grammar's job), and anti-pattern
      bullets that hard-locked a composition shape (e.g. Tesla's "DO NOT render three
      projects side-by-side", WIRED's "the front page is columnar from first pixel",
      Framer/Stripe's "horizontal split is the identity") are removed — aesthetic/color/
      type/component anti-patterns are kept. Cross-lane references by name ("...unlike the
      Pinterest lane's tiles") are generalized, since lanes are no longer read alongside
      their former siblings. `scripts/prompts/seeds/` and `select-seed.js` are untouched
      and still the live path — additive until Task 4 rewires the call site.
- [x] Front-matter on every lane: `id`, `register` (a short kebab-case aesthetic label,
      e.g. `radical-subtraction`, `paper-white-editorial-density`), `affinity` (3-4
      composition-axis values, comma-separated — validated by `validateAffinities()`
      against the real axis vocabulary; 0 invalid across all 17).
- [x] New `scripts/utils/select-lane.js`. Scoring, not hash-then-override: each lane's
      score is `hashToRange('lane:'+date+':'+laneId, 0, 999)` (deterministic per-lane
      base) `+ 300` per composition-axis value it shares with today's tuple `− 600` if it
      was used in the last 3 builds (per `extractRecentLanes`, reading a `lane.json`
      artifact Task 4 will start writing — currently 0 exist, same as `layout-signature.json`).
      Highest score wins. This keeps "biased toward affinity" and "soft-forbidding recent
      use" as genuinely soft pulls on a hash-random base, rather than a hard filter with a
      fallback.
- [x] Tests: 26 in `tests/utils/select-lane.test.js` — all 17 real lanes parse with a
      populated register/affinity/body and no residual `## Spatial rhythm`; affinity
      vocabulary validated against composition-grammar.js for all 38 real axis values;
      `extractRecentLanes` empty/malformed/lookback-window cases; `selectLane` determinism,
      forbid-window plumbing, and a live-lane demonstration that a forbidden lane
      (`linear`) still wins within 27 tried dates when its affinity match is strong enough
      — proving the forbid is soft, not by assertion but by finding a real case.
- [x] **Verified against real content**: three consecutive dates (2026-08-24/25/26) pick
      three distinct lanes (`nike`, `arc-browser`, `tesla-spacex`) on the real, currently-
      empty archive.

---

## Phase 2 — Cut the cage

## Task 4: Art Director contract

- [x] `scripts/agents/art-director.js` — deleted the `ARCHETYPE_NAMES` Set and the throw.
      Replaced with `isValidTuple` against a new `===COMPOSITION===` block (via
      `parseCompositionBlock`). `===ARCHETYPE===` is now **optional and descriptive**: the
      AD may name what it made, recorded for continuity, never validated.
- [x] Added the coherence contract: `===COMPOSITION_RATIONALE===`, required, minimum 10
      chars, stating why the tuple serves today's hero phrase.
- [x] `scripts/prompts/art-director.md`: archetype section replaced with the composition-
      axis table; `===LAYOUT_SIGNATURE===` folded into `===COMPOSITION===` (all 8 axes),
      the duplicate retired; Max-Risk License now offers a choice — break one named
      anti-pattern from the lane, OR land one axis on a soft-forbidden value — never both.
- [x] `scripts/design-agents.js`: deleted the second `ARCHETYPE_NAMES` copy plus
      `extractArchetypeFromText`, `buildArchetypeHistory`, `buildArchetypeConstraintPrompt`
      (all three were already advisory-only — `forbidden` was "retained for trace logging
      only, no longer enforced" per their own comment, so nothing was actually
      hard-enforced by their removal). `buildArchetypeContractBlock` →
      `buildCompositionContractBlock(tuple)`, firing on `density === 'sparse'` alone
      (**deviation**: the task's draft wording suggested `density: sparse` AND
      `field_ratio: drenched`; narrowed to density alone since that's composition-
      grammar.js's own definition of "few elements, page is mostly field" — Poster's
      sparseness and Specimen's type-as-canvas both violate "no cards" for the same
      underlying reason, independent of field_ratio). `describeRiskTier`'s comment
      updated. `composition.json` + `lane.json` persisted per build; `archetype.txt` still
      written when the AD supplies a name.
- [x] Rewired the seed→lane call site from `selectSeedContent` to `selectLane`, keyed by
      the AD's own composition tuple instead of `chosenArchetype`. Deleted
      `scripts/utils/select-seed.js`, `scripts/utils/layout-signature-mandate.js`,
      `scripts/prompts/seeds/` and their tests — dead after the cutover, not kept as a
      compat shim (no runtime code validates archetype strings against a name-set
      anymore, so a `LEGACY_ARCHETYPES` export as the Rollback section suggested would
      have had no consumer).
- [x] Tests: `tests/scripts/agents/art-director.test.js` / `art-director-blocks.test.js` —
      novel and blank archetypes accepted, invalid axis value rejected, missing axis
      rejected, missing/short `COMPOSITION_RATIONALE` rejected. Verified live (not just
      unit tests) end-to-end through a realistic full AD response: parse → validate →
      lane selection succeeded; a response with no `===COMPOSITION===` and one with
      `columns: seventeen` both failed closed with the expected message; every archetype
      value tried (`undefined`, `''`, a novel phrase, `'Poster'`, `'Cinema'`) was accepted.

**Scope found during execution, not in the original checklist.** Changing the AD's Layout
Specification bullet from "Archetype — name it" to "Composition — name the tuple" removed
the one guaranteed textual anchor three *other* prompt files depended on to key real
logic off the literal 8 names:
- `mockup-designer.md`'s "Canvas commitment (non-negotiable)" per-archetype density-floor
  table (the guardrail against the site's most-cited failure mode, a narrow column on a
  sea of background) and its Specimen/Poster home-page content contract.
- `spec-critic.md`'s hard chassis-ratio check ("if archetype is Specimen or Poster, ratio
  must be ≥1.500") and its measurable-floor-by-archetype table.
- `screenshot-critic.md`'s "Archetype Purity" section 8, gated on the archetype string
  being exactly "Specimen" or "Poster".
- `react-engineer.md` had the same Specimen/Poster home-page dichotomy as
  mockup-designer.md.

Flagged and confirmed with Doug: expanded Task 4 to re-express all four in composition
terms (`density: sparse` for the home-page-is-hero-phrase contract; `field_ratio:
type-dominant`/`density: sparse` for the chassis-ratio floor; `density`/`columns` for the
canvas-utilization table) rather than leave them dormant. Added a structured
`## Composition` section to the shared `enrichedBrief` (read by the mockup designer, the
screenshot critic, and now the react engineer too) so all three see the tuple reliably,
instead of depending on the AD having also restated it in free-text visual-spec prose.

## Task 5: Shell posture becomes real

- [ ] `shell_posture: none` must actually produce a page with no `<nav>`. Audit
      `scripts/prompts/react-engineer.md` and the Layout/Sidebar/Footer reference files
      for assumptions that a nav always exists.
- [ ] `scripts/utils/build-validator.js` — confirm nothing asserts nav presence.
- [ ] Reconcile with `shell-mandate.js`, which soft-forbids nav *treatments*. Posture
      (does it exist) and treatment (how it looks) are different axes; the mandates must
      not contradict each other.
- [ ] Addresses the 3x-recurring "header is messed up" complaint in `signals/taste.md`
      by making "no header" a reachable outcome for the first time.

---

## Phase 3 — Learning

## Task 6: Uniqueness index (deterministic, zero LLM)

- [ ] New `scripts/utils/uniqueness-index.js`. Per build, compute and persist
      `uniqueness.json`:
  - composition distance — Hamming distance of the axis tuple vs each of the last 7
  - hue distance — minimum circular distance vs the last 7 primary hues
  - lane novelty — builds since this aesthetic lane last ran
  - shell novelty — posture + treatment vs the last 7
  - fidelity — declared `===MEASURABLES===` vs what the screenshot critic measured
- [ ] Surface the composite in the archive index so "is it getting more unique" becomes a
      chart rather than a vibe.
- [ ] Feed the previous run's index into the next AD prompt — a low score is direct,
      quantitative "you repeated yourself" feedback that needs no owner rating.
- [ ] Tests: distance math, empty history, legacy builds missing fields.

## Task 7: Rating corpus and throughput

- [ ] **Backfill.** 3 usable ratings exist all-time (2026-07-20, -22, -23), every one a C.
      13 more are pre-April legacy schema and silently skipped by
      `readRatingForDate`. There is no A or B anywhere, so `#143`'s
      auto-promote-A/B-to-references path has never had anything to promote and the
      screenshot critic's BAR self-eval calibrates against a C.
      → Doug grades the best 10 of the 122 archived builds in one sitting.
- [ ] **Throughput.** Per-day rating has produced 3 ratings in 5 months. Add a weekly
      batch view — seven screenshots side by side, A–D under each — as one interaction
      per week instead of seven.
- [ ] Widen `lookbackDays` in `ratings.js` / `lessons.js` once the corpus can support it.
      At 3 ratings, a 10-day window renders empty on almost every run.

---

## Verification

Local dev tier only (Max plan, no API cost) until both CI blockers clear:
the `biome-gate` ruleset bypass for GitHub Actions, and the API credit top-up.

- [ ] `pnpm vitest run` green.
- [ ] Three consecutive local runs produce three distinct composition tuples with no
      shared axis value in more than one.
- [ ] At least one run lands `shell_posture: none` and ships a page with no `<nav>`.
- [ ] `cost.json` present in every build dir with a plausible total.
- [ ] `uniqueness.json` present; index rises across the three runs.
- [ ] Screenshots of all three, per the always-verify-with-a-screenshot rule.
- [ ] `pnpm fallow --summary` before the PR.

## Rollback

Every task is additive except Task 4's deletions. Keep the 8 archetype names in a
`LEGACY_ARCHETYPES` export for one release so archive readers and
`buildArchetypeHistory` consumers degrade rather than break.
