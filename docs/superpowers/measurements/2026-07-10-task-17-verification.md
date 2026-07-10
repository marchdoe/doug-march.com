# Task 17 — Local verification of the design-quality pipeline (2026-07-10)

Verification run by Claude (delegated by Doug). Three full pipeline runs on the
Max-plan dev tier (Sonnet ceiling), per the protocol in the 2026-06-11 plan.

## Results

| Run | Weights | Hero | Archetype / chassis | Shell (nav · footer · lockup) | Outcome |
|---|---|---|---|---|---|
| 1a | defaults | "4–1. NO QUESTIONS ASKED." | Stack / anton-inter-tight | floating pills · colophon band · stacked-md | **FAILED** — SSR crash at prerender; retry blind; sources destroyed (all three since fixed) |
| 1b | defaults | "Built alone. Called the best ever made." | Stack / anton-inter-tight | left spine · folded-into-nav · stacked-md | **SHIPPED** — mockup critic APPROVE r0, screenshot critic SHIP. Fidelity ~90% (render dropped brand mark; below-fold band color flipped) |
| 2 | SIGNALS=2 INSPIRATION=9 | "All our dreams can come true…" | Scroll / bricolage-manrope | bottom-center pills · end-of-scroll colophon · mark-only-md | **SHIPPED but below bar** — BOTH vision critics starved by PNG payloads (mockup-critic r1 prompt 1.16M tokens > 1M limit; screenshot-critic 1.6MB → 0 bytes); light render diverged from approved dark mockup unchecked |
| 3 | RISK=4 | "Do what you can, with what you have, where you are." | Specimen / big-shoulders-atkinson | corner mark · quiet footnote band · horizontal-md | **SHIPPED clean** — mockup critic APPROVE r0; one build failure recovered by Phase-5 retry (new error context); JPEG captures live (49KB prompt payload); screenshot critic SHIP; brand mark present |

## Gate verdicts

- **Execution quality: PASS.** Runs 1b and 3 are in the register of the recorded
  gold standards — committed drenches, poster-scale type, disciplined shells,
  real signal integration (run 1b's hero quotes the day's HN story).
- **Shell variance: PASS.** Three distinct navs, three lockup variants, three
  footer treatments across three same-day runs (shell.json diffs in
  archive/2026-07-10/build-*/).
- **Rating loop: PASS.** End-to-end test: issue #65 (created → yaml comment →
  `collect-ratings` harvest → correct rating-{ts}.json schema → auto-closed).
  Test artifacts deleted. Note: the unfilled issue-body template survives
  harvest only because `grade: B  # A-D`'s inline comment fails the
  single-letter test — load-bearing subtlety in parseRatingFromIssue.

## Defects found and fixed during verification (all committed)

1. `019ce7d` — SSR crash invisible to retries; failing sources destroyed by
   restore; no SSR-safety rule in the engineer prompt.
2. `fad3b9a` — successful runs wrote trace.json into phantom build-failed-*
   dirs (`return promise` inside try/finally races the finally).
3. `a9bd4b2` — no critic check for brand-lockup fidelity (run 1b shipped
   without the mark).
4. `f36321d` — PNG screenshot payloads starved both vision critics (run 2);
   critics now get JPEG (~5-10x smaller), archives keep PNG.
5. `947aac6` — critics only ever saw the light scheme; now both schemes are
   captured, one must match the mockup, the other must stay a committed
   adaptation. Dark render archived as screenshot-dark.png.

Also this session: explicit per-agent model IDs incl. art-director → Opus 4.8
in prod (`066e703`); references taste channel seeded + stale-brief matching
fixed (`a639859`).

## Remaining before merge

1. CI dry-run (workflow_dispatch, dry_run=true) — validates the pinned CLI
   2.1.92 + API-key prod tier with the new model IDs (explicit IDs verified
   against 2.1.92 locally via npx; a dry run confirms in situ). ~$3.50.
2. Doug's own taste pass on the three builds (archive/2026-07-10/build-*/).
3. Merge feat/design-quality-pipeline → main.
