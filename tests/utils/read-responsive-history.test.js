import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdtemp, rm, mkdir, writeFile } from 'fs/promises'
import { tmpdir } from 'os'
import path from 'path'
import { readResponsiveHistory } from '../../scripts/utils/read-responsive-history.js'

describe('readResponsiveHistory', () => {
  let root
  beforeEach(async () => {
    root = await mkdtemp(path.join(tmpdir(), 'rh-'))
  })
  afterEach(async () => {
    await rm(root, { recursive: true, force: true })
  })

  async function plantBuild(date, buildId, metrics) {
    const dir = path.join(root, 'archive', date, `build-${buildId}`)
    await mkdir(dir, { recursive: true })
    await writeFile(path.join(dir, 'responsive-metrics.json'), JSON.stringify(metrics))
  }

  it('returns empty array when no archive exists', async () => {
    expect(await readResponsiveHistory({ root, limit: 10 })).toEqual([])
  })

  it('reads metrics across multiple dates, newest first', async () => {
    await plantBuild('2026-04-10', '1', { buildId: '1', overallScore: 3 })
    await plantBuild('2026-04-12', '2', { buildId: '2', overallScore: 5 })
    await plantBuild('2026-04-11', '3', { buildId: '3', overallScore: 4 })
    const h = await readResponsiveHistory({ root, limit: 10 })
    expect(h.map(m => m.buildId)).toEqual(['2', '3', '1'])
  })

  it('respects limit', async () => {
    await plantBuild('2026-04-10', '1', { buildId: '1', overallScore: 3 })
    await plantBuild('2026-04-11', '2', { buildId: '2', overallScore: 5 })
    await plantBuild('2026-04-12', '3', { buildId: '3', overallScore: 4 })
    const h = await readResponsiveHistory({ root, limit: 2 })
    expect(h.length).toBe(2)
    expect(h[0].buildId).toBe('3')
  })
})
