# Seed: broadsheet

Two lanes anchor this archetype: WIRED (paper-white columnar density) and The Economist (data-driven editorial confidence). The pipeline deterministically picks one per day by date hash — the lane below is the only one injected into this prompt.

<!-- LANE:wired -->
**Lane: WIRED**

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
<!-- /LANE -->

<!-- LANE:economist -->
**Lane: The Economist**

> Source: The Economist — general publicly-known brand characteristics (red masthead, data-forward analysis), not a specific copyrighted layout. Use as anchor reference, not copy target.

## Atmosphere
Data-driven editorial confidence. A red masthead bar, confident charts embedded directly in the text flow, dense but airy through typographic rhythm rather than whitespace. Reads as authoritative analysis, not just news — the opposite emphasis from the WIRED lane's narrative-serif warmth.

## Color roles
- bg: #FFFFFF
- masthead bar: #E3120B (signal red) — used once at the very top, never repeated as decoration elsewhere
- text: #1A1A1A
- text.mid: #595959
- accent (primary chart series): #E3120B
- accent.secondary (secondary chart series): #006BA6
- border: #D8D8D8 — hairline rules

## Typography
- Display: a confident serif or slab at 700, scale ratio 1.414 — headlines stay short and declarative, never longer than one line at full display scale
- Body: 400, 16px, line-height 1.5, justified with hyphenation in the main column only
- Mono: for chart axis labels and data callouts only

## Component cues
- Buttons: text-link with a thin red underline, no fill, no pill
- Cards: bordered 1px hairline with a red kicker label at the top-left corner ("BRIEFING", "ANALYSIS")
- Nav: red bar with white wordmark; section links sit below in a thin grey rule row

## Spatial rhythm
Dense multi-column (3–4), with at least one embedded chart or data-visualization module breaking the column flow per major section. Generous line-height compensates for column density instead of wide margins.

## Anti-patterns specific to this style
- DO NOT use the red anywhere except the masthead bar, kickers, and primary chart series — it must stay rare to read as authoritative, not decorative
- DO NOT use drop shadows or rounded cards
- DO NOT skip a chart or data-visualization element — this lane's identity depends on including at least one
- DO NOT set a headline longer than one line at display scale

## Mobile strategy
The masthead bar stays full-width and fixed at the top. Columns collapse to one. Charts scale down but keep their axis labels legible — never crop a chart's labels to force it to fit.
<!-- /LANE -->

## This is one lane

This seed describes ONE strong execution of this archetype — the default
lane, not the only one. If today's signals and brief call for a radically
different take (different palette family, inverted ground, another emotional
register), take it: justify the deviation in your rationale and execute it
with the same precision this seed demands. The anti-patterns above still
apply; the specific colors, faces, and measurements do not bind you.
