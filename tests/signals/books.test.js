import { describe, it, expect } from 'vitest'
import { collect, name } from '../../scripts/signals/books.js'

describe('books provider', () => {
  it('returns currently reading from profile', async () => {
    const profile = { books: { currently_reading: ['Dune', 'Neuromancer'] } }
    const result = await collect(profile)
    expect(name).toBe('books')
    expect(result.data.currently_reading).toEqual(['Dune', 'Neuromancer'])
  })

  it('returns empty array if nothing in profile', async () => {
    const result = await collect({ books: { currently_reading: [] } })
    expect(result.data.currently_reading).toEqual([])
  })

  it('handles missing books section', async () => {
    const result = await collect({})
    expect(result.data.currently_reading).toEqual([])
  })
})
