import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { localDateString } from './local-time.js'

/**
 * The two reads every script over `archive/` starts with, written once.
 * `archivedDates` existed in two files and `readJson`-with-a-catch in four
 * (#221); the walk of shipped builds already lives in recent-builds.js.
 */

const DATE_DIR = /^\d{4}-\d{2}-\d{2}$/

/**
 * Every dated directory under `archiveDir`, sorted. Ascending by default,
 * which is what a backfill wants; the projection wants newest first.
 *
 * @param {string} archiveDir
 * @param {{ newestFirst?: boolean }} [opts]
 * @returns {string[]}
 */
export function archivedDates(archiveDir, { newestFirst = false } = {}) {
  if (!existsSync(archiveDir)) return []
  // A directory dated after today (Eastern, the run's own calendar) is not a
  // real archived day — a UTC-derived write, a clock skew, a typo — and
  // becomes a phantom calendar cell with 0 pages if it is not skipped (#311).
  const todayEastern = localDateString(new Date())
  const dates = readdirSync(archiveDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && DATE_DIR.test(d.name) && d.name <= todayEastern)
    .map((d) => d.name)
    .sort()
  return newestFirst ? dates.reverse() : dates
}

/**
 * Parse a JSON file, or null when it is missing or malformed. An archive
 * predating an artifact is history, not an error.
 *
 * @param {string} file
 * @returns {object|null}
 */
export function readJsonSafe(file) {
  if (!existsSync(file)) return null
  try {
    return JSON.parse(readFileSync(file, 'utf8'))
  } catch {
    return null
  }
}
