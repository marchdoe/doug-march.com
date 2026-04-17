import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync } from 'fs'
import { selectSeed, KNOWN_ARCHETYPES } from '../scripts/utils/select-seed.js'

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
