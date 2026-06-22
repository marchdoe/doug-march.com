# Signals Brief — 2026-06-22

## Hero Copy
HELD. AGAIN.

## Hero Rationale
The U.S. Open concluded today with Wyndham Clark at −4, beating Sam Burns by a single shot. Clark won the U.S. Open in 2023 at LACC — this is a second major title, the same tournament, held again. "HELD. AGAIN." is two staccato declarations: he held the lead under pressure, and he did it again. It reads without context (persistence, grip, repetition) and earns golf context too. Doug's portfolio contains both TeeTurn and 15th Club — golf products — which makes the signal-to-work alignment unusually precise today.

## Archetype
Stack

## Chassis
anton-inter-tight

## Visual Specification
### 1. Color Specification

**Primary hue:** H:115° (fairway green) — the corridor between yellow-green and pure green; the specific hue of summer championship turf under afternoon sun. Falls squarely in the mandate's 102°–128° open corridor, untouched in seven consecutive builds.

**Neutral palette (ink — tinted toward H:115°, chroma ≈ 0.005):**
- ink.50: `#F3F5F2`
- ink.100: `#E5E9E4`
- ink.200: `#C6CEC5`
- ink.300: `#9EAA9D`
- ink.400: `#6F7E6E`
- ink.500: `#4A5849`
- ink.600: `#333E32`
- ink.700: `#222A21`
- ink.800: `#141C13`
- ink.900: `#0B0F0A`

**Accent color (green.400):**
- light variant: `#72E269`
- default: `#32D422` (hero text, primary CTAs)
- dark variant: `#1FAE12`
- glow: `#32D42220` (alpha, for border-accent and subtle glows)

**Secondary accent:** none — one green owns the page

**Background:**
- page bg: `#0B0F0A` (ink.900 — near-black with green soul)
- card bg: `#141C13` (ink.800 — leaderboard band and work band)
- elevated band: `#0F1509` (between ink.900 and ink.800, signals band)

**Text colors:**
- primary text: `#E5E9E4` (ink.100, 16.8:1 contrast on page bg)
- secondary text: `#9EAA9D` (ink.300, 8.1:1)
- muted text: `#6F7E6E` (ink.400, 5.3:1 — min-viable AA for large text)

---

### 2. Typography (anton-inter-tight chassis)

**Hero phrase rendering:** "HELD." and "AGAIN." each on their own line, left-aligned at `6vw` from edge. Font: Anton (chassis `display` token). Size: `clamp(80px, 22vw, 320px)`. Color: `#32D422` (green.400). At 1440px viewport, each word renders at ~316px — "HELD." occupies ~50% canvas width, "AGAIN." ~60%. Both lines together fill roughly 65–70% of viewport height inside the hero band.

**Line heights:**
- Hero "HELD. AGAIN.": `0.85` (words nearly touching, weight becomes texture)
- Subtext / attribution: `1.1`
- Body / leaderboard rows: `1.5`
- Loose (signal captions): `1.8`

**Letter spacings:**
- Hero Anton: `0.01em` (barely open — Anton tight by nature, slight air at marquee scale)
- Uppercase labels / eyebrows: `0.14em` (Inter Tight allcaps)
- Leaderboard names: `0.05em`
- Body prose: `0em`

---

### 3. Layout Specification

**Archetype: Stack** — The U.S. Open concluding on a Monday demands a scoreboard structure, not a pedestal. Five full-width horizontal bands, each a distinct visual moment: the declaration, the leaderboard, the work, the day's other signals, the footer. The hero phrase is Band 1's entire argument; every subsequent band is evidence.

**CSS structure:**
```
body / root container:
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: none;
  overflow-x: hidden;
```

**Major dimensions:**
- **Band 1 — Hero:** `min-height: 100vh`, bg `#0B0F0A`, `padding: 0 6vw`, hero text centered vertically with `display: flex; flex-direction: column; justify-content: center`
- **Band 2 — Leaderboard:** `min-height: 50vh`, bg `#141C13`, `padding: 72px 6vw`
- **Band 3 — Work:** `min-height: auto` (~700px content-driven), bg `#0B0F0A`, `padding: 96px 6vw`
- **Band 4 — Signals:** `min-height: 40vh`, bg `#0F1509`, `padding: 64px 6vw`
- **Band 5 — About / Footer:** `min-height: 30vh`, bg `#141C13`, `padding: 72px 6vw 48px`

Each band: `width: 100%`, `max-width: none`, side padding `6vw` only — no centered max-width container.

**Nav placement:** Fixed overlay, top of viewport, `height: 64px`, `padding: 0 6vw`, `display: flex; align-items: center; justify-content: space-between`. Background: transparent on load, transitions to `#0B0F0A` with `border-bottom: 1px solid #222A21` on scroll. Logo in Inter Tight 13px tracking wide `#32D422`. Nav links in Inter Tight 11px uppercase tracking widest `#9EAA9D`.

**Hero phrase grid zone:** Band 1, vertically centered in 100vh. Left-aligned at 6vw horizontal offset. "HELD." on line one, "AGAIN." on line two. Below the two-word stack: a `1px` horizontal rule in `#32D422` at `clamp(160px, 22vw, 280px)` wide (matching "HELD." approximate width), followed by 24px gap, then attribution line "WYNDHAM CLARK · −4 · U.S. OPEN FINAL · JUNE 22" in Inter Tight 13px allcaps tracking `0.10em` color `#9EAA9D`.

---

### 4. Component Character

**Border radius:** `0px` everywhere — zero radius, full angular, scoreboard aesthetic. No softening.

**Border treatment:** Borders present but minimal. `1px solid #222A21` (ink.700) for band dividers and data rows. `1px solid #32D422` (green.400) exclusively for Clark's leaderboard row highlight and featured work card hover state.

**Shadow:** None. Depth comes from the lightness steps between bands (`#0B0F0A` → `#141C13`), not from box shadows.

**Density:** Spacious in Band 1 (full viewport, two words). Compact in Band 2 (leaderboard rows at 48px height each). Medium density in Band 3 (work grid with breathing room between items). Tight in Band 4 (signal ticker, 3-column arrangement).

**Interactive states:**
- Link hover: color shifts from `#9EAA9D` → `#32D422`, underline appears
- Work card hover: `border-bottom: 1px solid #32D422` pulses into view; title text shifts to `#E5E9E4`
- Leaderboard row hover: bg lifts to `#1A2619` (barely lighter than `#141C13`)

---

### 5. Signal Integration

**Hero phrase IS the primary U.S. Open signal** at marquee scale. No other treatment needed for the winner declaration.

**Leaderboard (Band 2) — full visual treatment:**
- Eyebrow: "U.S. OPEN FINAL · 2026" in Inter Tight 11px allcaps tracking widest `#9EAA9D`
- Each row: position number in Inter Tight 13px `#6F7E6E`, player name in Inter Tight 16px medium `#E5E9E4`, score in Anton 28px `#9EAA9D`
- Clark's row: score in Anton 28px `#32D422`, left border `3px solid #32D422`, bg tint `#0D2209`
- Burns row: score `#72E269` (green.300, clearly second)
- Remaining: default muted treatment

**Tigers 5–4 win (Band 4):**
- Label "DET 5 · OAK 4" in Anton 36px `#32D422` on left column
- Subtext: "W · JUNE 21" in Inter Tight 11px allcaps muted
- Positioned as a secondary scoreline after the U.S. Open leaderboard

**HN top story — "Did my old job only exist because of fraud?" (620 pts) (Band 4):**
- Rendered as a blockquote-style pull with left border `2px solid #333E32`, text in Inter Tight 14px italic `#9EAA9D`, score badge `620 ↑` in Inter Tight 11px `#32D422`
- For a portfolio where everything exists and has real artifacts, this question is ambient context

**Lunar first quarter 56.5% (Band 4):**
- Small inline label: "◐ FIRST QUARTER · 56%" in Inter Tight 11px tracking wide `#6F7E6E`

**Music — Radiohead / Guided by Voices / Tobin Sprout (Band 4):**
- Three names in Inter Tight 12px, comma-separated, `#6F7E6E` — a footnote to the day

**TeeTurn and 15th Club (Band 3 — Work):**
- These two projects receive featured treatment with green.400 accent borders — the signal-to-work resonance on a U.S. Open conclusion day earns this emphasis

## Self-Check
1. Hero quotability: Yes — "HELD. AGAIN." is two punched declarations naming a champion's return; the double period creates staccato rhythm that reads as pure poster language with or without golf context.
2. Because-of chain: Yes — Clark's U.S. Open −4 win produced the phrase → Stack archetype allows a leaderboard band directly beneath the hero declaration → Anton carries "HELD. AGAIN." at 22vw with the condensed authority of a sports scoreboard → fairway green H:115° is both the mandate's open corridor and the literal color of the surface Wyndham Clark just won on.
3. Render feasibility: Yes — Anton at clamp(80px, 22vw, 320px) on 1440×900 renders each word at ~316px height, "HELD." at ~50% and "AGAIN." at ~60% viewport width on individual lines, well within Band 1's 100vh without overflow.

## Rationale
The hero phrase arrived from the golf signal with no competition. Wyndham Clark — who won the 2023 U.S. Open — closed the 2026 championship at −4, one shot ahead of Sam Burns. "HELD. AGAIN." is the shortest possible summary of that fact and it earns its weight as a standalone declaration: he held the lead under a major championship's final-round pressure, and he did it a second time. The portfolio contains TeeTurn and 15th Club, both golf products, which makes today's signal-to-work alignment unusually tight. That alignment doesn't appear in the hero phrase, but it does appear in the curation of Band 3, where those two projects receive accent-border emphasis.

Stack was the honest structural response to a sports conclusion day. The archetype hasn't appeared in the seven-day archive, but more importantly it fits: five full-width bands, each a distinct visual moment, read like a ticker of the day's scoreboard moments. Band 1 is the declaration. Band 2 is the leaderboard. Band 3 is the work. Band 4 is the rest of the day — Tigers 5–4, lunar first quarter at 56.5%, Radiohead/GBV, the HN story that every portfolio owner has asked themselves. Band 5 closes. Anton + Inter Tight is the only chassis appropriate for this architecture: Anton's condensed signage DNA carries "HELD." and "AGAIN." at 22vw with the authority of a carved stone score, and Inter Tight's precision makes leaderboard rows legible at 13–14px without ever competing with the monument above.

The palette writes itself from the phrase. Fairway green at H:115° is both the mandate's only open corridor (102°–128°, untouched in seven builds) and the literal color of championship turf under summer sun. `#32D422` at 10.3:1 contrast against the near-black `#0B0F0A` page background doesn't compromise — it commits. The ink neutral family carries the same H:115° tint at low chroma so the entire surface, including the darkest shadows, feels like it belongs to the same outdoor space where Clark finished his round.
