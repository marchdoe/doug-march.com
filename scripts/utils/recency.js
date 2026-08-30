import { readFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { readRecentBuilds } from './recent-builds.js'

/**
 * The two things every variance mandate does before it has an opinion.
 *
 * shell-mandate, hero-source-mandate, palette-formula-mandate and
 * color-mandate all grew by copy-paste from one another (#225): each walked
 * the shipped build for every recent date, opened one or two JSON artifacts,
 * skipped the malformed ones, and then took the last N distinct values. Four
 * copies of the walk meant four places to get "which build shipped" wrong,
 * which is exactly what #220 found. This is the walk, once.
 */

/**
 * Read one JSON artifact from a build dir. Missing or malformed is null —
 * an archive that predates the artifact is history, not an error.
 *
 * @param {string} buildDir
 * @param {string} name e.g. 'shell.json'
 * @returns {object|null}
 */
export function readArtifact(buildDir, name) {
  const file = path.join(buildDir, name)
  if (!existsSync(file)) return null
  try {
    return JSON.parse(readFileSync(file, 'utf8'))
  } catch {
    return null
  }
}

/**
 * Walk the shipped build of each recent date, newest first, and collect
 * whatever `pick` returns for it. `pick` gets the build dir and a bound
 * artifact reader; returning null or undefined skips that date, so a build
 * that predates the artifact drops out of the history rather than poisoning
 * it.
 *
 * @template T
 * @param {string} archiveDir
 * @param {number} lookbackDays
 * @param {(ctx: { date: string, buildDir: string, read: (name: string) => object|null }) => T|null|undefined} pick
 * @returns {T[]} newest first
 */
export function readRecentArtifacts(archiveDir, lookbackDays, pick) {
  // readRecentBuilds resolves each date to the build that SHIPPED. Taking
  // the newest build dir reads designs the site never wore — see
  // scripts/utils/recent-builds.js and #220.
  const recent = readRecentBuilds(archiveDir, { lookbackDays })
  const out = []
  for (const { date, buildDir } of recent) {
    const value = pick({ date, buildDir, read: (name) => readArtifact(buildDir, name) })
    if (value != null) out.push(value)
  }
  return out
}

// recent-builds.js already owns the one lastDistinct (#220 folded three
// copies into it); this is the same function, re-exported so a mandate has
// one import for "the walk" and "the window". shell-mandate and
// palette-formula-mandate still carried their own copies until now.
export { lastDistinct } from './recent-builds.js'
