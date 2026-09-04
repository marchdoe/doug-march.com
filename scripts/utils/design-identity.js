/**
 * A build's design identity — the hero phrase, chassis and composition tuple
 * the Art Director committed to — read straight off `trace.json`'s own
 * `art-director` step output. No LLM calls, no dependency on `build.json` /
 * `composition.json` / `lane.json` being present: `trace.json` is the one
 * file every canary evidence dir already carries (it's in
 * `EVIDENCE_FILENAMES`), so this is the one artifact a taste note can always
 * reach back into, on a laptop long after the run's worktree is gone.
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'

/** A build dir a run shipped from — never build-failed-* or build-pre-*. */
const SHIPPED_BUILD_RE = /^build-\d+$/

/**
 * Read the Art Director's hero copy, chassis id and composition tuple out
 * of a build directory's `trace.json`. Never throws — a missing file, a
 * corrupt trace, or a trace that never reached the `art-director` step
 * (a run that failed before committing to a design) all just come back
 * as nulls, so a reader can print what it has instead of crashing.
 *
 * @param {string} buildDir a directory holding trace.json
 * @returns {{ heroCopy: string|null, chassisId: string|null, composition: Record<string, string>|null }}
 */
export function readDesignIdentity(buildDir) {
  const empty = { heroCopy: null, chassisId: null, composition: null }
  const tracePath = path.join(buildDir, 'trace.json')
  if (!existsSync(tracePath)) return empty

  let trace
  try {
    trace = JSON.parse(readFileSync(tracePath, 'utf8'))
  } catch {
    return empty
  }

  const steps = Array.isArray(trace?.steps) ? trace.steps : []
  const output = steps.find((s) => s?.name === 'art-director')?.output ?? {}
  return {
    heroCopy: typeof output.hero_copy === 'string' ? output.hero_copy : null,
    chassisId: typeof output.chassisId === 'string' ? output.chassisId : null,
    composition:
      output.composition && typeof output.composition === 'object' ? output.composition : null,
  }
}

/**
 * The single most legible axis of a composition tuple — its column
 * structure (e.g. `two-asymmetric`) — for a one-line label. The full tuple
 * stays on disk in trace.json for anyone who wants the other seven axes.
 * @param {Record<string, string>|null} composition
 * @returns {string|null}
 */
export function compositionLabel(composition) {
  return composition && typeof composition.columns === 'string' ? composition.columns : null
}

/**
 * Find the shipped build directory under `<evidenceDir>/archive/<date>/`,
 * wherever the date landed — a canary evidence dir holds exactly one date,
 * but its own name is a run timestamp, not the pipeline's site-local date,
 * so this reads the archive layout instead of assuming it.
 * @param {string} evidenceDir
 * @returns {string|null} absolute path to the shipped build dir, or null
 */
export function findShippedBuildDir(evidenceDir) {
  const archiveDir = path.join(evidenceDir, 'archive')
  if (!existsSync(archiveDir)) return null
  for (const dateEntry of readdirSync(archiveDir, { withFileTypes: true })) {
    if (!dateEntry.isDirectory()) continue
    const dateDir = path.join(archiveDir, dateEntry.name)
    const shipped = readdirSync(dateDir, { withFileTypes: true })
      .filter((e) => e.isDirectory() && SHIPPED_BUILD_RE.test(e.name))
      .map((e) => e.name)
      .sort()
      .at(-1)
    if (shipped) return path.join(dateDir, shipped)
  }
  return null
}

/** The `YYYY-MM-DD` an evidence dir's archive holds, or null if there isn't one. */
export function findEvidenceDate(evidenceDir) {
  const archiveDir = path.join(evidenceDir, 'archive')
  if (!existsSync(archiveDir)) return null
  const dates = readdirSync(archiveDir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && /^\d{4}-\d{2}-\d{2}$/.test(e.name))
    .map((e) => e.name)
  if (dates.length === 0) return null
  return dates
    .map((name) => ({ name, mtime: statSync(path.join(archiveDir, name)).mtimeMs }))
    .sort((a, b) => b.mtime - a.mtime)[0].name
}
