/**
 * The walkers must read the build that shipped.
 *
 * This block was copy-pasted into eight modules, and all eight took the newest
 * build dir. `record.json` for 2026-04-30 names build-1777546126760; the newest
 * dir is build-1777547559412, a complete-looking retry that never shipped. Every
 * variance mandate — don't repeat last week's hue, don't reuse that shell — was
 * steering away from designs the site never wore.
 */
import { afterEach, describe, it, expect } from 'vitest'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import {
  lastDistinct,
  readRecentBuilds,
  readRecentDates,
} from '../../scripts/utils/recent-builds.js'

// (#228 adds tests/helpers/tmp.js for this; kept local so the two branches
// do not collide.)
const dirs = []
afterEach(() => {
  for (const d of dirs.splice(0)) rmSync(d, { recursive: true, force: true })
})

async function archiveWith(days) {
  const root = mkdtempSync(path.join(tmpdir(), 'dm-recent-'))
  dirs.push(root)
  for (const [date, builds] of Object.entries(days)) {
    const dateDir = path.join(root, date)
    mkdirSync(dateDir, { recursive: true })
    if (builds.shippedBrief !== undefined) {
      writeFileSync(path.join(dateDir, 'brief.md'), builds.shippedBrief, 'utf8')
    }
    for (const [name, brief] of Object.entries(builds.dirs ?? {})) {
      mkdirSync(path.join(dateDir, name), { recursive: true })
      if (brief !== null) writeFileSync(path.join(dateDir, name, 'brief.md'), brief, 'utf8')
    }
  }
  return root
}

describe('readRecentBuilds', () => {
  it('prefers the build whose brief matches the day’s shipped brief', async () => {
    // The 2026-04-30 shape: a later retry that never shipped.
    const root = await archiveWith({
      '2026-04-30': {
        shippedBrief: 'the one that shipped',
        dirs: {
          'build-1777546126760': 'the one that shipped',
          'build-1777547559412': 'an unshipped retry',
        },
      },
    })
    const [build] = readRecentBuilds(root, { lookbackDays: 5 })
    expect(build.buildId).toBe('1777546126760')
    expect(build.attempts).toBe(2)
  })

  it('skips a newer build dir that holds nothing', async () => {
    // The 2026-04-28 shape: newest dir contains only a .DS_Store.
    const root = await archiveWith({
      '2026-04-28': {
        shippedBrief: 'real work',
        dirs: { 'build-100': 'real work', 'build-200': null },
      },
    })
    expect(readRecentBuilds(root, { lookbackDays: 5 })[0].buildId).toBe('100')
  })

  it('ignores failed and pre-snapshot build dirs', async () => {
    const root = await archiveWith({
      '2026-05-01': { shippedBrief: 'b', dirs: { 'build-100': 'b' } },
    })
    mkdirSync(path.join(root, '2026-05-01', 'build-failed-999'), { recursive: true })
    mkdirSync(path.join(root, '2026-05-01', 'build-pre-999'), { recursive: true })
    const [build] = readRecentBuilds(root, { lookbackDays: 5 })
    expect(build.buildId).toBe('100')
  })

  it('returns dates newest first and honours the lookback window', async () => {
    const root = await archiveWith({
      '2026-05-01': { shippedBrief: 'a', dirs: { 'build-1': 'a' } },
      '2026-05-02': { shippedBrief: 'b', dirs: { 'build-2': 'b' } },
      '2026-05-03': { shippedBrief: 'c', dirs: { 'build-3': 'c' } },
    })
    expect(readRecentBuilds(root, { lookbackDays: 2 }).map((b) => b.date)).toEqual([
      '2026-05-03',
      '2026-05-02',
    ])
  })

  it('excludes today when asked, so a day is not compared against itself', async () => {
    const root = await archiveWith({
      '2026-05-01': { shippedBrief: 'a', dirs: { 'build-1': 'a' } },
      '2026-05-02': { shippedBrief: 'b', dirs: { 'build-2': 'b' } },
    })
    const dates = readRecentBuilds(root, { lookbackDays: 5, before: '2026-05-02' }).map(
      (b) => b.date
    )
    expect(dates).toEqual(['2026-05-01'])
  })

  it('skips dates with no build at all rather than throwing', async () => {
    const root = await archiveWith({
      '2026-05-01': { shippedBrief: 'a', dirs: {} },
      '2026-05-02': { shippedBrief: 'b', dirs: { 'build-2': 'b' } },
    })
    expect(readRecentBuilds(root, { lookbackDays: 5 }).map((b) => b.date)).toEqual(['2026-05-02'])
  })

  it('returns nothing for a missing archive', async () => {
    expect(readRecentBuilds('/nonexistent/archive')).toEqual([])
  })
})

describe('readRecentDates', () => {
  it('keeps a rated date whose build dir was never committed', async () => {
    // Ratings hang off the date. Filtering by "has a shipped build" would drop
    // this one, which is why ratings.js uses this and not readRecentBuilds.
    const root = await archiveWith({
      '2026-05-01': { shippedBrief: 'a', dirs: {} },
      '2026-05-02': { shippedBrief: 'b', dirs: { 'build-2': 'b' } },
    })
    expect(readRecentDates(root, { lookbackDays: 5 })).toEqual(['2026-05-02', '2026-05-01'])
  })
})

describe('lastDistinct', () => {
  it('keeps the newest occurrences in order', () => {
    expect(lastDistinct(['a', 'b', 'a', 'c'], 3)).toEqual(['a', 'b', 'c'])
  })

  it('skips nulls', () => {
    expect(lastDistinct([null, 'a', undefined, 'b'], 2)).toEqual(['a', 'b'])
  })

  it('stops at the requested count', () => {
    expect(lastDistinct(['a', 'b', 'c'], 2)).toEqual(['a', 'b'])
  })
})
