import path from 'node:path'
import { pickBuild } from './archive-record.js'
import { readJsonSafe } from './archive-fs.js'
import { readRecentDates } from './recent-builds.js'

/**
 * The artifacts the uniqueness index compares. Every one has to be read for
 * the nightly run and for the archive chart, or the chart scores a day on
 * less than the pipeline did. There is one reader now, so the two cannot
 * drift; the projection in generate-archive-json.js calls this.
 */
export const UNIQUENESS_ARTIFACTS = [
  'composition.json',
  'color-scheme.json',
  'lane.json',
  'shell.json',
  'header.json',
  'fingerprint.json',
]

/**
 * @typedef {object} UniquenessInputs
 * @property {string} date
 * @property {object|null} composition
 * @property {number|null} hue
 * @property {string|null} lane
 * @property {object|null} shell
 * @property {object|null} header
 * @property {object|null} fingerprint
 */

/**
 * One date's uniqueness inputs, read from the build that shipped.
 *
 * This used to take the newest build dir that was not named `failed`, the
 * mistake recent-builds.js documents folding out of eight other walkers
 * (#220). Two copies survived it, here and in the projection, and both were
 * scoring the week after 2026-04-30 against hue 285 from a retry that never
 * shipped while record.json names hue 340 (#308). pickBuild is the one
 * answer to "which build shipped"; the date dir itself is the fallback for
 * pre-build-id layouts that kept artifacts there.
 *
 * A date with none of the artifacts still yields an entry, because the index
 * needs to know that day existed and could not be compared, rather than
 * silently sliding an older day into the window in its place.
 *
 * @param {string} dateDir path to `archive/<date>`
 * @param {string} date
 * @returns {UniquenessInputs}
 */
export function readUniquenessInputs(dateDir, date) {
  const { buildDir } = pickBuild(dateDir)
  const candidates = buildDir ? [buildDir, dateDir] : [dateDir]

  for (const dir of candidates) {
    const [composition, colorScheme, lane, shell, header, fingerprint] = UNIQUENESS_ARTIFACTS.map(
      (name) => readJsonSafe(path.join(dir, name))
    )
    if (composition || colorScheme || lane || shell || header || fingerprint) {
      return {
        date,
        composition,
        hue: typeof colorScheme?.primary_hue?.h === 'number' ? colorScheme.primary_hue.h : null,
        lane: lane?.laneId ?? null,
        shell,
        header,
        fingerprint,
      }
    }
  }
  return {
    date,
    composition: null,
    hue: null,
    lane: null,
    shell: null,
    header: null,
    fingerprint: null,
  }
}

/**
 * Gather the inputs the uniqueness index compares against, newest first.
 *
 * @param {object} opts
 * @param {string} [opts.root] project root
 * @param {number} [opts.limit=7] dates to return
 * @param {string} [opts.before] exclude this date and anything after it
 * @returns {Promise<UniquenessInputs[]>}
 */
export async function readUniquenessHistory({
  root = process.cwd(),
  limit = 7,
  before = null,
} = {}) {
  const archiveRoot = path.join(root, 'archive')
  return readRecentDates(archiveRoot, { lookbackDays: limit, before }).map((date) =>
    readUniquenessInputs(path.join(archiveRoot, date), date)
  )
}
