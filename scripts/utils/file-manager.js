import { readFile, writeFile, mkdir, unlink } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const ROOT = path.resolve(__dirname, '../..')

// Allowlist: the ONLY directories where AI-generated code may be written.
// Any path outside these prefixes is rejected. This is the primary defense
// against a malicious or prompt-injected agent overwriting the pipeline,
// workflows, package.json, .env, or other sensitive files.
const ALLOWED_WRITE_PREFIXES = [
  'app/components/',
  'app/routes/',
  'app/stubs/',
  'elements/',  // only preset.ts; further restricted by ALLOWED_EXACT below
]

// Exact paths allowed for writes outside the prefix list.
// Currently empty — elements/preset.ts is covered by the prefix.
const ALLOWED_EXACT = new Set()

// Within allowed prefixes, these exact files are still forbidden.
// Protects generated files (routeTree.gen.ts) and content files that
// ship real hand-maintained data (projects, timeline).
const FORBIDDEN_EXACT = new Set([
  'app/routeTree.gen.ts',
])

const FORBIDDEN_PREFIXES = [
  'app/content/',     // projects.ts, timeline.ts — hand-maintained
  'app/server/',      // server functions — hand-maintained
  'app/styles/',      // panda css base styles
  'app/assets/',      // static assets
  'elements/theme/',  // canonical theme files
]

/**
 * Normalize and validate a relative write path.
 * Returns the normalized path if allowed, throws otherwise.
 *
 * This is the enforcement point for every AI-generated write.
 * It defends against path traversal, lateral escapes into protected
 * directories, and writes to sensitive file categories.
 *
 * @param {string} relPath - relative path from ROOT
 * @returns {string} normalized relative path
 * @throws if the path is not in the allowlist or escapes ROOT
 */
export function validateWritePath(relPath) {
  if (typeof relPath !== 'string' || !relPath) {
    throw new Error(`Invalid write path: ${relPath}`)
  }

  // Normalize the relative path first (collapses ./, resolves ..).
  // POSIX separators in path.posix.normalize for cross-platform safety.
  const normalized = path.posix.normalize(relPath.replace(/\\/g, '/'))

  // Reject any path that still contains .. after normalization
  // (means it escapes the root).
  if (normalized.startsWith('..') || normalized.includes('/../') || normalized === '..') {
    throw new Error(`Path traversal rejected: ${relPath} → ${normalized}`)
  }

  // Reject absolute paths
  if (path.isAbsolute(normalized)) {
    throw new Error(`Absolute path rejected: ${relPath}`)
  }

  // Reject dotfile writes (e.g., .env, .github/, .npmrc)
  if (normalized.startsWith('.') || normalized.includes('/.')) {
    throw new Error(`Dotfile path rejected: ${relPath}`)
  }

  // Check forbidden-exact before allowlist (belt and suspenders)
  if (FORBIDDEN_EXACT.has(normalized)) {
    throw new Error(`Forbidden file write: ${normalized}`)
  }
  for (const prefix of FORBIDDEN_PREFIXES) {
    if (normalized.startsWith(prefix)) {
      throw new Error(`Forbidden directory write: ${normalized} (in ${prefix})`)
    }
  }

  // Must match allowlist
  const inAllowedPrefix = ALLOWED_WRITE_PREFIXES.some((prefix) =>
    normalized.startsWith(prefix)
  )
  const inAllowedExact = ALLOWED_EXACT.has(normalized)

  if (!inAllowedPrefix && !inAllowedExact) {
    throw new Error(
      `Path not in write allowlist: ${normalized}. ` +
      `Allowed prefixes: ${ALLOWED_WRITE_PREFIXES.join(', ')}`
    )
  }

  // Final check: resolved absolute path must stay inside ROOT
  const absPath = path.resolve(ROOT, normalized)
  if (!absPath.startsWith(ROOT + path.sep) && absPath !== ROOT) {
    throw new Error(`Resolved path escapes ROOT: ${relPath} → ${absPath}`)
  }

  return normalized
}

/**
 * Read each file in filePaths. Returns Map<relativePath, content|null>.
 * null means the file did not exist at backup time.
 * @param {string[]} filePaths - relative paths from repo root
 * @returns {Promise<Map<string, string|null>>}
 */
export async function backup(filePaths) {
  const map = new Map()
  for (const relPath of filePaths) {
    const absPath = path.join(ROOT, relPath)
    if (existsSync(absPath)) {
      const content = await readFile(absPath, 'utf8')
      map.set(relPath, content)
    } else {
      map.set(relPath, null)
    }
  }
  return map
}

/**
 * Write an array of { path, content } objects to disk.
 * Every path is validated against the write allowlist — any rejected
 * path throws an error that aborts the whole write batch. The caller
 * is expected to restore from backup on failure.
 *
 * Returns the list of normalized paths that were written (for tracking
 * what needs cleanup on rollback, including files the AI may have
 * invented beyond the canonical mutable list).
 *
 * @param {{ path: string, content: string }[]} filesArray
 * @returns {Promise<string[]>} normalized paths written
 */
export async function writeFiles(filesArray) {
  const written = []
  for (const { path: relPath, content } of filesArray) {
    // validateWritePath throws on any violation — we let it propagate
    // so the caller restores from backup rather than silently skipping.
    const normalized = validateWritePath(relPath)

    const absPath = path.resolve(ROOT, normalized)
    const dir = path.dirname(absPath)
    await mkdir(dir, { recursive: true })
    await writeFile(absPath, content, 'utf8')
    console.log(`  wrote: ${normalized}`)
    written.push(normalized)
  }
  return written
}

/**
 * Restore files from a backup Map.
 * Files that were null in the backup (did not exist before) are deleted.
 * @param {Map<string, string|null>} backupMap
 */
export async function restore(backupMap) {
  for (const [relPath, content] of backupMap.entries()) {
    const absPath = path.join(ROOT, relPath)
    if (content === null) {
      // File didn't exist before — delete it if it now exists
      if (existsSync(absPath)) {
        await unlink(absPath)
        console.log(`  restored (deleted): ${relPath}`)
      }
    } else {
      await writeFile(absPath, content, 'utf8')
      console.log(`  restored: ${relPath}`)
    }
  }
}

/**
 * Delete any "orphan" files — paths written during the swarm that were
 * not in the original backup. The AI may invent new file paths beyond
 * the canonical MUTABLE_FILES list; if a later step fails, restore()
 * alone won't clean these up because they're not in the backup.
 *
 * Call this during rollback to ensure a clean slate.
 *
 * @param {Set<string>|string[]} writtenPaths - all paths written in this run
 * @param {Map<string, string|null>} backupMap - the original backup
 */
export async function cleanupOrphans(writtenPaths, backupMap) {
  const paths = writtenPaths instanceof Set ? writtenPaths : new Set(writtenPaths)
  for (const relPath of paths) {
    if (backupMap.has(relPath)) continue  // covered by restore()
    const absPath = path.join(ROOT, relPath)
    if (existsSync(absPath)) {
      try {
        await unlink(absPath)
        console.log(`  orphan cleaned: ${relPath}`)
      } catch (err) {
        console.warn(`  orphan cleanup failed for ${relPath}: ${err.message}`)
      }
    }
  }
}
