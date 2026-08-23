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
      archetypeHistoryBlock: '## Archetype History\nSpecimen, Poster',
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
    expect(prompt).toContain('Specimen, Poster')
  })

  it('includes the variance mandate sections when provided', () => {
    const prompt = buildArtDirectorUserPrompt({
      signals: { date: '2026-08-23' },
      contentSummary: 'content',
      chassisCatalogBlock: 'catalog',
      archetypeHistoryBlock: '',
      recentBriefs: '',
      recentRatings: '',
      references: '',
      colorMandateSection: '',
      shellMandateSection: '',
      paletteFormulaMandateSection: '## Palette Formula Mandate\navoid dark-void',
      heroSourceMandateSection: '## Hero Source Mandate\navoid quote',
      layoutSignatureMandateSection: '## Layout Signature Mandate\navoid columns=2',
      weightsBlock: '',
    })
    expect(prompt).toContain('## Palette Formula Mandate')
    expect(prompt).toContain('## Hero Source Mandate')
    expect(prompt).toContain('## Layout Signature Mandate')
  })

  it('omits the variance mandate sections when they are empty strings (no history)', () => {
    const prompt = buildArtDirectorUserPrompt({
      signals: { date: '2026-08-23' },
      contentSummary: 'content',
      chassisCatalogBlock: 'catalog',
      archetypeHistoryBlock: '',
      recentBriefs: '',
      recentRatings: '',
      references: '',
      colorMandateSection: '',
      shellMandateSection: '',
      paletteFormulaMandateSection: '',
      heroSourceMandateSection: '',
      layoutSignatureMandateSection: '',
      weightsBlock: '',
    })
    expect(prompt).not.toContain('Palette Formula Mandate')
    expect(prompt).not.toContain('Hero Source Mandate')
    expect(prompt).not.toContain('Layout Signature Mandate')
  })
})

describe('validateArtDirectorResult', () => {
  const valid = {
    hero_copy: 'There is no limit',
    archetype: 'Specimen',
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

  it('throws when archetype is unrecognized', () => {
    expect(() => validateArtDirectorResult({ ...valid, archetype: 'Cinema' })).toThrow(/archetype/)
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
