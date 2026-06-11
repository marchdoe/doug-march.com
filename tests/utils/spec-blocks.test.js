import { describe, it, expect } from 'vitest'
import { parseMeasurablesBlock, parseShellBlock } from '../../scripts/utils/spec-blocks.js'

describe('parseMeasurablesBlock', () => {
  it('parses the three measurable fields', () => {
    const m = parseMeasurablesBlock([
      'canvas_utilization_min: 70',
      'hero_scale: clamp(96px, 13vw, 200px)',
      'color_coverage_min: 60',
    ].join('\n'))
    expect(m.canvas_utilization_min).toBe(70)
    expect(m.hero_scale).toBe('clamp(96px, 13vw, 200px)')
    expect(m.color_coverage_min).toBe(60)
  })

  it('tolerates comments and missing fields', () => {
    const m = parseMeasurablesBlock('canvas_utilization_min: 80   # Broadsheet floor')
    expect(m.canvas_utilization_min).toBe(80)
    expect(m.hero_scale).toBeNull()
    expect(m.color_coverage_min).toBeNull()
  })

  it('returns all-null for garbage input', () => {
    const m = parseMeasurablesBlock('not even close')
    expect(m.canvas_utilization_min).toBeNull()
  })
})

describe('parseShellBlock', () => {
  it('parses the four shell fields', () => {
    const s = parseShellBlock([
      'nav: bottom rail',
      'footer: data strip',
      'brand_lockup: horizontal-md',
      'brand_color_mode: single-color',
    ].join('\n'))
    expect(s.nav).toBe('bottom rail')
    expect(s.footer).toBe('data strip')
    expect(s.brand_lockup).toBe('horizontal-md')
    expect(s.brand_color_mode).toBe('single-color')
  })

  it('returns nulls for missing fields', () => {
    const s = parseShellBlock('nav: left spine')
    expect(s.nav).toBe('left spine')
    expect(s.footer).toBeNull()
  })
})
