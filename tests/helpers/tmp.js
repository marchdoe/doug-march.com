/**
 * Temp directories, created and removed the same way everywhere.
 *
 * The `mkdtemp → use → rm` dance was written out in sixteen files across
 * thirty-five call sites, each with its own prefix and its own cleanup hook,
 * and the ones that got it wrong were the ones that wrote into the repo
 * instead. Cleanup here is registered with the test runner at creation time,
 * so a directory is removed even when the assertion between throws.
 */
import { mkdtemp, rm } from 'node:fs/promises'
import { mkdirSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { afterEach } from 'vitest'

const pending = new Set()

afterEach(async () => {
  for (const dir of pending) {
    await rm(dir, { recursive: true, force: true })
  }
  pending.clear()
})

/**
 * A fresh temp directory, removed after the current test.
 * @param {string} [prefix] shows up in the path, so a leak names its owner
 * @returns {Promise<string>} absolute path
 */
export async function tempDir(prefix = 'dm-test-') {
  const dir = await mkdtemp(path.join(tmpdir(), prefix))
  pending.add(dir)
  return dir
}

/**
 * A temp directory shaped like the repo root, for code that expects to find
 * `archive/`, `public/` and `signals/` beneath it.
 * @returns {Promise<string>} absolute path to the fake root
 */
export async function tempRepoRoot(prefix = 'dm-root-') {
  const root = await tempDir(prefix)
  for (const d of ['archive', 'public/archive', 'public/archive-data', 'signals', 'elements']) {
    mkdirSync(path.join(root, ...d.split('/')), { recursive: true })
  }
  return root
}

/** Write a file inside `root`, creating parent directories. */
export function writeUnder(root, relPath, contents) {
  const full = path.join(root, ...relPath.split('/'))
  mkdirSync(path.dirname(full), { recursive: true })
  writeFileSync(full, contents, 'utf8')
  return full
}
