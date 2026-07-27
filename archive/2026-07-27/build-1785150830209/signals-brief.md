# Signals Brief — 2026-07-27

## Hero Copy
No snowflake ever falls in the wrong place.

## Hero Rationale
Straight from `signals.quote` — a Zen proverb that lands as a genuine poster line: quotable in isolation, screenshot-worthy, and quietly devastating. On a portfolio that demolishes and rebuilds itself every single night, "no snowflake ever falls in the wrong place" is the site's own theology — whatever it becomes today is exactly where it was meant to fall. Dropping a line about snow into a 14-hour July day, under a 98%-full moon, is the kind of serene contradiction that earns the whole canvas.

## Archetype
Poster

## Chassis
bricolage-manrope

## Visual Specification
### 1. Color Specification
- **Primary hue** — 118° (verdant green). The color mandate scorched everything except the narrow 76°–120° corridor; rather than fight it I read the proverb's "right place" as summer verdure — a field so alive that a single cold word falling into it looks perfectly, serenely placed. 118° sits just inside the legal edge and reads unambiguously green, not chartreuse.
- **Neutral palette (Sage, green-tinted)** — 50 `#F3F7F3`, 100 `#E6EEE7`, 200 `#CBD8CC`, 300 `#A6B8A8`, 400 `#7C8E7E`, 500 `#5B6B5D`, 600 `#455146`, 700 `#333D34`, 800 `#212A23`, 900 `#121A14`
- **Accent color** — light `#6FD38C`, default `#3DBB68`, dark `#178740`, glow `#A4E6B4`
- **Secondary accent** — none. One hue carries the entire page.
- **Background** — page bg `#0E4A26` (deep emerald drench), card bg `#0A2E18`, strip bg `#0A2E18`
- **Text colors** — primary `#ECFAEF` (pale mint), secondary `#CBD8CC`, muted `#8AA391`

### 2. Typography
- **Hero phrase rendering** — set in the Bricolage display token at poster scale via `clamp(48px, 8.5vw, 132px)`, left-aligned, wrapping to 3 lines and filling ~78% of the viewport. Full phrase in pale mint `#ECFAEF`; the single word **snowflake** lifted to accent-glow `#A4E6B4` with a soft luminous cast, so the snowflake is the one thing that glows against the field.
- **Line heights** — hero `0.95`, body `1.6` (bumped for light-on-dark), captions `1.4`
- **Letter spacings** — hero `-0.02em`, body `0`, smallcaps/labels `0.12em`

### 3. Layout Specification
- **Archetype** — Poster. One serene line dominates 70–90% of the viewport; a contemplative single idea wants to BE the surface, not sit in a card on it.
- **CSS grid/flex structure** — `display: grid; grid-template-rows: auto 1fr auto; min-height: 100vh;` The hero phrase lives in the center band as a left-aligned block; corners hold the mark, nav, and strip.
- **Major dimensions**:
  - Hero/featured area: center band `min-height: 78vh`, phrase block `max-width: 22ch`
  - No sidebar
  - `max-width: none`; side padding `clamp(32px, 6vw, 96px)`
  - Section padding: `64px` top for the mark/nav row, `48px` bottom for the strip
- **Nav placement** — corner mark. Brand mark top-left; three lowercase text links (`work · about · contact`) top-right, no band, no pills, no border — pure type, 40px row.
- **Hero phrase grid zone** — rows 2 (the `1fr` band), columns spanning the left ~72% of canvas; intended footprint ~1000×620px on a 1440×900 viewport.

### 4. Component Character
- **Border radius** — 0 everywhere (cards, links, strip). `full` reserved only for any dot glyph. Honors the owner's standing note against rounded corners.
- **Border treatment** — borderless surfaces; a single 1px hairline `#178740` divides the baseline data strip from the field.
- **Shadow** — none as elevation. The hero "snowflake" word carries a soft text glow only: `text-shadow: 0 0 32px rgba(164,230,180,0.35)`.
- **Density** — spacious; the field breathes, the strip is compact tabular.
- **Interactive states** — nav links shift from `#CBD8CC` to `#A4E6B4` on hover with a 1px underline offset; no motion beyond a 150ms color ease.

### 5. Signal Integration
- **Where signal elements live** — a thin baseline **data strip** across the bottom edge (`#0A2E18`, hairline top border), reading as one quiet tabular line.
- **How sports scores are styled** — golf leads the strip: `3M OPEN · KOIVUN −25 · SCHEFFLER −22` in Manrope tabular numerals, `−25` in accent `#3DBB68`. The Tigers loss (4–5) sits muted in `#8AA391` — a loss doesn't get the accent.
- **How the quote is displayed** — the quote IS the hero phrase, at marquee scale in the center band; author credit "— Zen Proverb" set small in `#8AA391` beneath the phrase.
- **Holiday elements** — none today.
- **Other signals** — full moon 98% rendered as `● FULL · 98%` in the strip (the glowing dot echoes the snowflake glow); music `GUIDED BY VOICES / WET LEG` in smallcaps; daylight `05:11 → 19:22` as an almanac fragment. All folded into the single baseline strip.

## Self-Check
1. Hero quotability: Yes — a standalone Zen proverb, poster-worthy and screenshot-ready on its own.
2. Because-of chain: Yes — serene acceptance → Poster (one dominant line) → Bricolage (warm marquee, not shouty) → green drench (only legal corridor, read as verdure) → corner-mark poster layout with one glowing word.
3. Render feasibility: Yes — a 6-word phrase at `clamp(48px,8.5vw,132px)` wraps to 3 lines within 22ch on 1440×900 without overflow.
4. Canvas floor feasible: Yes — the phrase block plus full-bleed green drench and baseline strip fill well past 72% of the viewport.

## Rationale
The day handed me a finished poster line in `signals.quote`: "No snowflake ever falls in the wrong place." It is quotable in isolation, and for a site whose entire premise is tearing itself down and rebuilding every night, it is also a confession of faith — whatever this page becomes today is exactly where it was meant to fall. That single serene line, and only that line, decides everything else. A contemplative one-idea statement cannot be one object among many, so the archetype is the Poster: the phrase fills 78% of the field, everything else demoted to corners and a baseline strip.

Because the tone is warm and accepting rather than athletic, I rejected the condensed billboard chassis (Anton, Bebas, Big Shoulders) that dominated the recent week and chose bricolage-manrope — a humanist expressive display at a 1.500 ratio that carries the phrase at 132px with warmth instead of a shout, while Manrope sets the corner nav and the tabular signal strip cleanly. The one committed gesture is typographic: the whole line sits in pale mint, but the word "snowflake" lifts into a luminous pale-green glow, so the single cold word is literally the thing that glows against the summer field.

The color mandate closed the wheel down to a narrow 76°–120° corridor, so I leaned into it rather than deviating: 118° verdant green becomes summer verdure, the living field onto which the snowflake falls perfectly placed. One saturated hue drenches the canvas past 68% coverage, every neutral is tinted toward it, and no second accent hedges the page. The shell answers the owner's standing notes directly — flush radius-0 everywhere (no rounded corners), and a fresh corner-mark treatment: a single mark-only-md lockup top-left with three quiet lowercase text links top-right, no band, no pills, no spine — none of the seven recently-used nav shells. Signals fold into a thin baseline data strip (a footer treatment unused in the recent set), where Koivun's −25 win at the 3M Open takes the accent, the 98% full moon glows as a dot echoing the snowflake, and the Tigers' 4–5 loss stays deliberately muted.
