/**
 * The suite must not rewrite the archive.
 *
 * `archive()` reseals every page under public/archive/ on the way out, which is
 * correct in the pipeline — today's build is what gives yesterday a next arrow
 * to point at — and wrong in a unit test, where it edits committed files as a
 * side effect of running vitest.
 *
 * It is worse than it sounds on a machine that holds a build which has not been
 * committed yet, which is the normal state of this working copy. There the seal
 * points the last committed day at a date the repository does not have, and the
 * result is nine modified files and a link that 404s in production. That
 * happened twice: once when Phase 3 landed, once again while fixing something
 * unrelated.
 *
 * A comment asking the next person to remember the mock is not a control, so
 * this asserts it.
 */

import { readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

const TESTS_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

/** Every test file, recursively. */
function testFiles(dir = TESTS_DIR) {
  const out = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...testFiles(full))
    else if (/\.test\.(js|ts|tsx)$/.test(entry.name)) out.push(full)
  }
  return out
}

const rel = (f) => path.relative(TESTS_DIR, f)

describe('tests that run the archiver', () => {
  const callers = testFiles()
    .map((file) => ({ file, src: readFileSync(file, 'utf8') }))
    // Files that pull in archive() itself, rather than a helper from the module.
    .filter(({ src }) =>
      /\barchive\b\s*}?\s*=?.*archiver\.js|{[^}]*\barchive\b[^}]*}\s*=/.test(src)
    )
    .filter(({ src }) => src.includes('archiver.js'))
    .filter(({ src }) => /\barchive\s*\(/.test(src))

  it('finds the ones that actually call archive()', () => {
    // Guards the detection above: if this drops to zero the rule below is
    // vacuously true and stops protecting anything.
    expect(callers.length).toBeGreaterThan(0)
  })

  it.each(callers.map((c) => [rel(c.file), c.src]))(
    '%s stubs the seal, so the suite leaves public/archive alone',
    (_name, src) => {
      expect(src).toMatch(/vi\.mock\(\s*['"][^'"]*seal-archive\.js['"]/)
    }
  )
})
