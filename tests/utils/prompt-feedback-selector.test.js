import { describe, it, expect } from 'vitest'
import { selectRecentFailure } from '../../scripts/utils/prompt-feedback-selector.js'

function build(overrides) {
  return {
    buildId: 'b',
    date: '2026-04-10',
    archetype: 'Specimen',
    overallScore: 2,
    worstFailure: { viewport: 'mobile', check: 'horizontalScroll', detail: 'x' },
    usedInPromptFor: [],
    ...overrides,
  }
}

describe('selectRecentFailure', () => {
  it('returns null on cold-start (<3 builds)', () => {
    const r = selectRecentFailure({ history: [build({}), build({})], todayArchetype: 'Specimen', today: '2026-04-17' })
    expect(r.lesson).toBeNull()
  })

  it('prefers matching archetype', () => {
    const history = [
      build({ buildId: 'old-gw', archetype: 'Gallery Wall' }),
      build({ buildId: 'old-sp', archetype: 'Specimen', date: '2026-04-14' }),
      build({ buildId: 'old-sc', archetype: 'Scroll' }),
    ]
    const r = selectRecentFailure({ history, todayArchetype: 'Specimen', today: '2026-04-17' })
    expect(r.lesson).toContain('2026-04-14')
    expect(r.selectedBuildId).toBe('old-sp')
  })

  it('falls back to any archetype when none match', () => {
    const history = [
      build({ buildId: 'old-gw', archetype: 'Gallery Wall' }),
      build({ buildId: 'old-sc', archetype: 'Scroll' }),
      build({ buildId: 'old-st', archetype: 'Stack' }),
    ]
    const r = selectRecentFailure({ history, todayArchetype: 'Specimen', today: '2026-04-17' })
    expect(r.lesson).toBeTruthy()
  })

  it('skips builds where usedInPromptFor >= 2', () => {
    const history = [
      build({ buildId: 'used', usedInPromptFor: ['2026-04-15', '2026-04-16'] }),
      build({ buildId: 'a' }),
      build({ buildId: 'b' }),
    ]
    const r = selectRecentFailure({ history, todayArchetype: 'Specimen', today: '2026-04-17' })
    expect(r.selectedBuildId).not.toBe('used')
  })

  it('returns null when all passing (no overallScore ≤ 3)', () => {
    const history = [
      build({ overallScore: 5 }),
      build({ overallScore: 5 }),
      build({ overallScore: 4 }),
    ]
    const r = selectRecentFailure({ history, todayArchetype: 'Specimen', today: '2026-04-17' })
    expect(r.lesson).toBeNull()
  })
})
