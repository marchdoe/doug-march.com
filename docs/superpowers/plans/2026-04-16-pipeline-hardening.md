# Pipeline Hardening Report — 2026-04-16

**Author:** Backend Architect (agent)
**Audience:** site owner, technical
**Goal:** drive first-try success rate up, hold ~$1/run cost ceiling, keep one-shot daily redesigns shipping

---

## 1. Failure taxonomy

Empirically, from 8 failed runs across 2026-04-13 and 2026-04-14:

### A. Token-designer mutilates `__root.tsx` (3 of 8 failures, ~38%)

**Root cause.** The token designer is asked to do two unrelated jobs in one shot: (1) author a 200-line `elements/preset.ts` and (2) re-emit the *entire* `__root.tsx` with one URL changed. Haiku plays along with (1) and frequently botches (2) — drops `<Scripts />`, drops `<body>`, reintroduces a fake local `function Scripts()`, or drops the meta charset.

**Current handling.** `fixRootTsx()` in `design-agents.js:191` patches a missing `Scripts`/`ScrollRestoration` *import*, but does NOT recreate missing JSX, missing `<body>`, or missing meta. `validateGenerated()` (build-validator.js:111-137) catches the symptoms post-hoc, then the retry loop re-runs the same buggy agent with the error appended.

**What's wrong.** The retry path re-asks Haiku to re-emit the whole file again — same prompt, same model, same trap. The 2026-04-14 failure is the canonical case: first attempt dropped `<Scripts />`, retry dropped `<body>`. Each retry burns ~$0.15–0.30 of Sonnet/Haiku budget for negative progress.

### B. Unified-designer silent stalls (3 of 8 failures, ~38%)

**Root cause.** Sonnet sometimes streams nothing for 15+ minutes and the watchdog kills it. The CLI sends the prompt, receives no `assistant` events, no `result` event, then SIGTERM. Build 1776098695977 stalled on first call; build 1776102588129 stalled then the *retry* timed out at 10 min (because the retry uses the default 10-min timeout, not the extended 30-min one — see C).

**Current handling.** `claude-cli.js:194-204` watchdog. `design-agents.js:919` extended the *first* call to `timeoutMs: 1800000, stallTimeoutMs: 1500000`.

**What's wrong.** Three things: (1) no progressive backoff or model swap on retry — same Sonnet, same prompt, same likely outcome; (2) the retry path at `design-agents.js:1151` calls `callAgent()` with no `timeoutMs` override, so the retry gets the 10-min default and reliably times out on a slow Sonnet day; (3) the prompt is huge (visual spec ~15KB + brief ~4KB + tokens ~3KB + seed + ratings + libraries → easily 60KB+ system+user). Bigger prompts correlate with longer time-to-first-token.

### C. Token-designer parse failures — chatter instead of delimiters (1 of 8, ~13%)

**Root cause.** Haiku occasionally opens with "I'll start by checking for applicable skills..." instead of `===RATIONALE===`. The prompt forbids this but Haiku doesn't always comply.

**Current handling.** `parseDelimiterResponse` returns no files; `callAgent` throws "no parseable response found"; `Token Designer failed` → `restore(originalBackup)` → run aborts entirely without retry (`design-agents.js:799-801`).

**What's wrong.** A single chatter prefix nukes the whole run with no recovery. There's no parse-recovery (e.g., search for `===FILE:` *anywhere* in the response, not just the start) and no "format-only" retry that re-prompts Haiku with the partial output and "skip the chatter."

### D. Disallowed-URL violations (1 of 8, ~13%)

**Root cause.** Unified-designer rendered `<a href="https://news.ycombinator.com/...">` and a github.com link in the sidebar. The URL allowlist (build-validator.js:199-212) rejects them.

**Current handling.** Pre-build validation catches it; retry; retry can also fail (it did in 1776102588129 — the retry produced a build with no .css bundles).

**What's wrong.** This is genuinely a prompt issue — the unified-designer prompt does not strongly forbid third-party hrefs in nav/sidebar/signal markup. The validator is working; the prompt isn't.

### E. Unified-designer omits required files (observed, partially mitigated)

**Root cause.** Designer returns 1 file when asked for 5 (e.g., 2026-04-14 trace shows `unified-designer` produced only `app/routes/work.$slug.tsx` — yet the missing-files retry block at `design-agents.js:930-955` did not trigger on this run because `unified-designer` was the *only* call with required-files enforcement, and even then the run continued to validation with a half-broken file set).

Wait — re-reading: `REQUIRED_FILES` enforcement IS at lines 930-955, and it *does* retry. But on 2026-04-14 the trace shows the unified designer ran for 31 minutes and emitted only `work.$slug.tsx`. The retry would have run for another 30 minutes within the 30-min job timeout — it likely got skipped because the missing-files retry happens silently after a real call already burned the Sonnet budget.

**What's wrong.** The retry doubles cost and the GitHub Actions cron has a 30-min wall clock — there's no time budget to retry a 30-min Sonnet call.

---

## 2. Hardening recommendations (prioritized)

### #1 — Stop letting Haiku touch `__root.tsx`. Use a curated fonts chassis catalog + template substitution.

**Change.** Remove `app/routes/__root.tsx` from the token-designer's responsibility entirely. Add a curated catalog of "fonts chassis" entries — each one is a small object describing a Google Fonts family pairing (families + per-family weights + italics). The Design Director picks one chassis per day. From the chassis we deterministically generate (a) the Google Fonts URL, (b) the `theme.tokens.fonts` entries that get merged into `preset.ts`, and (c) the `__root.tsx` file via template substitution. Haiku no longer authors fonts at all.

**Scope of v1 chassis (confirmed with owner 2026-04-16): FONTS + FONT SCALE.** Each chassis describes:
- font families
- weights loaded per family
- italics on/off per family
- type scale ratio (e.g., 1.250 Major Third, 1.333 Perfect Fourth)
- base size (e.g., `1rem`, `1.0625rem`)
- the resulting `fontSizes` object derived from ratio + base (2xs through 2xl, generated deterministically)

The chassis does NOT include spacing scale, layout tokens, or any color information. Token Designer retains full creative authority over spacing, colors, semantic tokens, conditions, globalCss, and everything else in `preset.ts`. The chassis is purely a typography decision: "what fonts load, what `theme.tokens.fonts` looks like, and what `theme.tokens.fontSizes` looks like."

**Files touched / created.**
- `elements/chassis/` — new directory. One file per chassis (e.g., `broadsheet-editorial.ts`), each exporting `{ id, families, weights, italics, fontTokens, scaleRatio, baseSize, fontSizes }`.
- `elements/chassis/index.ts` — new file. Exports `CHASSIS_CATALOG: ChassisEntry[]` with mood + archetype tags for the Director to filter on.
- `scripts/utils/chassis.js` — new helpers: `buildGoogleFontsUrl(chassis)`, `buildFontTokens(chassis)`, `buildFontSizes(scaleRatio, baseSize)`, `getChassisById(id)`.
- `scripts/templates/__root.tsx.template` — new file. Frozen canonical `__root.tsx` content with a single `{{GOOGLE_FONTS_URL}}` placeholder. No other variability.
- `scripts/prompts/token-designer.md` — delete the entire `__root.tsx` section (lines 50-89). Add: "Fonts AND font scale have been pre-selected via the chassis. Do NOT define `theme.tokens.fonts` or `theme.tokens.fontSizes` — both are merged in by the orchestrator. Author everything else (colors, spacing, semanticTokens, globalCss, conditions)."
- `scripts/prompts/design-director.md` — add a new "Chassis selection" section listing the catalog (or summarizing it) and asking the Director to emit a `===CHASSIS_ID===` block alongside the visual spec.
- `scripts/design-agents.js` — after the Director phase, look up the chosen chassis. After the Token Designer writes `preset.ts`, merge in the chassis's `fontTokens` deterministically. Replace the `fixRootTsx` post-write fixup with `renderRootTemplate(buildGoogleFontsUrl(chassis))`.
- `scripts/utils/build-validator.js` — keep Check 3 as a tripwire (should never fire now). Optionally add a "fonts in URL match fonts in preset.ts" cross-check as a follow-up.

**Expected impact.** Eliminates failure category A entirely (~38% of failures). Haiku's token-designer prompt shrinks substantially. Parse failures (category C) become less likely because there's less to emit. Quality floor on typography rises (catalog is hand-curated). Cost on token-designer phase: -20-30%.

**Why this is right.** The prompt currently spends 40 lines warning Haiku not to break a file it has no design reason to author. The Google Fonts URL is the only legitimate thing changing. A template substitution cannot drop `<body>`. The chassis catalog also raises the typography quality floor without sacrificing the per-day color expression that signals drive. This is the single highest-leverage change in the whole report.

**Future expansion (NOT in v1).** Once the fonts-and-scale chassis is stable, we can revisit expanding to: spacing scale, layout tokens, then full presets if the per-day color story can absorb the loss of variety. Each expansion is a separate decision with its own scope review.

### #2 — Add a cheap "format-shim" pre-pass for Haiku output before declaring parse failure.

**Change.** When `parseDelimiterResponse` returns 0 files, before throwing, search the raw response for `===FILE:` anywhere (not just line-start) and for fenced code blocks that look like a preset. If chatter prefix detected, strip everything before the first `===` and re-parse. If still empty, do ONE format-only retry with: "Your previous response started with prose. Re-emit the SAME content starting with `===RATIONALE===` as the very first characters. No prefix."

**Files touched.** `scripts/design-agents.js:308-345` (the parse fallback chain), and a new `coercToDelimiterFormat(rawText)` helper.

**Expected impact.** Eliminates category C (~13% of failures) at near-zero cost — recovers 90% of "chatter prefix" cases without a re-call. The format-only re-call costs <$0.05.

### #3 — Cap unified-designer cost+time with model fallback on stall, not pure retry.

**Change.** When the unified-designer call throws a stall/timeout error, do NOT retry the same agent with the same model. Instead:

1. First call: Sonnet, 30-min wall, 25-min stall (already configured).
2. On stall/timeout: invoke a *narrower* recovery agent that takes the existing partial output (if any was streamed) plus the missing-files list and finishes only what's missing — model: `sonnet`, timeoutMs: 600000. If 0KB streamed, skip step 2.
3. On second stall: bail out and let the daily run fail today rather than burning another 30 min of Sonnet that will also stall.

**Files touched.**
- `scripts/utils/claude-cli.js` — expose the `fullText` accumulated-so-far on the rejection error (currently only logged in the message string). The error should carry `{ partialOutput, charCount }` as properties.
- `scripts/design-agents.js:917-954` — wrap the unified-designer call in a small state machine instead of a single try/catch. Pass partial output back to the recovery call.
- `scripts/design-agents.js:1151` — for the *post-build-validation* retry path, also reject doubling Sonnet cost on stall: only retry on validation errors that name a specific file/line; on time/stall errors, fail fast.

**Expected impact.** Eliminates the worst-case cost path (two consecutive 30-min Sonnet stalls @ ~$0.80 each). Doesn't directly reduce stall *rate*, but bounds the damage to one stall per run. Saves $0.50-$1.00 on the bad days.

### #4 — Shrink the unified-designer prompt. Stalls correlate with input size.

**Change.** Audit the unified-designer system prompt construction at `design-agents.js:506-514` and `889-906`. Right now it concatenates: base prompt + design-system-reference + libTypography + libColor + libLayout + libComponents + seed (15-30KB). Plus user prompt: brief + visual spec + tokens + ratings + weights (~25KB). Easily 60-80KB total.

Specifically:
- The `library-*` files are mostly reference tables. Move the most-used 30% inline to the base prompt; load the rest via "if you need detail, ask"-style anchors only when needed (we can't actually do that with one-shot — so just delete the bottom 70%).
- Stop including all 5 `recentBriefs` in the unified-designer prompt — the design director already used them. Pass only the *archetype* names + design briefs (1-line each).
- Stop including `recentRatings` in the unified-designer prompt at all. Ratings should inform the *director* and *token designer* (early phases), not the executor. The executor needs structure, not taste feedback.

**Files touched.** `scripts/design-agents.js:887-906`, `scripts/utils/prompt-builder.js`, possibly trim `scripts/prompts/library-*.md` files.

**Expected impact.** Reduce prompt by 30-50%. Time-to-first-token typically scales sublinearly with input but stalls correlate strongly with very large inputs. Modest cost savings (~$0.10-0.20 on unified-designer input cost).

### #5 — Tighten the URL allowlist enforcement *in the prompt*, not just the validator.

**Change.** Add a hard block to `scripts/prompts/unified-designer.md` near the top: "External hrefs are forbidden EXCEPT for the project URLs listed in your content section. Internal navigation uses TanStack Router `<Link to="/about">`. Do not link to news.ycombinator.com, github.com, or any other external service in headers, sidebars, or signal blocks." Cite the validator allowlist explicitly.

**Files touched.** `scripts/prompts/unified-designer.md`.

**Expected impact.** Eliminates category D (~13% of failures) at zero cost.

### #6 — Make the post-build retry smarter about *which* error class is recoverable.

**Change.** `identifyFailingAgent` currently routes by *which file is named in the error*. But errors fall into classes the agent can or cannot fix:

- **Recoverable by retry:** type errors, missing imports, undefined tokens, JSX syntax errors.
- **Not recoverable by retry:** smoke checks like "no .css bundles" (this means codegen produced nothing — re-running the same agent won't help; the preset.ts is structurally wrong in a way the agent already convinced itself was right). Disallowed URLs (cheap to fix but the agent often re-introduces them — needs explicit prompt addendum).

Add error classification at `design-agents.js:1119`. For `class === 'codegen-empty'`, fail fast rather than retrying. For `class === 'disallowed-url'`, retry with a specific URL-removal directive instead of dumping the raw error.

**Files touched.** `scripts/design-agents.js:262-274` (`identifyFailingAgent`), new `classifyError(error)` function, and `scripts/design-agents.js:1119-1180` (retry dispatch).

**Expected impact.** Avoids ~1 wasted retry per bad-build day. Saves ~$0.30 on retry-prone runs.

### #7 — Pin Haiku output with a one-shot example in-prompt.

**Change.** Append a worked example at the end of `scripts/prompts/token-designer.md`: a 30-line valid response showing the exact `===RATIONALE===` / `===DESIGN_BRIEF===` / `===FILE:elements/preset.ts===` sequence. Haiku follows examples better than rules.

**Files touched.** `scripts/prompts/token-designer.md`.

**Expected impact.** Reduces parse failures (category C) and meta-omissions (category A) further. Cost: +200 input tokens per call ($0.0002).

---

## 3. Cost analysis

### Current per-run estimate (no retries)

| Phase | Model | Input ~tok | Output ~tok | Cost |
|---|---|---|---|---|
| Design Director (Sonnet) | sonnet | ~6k | ~5k | $0.018 + $0.075 = $0.09 |
| Spec Critic (Haiku) | haiku | ~12k | ~1k | $0.010 + $0.004 = $0.014 |
| Director revision (50% of runs) | sonnet | ~7k | ~5k | $0.05 (avg) |
| Token Designer (Haiku) | haiku | ~10k | ~4k | $0.008 + $0.016 = $0.024 |
| **Unified Designer (Sonnet)** | sonnet | ~25k | ~30k | **$0.075 + $0.45 = $0.525** |
| Screenshot Critic (Sonnet, vision) | sonnet | ~10k + image | ~2k | $0.06 |
| Build/codegen (no LLM) | — | — | — | $0 |
| **Subtotal happy-path** | | | | **~$0.78** |

With one full retry of unified-designer on validation failure: **+$0.50 → $1.28**.
With a stall + 10-min retry that also stalls: **+$0 generated but burns time**, no token cost (timeout means CLI never billed for output, but the API still bills for input × the time it spent on the request — usually small).
With director revision + spec critic re-run: **+$0.10**.

**Owner's stated $1.20–2.00 range is consistent with retries firing 30-50% of the time. Eliminating cat A + C alone collapses the average toward $0.85.**

### Where to trim

- **Spec Critic on Haiku** (already done, good): keep.
- **Drop or down-sample `recentRatings` from unified-designer** (rec #4): saves ~5k input tokens = $0.015/run.
- **Trim library prompts** (rec #4): ~10k input tokens = $0.03/run.
- **Eliminate __root.tsx output from token-designer** (rec #1): saves ~1500 output tokens on Haiku = ~$0.006, but the real win is reliability.
- **Skip screenshot critic on retries**: it currently runs once on the happy path, which is correct. Confirm it never runs twice.

### Where spending is well-justified, do not cut

- **Sonnet for unified-designer.** Haiku will not produce coherent multi-file compositions. This is the right model.
- **Spec critic.** $0.014 to catch a bad spec before the $0.50 unified-designer call is the best ROI in the pipeline.
- **Pre-archive snapshot.** Zero LLM cost; preserves history. Keep.
- **Pre-build validation.** Zero LLM cost; catches errors before `pnpm build`. Keep.

---

## 4. Quick wins vs structural changes

### Ship today (≤2 hours of work each)

1. **Rec #5** — add the URL-allowlist directive to `unified-designer.md`. Pure prompt edit.
2. **Rec #7** — add a worked example to `token-designer.md`. Pure prompt edit.
3. **Rec #2** — add the `coerceToDelimiterFormat` helper and one chatter-strip retry. ~30 lines of JS.
4. **Fix the retry-timeout bug** in rec #3 step 2: the post-validation retry path at `design-agents.js:1151` should pass `timeoutMs: 1800000, stallTimeoutMs: 1500000` for `unified-designer` — currently it inherits the 10-min default. One-line fix, bug pre-existing.

### Needs a refactor (1-2 day projects)

5. **Rec #1** — template-based `__root.tsx`. Touches three files, requires a small migration of the existing `__root.tsx` into a template. Highest leverage in the whole report; do this next.
6. **Rec #4** — prompt-size trimming for unified-designer. Requires careful audit of which library content is actually used by the model.
7. **Rec #3** — model fallback on stall. Requires extending `claude-cli.js` to surface partial output and a small state machine in the orchestrator.
8. **Rec #6** — error classification. Requires regression tests for the new dispatch logic.

---

## 5. What I would NOT change

- **The single unified-designer pattern.** Confirmed off-limits and correctly so. The retry-on-stall problem looks like an argument for splitting, but it isn't — splitting trades coherence loss for stall reduction, and we have cheaper ways to reduce stalls.
- **`fixRootTsx`'s conservative behavior.** The deliberately-narrow regex (only patches the import line, never JSX) is load-bearing. The git history will show prior aggressive versions corrupted files. If you adopt rec #1, you can delete `fixRootTsx` entirely; if you don't adopt rec #1, leave it exactly as-is.
- **The `validateGenerated` URL allowlist** including `www.w3.org`. The recent commit `a9915de` added this for SVG namespaces. It looks like an unrelated allowance but it's required for inline SVG and removing it will break renders.
- **The 5-min cache TTL implications around Sonnet calls.** The current sequential pipeline is mostly serial enough that prompt caching offers little; do not contort the orchestration to chase cache hits. The win isn't there.
- **`writtenPaths` orphan-cleanup tracking.** Looks like over-engineering until the AI invents a new component file outside `MUTABLE_FILES`. Then it's the only thing that prevents leaks into the next day's diff. Keep.
- **The archetype anti-repetition retry at `design-agents.js:698-711`.** It's a 1-shot retry with a stricter prompt that accepts on failure. Looks loose, but tightening it (forever-loop until compliant) would burn budget on adversarial Sonnet runs. Current behavior is correct.
- **Pre-archive snapshot via `vite preview` + screenshot.** Zero LLM cost, preserves the prior day's site at `public/archive/`. Looks expensive (extra build) but is essential for the archive feature; do not gut.
- **The `tools: ''` and `--disable-slash-commands` CLI args** in `claude-cli.js:71-72`. They're what prevent Claude from invoking skills/MCP and going off-script. Removing them invites the "I'll start by checking for applicable skills..." chatter to become the *whole* response.

---

## Bottom line

The two changes that deliver the most reliability per hour of work:

1. **Stop letting Haiku author `__root.tsx`. Use a template.** Kills ~38% of failures. Half a day of work.
2. **Fix the post-validation retry timeout for unified-designer** (it inherits the 10-min default and reliably re-times-out). One line of code, eliminates the "retry crashed: timed out after 10 minutes" failure mode entirely.

Do those two and the pipeline's first-try success rate should jump from roughly 50-60% to 85%+, with average per-run cost settling around $0.85-0.95 — under the $1 ceiling on most days, with headroom for the occasional legitimate validation retry.
