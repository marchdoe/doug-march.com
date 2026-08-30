import { describe, it, expect, beforeEach, vi } from 'vitest'
import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { tempRepoRoot } from '../helpers/tmp.js'

// Stub captureSnapshot — it spawns `vite preview`, which is far slower than the
// per-test timeout. This test is about the record archive() leaves behind.
vi.mock('../../scripts/utils/snapshot.js', () => ({
  captureSnapshot: vi.fn().mockResolvedValue(undefined),
}))

// Stub the seal too. archive() reseals the whole archive on the way out, which
// is correct in the pipeline and wrong in a unit test — on an unsealed checkout
// it would quietly rewrite 1,000 committed files as a side effect of running
// the suite. The seal has its own tests against a temp tree.
vi.mock('../../scripts/seal-archive.js', () => ({
  sealArchive: vi.fn().mockResolvedValue({ dates: 0, scanned: 0, changed: [] }),
}))

const { archive } = await import('../../scripts/utils/archiver.js')

describe('archive() — record.json', () => {
  // A temp root, not the repo. These tests used to write archive/2099-01-0x/
  // and public/archive/2099-01-0x/ into the working tree and clean up by hand
  // afterwards — and the cleanup keyed on a path recorded only after archive()
  // returned, so a throw part-way through leaked the directories. The stale
  // public/archive/<date>.png line was cleaning a path #154 had already moved.
  let ROOT
  beforeEach(async () => {
    ROOT = await tempRepoRoot()
  })

  it('writes the day’s record from the artifacts it just archived', async () => {
    const date = '2099-01-04'
    const signals = { date, lunar: { illumination: 0.42 }, golf: { tournament: 'Test Open' } }
    const scheme = {
      primary_hue: { h: 200, s: 70, l: 50, name: 'test blue' },
      mood_word: 'crisp',
      color_story: 'Test.',
    }

    await archive(
      date,
      signals,
      'A rationale.',
      'A brief.',
      ['elements/preset.ts'],
      {},
      scheme,
      null,
      {},
      { root: ROOT }
    )
    const createdDir = path.join(ROOT, 'archive', date)

    const recordPath = path.join(createdDir, 'record.json')
    expect(existsSync(recordPath)).toBe(true)
    const record = JSON.parse(await readFile(recordPath, 'utf8'))

    expect(record.date).toBe(date)
    expect(record.era).toBe('grammar')
    expect(record.brief).toBe('A brief.')
    expect(record.rationale).toBe('A rationale.')
    expect(record.filesChanged).toEqual(['elements/preset.ts'])
    expect(record.colorScheme.mood_word).toBe('crisp')
    expect(record.buildId).toMatch(/^\d+$/)
    expect(record.attempts).toBe(1)
    expect(record.generatedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/)
  })

  // trace.json is written by design-agents.js after archive() returns, so a
  // record that lifted signals from disk would be blank on every live build.
  it('takes signals from the run rather than from a trace that is not written yet', async () => {
    const date = '2099-01-05'
    const signals = { date, hacker_news: { stories: ['How Complex Systems Fail'] } }

    await archive(date, signals, 'r', 'b', [], {}, null, null, {}, { root: ROOT })
    const createdDir = path.join(ROOT, 'archive', date)

    const record = JSON.parse(await readFile(path.join(createdDir, 'record.json'), 'utf8'))
    expect(record.signals).toEqual(signals)
  })
})
