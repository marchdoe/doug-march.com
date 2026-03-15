# Designer Prompt Rewrite — Design Spec

**Date:** 2026-03-15
**Status:** Approved

---

## Overview

The Stage 2 designer prompt produces designs that are structurally identical day-to-day — same single-column centered layout, same narrow font palette, same muted earth tones. The signals produce rich, varied briefs, but the designer prompt anchors Claude to conservative execution.

This spec rewrites the system prompt and design brief framing in `prompt-builder.js` to unlock genuinely distinct designs every day. No templates, no theme system, no predefined font lists. The signals drive everything. The only constraint is the content contract.

---

## Root Causes

Five things anchor Claude to repetitive output:

1. **The prompt says "be bold" but shows conservative examples.** The only example is a color change ("blizzard → cold blues"). Claude has no model for what structural boldness looks like.

2. **Claude sees yesterday's code as a starting point.** The "Current File Contents" section shows the existing components. Claude instinctively edits the existing structure rather than reimagining it.

3. **Only 2 fonts are available.** The preset defines Space Mono and Instrument Serif. Claude doesn't know it can import any Google Font.

4. **No design dimensions are specified.** The prompt doesn't ask Claude to make deliberate choices about layout structure, reading direction, density, typographic scale, or element priority. It only implies color and mood.

5. **No minimum bar for design ambition.** The content contract ensures all data is present, but nothing prevents a single-column centered layout with tweaked colors from passing.

---

## What Changes

### `scripts/utils/prompt-builder.js` — System Prompt

Replace the current `SYSTEM_PROMPT` with a rewrite that:

#### Establishes the Designer Role

Claude is a designer receiving a brief from a PM. The brief tells Claude WHAT — Claude decides HOW. Every design should be a complete reimagination, not an edit of yesterday.

#### Frames Current Files as Reference, Not Starting Point

The current file contents are provided so Claude understands the component API, import paths, and technical constraints. They are NOT a template to tweak. Claude should design from a blank canvas every time, using the current files only to understand what's technically possible.

#### Unlocks Typography

Claude can use any Google Font. Fonts are loaded via the `links` array in `app/routes/__root.tsx`'s `head()` function — this is the existing mechanism (currently loading Space Mono and Instrument Serif). Claude should update this array with the Google Fonts URL for its chosen fonts, update the `preconnect` hints if needed (they're already present for `fonts.googleapis.com` and `fonts.gstatic.com`), and reference the font family in `elements/preset.ts` font tokens.

The prompt should explicitly state:

- You may use ANY font from Google Fonts
- Update the `links` array in `__root.tsx` `head()` to load your chosen fonts via the Google Fonts stylesheet URL
- Reference the font in your preset font tokens: `{ value: "'Font Name', fallback" }`
- You are not limited to the fonts currently in the preset — choose fonts that serve today's creative direction (serif, sans-serif, monospace, display, handwritten, anything)

#### Requires Design Dimension Decisions

For each redesign, Claude must make a deliberate choice across these dimensions. These are not templates — they are axes of variation. Each can take infinite values:

- **Layout structure** — How is content spatially organized? Single column, multi-column grid, asymmetric split, sidebar, radial, overlapping, stacked cards, masonry, full-bleed sections, or anything else.
- **Visual hierarchy** — What dominates the viewport when someone lands? The featured project, the name, a signal-driven element, negative space, a typographic statement?
- **Density** — How much content per screen? Dense and information-rich, or sparse and atmospheric? Does it feel like a newspaper or a gallery wall?
- **Typography scale** — What's the ratio between the largest and smallest text? Is there dramatic scale contrast or uniform sizing? Are headings huge or whispered?
- **Color approach** — Monochromatic, complementary, analogous, high-chroma, desaturated, dark-on-light, light-on-dark, colored backgrounds, gradients, or transparency?
- **Element character** — Are components sharp-edged or rounded? Bordered or borderless? Floating or grounded? Overlapping or separated? Do they cast shadows or sit flat?

Claude should describe its choices in the existing `rationale` field of the `submit_redesign` response (no schema changes needed).

#### Provides Examples of Structural Creativity

The prompt should include a section showing what "genuinely different" means — not as templates to copy, but as proof of what's possible:

- A layout where the nav is at the bottom and content reads bottom-to-top
- A layout where the featured project fills the entire viewport and you scroll past it to reach the work list
- A layout with a persistent left sidebar where identity and nav live permanently
- A layout where projects are arranged in a grid of cards at different sizes
- A layout where content is asymmetrically split — one large panel, one narrow panel
- A layout where generous whitespace pushes content to one corner of the screen
- A layout where signal-driven elements (a quote, a score, a weather reading) are spatially integrated with the portfolio content, not segregated in a separate section

These examples should make clear: the structure itself is a creative choice, not just the styling of a fixed structure.

#### Sets Accessibility Floors

Hard constraints that cannot be violated regardless of creative direction:

- **Contrast:** Body text must meet WCAG AA (4.5:1 ratio against its background). Large text (18px+ or 14px+ bold) must meet 3:1.
- **Font size:** No body text smaller than 14px. No interactive element text smaller than 12px.
- **Readability:** Line length should not exceed 75 characters for body text. Line height for body text should be at least 1.4.
- **Navigation:** All nav links must be keyboard-accessible and visually distinguishable.
- **Links:** All links must be visually distinguishable from surrounding text (via color, underline, or other treatment).

These are non-negotiable. Bold design and accessible design are not in conflict.

### `scripts/utils/prompt-builder.js` — User Prompt (buildUserPrompt)

#### Reframe "Current File Contents" Section

Change the heading and framing from:

> "Here are the current files. Redesign them as you see fit."

To:

> "Below are the current component files for technical reference. They show you the component API, import paths, and TypeScript interfaces you must preserve. Do NOT use these as a layout starting point — design from scratch. The structure, styling, and spatial organization should be entirely new."

#### Remove the Generic Design Prompt

The current "Design Prompt" section includes a generic example about blizzards. Remove it entirely. The PM brief (from Stage 1) now provides all the creative direction Claude needs. The system prompt provides the design dimensions and accessibility constraints.

#### Brief is Required

The Stage 1 PM brief is now a prerequisite for Stage 2. The raw-signals fallback path (`formatSignals`) is retained as defensive code, but the pipeline always runs Stage 1 before Stage 2. The new system prompt and design dimensions are written assuming the brief is present. If the fallback path fires (brief missing), the system prompt changes still apply — Claude gets the design dimensions and accessibility constraints regardless.

#### Prompt Length

The new system prompt will be longer than the current 36-line version. This is acceptable — the model used (claude-opus-4-6) has a 200K+ context window, and the system prompt plus all mutable file contents fit comfortably within it. Clarity and completeness are more important than brevity for this prompt.

---

## What Does NOT Change

- The content contract (what must be rendered) — unchanged
- The PM brief system (Stage 1 interpret) — unchanged
- The technical requirements (TypeScript, PandaCSS, import paths, route exports) — unchanged
- Signal providers, collection, or orchestration — unchanged
- The `submit_redesign` tool schema — unchanged
- Mutable files list — unchanged

---

## Non-Goals

- No template or archetype system — Claude designs from scratch
- No predefined font lists — Claude picks fonts per day
- No theme presets — colors emerge from the signals
- No memory of previous designs — signals provide sufficient variation
- No design scoring or validation — creative interpretation is the point
- No changes to Stage 1 (PM brief) — that spec was just completed
