# Signals Brief — 2026-07-29

## Hero Copy
Confidence is what you have before you understand the problem.

## Hero Rationale
Pulled straight from `signals.quote` (Woody Allen). For a portfolio that demolishes and rebuilds itself every single night with total swagger and zero certainty about what tomorrow's page will be, this deadpan aphorism is a self-portrait: the whole premise runs on confidence that precedes understanding. It is genuinely quotable in isolation — a line you'd screenshot — and its dry, intellectual wit wants to be *read* like a newspaper op-ed headline, not shouted like a billboard.

## Archetype
Broadsheet

## Chassis
spectral-albert

## Visual Specification
### 1. Color Specification
- **Primary hue** — 328° magenta-rose. Confidence is hot, forward, a little unearned; a vivid magenta is swagger made pigment. It also honors the mandate: the only open corridors are 77–87° and 307–337°, and 328° sits cleanly inside the 307–337° window (chartreuse read as anxious/acid, wrong for confidence).
- **Neutral palette (plum ink, magenta-tinted)** — 50 `#FBEAF2`, 100 `#F3D5E2`, 200 `#E3B0C8`, 300 `#CC86A8`, 400 `#A85C82`, 500 `#7E405E`, 600 `#5C2C44`, 700 `#421E31`, 800 `#2B1220`, 900 `#1B0912`
- **Accent color (magenta)** — light `#FF6FB5`, default `#F0308A`, dark `#A11056`, glow `#FF8FC7`
- **Secondary accent** — none. One hue carries the page.
- **Background** — page bg `#1B0912` (deep plum-black), card/panel bg `#2B1220`, masthead/sidebar bg `#220C18`
- **Text colors** — primary `#FBEAF2` (cream-pink), secondary `#CC86A8`, muted `#A85C82`

### 2. Typography
- **Hero phrase rendering** — Spectral display (`display` token) set as the full-width broadsheet headline, wrapping across ~3 lines spanning columns 1–12. The word **Confidence** rendered in accent glow `#FF8FC7`; the remainder in cream `#FBEAF2`; "— Woody Allen" set small in Albert Sans small-caps beneath. Scale via `clamp(52px, 7.5vw, 108px)`.
- **Line heights** — hero `1.02`, subheads `1.1`, body columns `1.5`, light-on-dark bump to `1.55` for the longest column.
- **Letter spacings** — hero `-0.015em`, body `0`, small-caps labels/dateline `0.12em`.

### 3. Layout Specification
- **Archetype** — Broadsheet. A witty aphorism belongs on the front page: masthead, giant headline banner, then dense multi-column body where the day's signals become newspaper columns. Serves the phrase by treating it as the day's lead story.
- **CSS grid structure** — page: `display: grid; grid-template-rows: auto auto 1fr auto` (masthead / headline banner / column body / imprint). Column body: `display: grid; grid-template-columns: repeat(12, 1fr); gap: 32px;` — About/manifesto cols 1–4, Selected Work cols 5–8, Signal column cols 9–12.
- **Major dimensions**:
  - Headline banner min-height `44vh`, hairline `1px` double-rule above and below.
  - Signal column width = 4 of 12 tracks (~33%).
  - Max content width `none`; side padding `clamp(40px, 6vw, 96px)`; ≥80% canvas utilization.
  - Section spacing: 48px vertical between bands, 32px column gap, 24px between column entries.
- **Nav placement** — Masthead top band, height `~96px`: stacked-md brand lockup top-left, centered dateline "WEDNESDAY · JULY 29, 2026 · FULL MOON" in small-caps, section links (WORK · ABOUT · CONTACT) right in small-caps `0.12em`, all sitting between two hairline rules. Fresh newspaper-masthead treatment (none of the recent rails/pills/spines/prompt bars).
- **Hero phrase grid zone** — rows 2, columns 1–12 (full-bleed headline banner), intended render ~1360px wide × ~400px tall on a 1440×900 viewport.

### 4. Component Character
- **Border radius** — 0 everywhere (cards, tags, buttons). Owner dislikes rounded corners; radii tokens all `0` except `full`.
- **Border treatment** — bordered with hairline rules: `1px solid` `#421E31` (border token). Column dividers are single vertical hairlines; masthead uses double-rules.
- **Shadow** — none. Depth comes from surface lightness steps (plum.900 → plum.800 panels), true to dark-mode practice.
- **Density** — spacious headline band, dense body columns (broadsheet packed).
- **Interactive states** — links: cream → accent `#F0308A` on `_hover`, plus a `1px` underline offset `0.15em`. Work rows shift left `2px` and gain a magenta leading rule on hover.

### 5. Signal Integration
- **Where signals live** — right-hand signal column (cols 9–12), styled as the paper's "Standings & Almanac" sidebar.
- **Sports scores** — Tigers' 14–0 shutout is the boxscore lede of the column: `DET 14 · CWS 0` in Spectral tabular figures, the **14** enlarged and lit in accent glow, "SHUTOUT" small-caps beneath in cream — the day's loud win, treated as the almanac headline.
- **Quote** — IS the hero headline; no duplicate. Attribution "— Woody Allen" as the standfirst.
- **Full moon** — 99.5% illumination rendered as a filled magenta disc glyph with "FULL MOON · 99%" caption at the top of the signal column.
- **Music** — "ON THE TURNTABLE: Guided by Voices · My Morning Jacket" as a small italic Spectral line-item.
- **Golf** — "ROCKET CLASSIC · scheduled" as a dim tabular one-liner (no leaderboard yet).
- **Holiday** — none today; omitted.

## Self-Check
1. Hero quotability: Yes — a complete, wry aphorism that reads as a standalone poster line, not descriptive boilerplate.
2. Because-of chain: Yes — aphorism → op-ed front page (Broadsheet) → literary transitional serif that reads without shouting (spectral-albert) → confident hot magenta drench → masthead + headline banner + almanac columns.
3. Render feasibility: Yes — a 9-word sentence at clamp(52–108px) wraps to ~3 lines across a 1360px banner at ~400px tall, well within 1440×900.
4. Canvas floor feasible: Yes — masthead + 44vh banner + a 3-column packed body reaches ≥80% utilization comfortably.

## Rationale
The phrase decides everything. "Confidence is what you have before you understand the problem" is Woody Allen doing stand-up philosophy, and it is also the honest thesis of a site that rebuilds itself nightly on nerve alone. A witty, intellectual aphorism does not want to be screamed off a billboard — it wants to be *read* like the lead editorial on a front page. That is why the archetype is the Broadsheet (also the freshest in the seven-day rotation): masthead, giant headline banner, then dense columns where the day's signals become the paper's almanac. The chassis follows directly — spectral-albert, a transitional slab serif over a humanist sans, is the only pick that renders this line with dry op-ed authority rather than athletic shouting; its 1.333 ratio is explicitly sanctioned for exactly this kind of literary phrase.

Palette is the committed gesture the day's high risk-weight asks for. The mandate left only two open corridors; 328° magenta lands inside the 307–337° window and reads as pure swagger — confidence as pigment. Rather than hedge, I drench a plum-black canvas (`#1B0912`) in that hue, tint every neutral toward magenta so the columns read as one world at different depths, and light a single word — **Confidence** — in a luminous pink glow, with the Tigers' 14–0 shutout as the only other thing that lifts into accent. One hue, load-bearing, past 65% coverage, no second color hedging the edges.

Layout answers the owner's standing complaints head-on. Radii are zeroed everywhere — no rounded corners. The brand is unmistakably present via a stacked-md lockup anchored in the masthead (mono, cream, so it never reads as a gray box). The nav is a genuine newspaper masthead between hairline double-rules — a treatment nowhere in the recent rails/pills/spines/prompt-bars — and the footer is a quiet imprint rule, not the recent data strip or exit line. Crucially, the form is dictated by the content, not menu-picked: a front-page aphorism becomes a literal front page, its signals set as almanac columns, so the page reads as authored rather than templated.
