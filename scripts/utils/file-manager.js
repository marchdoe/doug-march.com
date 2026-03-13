import { readFile, writeFile, mkdir, unlink } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const ROOT = path.resolve(__dirname, '../..')

// Files Claude is never allowed to write — enforced at write time
const PROTECTED_PREFIXES = ['app/content/', 'styled-system/']
const PROTECTED_EXACT = [
  'app/routeTree.gen.ts',
  'package.json',
  'pnpm-lock.yaml',
  'panda.config.ts',
  'vite.config.ts',
  'postcss.config.cjs',
  'tsconfig.json',
]

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
 * Throws if any path is protected.
 * Creates parent directories as needed.
 * @param {{ path: string, content: string }[]} filesArray
 */
export async function writeFiles(filesArray) {
  for (const { path: relPath, content } of filesArray) {
    // Enforce protected file check
    const isProtectedPrefix = PROTECTED_PREFIXES.some((prefix) =>
      relPath.startsWith(prefix)
    )
    const isProtectedExact = PROTECTED_EXACT.includes(relPath)
    if (isProtectedPrefix || isProtectedExact) {
      throw new Error(
        `Claude attempted to write a protected file: ${relPath}. This is not allowed.`
      )
    }

    const absPath = path.join(ROOT, relPath)
    const dir = path.dirname(absPath)
    await mkdir(dir, { recursive: true })
    await writeFile(absPath, content, 'utf8')
    console.log(`  wrote: ${relPath}`)
  }
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
