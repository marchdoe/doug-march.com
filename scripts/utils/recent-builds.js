/**
 * The one way to walk backwards through the archive.
 *
 * This block — list date dirs, filter to `YYYY-MM-DD`, sort, reverse, take a
 * lookback window, then list build dirs inside each and take one — was written
 * out eight times, in color-mandate, composition-mandate, hero-source-mandate,
 * palette-formula-mandate, shell-mandate, lessons, ratings and select-lane. The
 * copies disagreed about which build to take, and all eight were wrong in the
 * same way: they took the newest.
 *
 * `pickBuild` in archive-record.js already documents why the newest is not the
 * shipped one. `archive()` writes the shipping build's brief to
 * `archive/<date>/brief.md`, so the build whose own brief matches that file is
 * the one whose design went live. Two dates in the corpus need it: 2026-04-28,
 * whose newest build dir holds nothing but a `.DS_Store`, and 2026-04-30, whose
 * newest is a complete-looking retry that never shipped — `record.json` names
 * build-1777546126760 while every walker was reading build-1777547559412.
 *
 * Every variance mandate is a feedback loop over that history: don't repeat
 * last week's hue, don't reuse the shell from two days ago. Reading a build the
 * site never wore means the loop is steering away from designs nobody saw.
 */

import { existsSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { pickBuild } from './archive-record.js'

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

/**
 * Recent archived dates, newest first — whether or not they hold a build.
 *
 * Ratings hang off the date rather than a build, so filtering those dates by
 * "has a shipped build" would silently drop a rated day whose build dir was
 * never committed.
 *
 * @param {string} archiveDir path to `archive/`
 * @param {{lookbackDays?: number, before?: string}} [options]
 * @returns {string[]} date strings, newest first
 */
export function readRecentDates(archiveDir, { lookbackDays = 30, before = null } = {}) {
  if (!existsSync(archiveDir)) return []
  let dates
  try {
    dates = readdirSync(archiveDir)
      .filter((d) => DATE_RE.test(d))
      .sort()
      .reverse()
  } catch {
    return []
  }
  if (before) dates = dates.filter((d) => d < before)
  return dates.slice(0, lookbackDays)
}

/**
 * Recent archived days, newest first, each resolved to the build that shipped.
 *
 * @param {string} archiveDir path to `archive/`
 * @param {{lookbackDays?: number, before?: string}} [options]
 *   `before` excludes that date and everything after it — used when today is
 *   being compared against its own history and must not be in the window.
 * @returns {Array<{date: string, buildId: string, buildDir: string, attempts: number}>}
 */
export function readRecentBuilds(archiveDir, { lookbackDays = 30, before = null } = {}) {
  if (!existsSync(archiveDir)) return []

  const dates = readRecentDates(archiveDir, { lookbackDays: Number.POSITIVE_INFINITY, before })

  const out = []
  for (const date of dates) {
    if (out.length >= lookbackDays) break
    const { buildId, buildDir, attempts } = pickBuild(path.join(archiveDir, date))
    if (!buildId || !buildDir) continue
    out.push({ date, buildId, buildDir, attempts })
  }
  return out
}

/**
 * The last `count` distinct values of `field`, newest first.
 *
 * `lastDistinct` was defined three times (select-lane, palette-formula-mandate,
 * shell-mandate) with the same body.
 *
 * @param {Array<unknown>} values newest-first
 * @param {number} count
 * @returns {Array<unknown>}
 */
export function lastDistinct(values, count) {
  const seen = []
  for (const value of values) {
    if (value == null) continue
    if (!seen.includes(value)) seen.push(value)
    if (seen.length >= count) break
  }
  return seen
}
