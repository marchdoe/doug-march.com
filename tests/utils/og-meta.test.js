import { describe, it, expect } from 'vitest'
import { buildOgMetaEntries } from '../../scripts/utils/og-meta.js'

describe('buildOgMetaEntries', () => {
  it('emits og + twitter entries with escaped content', () => {
    const code = buildOgMetaEntries({
      date: '2026-06-12',
      heroCopy: 'SAY "LESS"',
      designBrief: 'A drenched teal stack.',
      siteUrl: 'https://doug-march.com',
    })
    expect(code).toContain(`property: 'og:image'`)
    expect(code).toContain('https://doug-march.com/og/2026-06-12.png')
    expect(code).toContain(JSON.stringify('SAY "LESS"')) // escaped via JSON.stringify
    expect(code).toContain(`'summary_large_image'`)
    expect(code).toContain(`property: 'og:description'`)
  })
  it('falls back to defaults when hero/brief are empty', () => {
    const code = buildOgMetaEntries({ date: '2026-06-12' })
    expect(code).toContain('Doug March')
    expect(code).toContain('https://doug-march.com/og/2026-06-12.png')
  })
})
