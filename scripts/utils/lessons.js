import { readFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { readRecentBuilds } from './recent-builds.js'
import { readRecentRatings } from './ratings.js'

// Cheap token-overlap similarity for RECURRING detection — no need for
// anything fancier than normalized word-set overlap to catch the same
// complaint resurfacing across builds ("header is messed up" / "header
// problems again").
const STOPWORDS = new Set([
  'the',
  'a',
  'an',
  'and',
  'or',
  'but',
  'to',
  'of',
  'in',
  'on',
  'for',
  'with',
  'is',
  'it',
  'this',
  'that',
  'be',
  'we',
  'still',
])
const SIMILARITY_THRESHOLD = 0.5

function tokenize(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 2 && !STOPWORDS.has(t))
}

/** Overlap coefficient — |A ∩ B| / min(|A|, |B|) — over normalized tokens. */
function textSimilarity(a, b) {
  const setA = new Set(tokenize(a))
  const setB = new Set(tokenize(b))
  // Require at least 2 meaningful tokens on each side — a single shared
  // word (e.g. two texts that both merely contain "flaw") is not enough
  // signal to call two complaints "the same," and short synthetic strings
  // would otherwise false-cluster on their one common token.
  if (setA.size < 2 || setB.size < 2) return 0
  let overlap = 0
  for (const t of setA) if (setB.has(t)) overlap++
  return overlap / Math.min(setA.size, setB.size)
}

/**
 * Greedily cluster entries (newest-first order preserved) by text
 * similarity. Each cluster is represented by its newest member's text.
 * @returns {Array<{date: string, source: string, text: string, count: number}>}
 */
function clusterRecurring(entries) {
  const clusters = []
  for (const e of entries) {
    const cluster = clusters.find((c) => textSimilarity(c.text, e.text) >= SIMILARITY_THRESHOLD)
    if (cluster) cluster.count++
    else clusters.push({ date: e.date, source: e.source, text: e.text, count: 1 })
  }
  return clusters
}

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
  // The build that shipped, not the newest — see scripts/utils/recent-builds.js
  for (const { date: dateDir, buildDir } of readRecentBuilds(archiveDir, { lookbackDays })) {
    const verdictsPath = path.join(buildDir, 'verdicts.json')
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
        // The screenshot-critic's BAR self-eval (calibration against the
        // owner's highest-rated past build) rides on the verdict, not
        // gated by it — a SHIP can still land "below," which is exactly
        // the signal worth carrying forward. Independent of the REVISE
        // branch above so both can fire on the same verdict entry.
        if (v.bar?.position) {
          const reason = v.bar.reason ? ` — ${v.bar.reason}` : ''
          entries.push({
            date: dateDir,
            source: `${v.critic} (BAR)`,
            text: `BAR vs best build: ${v.bar.position}${reason}`.slice(0, 400),
          })
        }
      }
    } catch {
      /* ignore malformed */
    }
  }

  if (entries.length === 0) return ''
  entries.sort((a, b) => b.date.localeCompare(a.date))

  // Fold substantially-similar complaints (≥2 builds) into one RECURRING
  // entry, escalated to the front — a flaw that keeps coming back matters
  // more than the newest one-off note.
  const clustered = clusterRecurring(entries).map((c) =>
    c.count >= 2 ? { ...c, text: `RECURRING (${c.count}x): ${c.text}` } : c
  )
  clustered.sort((a, b) => {
    const aRecurring = a.count >= 2
    const bRecurring = b.count >= 2
    if (aRecurring !== bRecurring) return aRecurring ? -1 : 1
    if (aRecurring && a.count !== b.count) return b.count - a.count
    return b.date.localeCompare(a.date)
  })

  const lines = ['## Recent Lessons — recurring flaws; do NOT repeat these', '']
  for (const e of clustered.slice(0, limit)) {
    lines.push(`- [${e.date}, ${e.source}] ${e.text}`)
  }
  return lines.join('\n')
}
