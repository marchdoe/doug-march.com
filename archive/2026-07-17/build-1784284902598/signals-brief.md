# Signals Brief — 2026-07-17

## Hero Copy
IT'S YOUR RESPONSIBILITY THAT YOU'RE HAPPY

## Hero Rationale
This is the punch line of today's Naval Ravikant quote — "Every second you have on this planet is very precious and it's your responsibility that you're happy." Stripped to its imperative, "IT'S YOUR RESPONSIBILITY THAT YOU'RE HAPPY" is a screenshot-worthy manifesto that lands hard on a 14.4-hour summer Friday. For a portfolio that tears itself down and rebuilds every morning by choice, self-authored joy is the whole thesis — the site owns its own state daily, exactly as the line demands.

## Archetype
Specimen

## Chassis
big-shoulders-atkinson

## Visual Specification
### 1. Color Specification
- **Primary hue** — 150° emerald green. It's the one open corridor in the mandate (135°–164°) and it's exactly right: high-summer growth, 14.4 hours of daylight, the color of a thing that is alive and chose to be. Not a constraint — the honest color for a happiness manifesto.
- **Neutral palette (sage, green-tinted)** — 50 `#F5F8F5`, 100 `#E8EEE9`, 200 `#CFDAD1`, 300 `#ADBCAF`, 400 `#829387`, 500 `#5E6F62`, 600 `#47564B`, 700 `#354039`, 800 `#232B26`, 900 `#141814`
- **Accent color (lime-emerald pop)** — light `#4FD79C`, default `#3FE39B`, dark `#10A366`, glow `rgba(63,227,155,0.35)`
- **Secondary accent** — none. One green carries the page.
- **Background** — page bg `#07724A` (drenched deep emerald), card bg `#0A6444`, sidebar/caption band bg `#064A32`
- **Text colors** — primary text `#F2FBF5` (sun-cream), secondary text `#B9E6CE`, muted text `#7FBF9E` (large/decorative only)

### 2. Typography
- **Hero phrase rendering** — Big Shoulders Display, all caps, stacked in four ragged-left lines: `IT'S YOUR` / `RESPONSIBILITY` / `THAT YOU'RE` / `HAPPY`. The final word **HAPPY** flips to accent `#3FE39B`. Rendered via `display` token at `clamp(72px, 12vw, 168px)`, filling ≥72% of both width and height. Atkinson Hyperlegible carries the caption band and attribution.
- **Line heights** — hero `0.88`, body `1.6` (light-on-dark compensation), caption `1.5`
- **Letter spacings** — hero `-0.02em`, body `0.01em`, smallcaps labels `0.12em`

### 3. Layout Specification
- **Archetype** — Specimen. The phrase IS the design: it presses against the emerald field on both axes, everything else demoted to a slim caption band. A manifesto this declarative wants type at poster scale with nothing competing.
- **CSS grid/flex structure** — `display: grid; grid-template-rows: 1fr auto; min-height: 100vh`. Hero occupies row 1 as a flex column, `justify-content: center; align-items: flex-start`. Caption band is row 2.
- **Major dimensions**:
  - Hero area: `min-height: 82vh`
  - Caption band: full-width, `min-height: 120px`
  - Max content width: `max-width: none`; side padding `clamp(32px, 6vw, 112px)`
  - Section padding: hero `96px 6vw 48px`; caption band `24px 6vw`
- **Nav placement** — inline within the hero: three caps links (`WORK`, `ABOUT`, `EXPERIMENTS`) riding the very bottom-left of the hero field just above the caption band, `letter-spacing: 0.12em`, sage-cream. Brand lockup top-left corner.
- **Hero phrase grid zone** — rows 1–3 conceptually, columns 1–11 of a 12-col field; occupies roughly `88vw × 62vh` centered-left.

### 4. Component Character
- **Border radius** — cards `4px`, buttons `2px`, tags `2px` (crisp signage, not soft)
- **Border treatment** — near-borderless; hairline `1px solid` in `sage.700`/emerald-dark only to divide the caption band from the hero.
- **Shadow** — none. Depth comes from the surface-lightness step (bg → card → band), signage-flat.
- **Density** — spacious hero, compact caption band.
- **Interactive states** — links: on `_hover` underline offset 4px in accent `#3FE39B`; the word HAPPY subtly brightens accent light on hover if interactive.

### 5. Signal Integration
- **Where signal elements live** — a full-width caption band at the page foot (row 2), reading like the specimen sheet caption under a type poster.
- **How sports scores are styled** — The Open leaderboard rendered as tabular caption: `Lucas Herbert −6` set in accent `#3FE39B` (the leader), followed by Suber −5, Wallace −4 in sage-cream, `font-variant-numeric: tabular-nums`, smallcaps label "THE OPEN · IN PROGRESS".
- **How the quote is displayed** — the quote fragment IS the hero. The full Naval line + attribution ("Naval Ravikant") sits as a single quiet line in the caption band, `#B9E6CE`, small caps attribution.
- **Holiday elements** — none today.
- **Other signals** — waxing crescent (12.6% illum) as a small caption chip "◗ waxing crescent 13%"; music trio (War on Drugs · My Morning Jacket · Radiohead) as a caption item; build/season stamp in the band.

## Self-Check
1. Hero quotability: Yes — "IT'S YOUR RESPONSIBILITY THAT YOU'RE HAPPY" is a standalone imperative, quotable stripped of all context.
2. Because-of chain: Yes — imperative manifesto → Specimen (type is the whole page) → Big Shoulders (condensed signage stacks it at 168px) → drenched emerald (summer/alive/growth) → caption-band demotion of all signals.
3. Render feasibility: Yes — condensed Big Shoulders sets "RESPONSIBILITY" (14 chars) within 88vw at clamp max 168px without overflow on 1440×900.
4. Canvas floor feasible: Yes — four stacked marquee lines plus caption band genuinely fill ≥72% of a 1440×900 viewport.

## Rationale
The day handed me Naval Ravikant's line, and its imperative tail — "it's your responsibility that you're happy" — is the whole design. It's quotable stripped of context, and it rhymes exactly with what this site does: a portfolio that demolishes and rebuilds itself every morning is a machine for owning its own state. On a 14.4-hour July Friday, that self-authored joy wants to be loud, so the phrase earns marquee scale over everything else.

A manifesto this declarative can only be a Specimen: the type IS the page, pressed against the field on both axes, with every signal demoted to a caption strip below. Big Shoulders Display (big-shoulders-atkinson, 1.618 ratio, the strongest marquee in the catalog and unused recently) stacks the four short caps lines — the 14-character "RESPONSIBILITY" holding within 88vw at 168px without tipping into parody — while Atkinson Hyperlegible keeps the caption band's leaderboard and attribution crisp. Specimen last appeared five days ago; the execution here diverges hard from that moonless-violet run in both palette and register.

The color mandate left only the 135°–164° corridor clean, and 150° emerald is exactly right rather than a constraint — high-summer growth, the color of a living thing that chose to be alive. I drenched the canvas in deep emerald (coverage ≥65%) with sun-cream type, letting a single lime-emerald pop light only the final word HAPPY and the golf leader Herbert at −6. One accent, fully committed, no hedging neutrals. The shell moves are all fresh against the mandate: nav lives inline in the hero's bottom-left (not the recent rail/pills/spine/top-bar), the footer is a specimen-caption band (not folded-into-nav, stamp, colophon, or data strip), and a horizontal-sm mono lockup inherits cream via currentColor to sit cleanly on the green.
