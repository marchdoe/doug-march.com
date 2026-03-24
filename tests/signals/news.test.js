import { describe, it, expect } from 'vitest'
import { filterHeadlines } from '../../scripts/signals/news.js'

describe('news provider', () => {
  it('filters headlines containing disallow keywords', () => {
    const headlines = [
      { title: 'SpaceX launches new rocket' },
      { title: 'Trump announces new policy' },
      { title: 'Election results finalized' },
      { title: 'NASA discovers new exoplanet' },
    ]
    const disallow = ['Trump', 'election']
    const filtered = filterHeadlines(headlines, disallow)
    expect(filtered).toHaveLength(2)
    expect(filtered[0].title).toBe('SpaceX launches new rocket')
    expect(filtered[1].title).toBe('NASA discovers new exoplanet')
  })
})
