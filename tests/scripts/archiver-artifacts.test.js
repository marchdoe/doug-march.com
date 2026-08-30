import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdtempSync, rmSync, existsSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'

// Tests writeArtifacts() directly — it owns the behaviour under test. (The
// note that used to sit here said archive() could not be relocated off the
// repo root; it takes a `root` option now, which is what the archiver tests
// beside this one use.)
import { writeArtifacts } from '../../scripts/utils/archiver.js'

describe('writeArtifacts', () => {
  let dir
  beforeEach(() => {
    dir = mkdtempSync(path.join(tmpdir(), 'artifacts-'))
  })
  afterEach(() => {
    rmSync(dir, { recursive: true, force: true })
  })

  it('writes Buffer and string artifacts into the build dir', async () => {
    await writeArtifacts(dir, {
      'screenshot.png': Buffer.from([0x89, 0x50, 0x4e, 0x47]),
      'verdicts.json': JSON.stringify([{ critic: 'spec-critic', verdict: 'APPROVED' }]),
    })
    expect(existsSync(path.join(dir, 'screenshot.png'))).toBe(true)
    const verdicts = JSON.parse(readFileSync(path.join(dir, 'verdicts.json'), 'utf8'))
    expect(verdicts[0].critic).toBe('spec-critic')
  })

  it('skips null/undefined values and never throws on a bad entry', async () => {
    await writeArtifacts(dir, {
      'a.txt': null,
      'b.txt': 'ok',
      '../escape.txt': 'nope',
      'missing-dir/x.txt': 'data',
    })
    expect(existsSync(path.join(dir, 'a.txt'))).toBe(false)
    expect(existsSync(path.join(dir, 'b.txt'))).toBe(true)
    expect(existsSync(path.join(path.dirname(dir), 'escape.txt'))).toBe(false)
  })
})
