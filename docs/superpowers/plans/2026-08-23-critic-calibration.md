# Critic calibration: cost and quality follow-ups to the vision-block work

**Goal:** four small, independent changes gated on PR #140 (real image blocks) and PR
#143 (taste memory / reference auto-promotion) landing: cut the tokens spent on critic
image input, put the mockup gate on the model tier that actually matches its job, give
the screenshot critic a concrete bar to measure against instead of just a spec, and
strip the spec critic's prompt down to what its checks actually read.

## Part 1 — downscale critic-bound screenshots

**Problem.** `captureScreenshot` (1280×900) and `captureHtmlFileScreenshot` (1440×900,
mockups) each produced a JPEG at full render resolution, q70, for critic consumption.
Claude's vision tokenizer bills by pixel count, not by JPEG quality — a 1280w or 1440w
image costs meaningfully more input tokens than the same composition at ~1024w, with no
gain in the critic's ability to judge hierarchy, color, or spec fidelity. Quality
reduction alone (the q55 option in scope) would shrink file size, not token cost — pixel
dimensions are the actual lever.

**Approach taken.** Downscale, don't just re-encode. Re-navigating at a smaller viewport
was rejected: this site is responsive, so a narrower CSS viewport can trip a different
layout breakpoint than the one actually being judged — a critic comparing "what shipped"
against "what render happened" needs the exact same layout, just fewer pixels. Adding an
image library (sharp/jimp) was ruled out by the brief.

The resolution: after the full-resolution PNG screenshot is captured, resize it to
`CRITIC_JPEG_WIDTH` (1024) and re-encode as JPEG on the *same already-open Playwright
page*, using the page's own `<canvas>` — `page.evaluate()` decodes the PNG via
`Image.decode()`, draws it scaled onto an offscreen canvas, and exports
`canvas.toDataURL('image/jpeg', 0.7)`. No second navigation, no new dependency, same
layout as the archived render. `computeDownscaleDimensions(naturalWidth, naturalHeight,
targetWidth)` is the pure sizing function (never upscales a narrower source) — pulled out
of the in-page callback so it's unit-testable without a browser; the in-page copy is a
literal duplicate because `page.evaluate` serializes its callback into the page context
and can't close over outer Node functions.

**What's untouched.** `png` / `darkPng` (archived as `screenshot.png`,
`screenshot-dark.png`, `mockup-screenshot.png`) are byte-identical to before — nothing
downstream of archiving changes. The `jpeg` / `darkJpeg` fields were already
critic-only (never archived, confirmed by grep before touching them), so this is a
same-signature change to what those fields contain, not a new field or a new call-site
contract.

**Numbers.** 1280×900 → 1024×720 (~64% of the pixels); 1440×900 mockup capture →
1024×640 (~51% of the pixels).

## Part 2 — `mockup-critic` moves to Haiku

`PROD_MODELS['mockup-critic']` was `'sonnet'`; it's now `'haiku'`. The mockup gate checks
floors the Art Director already declared numerically (canvas %, hero scale, color
coverage) — a measurement task, not a taste call. `screenshot-critic`, which does make a
taste/fidelity judgment, stays on Sonnet.

The one risk called out in the brief — Haiku 4.5 400s on adaptive thinking — was already
guarded: `claude-sdk.js`'s `supportsAdaptiveThinking()` checks the model ID prefix
(`!model.startsWith('claude-haiku-4-5')`) and turns off `thinking` automatically, so a
tier change in `models.js` can't reintroduce the 400. No code change needed there, only
verification (and a new test pinning it — see Tests below, since the existing haiku/no-
thinking test used an explicit model override rather than exercising a real haiku-tier
agent name end to end).

## Part 3 — self-eval delta against the best-rated build

**Reference lookup.** `findBestRatedReference(referencesDir)` (`scripts/utils/ratings.js`)
reads `references/index.yml` directly rather than re-deriving from
`archive/*/rating-*.json`: it only surfaces builds that `promoteRatingToReferences`
(collect-ratings.js, PR #143) actually promoted — file `own-<date>.png`, description
`OWN (<date>, grade <A|B>)`. Grade A beats grade B; ties break on the newer date.
Manually-curated `own-*` entries that predate auto-promotion (no parseable `grade A|B` in
their description — e.g. the existing `own-2026-04-28-terracotta-specimen.png` "GOLD
STANDARD" entry) are skipped as not machine-comparable. If the top candidate's file is
missing on disk, the function falls through to the next-best rather than failing.

**Block assembly.** The screenshot-critic's inline block array in
`runScreenshotCriticGate` moved into a new `scripts/agents/screenshot-critic.js`
(mirroring the existing `mockup-critic.js` pattern), exporting
`buildScreenshotCriticBlocks(ctx)` and `MAX_SCREENSHOT_CRITIC_IMAGES = 4`. When a best
reference is found, the caller reads its PNG into a buffer and passes
`{ buffer, description }`; the builder appends a text label ("The owner's highest-rated
past build, for calibration:") plus an `image/png` block, but only if doing so keeps the
total image count at or under 4 — normal runs already carry up to 3 (mockup + light +
dark), so the guard only ever trims the reference, never the required images.

**Prompt.** `screenshot-critic.md` gets a new "Calibration Against the Best-Rated Build"
section: skip entirely if no reference image is attached; otherwise add one line inside
the verdict block, after the verdict/issues and before `===END===`:
`BAR: above|at|below — <one sentence why>`. The judgment is holistic (overall craft), not
a repeat of mockup-fidelity or spec-fidelity checks above it.

**Parsing and persistence.** `parseBarLine(raw)` (`scripts/utils/critic-verdict.js`) is a
tolerant regex (`/BAR:\s*(above|at|below)\b\s*[-—:]*\s*(.*)/i`) that returns `null` on
anything that doesn't match — absent, malformed, or no reference attached are all
non-errors. `runScreenshotCriticGate` only calls it when a reference was actually
attached, and only persists `bar` onto the `verdicts.json` entry when a line was
successfully parsed:

```js
verdicts.push({ critic: 'screenshot-critic', verdict, feedback, ts, ...(bar ? { bar } : {}) })
```

**Flowing into lessons.** `buildLessonsBlock` (`lessons.js`) previously only read
`verdicts.json` entries where `verdict === 'REVISE'` — but a BAR verdict usually rides on
a SHIP (the build passed critique but still landed "below" the reference), so gating on
REVISE would have silently dropped it. The BAR check is now independent of the REVISE
branch: any entry carrying `bar.position` contributes a
`BAR vs best build: <position> — <reason>` line under source `<critic> (BAR)`, feeding
tomorrow's "Recent Lessons" block exactly like a REVISE complaint does, with no schema
migration — it's just another key on the same `verdicts.json` array.

## Part 4 — spec-critic prompt trim

**What was actually irrelevant.** The spec-critic's five checks (hero quotability,
preset↔spec consistency, archetype×chassis renderability, self-check honesty,
measurable-spec consistency) are pure spec/preset.ts/mandate comparisons — none of them
reference the day's raw signals or brief history from prior days. Every historical
spec-critic REVISE has been a hex/token mismatch between the visual spec and
`elements/preset.ts`, confirming this in practice, not just by reading the checklist.

**Trimmed prompt** (`runScreenshotCriticGate`'s neighbor, the Spec Critic Gate in
`design-agents.js`) now sends: hero copy, archetype, chassis ID, visual spec, self-check,
measurables, shell declaration, `preset.ts`, and a new "Mandates" block — the same
`colorMandateSection` / `shellMandateSection` / `paletteFormulaMandateSection` /
`heroSourceMandateSection` / `layoutSignatureMandateSection` text blocks the Art Director
itself was constrained by, already computed earlier in the same function and now reused
rather than duplicated. Dropped: `Today's Signals` (~4KB raw YAML) and `Recent Archive
Briefs` (~13KB, last 5 days) — neither is read by any of the five checks, and the
mandates block gives the critic something more directly checkable (did the spec violate
a declared constraint) in their place.

`recentBriefs` and `signals` themselves are untouched — both still feed the Art
Director's own prompt earlier in the run; only the spec-critic's slice of the prompt
changed. `spec-critic.md`'s "What You Receive" section was updated to match (it
previously listed a chassis catalog block that was never actually sent — a pre-existing
doc/reality mismatch, fixed in passing since the section was already being edited).

## Files touched

- `scripts/utils/snapshot.js` — `computeDownscaleDimensions` (exported, pure),
  `downscaleForCritic` (in-page canvas resize); wired into `captureScreenshot` (jpeg,
  darkJpeg) and `captureHtmlFileScreenshot` (jpeg)
- `scripts/utils/models.js` — `PROD_MODELS['mockup-critic']` → `'haiku'`
- `scripts/utils/ratings.js` — `findBestRatedReference` (new)
- `scripts/utils/critic-verdict.js` — `parseBarLine` (new)
- `scripts/utils/lessons.js` — BAR entries surfaced independent of verdict
- `scripts/agents/screenshot-critic.js` (new) — `buildScreenshotCriticBlocks`,
  `MAX_SCREENSHOT_CRITIC_IMAGES`
- `scripts/design-agents.js` — screenshot-critic gate wired to the new block builder,
  reference lookup, and BAR persistence; spec-critic user-prompt assembly trimmed
- `scripts/prompts/screenshot-critic.md` — Calibration section, response-format examples
- `scripts/prompts/spec-critic.md` — "What You Receive" updated to match the trim
- Tests: `tests/utils/snapshot.test.js` (new), `tests/scripts/agents/screenshot-critic.test.js`
  (new), `tests/utils/ratings.test.js`, `tests/utils/critic-verdict.test.js`,
  `tests/utils/lessons.test.js`, `tests/utils/models.test.js`, `tests/utils/claude-sdk.test.js`,
  `tests/utils/vision-router.test.js`, `tests/scripts/prompt-guards.test.js`

## Verification

- `pnpm test` — 519 passed (0 failed), including BAR-line parsing (tolerant + rejecting
  cases), the 4-image guard, and the model-tier change.
- `pnpm lint` (`biome ci .`) — clean: 109 warnings / 1 info, matching the pre-existing
  baseline on `main` exactly (0 new warnings, 0 errors). Five formatter-only errors
  surfaced mid-work on freshly-written files (line-wrap only) and were fixed with
  `biome format --write` before this count.
- `pnpm typecheck` — clean.
- `node --check` on every touched/added `.js` file — clean.

## Not in this change

- No image-processing dependency added (Part 1's constraint) — the canvas resize runs in
  the already-open Chromium page, not in Node.
- No change to what's archived: `screenshot.png`, `screenshot-dark.png`,
  `mockup-screenshot.png` are byte-identical in intent to before this change.
- `findBestRatedReference` only ever looks at `references/index.yml`; it does not scan
  `archive/*/rating-*.json` directly, so a rating that hasn't yet been promoted (grade
  below B, or `collect-ratings.js` hasn't run) doesn't produce a BAR reference until
  promotion happens — by design, this reuses PR #143's existing promotion gate rather
  than adding a second path to the same data.
