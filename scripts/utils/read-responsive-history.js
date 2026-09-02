import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'

/**
 * Read recent responsive-metrics.json files across archive dirs.
 * Returned newest-first, limited to `limit` builds.
 *
 * A file recording a measurement miss (`{ error, measuredAt }`, no scores —
 * see archiver.js) is skipped rather than returned: it carries nothing a
 * caller can score a build on, and letting it occupy a slot in the window
 * would crowd out an actual measurement (#280).
 *
 * @param {object} opts
 * @param {string} opts.root - project root (defaults to cwd)
 * @param {number} [opts.limit=30]
 * @returns {Promise<Array<object>>}
 */
export async function readResponsiveHistory({ root = process.cwd(), limit = 30 } = {}) {
  const archiveRoot = path.join(root, 'archive')
  let dates
  try {
    dates = (await readdir(archiveRoot)).filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d))
  } catch {
    return []
  }
  dates.sort().reverse()

  const out = []
  for (const date of dates) {
    const dateDir = path.join(archiveRoot, date)
    let builds
    try {
      builds = (await readdir(dateDir)).filter((b) => b.startsWith('build-'))
    } catch {
      continue
    }
    builds.sort().reverse()
    for (const b of builds) {
      const p = path.join(dateDir, b, 'responsive-metrics.json')
      try {
        const raw = await readFile(p, 'utf8')
        const parsed = JSON.parse(raw)
        if (parsed?.error) continue // a recorded miss, not a measurement
        out.push(parsed)
      } catch {
        /* missing or invalid — skip */
      }
      if (out.length >= limit) return out
    }
  }
  return out
}
