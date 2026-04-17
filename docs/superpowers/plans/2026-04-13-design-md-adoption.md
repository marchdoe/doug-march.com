# Proposal: Adopt the DESIGN.md schema to improve daily design output

**Date:** 2026-04-13
**Status:** Approved — decisions resolved 2026-04-13; see implementation plan in `2026-04-13-designer-quality-plan.md`
**Source:** [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) (66 curated DESIGN.md files inspired by [Google Stitch's DESIGN.md format](https://stitch.withgoogle.com/docs/design-md/format/))

## Problem

Pipeline reliability is solid; design *quality* is the remaining gap. The single-designer pivot fixed compositional incoherence, but `unified-designer.md` still emits tokens freeform, with no enforced schema, no negative constraints, and no proven reference frame to anchor against. Outputs read as "AI-generated" — generic palettes, missing component states, no anti-patterns.

## What the repo offers (what I actually found)

The repo is a curated index of **66 DESIGN.md files** extracted from real brands (Linear, Vercel, Stripe, Apple, Tesla, NYT/WIRED, Spotify, Ferrari, etc.). Every file conforms to a fixed 9-section schema (per the README's "What's Inside" table):

| # | Section | What it captures |
|---|---------|-----------------|
| 1 | Visual Theme & Atmosphere | Mood, density, design philosophy |
| 2 | Color Palette & Roles | Semantic name + hex + functional role |
| 3 | Typography Rules | Font families, full hierarchy table |
| 4 | Component Stylings | Buttons, cards, inputs, navigation **with states** |
| 5 | Layout Principles | Spacing scale, grid, whitespace philosophy |
| 6 | Depth & Elevation | Shadow system, surface hierarchy |
| 7 | **Do's and Don'ts** | Design guardrails and anti-patterns |
| 8 | Responsive Behavior | Breakpoints, touch targets, collapsing strategy |
| 9 | Agent Prompt Guide | Quick color reference, ready-to-use prompts |

Each entry also ships a `preview.html` + `preview-dark.html` — a swatch/type/button catalog rendered straight from the tokens.

## Proposed changes

### 1. Make DESIGN.md the designer's output contract (highest leverage)

Rewrite `scripts/prompts/unified-designer.md` so the model **emits a DESIGN.md** in the 9-section schema above, instead of free-form tokens. The engineer/component prompts then *consume* that file.

- **Why it helps:** rigid schema forces the designer to specify everything (states, anti-patterns, elevation) instead of skipping sections silently. This is the same fix the single-designer pivot was reaching for, but at the *output* layer rather than the *agent count* layer.
- **Where it lands:** `archive/<date>/build-*/DESIGN.md` alongside `preset.ts`. `design-system-reference.md` becomes the schema doc; `library-color/typography/layout/components` become section-level checklists rather than separate generators.

### 2. Use the 66 existing files as style seeds (chaos token mode)

Vendor a handful of the repo's DESIGN.md files into `scripts/prompts/seeds/` and let the daily pipeline pick one (or remix two) as an *anchor reference* the designer reinterprets through that day's signals.

- **Why it helps:** the "designs need work" smell is partly that the designer starts from a blank page every day. Anchoring to a known-good system (Linear's precision, Stripe's gradient elegance, Tesla's subtraction, WIRED's broadsheet density) gives the model a strong prior to *deviate from* rather than invent ex nihilo. Signals still drive the daily variation — the seed sets the floor.
- **Fits the existing chaos-token mode** noted in `project-production-todos.md`.
- **Licensing:** repo is MIT; tokens are publicly visible CSS values per their own framing. Safe to vendor with attribution.

### 3. Borrow the "Do's and Don'ts" section as the highest-leverage single addition

Even if we adopt nothing else from the schema, adding a mandatory **anti-patterns** block to the designer prompt is the cheapest quality win available. Negative constraints are what most LLM design output lacks and what produces the generic "AI-designed" feel.

- **Implementation:** require the designer to emit 5–8 don'ts per build, scoped to that day's archetype. The component/engineer prompts treat them as hard constraints.

### 4. Generate a `preview.html` QA artifact per build

Mirror the repo's `preview.html` + `preview-dark.html` pattern. Auto-render a single page showing every token in use: color swatches with role labels, the full type scale, every button/card/input variant, elevation samples.

- **Why it helps:** today, broken token systems only surface when someone opens the live page. A preview catalog is a cheap visual smoke test that catches missing variants, contrast failures, and broken type scales *before* publish. Lives at `archive/<date>/build-*/preview.html`.
- **Bonus:** doubles as a portfolio artifact — a clean per-day design system snapshot.

## Sequencing

1. **Quick win first:** add the Do's/Don'ts block to `unified-designer.md` (small prompt edit, immediate quality lift).
2. **Then schema migration:** rewrite the designer to emit DESIGN.md; update the engineer prompt to consume it.
3. **Then seeds:** vendor 8–12 DESIGN.md files into `scripts/prompts/seeds/`, wire seed selection into `daily-redesign.js`.
4. **Then preview.html generator:** new step in the pipeline after `generate-redesign.js`.

## What I'm not proposing

- Replacing the single-designer architecture — this proposal *strengthens* it, doesn't undo it.
- Vendoring all 66 files — overkill; pick ~10 that span the stylistic range.
- Building our own DESIGN.md tooling — the format is just markdown, no parser needed.

## Resolved decisions (2026-04-13)

- **Seeds: deterministic per archetype.** Random seeds risk producing dissonant pairings (golf-brand day with a Tesla seed). Map archetype → seed family; revisit "remix two" later if outputs get stale.
- **`preview.html`: published publicly** at `/archive/<date>/preview`. It's a portfolio artifact, not internal QA.
- **Ship item #3 unbundled and first.** A 10-line prompt edit shouldn't wait weeks for a schema migration. The Do's/Don'ts addition also de-risks the larger work by validating that anti-patterns improve output before we bet bigger.

## Section 10 — Accessibility & Contrast (extension to upstream schema)

The upstream Stitch DESIGN.md format and the awesome-design-md README are silent on accessibility — no WCAG, no contrast ratios, no minimum font sizes, no focus states beyond what falls into "component states." This is a real gap. We extend the schema with a mandatory tenth section:

| Field | Requirement |
|------|-------------|
| Contrast pairs | Every text/background combo from the palette resolved to a numeric ratio. WCAG AA: ≥4.5:1 body, ≥3:1 large text/UI components |
| Minimum font sizes | Floor for body (≥16px), captions (≥12px), interactive labels |
| Touch targets | ≥44×44px for any tappable element |
| Focus states | Visible focus spec for every interactive component (folds into Section 4 specs) |
| Reduced motion | `prefers-reduced-motion` fallback for any animation declared in the system |

This makes our pipeline's output strictly stronger than upstream.

## Constraint carried into implementation

**Hold time-to-design and token cost roughly flat.** No new LLM passes. Schema/seed/a11y additions must displace existing freeform output, not stack on top of it. `preview.html` runs deterministically from `preset.ts` — zero LLM cost.
