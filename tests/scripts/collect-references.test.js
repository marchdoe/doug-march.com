import { describe, it, expect } from 'vitest'
import { selectCuratedReferences } from '../../scripts/collect-references.js'

const LIB = [
  {
    description: 'split ref',
    tags: { composition: 'split', mood: 'dramatic', density: 'moderate' },
  },
  { description: 'poster ref', tags: { composition: 'poster', mood: 'calm', density: 'sparse' } },
  { description: 'index ref', tags: { composition: 'index', mood: 'minimal', density: 'dense' } },
]

describe('selectCuratedReferences', () => {
  it('scores against a brief and keeps only matching entries, best first', () => {
    const brief = 'A dramatic split layout with a calm right panel'
    const picked = selectCuratedReferences(LIB, brief)
    expect(picked[0].description).toBe('split ref') // composition(3) + mood(2)
    expect(picked.map((r) => r.description)).not.toContain('index ref')
    expect(picked[0].score).toBe(5)
  })

  it('returns the full library (unscored) when no brief is provided', () => {
    const picked = selectCuratedReferences(LIB, null)
    expect(picked).toHaveLength(3)
    expect(picked[0].score).toBeUndefined()
  })

  it('caps the no-brief pass-through at 12 entries', () => {
    const big = Array.from({ length: 20 }, (_, i) => ({ description: `ref ${i}`, tags: {} }))
    expect(selectCuratedReferences(big, null)).toHaveLength(12)
  })
})
