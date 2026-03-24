# Signal-to-Design Mapping — Design Spec

**Date:** 2026-03-14
**Status:** Approved

---

## Overview

Defines how collected signals flow through the two-stage creative process to produce a daily redesign. Stage 1 (interpret) acts as a **Product Manager** — reading raw signals and writing a structured creative brief with requirements. Stage 2 (design) acts as a **Designer** — receiving the brief and making all visual/creative decisions.

The current interpret step dumps JSON and asks for generic "feel tags." This spec replaces that with a structured brief system built on a signal hierarchy and design-dimension mapping.

---

## Signal Hierarchy

### PRIMARY — Set the Foundation (Color Palette + Layout Energy)

| Signal | Design Dimension | Example Influence |
|--------|-----------------|-------------------|
| Weather | Color palette temperature | Blizzard → icy/stark palette; sunny 75°F → warm/golden |
| Season | Color palette richness/saturation | Spring → fresh greens; winter → desaturated/stark |
| Day of week | Layout energy and density | Weekend → spacious/relaxed; weekday → structured/dense |
| Daylight hours | Light/dark balance | Short winter days → heavier darks; long summer days → airy/light |

PRIMARY signals are always present (derived, never fail). They establish the visual foundation that everything else layers onto.

### SECONDARY — Add Editorial Elements + Flavor

| Signal | Design Dimension | Example Influence |
|--------|-----------------|-------------------|
| Sports results | Editorial elements with POV | Tigers win → celebratory badge; loss → dismissive callout with team logo |
| Golf leaderboard | Editorial element if notable | Masters Sunday → leaderboard feature element |
| Holidays | Thematic accents + elements | St. Patrick's Day → green accents, shamrock element |
| Market direction | Subtle mood modifier | Down day → slightly heavier/compressed feel |
| News headlines | Possible editorial element | Major event → acknowledgment element |

SECONDARY signals add editorial commentary layered on top of the PRIMARY foundation. They have a point of view — they express an opinion, not just data.

### ACCENT — Texture and Personality (Never Dominate)

| Signal | Design Dimension | Example Influence |
|--------|-----------------|-------------------|
| Music bands | Typography/personality hints | Radiohead → angular/precise; GBV → lo-fi/rough |
| Lunar phase | Atmospheric subtlety | Full moon → more contrast/drama; new moon → minimal |
| Quote | Potential anchor — can elevate if thematically resonant | A chaos quote on a chaotic signal day → feature prominently |
| GitHub trending | Tech texture hints | AI repos trending → code-aesthetic elements |
| Hacker News | Cultural temperature | Interesting HN day → tech-forward personality |
| Books | Personality hint | Currently reading sci-fi → futuristic touches |
| Air quality | Environmental overlay | Poor AQI → hazy/muted treatment |

ACCENT signals add texture and personality. They should be felt, not seen — subtle influences that make each design unique without dominating.

---

## Conflict Resolution: Tension is the Feature

When signals conflict (e.g., beautiful spring day + losing sports team + market down), the system does NOT resolve the conflict by picking a winner. Instead, **tension between signals becomes a design feature**.

Examples:
- Warm spring Saturday + Tigers loss → warm, optimistic palette BUT with a dismissive editorial element about the loss. The contrast IS the design.
- Sunny day + market crash → bright, airy layout BUT with compressed, anxious typography for market-related elements.
- Holiday approaching + bad weather → festive accents layered over a cold, heavy palette.

The PM brief (Stage 1) should explicitly call out tensions and instruct the designer to hold them rather than resolve them.

---

## Stage 1: The PM Brief (interpret-signals.js)

### Input
Raw signal data from `signals/today.yml` (all 17 providers).

### Output
A structured creative brief written to `signals/today.brief.md` with these sections:

```markdown
## Palette Direction
[1-2 sentences on color temperature, saturation, mood — derived from PRIMARY signals (weather, season, daylight). Never prescribes specific colors — describes the feeling.]

## Layout Energy
[1-2 sentences on density, spacing, rhythm, visual weight — derived from day of week, season, daylight hours. Weekend = relaxed/spacious, weekday = structured/tight.]

## Tension
[1-2 sentences identifying contradictions between signals. What conflicts exist? Instruct the designer to hold the tension, not resolve it. If no tension exists, say so — some days are harmonious.]

## Required Elements
[Bulleted list of editorial design elements the designer MUST include. Each has a signal source, an editorial direction, and a tone. These are requirements, not suggestions.]

Format:
- [element description]: [editorial direction + tone] (source: [signal name])

Examples:
- Tigers loss badge: dismissive, incorporate team identity — thumbs down energy (source: sports)
- St. Patrick's Day accent: subtle, 3 days away — a nod not a takeover (source: holidays)
- Market dip indicator: understated, woven into layout — background anxiety (source: market)

Only include elements for signals that have something worth commenting on. A team being "off season" is not worth an element. A team winning or losing IS.

## Accent Notes
[Bulleted list of subtle influences from ACCENT signals. These are suggestions, not requirements. The designer can use or ignore them.]

Format:
- [signal]: [how it might subtly influence texture, typography, or personality]

Examples:
- music (Radiohead, Wet Leg): angular typography, slight punk energy
- lunar (waning crescent, 10%): minimal, stripped-back atmosphere
- quote ("I can think of nothing less pleasurable..."): if it resonates with the overall direction, feature it — otherwise let it recede

## Anchor Signal
[One sentence naming the single signal that should be FELT most strongly when someone lands on the site. This is the PM's call — what's the headline of today's design?]

Example: "Spring Saturday dominates — this is fundamentally an optimistic, unhurried day with some sports disappointment woven in."
```

### Prompt Design

The interpret prompt must instruct Claude to:
1. Read all signals and understand the hierarchy (PRIMARY → SECONDARY → ACCENT)
2. Start with PRIMARY signals to establish palette and layout direction
3. Look for tensions between signal categories
4. Decide which SECONDARY signals deserve editorial elements (not all of them every day)
5. Note which ACCENT signals might add interesting texture
6. Name the anchor signal — the one that should dominate the visitor's first impression
7. Output the structured brief in the exact format above

The prompt should include the hierarchy definitions and examples so Claude understands the PM role.

---

## Stage 2: The Designer (daily-redesign.js / prompt-builder.js)

### Input
The PM brief from `signals/today.brief.md`, plus all mutable site files.

### How the Designer Uses the Brief

The design prompt (in `prompt-builder.js`) should present the brief as a creative director's requirements:

- **Palette Direction** → drives `elements/preset.ts` color tokens (semantic colors, backgrounds, accents)
- **Layout Energy** → drives component spacing, grid structure, density in Layout.tsx and route files
- **Tension** → the designer should make the tension visible in the design, not paper over it
- **Required Elements** → the designer MUST include these. They can decide placement, style, and visual treatment, but each required element must appear somewhere on the site
- **Accent Notes** → optional texture influences the designer can draw from
- **Anchor Signal** → the overall vibe check — when someone lands, THIS is what they should feel

The designer has full creative freedom over HOW to execute. The PM brief says WHAT, the designer decides HOW.

---

## What Changes

### `scripts/interpret-signals.js`
- Replace the current `buildInterpretPrompt()` function with a new prompt that:
  - Includes the full signal hierarchy (PRIMARY/SECONDARY/ACCENT) with descriptions
  - Instructs Claude to output the structured brief format (Palette Direction, Layout Energy, Tension, Required Elements, Accent Notes, Anchor Signal)
  - Includes examples of good briefs for different signal combinations
  - Emphasizes the PM role: opinionated requirements, not vague mood boards

### `scripts/utils/prompt-builder.js`
- Update `buildUserPrompt()` to present the brief as structured creative requirements
- The `## Creative Brief` section should frame each brief section as a design requirement
- Add context about what each section means for the designer's output

### No other files change
- The orchestrator, providers, pipeline script, dev panel, and GitHub Actions are unchanged
- The content contract is unchanged — the PM brief adds requirements on top, never removes them

---

## Non-Goals

- No changes to signal providers or data collection
- No changes to mutable file list or content contract
- No automated validation of brief-to-design compliance (Claude's creative interpretation is the point)
- No signal weighting UI in the dev panel (future enhancement)
- No brief editing UI (use YAML mood_override/notes for manual influence)
