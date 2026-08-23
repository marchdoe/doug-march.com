# Compounding Memory Implementation Plan

**Goal:** Give the nightly design pipeline permanent memory. A review found
that nothing in the pipeline compounds — feedback lives in rolling ≤14-build
windows (`lessons.js`, `ratings.js`) or dies at the end of the run that
produced it. This plan adds three independent, additive mechanisms so
today's taste, today's recurring complaints, and today's wins all persist
into every future run instead of aging out.

**Branch:** `feat/compounding-memory` (off `origin/main`).

**Scope:** Three related features, one PR. No changes to unrelated agent
regions of `scripts/design-agents.js` — only the prompt-assembly spots for
the mockup context (`mockupCtxBase`) and the React Engineer user prompt.

---

## Feature 1: persistent taste memory (`signals/taste.md`)

**Problem:** `buildRecentRatingsBlock` (ratings.js) looks back 10 builds;
`buildLessonsBlock` (lessons.js) looks back 14. Once a rating or verdict
ages out of that window, its lesson is gone — even a standing, repeated
complaint like "the header keeps breaking" eventually falls off the edge
and has to be relearned.

**Fix:** a small, hand-curated, permanent file, injected into every run
regardless of date.

- [x] `scripts/utils/taste-memory.js` — `buildTasteMemoryBlock(root)` reads
      `signals/taste.md`, hard-caps it at ~3KB (truncates with a note if
      over), wraps it in a `## Owner Taste Memory (permanent — these
      override recent trends)` heading, returns `''` when absent/empty.
      Pure I/O, no LLM calls.
- [x] Wired into `scripts/agents/art-director.js`
      (`buildArtDirectorUserPrompt` gains a `tasteMemoryBlock` param,
      appended as its own section) and `scripts/design-agents.js`
      (`mockupCtxBase`, consumed by `mockup-designer.js`'s
      `buildMockupDesignerUserPrompt`). Computed once in `runAgentSwarm`
      and threaded through all three `runArtDirector` call sites (initial
      call, validation-failure retry, codegen-failure retry).
- [x] Seeded `signals/taste.md` (~2.1KB) with real content pulled from the
      repo, not invented:
  - Gold standards: the 2026-04-28 drenched-terracotta Specimen
    (`references/index.yml`'s `own-2026-04-28-terracotta-specimen.png`
    entry + the `daily-redesign.yml` comment calling it the risk-8 gold
    standard) and the 2026-06-13 fairway Split high-water mark.
  - Standing complaints, distilled from the three consecutive C-grade
    ratings (`archive/2026-07-20/rating-*.json`,
    `archive/2026-07-22/rating-*.json`, `archive/2026-07-23/rating-*.json`):
    header instability, the "cycling through 4-5 templates" feeling, and
    the brand-lockup-must-be-the-real-circular-mark rule (cross-referenced
    against the 2026-07-10 finding recorded in
    `scripts/prompts/screenshot-critic.md`).
  - An all-time grade ledger, one line per rating found.
- [x] Verified `signals/taste.md` is not caught by any `.gitignore` pattern
      (`git check-ignore -v signals/taste.md` — no match) — no negation
      rule needed.

## Feature 2: lessons upgrades (`scripts/utils/lessons.js`)

**Problem:** every lesson is weighted equally regardless of whether it's a
one-off nitpick or the third time the same complaint has shown up. The
React Engineer — the agent screenshot-critic REVISE verdicts usually blame
— received zero historical feedback at all.

- [x] RECURRING escalation: `clusterRecurring()` greedily groups entries by
      cheap normalized-token overlap (stopword-filtered, overlap
      coefficient ≥ 0.5 — no embeddings, no external deps). A cluster with
      ≥2 members collapses to one entry, text prefixed
      `RECURRING (Nx): <newest occurrence's text>`, and RECURRING entries
      sort before non-recurring ones (ties broken by count, then date).
      Existing single-occurrence behavior is unchanged — clustering is a
      no-op when nothing overlaps.
- [x] Fed the same `lessonsBlock` (already computed once for the mockup
      designer at the top of `phase-2a`) into
      `buildEngineerUserPrompt()` in `scripts/design-agents.js` (~line
      1313-1341) — no new archive scan, just closure reuse.
- [x] Extended `tests/utils/lessons.test.js`: folds ≥2 similar complaints
      into one RECURRING entry, sorts RECURRING first regardless of date,
      and confirms a single occurrence is never marked RECURRING.

## Feature 3: auto-promote A/B builds into the reference library

**Problem:** `references/index.yml` only grows by hand. A build the owner
graded A or B never becomes a reference the Art Director can cite —
today's win doesn't compound into tomorrow's prompt.

- [x] `scripts/collect-ratings.js` gains `findBestScreenshot()` (newest
      `archive/<date>/build-*/screenshot.png`, `null` if none — expected
      for builds that predate screenshot archiving),
      `appendReferenceEntry()` (string-append to `references/index.yml`
      that preserves existing comments/formatting rather than round-
      tripping a YAML serializer; idempotent — no-ops if the file was
      already promoted), and `promoteRatingToReferences()` (the two
      combined, gated on grade A/B, schema-matched to the existing
      `own-<date>-*.png` / `description` / optional `tags` shape so
      `collect-references.js` picks the entry up unchanged).
- [x] Wired into `harvest()` right after the rating JSON is written, in its
      own nested `try/catch` so a promotion failure never costs the rating
      write that already landed on disk (matches the file's existing
      "never blocks" contract).
- [x] Unit tests in `tests/scripts/collect-ratings.test.js` (temp-dir
      style, matching the file's existing `parseRatingFromIssue` tests):
      screenshot lookup (present/absent/newest-wins), index append
      (creation, preservation, escaping, idempotency), and the combined
      promotion function (grade gating, missing-screenshot skip, A and B
      both promote, idempotent across repeated harvests).

---

## Verification

- [x] `pnpm test` — full suite including new tests, passing.
- [x] `pnpm lint` (biome ci) — clean.
- [x] `pnpm typecheck` — clean.
- [x] `node --check` on every touched `.js` file.
- [x] Prompt-assembly smoke test: imported `buildArtDirectorUserPrompt` and
      `buildMockupDesignerUserPrompt` directly with a real `taste.md` on
      disk and confirmed the `## Owner Taste Memory` section renders in
      both.
