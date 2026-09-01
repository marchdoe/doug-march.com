/**
 * The two pipeline entrypoints, checked against what they actually do.
 *
 * #305: run-pipeline.js's header comment said signal collection was
 * "skipped if already collected today". No such check exists anywhere in
 * the repo — the header described a freshness check that was never built,
 * or was removed without updating the comment. daily-redesign.js called
 * process.exit(0) immediately after its last console.log; on a pipe, which
 * is what GitHub Actions gives it, stdout is async and the exit can cut off
 * the last lines before they flush.
 *
 * #341: ci.yml declared no permissions block at all, so every one of its
 * jobs held the repository's default token scope for a workflow that never
 * reads a secret and runs branch code, some of it LLM-written.
 */

import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import * as yaml from 'js-yaml'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')
const read = (rel) => readFileSync(path.join(ROOT, rel), 'utf8')

describe('run-pipeline.js', () => {
  const src = read('scripts/run-pipeline.js')

  it('does not claim signal collection is skipped when already collected', () => {
    expect(src).not.toMatch(/skipped if already collected/)
  })

  it('still runs collect-signals.js unconditionally', () => {
    expect(src).toMatch(/node scripts\/collect-signals\.js/)
  })
})

describe('daily-redesign.js', () => {
  const src = read('scripts/daily-redesign.js')

  it('drains stdout before exiting on the success path', () => {
    expect(src).toMatch(/process\.stdout\.write\('', \(\) => process\.exit\(0\)\)/)
  })

  it('has no bare process.exit(0) left to race the pipe', () => {
    // Every process.exit(0) in the file must be the argument to the drain
    // callback above; strip that one occurrence out and none should remain.
    const withoutDrain = src.replace(
      /process\.stdout\.write\('', \(\) => process\.exit\(0\)\)/g,
      ''
    )
    expect(withoutDrain).not.toMatch(/process\.exit\(0\)/)
  })
})

describe('ci.yml holds a read-only token', () => {
  const src = read('.github/workflows/ci.yml')

  it('declares a top-level permissions: block before jobs:', () => {
    const permIndex = src.indexOf('\npermissions:')
    const jobsIndex = src.indexOf('\njobs:')
    expect(permIndex).toBeGreaterThan(-1)
    expect(jobsIndex).toBeGreaterThan(-1)
    expect(permIndex).toBeLessThan(jobsIndex)
  })

  it('sets contents: read at the top level once parsed', () => {
    const doc = yaml.load(src)
    expect(doc.permissions).toEqual({ contents: 'read' })
  })

  it('still uses no secret or token — nothing here needed write access', () => {
    expect(src).not.toMatch(/secrets\./)
    expect(src).not.toMatch(/GITHUB_TOKEN/)
  })
})
