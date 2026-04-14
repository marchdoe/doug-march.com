import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SEEDS_DIR = path.resolve(__dirname, '..', 'prompts', 'seeds')

export const KNOWN_ARCHETYPES = [
  'poster', 'broadsheet', 'specimen', 'split',
  'scroll', 'index', 'gallery-wall', 'stack',
]

const FALLBACK = 'stack'

// Accepts archetype name in any common form: "Index", "index", "Gallery Wall", "gallery-wall", "  Poster  ".
// Returns absolute path to the matching seed file.
// Falls back to FALLBACK seed for unknown archetypes (logged by caller).
export function selectSeed(archetype) {
  const key = String(archetype || '').trim().toLowerCase().replace(/\s+/g, '-')
  const match = KNOWN_ARCHETYPES.includes(key) ? key : FALLBACK
  return path.join(SEEDS_DIR, `${match}.md`)
}
