import { describe, it, expect } from 'vitest'
import { buildOgMetaEntries } from '../../scripts/utils/og-meta.js'
import { CANONICAL_ORIGIN, RECOGNIZED_ORIGINS } from '../../scripts/utils/site-origin.js'

describe('buildOgMetaEntries', () => {
  it('emits og + twitter entries with escaped content', () => {
    const code = buildOgMetaEntries({
      date: '2026-06-12',
      heroCopy: 'SAY "LESS"',
      designBrief: 'A drenched teal stack.',
      siteUrl: CANONICAL_ORIGIN,
    })
    expect(code).toContain(`property: 'og:image'`)
    expect(code).toContain(`${CANONICAL_ORIGIN}/og/2026-06-12.png`)
    expect(code).toContain(JSON.stringify('SAY "LESS"')) // escaped via JSON.stringify
    expect(code).toContain(`'summary_large_image'`)
    expect(code).toContain(`property: 'og:description'`)
  })
  it('falls back to defaults when hero/brief are empty', () => {
    const code = buildOgMetaEntries({ date: '2026-06-12' })
    expect(code).toContain('Doug March')
    expect(code).toContain(`${CANONICAL_ORIGIN}/og/2026-06-12.png`)
  })
})

describe('the host is not baked in', () => {
  // Task 0.2 of the domain move. Written while doug-march.com is still
  // canonical, so it can still fail loudly when Phase 1 flips the constant.
  // An assertion spelling the host would simply stop covering anything.
  it('carries whichever siteUrl it is given', () => {
    for (const origin of RECOGNIZED_ORIGINS) {
      const code = buildOgMetaEntries({ date: '2026-06-12', siteUrl: origin })
      expect(code).toContain(`${origin}/og/2026-06-12.png`)
      // og:url goes through JSON.stringify, so it lands double-quoted.
      expect(code).toContain(`{ property: 'og:url', content: ${JSON.stringify(origin)} }`)
    }
  })

  it('defaults to the canonical origin, whatever that currently is', () => {
    const code = buildOgMetaEntries({ date: '2026-06-12' })
    expect(code).toContain(`${CANONICAL_ORIGIN}/og/2026-06-12.png`)
  })
})
