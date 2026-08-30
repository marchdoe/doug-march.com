import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'

/**
 * Gather the inputs the uniqueness index compares against, newest first.
 *
 * Reads one entry per archived date: the newest build that carries any of the
 * four artifacts. A date with none of them still yields an entry, because the
 * index needs to know that day existed and could not be compared, rather than
 * silently sliding an older day into the window in its place.
 *
 * Everything is best-effort. A build predating the composition grammar has no
 * composition.json or lane.json, and the index scores it on whatever is there.
 *
 * @param {object} opts
 * @param {string} [opts.root] project root
 * @param {number} [opts.limit=7] dates to return
 * @param {string} [opts.before] exclude this date and anything after it
 * @returns {Promise<Array<{date: string, composition: object|null, hue: number|null, lane: string|null, shell: object|null, header: object|null, fingerprint: object|null}>>}
 */
export async function readUniquenessHistory({
  root = process.cwd(),
  limit = 7,
  before = null,
} = {}) {
  const archiveRoot = path.join(root, 'archive')
  let dates
  try {
    dates = (await readdir(archiveRoot)).filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d))
  } catch {
    return []
  }
  dates.sort().reverse()
  if (before) dates = dates.filter((d) => d < before)

  const readJson = async (p) => {
    try {
      return JSON.parse(await readFile(p, 'utf8'))
    } catch {
      return null
    }
  }

  const out = []
  for (const date of dates) {
    if (out.length >= limit) break
    const dateDir = path.join(archiveRoot, date)
    let builds
    try {
      builds = (await readdir(dateDir)).filter(
        (b) => b.startsWith('build-') && !b.includes('failed')
      )
    } catch {
      continue
    }
    builds.sort().reverse()
    // Fall back to the date dir itself: pre-build-id layouts kept artifacts there.
    const candidates = [...builds.map((b) => path.join(dateDir, b)), dateDir]

    let entry = null
    for (const dir of candidates) {
      const [composition, colorScheme, lane, shell, header, fingerprint] = await Promise.all([
        readJson(path.join(dir, 'composition.json')),
        readJson(path.join(dir, 'color-scheme.json')),
        readJson(path.join(dir, 'lane.json')),
        readJson(path.join(dir, 'shell.json')),
        readJson(path.join(dir, 'header.json')),
        readJson(path.join(dir, 'fingerprint.json')),
      ])
      if (composition || colorScheme || lane || shell || header || fingerprint) {
        entry = {
          date,
          composition,
          hue: typeof colorScheme?.primary_hue?.h === 'number' ? colorScheme.primary_hue.h : null,
          lane: lane?.laneId ?? null,
          shell,
          header,
          fingerprint,
        }
        break
      }
    }
    out.push(
      entry ?? {
        date,
        composition: null,
        hue: null,
        lane: null,
        shell: null,
        header: null,
        fingerprint: null,
      }
    )
  }
  return out
}
