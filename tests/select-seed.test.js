import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import {
  selectSeed,
  selectSeedContent,
  selectLaneIndex,
  parseSeedLanes,
  KNOWN_ARCHETYPES,
} from '../scripts/utils/select-seed.js'

describe('selectSeed', () => {
  it('returns matching seed file for lowercase archetype', () => {
    const p = selectSeed('poster')
    expect(p.endsWith('scripts/prompts/seeds/poster.md')).toBe(true)
    expect(existsSync(p)).toBe(true)
  })

  it('handles "Gallery Wall" → gallery-wall mapping', () => {
    const p = selectSeed('Gallery Wall')
    expect(p.endsWith('scripts/prompts/seeds/gallery-wall.md')).toBe(true)
    expect(existsSync(p)).toBe(true)
  })

  it('is case-insensitive and trims', () => {
    expect(selectSeed('  Poster  ')).toBe(selectSeed('poster'))
  })

  it('falls back to "stack" for unknown archetype', () => {
    expect(selectSeed('completely-made-up').endsWith('seeds/stack.md')).toBe(true)
  })

  it('all KNOWN_ARCHETYPES resolve to existing, non-empty files', () => {
    for (const a of KNOWN_ARCHETYPES) {
      const p = selectSeed(a)
      expect(existsSync(p)).toBe(true)
      expect(readFileSync(p, 'utf8').length).toBeGreaterThan(500)
    }
  })
})

describe('parseSeedLanes', () => {
  it('extracts lanes, header, and footer from a multi-lane file', () => {
    const content = [
      '# Seed: poster',
      '',
      'Intro sentence.',
      '',
      '<!-- LANE:lane-a -->',
      'Lane A body text.',
      '<!-- /LANE -->',
      '',
      '<!-- LANE:lane-b -->',
      'Lane B body text.',
      '<!-- /LANE -->',
      '',
      '## This is one lane',
      '',
      'Escape clause text.',
    ].join('\n')

    const { header, lanes, footer } = parseSeedLanes(content)
    expect(header).toContain('# Seed: poster')
    expect(header).toContain('Intro sentence.')
    expect(lanes).toHaveLength(2)
    expect(lanes[0]).toEqual({ id: 'lane-a', body: 'Lane A body text.' })
    expect(lanes[1]).toEqual({ id: 'lane-b', body: 'Lane B body text.' })
    expect(footer).toContain('This is one lane')
    expect(footer).toContain('Escape clause text.')
  })

  it('returns an empty lanes array for a file with no LANE markers', () => {
    const { header, lanes, footer } = parseSeedLanes('# Seed: legacy\n\nNo lanes here.')
    expect(lanes).toEqual([])
    expect(header).toContain('No lanes here.')
    expect(footer).toBe('')
  })
})

describe('selectLaneIndex', () => {
  it('same date+archetype always picks the same lane', () => {
    const a = selectLaneIndex('poster', '2026-08-23', 3)
    const b = selectLaneIndex('poster', '2026-08-23', 3)
    expect(a).toBe(b)
  })

  it('is normalized the same way as selectSeed (case/spacing-insensitive)', () => {
    expect(selectLaneIndex('Gallery Wall', '2026-08-23', 3)).toBe(
      selectLaneIndex('gallery-wall', '2026-08-23', 3)
    )
  })

  it('different dates distribute across lanes rather than always picking lane 0', () => {
    const dates = [
      '2026-01-01',
      '2026-02-02',
      '2026-03-03',
      '2026-04-04',
      '2026-05-05',
      '2026-06-06',
      '2026-07-07',
      '2026-08-08',
      '2026-09-09',
      '2026-10-10',
      '2026-11-11',
      '2026-12-12',
    ]
    const indices = new Set(dates.map((d) => selectLaneIndex('poster', d, 3)))
    expect(indices.size).toBeGreaterThan(1)
  })

  it('always returns an index within [0, laneCount)', () => {
    for (let i = 0; i < 30; i++) {
      const idx = selectLaneIndex('stack', `2026-01-${String(i + 1).padStart(2, '0')}`, 2)
      expect(idx).toBeGreaterThanOrEqual(0)
      expect(idx).toBeLessThan(2)
    }
  })
})

describe('selectSeedContent', () => {
  it('every KNOWN_ARCHETYPES seed file has at least 2 lanes', () => {
    for (const a of KNOWN_ARCHETYPES) {
      const raw = readFileSync(selectSeed(a), 'utf8')
      const { lanes } = parseSeedLanes(raw)
      expect(lanes.length).toBeGreaterThanOrEqual(2)
    }
  })

  it('same date+archetype returns the same lane content (reproducible)', () => {
    const a = selectSeedContent('poster', '2026-08-23')
    const b = selectSeedContent('poster', '2026-08-23')
    expect(a).toEqual(b)
  })

  it('picks different lanes across a spread of dates', () => {
    const dates = [
      '2026-01-01',
      '2026-02-02',
      '2026-03-03',
      '2026-04-04',
      '2026-05-05',
      '2026-06-06',
      '2026-07-07',
      '2026-08-08',
      '2026-09-09',
      '2026-10-10',
      '2026-11-11',
      '2026-12-12',
    ]
    const laneIds = new Set(dates.map((d) => selectSeedContent('poster', d).laneId))
    expect(laneIds.size).toBeGreaterThan(1)
  })

  it('keeps the "this is one lane" escape clause in the assembled content', () => {
    const { content } = selectSeedContent('poster', '2026-08-23')
    expect(content).toMatch(/this is one lane/i)
  })

  it('assembled content is roughly the same size as a single-lane seed used to be (not all lanes concatenated)', () => {
    const { content, laneCount } = selectSeedContent('poster', '2026-08-23')
    const raw = readFileSync(selectSeed('poster'), 'utf8')
    expect(laneCount).toBeGreaterThanOrEqual(2)
    // The assembled (single-lane) content should be well under half the
    // full multi-lane file — if it were close to the full file size, the
    // lane selection wouldn't be doing its job of injecting just one lane.
    expect(content.length).toBeLessThan(raw.length * 0.7)
  })
})
