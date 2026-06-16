# Signals Brief — 2026-06-16

## Hero Copy
We can see through others only when we can see through ourselves.

## Hero Rationale
Bruce Lee's quote from `signals.quote` earns the banner today because of the precise collision of circumstances: the waxing crescent is at day 1.99 (essentially a new cycle, the reset point) with 4.4% illumination — a literal fresh start, zero interference from old light. The quote operates on the site's own logic: this portfolio rereads itself every morning from raw YAML, and to compose a day's design honestly, you must know what you actually are. The phrase is immediately quotable in isolation, carries no portfolio-context dependency, and is Bruce Lee — it needs no frame.

## Archetype
Broadsheet

## Chassis
spectral-albert

## Visual Specification
### 1. Color Specification

- **Primary hue:** H:72° (lime / citrus yellow-green) — falls in the 66–85° open mandate window; peak-June, fresh-start color, the hue of a new lunar cycle and 14.7 hours of daylight
- **Neutral palette** (warm newsprint family, faint lime tint):
  - 50: #FAFAF6
  - 100: #F7F4EC (page background — newsprint cream)
  - 200: #EDE9D9
  - 300: #DDD7C3 (column rule / border)
  - 400: #C4BAA8
  - 500: #A79D8B
  - 600: #857B6A
  - 700: #645C4E
  - 800: #3E3830
  - 900: #1B1710 (primary text, near-black)
- **Accent color:**
  - light: #EDFAB5 (lime-100 — tag backgrounds, hover fills)
  - default: #8BBF12 (lime-500 — decorative rules, borders, pills; NOT used for standalone text)
  - dark: #53750A (lime-700 — accessible text on cream: ~4.7:1)
  - accessible text: #384F07 (lime-800 — ~8.6:1 on cream)
  - glow: none (flat newsprint aesthetic)
- **Secondary accent:** None
- **Background:**
  - Page bg: #F7F4EC
  - Card bg: #FAFAF6
  - Sidebar bg: #EDE9D9
- **Text colors:**
  - Primary: #1B1710 (~15:1 on cream)
  - Secondary: #645C4E
  - Muted: #A79D8B

### 2. Typography (spectral-albert chassis)

- **Hero phrase rendering:** Spectral ExtraBold Italic (`display` token), `clamp(30px, 4.2vw, 56px)`, spanning the full content width as a 3-line newspaper banner headline. Natural line breaks:
  - "We can see through others"
  - "only when we can see"
  - "through ourselves."
  - `text-wrap: balance`, `letter-spacing: -0.02em`, `line-height: 1.08`
- **Attribution:** "— Bruce Lee" in Albert Sans 13px, `letter-spacing: 0.10em`, `font-variant-caps: all-small-caps`, color: stone-600; sits 12px below the last headline line with a 1px lime-500 rule between
- **Masthead nameplate:** Spectral ExtraBold (not italic) 32px, `letter-spacing: -0.02em`, stone-900
- **Column section headers:** Albert Sans 10px, all-caps, `letter-spacing: 0.14em`, lime-700
- **Body columns:** Albert Sans 14px, normal weight, `line-height: 1.5`, stone-900
- **Project titles in columns:** Spectral Bold 17px, stone-900, `line-height: 1.2`
- **Data pills / scores:** Albert Sans 12px, `font-variant-numeric: tabular-nums`, stone-800
- **Line heights:** 1.08 (banner headline), 1.2 (subheadings, project titles), 1.5 (body)
- **Letter spacings:** -0.02em (banner headline, masthead), 0em (body), 0.08em (nav links), 0.10em (attribution), 0.14em (section headers)

### 3. Layout Specification

- **Archetype:** Broadsheet — newspaper density, type-driven, ≥80% canvas utilization. The Bruce Lee quote functions as today's screaming banner headline above a dense 3-column editorial grid cataloguing signals, work, and capabilities. The concept is "today's edition": each morning this portfolio prints a new issue.
- **CSS grid/flex structure:**
  ```
  #page     { display: flex; flex-direction: column; max-width: none; padding: 0 6vw; }
  #masthead { display: flex; justify-content: space-between; align-items: center;
              height: 60px; border-bottom: 3px solid #8BBF12; }
  #dateline { display: flex; gap: 24px; align-items: center;
              padding: 8px 0; border-bottom: 1px solid #DDD7C3;
              font: 10px/1 Albert Sans; letter-spacing: 0.12em; text-transform: uppercase; }
  #banner   { padding: 32px 0 20px; border-bottom: 1px solid #DDD7C3; }
  #columns  { display: grid; grid-template-columns: 1.15fr 1fr 0.85fr;
              min-height: calc(100vh - 380px); }
  .col      { padding: 20px 24px; border-right: 1px solid #DDD7C3; }
  .col:last-child { border-right: none; }
  ```
- **Major dimensions:**
  - Masthead: 60px height, 3px lime-500 bottom border
  - Dateline strip: 34px height
  - Banner headline zone: `min-height: 220px` (3 headline lines + lime rule + attribution)
  - Column section: `min-height: calc(100vh - 380px)`, no max-height
  - Max content width: none; side padding `6vw`
  - Column gap: 0 (replaced by 1px border-right rule)
  - Column internal padding: 20px top/bottom, 24px left/right (first col 0 left)
- **Nav placement:** Inline in the masthead bar. Left: "DOUG MARCH" nameplate (Spectral ExtraBold 32px). Center: empty or thin italic tagline in Albert Sans 11px, stone-500. Right: three nav links (About · Work · Now) in Albert Sans 12px, `letter-spacing: 0.08em`, stone-700.
- **Hero phrase grid zone:** Full-width banner section between dateline and columns — spanning all 3 columns, no column constraint. The quote occupies 3 visual rows at display scale, attribution below a 1px lime-500 rule. This zone is approximately 220–260px tall at 1440×900.

### 4. Component Character

- **Border radius:** `0px` everywhere — uncompromisingly flat newsprint. No rounded corners on cards, buttons, tags, or pills.
- **Border treatment:** Bordered throughout. 1px `#DDD7C3` (stone-300) for all internal column rules, card borders, row dividers. 3px `#8BBF12` (lime-500) for the masthead bottom accent rule. 1px lime-500 for the attribution separator in the banner.
- **Shadow:** None — flat newspaper ink-on-paper aesthetic; no elevation, no blur
- **Density:** Compact. Column padding 24px horizontal, 20px vertical. Section headers 10px with 12px bottom rule margin before content. Project entries separated by a 1px stone-200 rule, 16px padding between.
- **Interactive states:** Links on hover: `color: #384F07` (lime-800), `text-decoration: underline`. Nav hover: `border-bottom: 2px solid #8BBF12`. Project title hover: color shifts from stone-900 to lime-800.

### 5. Signal Integration

- **Location:** Signals occupy column 2 (center column) — the "news" column of the broadsheet. Column 1 is work/projects. Column 3 is timeline/capabilities.
- **Sports scores styling:** Tigers 9-3 WIN → displayed as a newspaper box score row: `"DET  9 · 3  OPP"` in Albert Sans 12px tabular-nums, stone-800, inside a thin-bordered 1px stone-300 box with a lime-500 left-border accent (3px) and a small "W" in lime-700 bold at right.
- **Golf leaderboard:** RBC Canadian Open FINAL — rendered as a mini table with column rules. Bud Cauley at -17 shown in lime-700 bold with "🏆" prefix. Three lines: Cauley -17 / Fitzpatrick -15 / Hovland -14. Albert Sans 12px, tabular-nums, compact padding.
- **Quote treatment:** IS the hero phrase — fills the full-width banner zone as the primary newspaper headline, Spectral ExtraBold Italic at display scale. Attribution ("— Bruce Lee") is a byline beneath a 1px lime rule.
- **Dateline strip** (between masthead and banner): Single line reading:
  `TUESDAY, JUNE 16, 2026  ·  ☽ NEW CYCLE DAY 2 · 4.4% LIT  ·  ☀ 04:48 → 19:32 · 14.7 HRS  ·  JUNETEENTH IN 3 DAYS`
  Albert Sans 10px, all-caps, letter-spacing 0.12em, stone-500.
- **HN top story:** "A backdoor in a LinkedIn job offer" (1,265 pts) — secondary headline in column 2 under the sports scores. Spectral Italic 15px, stone-900, with score in Albert Sans 11px stone-500 and a "→ devblogs" link.
- **Carmack/Bellard story:** Third HN item in column 2, smaller treatment (Albert Sans 13px headline, score).
- **Upcoming holidays:** Juneteenth already in the dateline strip; Father's Day could appear as a small dateline callout at the column 3 footer.

## Self-Check
1. Hero quotability: Yes — Bruce Lee's quote is independently screenshot-worthy, carries zero portfolio-context dependency, and is a genuine philosophical declaration; a stranger receiving this line needs no surrounding context.
2. Because-of chain: Yes — the contemplative/literary quote demands editorial gravity → Broadsheet (the newspaper IS the medium of serious public declaration) → spectral-albert (the only catalog chassis tagged Literary/Editorial, explicitly right for phrases that don't want shouting) → lime-on-cream (clarity + fresh-start new-cycle logic, open mandate window 66–85° fulfilled).
3. Render feasibility: Yes — Spectral ExtraBold Italic at `clamp(30px, 4.2vw, 56px)` on a 1440×900 viewport with 6vw side padding (≈86px each side, content ≈1268px) produces a 3-line newspaper banner occupying ~220px height; no overflow, no sub-marquee collapse; Broadsheet headline scale is the correct target register for this chassis.

## Rationale
The Bruce Lee quote arrived loaded with two simultaneous frames: a philosophical declaration about self-knowledge as the precondition for perceiving others, and a statement about how this portfolio actually works — it looks at itself (the raw YAML, the day's signals, the archive of recent decisions) before it can compose a day's face. The waxing crescent at 4.4% on day 1.99 of a fresh cycle is the calendar correlate: a literal clean slate, a night with almost no interference from old light. The quote isn't aspirational decoration; it is the operating instruction.

The Broadsheet archetype follows necessarily. A Poster would frame the quote as a single precious object. A Broadsheet makes the quote a newspaper banner headline — it has editorial gravity, a dateline, columns of supporting evidence below. The concept is "today's edition of Doug March": the banner headline is the editorial voice, and the three columns below are the proof. Column 1 is the work (what was built), Column 2 is the news (Tigers win, Bud Cauley's −17 at the RBC Canadian Open, the LinkedIn backdoor explosion at 1,265 points on HN), Column 3 is the person (capabilities, timeline). The layout enacts the quote's logic — first the declaration, then the inventory that earns it.

Spectral-Albert is the chassis because this phrase "doesn't want shouting." Spectral ExtraBold Italic at 56px in a newspaper banner register is authoritative without being aggressive — it has the gravity of permanent ink, not the pressure of a stadium screen. Albert Sans's precise geometric structure in the columns creates the counterweight: rational, legible, workhorse. The lime-on-newsprint palette completes the chain: H:72° sits dead-center in the 66–85° open mandate window, and it is exactly the right hue for self-transparency — electric lime is the color of a clear signal, of fresh starts, of June at its most alive. Against cream newsprint it reads as the moment a thought becomes visible.
