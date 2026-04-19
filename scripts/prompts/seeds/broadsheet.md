# Seed: broadsheet — inspired by WIRED

> Source: WIRED via VoltAgent/awesome-design-md (MIT). Paraphrased from public brand characteristics. Use as anchor reference, not copy target — borrow the rigor and reinterpret it through today's signals and brief.

## Atmosphere
Paper-white density. Reads like an editorial front page: masthead on top, columnar body, pull quotes, deck lines, bylines. Confident serif voice. Ink-blue hyperlinks feel like underlined footnotes, not buttons. Information is the reward.

## Color roles
- bg: #F7F5F0 — warm paper, not pure white
- text: #111111 — ink black
- text.mid: #4A4A4A — deck / byline
- accent: #0B4FA3 — ink blue, used on links and rules
- border: #111111 at 0.15em — hairline rules between sections, like newspaper gutters
- bg.tint: #E8E2D4 — for pull-quotes and sidebars

## Typography
- Display: "Playfair Display" or "Libre Caslon Display" 900, scale ratio ~1.618 (golden)
- Body: "Source Serif 4" 400, 17px, line-height 1.55, max 68ch
- Mono: "IBM Plex Mono" — timestamps, captions

## Component cues
- Buttons: underlined text-link style (no pill), ink-blue
- Cards: no cards — use bordered columns and rule-separated sections
- Nav: masthead row with logo + date + nav as all-caps section labels ("WORK / LAB / ABOUT")

## Spatial rhythm
Dense multi-column grid (3–5 columns). Gutters narrow (16–20px). Generous leading inside each column. Vertical rhythm anchored to a baseline grid. Hierarchy comes from scale contrast and rule weight, not whitespace.

## Anti-patterns specific to this style
- DO NOT center body paragraphs
- DO NOT use sans-serif for body — serif is the voice
- DO NOT use drop shadows, rounded cards, or pill buttons
- DO NOT render a single-column hero — the front page is columnar from first pixel
- DO NOT use pure #FFFFFF or #000000 — warm paper and ink black only

## Mobile strategy

Masthead stacks vertically on mobile: logo → name (Playfair, smaller) → nav as a pill row → date. Columns collapse to a single column with section dividers styled like masthead rules (full-width horizontal lines, not gutters). Datelines and kickers stay visible; they define the archetype.
