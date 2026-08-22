import { describe, it, expect } from 'vitest'
import { validateArtDirectorResult } from '../../../scripts/agents/art-director.js'

const valid = () => ({
  hero_copy: 'FOURTEEN HOURS OF LIGHT',
  archetype: 'Stack',
  chassis_id: 'big-shoulders-atkinson',
  visual_spec: 'spec',
  self_check: 'yes',
  measurables:
    'canvas_utilization_min: 70\nhero_scale: clamp(96px, 13vw, 200px)\ncolor_coverage_min: 60',
  shell:
    'nav: bottom rail\nfooter: data strip\nbrand_lockup: horizontal-md\nbrand_color_mode: original',
  files: [{ path: 'elements/preset.ts', content: 'export const elementsPreset = {}' }],
})

describe('validateArtDirectorResult — MEASURABLES + SHELL', () => {
  it('accepts a complete response', () => {
    expect(() => validateArtDirectorResult(valid())).not.toThrow()
  })
  it('rejects a missing MEASURABLES block', () => {
    const r = valid()
    delete r.measurables
    expect(() => validateArtDirectorResult(r)).toThrow(/MEASURABLES/)
  })
  it('rejects MEASURABLES without a numeric canvas floor', () => {
    const r = valid()
    r.measurables = 'hero_scale: 96px'
    expect(() => validateArtDirectorResult(r)).toThrow(/canvas_utilization_min/)
  })
  it('rejects a missing SHELL block', () => {
    const r = valid()
    delete r.shell
    expect(() => validateArtDirectorResult(r)).toThrow(/SHELL/)
  })
  it('rejects an unknown brand_color_mode', () => {
    const r = valid()
    r.shell = r.shell.replace('original', 'rainbow')
    expect(() => validateArtDirectorResult(r)).toThrow(/brand_color_mode/)
  })

  it('does NOT throw for an off-contract brand_lockup (warn-only)', () => {
    const r = valid()
    r.shell = r.shell.replace('horizontal-md', 'diagonal-xl')
    expect(() => validateArtDirectorResult(r)).not.toThrow()
  })

  it('accepts canvas_utilization_min: >=70 in MEASURABLES (passes validation)', () => {
    const r = valid()
    r.measurables =
      'canvas_utilization_min: >=70\nhero_scale: clamp(96px, 13vw, 200px)\ncolor_coverage_min: 60'
    expect(() => validateArtDirectorResult(r)).not.toThrow()
  })
})
