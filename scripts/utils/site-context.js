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
  'app/components/MobileFooter.tsx',
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
 * Read and return all context Claude needs to produce a redesign.
 * @returns {Promise<{ signals: object, contentSummary: string, currentFiles: Array<{path: string, content: string}> }>}
 */
export async function readContext() {
  // Parse signals YAML
  const signalsPath = path.join(ROOT, 'signals/today.yml')
  const signalsRaw = await readFile(signalsPath, 'utf8')
  const signals = yaml.load(signalsRaw)

  const contentSummary = await buildContentSummary()
  const currentFiles = await readCurrentFiles()

  return { signals, contentSummary, currentFiles }
}
