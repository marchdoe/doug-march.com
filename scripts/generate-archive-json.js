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
 * reserved for bytes that shipped on the day they are named after.
 */

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { anomaliesOf, buildRecord } from './utils/archive-record.js'
import { readRatingForDate } from './utils/ratings.js'

const ROOT = resolve(import.meta.dirname, '..')
const ARCHIVE_PATH = join(ROOT, 'archive')
const PUBLIC_ARCHIVE = join(ROOT, 'public', 'archive')
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
 * The calendar and the dev panel both read the index, so it carries only what a
 * list needs: enough to label a day and colour a cell.
 */
function indexEntry(record, hasScreenshot) {
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
    cost: record.cost
      ? {
          totalUsd: record.cost.total_usd,
          estimated: record.cost.estimated,
          retries: record.cost.retries,
        }
      : null,
    rating: readRatingForDate(ARCHIVE_PATH, record.date),
  }
}

console.log('[generate-archive-json] Projecting archive records...')

const dates = archivedDates()
mkdirSync(OUT_DIR, { recursive: true })

const index = []
let rebuilt = 0
const anomalous = []

for (const date of dates) {
  const { record, rebuilt: wasRebuilt } = loadRecord(date)
  if (!record) continue
  if (wasRebuilt) {
    rebuilt++
    for (const anomaly of anomaliesOf(record)) anomalous.push(`${date}: ${anomaly}`)
  }

  // The screenshot is still written into the preserved namespace; #154 moves it.
  const hasScreenshot = existsSync(join(PUBLIC_ARCHIVE, `${date}.png`))

  writeFileSync(join(OUT_DIR, `${date}.json`), JSON.stringify({ ...record, hasScreenshot }), 'utf8')
  index.push(indexEntry(record, hasScreenshot))
}

writeFileSync(join(OUT_DIR, 'index.json'), JSON.stringify(index), 'utf8')

console.log(`  wrote public/archive-data/index.json (${index.length} entries)`)
console.log(
  `  wrote ${index.length} per-date files${rebuilt ? `, ${rebuilt} rebuilt from artifacts` : ''}`
)
for (const anomaly of anomalous) console.warn(`  record anomaly — ${anomaly}`)
console.log('[generate-archive-json] Done')
