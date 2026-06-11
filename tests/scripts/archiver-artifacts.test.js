import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdtempSync, rmSync, existsSync, readFileSync, readdirSync } from 'fs'
import { tmpdir } from 'os'
import path from 'path'

// archive() writes under ROOT (repo root). We can't relocate ROOT, so test
// the new helper writeArtifacts() directly — it owns the new behavior.
import { writeArtifacts } from '../../scripts/utils/archiver.js'

describe('writeArtifacts', () => {
  let dir
  beforeEach(() => { dir = mkdtempSync(path.join(tmpdir(), 'artifacts-')) })
  afterEach(() => { rmSync(dir, { recursive: true, force: true }) })

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
    await writeArtifacts(dir, { 'a.txt': null, 'b.txt': 'ok' })
    expect(existsSync(path.join(dir, 'a.txt'))).toBe(false)
    expect(existsSync(path.join(dir, 'b.txt'))).toBe(true)
  })
})
