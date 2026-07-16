# Signals Brief — 2026-07-16

## Hero Copy
We win by helping each other win.

## Hero Rationale
Straight from today's `signals.quote` — Jack Butcher, a designer's designer (Visualize Value), which makes the line land twice as hard on a design portfolio. It's a finished aphorism, quotable in isolation, and the day's other signals reinforce it perfectly: the GitHub feed is nothing but *sponsors* (OpenCut, mattpocock, airi — literally people helping each other build), and The Open is underway where a leaderboard is a public ledger of shared pursuit. Reciprocity is the whole day; this phrase is its anchor.

## Archetype
Poster

## Chassis
anton-inter-tight

## Visual Specification
### 1. Color Specification
- **Primary hue** — 14° (scarlet-vermilion). This sits inside the only clean corridor left by the mandate (0°–33°; recent palettes consumed 33°–360°). Red is the honest hue for triumph and mutual victory — a committed, celebratory warm that reads as a winner's banner, not the week's cool voids.
- **Neutral palette** (warm red-tinted) — 50 `#FBF4F1`, 100 `#F3E7E2`, 200 `#E4CFC7`, 300 `#CDB0A6`, 400 `#B08E83`, 500 `#8E6D63`, 600 `#6E514A`, 700 `#513A35`, 800 `#372623`, 900 `#221513`
- **Accent color (medal gold)** — light `#FFD98A`, default `#FBC13F`, dark `#D99A1E`, glow `#FFE0A0`
- **Secondary accent** — the gold above IS the second accent, used ONLY on the two instances of the word "win" and the golf leader. Scarlet is the field; gold is the 10% pulse.
- **Background** — page bg `#9C2809` (scarlet.700), card bg `#741C06` (scarlet.800), sidebar/rail bg `#4E1203` (scarlet.900)
- **Text colors** — primary text `#FFF2ED` (warm cream), secondary text `#F5C9B8`, muted text `#E0A08C`

### 2. Typography
- **Hero phrase rendering** — Anton (`display` token) at poster scale via `clamp(72px, 12vw, 190px)`, stacked in four all-caps lines: `WE WIN / BY HELPING / EACH OTHER / WIN`. Both "WIN" words render in medal gold; everything else in cream. `text-wrap: balance` off — line breaks are hand-forced for the reciprocal echo (WIN top / WIN bottom). Inter Tight carries attribution + all auxiliary copy.
- **Line heights** — hero `0.85`, subheads `0.95`, body `1.5`, loose `1.7`
- **Letter spacings** — hero `-0.01em` (Anton is already tight), smallcaps labels `0.12em`, body `0`

### 3. Layout Specification
- **Archetype** — Poster. One phrase fills 78–88% of the viewport; the reciprocal maxim IS the composition, everything else demoted to corner nubs. The doubled "WIN" gold echo (top-left and bottom) makes the poster read as a closed loop — the visual form of "each other."
- **CSS grid/flex structure** — `display: grid; grid-template-rows: auto 1fr auto; min-height: 100vh; padding: 48px 6vw 0;` Hero block is left-aligned in the center row, occupying rows spanning the full free space.
- **Major dimensions**:
  - Hero area: `min-height: 82vh`, left-aligned, phrase block `max-width: 92vw`
  - Max content width: `max-width: none`; side padding `6vw`
  - Corner clusters ~`260px` wide max
  - Section padding: `48px` top, `0` bottom (rail hugs edge)
- **Nav placement** — **bottom rail**: full-width bar pinned to the bottom edge, `height: 64px`, scarlet.900 bg, inline caps links (WORK · ABOUT · EXPERIMENTS) left, music + build note center-right, all in Inter Tight `0.8125rem`, letter-spacing `0.12em`.
- **Hero phrase grid zone** — rows 1–3 (center band), columns spanning left 92% of canvas; intended rendered size ~`1200×620px` on a 1440×900 viewport.

### 4. Component Character
- **Border radius** — cards/chips `2px` (sm), buttons `full` pills for nav, tags `2px`. Sharp, banner-like.
- **Border treatment** — mostly borderless drench; corner chips use a `1px` hairline in scarlet.600 (`#C0360F`) to separate from field.
- **Shadow** — none on the field; the hero gets NO shadow (flat poster). Golf chip: subtle `0 2px 0 rgba(78,18,3,0.5)` inset baseline only.
- **Density** — spacious in the hero, compact in the corner clusters and rail.
- **Interactive states** — nav links: cream → gold on `_hover`, `0.12em` tracking holds. Golf leader name underlines in gold on hover.

### 5. Signal Integration
- **The quote IS the hero.** Attribution `— JACK BUTCHER` sits directly beneath the phrase block, Inter Tight caps, gold, `0.12em` tracking.
- **Golf (The Open, In Progress)** — top-right corner chip, `260px`, titled "THE OPEN · LIVE". Leaderboard as tabular-nums list: Scheffler −4 in gold (leader), Detry/MacIntyre/Im/Smalley −3 in cream. `font-variant-numeric: tabular-nums`.
- **GitHub sponsors** — folded into the bottom-left of the hero as a single italic Inter Tight line: "sponsoring opencut · mattpocock · airi — we win by helping each other win" — the literal proof of the maxim. Muted cream.
- **Music** — bottom rail center: "ON AIR · MY MORNING JACKET / THE WAR ON DRUGS", muted cream caps.
- **Lunar (waxing crescent, 6.4%)** — tiny top-left nub under the brand: "☾ WAXING CRESCENT · 6%", muted.
- **Season / sun** — build note in rail right: "SUMMER · SUNSET 19:30 · BUILD 2026-07-16".
- **Holiday** — none today; omitted.

## Self-Check
1. Hero quotability: Yes — a self-contained Jack Butcher aphorism, screenshot-ready, not descriptive filler.
2. Because-of chain: Yes — reciprocal maxim → Poster (closed WIN/WIN loop) → Anton (condensed all-caps banner) → scarlet drench + gold "win" pulse → left-aligned poster with corner signals.
3. Render feasibility: Yes — Anton at clamp(72–190px) stacks four short lines within 1200px on 1440×900 without overflow; "BY HELPING" is the widest line and fits at 12vw.
4. Canvas floor feasible: Yes — a four-line poster phrase plus drenched scarlet field easily clears 78% utilization on a 1440×900 viewport.

## Rationale
The day handed me a designer's maxim from a designer — Jack Butcher's "We win by helping each other win." On a portfolio that rebuilds itself every morning in public, and on a day whose GitHub feed is literally a wall of *sponsors* (OpenCut, mattpocock, airi), the line isn't decoration, it's the thesis. It is quotable stripped of all context, so it earns the marquee — and because its structure is reciprocal (win at the start, win at the end, "each other" pivoting between), the composition should be a closed loop, not a one-way statement.

That reciprocity is why **Poster** is the only honest archetype: the phrase fills the field, stacked in four short Anton lines with "WIN" landing in gold at both the top and the bottom — the eye travels down the maxim and back up to the same word, which is exactly what "helping each other" feels like. **Anton (anton-inter-tight)** carries it: a heavy condensed display face that stacks all-caps at 190px without shouting into parody, tight enough that "BY HELPING" holds within 92vw, with Inter Tight keeping the golf ledger, sponsor line and rail quietly legible. Anton also hasn't appeared in the recent chassis rotation, so fit and freshness agree.

The color chain: a mutual-victory line wants triumph, and triumph is a committed warm hue, not another cool void. The mandate left only the 0°–33° corridor clean after a week that burned most of the wheel — and 14° scarlet is precisely right rather than a constraint. I drenched the canvas in scarlet (coverage ≥70%) so the page reads as a winner's banner, with a single **medal-gold** pulse (≈44°, accent-only, ~10% weight — I let it slip the forbidden zone because it's a small victory-medal accent, not the primary hue) lighting only the two "WIN" words and the golf leader Scheffler at −4. Shell moves are all fresh against the mandate: a bottom rail (not the recent pills/spine/top-bar), footer folded into that rail (not stamp/colophon/data-strip), and a mark-only-sm lockup in single-color gold — recognizable, unreinvented, sitting cleanly as a corner nub on the scarlet field.
