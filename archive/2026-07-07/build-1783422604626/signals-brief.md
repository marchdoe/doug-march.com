# Signals Brief — 2026-07-07

## Hero Copy
the coming AI margin collapse

## Hero Rationale
The third-ranked HN story today is "GLM 5.2 and the coming AI margin collapse" at 457 points — Martin Alderson's piece arguing that as foundation models commoditize, the rent-seeking layer evaporates. The phrase requires no compression: "the coming AI margin collapse" is five words, a period's worth of weight, already viral. For a portfolio of someone who builds AI products (FishSticks, 15th Club), it reads as self-implicating prophecy. It passes the screenshot test immediately — someone would pull just this line and post it without context. The "coming" tense is doing all the work: not past, not present, but inbound.

## Archetype
Stack

## Chassis
anton-inter-tight

## Visual Specification
### 1. Color Specification
- **Primary hue** — H:158°, S:100%, L:46% (#00c97e). Teal-green chosen for the mandate's only open corridor (147°–170°) and because it is the literal color of phosphor terminals, data dashboards, and financial collapse visualizations. The phrase demands a system-alert aesthetic; this hue delivers without irony.
- **Neutral palette** (void family, tinted toward H:158°):
  - 50: #e8f5ee
  - 100: #c2ddd2
  - 200: #90b8a4
  - 300: #5e8c77
  - 400: #3d6f5c
  - 500: #265443
  - 600: #183d2f
  - 700: #0f281f
  - 800: #081812
  - 900: #030d08
- **Accent** — light: #0de591, default: #00c97e, dark: #007349, glow: `0 0 20px rgba(13, 229, 145, 0.4)`
- **Secondary accent** — none; one phosphor reading is the whole argument
- **Background** — page bg: #030d08 (void.900), card bg: #081812 (void.800), signal band bg: #0f281f (void.700)
- **Text colors** — primary: #edfff6 (teal.50, ~19:1 contrast on void.900), secondary: #84f9c8 (teal.200, ~12:1), muted: #0de591 (teal.400, ~11:1)

### 2. Typography (chassis-derived)
- **Hero phrase rendering** — `display` token (Anton Regular). Scale: `clamp(3.5rem, 8.5vw, 10.5rem)`. Apply `text-transform: uppercase` — Anton's condensed heavy forms at uppercase read as a system declaration, not a shout. The phrase renders across 2 natural lines at 1440px: "THE COMING AI" / "MARGIN COLLAPSE". Left-aligned, 6vw left padding. Below the phrase: attribution line "— MARTIN ALDERSON · HACKER NEWS · 457 PTS" in Inter Tight 0.75rem, teal.600, letter-spacing 0.1em, all-caps. A 1px teal.700 rule separates the attribution from the bottom edge of the hero band.
- **Line heights** — hero: 0.88, nav labels: 1.0, body: 1.5, signal entries: 1.2
- **Letter spacings** — hero: -0.02em (Anton reads as ultra-tight at display sizes), all-caps labels: 0.1em, body: 0em, signal eyebrows: 0.15em

### 3. Layout Specification
- **Archetype** — Stack. The hero phrase opens a cascade: each horizontal band is a complete scene — declaration, data, evidence, portfolio, context — reading top-to-bottom like a system readout or terminal feed. The Stack serves the phrase because the phrase is already sequential ("the coming" implies temporal unfolding); the architecture makes that time visible.
- **CSS structure** — each band is `section { width: 100%; display: flex; }` or `grid` internally. No shared outer container. Top-level layout: `display: flex; flex-direction: column; min-height: 100vh;`
- **Major dimensions**:
  - Nav strip: `height: 56px; padding: 0 6vw;` — `display: flex; justify-content: space-between; align-items: center;` — `background: rgba(3,13,8,0.92); backdrop-filter: blur(8px); position: sticky; top: 0; z-index: 100;`
  - Hero band: `min-height: calc(90vh - 56px); padding: 7vh 6vw 6vw;` — `display: flex; flex-direction: column; justify-content: flex-end;`
  - Signal band: `height: 160px; padding: 0 6vw;` — `display: grid; grid-template-columns: 1fr 1px 1.8fr 1px 1fr; align-items: center;`
  - Work band: `padding: 80px 6vw;` — `display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px;`
  - Capabilities band: `padding: 64px 6vw;` — `display: grid; grid-template-columns: 1fr 1fr 1fr 1fr;`
  - Max content width: `max-width: none` throughout; side padding via `6vw` consistently
- **Nav placement** — sticky top bar, 56px, frosted void.900 background. Site name left in Anton 1rem ("DOUG MARCH"). Nav links right in Inter Tight 0.75rem all-caps tracking-wide: WORK · ABOUT. The nav does not interrupt the hero; it floats over it without competing.
- **Hero phrase grid zone** — Hero band, bottom-aligned (`justify-content: flex-end`), full width, left-aligned. Phrase occupies bottom ~60% of hero height. At 1440px wide: approx 168px letterforms, wrapping naturally after "AI". The 1px teal.700 horizontal rule at hero bottom edge is the only decoration between phrase and signal band.

### 4. Component Character
- **Border radius** — cards: 0px (none — terminal aesthetic; everything is rectangular), buttons: 2px (sm), tags: 9999px (full — pill shape only for status chips)
- **Border treatment** — work cards: 1px solid borderAccent (teal.700) on left edge only (accent tab, not full border); signal band vertical dividers: 1px solid borderAccent; hero rule: 1px solid teal.700 full width
- **Shadow** — none; all depth via background color steps (void.900 → void.800 → void.700)
- **Density** — hero: maximally spacious (phrase breathes in large void); signal band: compact (3 sections in 160px); work grid: tight 1px gaps between cells, cards padded 32px
- **Interactive states** — work card hover: `background: void.800 → void.700`; nav links hover: `color: teal.400`; work card left border hover: `border-color: teal.400` with glow `box-shadow: -2px 0 12px rgba(13,229,145,0.3)`

### 5. Signal Integration
- **Signal band lives in Band 2** (immediately below hero), 160px, void.700 background. Three columns separated by 1px teal.700 vertical rules.
- **Left column — Golf**: Eyebrow "JOHN DEERE CLASSIC · FINAL" in teal.600 0.65rem all-caps tracking-wider. Score: "GOTTERUP" in teal.50 1rem Anton, "−20" in teal.400 2.5rem Anton line-height 0.9. Below: "HOMA −19 · KOHLES −18" in teal.600 0.7rem Inter Tight.
- **Center column — HN Feed**: Eyebrow "HACKER NEWS TODAY" in teal.600 0.65rem all-caps. Three entries stacked: score in teal.400 bold + title in teal.200 normal at 0.8rem Inter Tight, tight line-height. First entry "457 · AI MARGIN COLLAPSE ↑" inherits special treatment: teal.400 score glows, signaling the hero phrase's origin.
- **Right column — Dispatch**: Music "MY MORNING JACKET · GUIDED BY VOICES · WET LEG" in teal.600 0.7rem all-caps tracking-wider. Below: lunar "◑ LAST QUARTER 41%" and sun "☀ 14.6H DAYLIGHT" in teal.600, same size. All teams "OFF SEASON" in void.400 italic at bottom.
- **Quote** — Roy T. Bennett quote not used as hero; if displayed it lives as a 0.75rem italic footer note in void.400, clearly demoted.
- **HN attribution** — the hero phrase's origin is cited directly below the phrase as "— MARTIN ALDERSON · HACKER NEWS · 457 PTS" — the design makes the data source explicit, tying signal-to-hero.

## Self-Check
1. Hero quotability: Yes — "the coming AI margin collapse" has 457 HN upvotes already proving social velocity; isolated it reads as prophecy and is immediately screenshot-worthy.
2. Because-of chain: Yes — the system-alert register of the phrase forced Stack (terminal readout cascade), Anton (condensed declarative authority), H:158° teal (phosphor-terminal palette), and void-dark near-black (the screen behind the alarm).
3. Render feasibility: Yes — Anton at clamp(3.5rem, 8.5vw, 10.5rem) on a 1440×900 viewport produces ~122px letter-height; the 5-word phrase wraps to two lines cleanly within a 90vh hero band without overflow.

## Rationale
The hero phrase arrived as found text: Martin Alderson's HN piece "GLM 5.2 and the coming AI margin collapse" at 457 points. The five-word extract needed no editing — it reads as prophecy, a statement of something already in motion. For a portfolio of someone building AI-native products (FishSticks, 15th Club), the phrase is self-implicating. The "coming" tense does everything: not alarm, not retrospective, but inbound and inevitable. A person building in this space who can acknowledge this dynamic publicly is someone worth hiring. The phrase earns marquee scale without requiring amplification.

Stack was the only archetype that served the phrase's temporal logic. "The coming" implies sequence — something building toward an event. A Stack is literally a cascade of horizontal moments, each band a scene in a data readout. The hero band makes the declaration at near-90vh; the signal band immediately below it shows the primary source (HN 457 points, golf, music) in compressed terminal notation; the work band presents the portfolio as evidence; the capabilities band closes the ledger. The phrase generates the architecture. Anton at `clamp(3.5rem, 8.5vw, 10.5rem)` with uppercase treatment gives the five words the proportional authority of a Bloomberg terminal headline — condensed, heavy, immovable. Inter Tight handles all subordinate copy without competing.

H:158° teal-green occupies the only open corridor in the mandate (147°–170°) and is precisely correct for the phrase's register. Phosphor teal is the color of financial terminals, system dashboards, and monitoring interfaces — the color the screen turns when data is speaking. Against void.900 (#030d08), the teal scale reads as emissive, not reflective: the values appear to be lit from within the dark field. The single-accent strategy (no secondary color, no warm intrusion) keeps the palette reading as a coherent system rather than a designed artifact — appropriate for a brief that wants to feel like it found the design in the data, not imposed one upon it.
