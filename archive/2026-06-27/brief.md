# 2026-06-27

**Design Brief:** TV-indigo void — "well-viewed." split across two lines at 18vw, weight 400 in ghosted secondary and weight 900 in full white, the hyphen as hinge between qualifier and punchline, the word Lily Tomlin invented finally given a poster.

## Signals


## Claude's Rationale

The hero phrase arrived from a single word Lily Tomlin invented to expose a cultural double standard: "well-read" is a compliment, but "well-viewed" doesn't exist as a word, and that absence is the argument. The phrase passes the poster test in isolation — it demands context the page doesn't provide, which makes a viewer do the work. That act of completing the thought is the user's first engagement with the site, and it's more memorable than any project description.

The Poster archetype is the only honest container for a phrase this formally minimal. The design is a two-line typographic statement where the same font at two different weights and two different values of the same color performs the Tomlin logic without text: "well-" in weight 400 and secondary color is the qualifier, lighter because it depends on what follows; "viewed." in weight 900 and near-white is the coined punchline, heavier because it carries the whole argument. The hinge point is the hyphen connecting them — the break between lines enacts the same beat as the pause before Tomlin's delivery. Bricolage Grotesque's variable weight range (200–900 in the same family) is the only chassis in the catalog that can execute this 400/900 split with the warmth the source material needs; Anton or Big Shoulders would turn wit into a sports declaration.

Television-screen indigo at H:243° is not a metaphor — it is the literal color of a cathode-ray tube in a dark room, which is precisely where Tomlin's observation happens. It falls inside the mandate's only open corridor (230°–255°, the last unvisited zone after seven builds). Against the near-void page background `#070B1C`, the accent `#7179F0` achieves 5:1 contrast (WCAG AA all sizes), the primary text `#F0F1FF` achieves 18:1, and the secondary text `#B2B4D0` achieves 10:1 — no compromises. The signal strip at the bottom surfaces what matters today — Tigers 8–0 shutout in accent blue, Scheffler at −16 in accent-light, full moon in secondary, Independence Day countdown in muted — without competing with the phrase above. Everything that is not the phrase knows it is not the phrase.

## Files Changed

- elements/preset.ts
- app/components/Sidebar.tsx
- app/components/Layout.tsx
- app/routes/index.tsx
- app/routes/about.tsx
- app/routes/work.$slug.tsx
