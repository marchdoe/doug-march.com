# Variance Sources — Widening the Nightly Design Pipeline's Built-In Variance

**Goal:** Widen three fixed sources of sameness in the daily redesign pipeline — a 5-chassis catalog dominated by condensed-caps display faces, a single fixed aesthetic reference per archetype, and a constant risk weight — without touching the render pipeline, the critic gates, or the file-write allowlist.

**Audit findings this addresses:**
1. 3 of 5 chassis (`big-shoulders-atkinson`, `anton-inter-tight`, `bebas-plex`) are condensed-caps display faces — a visible monoculture recurring every ~4-5 days.
2. Every archetype has exactly one fixed aesthetic seed (e.g. every Poster day sees the same Tesla/SpaceX reference).
3. `WEIGHT_RISK` defaults to a constant `8` when unset, producing the same "BOLD" prompt sentence every day.

**Branch:** `feat/variance-sources` off `origin/main`.

---

## Part 1: Chassis catalog, 5 → 10

Added five chassis to `elements/chassis/`, each chosen specifically to NOT be condensed caps, registered in `CHASSIS_CATALOG` (`elements/chassis/index.js`):

| id | pairing | ratio | archetypes |
|---|---|---|---|
| `fraunces-karla` | Fraunces (fat/soft display serif) + Karla | 1.500 | Gallery Wall, Stack, Broadsheet |
| `dm-serif-public` | DM Serif Display (didone) + Public Sans | 1.618 | Poster, Specimen, Gallery Wall |
| `zilla-worksans` | Zilla Slab + Work Sans | 1.333 | Broadsheet, Index, Stack |
| `space-mono-archivo` | Space Mono (mono-display) + Archivo | 1.500 | Specimen, Index, Split |
| `unbounded-figtree` | Unbounded (wide/expanded grotesk) + Figtree | 1.500 | Poster, Specimen, Gallery Wall |

Condensed-caps share of the catalog drops from 3-of-5 to 3-of-10. Every `family:weights` combination was verified live against `fonts.googleapis.com/css2` (200 response) before being committed, including the combined multi-family URL each chassis actually builds via `buildGoogleFontsUrl`.

`dm-serif-public` deliberately avoids recreating the retired `playfair-outfit` chassis — it pairs DM Serif Display (not Playfair) with Public Sans (not Outfit).

Two of the five new families (Fraunces, Space Mono) and one existing family (DM Serif Display was considered and rejected in favor of it directly — see below) appear on the `impeccable` skill's reflex-reject list (a guard against reaching for training-data-default fonts in *freeform* generative design). That guard doesn't transfer cleanly to this catalog: the chassis list is a fixed menu the Art Director *picks from*, not a freeform default it *reaches for* — documented per-file in each new chassis's header comment.

`scripts/prompts/art-director.md` (chassis-selection rule) and `scripts/prompts/spec-critic.md` (render-feasibility check) both hardcoded the old 5-id list; both were updated to reference the full 10-id catalog so the new chassis are actually reachable and validated correctly.

No code hardcodes a catalog size of 5, and `scripts/utils/file-manager.js`'s write allowlist already excludes `elements/` by prefix (chassis files are edited here as a human-authored PR, not a nightly AI write) — confirmed nothing needed to change there.

---

## Part 2: Multi-lane seeds

Restructured all 8 files in `scripts/prompts/seeds/` to hold 2-3 delimited **lanes** — distinct aesthetic references for the same archetype:

| Archetype | Lanes |
|---|---|
| Poster | Tesla/SpaceX · Swiss International Style · Psychedelic gig-poster |
| Broadsheet | WIRED · The Economist |
| Specimen | Vercel/Geist · Independent type-foundry specimen |
| Split | Framer/Stripe · Vibrant gradient-blob split |
| Scroll | Apple · Kinetic sport scroll |
| Index | Linear · Warm-paper collector's catalog |
| Gallery Wall | Pinterest · Black-canvas portfolio grid |
| Stack | Notion/Mintlify · Bold saturated stack |

Lanes are delimited with `<!-- LANE:id -->` … `<!-- /LANE -->` HTML comments (`scripts/utils/select-seed.js`, `parseSeedLanes`). `selectLaneIndex(archetype, date, laneCount)` hashes `"date:archetype"` (via the new `scripts/utils/deterministic-hash.js`, FNV-1a) into `[0, laneCount)` — same date+archetype always resolves to the same lane (reproducible re-runs); different dates spread across lanes (verified: 30-day sample across all 8 archetypes lands within a 14-16 / 16-14 split for 2-lane files, 9-11 / 9-10-11 for Poster's 3 lanes).

`selectSeedContent(archetype, date)` reads the seed file, picks the lane, and assembles `header + chosen lane + shared footer` — only the picked lane's text is ever injected into the mockup-designer prompt. Measured injected size across all 8 archetypes: 8-13% larger than the pre-lane single-seed files (was one lane's worth of content; still is), not the 2-3x a naive "inject all lanes" implementation would have produced.

The "This is one lane, deviate freely" escape-clause footer is preserved verbatim and shared across all lanes in a file.

`scripts/design-agents.js`'s seed-injection call site (`selectSeed` → `selectSeedContent`) and `tests/select-seed.test.js` (lane parsing, index determinism, distribution, reproducibility) were both updated. `scripts/prompts/seeds/README.md` now documents the lane structure instead of one exemplar per archetype.

---

## Part 3: Risk becomes a dial again

**Date-derived fallback.** `resolveRiskWeight(envValue, date)` (`scripts/design-agents.js`) replaces the constant `'8'` fallback: an explicitly-set `WEIGHT_RISK` (including `'0'`, which is falsy in JS but not "unset") always wins; otherwise risk is derived via `hashToRange('risk:' + date, 3, 10)` — reproducible per day, varied across days (verified: 12-month sample spread across the full 3-10 range).

`.github/workflows/daily-redesign.yml`'s `WEIGHT_RISK` env line changes its fallback from `'8'` to `''` — `vars.WEIGHT_RISK == '' && '' || vars.WEIGHT_RISK` — preserving the same empty-check idiom as the other three `WEIGHT_*` lines so a repo var the owner panel actually sets still wins; only the constant fallback becomes "flow through as absent."

**Four risk buckets, not three.** `describeRiskTier(risk)` now produces a distinct sentence for 3-4 / 5-6 / 7-8 / 9-10 (previously: `<=3`, `>=7` fired for everything through 10, and an implicit 4-6 "Balanced" middle — the old `8` default landed in the `>=7` bucket every single day).

**Max-Risk License, with a scope change from the original brief.** The brief's suggested max-risk deviation was "propose a novel archetype outside the list of 8." Investigating `scripts/agents/art-director.js` (`ARCHETYPE_NAMES.has(parsed.archetype)` check, ~line 89) found this isn't just discarded like an out-of-catalog chassis pick — it's a hard validation gate that **throws and fails the run** if the Art Director's `===ARCHETYPE===` block doesn't exactly match one of the 8 canonical names. A "custom Google Fonts pairing outside the chassis catalog" fails the same way the brief anticipated (`chassis-preset.ts` is listed last in `panda.config.ts` specifically so it always overrides `preset.ts` font tokens, and an unrecognized chassis id falls back to `CHASSIS_CATALOG[0]`).

Since neither of the brief's two suggested deviations survives the pipeline, the Max-Risk License (`scripts/prompts/art-director.md`, new `## Max-Risk License` section) licenses a third, pipeline-safe deviation instead: **breaking exactly ONE named anti-pattern from the day's chosen seed lane**, with required justification. This gives risk ≥9 real teeth (a legible, bounded rule-break) without requiring a change to the archetype validator or the chassis-preset override — both out of scope for this PR. Loosening the archetype gate to accept a genuinely novel archetype is a reasonable follow-up if a human decides the pipeline should support it; it wasn't attempted here since it touches validation and downstream layout assumptions well beyond `art-director.md`.

---

## Verification

- `pnpm test` — 416/416 passing (62 files), including new/updated: `tests/deterministic-hash.test.js`, `tests/select-seed.test.js` (lane parsing + determinism + distribution), `tests/scripts/design-agents.test.js` (`describeRiskTier`, `resolveRiskWeight`).
- `pnpm lint` — clean (0 errors; warning count +1 over baseline, `noAssignInExpressions` in `select-seed.js`'s `while ((match = LANE_PATTERN.exec(...)) !== null)` loop, the same idiom already used and tolerated in `extractArchetypeFromText` elsewhere in `design-agents.js`).
- `pnpm typecheck` — clean.
- `node --check` on every touched/added `.js` file — clean.
- Chassis smoke test — `CHASSIS_CATALOG.length === 10`, every entry has all required fields, `buildGoogleFontsUrl` produces an `https://fonts.googleapis.com` URL with no unencoded spaces for all 10 entries, and every new chassis's live Google Fonts URL (single-family and the actual combined multi-family request) returns HTTP 200.

## Files touched

**New:** `elements/chassis/fraunces-karla.js`, `dm-serif-public.js`, `zilla-worksans.js`, `space-mono-archivo.js`, `unbounded-figtree.js`; `scripts/utils/deterministic-hash.js`; `tests/deterministic-hash.test.js`.

**Modified:** `elements/chassis/index.js`; `scripts/utils/select-seed.js`; `scripts/prompts/seeds/{poster,broadsheet,specimen,split,scroll,index,gallery-wall,stack,README}.md`; `scripts/prompts/art-director.md`; `scripts/prompts/spec-critic.md`; `scripts/design-agents.js` (weights block + seed-injection call site); `.github/workflows/daily-redesign.yml`; `tests/select-seed.test.js`; `tests/scripts/design-agents.test.js`.
