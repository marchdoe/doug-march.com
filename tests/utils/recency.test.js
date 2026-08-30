import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { lastDistinct, readArtifact, readRecentArtifacts } from '../../scripts/utils/recency.js'

let archiveDir

beforeEach(() => {
  archiveDir = mkdtempSync(path.join(tmpdir(), 'recency-'))
})

afterEach(() => {
  rmSync(archiveDir, { recursive: true, force: true })
})

function writeBuild(date, files, { buildId = '1', shipped = true } = {}) {
  const dir = path.join(archiveDir, date, `build-${buildId}`)
  mkdirSync(dir, { recursive: true })
  for (const [name, body] of Object.entries(files)) {
    writeFileSync(path.join(dir, name), typeof body === 'string' ? body : JSON.stringify(body))
  }
  if (shipped) {
    // recent-builds.js resolves the shipped build through record.json.
    writeFileSync(
      path.join(archiveDir, date, 'record.json'),
      JSON.stringify({ date, buildId: `build-${buildId}` })
    )
  }
  return dir
}

describe('readArtifact', () => {
  it('reads JSON, and treats missing or malformed as null', () => {
    const dir = writeBuild('2026-08-20', { 'shell.json': { footer: 'none' }, 'bad.json': '{ nope' })
    expect(readArtifact(dir, 'shell.json')).toEqual({ footer: 'none' })
    expect(readArtifact(dir, 'bad.json')).toBeNull()
    expect(readArtifact(dir, 'absent.json')).toBeNull()
  })
})

describe('readRecentArtifacts', () => {
  it('walks newest first and hands each build a bound reader', () => {
    writeBuild('2026-08-18', { 'shell.json': { footer: 'a' } })
    writeBuild('2026-08-19', { 'shell.json': { footer: 'b' } })
    writeBuild('2026-08-20', { 'shell.json': { footer: 'c' } })
    const got = readRecentArtifacts(archiveDir, 7, ({ date, read }) => ({
      date,
      footer: read('shell.json')?.footer,
    }))
    expect(got.map((g) => g.footer)).toEqual(['c', 'b', 'a'])
  })

  it('drops a date when pick returns null, so a build predating the artifact is skipped, not zeroed', () => {
    writeBuild('2026-08-19', { 'other.json': {} })
    writeBuild('2026-08-20', { 'shell.json': { footer: 'c' } })
    const got = readRecentArtifacts(archiveDir, 7, ({ read }) => read('shell.json')?.footer ?? null)
    expect(got).toEqual(['c'])
  })

  it('returns [] for an archive that does not exist', () => {
    expect(readRecentArtifacts(path.join(archiveDir, 'nope'), 7, () => 1)).toEqual([])
  })
})

describe('lastDistinct', () => {
  it('keeps first-seen order and stops at n', () => {
    expect(lastDistinct(['a', 'b', 'a', 'c', 'd'], 3)).toEqual(['a', 'b', 'c'])
  })

  it('skips null and undefined rather than counting them', () => {
    expect(lastDistinct([null, 'a', undefined, 'b'], 3)).toEqual(['a', 'b'])
  })

  it('returns fewer than n when there are fewer distinct values', () => {
    expect(lastDistinct(['a', 'a', 'a'], 3)).toEqual(['a'])
  })
})
