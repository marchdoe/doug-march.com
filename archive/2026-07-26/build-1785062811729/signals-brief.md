# Signals Brief — 2026-07-26

## Hero Copy
A shell colon does nothing.
Use it anyway.

## Hero Rationale
Straight off the front page of Hacker News (209 points): "A shell colon does nothing. Use it anyway." On a portfolio that tears itself down and rebuilds from scratch every single night — a machine whose entire premise is doing an ostensibly pointless thing beautifully, on purpose, again — this is the mission statement, not a link. "Use it anyway" is the punch that earns the marquee; "a shell colon does nothing" is the dry setup that makes it land. It's quotable in isolation and it's secretly about this exact website.

## Archetype
Index

## Chassis
bebas-plex

## Visual Specification
### 1. Color Specification
- **Primary hue** — 150° (phosphor emerald). This is the only clean corridor the mandate left (129°–159°), and it is the literal color of a terminal/shell screen the phrase describes. Convergence, not compromise.
- **Neutral palette (pine black, tinted 150°)** — 50 `#EDF4F0`, 100 `#D6E4DC`, 200 `#B0C7BB`, 300 `#83A292`, 400 `#587A69`, 500 `#3A5749`, 600 `#263C31`, 700 `#182A21`, 800 `#0E1D16`, 900 `#07120D`
- **Accent color (phosphor emerald)** — light `#4FDF97`, default `#29CE7F`, dark `#108C57`, glow `#29CE7F` at `0 0 24px` opacity ~0.5
- **Secondary accent** — none. One phosphor hue carries everything.
- **Background** — page bg `#07120D`, card/panel bg `#0E1D16`, prompt-bar bg transparent over `#07120D`
- **Text colors** — primary `#EDF4F0`, secondary `#B0C7BB`, muted `#83A292`

### 2. Typography
- **Hero phrase rendering** — Bebas Neue (`display`), all-caps, two lines: "USE IT ANYWAY" at `clamp(84px, 12vw, 190px)`, line-height 0.85. The kicker "A SHELL COLON DOES NOTHING." sits directly above in IBM Plex Sans small-caps, tracked `0.14em`, emerald `#29CE7F`, ~15px. The word "ANYWAY" (or the trailing line) glows phosphor; the setup line stays quiet.
- **Line heights** — hero 0.85, index headers 0.95, directory rows 1.35, body 1.55
- **Letter spacings** — hero 0.01em, smallcaps/kicker 0.14em, directory labels 0.08em, body 0

### 3. Layout Specification
- **Archetype** — Index. A shell manifesto belongs on a directory listing: the page reads like `ls` output of Doug's whole body of work, dense and rule-lined, with the marquee command banner across the top. Freshest archetype (absent from the last 7 days) and the perfect vessel for a terminal line.
- **CSS grid/flex structure** — page: `display:grid; grid-template-rows: auto auto 1fr auto; min-height:100vh; padding: 40px 5vw`. Index body: `display:grid; grid-template-columns: 1.4fr 1fr 0.9fr; gap: 48px; column-rule via 1px borders`.
- **Major dimensions**:
  - Hero banner zone: `min-height: 42vh`, full width
  - No sidebar; three index columns instead
  - `max-width: none`; viewport side padding `5vw`
  - Section padding: 40–48px vertical between bands; directory rows 14px vertical each
- **Nav placement** — top **prompt bar**, single line, 56px, no band: brand lockup left, then a dim path `~/doug-march —`, then three lowercase links right (`work about contact`) with a phosphor `$` glyph. Clean, modern, one line — distinct from recent rails/pills/spine/masthead.
- **Hero phrase grid zone** — row 2, columns full-bleed (1 / -1), intended ~1300×380px at 1440×900; kicker occupies the top ~40px, marquee the rest.

### 4. Component Character
- **Border radius** — 0 everywhere (cards, tags, buttons). Owner's standing complaint answered: hard corners only. `full` reserved for the mark.
- **Border treatment** — bordered by hairlines: `1px solid #182A21` (border token) as directory row rules and column dividers. No boxes-with-fills; rules do the structuring.
- **Shadow** — none on surfaces; the only glow is `text-shadow: 0 0 24px rgba(41,206,127,0.5)` on the lit hero word.
- **Density** — dense (Index floor). Rows tightly set, tabular numerals aligned.
- **Interactive states** — links/rows: on `_hover` the emerald underline sweeps in and the row's index number brightens to `#4FDF97`; no motion beyond a 120ms color shift.

### 5. Signal Integration
- **Where signal elements live** — right index column ("SIGNAL LOG"), same directory register as the work listing.
- **Sports** — golf 3M Open as a ranked terminal listing: Jackson Koivun `−20` lit phosphor at the top, Grillo/Kohles `−17` below in secondary. Tigers loss `2–3` set dim (muted `#83A292`), never lit — a loss doesn't get the glow.
- **Quote** — the HN line IS the hero phrase; the marquee. Its origin is noted as one dim log row: `hn · 209 · use it anyway`.
- **Holiday elements** — none today.
- **Other signals** — moon `waxing gibbous · 94%`, music `Wet Leg / The War on Drugs`, and the build stamp all appear as tabular log rows; the footer exit line reads `— rebuilt 2026-07-26 · exit 0`.

## Self-Check
1. Hero quotability: Yes — "Use it anyway" is a screenshot-able manifesto and secretly describes this self-rebuilding site.
2. Because-of chain: Yes — shell line → terminal directory (Index) → declarative Bebas/Plex → phosphor-green-on-black → prompt-bar + rule-lined listing.
3. Render feasibility: Yes — Bebas condensed caps set "USE IT ANYWAY" at up to 190px within 90vw without overflow on 1440×900.
4. Canvas floor feasible: Yes — three dense index columns plus a full-width marquee band fills ≥80% of the canvas.

## Rationale
The phrase was already written and already true: "A shell colon does nothing. Use it anyway," top of Hacker News at 209 points. This site's entire premise is doing an ostensibly pointless thing — demolishing and rebuilding itself nightly — with total commitment. That is the exact joke and exact sincerity of the shell colon. So the hero is not decoration; it is the site describing itself. "Use it anyway" earns the marquee and "a shell colon does nothing" is the dry deadpan that sets it up.

Because the phrase is a shell command, the page becomes a shell: the Index archetype renders Doug's whole body of work as an `ls`-style directory — rule-lined, tabular, dense — with the command banner across the top and a SIGNAL LOG column on the right. Index is also the freshest archetype (absent from the last seven days), so it dodges the "cycling through five templates" complaint structurally rather than cosmetically. bebas-plex is the honest chassis: Bebas Neue's condensed declarative caps carry "USE IT ANYWAY" at up to 190px, and IBM Plex Sans sets the directory rows and log with clean tabular numerals — catalog voice, not costume mono.

Palette is where mandate and metaphor agree completely: the mandate scorched the wheel down to the 129°–159° corridor, and 150° phosphor emerald is the literal color of the terminal the phrase lives in. I drench a deep pine-black canvas (`#07120D`) and let one luminous emerald (`#29CE7F`) do all the work — Koivun's leading −20, the lit hero word, the `$` prompt, hover states — a single load-bearing hue, no hedging second color, coverage well past 60%. Radius is zero on every surface (the owner's repeated note), navigation leaves the top band entirely for a clean single-line shell prompt (`~/doug-march $ work about contact`), the brand rides horizontal-sm in single-color phosphor via the mono mark, and the footer is a dim `exit 0` line — every shell treatment fresh against the recent rails, pills, and spines.
