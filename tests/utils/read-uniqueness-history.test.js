import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { readUniquenessHistory } from '../../scripts/utils/read-uniqueness-history.js'

let root

beforeEach(() => {
  root = mkdtempSync(path.join(tmpdir(), 'uniq-history-'))
})

afterEach(() => {
  rmSync(root, { recursive: true, force: true })
})

function writeBuild(date, files, buildId = '1') {
  const dir = path.join(root, 'archive', date, `build-${buildId}`)
  mkdirSync(dir, { recursive: true })
  for (const [name, body] of Object.entries(files)) {
    writeFileSync(path.join(dir, name), typeof body === 'string' ? body : JSON.stringify(body))
  }
}

describe('readUniquenessHistory', () => {
  it('returns [] when there is no archive at all', async () => {
    expect(await readUniquenessHistory({ root })).toEqual([])
  })

  it('reads newest first and honours the limit', async () => {
    writeBuild('2026-08-18', { 'lane.json': { laneId: 'a' } })
    writeBuild('2026-08-19', { 'lane.json': { laneId: 'b' } })
    writeBuild('2026-08-20', { 'lane.json': { laneId: 'c' } })
    const got = await readUniquenessHistory({ root, limit: 2 })
    expect(got.map((g) => g.lane)).toEqual(['c', 'b'])
  })

  it('excludes the date being scored and anything after it', async () => {
    writeBuild('2026-08-19', { 'lane.json': { laneId: 'b' } })
    writeBuild('2026-08-20', { 'lane.json': { laneId: 'c' } })
    writeBuild('2026-08-21', { 'lane.json': { laneId: 'd' } })
    const got = await readUniquenessHistory({ root, before: '2026-08-20' })
    expect(got.map((g) => g.date)).toEqual(['2026-08-19'])
  })

  it('keeps a day with no artifacts as an empty entry rather than sliding an older day in', async () => {
    // The index needs to know the day existed and could not be compared.
    mkdirSync(path.join(root, 'archive', '2026-08-20', 'build-1'), { recursive: true })
    writeBuild('2026-08-19', { 'lane.json': { laneId: 'b' } })
    const got = await readUniquenessHistory({ root, limit: 2 })
    expect(got.map((g) => g.date)).toEqual(['2026-08-20', '2026-08-19'])
    expect(got[0]).toMatchObject({ lane: null, hue: null, composition: null, fingerprint: null })
  })

  it('takes the hue from color-scheme.json only when it is a number', async () => {
    writeBuild('2026-08-20', { 'color-scheme.json': { primary_hue: { h: 210 } } })
    writeBuild('2026-08-19', { 'color-scheme.json': { primary_hue: { h: 'blue' } } })
    const got = await readUniquenessHistory({ root })
    expect(got.map((g) => g.hue)).toEqual([210, null])
  })

  it('reads the build that shipped, not the newest one on disk', async () => {
    // #308: 2026-04-30 has a complete-looking retry (build-1777547559412,
    // hue 285) newer than the build record.json names (build-1777546126760,
    // hue 340). Both readers took the retry and scored a week of designs
    // against a hue the site never wore. pickBuild matches the date's
    // brief.md to the build whose brief.md is identical.
    writeBuild(
      '2026-04-30',
      { 'brief.md': 'shipped', 'color-scheme.json': { primary_hue: { h: 340 } } },
      '1777546126760'
    )
    writeBuild(
      '2026-04-30',
      { 'brief.md': 'retry', 'color-scheme.json': { primary_hue: { h: 285 } } },
      '1777547559412'
    )
    writeFileSync(path.join(root, 'archive', '2026-04-30', 'brief.md'), 'shipped')
    const got = await readUniquenessHistory({ root })
    expect(got.map((g) => g.hue)).toEqual([340])
  })

  it('does not read a build-pre-* dir, which pickBuild rejects', async () => {
    const pre = path.join(root, 'archive', '2026-08-20', 'build-pre-5')
    mkdirSync(pre, { recursive: true })
    writeFileSync(path.join(pre, 'lane.json'), JSON.stringify({ laneId: 'pre' }))
    writeBuild('2026-08-20', { 'lane.json': { laneId: 'shipped' } }, '5')
    const got = await readUniquenessHistory({ root })
    expect(got[0].lane).toBe('shipped')
  })

  it('skips failed builds and falls back to the date dir for pre-build-id layouts', async () => {
    const failed = path.join(root, 'archive', '2026-08-20', 'build-failed-9')
    mkdirSync(failed, { recursive: true })
    writeFileSync(path.join(failed, 'lane.json'), JSON.stringify({ laneId: 'nope' }))
    const dateDir = path.join(root, 'archive', '2026-08-20')
    writeFileSync(path.join(dateDir, 'lane.json'), JSON.stringify({ laneId: 'legacy' }))
    const got = await readUniquenessHistory({ root })
    expect(got[0].lane).toBe('legacy')
  })
})
