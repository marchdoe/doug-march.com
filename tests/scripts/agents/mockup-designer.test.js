import { describe, it, expect } from 'vitest'
import { buildMockupDesignerUserPrompt, validateMockupResult } from '../../../scripts/agents/mockup-designer.js'

describe('buildMockupDesignerUserPrompt', () => {
  it('includes brief, tokens, measurables, shell, brand svg, and polish sections', () => {
    const p = buildMockupDesignerUserPrompt({
      enrichedBrief: 'THE BRIEF',
      tokenContext: 'export const elementsPreset = {}',
      contentSummary: 'PROJECTS...',
      measurables: 'canvas_utilization_min: 70',
      shell: 'nav: bottom rail',
      brandSvg: '<svg id="mark"/>',
      brandMonoSvg: '<svg id="mono"/>',
      googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Anton',
      lessonsBlock: '## Recent Lessons\n- stop doing X',
      calibrationNote: '',
      archetypeContractBlock: '',
      polishRef: 'POLISH GUIDANCE TEXT',
    })
    for (const s of ['THE BRIEF', 'elementsPreset', 'canvas_utilization_min: 70', 'nav: bottom rail', '<svg id="mark"/>', 'fonts.googleapis.com', 'Recent Lessons', 'POLISH GUIDANCE TEXT']) {
      expect(p).toContain(s)
    }
  })
  it('appends revision feedback as the final section when present', () => {
    const p = buildMockupDesignerUserPrompt({
      enrichedBrief: 'B', tokenContext: 'T', contentSummary: 'C',
      measurables: 'M', shell: 'S', brandSvg: 'V', brandMonoSvg: 'W',
      googleFontsUrl: 'G', revisionFeedback: 'utilization ~45% vs floor 70',
    })
    expect(p).toContain('CRITIC REVISION FEEDBACK')
    expect(p.indexOf('utilization ~45%')).toBeGreaterThan(p.indexOf('Site Content'))
  })
})

describe('validateMockupResult', () => {
  it('accepts a complete response', () => {
    expect(() => validateMockupResult({
      files: [{ path: 'mockup.html', content: '<!DOCTYPE html><html><head></head><body>x</body></html>' }],
      interior_notes: 'about page notes',
    })).not.toThrow()
  })
  it('rejects a missing mockup.html', () => {
    expect(() => validateMockupResult({ files: [], interior_notes: 'n' })).toThrow(/mockup\.html/)
  })
  it('rejects script tags (mockup must be JS-free)', () => {
    expect(() => validateMockupResult({
      files: [{ path: 'mockup.html', content: '<html><script>alert(1)</script></html>' }],
      interior_notes: 'n',
    })).toThrow(/script/i)
  })
  it('rejects missing interior notes', () => {
    expect(() => validateMockupResult({
      files: [{ path: 'mockup.html', content: '<html></html>' }],
    })).toThrow(/INTERIOR_NOTES/)
  })
})
