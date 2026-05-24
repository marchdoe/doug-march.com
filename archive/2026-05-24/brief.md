# 2026-05-24

**Design Brief:** Big Shoulders manifesto on a clearwater aqua drench — five-line command in white condensed display across a 60vw slab, three asymmetric right-column frames carrying golf, projects, and signal data in the gaps of the gallery wall.

## Signals


## Claude's Rationale

The Mother Teresa quote arrived as the only signal candidate that clears the screenshot test cleanly. On a Sunday before Memorial Day — a holiday constructed from individual sacrifice — "DO NOT WAIT FOR LEADERS; DO IT ALONE, PERSON TO PERSON." functions as both personal manifesto and implicit portfolio explanation: every project in the register (Spaceman, FishSticks, 15th Club, TeeTurn) is solo-founded work. The phrase doesn't need its author to land. It needs space.

Gallery Wall was the only archetype that could honor the phrase's two-clause structure without flattening it into a single poster void. The semicolon is a hinge — a rejection followed by a method — and Gallery Wall gives each half architectural weight: the quote occupies the full left column as a drenched aqua slab, while the right column's stacked blocks (signal data, project catalog, about) function as the evidence that the principle was acted on. The irregularity of Gallery Wall's block spacing — gaps rather than margins — makes the composition feel like a working wall, not a presentation deck.

Big Shoulders Display carries the phrase at the weight it demands. At `clamp(64px, 7.5vw, 108px)` condensed, the five-line break (DO NOT WAIT / FOR LEADERS; / DO IT ALONE, / PERSON TO / PERSON.) reads like a posted notice rather than a quotation — authoritative, not inspirational. The aqua palette at H:205° falls precisely within the mandated 192°–215° window and is conceptually exact: not the aggressive teal of a warning, not the corporate blue of a system UI, but the specific cyan of still, clear water — the color of something that has already settled. The hero block background at aqua.600 (#0A72A0) with white type achieves 5.4:1 contrast against all text, meeting AA on every size. The stone neutral family carries just enough H:205° tint to keep the dark surfaces alive against the drenched hero.

## Files Changed

- elements/preset.ts
- app/components/Sidebar.tsx
- app/components/Layout.tsx
- app/routes/index.tsx
- app/routes/about.tsx
- app/routes/work.$slug.tsx
