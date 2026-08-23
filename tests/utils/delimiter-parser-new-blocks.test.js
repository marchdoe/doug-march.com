import { describe, it, expect } from 'vitest'
import { parseDelimiterResponse } from '../../scripts/utils/delimiter-parser.js'

describe('parseDelimiterResponse — new blocks', () => {
  it('captures MEASURABLES, SHELL, and INTERIOR_NOTES', () => {
    const raw = [
      '===HERO_COPY===',
      'FOURTEEN HOURS OF LIGHT',
      '===MEASURABLES===',
      'canvas_utilization_min: 70',
      'color_coverage_min: 60',
      '===SHELL===',
      'nav: bottom rail',
      'brand_lockup: mark-only-sm',
      '===INTERIOR_NOTES===',
      'About page carries the same rail.',
      '===RATIONALE===',
      'because',
    ].join('\n')
    const p = parseDelimiterResponse(raw)
    expect(p.hero_copy).toBe('FOURTEEN HOURS OF LIGHT')
    expect(p.measurables).toContain('canvas_utilization_min: 70')
    expect(p.shell).toContain('nav: bottom rail')
    expect(p.interior_notes).toBe('About page carries the same rail.')
    expect(p.rationale).toBe('because')
  })

  it('still terminates a FILE block at the new delimiters', () => {
    const raw = ['===FILE:mockup.html===', '<html></html>', '===INTERIOR_NOTES===', 'notes'].join(
      '\n'
    )
    const p = parseDelimiterResponse(raw)
    expect(p.files[0].content).toBe('<html></html>')
    expect(p.interior_notes).toBe('notes')
  })

  it('captures HERO_SOURCE and LAYOUT_SIGNATURE (variance mandate blocks)', () => {
    const raw = [
      '===HERO_COPY===',
      'FOURTEEN HOURS OF LIGHT',
      '===HERO_SOURCE===',
      'composed',
      '===LAYOUT_SIGNATURE===',
      'columns: 2',
      'axis: vertical',
      'symmetry: asymmetric',
      'hero_zone: left',
      '===RATIONALE===',
      'because',
    ].join('\n')
    const p = parseDelimiterResponse(raw)
    expect(p.hero_source).toBe('composed')
    expect(p.layout_signature).toContain('columns: 2')
    expect(p.rationale).toBe('because')
  })

  it('does not fail when HERO_SOURCE and LAYOUT_SIGNATURE are absent (optional blocks)', () => {
    const raw = [
      '===HERO_COPY===',
      'FOURTEEN HOURS OF LIGHT',
      '===ARCHETYPE===',
      'Specimen',
      '===RATIONALE===',
      'because',
    ].join('\n')
    const p = parseDelimiterResponse(raw)
    expect(p.hero_source).toBeUndefined()
    expect(p.layout_signature).toBeUndefined()
    expect(p.hero_copy).toBe('FOURTEEN HOURS OF LIGHT')
  })

  it('still terminates a FILE block at HERO_SOURCE and LAYOUT_SIGNATURE', () => {
    const raw = ['===FILE:mockup.html===', '<html></html>', '===HERO_SOURCE===', 'quote'].join('\n')
    const p = parseDelimiterResponse(raw)
    expect(p.files[0].content).toBe('<html></html>')
    expect(p.hero_source).toBe('quote')
  })
})
