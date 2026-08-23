import { describe, it, expect } from 'vitest'
import {
  parseMeasurablesBlock,
  parseShellBlock,
  parseLayoutSignatureBlock,
} from '../../scripts/utils/spec-blocks.js'

describe('parseMeasurablesBlock', () => {
  it('parses the three measurable fields', () => {
    const m = parseMeasurablesBlock(
      [
        'canvas_utilization_min: 70',
        'hero_scale: clamp(96px, 13vw, 200px)',
        'color_coverage_min: 60',
      ].join('\n')
    )
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

  it('parses canvas_utilization_min from >=70 (lenient integer parsing)', () => {
    const m = parseMeasurablesBlock('canvas_utilization_min: >=70')
    expect(m.canvas_utilization_min).toBe(70)
  })
})

describe('parseShellBlock', () => {
  it('parses the four shell fields', () => {
    const s = parseShellBlock(
      [
        'nav: bottom rail',
        'footer: data strip',
        'brand_lockup: horizontal-md',
        'brand_color_mode: single-color',
      ].join('\n')
    )
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

  it('normalizes brand_color_mode to lowercase (Single-Color → single-color)', () => {
    const s = parseShellBlock('brand_color_mode: Single-Color')
    expect(s.brand_color_mode).toBe('single-color')
  })

  it('parses ground_strategy and normalizes to lowercase', () => {
    const s = parseShellBlock('ground_strategy: Dark-Void')
    expect(s.ground_strategy).toBe('dark-void')
  })

  it('returns null ground_strategy for old-shaped SHELL blocks missing the field', () => {
    const s = parseShellBlock(
      ['nav: bottom rail', 'footer: data strip', 'brand_lockup: horizontal-md'].join('\n')
    )
    expect(s.ground_strategy).toBeNull()
  })
})

describe('parseLayoutSignatureBlock', () => {
  it('parses the four layout signature fields', () => {
    const s = parseLayoutSignatureBlock(
      ['columns: 2', 'axis: vertical', 'symmetry: asymmetric', 'hero_zone: left'].join('\n')
    )
    expect(s.columns).toBe('2')
    expect(s.axis).toBe('vertical')
    expect(s.symmetry).toBe('asymmetric')
    expect(s.hero_zone).toBe('left')
  })

  it('returns nulls for missing fields', () => {
    const s = parseLayoutSignatureBlock('columns: asym')
    expect(s.columns).toBe('asym')
    expect(s.axis).toBeNull()
  })

  it('normalizes values to lowercase', () => {
    const s = parseLayoutSignatureBlock('symmetry: Symmetric')
    expect(s.symmetry).toBe('symmetric')
  })
})
