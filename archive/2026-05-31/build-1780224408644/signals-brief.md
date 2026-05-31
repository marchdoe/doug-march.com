# Signals Brief — 2026-05-31

## Hero Copy
Domain expertise has always been the real moat.

## Hero Rationale
The Hacker News front page today leads with "Domain expertise has always been the real moat" at 605 points — the day's dominant intellectual signal by a factor of three over the next story. For a portfolio that is itself a proof of domain expertise (Spaceman, FishSticks, 15th Club, TeeTurn — each a founder's specific technical knowledge turned into product), the phrase is an unsolicited mission statement. It doesn't require attribution to land; it earns marquee scale because it names the thing the page is trying to demonstrate. On a Sunday at the end of May, full moon at 99.4%, Risk 8/10, it reads as confident and final — a line someone underlines.

## Archetype
Broadsheet

## Chassis
bebas-plex

## Visual Specification
### 1. Color Specification

- **Primary hue** — H:78° (acid chartreuse/yellow-green). The hue of neon signage, tennis balls, phosphorescent paint — colors that demand to be read. Falls inside the open mandate zone (65°–85°). Chosen because "the real moat" is a declaration, not a suggestion; this is the color of declarations posted in places where obedience is expected.
- **Neutral palette (void family — tinted toward H:78°)**:
  - 50: `#F2F5E4`
  - 100: `#E2E8C8`
  - 200: `#C8D2A4`
  - 300: `#AABA7E`
  - 400: `#8E9F5C`
  - 500: `#74833E`
  - 600: `#596728`
  - 700: `#404C18`
  - 800: `#28310A`
  - 900: `#141904`
- **Accent color (chartreuse)**:
  - Light: `#E0F58A`
  - Default: `#B8E000`
  - Dark: `#688600`
  - Glow: `rgba(184, 224, 0, 0.20)` (for hover halos)
- **Secondary accent** — none
- **Background**:
  - Page bg: `#141904` (void.900 — near-black, faint yellow-green undertone)
  - Card bg: `#28310A` (void.800)
  - Sidebar bg: `#1C2207` (between void.900 and void.800)
- **Text colors**:
  - Primary text: `#F2F5E4` (void.50)
  - Secondary text: `#AABA7E` (void.300)
  - Muted text: `#8E9F5C` (void.400)

Contrast checks:
- void.50 (#F2F5E4) on void.900 (#141904): ≈16.8:1 ✓ (WCAG AA/AAA)
- void.300 (#AABA7E) on void.900: ≈9.2:1 ✓
- chartreuse.400 (#B8E000) on void.900: ≈13.3:1 ✓

### 2. Typography (chassis-derived)

- **Hero phrase rendering** — `display` token (Bebas Neue), `clamp(52px, 6.5vw, 96px)`. Phrase breaks across 3 lines: "DOMAIN EXPERTISE / HAS ALWAYS BEEN / THE REAL MOAT". Full canvas width with `padding: 0 4vw`. Lines justified left, flush to column rules. Line 3 "THE REAL MOAT" rendered in `chartreuse.400` (#B8E000); lines 1–2 in void.50. This is the masthead headline.
- **Section eyebrows** — Bebas Neue, 13px, `letterSpacing: widest` (0.15em), `chartreuse.400`. Used for "SELECTED WORK", "SIGNALS", "ABOUT", "CAPABILITIES", etc.
- **Body copy** — IBM Plex Sans, 16px, `lineHeight: normal` (1.5), `color: void.50`. No smaller than 14px anywhere.
- **Dateline/metadata** — IBM Plex Sans, 13px, `letterSpacing: wide`, void.300.
- **Line heights** — Hero: 0.9 (tight; Bebas Neue caps need no leading). Section headers: 1.1. Body: 1.5. Captions: 1.3.
- **Letter spacings** — Hero: `tight` (-0.04em, Bebas already tracks correctly). Body: `normal` (0). Eyebrows: `widest` (0.15em). Metadata: `wide` (0.06em).

### 3. Layout Specification

- **Archetype** — Broadsheet. The phrase is an editorial thesis, not a poster slogan — it demands density and proof around it. A newspaper broadsheet enacts the claim: a page packed with domain knowledge IS the moat, made visible.
- **CSS grid/flex structure**:
  ```css
  /* Masthead — full width */
  .masthead { display: flex; align-items: baseline; justify-content: space-between; padding: 16px 4vw 12px; border-bottom: 1px solid #B8E000; }
  
  /* Headline band — full width */
  .headline-band { padding: 32px 4vw 24px; border-bottom: 1px solid #404C18; }
  
  /* Content grid — 3 columns */
  .content-grid { display: grid; grid-template-columns: 1fr 1fr 300px; gap: 0; padding: 0 4vw; }
  
  /* Column rules */
  .col-main-1 { padding: 32px 32px 32px 0; border-right: 1px solid #404C18; }
  .col-main-2 { padding: 32px 32px 32px 32px; border-right: 1px solid #404C18; }
  .col-sidebar { padding: 32px 0 32px 32px; }
  ```
- **Major dimensions**:
  - Masthead height: 52px
  - Headline band height: auto (min ~180px for 3-line Bebas headline at 96px)
  - Content columns: min-height `60vh`
  - Max content width: `none` (full canvas, `padding: 0 4vw`)
  - Sidebar column: fixed `300px`
  - Section padding: `32px` between sections within columns
- **Nav placement** — embedded in masthead bar, full-width, left-side: `doug-march.com` in Bebas Neue 20px chartreuse; right-side: dateline + nav links (Work, About) in IBM Plex Sans 13px void.300. No sidebar nav, no bottom nav.
- **Hero phrase grid zone** — spans full canvas width (columns 1–3), in the dedicated headline band below masthead, above content grid. Left-aligned flush to 4vw padding. Target rendered height: ~200–240px at 1440px viewport (3 lines × ~80px leading).

### 4. Component Character

- **Border radius** — none (0) everywhere. A broadsheet has no rounded corners. Cards, tags, and buttons are all sharp rectangles. This is print register.
- **Border treatment** — ruled lines: `1px solid #B8E000` for primary rules (masthead bottom, major section dividers); `1px solid #404C18` (void.700) for column separators and card borders.
- **Shadow** — none. The broadsheet reads by contrast and rule lines, not elevation shadows.
- **Density** — compact. Content fills to ≥80% canvas utilization. Column gutters are tight (`32px` between column content, not between gutters). Section labels appear immediately above content, no large spacing gaps.
- **Interactive states** — links: underline appears on hover, color shifts from void.50 to `#B8E000`. Project cards: `background` shifts from void.800 to void.700 on hover. Transitions: `150ms ease`.

### 5. Signal Integration

- **Masthead bar (full-width, above headline)**: Left: `doug-march.com` in Bebas Neue 20px chartreuse. Center: `SUNDAY — MAY 31, 2026 — LAST DAY OF SPRING'S FINAL MONTH` in IBM Plex Sans 12px void.400, `letterSpacing: wider`. Right: `◉ FULL MOON 99.4%` in void.300 13px + nav links.
- **Headline kicker** (small text above the main headline): `HN TODAY — 605 PTS` in Bebas 13px chartreuse.400, `letterSpacing: widest`. Followed immediately by the 3-line headline.
- **Sidebar column — SIGNALS block**: Top of sidebar. Section eyebrow: "SIGNALS" in Bebas 13px chartreuse. Then tight rows:
  - `CHARLES SCHWAB CHALLENGE` — Eric Cole –12 / Ryan Gerard –11 / Mac Meissner –10. Scores in `#B8E000`. Names in void.50. Layout: `display: flex; justify-content: space-between`.
  - `DET TIGERS` — L 1–7 in void.300 with loss styled in void.400.
  - Thin rule `#404C18` between each row.
- **Quote treatment** — Dr. Seuss quote placed at bottom of sidebar column, set in IBM Plex Sans italic 14px void.300, preceded by a 2px left border in chartreuse.400. Attribution in Bebas 11px void.400 `letterSpacing: widest`. This is a pull quote, not the hero phrase.
- **Full moon** — `◉ FULL MOON 99.4%` in masthead, plus a small repeating motif in the sidebar: `●` glyph in chartreuse.400 at 18px beside the lunar section label.
- **HN story** — "Domain expertise has always been the real moat" IS the hero phrase. The attribution `— HACKER NEWS, 605 PTS` appears below the headline in IBM Plex Sans 13px void.400, flush left.
- **Music signals** (The War on Drugs, My Morning Jacket): listed in the sidebar under "NOW PLAYING" eyebrow in Bebas 13px chartreuse. Artist names in void.50 15px.

## Self-Check
1. Hero quotability: Yes — the phrase is independently circulating at 605 HN points, attributable to a real published essay, quotable and arguable in complete isolation from portfolio context.
2. Because-of chain: Yes — the phrase is a declarative editorial thesis → Broadsheet (only archetype that enacts the claim via density) → bebas-plex (Bebas Neue is newspaper editorial; IBM Plex Sans is workhorse body; "declarative" matches) → acid chartreuse on near-black (warning-sign register, not elegant, not gentle — matches the unapologetic confidence of the phrase) → newspaper grid with column rules (the medium proves the message).
3. Render feasibility: Yes — Bebas Neue at `clamp(52px, 6.5vw, 96px)` across a 1440px canvas with `8vw` total horizontal padding leaves ~1324px for type; "DOMAIN EXPERTISE" (16 chars) at Bebas's condensed ~0.55 char-width ratio at 96px ≈ 845px — comfortable in the left-aligned headline band without overflow.

## Rationale
The phrase "Domain expertise has always been the real moat" arrived at 605 Hacker News points today — more than twice the next story — which makes it the day's unambiguous intellectual signal. For a personal portfolio, the claim is perfect: it names the thing the page is trying to demonstrate. You don't need to explain it or contextualise it. It earns marquee scale because it is arguable, quotable, and applies directly to why someone would read this page. The Tigers lost 1–7, every major league is in offseason, and it's the last Sunday of May — the day feels like a reckoning moment, a line drawn at the end of a season before something new. The phrase carries that register.

The Broadsheet archetype was the only honest container. A Poster would make this look like a motivational wall print. A Specimen would make it a typography exercise. A Broadsheet makes it a front page — and a front page is the correct medium for a declarative editorial claim published on the day it matters. More than that, the broadsheet enacts the thesis: a page dense with signals, projects, work history, scores, and signals is itself a display of accumulated domain knowledge. The layout IS the moat. Bebas Neue + IBM Plex Sans (`bebas-plex`) maps perfectly to this: Bebas Neue is the typeface of newspaper mastheads, transit signage, and official declarations; IBM Plex Sans is the workhorse body face that says "this was written by someone who knows something."

The acid chartreuse palette at H:78° lands in the narrow open zone of the color mandate (65°–85°) and is genuinely surprising on a dark portfolio. But it earns its presence: chartreuse is the color of warning signs, of neon declarations, of things posted where you cannot look away. Against the near-black void neutral (barely tinted toward the same hue family, so the surfaces breathe), the #B8E000 accent at 13:1 contrast reads like a lit board. The phrase "THE REAL MOAT" in chartreuse on the third line of the headline is the chromatic equivalent of underlining — not decorative, emphatic. The full-moon signal at 99.4% finds its natural home in the masthead's right corner, glowing like a second accent without competing with the headline.
