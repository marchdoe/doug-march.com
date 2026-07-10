# Signals Brief — 2026-07-02

## Hero Copy
Google ships the malware.

## Hero Rationale
The top Hacker News story (638 points — nearly double the second-place story) is an F-Droid advisory documenting Android malware distributed by Google itself. Five words, a period, no explanation needed. For a portfolio site built by a maker in the exact ecosystem being indicted, the phrase lands simultaneously as accusation, punchline, and reminder that the infrastructure everyone trusts is just another thing someone built. It passes the screenshot test cold: it demands no context, supplies its own irony, and is quotable in isolation as a genuine claim.

## Archetype
Broadsheet

## Chassis
spectral-albert

## Visual Specification
### 1. Color Specification

- **Primary hue:** H:72° (acid chartreuse) — mandatory compliance with the sole open corridor (52°–87° after eliminating all recent builds); chartreuse reads as hazard-tape, biohazard marker, terminal-printout warning, which is precisely the register of a trusted platform shipping malware.
- **Neutral palette:** dark void-moss scale, every value carries a whisper of chartreuse chroma to maintain subconscious cohesion:
  - 50: `#F4F4EC`
  - 100: `#E8E9DB`
  - 200: `#D0D1C4`
  - 300: `#A8A99D`
  - 400: `#7A7B71`
  - 500: `#585950`
  - 600: `#3E3F37`
  - 700: `#2A2B23`
  - 800: `#1A1B13`
  - 900: `#0A0B06`
- **Accent color:** light: `#CCDB10` / default: `#C2D400` / dark: `#A4B300` / glow: `0 0 18px rgba(194, 212, 0, 0.35)`
- **Secondary accent:** none — chartreuse carries everything; a second accent would dilute the alarm
- **Background:** page bg `#0A0B06` (neutral.900), card bg `#1A1B13` (neutral.800), column divider surface `#0F0F0A`
- **Text colors:** primary `#F4F4EC`, secondary `#A8A99D`, muted `#7A7B71`

### 2. Typography

- **Hero phrase rendering:** Spectral Display (chassis `display` token), `clamp(3.5rem, 6vw, 7.5rem)`, weight 700, color `#C2D400` (accent). Rendered as a single unbroken line spanning the full printable width of the hero zone (columns 1–12, inside 4vw side padding). Overline above it: `INCIDENT — HN #1 — 638 PTS` in Albert Sans, 11px, letter-spacing 0.12em, all-caps, color neutral.400.
- **Section subheadings:** Spectral Display at `clamp(1.1rem, 2vw, 1.5rem)`, weight 600, color neutral.50; eyebrow in Albert Sans caps at 10px above each column heading.
- **Body text:** Albert Sans Regular at 14–15px, line-height 1.55, color neutral.200.
- **Line heights:** hero 0.88, subheads 1.1, body 1.55, captions 1.4, masthead line 1.0.
- **Letter spacings:** hero `-0.02em`, subheads `-0.01em`, body `0em`, all-caps labels `0.1em`, overline `0.12em`.

### 3. Layout Specification

- **Archetype:** Broadsheet — the phrase is a newspaper headline: declarative, a finding with public consequence, front-page gravity. Broadsheet's newspaper density lets the headline dominate a packed canvas while today's other signals (Tigers, golf, July 4th, remaining HN stories) fill columns like a real incident paper.
- **CSS structure:**
  - Outermost wrapper: `max-width: none; padding: 0 4vw;`
  - `.masthead`: `display: flex; justify-content: space-between; align-items: baseline; padding: 14px 0; border-bottom: 1px solid #2A2B23;`
  - `.hero-zone`: `padding: 40px 0 28px; border-bottom: 2px solid #C2D400;`
  - `.content-grid`: `display: grid; grid-template-columns: 2fr 1.5fr 1fr; border-top: none;`
  - Each column: `padding: 28px 20px; border-right: 1px solid #2A2B23;` (last child no right border)
  - Footer strip: `display: flex; justify-content: space-between; padding: 16px 0; border-top: 1px solid #2A2B23; font-size: 11px;`
- **Major dimensions:**
  - Masthead: ~48px tall
  - Hero zone: natural height (no forced height) — headline at `clamp(3.5rem, 6vw, 7.5rem)` + overline + byline ≈ 130–170px
  - Content columns: `min-height: 55vh`
  - Side padding: `4vw` (never exceeds 64px on very wide viewports via `min(4vw, 64px)`)
  - Max content width: `none`
  - Column gap: `0` (borders serve as visual dividers)
- **Nav placement:** Right side of masthead — five items in Albert Sans, 12px, letter-spacing 0.08em, uppercase, color neutral.400; hover → chartreuse accent
- **Hero phrase grid zone:** Full-width span within `.hero-zone`, below masthead. The overline sits 12px above the headline. Below the headline: a dateline — `THURSDAY 02 JULY 2026 — DOUG MARCH` in Albert Sans 11px, neutral.500, letter-spacing 0.08em.

### 4. Component Character

- **Border radius:** `0` for all columns, dividers, masthead; `2px` for score badges and tags
- **Border treatment:** `1px solid #2A2B23` (neutral.700) for all column dividers and masthead rule; `2px solid #C2D400` (accent) for the rule immediately beneath the hero headline — the single moment chartreuse bleeds into structure
- **Shadow:** none — flat, newspaper-exact; no elevation trickery
- **Density:** maximum — column content packed from top to bottom; 12–14px leading in captions; multi-item lists; no decorative gaps
- **Interactive states:** project titles → underline + chartreuse on hover; nav links → chartreuse; column headings → cursor-pointer with subtle chartreuse left-border reveal (3px); all transitions 120ms ease

### 5. Signal Integration

- **Signal elements live in:** column 3 (right-most, narrowest), masthead eyebrow, and footer strip
- **Sports:** Detroit Tigers — `DET 6 · 2` in Spectral Display at 1.6rem, chartreuse, inside a ruled box in column 3; label above: `MLB · 01 JUL` in Albert Sans caps
- **Independence Day countdown:** masthead far-right chip — `T–2: INDEPENDENCE DAY` in Albert Sans 10px, letter-spacing 0.12em, chartreuse, replaces the date in the masthead's right cluster
- **HN top story is the hero phrase** — documented as "INCIDENT — HN #1 — 638 PTS" overline; the secondary HN stories ("The Fall of the Theorem Economy", "Oomwoo robot vacuum") appear as column-3 briefs beneath the Tigers block, set in Spectral 14px italic
- **No signals.quote today** — the HN headline is the found object
- **Lunar phase:** footer strip — `WANING GIBBOUS · 89%` in 11px Albert Sans caps, neutral.400
- **Music:** footer strip — `WET LEG · MY MORNING JACKET` in 11px, neutral.500
- **Golf:** `JOHN DEERE CLASSIC · SCHEDULED` in column 3 at 12px Albert Sans, neutral.400
- Every signal has a concrete slot; none share a zone with the hero phrase

## Self-Check
1. Hero quotability: Yes — "Google ships the malware." is five words, a complete declarative sentence, earned by a 638-point HN incident advisory; would be screenshotted as an accusation regardless of context.
2. Because-of chain: Yes — the phrase is a newspaper headline, so Broadsheet; a newspaper headline in a dark-warning register needs Spectral's journalistic slab authority not shouting-sports condensed; the only open palette corridor (H:52°–87°) resolves to acid chartreuse which is hazard-tape / terminal-warning, exactly the phrase's tone; multi-column density serves the phrase by surrounding it with the kind of packed incident-report content that legitimizes "shipping malware" as today's front page.
3. Render feasibility: Yes — Spectral Display at clamp(3.5rem, 6vw, 7.5rem) renders "Google ships the malware." as a single-line headline (approximately 670px at 6vw on 1440px) comfortably within the full-width hero zone; Spectral loads from fonts.googleapis.com reliably; no overflow risk at 1440×900.

## Rationale
The hero phrase arrived as found text, not composed: F-Droid's advisory about Android malware sourced from Google landed at 638 HN points — nearly double the next story — and the only edit required was compression. "Google ships the malware." is five words, a period, and a complete thought that works simultaneously as accusation, wry observation, and invitation. For a portfolio built by someone who ships software, it reads with an extra layer of quiet self-implication.

The Broadsheet archetype followed directly from the phrase's register. This is a newspaper headline: a finding with public consequence, delivered flat, expecting the reader to complete the implications. Broadsheet's multi-column density, masthead structure, and column-divider rule system create a genuine incident-report aesthetic rather than a brand gesture. Spectral, the only chassis in the catalog explicitly tagged for Broadsheet, is a transitional slab-serif typeface with journalistic authority — it gives the headline weight without the athletic bluster of Anton or Big Shoulders. At `clamp(3.5rem, 6vw, 7.5rem)`, the five-word phrase renders as a single commanding line across the full-width hero zone.

The color mandate resolved to 52°–87° — the sole open corridor after six consecutive builds. H:72° (acid chartreuse) is not a neutral compliance choice: chartreuse is the exact hue of hazard tape, biohazard markers, and terminal-printout warnings. On a near-void dark background (`#0A0B06`), the headline in `#C2D400` achieves approximately 11.9:1 contrast — the green appears to emit, not reflect, which is precisely the alarm-state the story demands. The void-moss neutrals carry a whisper of chartreuse chroma through every surface, binding the incident-paper aesthetic without competing with the single dominant accent.
