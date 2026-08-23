import path from 'node:path'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { hashToRange } from './deterministic-hash.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SEEDS_DIR = path.resolve(__dirname, '..', 'prompts', 'seeds')

export const KNOWN_ARCHETYPES = [
  'poster',
  'broadsheet',
  'specimen',
  'split',
  'scroll',
  'index',
  'gallery-wall',
  'stack',
]

const FALLBACK = 'stack'

// Marks the start/end of one lane's content inside a seed file:
//   <!-- LANE:id -->
//   ...lane body...
//   <!-- /LANE -->
const LANE_PATTERN = /<!-- LANE:([a-z0-9-]+) -->\n([\s\S]*?)<!-- \/LANE -->/g

// Accepts archetype name in any common form: "Index", "index", "Gallery Wall", "gallery-wall", "  Poster  ".
// Returns the normalized archetype key, falling back to FALLBACK for unknown input.
function normalizeArchetype(archetype) {
  const key = String(archetype || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
  return KNOWN_ARCHETYPES.includes(key) ? key : FALLBACK
}

// Returns absolute path to the seed file matching the given archetype.
// Falls back to FALLBACK seed for unknown archetypes (logged by caller).
export function selectSeed(archetype) {
  const match = normalizeArchetype(archetype)
  return path.join(SEEDS_DIR, `${match}.md`)
}

/**
 * Parse a seed file's raw content into its shared header, its lanes, and
 * its shared footer. Each seed file holds 2-3 LANE blocks — distinct
 * aesthetic references for the same archetype (e.g. poster.md has a
 * Tesla/SpaceX lane, a Swiss International Style lane, and a psychedelic
 * gig-poster lane). Only one lane is injected into any given prompt; the
 * others exist on disk but are never read at runtime for that day.
 *
 * A file with no LANE markers is treated as a legacy single-lane seed:
 * `lanes` is empty and callers should fall back to the whole file.
 *
 * @param {string} content - raw seed file content
 * @returns {{ header: string, lanes: Array<{id: string, body: string}>, footer: string }}
 */
export function parseSeedLanes(content) {
  const lanes = []
  let match
  let firstStart = -1
  let lastEnd = -1
  LANE_PATTERN.lastIndex = 0
  while ((match = LANE_PATTERN.exec(content)) !== null) {
    if (firstStart === -1) firstStart = match.index
    lastEnd = match.index + match[0].length
    lanes.push({ id: match[1], body: match[2].trim() })
  }

  if (lanes.length === 0) {
    return { header: content.trim(), lanes: [], footer: '' }
  }

  return {
    header: content.slice(0, firstStart).trim(),
    lanes,
    footer: content.slice(lastEnd).trim(),
  }
}

/**
 * Deterministically pick a lane index for a given archetype + date.
 * Same date+archetype always picks the same lane (reproducible re-runs of
 * a given day). Different dates distribute across lanes via a hash of
 * "date:archetype" — not a sequential rotation — so lane choice for one
 * archetype doesn't correlate with lane choice for another.
 *
 * @param {string} archetype
 * @param {string} date - 'YYYY-MM-DD'
 * @param {number} laneCount
 * @returns {number}
 */
export function selectLaneIndex(archetype, date, laneCount) {
  if (laneCount <= 0) throw new Error(`selectLaneIndex: laneCount must be > 0, got ${laneCount}`)
  const key = `${date}:${normalizeArchetype(archetype)}`
  return hashToRange(key, 0, laneCount - 1)
}

/**
 * Read the seed file for `archetype`, deterministically pick one lane by
 * date hash, and assemble the injected content: shared header + the
 * chosen lane's body + shared footer (the "this is one lane, deviate
 * freely" escape clause). This keeps the injected token count roughly
 * the same as a single-lane seed file, even though the file on disk now
 * holds 2-3 lanes — only the picked lane's text ever reaches the prompt.
 *
 * @param {string} archetype
 * @param {string} date - 'YYYY-MM-DD'
 * @returns {{ path: string, laneId: string|null, laneIndex: number|null, laneCount: number, content: string }}
 */
export function selectSeedContent(archetype, date) {
  const seedPath = selectSeed(archetype)
  const raw = readFileSync(seedPath, 'utf8')
  const { header, lanes, footer } = parseSeedLanes(raw)

  if (lanes.length === 0) {
    // Legacy single-lane file (or a file mid-migration) — inject as-is.
    return { path: seedPath, laneId: null, laneIndex: null, laneCount: 0, content: raw }
  }

  const laneIndex = selectLaneIndex(archetype, date, lanes.length)
  const chosen = lanes[laneIndex]
  const content = [header, chosen.body, footer].filter(Boolean).join('\n\n')

  return {
    path: seedPath,
    laneId: chosen.id,
    laneIndex,
    laneCount: lanes.length,
    content,
  }
}
