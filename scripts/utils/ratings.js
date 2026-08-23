import { readFileSync, readdirSync, existsSync } from 'node:fs'
import path from 'node:path'
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
  if (!existsSync(archiveDir)) return []
  let dateDirs
  try {
    dateDirs = readdirSync(archiveDir)
      .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d))
      .sort()
      .reverse()
      .slice(0, lookbackDays)
  } catch {
    return []
  }
  const out = []
  for (const dateDir of dateDirs) {
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
