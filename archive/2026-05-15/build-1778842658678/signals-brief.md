# Signals Brief — 2026-05-15

## Hero Copy
STOP WATCHING YOURSELF LIVE.

## Hero Rationale
The Chamfort signal quote yields its most poster-worthy fragment: five words, a period, a command. The resonances today are structural, not decorative — the HN story with 886 points is literally someone removing surveillance hardware from their car; the new moon makes tonight entirely unwatched; the Tigers dropped another game in the dark. For a site that rebuilds itself daily by reading environmental signals, the phrase is also a wink at the mechanism: the design is produced by watching signals, and the visitor is instructed to stop watching themselves. It earns marquee scale because it works simultaneously as Chamfort aphorism, portfolio manifesto, and dry comedy.

## Archetype
Gallery Wall

## Chassis
big-shoulders-atkinson

## Visual Specification
### 1. Color Specification
- **Primary hue** — H:292° (violet-purple); both mandated (sole permitted window is 278°–315°) and semantically exact — the chromatic register of surveillance equipment, signal interference, and absolute night
- **Neutral palette** — all tinted toward H:290° so even the void participates:
  - 50: #F3F0F8
  - 100: #E5DEEF
  - 200: #C4B8D8
  - 300: #A294BC
  - 400: #80709E
  - 500: #5F4F7E
  - 600: #443662
  - 700: #2D2046
  - 800: #1A102E
  - 900: #0C0716
- **Accent color** — Light: #C39BFF | Default: #A668F5 | Dark: #7030C4 | Glow: `0 0 24px rgba(166, 104, 245, 0.40)`
- **Secondary accent** — None; one chromatic event on the page
- **Background** — Page bg: #0C0716 (deep night-violet black) | Card bg: #1A102E | Subtle surface: #2D2046
- **Text colors** — Primary text: #F3F0F8 | Secondary text: #A294BC | Muted text: #5F4F7E

### 2. Typography (chassis-derived)
- **Hero phrase rendering** — Big Shoulders Display `display` token; three-line layout: "STOP WATCHING" / "YOURSELF" / "LIVE." at `clamp(68px, 9.5vw, 152px)`; left-aligned, no centering; "STOP WATCHING" and "LIVE." in #F3F0F8 (near-white); "YOURSELF" in #A668F5 (vivid violet) — the self-reflexive word is the surveilled one, so it receives the accent; Chamfort attribution beneath in Atkinson Hyperlegible 13px tracked wide, muted
- **Line heights** — Hero: 0.88 (tight stacking for condensed letterforms at display scale); Signal subheadings: 1.1; Body/signal text: 1.55; Compact signal rows: 1.2
- **Letter spacings** — Hero: −0.02em (condensed display at this scale needs tighter tracking); Eyebrow all-caps labels: 0.10em; Body text: 0em; Tabular signal data: 0.02em

### 3. Layout Specification
- **Archetype** — Gallery Wall: the scattered signal blocks (PGA leaderboard, new moon, HN surveillance story, Tigers score, music) are arranged across the canvas as asymmetric witnesses — the world's watching apparatus — while the dominant block carries the command that cancels it all
- **CSS grid/flex structure** — `display: grid; grid-template-columns: repeat(12, 1fr); gap: 3vw; padding: 4vw; padding-top: calc(4vw + 52px)`
- **Major dimensions**:
  - Hero block: min-height 68vh; cols 1–8; phrase left-aligned within block
  - Right signal column: cols 9–12 (~30% of canvas); stacked blocks — PGA ~38vh top, Moon ~18vh bottom
  - Full-width HN band: rows 6; spans all 12 cols; height ~96px
  - Bottom row: Tigers block cols 1–5; Music block cols 6–9; Project pill cols 10–12
  - Max content width: `max-width: none` — full canvas, 4vw side padding only, never a centered container
  - Block internal padding: 5vw (hero), 3vw (signal blocks)
- **Nav placement** — Fixed top strip, full 100vw, height 52px; `position: fixed; top: 0; z-index: 100; background: #0C0716; border-bottom: 1px solid #2D2046`; site name left in Atkinson Hyperlegible 13px tracked wide; nav links right in same treatment; accent dot separator; scrolls no — stays fixed
- **Hero phrase grid zone** — Rows 1–5 (top 68vh of canvas), columns 1–8; the phrase fills this block left-anchored at 4vw from block edge; no centering; three lines of condensed display type; Chamfort attribution 32px below "LIVE." in Atkinson 13px muted

### 4. Component Character
- **Border radius** — Cards: 2px; Buttons: 2px; Tags: 2px; nothing rounds — every edge is hard, every container is a frame
- **Border treatment** — Signal blocks: 1px solid #2D2046 (barely-there); accent-activated blocks (when hover): 1px solid #A668F5; hero block: no border, no edge
- **Shadow** — None; depth hierarchy via surface lightness steps only: #0C0716 → #1A102E → #2D2046
- **Density** — Hero zone: open, large negative space around phrase; signal blocks: compact, tight rows, dense data
- **Interactive states** — Hover on signal blocks: accent border appears + subtle background lift to #2D2046; nav links: opacity 0.7 default → 1.0 hover with accent underline; project links: underline in #A668F5

### 5. Signal Integration
- **Where signal elements live** — Right column (cols 9–12): PGA Championship block top, New Moon block bottom; Full-width row below hero fold: HN story band; Bottom row: Tigers left, Music center, Project right
- **PGA Championship** — Eyebrow "PGA CHAMPIONSHIP" in #A668F5 at 11px tracked 0.10em; five leaders all at -3 listed in tight Atkinson rows; "Martin Kaymer" bold near-white, four others in secondary neutral; score column in tabular nums; note "5-way tie" in muted italic
- **New Moon** — Right column below PGA; large CSS circle `width: 72px; height: 72px; border-radius: 9999px; background: #0C0716; border: 2px solid #2D2046` next to "NEW MOON" in small-caps 11px tracked wide; "0.3% ILLUMINATED" in muted text; "NIGHT 29 OF CYCLE" below
- **HN story (surveillance)** — Full-width band, height 80px, background #1A102E, 1px accent border top and bottom; "886 →" in accent #A668F5 bold; "REMOVING THE MODEM AND GPS FROM MY 2024 RAV4" in near-white medium; this story earns a named slot because it is the day's thematic double for the hero phrase
- **Quote treatment** — The quote IS the hero phrase; Chamfort attribution appears 32px below "LIVE." in Atkinson Hyperlegible 13px, tracked 0.08em, color #5F4F7E: "— NICOLAS CHAMFORT"
- **Tigers 4–9** — Bottom-left block; "TIGERS" eyebrow muted 10px; score "4–9" in Big Shoulders Display ~52px secondary neutral #A294BC; "L" badge 1px border; "MAY 14" in muted; no drama — filed, not mourned

## Self-Check
1. Hero quotability: Yes — "STOP WATCHING YOURSELF LIVE." is Chamfort compressed to command form; works as film-poster text, portfolio manifesto, and day-specific commentary on surveillance removal; would be screenshotted without the site around it.
2. Because-of chain: Yes — command phrase → Gallery Wall (scattered signal witnesses arranged around the thing that cancels watching) → Big Shoulders Display (warning-sign/public-notice condensed register, a command reads like signage) → H:292° violet-purple (CCTV-screen and night-vision frequency, the color of watching in the dark) → hard-edged blocks with no rounding and no shadow (surveillance-grid aesthetic, nothing soft).
3. Render feasibility: Yes — Big Shoulders Display at clamp(68px, 9.5vw, 152px) across 8 of 12 columns (~67% canvas width) renders three lines ("STOP WATCHING" / "YOURSELF" / "LIVE.") well within 68vh hero zone on 1440×900 without overflow.

## Rationale
The hero phrase arrived from Chamfort's signal quote, compressed to its most poster-worthy five words. "Stop watching ourselves live" is the original; "STOP WATCHING YOURSELF LIVE." is the command form — direct address, second person, period as full stop against the noise. Three signals converge to make it inevitable: the HN top story (886 points) is literally a developer removing surveillance hardware from their car; the new moon provides zero illumination, a night with no witness; the Tigers lost quietly in the dark. For a site that auto-redesigns itself by reading environmental signals, the phrase is also a structural wink — the mechanism IS watching, and the visitor is instructed to stop.

Gallery Wall is the archetype because it creates a meta-reading unavailable to Poster or Specimen: the scattered signal blocks (PGA leaderboard, new moon, HN story, Tigers, Radiohead) become the surveillance apparatus arrayed around the dominant block that cancels them. They are the watchers. The hero command is the override. That conceptual argument — which you can only have if the signal fragments are present on the same canvas as the command — ruled out isolating archetypes. Big Shoulders Display is the mandatory chassis: this typeface is condensed signage, it is warning labels and public notices, it is the letter-form register of something posted on a wall telling you what not to do. At clamp(68px, 9.5vw, 152px) across eight columns it reads at public-declaration scale without tipping into parody.

H:292° violet-purple is the only honest palette choice, and it was both constrained and conceptually exact. The color mandate's sole permitted window (278°–315°) happens to be the precise frequency of CCTV monitors, night-vision camera glow, and the paranoid ambient light of surveillance infrastructure. The hue didn't need to be forced into concept — it arrived there already. The near-black ground (#0C0716, tinted toward H:290° so it participates in the palette rather than sitting as anonymous void) creates the atmosphere of watching-in-the-dark that the phrase then commands you to abandon. "YOURSELF" landing in #A668F5 accent-violet makes the self-reflexive word the one that's lit and marked — the surveilled subject of the command is the exact word that receives the color.
