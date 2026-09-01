#!/usr/bin/env node

/**
 * Project the archive records into the static JSON the SPA fetches.
 *
 * Produces:
 *   public/archive-data/index.json    — one light entry per archived day
 *   public/archive-data/{date}.json   — that day's record, plus display extras
 *
 * This derives nothing. `archive/{date}/record.json` (#153) is the record; this
 * only decides what a browser receives. Any date missing a record is rebuilt
 * here rather than skipped, so a checkout that has never run the backfill still
 * produces a complete archive.
 *
 * The files live under `/archive-data/` rather than inside `/archive/`, which is
 * reserved for bytes that shipped on the day they are named after. The day's
 * screenshot sits here too, written by the pipeline rather than by this script.
 */

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './utils/file-manager.js'
import { isMain } from './utils/cli.js'
import { archivedDates } from './utils/archive-fs.js'
import { anomaliesOf, buildRecord } from './utils/archive-record.js'
import { readRatingForDate } from './utils/ratings.js'
import { WINDOW, computeUniqueness } from './utils/uniqueness-index.js'
import { readUniquenessInputs } from './utils/read-uniqueness-history.js'

/**
 * Read the record the pipeline wrote. Rebuilding when it is absent keeps this
 * script honest on a fresh clone; the log line says which happened.
 * @param {string} date
 * @param {string} archiveDir
 * @returns {{record: object|null, rebuilt: boolean}}
 */
export function loadRecord(date, archiveDir) {
  const path = join(archiveDir, date, 'record.json')
  if (existsSync(path)) {
    try {
      return { record: JSON.parse(readFileSync(path, 'utf8')), rebuilt: false }
    } catch {
      /* fall through to a rebuild */
    }
  }
  return { record: buildRecord(date, { archiveDir }), rebuilt: true }
}

/**
 * Pages of preserved site under public/archive/<date>/.
 *
 * Counted rather than assumed: three dates have a record and no capture, and
 * the ten earliest have five pages instead of nine.
 * @param {string} date
 * @param {string} publicDir
 */
export function countSnapshotPages(date, publicDir) {
  const dir = join(publicDir, 'archive', date)
  if (!existsSync(dir)) return 0
  let n = 0
  const walk = (d, rel) => {
    for (const entry of readdirSync(d, { withFileTypes: true })) {
      if (entry.isDirectory()) walk(join(d, entry.name), rel ? `${rel}/${entry.name}` : entry.name)
      else if (entry.name.endsWith('.html')) n += 1
    }
  }
  walk(dir, '')
  return n
}

/**
 * Read one date's uniqueness inputs off disk.
 *
 * Computed here for every date rather than only read back from the
 * `uniqueness.json` the pipeline now writes, so the chart covers the whole
 * corpus on the first run instead of starting from whenever the index shipped.
 * The persisted file stays the per-build record; this is the projection.
 *
 * It delegates to the pipeline's own reader. The two used to be separate
 * copies, drifted once (#254 added header.json on one side only), and were
 * both taking the newest build dir instead of the one that shipped (#308).
 *
 * @param {string} date
 * @param {string} archiveDir
 * @returns {import('./utils/read-uniqueness-history.js').UniquenessInputs}
 */
export function uniquenessInputs(date, archiveDir) {
  return readUniquenessInputs(join(archiveDir, date), date)
}

/**
 * The calendar and the dev panel both read the index, so it carries only what a
 * list needs: enough to label a day and color a cell.
 */
export function indexEntry(record, { hasScreenshot, pages, uniqueness }, archiveDir) {
  return {
    date: record.date,
    era: record.era,
    brief: record.brief,
    legacyArchetype: record.legacyArchetype,
    chassis: record.chassis,
    buildId: record.buildId,
    attempts: record.attempts,
    moodWord: record.colorScheme?.mood_word ?? null,
    primaryHue: record.colorScheme?.primary_hue ?? null,
    hasScreenshot,
    // How many pages of that day's site were preserved. 0 means the record
    // survived but the capture did not, and the calendar must send that cell to
    // the explainer instead of to a design that is not there. See #157.
    pages,
    cost: record.cost
      ? {
          totalUsd: record.cost.total_usd,
          estimated: record.cost.estimated,
          retries: record.cost.retries,
        }
      : null,
    rating: readRatingForDate(archiveDir, record.date),
    // Composite 0..1, or null when nothing about the day was comparable.
    // `window` says how many builds it was measured against, so a chart can
    // dim the early dates rather than treating a 2-build window as a verdict.
    uniqueness: uniqueness ? { composite: uniqueness.composite, window: uniqueness.window } : null,
  }
}

/**
 * Project every archived day into `outDir`. Returns what it wrote so a test
 * can look without reading the files back.
 *
 * @param {{ archiveDir: string, publicDir: string, outDir: string }} paths
 * @returns {{ index: object[], rebuilt: number, anomalous: string[] }}
 */
export function projectArchive({ archiveDir, publicDir, outDir }) {
  console.log('[generate-archive-json] Projecting archive records...')

  const dates = archivedDates(archiveDir, { newestFirst: true })
  mkdirSync(outDir, { recursive: true })

  const index = []
  let rebuilt = 0
  const anomalous = []

  // Uniqueness inputs for every date, oldest first, so each date can be scored
  // against the WINDOW dates that actually preceded it.
  const chronological = [...dates].sort()
  const inputsByDate = new Map(chronological.map((d) => [d, uniquenessInputs(d, archiveDir)]))
  const uniquenessByDate = new Map()
  for (let i = 0; i < chronological.length; i++) {
    const date = chronological[i]
    const history = chronological
      .slice(Math.max(0, i - WINDOW), i)
      .reverse()
      .map((d) => inputsByDate.get(d))
    uniquenessByDate.set(date, computeUniqueness(inputsByDate.get(date), history))
  }

  for (const date of dates) {
    const { record, rebuilt: wasRebuilt } = loadRecord(date, archiveDir)
    if (!record) continue
    if (wasRebuilt) {
      rebuilt++
      for (const anomaly of anomaliesOf(record)) anomalous.push(`${date}: ${anomaly}`)
    }

    const hasScreenshot = existsSync(join(outDir, `${date}.png`))
    const pages = countSnapshotPages(date, publicDir)
    const uniqueness = uniquenessByDate.get(date) ?? null

    writeFileSync(
      join(outDir, `${date}.json`),
      JSON.stringify({ ...record, hasScreenshot, pages, uniqueness }),
      'utf8'
    )
    index.push(indexEntry(record, { hasScreenshot, pages, uniqueness }, archiveDir))
  }

  writeFileSync(join(outDir, 'index.json'), JSON.stringify(index), 'utf8')

  console.log(`  wrote ${join(outDir, 'index.json')} (${index.length} entries)`)
  console.log(
    `  wrote ${index.length} per-date files${rebuilt ? `, ${rebuilt} rebuilt from artifacts` : ''}`
  )
  for (const anomaly of anomalous) console.warn(`  record anomaly — ${anomaly}`)
  console.log('[generate-archive-json] Done')
  return { index, rebuilt, anomalous }
}

if (isMain(import.meta.url)) {
  projectArchive({
    archiveDir: join(ROOT, 'archive'),
    publicDir: join(ROOT, 'public'),
    outDir: join(ROOT, 'public', 'archive-data'),
  })
}
