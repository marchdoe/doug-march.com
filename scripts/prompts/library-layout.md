# Layout Reference Library

## Composition Archetypes

Each archetype defines HOW content is spatially organized. Pick one and commit. The archetype drives every layout decision — proportion, hierarchy, spacing, and interaction rhythm all flow from this choice.

**Avoid repeating the same archetype within a 3-day window.** Check the recent design log before selecting.

---

### 1. The Poster

One dominant element fills the viewport. Everything else is secondary, subordinate, or hidden until scrolled.

```
┌────────────────────────────────────────────┐
│                                            │
│          DOMINANT ELEMENT                  │
│          (fills 70-90% of viewport)        │
│                                            │
│  small: name · role · nav                 │
└────────────────────────────────────────────┘
  ↓ scroll reveals remaining content below
```

```css
/* Poster: hero dominates, content below fold */
.poster-layout {
  display: flex;
  flex-direction: column;
}
.poster-hero {
  min-height: 90vh;
  display: grid;
  place-items: center;        /* or align to a single axis */
}
.poster-secondary {
  font-size: 13px;
  opacity: 0.6;
  position: absolute;
  bottom: 24px;               /* anchored to corner or bottom edge */
}
.poster-body {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 96px 24px;
}
```

Best for: bold and declarative days, featuring one project above all others.

---

### 2. The Broadsheet

Dense, multi-column, type-driven. Everything present, nothing hidden. Hierarchy by size and column weight alone. The grid is strict. White space is minimal but intentional.

```
┌──────────────────────────────────────────────────┐
│  MASTHEAD (full width, compact)                  │
├────────────────┬──────────────┬───────────────────┤
│  PRIMARY       │  SECONDARY   │  TERTIARY         │
│  STORY         │  STORY       │  · item           │
│  (large type)  │  (mid type)  │  · item           │
│                │              │  · item           │
├────────────────┴──────┬───────┴───────────────────┤
│  WORK GRID             │  SIGNALS / SHORT ITEMS   │
└────────────────────────┴─────────────────────────┘
```

```css
/* Broadsheet: strict multi-column grid */
.broadsheet-layout {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;   /* or 3fr 2fr 1fr */
  gap: 1px;                              /* hairline gutters, not padding */
  max-width: 1200px;
  margin: 0 auto;
}
.broadsheet-masthead {
  grid-column: 1 / -1;
  padding: 16px 24px;
  border-bottom: 1px solid;
}
.broadsheet-primary { font-size: 28px; }
.broadsheet-secondary { font-size: 18px; }
.broadsheet-tertiary { font-size: 14px; }
/* Hierarchy is entirely in type size. Hairline rules separate zones. */
.broadsheet-zone { border-top: 1px solid; padding: 24px; }
```

Best for: information-rich days, journalistic or archival mood, lots to say.

---

### 3. The Gallery Wall

Asymmetric blocks. Nothing on a rigid grid. Items feel curated and placed by hand — varied in size, with deliberate whitespace between clusters. The irregularity is the design.

```
┌────────────────────────────────────────────────┐
│  name · role (top-left, small)                 │
│                                                │
│   ┌───────────────┐    ┌────────┐              │
│   │  large item   │    │  item  │  ┌────────┐  │
│   │               │    │        │  │  item  │  │
│   └───────────────┘    └────────┘  └────────┘  │
│                                                │
│        ┌──────────┐    ┌──────────────────┐    │
│        │  item    │    │  wide item       │    │
│        └──────────┘    └──────────────────┘    │
└────────────────────────────────────────────────┘
```

```css
/* Gallery Wall: manual placement, no two items the same */
.gallery-wall {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(80px, auto);
  gap: 24px;
  padding: 48px;
}
.gallery-item-large {
  grid-column: 1 / 6;
  grid-row: 1 / 4;
}
.gallery-item-medium {
  grid-column: 7 / 10;
  grid-row: 1 / 3;
}
.gallery-item-small {
  grid-column: 10 / 13;
  grid-row: 2 / 4;
}
/* No visible borders or card edges — items float on background */
/* Whitespace is uneven, grouped in clusters of 2-3 items */
```

Best for: showcasing visual work, creative/experimental days, variety and texture.

---

### 4. The Scroll

Single column. Vertical rhythm. Each section is a full beat — complete before the next begins. Pacing is cinematic: slow reveals, one idea at a time.

```
┌───────────────────────────────────────────┐
│  Section 1: Identity (full viewport)      │
├───────────────────────────────────────────┤
│  Section 2: Featured work (full viewport) │
├───────────────────────────────────────────┤
│  Section 3: Work index (auto height)      │
├───────────────────────────────────────────┤
│  Section 4: Signal / writing (auto)       │
├───────────────────────────────────────────┤
│  Section 5: Footer                        │
└───────────────────────────────────────────┘
```

```css
/* Scroll: single column, cinematic beats */
.scroll-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.scroll-beat-hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.scroll-beat-content {
  width: 100%;
  max-width: 720px;     /* 680-800px for optimal reading */
  padding: 96px 24px;
}
/* No sidebars. No grid columns. One axis only. */
/* scroll-margin-top for anchor snapping between sections */
.scroll-section { scroll-margin-top: 0; }
```

Best for: immersive, dramatic, one-thing-at-a-time pacing, deep features.

---

### 5. The Split

Two asymmetric halves create tension. One side anchors (navigation, identity, fixed context). The other scrolls (content, work, ideas). The proportions are never 50/50.

```
┌────────────────┬────────────────────────────────┐
│                │                                │
│  LEFT (fixed)  │  RIGHT (scrollable)            │
│  35-40%        │  60-65%                        │
│                │                                │
│  name          │  featured project              │
│  role          │  work list                     │
│  nav           │  experiments                   │
│  current date  │  writing                       │
│                │                                │
└────────────────┴────────────────────────────────┘
```

```css
/* Split: asymmetric fixed + scrollable panels */
.split-layout {
  display: grid;
  grid-template-columns: 38% 1fr;   /* never 50/50 */
  min-height: 100vh;
}
.split-left {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
  padding: 48px 32px;
}
.split-right {
  overflow-y: auto;
  padding: 48px 48px;
}
/* Dividing line: either a 1px border OR whitespace gap — not both */
/* Left typography: smaller, quieter. Right carries visual weight. */
```

Best for: persistent identity alongside deep content exploration.

---

### 6. The Stack

Full-width horizontal bands. Each band is a distinct, complete moment — different color, type treatment, or density. Pure vertical sequence of self-contained zones.

```
┌──────────────────────────────────────────────┐
│  BAND 1: Name / Hero (dark bg, large type)   │
├──────────────────────────────────────────────┤
│  BAND 2: Featured project (accent bg)        │
├──────────────────────────────────────────────┤
│  BAND 3: Work list (light bg, dense)         │
├──────────────────────────────────────────────┤
│  BAND 4: Writing / signal (mid bg, spare)    │
├──────────────────────────────────────────────┤
│  BAND 5: Footer / contact (dark bg)          │
└──────────────────────────────────────────────┘
```

```css
/* Stack: full-width bands with alternating treatments */
.stack-layout {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.stack-band {
  width: 100%;
  padding: 80px 48px;    /* 64-96px vertical */
}
.stack-band-inner {
  max-width: 1100px;
  margin: 0 auto;
}
/* Alternate band backgrounds: dark / light / accent / light / dark */
/* No card borders within bands — items sit directly on band background */
/* Navigation inline within hero band, not fixed */
```

Best for: content with natural sections, strong color palettes, maximum contrast between moments.

---

### 7. The Specimen

Typography is the design. Type at extreme scale — as texture, as image, as the primary visual element. One font family, pushed to its limits.

```
┌────────────────────────────────────────────────┐
│                                                │
│  DOUG                                          │
│  MARCH                                         │
│  ──────────────────────────────────            │
│  Designer × Developer × 2026                  │
│  ──────────────────────────────────            │
│  SELECTED WORK                                 │
│  ──────────────────────────────────            │
│  Spaceman          AI Experiment               │
│  Project Alpha     Untitled                    │
│  ──────────────────────────────────            │
│  about  ·  github  ·  email                   │
└────────────────────────────────────────────────┘
```

```css
/* Specimen: type is the entire visual system */
.specimen-layout {
  max-width: 1100px;
  margin: 0 auto;
  padding: 64px 48px;
}
.specimen-hero-type {
  font-size: clamp(80px, 15vw, 200px);
  line-height: 0.9;
  letter-spacing: -0.03em;
}
.specimen-body {
  font-size: 13px;           /* extreme size gap IS the hierarchy */
  line-height: 1.5;
}
.specimen-rule {
  border-top: 1px solid;     /* type and lines only, no shapes */
  margin: 32px 0;
}
/* Monochromatic color. Avoid images. */
```

Best for: exceptional font choices, tight work lists, quiet precision or brutal declaration.

---

### 8. The Index

Everything is a list. Dense, systematic, programmatic. The aesthetic is the data. No hero images, no featured treatments — every item equal weight, differentiated only by metadata.

```
┌────────────────────────────────────────────────────────┐
│  Doug March — Designer & Developer              [date] │
├───────────────────────────────────────────────────────┤
│  WORK                                                  │
│  001  Spaceman            2024  Design, Dev   →        │
│  002  Project Alpha       2024  Strategy      →        │
│  003  AI Experiment       2024  AI, Design    →        │
├───────────────────────────────────────────────────────┤
│  EXPERIMENTS                                           │
│  E01  Three.js canvas     ongoing              →       │
│  E02  Type specimen       complete             →       │
└───────────────────────────────────────────────────────┘
```

```css
/* Index: database aesthetic, every row equal */
.index-layout {
  max-width: 900px;
  margin: 0 auto;
  padding: 48px 24px;
}
.index-row {
  display: grid;
  grid-template-columns: auto 1fr auto auto auto;
  align-items: center;
  height: 44px;             /* every row identical height */
  border-bottom: 1px solid rgba(128, 128, 128, 0.15);
}
.index-row:hover {
  background: rgba(128, 128, 128, 0.08);   /* full-row highlight */
}
.index-number {
  font-variant-numeric: tabular-nums;       /* monospaced numbers */
  font-family: monospace;
  opacity: 0.5;
}
/* No images anywhere. Rows feel continuous, not chopped. */
```

Best for: lots of work to show, systematic/archival mood, engineering-forward energy.

---

## Spacing System

Use an 8px base grid. Every measurement is a multiple of 8:

| Token | Value | Use for |
|-------|-------|---------|
| 1 | 4px | Tight gaps (icon to label) |
| 2 | 8px | Related items within a group |
| 3 | 12px | Internal card padding |
| 4 | 16px | Standard element spacing |
| 5 | 24px | Section sub-gaps |
| 6 | 32px | Between content groups |
| 8 | 48px | Major section breaks |
| 10 | 64px | Page-level breathing room |
| 12 | 96px | Hero/section top padding |

**Rule: Spacing between unrelated things should be 2-3x the spacing between related things.**

## Proportion Rules

- **Max content width: 1080-1200px.** Wider feels sprawling.
- **Sidebar width: 180-280px.** Narrower than 180 is cramped; wider than 280 competes with content.
- **Card grid: 2-4 columns.** More than 4 makes cards too small.
- **Hero section: 50-80vh.** Less than 50 feels like a header; more than 80 feels like a barrier.
- **Body text measure: 55-75 characters per line.** Set max-width on text containers.
