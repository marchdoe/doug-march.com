# Signals Brief — 2026-05-27

## Hero Copy
the melancholy of slaying monsters

## Hero Rationale
Hacker News surfaced "The Melancholy of Slaying Monsters" (MIT Press Reader, score 115 — the day's highest) on a Wednesday in late spring when every team in the sports signals is either losing or idle. The Tigers dropped 6–10 last night; the golf leaderboard shows no leaders yet; the GitHub feed contains "stop-slop" and an AI-fatigue essay. The phrase is not a motivational line — it's a phenomenological one. It describes the specific emptiness after you've done the hard thing. For a portfolio site, that's not incidental: every project listed is a monster someone chose to slay. It carries the day without any context.

## Archetype
Poster

## Chassis
bricolage-manrope

## Visual Specification
### 1. Color Specification

- **Primary hue** — H:35° (amber gold). The color of candlelight, illuminated manuscripts, old adventurer's gold. Sits squarely in the mandated 20°–44° permitted zone. Nothing else in the recent palette history touches this zone.
- **Neutral palette** — amber-tinted ink family; low chroma (~0.01) toward H:35°:
  - 50: `#FDFAF2` | 100: `#F5EDDA` | 200: `#E2D4B4` | 300: `#C4B287`
  - 400: `#A0895E` | 500: `#7D6642` | 600: `#5C4A2C` | 700: `#3D3018`
  - 800: `#26200E` | 900: `#140E02`
- **Accent color** — amber.400 `#FBBF24` (light), amber.500 `#F59E0B` (default), amber.700 `#B45309` (dark), amber.400 with 0 0 24px glow in CSS (glow)
- **Secondary accent** — none
- **Background** — page bg: `#140E02` (ink.900); card bg: `#26200E` (ink.800); sidebar bg: `#26200E` (ink.800)
- **Text colors** — primary: `#FDFAF2` (ink.50); secondary: `#C4B287` (ink.300); muted: `#7D6642` (ink.500)
- **Contrast check** — ink.50 on ink.900: ~18:1 ✓; amber.400 on ink.900: ~9.8:1 ✓; ink.300 on ink.900: ~7.2:1 ✓

### 2. Typography (chassis-derived)

- **Hero phrase rendering** — `display` token (Bricolage Grotesque), `clamp(64px, 7.5vw, 110px)`, weight 800. Two-line break at natural phrase boundary:
  - Line 1: "the melancholy of" — ink.50 (`#FDFAF2`)
  - Line 2: "slaying monsters" — ink.50 with the word "monsters" optionally nudged amber.400 for a single chromatic ember
  - Left-aligned with `8vw` left padding; vertically centered in the hero viewport
- **Line heights** — hero phrase: `0.92`; body/secondary: `1.5`; subtext labels: `1.3`
- **Letter spacings** — hero phrase: `-0.03em` (tightened at display scale); body: `0`; small caps labels: `0.08em`

### 3. Layout Specification

- **Archetype** — Poster. The phrase "the melancholy of slaying monsters" is not evidence of capability or a welcome message — it's a state of being. The Poster archetype gives it the 80% viewport silence it needs to land. Everything else is demoted to the periphery.
- **CSS grid/flex structure**:
  ```
  .poster-root {
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: 1fr;
    min-height: 100vh;
    width: 100vw;
    max-width: none;
    overflow-x: hidden;
  }
  .poster-nav { grid-row: 1; padding: 28px 8vw 0; }
  .poster-hero { grid-row: 2; display: flex; align-items: center; padding: 0 8vw; }
  .poster-signal-strip { grid-row: 3; padding: 24px 8vw 32px; }
  ```
- **Major dimensions**:
  - Hero area height: `min-height: 78vh` (phrase sits in the center third)
  - Nav bar: top, `64px` tall, `100vw` wide, no max-width
  - Signal strip: bottom, `auto` height, `100vw` wide
  - Content padding: `8vw` left/right — NO max-width; full canvas edge-to-edge
  - Section spacing: nav `28px` top pad; hero `0 8vw` pad
- **Nav placement** — top bar, full-width, minimal: site name `doug march` left-aligned in ink.400 at 13px Manrope, and 3–4 nav links (`work`, `about`, `lab`) right-aligned in ink.500 at 13px with hover → ink.50. No background; fully transparent over the hero.
- **Hero phrase grid zone** — rows 2 of 3, column full-width. The phrase occupies `~82vw` horizontal footprint across 2 lines. Left edge at `8vw`. Top of phrase positioned at approximately `42vh` from top.

### 4. Component Character

- **Border radius** — none (0px) everywhere. Angular surfaces only — this is a night-before-dawn poster, not a friendly app.
- **Border treatment** — borderless for the hero zone; `1px solid ink.700` for the signal strip separator at top; `1px solid ink.800` for any card outlines
- **Shadow** — none on cards; for the amber accent text the Unified Designer may optionally add `text-shadow: 0 0 32px rgba(251,191,36,0.25)` on the hero phrase for a candlelight glow — restrained, not neon
- **Density** — extremely spacious; the poster exists to breathe
- **Interactive states** — nav links: color transitions from ink.500 → ink.50 on hover, `transition: color 200ms ease`; project links: amber.400 underline on hover

### 5. Signal Integration

- **Where signal elements live** — bottom signal strip, spanning full width, `8vw` padding. Single horizontal row. Very small — 12–13px Manrope, ink.500.
- **Sports scores** — Tigers loss `6–10` rendered as: `DET 6 · MIL 10` in ink.500 (muted), the score numbers in ink.400. No color drama — this is a quiet loss, not a catastrophe. Followed by `●` separator.
- **Quote display** — the hero phrase IS the quote/signal. No blockquote treatment needed. The source credit `— HN / MIT Press Reader` appears as a single line of ink.600 at `12px` Manrope weight 400, `letter-spacing: 0.05em`, positioned immediately below line 2 of the hero phrase at approximately `24px` margin-top.
- **Moon signal** — in the signal strip: `◐ 88%` in amber.600 (the moon itself being amber-tinted tonight) + `waxing gibbous`. This is the one accent color element in the strip — honors the near-full moon's significance.
- **Music** — in signal strip after separators: `Wet Leg · The War on Drugs · My Morning Jacket` in ink.500/ink.600.
- **HN stories** — optionally include the top HN score as micro-context: `↑115 · MIT Press` beneath the hero phrase attribution, same ink.600 treatment.
- **Golf** — `Charles Schwab Challenge · tee time pending` in ink.500 in the signal strip.
- **Holiday elements** — none today.
- **Daylight** — `14.5h ☀` in the signal strip, ink.500.

## Self-Check
1. Hero quotability: Yes — "the melancholy of slaying monsters" is a standalone fragment that prompts a question (after what, exactly?) before it answers itself; someone would screenshot this line without context.
2. Because-of chain: Yes — the phrase's candlelit-aftermath mood demanded the amber palette; the quiet enormity of the phrase demanded Poster (not Specimen, which would typographic-exercise it, not Split, which would divide it); bricolage-manrope was chosen because Bricolage Grotesque at weight 800 carries the phrase with warmth and humanity rather than the cold authority of Anton/Bebas.
3. Render feasibility: Yes — "the melancholy of" (17 chars) and "slaying monsters" (16 chars) in Bricolage Grotesque at `clamp(64px, 7.5vw, 110px)` on 1440px renders each line at ~100px, approximately 880–950px wide per line, well within the `8vw` padded canvas of `1440 - (2×115) = ~1210px` available width.

## Rationale
The hero phrase arrived from the day's signals as an unusually clean convergence: "The Melancholy of Slaying Monsters" scored 115 on Hacker News — the day's most resonant story — on a Wednesday when the Tigers just lost 6–10, every league is in offseason, the Charles Schwab leaderboard shows no leaders yet, and the GitHub feed is busy with "stop-slop" and an essay titled "I'm Tired of Talking to AI." The phrase is not about any of those things specifically, and yet it describes the exact texture of the day: the quietness after effort, the anticlimactic feeling of having done a hard thing. For a portfolio where every project is a monster someone chose to slay, it functions as an unsolicited self-assessment. It doesn't need explaining. It earns marquee scale.

The Poster archetype was the only honest container. The phrase is not a listicle header, not a broadsheet deck, not a specimen exercise — it's a single sentence that wants to fill a room. Poster gives it that room: 78vh of dark silence, the phrase left-aligned and enormous against near-black amber-tinted ink, with everything else (nav, signals, attribution) pushed to the periphery as if embarrassed to exist at the same scale. Bricolage Grotesque at weight 800 was the right chassis because it is warm without being whimsical, heavy without being institutional — Bebas or Anton would have made the phrase feel like a gym poster; Spectral would have made it feel like a literary magazine headline. Bricolage makes it feel like something someone actually said.

The amber palette landed from the color mandate — the permitted zone (20°–44°) is precisely the hue family of candlelight and old gold, which is the exact color temperature the phrase deserves. Against ink.900 (`#140E02` — a near-black with the faintest amber undertone so it reads as depth, not CMYK void), the amber.400 accent glows at ~9.8:1 contrast. The neutral ink family's amber tint keeps every surface alive at every scale. One lamp burning after the work is done.
