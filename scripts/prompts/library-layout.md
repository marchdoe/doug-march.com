# Layout Reference Library

## Composition Patterns

Each pattern defines HOW content is spatially organized. Pick one and commit.

### The Magazine
```
┌────────────────────────────────────────────┐
│  MASTHEAD: name + nav (full width)         │
├────────────────────────────────────────────┤
│                                            │
│  HERO: Featured project, full bleed        │
│  (60-80vh, single focus)                   │
│                                            │
├──────────────────────┬─────────────────────┤
│  MAIN COLUMN (65%)   │  SIDEBAR (35%)      │
│  Selected work       │  Signals, quotes,   │
│  Experiments         │  editorial elements  │
│                      │                     │
└──────────────────────┴─────────────────────┘
```
Best for: editorial, content-rich, storytelling days.

### The Gallery
```
┌──────────┬─────────────────────────────────┐
│  NAV     │  CONTENT                        │
│  (200px) │                                 │
│  fixed   │  ┌──────┐ ┌──────┐ ┌──────┐   │
│  left    │  │ card │ │ card │ │ card │   │
│          │  └──────┘ └──────┘ └──────┘   │
│  name    │  ┌──────┐ ┌──────┐            │
│  role    │  │ card │ │ card │            │
│  links   │  └──────┘ └──────┘            │
└──────────┴─────────────────────────────────┘
```
Best for: visual, grid-based, showing many items at once.

### The Scroll
```
┌────────────────────────────────────────────┐
│  Section 1: Name + role (100vh)            │
├────────────────────────────────────────────┤
│  Section 2: Featured project (100vh)       │
├────────────────────────────────────────────┤
│  Section 3: Selected work (auto height)    │
├────────────────────────────────────────────┤
│  Section 4: Signals + editorial (auto)     │
├────────────────────────────────────────────┤
│  Section 5: Footer nav                     │
└────────────────────────────────────────────┘
```
Best for: immersive, dramatic, one-thing-at-a-time pacing.

### The Dashboard
```
┌────────────────────────────────────────────┐
│  TOP BAR: name + nav                       │
├──────┬──────┬──────┬───────────────────────┤
│ stat │ stat │ stat │  Featured project     │
├──────┴──────┴──────┤  (large card)         │
│  Work grid         │                       │
│  (compact rows)    │                       │
│                    │                       │
└────────────────────┴───────────────────────┘
```
Best for: data-dense, structured, weekday energy.

### The Minimal
```


                    Doug March
                    Designer & Developer

                    ─

                    Featured: Spaceman
                    problem statement here...

                    ─

                    Work
                    · Project Alpha, 2024
                    · AI Experiment, 2024

                    ─

                    about · github · email


```
Best for: sparse, quiet, atmospheric, new-moon energy.

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
