import { describe, it, expect } from 'vitest'
import {
  buildArtDirectorUserPrompt,
  validateArtDirectorResult,
} from '../../../scripts/agents/art-director.js'

describe('buildArtDirectorUserPrompt', () => {
  it('includes signals YAML, content summary, chassis catalog, weights, color mandate', () => {
    const prompt = buildArtDirectorUserPrompt({
      signals: { date: '2026-04-29', weather: { conditions: 'sunny' } },
      contentSummary: '## Projects\n- 15th Club',
      chassisCatalogBlock: '| ID | Name |\n| anton-inter-tight | Anton + Inter Tight |',
      recentBriefs: '',
      recentRatings: '',
      references: '',
      colorMandateSection: '## Color Mandate\nTarget 0–60°',
      weightsBlock: 'Risk: 8/10',
    })
    expect(prompt).toContain("date: '2026-04-29'")
    expect(prompt).toContain('15th Club')
    expect(prompt).toContain('anton-inter-tight')
    expect(prompt).toContain('## Color Mandate')
    expect(prompt).toContain('Risk: 8/10')
  })

  it('includes the variance mandate sections when provided', () => {
    const prompt = buildArtDirectorUserPrompt({
      signals: { date: '2026-08-23' },
      contentSummary: 'content',
      chassisCatalogBlock: 'catalog',
      recentBriefs: '',
      recentRatings: '',
      references: '',
      colorMandateSection: '',
      shellMandateSection: '',
      paletteFormulaMandateSection: '## Palette Formula Mandate\navoid dark-void',
      heroSourceMandateSection: '## Hero Source Mandate\navoid quote',
      compositionMandateSection: '## Composition Mandate\navoid columns=two-equal',
      weightsBlock: '',
    })
    expect(prompt).toContain('## Palette Formula Mandate')
    expect(prompt).toContain('## Hero Source Mandate')
    expect(prompt).toContain('## Composition Mandate')
  })

  it('omits the variance mandate sections when they are empty strings (no history)', () => {
    const prompt = buildArtDirectorUserPrompt({
      signals: { date: '2026-08-23' },
      contentSummary: 'content',
      chassisCatalogBlock: 'catalog',
      recentBriefs: '',
      recentRatings: '',
      references: '',
      colorMandateSection: '',
      shellMandateSection: '',
      paletteFormulaMandateSection: '',
      heroSourceMandateSection: '',
      compositionMandateSection: '',
      weightsBlock: '',
    })
    expect(prompt).not.toContain('Palette Formula Mandate')
    expect(prompt).not.toContain('Hero Source Mandate')
    expect(prompt).not.toContain('Composition Mandate')
  })

  it('includes retryContext as the final section when present', () => {
    const prompt = buildArtDirectorUserPrompt({
      signals: { date: '2026-08-23' },
      contentSummary: 'content',
      chassisCatalogBlock: 'catalog',
      weightsBlock: '',
      retryContext: '## Previous attempt was rejected\n\nMissing ===COMPOSITION===.',
    })
    expect(prompt).toContain('## Previous attempt was rejected')
    expect(prompt.trim().endsWith('Missing ===COMPOSITION===.')).toBe(true)
  })
})

describe('validateArtDirectorResult', () => {
  const validComposition = [
    'columns: two-equal',
    'axis: vertical',
    'symmetry: symmetric',
    'hero_zone: center',
    'density: measured',
    'rhythm: even',
    'shell_posture: standard',
    'field_ratio: balanced',
  ].join('\n')

  const valid = {
    hero_copy: 'There is no limit',
    archetype: 'Specimen',
    composition: validComposition,
    composition_rationale: 'A measured, centered grid keeps the phrase legible without shouting.',
    chassis_id: 'big-shoulders-atkinson',
    visual_spec: '## Color\n- 18°',
    self_check: '1. Yes 2. Yes 3. Yes',
    measurables:
      'canvas_utilization_min: 70\nhero_scale: clamp(96px, 13vw, 200px)\ncolor_coverage_min: 60',
    shell:
      'nav: bottom rail\nfooter: data strip\nbrand_lockup: horizontal-md\nbrand_color_mode: original',
    files: [{ path: 'elements/preset.ts', content: "export const elementsPreset = 'stub'" }],
    rationale: 'r',
    design_brief: 'b',
  }

  it('passes when all required blocks present', () => {
    expect(() => validateArtDirectorResult(valid)).not.toThrow()
  })

  it('throws when hero_copy is missing', () => {
    expect(() => validateArtDirectorResult({ ...valid, hero_copy: undefined })).toThrow(/hero_copy/)
  })

  it('accepts a missing archetype — it is optional and never validated', () => {
    expect(() => validateArtDirectorResult({ ...valid, archetype: undefined })).not.toThrow()
  })

  it('accepts any descriptive archetype string, including a novel one', () => {
    expect(() =>
      validateArtDirectorResult({ ...valid, archetype: 'reads like a fever dream' })
    ).not.toThrow()
  })

  it('throws when COMPOSITION is missing', () => {
    expect(() => validateArtDirectorResult({ ...valid, composition: undefined })).toThrow(
      /COMPOSITION/
    )
  })

  it('throws when a composition axis value is out of vocabulary', () => {
    expect(() =>
      validateArtDirectorResult({
        ...valid,
        composition: validComposition.replace('columns: two-equal', 'columns: seventeen'),
      })
    ).toThrow(/invalid columns/)
  })

  it('throws when a composition axis is missing entirely', () => {
    expect(() =>
      validateArtDirectorResult({
        ...valid,
        composition: validComposition.replace('rhythm: even\n', ''),
      })
    ).toThrow(/missing axis: rhythm/)
  })

  it('throws when COMPOSITION_RATIONALE is missing or too short', () => {
    expect(() => validateArtDirectorResult({ ...valid, composition_rationale: undefined })).toThrow(
      /COMPOSITION_RATIONALE/
    )
    expect(() => validateArtDirectorResult({ ...valid, composition_rationale: 'ok' })).toThrow(
      /COMPOSITION_RATIONALE/
    )
  })

  it('throws when preset.ts is missing from files', () => {
    expect(() => validateArtDirectorResult({ ...valid, files: [] })).toThrow(/elements\/preset\.ts/)
  })

  it('throws when chassis_id is missing', () => {
    expect(() => validateArtDirectorResult({ ...valid, chassis_id: undefined })).toThrow(
      /chassis_id/
    )
  })
})
