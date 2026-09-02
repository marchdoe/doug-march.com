import { describe, expect, it } from 'vitest'

import { isArchiveDetail } from '../../app/types/archive-record'
import type { ArchiveDetail } from '../../app/types/archive-record'

function detail(over: Partial<ArchiveDetail> = {}): ArchiveDetail {
  return {
    date: '2026-07-20',
    era: 'grammar',
    generatedAt: '2026-07-20T12:00:00Z',
    buildId: '1',
    attempts: 1,
    brief: 'A brief.',
    rationale: null,
    filesChanged: [],
    legacyArchetype: null,
    signals: null,
    hero: { copy: null, rationale: null, source: null },
    chassis: 'spectral-albert',
    adBrief: null,
    tokens: { colors: { ramps: {}, semantic: {} } },
    colorScheme: null,
    shell: null,
    verdicts: null,
    composition: null,
    lane: null,
    cost: null,
    hasScreenshot: true,
    pages: 9,
    uniqueness: null,
    run: null,
    ...over,
  }
}

describe('isArchiveDetail', () => {
  it('accepts a real-shaped record', () => {
    expect(isArchiveDetail(detail())).toBe(true)
  })

  it('rejects {}', () => {
    expect(isArchiveDetail({})).toBe(false)
  })

  it('rejects null and non-objects', () => {
    expect(isArchiveDetail(null)).toBe(false)
    expect(isArchiveDetail(undefined)).toBe(false)
    expect(isArchiveDetail('2026-07-20')).toBe(false)
    expect(isArchiveDetail([])).toBe(false)
  })

  it('rejects a record missing tokens', () => {
    const { tokens, ...rest } = detail()
    expect(isArchiveDetail(rest)).toBe(false)
  })

  it('accepts tokens: null — some eras had no token set', () => {
    expect(isArchiveDetail(detail({ tokens: null }))).toBe(true)
  })

  it('rejects a record missing hasScreenshot or pages', () => {
    const { hasScreenshot, ...withoutScreenshot } = detail()
    expect(isArchiveDetail(withoutScreenshot)).toBe(false)
    const { pages, ...withoutPages } = detail()
    expect(isArchiveDetail(withoutPages)).toBe(false)
  })
})
