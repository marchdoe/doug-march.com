import { readFileSync, readdirSync, existsSync } from 'fs'
import path from 'path'

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
  } catch { return [] }
  const out = []
  for (const dateDir of dateDirs) {
    const dirPath = path.join(archiveDir, dateDir)
    let files
    try {
      files = readdirSync(dirPath).filter((f) => /^rating-\d+\.json$/.test(f)).sort().reverse()
    } catch { continue }
    for (const f of files) {
      try {
        const r = JSON.parse(readFileSync(path.join(dirPath, f), 'utf8'))
        const grade = typeof r.grade === 'string' ? r.grade.trim().toUpperCase() : ''
        if (!/^[A-D]$/.test(grade)) continue // legacy or malformed
        out.push({ date: dateDir, grade, worked: r.worked || '', didnt: r.didnt || '', try: r.try || '' })
      } catch { /* ignore malformed */ }
    }
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
