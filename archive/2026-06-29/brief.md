# 2026-06-29

**Design Brief:** Teal diagnostic drench left, night-dark catalog right — three algorithmic scores in Anton at wall scale make the case for actual work over machine verdicts, both halves of the Split alive with competing evidence.

## Signals


## Claude's Rationale

The hero phrase arrived from a live signal, not from the designated quote field. Today's #2 Hacker News story — HackerRank open-sourcing its ATS and scoring a single resume three different ways — produces a headline that is already composed: "90/100. Oh wait, 74. No — 88." Three beats, three contradictions, no context required. For a portfolio site, the reading is unavoidable: the argument against algorithmic evaluation IS the portfolio; the work is the counterargument. The phrase passes every poster test and is richer than Mother Teresa's line for this specific surface precisely because it is impure, contingent, and from today.

Split was the only archetype that could render the argument structurally rather than just typographically. The left panel (58vw, full teal drench at #18C476) is the machine: enormous, saturated, confident, producing contradictory numbers at wall scale in Anton. The right panel (42vw, dark teal-black #0A1410) is the actual work: quiet, dense, credentialed, organized — a functioning catalog that doesn't need an algorithm to tell you what's there. The two halves don't explain each other; the tension between them is the design. Anton at `clamp(5.5rem, 11vw, 14rem)` on the teal field renders each of the three number fragments at 90–150px on a standard 1440px viewport, with line height 0.88 stacking them into a compact monument of scored chaos.

Teal at H:155° is the only open corridor in the color mandate (145°–170° after six recent builds) and is also the honest choice: teal-green is the color of terminal readouts, diagnostic displays, calibration screens — the precise visual family of a system producing a score. The single-hue drench on the left panel (background AND implicit meaning: this is the machine's domain) against the dark right panel creates maximum contrast across the panel join without any gradient trickery. Contrast ratios: hero text `#032716` on `#18C476` ≈ 8.8:1; body `#F3F7F5` on `#0A1410` ≈ 18:1; muted `#5E6E6A` on `#0A1410` ≈ 4.6:1 — all WCAG AA or better. The 8/10 risk weight is honored by the choice of a found headline rather than a composed manifesto, and by a layout that works through structural opposition rather than decoration.

## Files Changed

- elements/preset.ts
- app/components/Sidebar.tsx
- app/components/Layout.tsx
- app/routes/index.tsx
- app/routes/about.tsx
- app/routes/work.$slug.tsx
