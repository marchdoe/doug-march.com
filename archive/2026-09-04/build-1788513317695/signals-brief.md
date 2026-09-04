# Signals Brief — 2026-09-04

## Hero Copy
Where did the work go?

## Hero Rationale
Today's signal field is saturated with one anxiety: the sidebar and Hacker News are wall-to-wall AI-and-labor ("AI is making development faster. But where did the work go?", "a typeface for the age of AI", "JudgmentKit: stop AI from building the wrong interface"). This site is the exact object that question interrogates — a portfolio designed nightly by an AI agent. Turning that headline into a bare four-word question lets the page indict itself with productive irony: the question hangs over the fold, and the dense catalog of real projects beneath it is the deadpan answer. I composed it from the day's dominant theme rather than reaching for the (poster-worthy but streak-flagged) Cervantes quote.

## Archetype
the machine asks where the work went — a mono statement over a warm-dark void

## Composition
columns: three
axis: diagonal
symmetry: right-weighted
hero_zone: upper-left
density: dense
rhythm: even
shell_posture: footer-only
field_ratio: field-dominant

## Composition Rationale
I kept the date-derived suggestions on six axes (three, right-weighted, dense, even, footer-only, field-dominant) because they already model exactly what today needs: a dense catalog of evidence gathering to the right, answering the question. I moved axis from radial→diagonal because the question searches — the eye should travel from the upper-left question down toward the work, and a diagonal descent renders that "where did it go?" motion more legibly than an orbit on a polished low-risk day. I moved hero_zone from interleaved→upper-left because a pointed four-word question loses all its punch if it is broken up and threaded through content; it needs one strong anchor to hang from.

## Chassis
space-mono-archivo

## Visual Specification
**1. Color Specification**
- **Primary hue** — 22° terracotta. Sits squarely inside the mandated 15–40° corridor; warm clay is the color of made things and honest labor, the right pigment to ask a question about disappearing work without going grey or dreary.
- **Neutral palette (sand, warm rust-tinted)** — 50 `#FBF4EC` · 100 `#F3E7D9` · 200 `#E4D0BC` · 300 `#CDB097` · 400 `#AC8A6E` · 500 `#8A6A52` · 600 `#6A4E3B` · 700 `#4A3529` · 800 `#281C14` · 900 `#1B130D`
- **Accent color** — light `#EC8E63`, default `#E67240`, dark `#B4451F`, glow `#F4B48E`
- **Secondary accent** — none. One hue carries the page.
- **Background** — page `#1B130D` (warm near-black void), card/surface `#34261B`, terracotta field band `#D2582F`
- **Text colors** — primary `#FBF4EC`, secondary `#CDB097`, muted `#8A6A52`

**2. Typography**
- **Hero phrase rendering** — Set in the `display` face (Space Mono) at the `hero` ramp step, clamped `clamp(60px, 8.5vw, 120px)`. Mono is thematically load-bearing here, not costume: this is a machine-authored site asking, in the machine's own monospaced voice, where the human work went. The wide mono forces "Where did / the work / go?" to stack across three short lines in the upper-left — the returns become part of the composition.
- **Type treatment** — `hero` for the question (its per-step tracking is slightly negative to hold the mono together at scale); `xl`/`2xl` (Space Mono) for project titles in the index; `md` (Archivo) as the standfirst under the hero — the mid-register element that keeps inner pages from jumping title-to-caption; `base` (Archivo) for body/rows; `sm`/`xs` mono for tabular signal data and metadata. Numerals ride Space Mono's tabular figures for aligned scores and prices.

**3. Layout Specification**
- **Composition** — three / diagonal / right-weighted / upper-left / dense / even / footer-only / field-dominant. The hero question anchors upper-left over the dark field; the body of work cascades down and to the right as a dense three-column index, so the eye searches diagonally from question toward evidence — the layout enacts "where did it go?" and answers "here, all of it."
- **CSS grid/flex structure** — page grid `display: grid; grid-template-rows: minmax(58vh, auto) auto auto`. Hero row: `display: grid; grid-template-columns: 7fr 5fr` (question left, terracotta field motif bleeding right). Work index: `display: grid; grid-template-columns: repeat(3, 1fr); column-gap: 2vw` with hairline rules between rows.
- **Major dimensions**:
  - Hero area `min-height: 58vh`
  - No fixed sidebar; work index is full-bleed three columns
  - Max content width `max-width: none`; side padding `padding: 72px 6vw`
  - Section padding `clamp(48px, 6vw, 96px)` vertical; row rhythm on a single 24px-derived interval (even rhythm)
- **Nav placement** — deferred entirely to the foot (footer-only posture). A full-width bottom manifest strip, `min-height: 160px`, single hairline top border, brand mark left, uppercase links, tabulated signals right.
- **Hero phrase grid zone** — hero row, columns 1–7 (left field), occupying roughly the top-left 60% of the fold at `clamp(60px, 8.5vw, 120px)`.

**4. Component Character**
- **Border radius** — 0 everywhere (cards, buttons, tags). Full (9999px) reserved only for the circular mark. Owner's standing complaint on rounded corners: honored.
- **Border treatment** — bordered by hairline only: `1px solid` `border` between index rows and around the footer top; `borderStrong` for the one emphatic section rule.
- **Shadow** — none. Depth comes from surface lightness (`surface` `#34261B` above `bg` `#1B130D`), not shadow.
- **Density** — dense. Small gutters, information-forward index; the question breathes, the evidence packs.
- **Interactive states** — links shift `text` → `accent` on hover, with a terracotta underline rule appearing beneath project rows; no scale/transform tricks.

**5. Signal Integration**
- **Where signals live** — the footer manifest strip only; the hero fold stays a clean poster with zero furniture.
- **Sports scores** — Detroit teams all off-season; noted as a single muted `textFaint` line "Detroit — off-season, all four." No score styling needed today.
- **Quote** — "Facts are the enemy of truth." — Cervantes runs as a small muted pull-line inside the footer manifest, NOT the hero (breaking the two-day quote streak deliberately).
- **Market** — SPY 773.17 ▲ 1.05% in tabular mono, up-tick in `accent` terracotta — the one signal allowed a touch of color.
- **Music** — Tobin Sprout · The War on Drugs, tagged "on rotation" in `textMuted` — presented as standing taste, not an event.
- **In memoriam** — Cassandra Wilson (jazz, 2x Grammy) gets a quiet single muted line; the warm-dark, late-hour palette quietly honors the smoky register.
- **Weather / almanac** — Aldie VA, light rain 72°, last-quarter moon 43%, AQI good, Labor Day in 3 days — one dot-separated tabular row in the footer.

## Self-Check
1. Hero quotability: Yes — "Where did the work go?" is a screenshot-able question, pointed and self-aware for an AI-built portfolio.
2. Because-of chain: Yes — the wry meta-question drove mono voice (machine's own register), dark warm void (a question that hangs), diagonal question→evidence layout, and footer-deferred furniture.
3. Render feasibility: Yes — Space Mono at 120px stacks "Where did / the work / go?" cleanly in the left 60% of a 1440×900 fold without overflow.
4. Canvas floor feasible: Yes — dense three-column index plus full-fold hero and footer manifest genuinely fills 82% of the viewport.

## Rationale
The hero phrase is a question the whole internet is asking this week and that this site answers just by existing: "Where did the work go?" It came out of the day's densest signal lane — the sidebar and Hacker News are entirely AI-and-labor anxiety — and I chose it over the perfectly poster-worthy Cervantes quote specifically to break the two-day quote streak the mandate flagged. A four-word question is the entire expression, so every other decision protects its punch: it gets one anchor in the upper-left, not a fragmented interleave, and the fold carries no furniture at all.

Because a machine now designs this portfolio nightly, the honest voice for that question is the machine's own: Space Mono at 120px, stacked into three short returns. Mono is normally a brand-register red flag ("costume technical"), but here it is thematically load-bearing rather than decorative, and space-mono-archivo has effectively never shipped — it dodges the three-chassis monoculture the mandate calls out. Archivo answers Space Mono's construction as the body, keeping display and body on a shared grotesque skeleton (the 09-01 standing complaint), and a mid-register Archivo standfirst plus mono index titles spend the middle of the type scale the owner asked for.

The palette commits to one hue at volume without hedging: 22° terracotta, dead-center in the mandated 15–40° corridor, glowing off a warm rust-tinted near-black void. I chose dark-void (fresh against the recent drench and split-field) and can justify the darkness against the "favor vibrancy" default: this is a wry, late-hour question, quietly shadowed by Cassandra Wilson's passing, and the void makes the terracotta question read like a single lit line in a dim room — not grey, not dreary, a warm charcoal drenched toward clay with a full-saturation accent doing all the pointing. Radii are zero everywhere but the mark, navigation and the entire signal manifest defer to a footer strip (footer-only posture, fresh against recent folded-into-hero and marginal headers), and the dense three-column index below the fold is the deadpan answer to the question hanging above it — the work never went anywhere; it's all right here.
