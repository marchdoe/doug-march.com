import { readFileSync, readdirSync, existsSync } from 'node:fs'
import path from 'node:path'
import { readRecentRatings } from './ratings.js'

/**
 * Derive a rolling "Recent Lessons" prompt block from persisted critic
 * verdicts (REVISE feedback) and owner rating critiques (didnt/try fields).
 * Pure derivation at prompt-build time — no mutable state file.
 *
 * @returns {string} markdown block, or '' when there is nothing to learn from
 */
export function buildLessonsBlock(archiveDir, { limit = 7, lookbackDays = 14 } = {}) {
  const entries = [] // { date, source, text }

  for (const r of readRecentRatings(archiveDir, { lookbackDays })) {
    const text = [r.didnt, r.try].filter(Boolean).join(' — try: ')
    if (text) entries.push({ date: r.date, source: `owner (grade ${r.grade})`, text })
  }

  if (existsSync(archiveDir)) {
    let dateDirs = []
    try {
      dateDirs = readdirSync(archiveDir)
        .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d))
        .sort()
        .reverse()
        .slice(0, lookbackDays)
    } catch {
      /* ignore */
    }
    for (const dateDir of dateDirs) {
      const datePath = path.join(archiveDir, dateDir)
      let buildDirs = []
      try {
        buildDirs = readdirSync(datePath)
          .filter((b) => /^build-\d+$/.test(b))
          .sort()
          .reverse()
      } catch {
        continue
      }
      if (buildDirs.length === 0) continue
      const verdictsPath = path.join(datePath, buildDirs[0], 'verdicts.json')
      if (!existsSync(verdictsPath)) continue
      try {
        for (const v of JSON.parse(readFileSync(verdictsPath, 'utf8'))) {
          if (v.verdict === 'REVISE' && v.feedback) {
            entries.push({
              date: dateDir,
              source: v.critic,
              text: String(v.feedback).slice(0, 400),
            })
          }
        }
      } catch {
        /* ignore malformed */
      }
    }
  }

  if (entries.length === 0) return ''
  entries.sort((a, b) => b.date.localeCompare(a.date))
  const lines = ['## Recent Lessons — recurring flaws; do NOT repeat these', '']
  for (const e of entries.slice(0, limit)) {
    lines.push(`- [${e.date}, ${e.source}] ${e.text}`)
  }
  return lines.join('\n')
}
