import { bricolageManrope } from './bricolage-manrope.js'
import { spectralAlbert } from './spectral-albert.js'
import { bigShouldersAtkinson } from './big-shoulders-atkinson.js'
import { antonInterTight } from './anton-inter-tight.js'
import { bebasPlex } from './bebas-plex.js'
import { fraucesKarla } from './fraunces-karla.js'
import { dmSerifPublic } from './dm-serif-public.js'
import { zillaWorksans } from './zilla-worksans.js'
import { spaceMonoArchivo } from './space-mono-archivo.js'
import { unboundedFigtree } from './unbounded-figtree.js'
import { anybodyFranklin } from './anybody-franklin.js'
import { sourceSerifText } from './source-serif-text.js'
import { bitterMulish } from './bitter-mulish.js'
import { hankenSolo } from './hanken-solo.js'
import { alfaRubik } from './alfa-rubik.js'

/**
 * Curated chassis catalog. Each entry is a hand-vetted typography decision
 * — fonts, weights, italics, and a full type system (step table, weights
 * map, rhythm). The Art Director picks one per day to carry the chosen
 * hero phrase at the intended scale.
 *
 * v2 scope (2026-04-29): culled to display-grade only. Removed
 * `schibsted-anonymous` and `jetbrains-mono-only` — both ratio 1.250
 * (body-scale), which locked Index/Split days into typography that
 * couldn't carry poster-scale heads. Replaced with `anton-inter-tight`
 * and `bebas-plex`, both ratio 1.500 (display-grade).
 *
 * v3 scope (2026-08-23): a variance audit found 3 of the v2 catalog's 5
 * chassis were condensed-caps display faces (big-shoulders-atkinson,
 * anton-inter-tight, bebas-plex) — a visible monoculture, since those
 * three shared a "tight, shouty, all-caps" register regardless of which
 * one the Art Director picked. Added 5 chassis chosen specifically to
 * NOT be condensed caps: a fat/soft display serif (fraunces-karla), a
 * high-contrast didone (dm-serif-public), an editorial slab
 * (zilla-worksans), a mono-display pairing (space-mono-archivo), and a
 * wide/expanded grotesk (unbounded-figtree). Condensed-caps share of the
 * catalog drops from 3-of-5 to 3-of-10.
 *
 * v4 scope (2026-08-30, #253): each chassis now carries its whole type
 * system — an explicit step table (per-step size, leading, tracking, with
 * fluid display steps), a fontWeights map, and a spacing rhythm — instead
 * of a bare ratio the build multiplied out. Added 5 chassis in registers
 * the catalog still lacked: a wide grotesk with a real italic
 * (anybody-franklin), a text serif with optical sizing running alone
 * (source-serif-text), a slab with genuine heavy cuts (bitter-mulish), a
 * single-family humanist sans (hanken-solo), and a fatface poster slab
 * that is not condensed caps (alfa-rubik).
 *
 * To add a chassis:
 *   1. Verify the font is NOT on impeccable's reflex-reject list (or, if
 *      it is, that the fixed-menu justification in the file's header
 *      comment still holds — this catalog is a curated menu the Art
 *      Director picks FROM, not a freeform default, so a small number of
 *      reflex-reject entries are acceptable when deliberately chosen).
 *   2. Verify every weight in `weights: [...]` exists on
 *      fonts.google.com/specimen/<family> — e.g. `curl -s -o /dev/null -w
 *      '%{http_code}' "https://fonts.googleapis.com/css2?family=<Family>:wght@<weights>"`
 *      should return 200 — and say in the file's comment that you checked.
 *   3. Build the step table with `scaleSteps(ratio, base, overrides)` and
 *      tune the overrides to the face: leading tightens as size grows,
 *      tracking opens below `base` and closes above it, but a condensed
 *      caps face, a didone and a mono all want different display tracking
 *      — see the existing files for worked examples. The hero floor in
 *      scale.js guarantees marquee reach whatever the ratio.
 *   4. Declare the fontWeights map from weights the fonts actually load.
 *   5. Tag moods + archetypes so the Art Director can filter sensibly.
 *   6. Append to CHASSIS_CATALOG below.
 *
 * @type {import('./types.js').ChassisEntry[]}
 */
export const CHASSIS_CATALOG = [
  bricolageManrope,
  spectralAlbert,
  bigShouldersAtkinson,
  antonInterTight,
  bebasPlex,
  fraucesKarla,
  dmSerifPublic,
  zillaWorksans,
  spaceMonoArchivo,
  unboundedFigtree,
  anybodyFranklin,
  sourceSerifText,
  bitterMulish,
  hankenSolo,
  alfaRubik,
]
