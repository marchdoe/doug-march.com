import { readFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import { ROOT } from './file-manager.js'

/**
 * All files Claude is allowed to read and rewrite.
 * These are also the files that get backed up before each attempt.
 */
export const MUTABLE_FILES = [
  'elements/preset.ts',
  'app/components/Layout.tsx',
  'app/components/Sidebar.tsx',
  'app/components/SectionHead.tsx',
  'app/components/ProjectRow.tsx',
  'app/components/FeaturedProject.tsx',
  'app/components/SelectedWork.tsx',
  'app/components/Experiments.tsx',
  'app/components/Bio.tsx',
  'app/components/Timeline.tsx',
  'app/components/Capabilities.tsx',
  'app/components/Personal.tsx',
  'app/routes/__root.tsx',
  'app/routes/index.tsx',
  'app/routes/about.tsx',
  'app/routes/work.$slug.tsx',
  'elements/chassis-preset.ts',
]

/** Files owned by the Token Designer agent. */
export const TOKEN_FILES = [
  'elements/preset.ts',
]

/**
 * Files owned by the orchestrator (generated deterministically from the
 * Director-chosen chassis, never authored by an agent). Listed in
 * MUTABLE_FILES so backup/restore covers them, but kept out of TOKEN_FILES
 * so the Token Designer is never asked to author them.
 */
export const ORCHESTRATOR_FILES = [
  'app/routes/__root.tsx',
  'elements/chassis-preset.ts',
]

/** Files owned by the Layout Architect agent. */
export const LAYOUT_FILES = [
  'app/components/Layout.tsx',
  'app/routes/index.tsx',
  'app/routes/about.tsx',
  'app/routes/work.$slug.tsx',
]

/** Files owned by the Sidebar Designer agent. */
export const SIDEBAR_FILES = [
  'app/components/Sidebar.tsx',
]

/** Files owned by the Footer Designer agent (currently empty). */
export const FOOTER_FILES = []

/** All structure files (Layout + Sidebar) for backwards compat. */
export const STRUCTURE_FILES = [
  ...LAYOUT_FILES,
  ...SIDEBAR_FILES,
  ...FOOTER_FILES,
]

/** Files owned by the Component Agent. */
export const COMPONENT_FILES = [
  'app/components/FeaturedProject.tsx',
  'app/components/ProjectRow.tsx',
  'app/components/SectionHead.tsx',
  'app/components/SelectedWork.tsx',
  'app/components/Experiments.tsx',
  'app/components/Bio.tsx',
  'app/components/Timeline.tsx',
  'app/components/Capabilities.tsx',
  'app/components/Personal.tsx',
]

/**
 * Content files Claude gets a summary of (titles + types only, no full descriptions).
 * These are read-only context, not included in mutable files.
 */
const CONTENT_FILES_FOR_SUMMARY = [
  'app/content/projects.ts',
  'app/content/timeline.ts',
  'app/content/about.ts',
]

/**
 * Build a human-readable summary of projects content.
 * We only include title, type, year — not full descriptions.
 * This is intentional: Claude needs to know what projects exist to preserve
 * import usage, but doesn't need (and shouldn't alter) the actual content.
 */
async function buildContentSummary() {
  const lines = []

  // Read projects.ts and extract key fields via regex (safe for this known format)
  const projectsPath = path.join(ROOT, 'app/content/projects.ts')
  if (existsSync(projectsPath)) {
    const src = await readFile(projectsPath, 'utf8')
    lines.push('## Projects (from app/content/projects.ts)')
    lines.push('')

    // Extract slug, title, type, year blocks
    const projectMatches = src.matchAll(
      /slug:\s*'([^']+)'[\s\S]*?title:\s*'([^']+)'[\s\S]*?type:\s*'([^']+)'[\s\S]*?year:\s*(\d+)/g
    )
    for (const m of projectMatches) {
      lines.push(`- ${m[2]} (${m[3]}, ${m[4]}, slug: ${m[1]})`)
    }

    // Note exported arrays
    if (src.includes('featuredProject')) {
      lines.push('')
      lines.push('Exports: `projects`, `featuredProject`, `selectedWork`, `experiments`')
    }
  }

  lines.push('')
  lines.push('## Timeline (from app/content/timeline.ts)')
  lines.push('Exports: `timeline` (array of career entries), `capabilities` (array of skill strings)')
  lines.push('These are imported by app/components/Timeline.tsx and app/components/Capabilities.tsx — preserve those import statements.')

  return lines.join('\n')
}

/**
 * Read all mutable files from disk.
 * Returns array of { path, content } — content is the file's current source.
 * Files that don't exist yet are skipped (they don't need to be in the context).
 */
async function readCurrentFiles() {
  const files = []
  for (const relPath of MUTABLE_FILES) {
    const absPath = path.join(ROOT, relPath)
    if (existsSync(absPath)) {
      const content = await readFile(absPath, 'utf8')
      files.push({ path: relPath, content })
    }
  }
  return files
}

/**
 * Read a subset of mutable files from disk.
 * @param {string[]} filePaths - relative paths to read
 * @returns {Promise<Array<{path: string, content: string}>>}
 */
export async function readFileGroup(filePaths) {
  const files = []
  for (const relPath of filePaths) {
    const absPath = path.join(ROOT, relPath)
    if (existsSync(absPath)) {
      const content = await readFile(absPath, 'utf8')
      files.push({ path: relPath, content })
    }
  }
  return files
}

/**
 * Read and return all context Claude needs to produce a redesign.
 * @returns {Promise<{ signals: object, contentSummary: string, currentFiles: Array<{path: string, content: string}> }>}
 */
export async function readContext() {
  // Parse signals YAML
  const signalsPath = path.join(ROOT, 'signals/today.yml')
  const signalsRaw = await readFile(signalsPath, 'utf8')
  const signals = yaml.load(signalsRaw)

  // js-yaml parses bare YAML dates as Date objects — normalize to string
  if (signals.date instanceof Date) {
    signals.date = signals.date.toISOString().slice(0, 10)
  }

  const contentSummary = await buildContentSummary()
  const currentFiles = await readCurrentFiles()

  return { signals, contentSummary, currentFiles }
}
