# Archetype Seeds

**Superseded by `scripts/prompts/lanes/`** (composition-grammar arc, Task 3)
— still the live path until Task 4 rewires `design-agents.js`'s call site
from `select-seed.js` to `select-lane.js`. Do not add a ninth seed file or a
new lane here; add it to `lanes/` instead.

Concrete anchor references for the mockup-designer prompt. Each file holds 2-3 **lanes** — distinct aesthetic references for the same archetype. `scripts/utils/select-seed.js` deterministically picks one lane per day (hashed from the build date + archetype, so a given day always re-derives the same lane) and injects only that lane's content, replacing the `<!-- SEED_ANCHOR -->` marker in `mockup-designer.md`. The other lanes stay on disk, unread, until their date comes up.

Seeds are **anchors, not templates**. The designer borrows rigor, restraint, and character — it does not copy tokens, fonts, or layouts verbatim. Today's signals and brief always override the seed where they conflict.

## Archetype → lanes

| Archetype | Seed file | Lanes | Character |
|---|---|---|---|
| Poster | `poster.md` | Tesla/SpaceX · Swiss International Style · Psychedelic gig-poster | Radical subtraction / grid rigor / maximalist ornament |
| Broadsheet | `broadsheet.md` | WIRED · The Economist | Paper-white columnar density / data-driven editorial confidence |
| Specimen | `specimen.md` | Vercel/Geist · Independent type-foundry specimen | Black-and-white dev precision / warm-paper foundry annotation |
| Split | `split.md` | Framer/Stripe · Vibrant gradient-blob split | Structural corporate tension / playful consumer-app energy |
| Scroll | `scroll.md` | Apple · Kinetic sport scroll | Near-monochrome cinematic verticality / high-contrast color-block motion |
| Index | `index.md` | Linear · Warm-paper collector's catalog | Dark keyboard-first app density / unhurried paper ledger |
| Gallery Wall | `gallery-wall.md` | Pinterest · Black-canvas portfolio grid | Light masonry mosaic / dark regular-grid case-study presentation |
| Stack | `stack.md` | Notion/Mintlify · Bold saturated stack | Soft warm minimalism / chunky high-saturation color blocking |

Each seed file's lanes are delimited with HTML comments (`<!-- LANE:id -->` … `<!-- /LANE -->`), parsed by `scripts/utils/select-seed.js`. See `parseSeedLanes` and `selectSeedContent` there for the extraction logic, and `tests/select-seed.test.js` for the reproducibility guarantees (same date+archetype → same lane; different dates → distributes across lanes).

## Licensing

Paraphrased from publicly-known brand and genre characteristics, inspired in structure by VoltAgent/awesome-design-md (MIT). No DESIGN.md files are copied verbatim; tokens here are opinionated approximations for use as design anchors only. Lanes referencing historical movements (Swiss International Style, 1960s gig-poster tradition) or platform genres (portfolio grids, collector's catalogs) describe general, long-established style characteristics rather than any specific living brand or copyrighted work.
