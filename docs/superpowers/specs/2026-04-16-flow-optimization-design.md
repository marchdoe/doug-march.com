# Flow Optimization Design — 2026-04-16

**Status:** approved through brainstorm; ready for implementation planning
**Owner:** site owner
**Related:** `2026-04-16-pipeline-hardening.md`, `2026-04-16-token-designer-review.md`, `2026-04-16-session-handoff.md`

---

## TL;DR

The pipeline currently produces designs that a friend characterized as "WordPress templates" — structurally correct but without taste, palette variation, or compositional opinion. The fix is **quality-bar first, variation second**: until the pipeline produces designs the owner is proud of, optimizing for variety just yields more flavors of mediocre.

This design introduces three coordinated changes:

1. **Vision-enabled reference flow** — the existing references infrastructure carries text-only descriptions; agents cannot *see* the design quality they're supposed to learn from. Switch Director and Unified Designer to multimodal input with actual reference images.
2. **Deterministic `colorMandate` injected into agents** — helper code computes a hue mandate (target hue range + forbidden recent hues from archived presets) before Director runs, then injects it into both Director's and Token Designer's user prompts. Closes the "third coffee-shop palette" rut without removing creative authorship and without adding parser surface.
3. **Token Designer-emitted `===COLOR_SCHEME===`** — structured artifact making palette decisions explicit, archivable, and machine-monitorable. Surfaces palette-rut programmatically.

Token Designer's role and scope stay intact — it remains the foundational structural agent. The two-agent foundation→composition split (Token → Unified) is preserved.

---

## Context & motivation

### The WordPress problem

A friend reviewed several recent daily redesigns and said they "all look like WordPress templates." That observation cuts to the dominant pain points the owner identified:

- **A — Same-y palette** (third coffee-shop in a row; vibrancy mandate ignored)
- **B — Same-y composition** (sidebar + scroll, similar density)
- **C — Same-y typography** (chassis didn't visibly change the feel)
- **D — Reliability/cost** (failed builds, retries, $ ceiling)
- **E — Compositional incoherence** (locally-good pieces don't add up)
- **+ Mobile display gaps** (flagged but out of scope here)

Across all five, the unifying root cause is the same: **the agents have no exemplars of "good."** The references library is empty. The references that *do* flow in (awwwards trending, system-curated) are passed as text descriptions only. The model has been trained on enough WordPress-quality output that without a stronger pull toward better references, it defaults to safe-mediocre.

### Sequencing principle

Quality bar first; variation second. Until the system can reliably produce a design the owner is proud of, optimizing for variety produces more options that are all equally uninspiring.

### What this design intentionally does NOT do

- **Color chassis** (curated palette catalog) — considered, rejected. Would constrain creative authorship in a way that contradicts the "agents as designers" framing. The colorMandate + scheme emission preserves authorship while bounding the search space.
- **Dedicated taste-critic phase** — would add cost without fixing bad generation upstream. Revisit only after reference-driven generation is proven.
- **Composition chassis** — would re-introduce the templated feel we're trying to escape. Composition variety should come from reference imitation, not catalog selection.
- **Per-agent deep audits** — captured as a separate work track (see `2026-04-16-agent-audit-program.md`). The audit findings will inform follow-up optimizations; this design is unblocked.

---

## Architecture

Three coordinated changes:

### 1. Vision-enabled reference flow

The existing infrastructure (`references/index.yml`, `scripts/collect-references.js`, `signals/today.references.md`) routes references into the Director and Unified Designer prompts as text descriptions. Replace the text path with a multimodal path:

- Reference images cached locally to `references/cache/<hash>.{png,jpg}`
- Manifest emitted as `signals/today.references.json` with image paths
- `claude-cli.js` (or the agent-call layer) extended to accept `images: [{ path, caption }]`
- Director and Unified Designer receive 3-5 references as actual image content blocks
- Token Designer remains text-only (its job is colors/structure, not visual composition imitation)

### 2. Deterministic colorMandate

Computed by helper code (`scripts/utils/color-mandate.js`) before the Director phase runs. The mandate contains:

- **Target hue range** — derived from day's signals (weather mood, news mood). E.g., "200-240° (cool blue) for a clear winter morning."
- **Forbidden recent hues** — extracted from the last 5-7 archived presets' primary hues. E.g., "avoid 25-50° (recent terracotta and amber)."
- **Rationale** — one sentence explaining why this mandate, in plain prose.

The mandate is plain data (no LLM involved in producing it). It flows into:
- Director's user prompt — so Director respects it when drafting the visual spec
- Token Designer's user prompt — so Token Designer respects it when picking colors

Neither agent emits the mandate back; it's inputs-only. Token Designer's emitted `===COLOR_SCHEME===` is the only structured output we validate against the mandate.

### 3. Token Designer-emitted color scheme

Token Designer's response now contains a fourth structured block:

```
===COLOR_SCHEME===
{
  "primary_hue": { "h": 215, "s": 70, "l": 50, "name": "ocean blue" },
  "secondary_accent": null | { ... },
  "neutral_family": { "tinted_toward": "blue", "name": "slate" },
  "mood_word": "crisp",
  "color_story": "Winter clarity — slate neutrals, ocean accent for emphasis."
}
```

The scheme is:
- Archived per-build at `archive/<date>/build-<id>/color-scheme.json`
- Validated against the colorMandate (warning, not failure)
- Validated against the actual `preset.ts` accent hex (warning, not failure)
- Used as input to monitoring queries ("hues across last 7 days") and future taste-critic work

---

## Components in detail

### Reference image pipeline

**`scripts/collect-references.js` (extended)**
- Continues to score references against brief by tag-keyword match
- New: fetches selected reference images (awwwards URLs and user-curated paths) into `references/cache/<sha1>.{ext}`
- New: emits `signals/today.references.json`:
  ```
  {
    "references": [
      { "id": "...", "imagePath": "references/cache/<hash>.png",
        "url": "...", "description": "...", "tags": {...}, "score": 5 }
    ]
  }
  ```
- The legacy `signals/today.references.md` continues to be written as a human-readable companion

**`references/cache/`** — new directory, gitignored, content-addressable storage

**`scripts/utils/claude-cli.js` (or `callAgent`)**
- Extended to accept `images: [{ path, caption? }]` parameter
- Builds multipart message blocks (image + text) per Anthropic SDK spec
- Falls back to text-only on image-load failure

### colorMandate computation

**`scripts/utils/color-mandate.js` (new)**
- Reads last 5-7 archived presets from `archive/<date>/build-<id>/preset.ts`
- Extracts each accent's primary hue (HSL conversion)
- Computes "forbidden zone" — ±30° around each recent hue
- Reads day's signals; maps mood keywords to target hue ranges via a small lookup table
- Returns `{ targetHueRange: [min, max], forbiddenHues: [...], rationale: "..." }`

**Director user prompt (`scripts/design-agents.js`)**
- Director-call helper invokes `computeColorMandate()` and includes the formatted result as a "Color Mandate" section in Director's user prompt
- Director uses it as guidance when drafting the visual spec (mood, accent direction)
- Director does NOT emit it back — the mandate is plain data passed through

**Token Designer user prompt (`scripts/design-agents.js`)**
- Token Designer-call helper includes the same `computeColorMandate()` result as a "Color Mandate" section in Token Designer's user prompt
- Token Designer's `===COLOR_SCHEME===` block is expected to honor or explicitly justify deviation

### Token Designer color scheme contract

**Token Designer prompt (`scripts/prompts/token-designer.md`)**
- Add "Color Mandate" section explaining the colorMandate input the agent will receive
- Add `===COLOR_SCHEME===` to the Response Format section
- Append two worked example color schemes (one vibrant, one restrained) at end of prompt — Haiku follows examples better than rules
- Update existing color guidance to reference the mandate ("justify your primary hue against the mandate; if you go outside it, explain why in the color story")

**Parser (`scripts/design-agents.js`)**
- Extract `===COLOR_SCHEME===` block alongside existing `===RATIONALE===` and `===DESIGN_BRIEF===`
- Parse JSON; on parse failure, do one format-only retry
- Persist parsed scheme to `archive/<date>/build-<id>/color-scheme.json`

### Validation helpers

**`scripts/utils/color-validation.js` (new)**
- `validateSchemeAgainstMandate(scheme, mandate)` — warn if primary hue falls in forbidden zone
- `validateSchemeAgainstPreset(scheme, presetSrc)` — extract accent hex from preset, convert to HSL, warn on >15° distance from declared primary hue
- `detectCoffeeShopPalette(scheme)` — warn if neutral saturation <8% AND warm hue (10-50°) AND accent saturation <50%
- All return `{ ok: bool, warnings: string[] }`; never fail the build

---

## Data flow

```
1. collect-signals.js          UNCHANGED   → signals/today.yml
2. interpret-signals.js        UNCHANGED   → signals/today.brief.md  (Haiku)
3. collect-references.js       EXTENDED    → signals/today.references.json
                                             + references/cache/<hash>.png
4. computeColorMandate         NEW (sync)  → mandate object passed to Director
5. Design Director             EXTENDED    (Sonnet + vision input)
   - inputs: brief, recent archive, references manifest + 3-5 IMAGES,
             colorMandate (as user-prompt context)
   - emits: visual spec
            ===CHASSIS_ID===<typography>
            (no new emission — mandate is inputs-only)
6. Spec Critic                 UNCHANGED   (Haiku)  ← future audit target
7. Token Designer              EXTENDED    (Haiku)
   - inputs: visual spec, brief, archetype,
             colorMandate (as user-prompt context)  ← NEW
   - emits: rationale, design_brief,
            ===COLOR_SCHEME===<structured>          ← NEW
            elements/preset.ts (full color + structural authorship)
8. Color scheme validation     NEW (sync)  warnings logged, build continues
9. Orchestrator (deterministic) UNCHANGED  writes typography chassis + __root.tsx
10. Unified Designer           EXTENDED    (Sonnet + vision input)
    - inputs: visual spec, tokens, brief,
              references manifest + 3-5 IMAGES   ← NEW
    - emits: Layout, Sidebar, route files
11. panda codegen + vite build UNCHANGED  (CSS bundle min-size check just landed)
12. Screenshot Critic          UNCHANGED  (Sonnet vision)  ← future audit target
13. Archive + commit           EXTENDED   includes color-scheme.json
```

**Key invariants:**
- The references manifest is produced once and consumed by two agents — same images, consistent visual context across Director and Unified Designer
- colorMandate is guidance, not law — agent has final color authority but must justify deviation in color story
- All new validation produces warnings only; the daily build still ships even when warnings fire

---

## Failure handling

| Failure | Detection | Response |
|---|---|---|
| Reference image fetch fails | exception in `collect-references.js` | log warning, omit image from manifest, proceed |
| Empty references manifest | manifest length 0 | proceed without refs; warn quality bar weakens this run |
| `computeColorMandate()` throws (corrupt archive, missing signals) | exception in helper | fall back to "default vibrancy guidance" string mandate; warn; continue |
| Token Designer doesn't emit `===COLOR_SCHEME===` | parser miss | format-only retry once; if still missing, continue but flag for monitoring |
| Color scheme contradicts mandate (forbidden hue) | post-parse hue distance check | log warning; do NOT fail build (mandate is guidance) |
| Vision call fails | claude-cli error | retry once text-only; warn loss of reference influence |
| `references/cache/` missing | exists check | create on first run; not an error |
| Color scheme primary hue lies about preset accent | hex extraction + HSL distance | log warning ("agent lied about its color scheme"); don't fail |

**Principle:** the system degrades gracefully. No new hard-fail paths. Quality drops on degradation but the daily run still ships. Quality drops are caught via warnings + the monitoring built on `===COLOR_SCHEME===` archives.

---

## Testing & validation

### Programmatic checks (run every build)

- New parser test: `===COLOR_SCHEME===` block present and well-formed
- New unit tests: `computeColorMandate()` with mocked archive fixtures (forbidden hue extraction, target hue mapping, fallback on missing signals)
- Hue-distance check: Token Designer's `primary_hue.h` is ≥30° from each of the last 3 days' primary hues (warn-only on first miss; warn louder on consecutive misses)
- "Coffee-shop palette" detector: warn if neutral saturation <8% AND warm hue (10-50°) AND accent saturation <50%
- Color-scheme-vs-preset consistency: extract accent hex from `preset.ts`, convert to HSL, compare to scheme's stated primary hue (warn on >15° drift)
- Existing CSS bundle minimum size check (just landed in this branch)

### Regression checks

- All 220 vitest tests still pass
- `pnpm build` clean (no panda warnings)
- e2e: site-health (17 tests) + dev-panel (4 tests) pass
- Prompt size budget: Token Designer system prompt stays under 100 lines after additions; Director under 250

### Cost guardrails

- Total run cost ≤ $1.10 (was ≤ $1.00; vision input adds ~$0.05)
- Vision input per agent capped at 5 images (~$0.025/agent)
- If `images: []` in manifest, skip vision wrapping entirely (zero cost overhead)

### Subjective + long-term metrics

- Owner reviews via `/dev` panel ratings (existing UI)
- `saveAsReference` usage grows the curated library
- Weekly metric: distinct primary hues across last 7 days (target ≥5)
- Monthly metric: average rating trend; references library size

---

## Cost analysis

### Current per-run estimate (happy path, no retries)

Per `2026-04-16-pipeline-hardening.md`:
- Subtotal: ~$0.78
- With one validation retry: +$0.50 → $1.28
- Owner ceiling: ~$1.00

### Delta from this design

| Change | Cost delta | Notes |
|---|---|---|
| Vision input on Director (~3-5 images @ ~$0.005/image) | +$0.025 | Sonnet 4.5 image input pricing, approximate |
| Vision input on Unified Designer (~3-5 images @ ~$0.005/image) | +$0.025 | Sonnet 4.5 image input pricing, approximate |
| colorMandate computation | +$0 | deterministic, no LLM |
| colorMandate context in Director + Token Designer prompts (~10 lines each) | +$0.001 | small input increase |
| Color scheme parsing + archiving | +$0 | deterministic, no LLM |
| Token Designer prompt growth (~30 lines added: mandate consumption + scheme contract + worked examples) | +$0.001 | Haiku input |
| Format-only retry on color scheme parse miss (rare) | +$0.005 amortized | < 5% of runs |
| **Total delta** | **+$0.06** | well under the new $1.10 ceiling |

The cost increase is small and bounded. The vision input is the dominant new cost; if it produces measurably better designs, it pays for itself many times over in saved retries from quality-driven rework.

---

## Out of scope (captured separately)

- **Per-agent deep audit program** — `docs/superpowers/plans/2026-04-16-agent-audit-program.md` (to be scaffolded). One task per agent, sized for independent sessions.
- **Mobile-display quality** — flagged by owner; needs its own design pass.
- **Dedicated taste-critic phase** — revisit after reference-driven generation is producing measurably better designs.
- **Composition chassis / templates** — explicitly rejected here; would re-introduce templated feel.
- **Color chassis** — explicitly rejected; Token Designer keeps color authorship.

---

## Open items before implementation

- **Reference library curation.** The owner has been working on this; needs to reach ~30-50 entries to be effective at v1. Not strictly blocking — the system can ship with a smaller library and grow via `saveAsReference`. Recommend at least 10-15 entries seeded before flipping vision-enabled flow on.
- **Mandate target-hue lookup table.** Mood-keyword-to-hue-range mapping needs a starting point. ~20 entries should cover the common cases. Author with the colorMandate computation work.
- **Worked example color schemes.** Two worked examples for the Token Designer prompt (one vibrant, one restrained) need to be authored. Author with the prompt updates.

---

## Implementation sequencing (informs writing-plans)

Suggested order, smallest-blast-radius first:

1. **Color scheme emission contract** — Token Designer prompt update + parser + archive write + validation helpers. No vision, no mandate work yet. Lands the monitoring foundation.
2. **colorMandate computation + injection** — color-mandate.js + injection into Director and Token Designer user prompts (no agent prompt-format changes; mandate is input context only). Lands the input-side pull on palette diversity.
3. **Reference manifest + image cache** — collect-references.js extension + cache directory. No agent changes yet.
4. **Vision-enabled agent calls** — claude-cli.js extension + Director and Unified Designer wiring. Lands the largest design-quality lever.
5. **Smoke tests + monitoring queries** — once data is flowing, build the weekly hue-diversity report.

Each step is independently testable and shippable.
