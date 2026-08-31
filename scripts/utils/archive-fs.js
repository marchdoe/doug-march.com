import { existsSync, readdirSync, readFileSync } from 'node:fs'

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
  const dates = readdirSync(archiveDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && DATE_DIR.test(d.name))
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
