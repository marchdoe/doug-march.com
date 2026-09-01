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
 */

import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

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
