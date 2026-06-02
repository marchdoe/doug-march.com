# Signals Brief — 2026-06-02

## Hero Copy
Stuff your eyes with wonder

## Hero Rationale
Ray Bradbury's signal quote delivers this as a command in four words — visceral, physical, strange. You don't "open" eyes to wonder; you STUFF them, the way you stuff a suitcase before a journey you're not sure you'll survive. On June 2 — summer's first Tuesday, 14.6 hours of daylight, a Tigers barn-burner won 10-9 — the phrase is operationally correct. For a portfolio that redesigns itself daily and treats making as seeing, "stuff your eyes with wonder" is its own mission statement. The fragment is quotable in isolation without context, which is the test.

## Archetype
Gallery Wall

## Chassis
bricolage-manrope

## Visual Specification
### 1. Color Specification

**Primary hue** — H:200°, S:88%, L:48° (summer sky azure). The open color mandate zone is H:188°–215°; H:200° sits at its midpoint, which is the exact hue of a deep clear summer sky at 10am — not the cool tech-blue of corporate interfaces, not the cyan of terminals, but the azure that hits when you look up on a long June day.

**Neutral palette** — warm ivory, barely tinted toward H:35° (parchment/linen quality):
- 50: `#FAFAF7`
- 100: `#F4F4EF`
- 200: `#E8E8E2`
- 300: `#D1D1C9`
- 400: `#A8A89E`
- 500: `#7A7A70`
- 600: `#5C5C52`
- 700: `#3D3D34`
- 800: `#242420`
- 900: `#121210`

**Accent color** — sky azure:
- Light: `#7DD3FC`
- Default: `#0EA5E9`
- Dark: `#0369A1`
- Glow: `#BAE6FD`

**Secondary accent** — none

**Background** — page bg: `#FAFAF7` (warm ivory, summer light); signal panel bg: `#0E0E08` (near-black ink, barely warm-tinted); card bg: `#F4F4EF`

**Text colors** — primary: `#121210`; secondary: `#3D3D34`; muted: `#7A7A70`; on dark panels: `#F4F4EF` (primary), `#A8A89E` (secondary), `#38BDF8` (accent)

---

### 2. Typography

**Hero phrase rendering** — `display` token, Bricolage Grotesque weight 800. Two lines, mixed case (Bradbury is warm, not shouting):
```
Stuff your eyes
with wonder
```
Size: `clamp(56px, 6.5vw, 96px)`. The phrase fits two lines in the hero block (~67% viewport width). Line height: `0.88`. Letter spacing: `−0.03em`. The word "wonder" optionally rendered in sky azure (`#0369A1` on light bg — 5.4:1 contrast at this size, passes WCAG large-text 3:1 threshold).

**Attribution below hero** — Manrope weight 300, italic, `14px`, `#7A7A70`, `"— Ray Bradbury"`, letter spacing `0.02em`.

**Body text** — Manrope weight 400, `16px`, line height `1.5`, `#121210` on light bg.

**Signal panel labels** — Manrope weight 500, `10px` all-caps, letter spacing `0.15em`, `#A8A89E`.

**Signal panel scores** — Bricolage Grotesque weight 700, `clamp(28px, 2.5vw, 36px)`, `#38BDF8`, line height `1.0`.

**Section headers / block identifiers** — Manrope weight 500, `11px`, letter spacing `0.10em`, all-caps, `#7A7A70`.

---

### 3. Layout Specification

**Archetype** — Gallery Wall. "Stuff your eyes with wonder" is a command to consume multiple things simultaneously — a wall of pinned objects, not a single centered proclamation. The asymmetric blocks ARE the wonder: you arrive and there is a hero phrase dominating 67% of the canvas, a dark signal panel pressing in from the right, and below the fold, three distinct zones that can be consumed in any order. The archetype makes the page a cabinet of curiosities.

**CSS grid structure** — 12-column, full viewport, no max-width:
```css
.gallery-wall {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto auto;
  width: 100vw;
  max-width: none;
}
```

Block assignments:
- **Hero block** — `grid-column: 1 / 9; grid-row: 1;` (cols 1–8, 66.7% width)
- **Signal panel** — `grid-column: 9 / 13; grid-row: 1 / 3;` (cols 9–12, 33.3% width, spans both rows — a tall dark tower on the right)
- **Projects block** — `grid-column: 1 / 7; grid-row: 2;` (cols 1–6)
- **Quote context block** — `grid-column: 7 / 9; grid-row: 2;` (cols 7–8, narrow inset)

**Major dimensions**:
- Hero block min-height: `80vh`
- Signal panel min-height: `100vh` (spans both rows, creating the tall dark tower)
- Projects block min-height: `320px`
- Quote context min-height: `320px`
- Max-width: `none` — full canvas edge-to-edge
- Side padding (hero): `padding: 52px 72px 64px 6vw`
- Signal panel padding: `padding: 52px 40px 64px 32px`
- Projects padding: `padding: 48px 72px 56px 6vw`
- Quote context padding: `padding: 48px 40px`

**Nav placement** — top-left of hero block, inline, horizontal: `[doug march]` (Manrope medium, 12px) left-anchored, nav links (`work`, `about`) at right of same row in 12px small-caps. `margin-bottom: 96px` to create distance before the hero phrase.

**Hero phrase grid zone** — occupies rows 2–3 of hero block's internal flow (after nav row), from left edge of block to 90% of block width. At 1440px viewport: hero block is 960px wide, phrase at `clamp(56px, 6.5vw, 96px)` = ~94px, "Stuff your eyes" (15 chars) fits in ~780px of 960px block. `margin-top: auto` pushes the phrase toward the vertical center of the block.

---

### 4. Component Character

**Border radius** — `0px` everywhere. Crisp, flat blocks. No softening.

**Border treatment** — No borders on blocks (background color defines block edges). `1px solid #E8E8E2` as horizontal rules between project list items only.

**Shadow** — None. Depth via background color contrast between blocks.

**Density** — Spacious in hero (generous vertical breathing, phrase given full room). Signal panel is compact: 16px between signal items. Projects block is medium density: 32px between rows.

**Interactive states** — Project links: on hover, sky azure (`#0EA5E9`) underline, `2px`, `underline-offset: 4px`, instant (no transition). Signal links: sky azure text on hover. Nav links: sky azure on hover, no underline.

---

### 5. Signal Integration

**Tigers 10–9 win** — Signal panel, top section, highest prominence. Label: "DETROIT TIGERS" in `10px` Manrope small-caps, `#A8A89E`. Score: "10 – 9" in Bricolage Grotesque 700, `36px`, `#38BDF8`. Below: "W · Jun 1" in `11px` Manrope, `#72726A`.

**Golf — Charles Schwab Challenge Final** — Signal panel, second block. Label: "SCHWAB CHALLENGE" in `10px` small-caps. "R. Henley −13" in Bricolage 600, `20px`, `#7DD3FC`. Runners up listed in `12px` Manrope, `#72726A`: "Cole −12 · Griffin −11".

**Lunar waning gibbous** — Signal panel, third block. Glyph "◐" in `#7DD3FC`, `18px`, followed by "91.7%" in Bricolage 600, `20px`, `#7DD3FC`. Label: "WANING GIBBOUS / Day 17.5" in `10px` small-caps, `#A8A89E`.

**The Bradbury quote** — Quote context block (cols 7–8, row 2). Light warm bg (`#F4F4EF`). Full quote displayed as a pull quote, Manrope weight 300 italic, `15px`, line height `1.6`, `#3D3D34`. Attribution: "— Ray Bradbury" in `12px` Manrope 500 small-caps, `#7A7A70`, `margin-top: 24px`. This block connects the hero phrase to its full source.

**Music — Guided by Voices · Wet Leg · Tobin Sprout** — Signal panel, fourth block. "NOW LISTENING" label in `10px` small-caps. Artists listed one per line in `13px` Manrope 400, `#A8A89E`.

**HN top story** — Signal panel, footer zone. Italic `11px` Manrope, `#72726A`, truncated: "HN #1: Instagram exploit, 1,874pts". Not prominent — curiosity item.

**Daylight hours** — Signal panel, footer. "14.6h daylight" in `10px` small-caps, `#4E4E46`. Pairs with sun emoji or sunrise glyph.

## Self-Check
1. Hero quotability: Yes — "Stuff your eyes with wonder" is a Bradbury command physically strange enough to stop scrolling; it would read as a standalone poster without the source.
2. Because-of chain: Yes — the stuffing-eyes conceit demanded Gallery Wall (multiple blocks = multiple things to see at once); Gallery Wall + marquee scale demanded bricolage-manrope (1.500 ratio, warm, expressive); summer azure H:200° follows from the literal act of looking at a June sky.
3. Render feasibility: Yes — at 1440px, hero block is 960px wide; "Stuff your eyes" at ~94px Bricolage 800 runs ~780px, fitting comfortably; signal panel at 480px holds all signal data at compact density without overflow.

## Rationale
The Bradbury quote arrived from today's signals carrying a phrase that is already in the exact register this portfolio needs: not a description of Doug's work, but an instruction about how to encounter the world — which is also an instruction about how to use this site. "Stuff your eyes with wonder" is physically strange (you stuff a turkey, you stuff a suitcase, you don't usually stuff eyes) and that strangeness is what makes it quotable. On June 2 — first Tuesday of summer, 14.6 hours of daylight, a 10-9 Tigers comeback, a waning gibbous moon at 91.7% — the phrase is operationally correct and signals-resonant without being a simple data summary.

The Gallery Wall archetype was the only honest container for this command. A Poster would put the phrase on a pedestal and let it rest on its own authority. The Gallery Wall forces you to enact the phrase: you arrive and there is an enormous hero phrase dominating the left two-thirds of the screen, a tall dark signal tower pressing in from the right edge, and below the fold, three distinct zones (projects, the full Bradbury quote in context, timeline) consuming every inch of canvas. The page is the wonder you are being instructed to stuff your eyes with. The archetype is not illustrating the phrase — it is enacting it. Bricolage Grotesque at weight 800 is the correct chassis choice: warm, expressive, variable-weight, distinctly human in its curves in a way that Anton or Bebas are not. Bradbury wrote warm sentences; the typeface should be warm. The 1.500 scale ratio handles the display demand.

Sky azure at H:200° is the color you find when you actually look up on a June morning — not corporate blue, not terminal cyan, but the specific vivid saturated azure of a clear sky at 10am on the second day of summer. Against the warm ivory parchment neutrals (barely tinted toward H:35°, not dead gray), it fires like light through glass. The signal panel on the right is held in near-black ink (barely warm, `#0E0E08`) — the dark column where today's signals live in compressed, high-contrast type — so the overall page reads as the contrast between a luminous open space (left: the wonder) and a dense information column (right: the world's data stuffed into one panel). This asymmetry, two-thirds light to one-third dark, is the visual argument that wonder is bigger than the facts that occasion it.
