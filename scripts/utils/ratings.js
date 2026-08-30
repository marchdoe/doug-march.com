import { readFileSync, readdirSync, existsSync } from 'node:fs'
import path from 'node:path'
import { readRecentDates } from './recent-builds.js'
import { sanitizeString } from './sanitize-signal.js'

// Free-text rating notes end up verbatim in agent prompts. The harvester
// gates on comment author, but sanitize at read time too so historical
// rating-*.json files (written before the author gate) get the same
// treatment. Roomier cap than signal text — these are the owner's notes.
const MAX_NOTE_LENGTH = 1000

/**
 * Newest valid rating for one date dir, or null.
 * @returns {{ grade: string, worked: string, didnt: string, try: string } | null}
 */
export function readRatingForDate(archiveDir, date) {
  const dirPath = path.join(archiveDir, date)
  let files
  try {
    files = readdirSync(dirPath)
      .filter((f) => /^rating-\d+\.json$/.test(f))
      .sort()
      .reverse()
  } catch {
    return null
  }
  for (const f of files) {
    try {
      const r = JSON.parse(readFileSync(path.join(dirPath, f), 'utf8'))
      const grade = typeof r.grade === 'string' ? r.grade.trim().toUpperCase() : ''
      if (!/^[A-D]$/.test(grade)) continue // legacy or malformed
      const note = (v) => sanitizeString(v || '', { maxLength: MAX_NOTE_LENGTH })
      return { grade, worked: note(r.worked), didnt: note(r.didnt), try: note(r.try) }
    } catch {
      /* ignore malformed */
    }
  }
  return null
}

/**
 * Read new-schema ratings ({ grade, worked, didnt, try }) from the archive.
 * Legacy 5-axis files (with a `ratings` object) are skipped — they predate
 * 2026-04 and fall outside any useful lookback window.
 *
 * @returns {Array<{ date: string, grade: string, worked: string, didnt: string, try: string }>} newest first
 */
export function readRecentRatings(archiveDir, { lookbackDays = 10 } = {}) {
  // readRecentDates, not readRecentBuilds: a rating hangs off the date, and a
  // day can carry one without its build dir having been committed.
  const out = []
  for (const dateDir of readRecentDates(archiveDir, { lookbackDays })) {
    // At most ONE rating per date — newest file wins (see readRatingForDate).
    const rating = readRatingForDate(archiveDir, dateDir)
    if (rating) out.push({ date: dateDir, ...rating })
  }
  return out
}

/** @returns {string} markdown block, or '' when there are no ratings */
export function buildRecentRatingsBlock(archiveDir, opts = {}) {
  const ratings = readRecentRatings(archiveDir, opts)
  if (ratings.length === 0) return ''
  const lines = ['## Owner Ratings (the single most important taste signal)', '']
  for (const r of ratings) {
    lines.push(`### ${r.date} — Grade: ${r.grade}`)
    if (r.worked) lines.push(`- Worked: ${r.worked}`)
    if (r.didnt) lines.push(`- Didn't: ${r.didnt}`)
    if (r.try) lines.push(`- Try next: ${r.try}`)
    lines.push('')
  }
  lines.push('A-grades show what to do more of. C/D-grades with notes are direct instructions.')
  return lines.join('\n')
}

/**
 * Locate the owner's highest-rated own-build reference for screenshot-critic
 * calibration — the "BAR" self-eval. Reads references/index.yml directly
 * (rather than re-deriving from archive/*\/rating-*.json) so this only ever
 * surfaces a build that actually made it into the curated reference library
 * via promoteRatingToReferences (collect-ratings.js): grade A beats grade B,
 * ties broken by the more recent date. Manually-curated `own-*` entries that
 * predate auto-promotion (no parseable "grade A|B" in their description) are
 * skipped — they're not machine-comparable.
 *
 * @param {string} referencesDir - e.g. path.join(ROOT, 'references')
 * @param {string} [indexPath] - defaults to <referencesDir>/index.yml
 * @returns {{ file: string, path: string, description: string, date: string, grade: string } | null}
 */
export function findBestRatedReference(
  referencesDir,
  indexPath = path.join(referencesDir, 'index.yml')
) {
  if (!existsSync(indexPath)) return null
  let raw
  try {
    raw = readFileSync(indexPath, 'utf8')
  } catch {
    return null
  }

  const entryRe = /-\s*file:\s*(own-\S+\.png)\s*\n\s*description:\s*"((?:[^"\\]|\\.)*)"/g
  const candidates = []
  for (const m of raw.matchAll(entryRe)) {
    const file = m[1]
    const description = m[2].replace(/\\"/g, '"').replace(/\\\\/g, '\\')
    const gradeMatch = /OWN \((\d{4}-\d{2}-\d{2}),\s*grade\s*([AB])\)/.exec(description)
    if (!gradeMatch) continue // not an auto-promoted entry — no machine-parseable grade
    candidates.push({ file, description, date: gradeMatch[1], grade: gradeMatch[2] })
  }
  if (candidates.length === 0) return null

  candidates.sort((a, b) => {
    if (a.grade !== b.grade) return a.grade === 'A' ? -1 : 1 // A beats B
    return b.date.localeCompare(a.date) // newer wins ties
  })

  for (const c of candidates) {
    const filePath = path.join(referencesDir, c.file)
    if (existsSync(filePath)) return { ...c, path: filePath }
  }
  return null // best candidates' index.yml entry has no file on disk
}
