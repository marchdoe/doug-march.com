import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import {
  parseLaneFrontmatter,
  loadLanes,
  validateAffinities,
  extractRecentLanes,
  selectLane,
} from '../../scripts/utils/select-lane.js'
import { AXIS_NAMES, COMPOSITION_AXES } from '../../scripts/utils/composition-grammar.js'

describe('parseLaneFrontmatter', () => {
  it('parses id, register, and a comma-separated affinity list', () => {
    const raw = [
      '---',
      'id: tesla-spacex',
      'register: radical-subtraction',
      'affinity: full-bleed, sparse, single, edge-bound',
      '---',
      '',
      '**Lane: Tesla / SpaceX**',
      '',
      'Body text.',
    ].join('\n')
    const parsed = parseLaneFrontmatter(raw)
    expect(parsed.id).toBe('tesla-spacex')
    expect(parsed.register).toBe('radical-subtraction')
    expect(parsed.affinity).toEqual(['full-bleed', 'sparse', 'single', 'edge-bound'])
    expect(parsed.body).toBe('**Lane: Tesla / SpaceX**\n\nBody text.')
  })

  it('trims whitespace around each affinity value', () => {
    const raw = '---\nid: x\naffinity:  full-bleed ,sparse,  single\n---\nbody'
    expect(parseLaneFrontmatter(raw).affinity).toEqual(['full-bleed', 'sparse', 'single'])
  })

  it('degrades to an empty parse for content with no front-matter', () => {
    const parsed = parseLaneFrontmatter('Just a plain markdown file, no frontmatter.')
    expect(parsed).toEqual({
      id: null,
      register: null,
      affinity: [],
      body: 'Just a plain markdown file, no frontmatter.',
    })
  })

  it('handles a missing affinity field as an empty array, not a crash', () => {
    const raw = '---\nid: x\nregister: y\n---\nbody'
    expect(parseLaneFrontmatter(raw).affinity).toEqual([])
  })

  it('handles nullish input without throwing', () => {
    expect(() => parseLaneFrontmatter(undefined)).not.toThrow()
    expect(parseLaneFrontmatter(null).body).toBe('')
  })
})

describe('loadLanes — the real lane directory', () => {
  it('tripwire: exactly 17 flattened lanes (adding or removing one is a decision, not a side effect)', () => {
    expect(loadLanes()).toHaveLength(17)
  })

  it('gives every lane an id, a register, a non-empty affinity list, and a body', () => {
    for (const lane of loadLanes()) {
      expect(lane.id, JSON.stringify(lane)).toBeTruthy()
      expect(lane.register, `${lane.id} has no register`).toBeTruthy()
      expect(lane.affinity.length, `${lane.id} has no affinity values`).toBeGreaterThan(0)
      expect(lane.body.length, `${lane.id} has an empty body`).toBeGreaterThan(100)
    }
  })

  it('has no duplicate lane ids', () => {
    const ids = loadLanes().map((l) => l.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('carries no residual archetype-mechanics heading — Spatial Rhythm moved to the grammar', () => {
    for (const lane of loadLanes()) {
      expect(lane.body, `${lane.id} still has a Spatial rhythm section`).not.toMatch(
        /## Spatial rhythm/i
      )
    }
  })
})

describe('validateAffinities', () => {
  it('every real lane declares only genuine composition-axis values', () => {
    expect(validateAffinities(loadLanes())).toEqual([])
  })

  it('flags a value that is not in any axis vocabulary', () => {
    const lanes = [{ id: 'fake', affinity: ['full-bleed', 'made-up-value'] }]
    expect(validateAffinities(lanes)).toEqual([{ laneId: 'fake', value: 'made-up-value' }])
  })

  it('accepts every value from every axis', () => {
    for (const axis of AXIS_NAMES) {
      for (const value of COMPOSITION_AXES[axis]) {
        expect(validateAffinities([{ id: 'x', affinity: [value] }])).toEqual([])
      }
    }
  })
})

let archiveDir

beforeEach(() => {
  archiveDir = mkdtempSync(path.join(tmpdir(), 'select-lane-'))
})

afterEach(() => {
  rmSync(archiveDir, { recursive: true, force: true })
})

function writeLaneBuild(date, laneId, { buildId = '1' } = {}) {
  const dir = path.join(archiveDir, date, `build-${buildId}`)
  mkdirSync(dir, { recursive: true })
  writeFileSync(path.join(dir, 'lane.json'), JSON.stringify({ laneId }), 'utf8')
}

describe('extractRecentLanes', () => {
  it('returns [] for a non-existent archive — the case every current build hits', () => {
    expect(extractRecentLanes(path.join(archiveDir, 'nope'), 7)).toEqual([])
  })

  it('returns [] when no build has written lane.json', () => {
    mkdirSync(path.join(archiveDir, '2026-08-20', 'build-1'), { recursive: true })
    expect(extractRecentLanes(archiveDir, 7)).toEqual([])
  })

  it('reads newest date first and honours the lookback window', () => {
    writeLaneBuild('2026-08-18', 'apple')
    writeLaneBuild('2026-08-19', 'nike')
    writeLaneBuild('2026-08-20', 'linear')
    const got = extractRecentLanes(archiveDir, 2)
    expect(got).toEqual([
      { date: '2026-08-20', laneId: 'linear' },
      { date: '2026-08-19', laneId: 'nike' },
    ])
  })

  it('takes the newest build when a date has several', () => {
    writeLaneBuild('2026-08-20', 'apple', { buildId: '100' })
    writeLaneBuild('2026-08-20', 'nike', { buildId: '200' })
    expect(extractRecentLanes(archiveDir, 7)[0].laneId).toBe('nike')
  })

  it('skips a malformed artifact without losing the rest of the history', () => {
    const dir = path.join(archiveDir, '2026-08-20', 'build-1')
    mkdirSync(dir, { recursive: true })
    writeFileSync(path.join(dir, 'lane.json'), '{ not json')
    writeLaneBuild('2026-08-19', 'apple')
    expect(extractRecentLanes(archiveDir, 7)).toEqual([{ date: '2026-08-19', laneId: 'apple' }])
  })

  it('skips an artifact whose laneId is missing or not a string', () => {
    const dir = path.join(archiveDir, '2026-08-20', 'build-1')
    mkdirSync(dir, { recursive: true })
    writeFileSync(path.join(dir, 'lane.json'), JSON.stringify({ laneId: 42 }))
    expect(extractRecentLanes(archiveDir, 7)).toEqual([])
  })
})

describe('selectLane', () => {
  it('has lanes to choose from (the empty-directory throw in selectLane is unreachable from here)', () => {
    // loadLanes() reads a fixed LANES_DIR, so the guard that throws when it is
    // empty cannot be exercised without an injectable path. This asserts the
    // precondition the rest of the suite depends on, and nothing more.
    expect(loadLanes().length).toBeGreaterThan(0)
  })

  it('is deterministic for identical inputs', () => {
    const a = selectLane({ archiveDir, date: '2026-08-24', tuple: { columns: 'single' } })
    const b = selectLane({ archiveDir, date: '2026-08-24', tuple: { columns: 'single' } })
    expect(a.lane.id).toBe(b.lane.id)
    expect(a.scores).toEqual(b.scores)
  })

  it('varies the pick across dates rather than always returning the same lane', () => {
    const picks = new Set(
      Array.from(
        { length: 15 },
        (_, i) =>
          selectLane({ archiveDir, date: `2026-01-${String(i + 1).padStart(2, '0')}` }).lane.id
      )
    )
    expect(picks.size).toBeGreaterThan(1)
  })

  it('reports every lane in scores, highest first', () => {
    const { scores, laneCount } = selectLane({ archiveDir, date: '2026-08-24' })
    expect(laneCount).toBe(17)
    expect(scores).toHaveLength(17)
    for (let i = 1; i < scores.length; i++) {
      expect(scores[i - 1].score).toBeGreaterThanOrEqual(scores[i].score)
    }
  })

  it('honours the forbid window: the last 3 distinct lanes used are reported forbidden, the 4th is not', () => {
    writeLaneBuild('2026-08-23', 'apple')
    writeLaneBuild('2026-08-22', 'nike')
    writeLaneBuild('2026-08-21', 'linear')
    writeLaneBuild('2026-08-20', 'are-na') // 4th back — outside the window
    const { forbidden } = selectLane({ archiveDir, date: '2026-08-24' })
    expect(forbidden).toEqual(['apple', 'nike', 'linear'])
    expect(forbidden).not.toContain('are-na')
  })

  it("penalizes a forbidden lane's score relative to its own unforbidden score on the same day", () => {
    const date = '2026-08-24'
    const before = selectLane({ archiveDir, date })
    const target = before.scores[0].id // whichever lane the hash favors most today

    writeLaneBuild('2026-08-23', target)
    const after = selectLane({ archiveDir, date })

    const scoreOf = (result, id) => result.scores.find((s) => s.id === id).score
    expect(scoreOf(after, target)).toBeLessThan(scoreOf(before, target))
  })

  it("biases toward affinity match: a tuple matching a lane's full affinity list lifts its score", () => {
    const date = '2026-08-24'
    const lanes = loadLanes()
    const target = lanes.find((l) => l.id === 'linear') // affinity: interleaved, dense, even, single
    const matchingTuple = Object.fromEntries(target.affinity.map((v, i) => [`axis${i}`, v]))

    const withoutMatch = selectLane({ archiveDir, date, tuple: {} })
    const withMatch = selectLane({ archiveDir, date, tuple: matchingTuple })

    const scoreOf = (result) => result.scores.find((s) => s.id === 'linear').score
    expect(scoreOf(withMatch)).toBeGreaterThan(scoreOf(withoutMatch))
  })

  it('does not hard-filter a forbidden lane — it can still win when its affinity match is strong enough', () => {
    const lanes = loadLanes()
    const target = lanes.find((l) => l.id === 'linear')
    const matchingTuple = Object.fromEntries(target.affinity.map((v, i) => [`axis${i}`, v]))

    let targetWonWhileForbidden = false
    for (let day = 1; day <= 27; day++) {
      const historyDate = `2026-03-${String(day).padStart(2, '0')}`
      const queryDate = `2026-03-${String(day + 1).padStart(2, '0')}`
      writeLaneBuild(historyDate, 'linear')
      const result = selectLane({ archiveDir, date: queryDate, tuple: matchingTuple })
      rmSync(path.join(archiveDir, historyDate), { recursive: true, force: true })
      if (result.forbidden.includes('linear') && result.lane.id === 'linear') {
        targetWonWhileForbidden = true
        break
      }
    }
    expect(targetWonWhileForbidden).toBe(true)
  })
})
