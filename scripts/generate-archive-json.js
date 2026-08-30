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
import { join, resolve } from 'node:path'
import { anomaliesOf, buildRecord } from './utils/archive-record.js'
import { readRatingForDate } from './utils/ratings.js'
import { WINDOW, computeUniqueness } from './utils/uniqueness-index.js'

const ROOT = resolve(import.meta.dirname, '..')
const ARCHIVE_PATH = join(ROOT, 'archive')
const OUT_DIR = join(ROOT, 'public', 'archive-data')

function archivedDates() {
  if (!existsSync(ARCHIVE_PATH)) return []
  return readdirSync(ARCHIVE_PATH, { withFileTypes: true })
    .filter((d) => d.isDirectory() && /^\d{4}-\d{2}-\d{2}$/.test(d.name))
    .map((d) => d.name)
    .sort()
    .reverse()
}

/**
 * Read the record the pipeline wrote. Rebuilding when it is absent keeps this
 * script honest on a fresh clone; the log line says which happened.
 * @param {string} date
 * @returns {{record: object|null, rebuilt: boolean}}
 */
function loadRecord(date) {
  const path = join(ARCHIVE_PATH, date, 'record.json')
  if (existsSync(path)) {
    try {
      return { record: JSON.parse(readFileSync(path, 'utf8')), rebuilt: false }
    } catch {
      /* fall through to a rebuild */
    }
  }
  return { record: buildRecord(date, { archiveDir: ARCHIVE_PATH }), rebuilt: true }
}

/**
 * Pages of preserved site under public/archive/<date>/.
 *
 * Counted rather than assumed: three dates have a record and no capture, and
 * the ten earliest have five pages instead of nine.
 */
function countSnapshotPages(date) {
  const dir = join(ROOT, 'public', 'archive', date)
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
 * @param {string} date
 * @returns {{date: string, composition: object|null, hue: number|null, lane: string|null, shell: object|null, fingerprint: object|null}}
 */
function uniquenessInputs(date) {
  const dateDir = join(ARCHIVE_PATH, date)
  const readJson = (dir, name) => {
    try {
      return JSON.parse(readFileSync(join(dir, name), 'utf8'))
    } catch {
      return null
    }
  }
  let builds = []
  try {
    builds = readdirSync(dateDir)
      .filter((b) => b.startsWith('build-') && !b.includes('failed'))
      .sort()
      .reverse()
  } catch {
    /* no build dirs */
  }
  for (const dir of [...builds.map((b) => join(dateDir, b)), dateDir]) {
    const composition = readJson(dir, 'composition.json')
    const colorScheme = readJson(dir, 'color-scheme.json')
    const lane = readJson(dir, 'lane.json')
    const shell = readJson(dir, 'shell.json')
    const fingerprint = readJson(dir, 'fingerprint.json')
    if (composition || colorScheme || lane || shell || fingerprint) {
      return {
        date,
        composition,
        hue: typeof colorScheme?.primary_hue?.h === 'number' ? colorScheme.primary_hue.h : null,
        lane: lane?.laneId ?? null,
        shell,
        fingerprint,
      }
    }
  }
  return { date, composition: null, hue: null, lane: null, shell: null, fingerprint: null }
}

/**
 * The calendar and the dev panel both read the index, so it carries only what a
 * list needs: enough to label a day and color a cell.
 */
function indexEntry(record, { hasScreenshot, pages, uniqueness }) {
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
    rating: readRatingForDate(ARCHIVE_PATH, record.date),
    // Composite 0..1, or null when nothing about the day was comparable.
    // `window` says how many builds it was measured against, so a chart can
    // dim the early dates rather than treating a 2-build window as a verdict.
    uniqueness: uniqueness ? { composite: uniqueness.composite, window: uniqueness.window } : null,
  }
}

console.log('[generate-archive-json] Projecting archive records...')

const dates = archivedDates()
mkdirSync(OUT_DIR, { recursive: true })

const index = []
let rebuilt = 0
const anomalous = []

// Uniqueness inputs for every date, oldest first, so each date can be scored
// against the WINDOW dates that actually preceded it.
const chronological = [...dates].sort()
const inputsByDate = new Map(chronological.map((d) => [d, uniquenessInputs(d)]))
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
  const { record, rebuilt: wasRebuilt } = loadRecord(date)
  if (!record) continue
  if (wasRebuilt) {
    rebuilt++
    for (const anomaly of anomaliesOf(record)) anomalous.push(`${date}: ${anomaly}`)
  }

  const hasScreenshot = existsSync(join(OUT_DIR, `${date}.png`))
  const pages = countSnapshotPages(date)

  const uniqueness = uniquenessByDate.get(date) ?? null

  writeFileSync(
    join(OUT_DIR, `${date}.json`),
    JSON.stringify({ ...record, hasScreenshot, pages, uniqueness }),
    'utf8'
  )
  index.push(indexEntry(record, { hasScreenshot, pages, uniqueness }))
}

writeFileSync(join(OUT_DIR, 'index.json'), JSON.stringify(index), 'utf8')

console.log(`  wrote public/archive-data/index.json (${index.length} entries)`)
console.log(
  `  wrote ${index.length} per-date files${rebuilt ? `, ${rebuilt} rebuilt from artifacts` : ''}`
)
for (const anomaly of anomalous) console.warn(`  record anomaly — ${anomaly}`)
console.log('[generate-archive-json] Done')
