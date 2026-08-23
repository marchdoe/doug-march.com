# Seed: poster

Three lanes anchor this archetype: Tesla / SpaceX (radical subtraction), Swiss International Style (grid rigor, zero ornament), and psychedelic gig-poster (maximalist ornament, saturated clash). The pipeline deterministically picks one per day by date hash — the lane below is the only one injected into this prompt.

<!-- LANE:tesla-spacex -->
**Lane: Tesla / SpaceX**

> Source: Tesla / SpaceX via VoltAgent/awesome-design-md (MIT). Paraphrased from public brand characteristics. Use as anchor reference, not copy target — borrow the rigor and reinterpret it through today's signals and brief.

## Atmosphere
One image, one idea, one viewport. Radical subtraction — nearly everything is removed until the single dominant element becomes inevitable. Mood is cinematic product photography: big, confident, monochrome, with rare chromatic punctuation.

## Color roles
- bg: #000000 or #FFFFFF — absolute, not "near-black"
- text: #FFFFFF on black / #171A20 on white — maximum contrast
- text.mid: #9DA3AE — secondary captions only
- accent: #E31937 (Tesla red) or #005288 (SpaceX blue) — used once per viewport, never as a fill
- border: rgba(255,255,255,0.08) — almost invisible; separation comes from whitespace, not lines

## Typography
- Display: "Gotham", "Inter" 700, scale ratio ~2.4 (huge jumps between levels)
- Body: "Inter" 400, 16px, line-height 1.55
- Mono: rarely used — if present, for serial numbers or timestamps only

## Component cues
- Buttons: uppercase, letter-spacing 0.12em, border only (no fill), ~14px, generous horizontal padding
- Cards: almost never used — prefer full-bleed media with text overlay
- Nav: minimal wordmark + uppercase links, often corner-anchored, shrinks on scroll

## Spatial rhythm
Whitespace is the design. Sections are full-viewport height; content is centered or pinned to one corner. Spacing scale is large-step (8, 24, 64, 128, 200). Tight internal rhythm around a single object; huge exterior silence around it.

## Anti-patterns specific to this style
- DO NOT render three projects side-by-side on the first viewport — one dominates
- DO NOT use more than one accent instance per viewport
- DO NOT use card grids, drop shadows, or rounded-corner containers
- DO NOT fill the page with body copy — captions only, set small
- DO NOT use more than two type sizes on the hero viewport

## Mobile strategy
Retains single dominant element on mobile — scale the hero via `clamp()`. Secondary info (nav, metadata, footer) stays anchored to the poster's bottom, not fighting the hero. If the hero needs to reflow (e.g. "DOUG / MARCH" instead of "DOUG MARCH"), the reflow should look intentional, not cramped.
<!-- /LANE -->

<!-- LANE:swiss-poster -->
**Lane: Swiss International Style**

> Source: International Typographic Style (Müller-Brockmann, Ruder, Hofmann lineage) — general historical movement characteristics, not a specific living brand or copyrighted work. Use as anchor reference, not copy target.

## Atmosphere
Grid-locked objectivity. A single strong diagonal or oversized numeral is the one permitted gesture; everything else obeys a strict modular grid. Sans-serif, asymmetric layout, flush-left ragged-right text, hard-cropped photography. Function over decoration — the opposite mood from the Tesla lane's soft cinematic void, but equally confident.

## Color roles
- bg: #FFFFFF — pure, no warmth
- text: #000000 — pure, no softening
- accent: #E30613 (signal red) — the only color besides black and white
- accent.secondary: #005EB8 (data blue) — reserve for chart/data marks only, never decorative
- border: #000000 — thin, precise hairline rules only, never rgba-softened

## Typography
- Display: a grotesk at 700, scale ratio ~1.618, set to a visible baseline grid
- Body: same grotesk family at 400, 16px, line-height 1.4, ragged right — never justified, never centered
- Mono: not used in this lane

## Component cues
- Buttons: none — links are bold black text with a red underline rule, no border, no fill
- Cards: none — content lives in grid cells separated by thin black rules
- Nav: a single horizontal rule; flush-left wordmark, flush-right minimal text links

## Spatial rhythm
Strict modular grid (6 or 12 columns), baseline grid governs all vertical rhythm. Margins are asymmetric — wide on one side, tight on the other — never centered. The one permitted "gesture" (a rotated numeral, a diagonal rule) breaks the grid deliberately and is the only place tension is allowed.

## Anti-patterns specific to this style
- DO NOT center anything — asymmetry is the grid's whole point
- DO NOT use a third color beyond black, white, and signal red
- DO NOT use gradients, drop shadows, or rounded corners anywhere
- DO NOT use a serif typeface
- DO NOT soften the grid with organic or freeform shapes

## Mobile strategy
The grid collapses to a single column but keeps its asymmetric margin (never re-centers to compensate for the lost columns). The one rotated/diagonal gesture element scales via `clamp()` but stays off-axis — it must never straighten out to fit.
<!-- /LANE -->

<!-- LANE:psychedelic-gig-poster -->
**Lane: Psychedelic Gig Poster**

> Source: 1960s Fillmore/Avalon gig-poster tradition (Wes Wilson, Victor Moscoso, Bonnie MacLean lineage) — general historical style characteristics, not a specific living brand or copyrighted work. Use as anchor reference, not copy target.

## Atmosphere
Maximalist ornament, hand-lettered energy, clashing complementary colors, warped and interlocking type, dense layered illustration. Loud, joyful, unapologetic collision of color and pattern — the deliberate opposite of the Tesla lane's subtraction and the Swiss lane's restraint.

## Color roles
- bg: one saturated field, no neutral — e.g. #FF2E9A (hot pink) or #FF6B00 (acid orange)
- text: a complementary clash color — e.g. #00FF85 (electric green) or #7B2FF7 (violet)
- accent: a third clashing hue, used in outline/glow treatments around shapes
- border: none — shapes overlap directly, no separating rules

## Typography
- Display: pushed to the chassis's largest available step, with extreme letter-spacing swings to simulate warped/bulging letterforms
- Body: kept small and genuinely legible — high contrast against the loud field so it survives the density
- Mono: not used in this lane

## Component cues
- Buttons: blob/pill shape with a thick hard-offset double outline (e.g. 4px offset in a third clashing color) — never a soft grey drop shadow
- Cards: none — illustration-first, text floats directly over art
- Nav: a small corner badge or stamp, not a bar

## Spatial rhythm
No grid — deliberately overlapping, layered, collaged. Type interlocks with illustrated shapes rather than sitting in a clean zone. Dense on the hero viewport, with exactly one reserved breathing gap so the composition doesn't collapse into pure noise.

## Anti-patterns specific to this style
- DO NOT use a neutral or grey background — one saturated hue only
- DO NOT align text to a strict grid — this lane is collage, not structure
- DO NOT use a soft grey drop shadow — hard offset outlines only
- DO NOT let body copy shrink below legible size chasing density
- DO NOT restrain more than one element (e.g. the CTA) — maximalism is the point everywhere else

## Mobile strategy
The collage simplifies to 2-3 layered elements instead of the desktop's full density — keep the boldest shape, the hero phrase, and one supporting mark; drop the rest rather than shrinking everything proportionally. A uniformly-shrunk collage reads as clutter, not energy.
<!-- /LANE -->

## This is one lane

This seed describes ONE strong execution of this archetype — the default
lane, not the only one. If today's signals and brief call for a radically
different take (different palette family, inverted ground, another emotional
register), take it: justify the deviation in your rationale and execute it
with the same precision this seed demands. The anti-patterns above still
apply; the specific colors, faces, and measurements do not bind you.
