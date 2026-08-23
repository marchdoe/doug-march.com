import { describe, it, expect } from 'vitest'
import {
  FILE_OWNERSHIP,
  buildAgentPrompt,
  identifyFailingAgent,
  parseDelimiterResponse,
  resolveChassisFromDirectorOutput,
  buildCompositionContractBlock,
  describeRiskTier,
  resolveRiskWeight,
} from '../../scripts/design-agents.js'

describe('FILE_OWNERSHIP', () => {
  it('maps every file to exactly one agent', () => {
    const allFiles = Object.values(FILE_OWNERSHIP)
    expect(new Set(allFiles).size).toBeLessThanOrEqual(5)
    expect(Object.keys(FILE_OWNERSHIP)).toHaveLength(16)
  })

  it('maps preset.ts to art-director', () => {
    expect(FILE_OWNERSHIP['elements/preset.ts']).toBe('art-director')
  })

  it('does not map __root.tsx to any agent (orchestrator owns it via the chassis template)', () => {
    expect(FILE_OWNERSHIP['app/routes/__root.tsx']).toBeUndefined()
  })

  it('maps layout, route, sidebar, and component files to react-engineer', () => {
    expect(FILE_OWNERSHIP['app/components/Layout.tsx']).toBe('react-engineer')
    expect(FILE_OWNERSHIP['app/routes/index.tsx']).toBe('react-engineer')
    expect(FILE_OWNERSHIP['app/components/Sidebar.tsx']).toBe('react-engineer')
    expect(FILE_OWNERSHIP['app/components/Bio.tsx']).toBe('react-engineer')
    expect(FILE_OWNERSHIP['app/components/FeaturedProject.tsx']).toBe('react-engineer')
  })

  it('maps og.tsx to react-engineer (share card is engineer-authored)', () => {
    expect(FILE_OWNERSHIP['app/routes/og.tsx']).toBe('react-engineer')
  })

  it('MobileFooter.tsx is not in FILE_OWNERSHIP (removed from mutable files)', () => {
    expect(FILE_OWNERSHIP['app/components/MobileFooter.tsx']).toBeUndefined()
  })
})

describe('identifyFailingAgent', () => {
  it('identifies react-engineer from a build error mentioning Layout.tsx', () => {
    const error = 'app/components/Layout.tsx(15,7): error TS2322'
    expect(identifyFailingAgent(error)).toBe('react-engineer')
  })

  it('identifies react-engineer from a build error mentioning Bio.tsx', () => {
    const error = 'app/components/Bio.tsx(8,3): error TS2304'
    expect(identifyFailingAgent(error)).toBe('react-engineer')
  })

  it('identifies art-director from error mentioning preset', () => {
    const error = 'Error in elements/preset.ts: invalid token'
    expect(identifyFailingAgent(error)).toBe('art-director')
  })

  it('returns react-engineer when errors span multiple react-engineer files', () => {
    const error = 'app/components/Layout.tsx(15,7): error\napp/components/Bio.tsx(8,3): error'
    expect(identifyFailingAgent(error)).toBe('react-engineer')
  })

  it('returns "both" when no file can be identified', () => {
    const error = 'Unknown build error'
    expect(identifyFailingAgent(error)).toBe('both')
  })
})

describe('buildAgentPrompt', () => {
  it('includes the brief in the prompt', () => {
    const prompt = buildAgentPrompt('token-designer', {
      brief: '## Palette Direction\nWarm and golden.',
      referenceFiles: [],
      tokenContext: null,
    })
    expect(prompt).toContain('Warm and golden')
  })

  it('includes token context for structure-agent', () => {
    const prompt = buildAgentPrompt('structure-agent', {
      brief: 'brief text',
      referenceFiles: [],
      tokenContext: 'export const elementsPreset = ...',
    })
    expect(prompt).toContain('elementsPreset')
  })

  it('does not include token context for token-designer', () => {
    const prompt = buildAgentPrompt('token-designer', {
      brief: 'brief text',
      referenceFiles: [],
      tokenContext: null,
    })
    expect(prompt).not.toContain('## Design Tokens')
  })

  it('includes reference files', () => {
    const prompt = buildAgentPrompt('component-agent', {
      brief: 'brief text',
      referenceFiles: [{ path: 'app/components/Bio.tsx', content: 'const Bio = ...' }],
      tokenContext: 'tokens',
    })
    expect(prompt).toContain('Bio.tsx')
    expect(prompt).toContain('const Bio')
  })

  it('includes anti-anchoring instructions when reference files are present', () => {
    const prompt = buildAgentPrompt('structure-agent', {
      brief: 'brief text',
      referenceFiles: [
        { path: 'app/components/Layout.tsx', content: 'export function Layout() {}' },
      ],
      tokenContext: 'tokens',
    })
    expect(prompt).toContain('Do NOT use these as a design starting point')
    expect(prompt).toContain('entirely new')
    expect(prompt).toContain('Technical Reference ONLY')
  })

  it('does not include anti-anchoring instructions when no reference files', () => {
    const prompt = buildAgentPrompt('token-designer', {
      brief: 'brief text',
      referenceFiles: [],
      tokenContext: null,
    })
    expect(prompt).not.toContain('Do NOT use these as a design starting point')
  })
})

describe('resolveChassisFromDirectorOutput', () => {
  const catalog = [
    { id: 'bricolage-manrope', name: 'Bricolage Grotesque + Manrope' },
    { id: 'spectral-albert', name: 'Spectral + Albert Sans' },
  ]

  it('extracts a chassis id from the explicit ===CHASSIS_ID=== block', () => {
    const text = '===CHASSIS_ID===\nbricolage-manrope\n\n===VISUAL_SPEC===\nstuff'
    expect(resolveChassisFromDirectorOutput(text, catalog)?.id).toBe('bricolage-manrope')
  })

  it('tolerates surrounding whitespace and backticks', () => {
    const text = '===CHASSIS_ID===\n  `spectral-albert`  \n'
    expect(resolveChassisFromDirectorOutput(text, catalog)?.id).toBe('spectral-albert')
  })

  it('falls back to scanning the spec for a backtick-quoted catalog id', () => {
    const text = 'no block here. uses `bricolage-manrope` somewhere.'
    expect(resolveChassisFromDirectorOutput(text, catalog)?.id).toBe('bricolage-manrope')
  })

  it('returns null when no catalog id is present', () => {
    expect(resolveChassisFromDirectorOutput('===CHASSIS_ID===\nunknown-id\n', catalog)).toBeNull()
  })

  it('returns null on empty input', () => {
    expect(resolveChassisFromDirectorOutput('', catalog)).toBeNull()
  })
})

describe('parseDelimiterResponse', () => {
  it('parses a single file', () => {
    const input = ['===FILE:app/components/Foo.tsx===', 'export const x = 42', ''].join('\n')
    const { files } = parseDelimiterResponse(input)
    expect(files).toHaveLength(1)
    expect(files[0].path).toBe('app/components/Foo.tsx')
    expect(files[0].content).toBe('export const x = 42')
  })

  it('parses multiple files', () => {
    const input = [
      '===FILE:app/components/Foo.tsx===',
      'const foo = 1',
      '===FILE:app/components/Bar.tsx===',
      'const bar = 2',
      '',
    ].join('\n')
    const { files } = parseDelimiterResponse(input)
    expect(files).toHaveLength(2)
    expect(files[0].path).toBe('app/components/Foo.tsx')
    expect(files[1].path).toBe('app/components/Bar.tsx')
  })

  it('preserves === in file content (not line-anchored)', () => {
    // This is the regression we are guarding against. The old parser
    // would split Foo.tsx in two when the content contained === anywhere.
    const input = [
      '===FILE:app/components/Foo.tsx===',
      "const x = 'border: 3px solid === separator ==='",
      'const y = 42',
      '===FILE:app/components/Bar.tsx===',
      'const bar = 1',
      '',
    ].join('\n')
    const { files } = parseDelimiterResponse(input)
    expect(files).toHaveLength(2)
    expect(files[0].content).toContain('=== separator ===')
    expect(files[1].path).toBe('app/components/Bar.tsx')
  })

  it('preserves ===FILE: inside file content when not at start of line', () => {
    // Even if a file has "===FILE:path===" in a comment or string,
    // it should not be treated as a delimiter.
    const input = [
      '===FILE:app/components/Foo.tsx===',
      '// Example: ===FILE:path=== was the old format',
      'const x = 42',
      '===FILE:app/components/Bar.tsx===',
      'const bar = 1',
      '',
    ].join('\n')
    const { files } = parseDelimiterResponse(input)
    expect(files).toHaveLength(2)
    expect(files[0].content).toContain('// Example: ===FILE:path===')
    expect(files[1].path).toBe('app/components/Bar.tsx')
  })

  it('extracts rationale after ===RATIONALE===', () => {
    const input = [
      '===FILE:app/components/Foo.tsx===',
      'const x = 42',
      '===RATIONALE===',
      'This is the rationale.',
      '',
    ].join('\n')
    const { rationale } = parseDelimiterResponse(input)
    expect(rationale).toBe('This is the rationale.')
  })

  it('extracts design_brief after ===DESIGN_BRIEF===', () => {
    const input = [
      '===FILE:app/components/Foo.tsx===',
      'const x = 42',
      '===DESIGN_BRIEF===',
      'Post-blizzard brutalism.',
      '',
    ].join('\n')
    const { design_brief } = parseDelimiterResponse(input)
    expect(design_brief).toBe('Post-blizzard brutalism.')
  })

  it('extracts both rationale and design_brief', () => {
    const input = [
      '===FILE:app/components/Foo.tsx===',
      'content',
      '===RATIONALE===',
      'Why I did this.',
      '===DESIGN_BRIEF===',
      'Spring morning.',
      '',
    ].join('\n')
    const result = parseDelimiterResponse(input)
    expect(result.rationale).toBe('Why I did this.')
    expect(result.design_brief).toBe('Spring morning.')
    expect(result.files).toHaveLength(1)
  })

  it('ignores files with empty paths or content', () => {
    const input = ['===FILE: ===', 'content', '===FILE:valid.tsx===', 'const x = 1', ''].join('\n')
    const { files } = parseDelimiterResponse(input)
    expect(files).toHaveLength(1)
    expect(files[0].path).toBe('valid.tsx')
  })

  it('parses Art Director hero copy, archetype, chassis, visual spec, and self-check blocks', () => {
    const input = [
      '===HERO_COPY===',
      'There is no limit to what a man can do',
      '===HERO_RATIONALE===',
      'Reagan quote anchors the day.',
      '===ARCHETYPE===',
      'Specimen',
      '===CHASSIS_ID===',
      'big-shoulders-atkinson',
      '===VISUAL_SPEC===',
      '## Color Specification\n- Primary hue: 18°',
      '===SELF_CHECK===',
      '1. Hero quotability: Yes — universally quotable',
      '===FILE:elements/preset.ts===',
      "export const elementsPreset = 'stub'",
      '===RATIONALE===',
      'Phrase → Specimen → big-shoulders → terracotta.',
      '===DESIGN_BRIEF===',
      'Terracotta marquee.',
      '',
    ].join('\n')
    const r = parseDelimiterResponse(input)
    expect(r.hero_copy).toBe('There is no limit to what a man can do')
    expect(r.hero_rationale).toBe('Reagan quote anchors the day.')
    expect(r.archetype).toBe('Specimen')
    expect(r.chassis_id).toBe('big-shoulders-atkinson')
    expect(r.visual_spec).toContain('Primary hue: 18°')
    expect(r.self_check).toContain('Hero quotability: Yes')
    expect(r.files).toHaveLength(1)
    expect(r.files[0].path).toBe('elements/preset.ts')
    expect(r.rationale).toBe('Phrase → Specimen → big-shoulders → terracotta.')
    expect(r.design_brief).toBe('Terracotta marquee.')
  })

  it('strips outer markdown code fence so last block before closing fence is not contaminated', () => {
    // If the model wraps its entire response in ```markdown...```, the lazy
    // captureBlock regex extends past the closing fence into the sentinel,
    // appending backtick chars to the last block before the fence.
    const input = [
      '```markdown',
      '===HERO_COPY===',
      'STAND UP TO YOUR FRIENDS.',
      '===CHASSIS_ID===',
      'big-shoulders-atkinson',
      '```',
      '',
    ].join('\n')
    const r = parseDelimiterResponse(input)
    expect(r.hero_copy).toBe('STAND UP TO YOUR FRIENDS.')
    expect(r.chassis_id).toBe('big-shoulders-atkinson')
  })

  it('strips outer plain code fence', () => {
    const input = [
      '```',
      '===HERO_COPY===',
      'No enemies, only rivals.',
      '===ARCHETYPE===',
      'Poster',
      '```',
      '',
    ].join('\n')
    const r = parseDelimiterResponse(input)
    expect(r.hero_copy).toBe('No enemies, only rivals.')
    expect(r.archetype).toBe('Poster')
  })
})

describe('buildCompositionContractBlock', () => {
  it('returns the override block when density is sparse', () => {
    const block = buildCompositionContractBlock({ density: 'sparse' })
    expect(block).toContain('COMPOSITION CONTRACT — SPARSE')
    expect(block).toContain('hero phrase + navigation ONLY')
    expect(block).toContain('Do NOT render project cards')
  })

  it('fires regardless of which other axis values accompany sparse density', () => {
    const block = buildCompositionContractBlock({
      density: 'sparse',
      field_ratio: 'type-dominant',
      hero_zone: 'full-bleed',
    })
    expect(block).toContain('COMPOSITION CONTRACT — SPARSE')
  })

  it('returns empty string for every other density value', () => {
    expect(buildCompositionContractBlock({ density: 'measured' })).toBe('')
    expect(buildCompositionContractBlock({ density: 'dense' })).toBe('')
    expect(buildCompositionContractBlock({ density: 'crowded' })).toBe('')
  })

  it('returns empty string for a missing or empty tuple', () => {
    expect(buildCompositionContractBlock(undefined)).toBe('')
    expect(buildCompositionContractBlock(null)).toBe('')
    expect(buildCompositionContractBlock({})).toBe('')
  })
})

describe('describeRiskTier', () => {
  it('produces four distinct sentences across the 3-4 / 5-6 / 7-8 / 9-10 buckets', () => {
    const sentences = new Set([3, 4, 5, 6, 7, 8, 9, 10].map(describeRiskTier))
    // 8 risk values, 4 buckets → exactly 4 distinct sentences.
    expect(sentences.size).toBe(4)
  })

  it('risk 3 and 4 share the SAFE bucket', () => {
    expect(describeRiskTier(3)).toBe(describeRiskTier(4))
    expect(describeRiskTier(3)).toMatch(/SAFE/)
  })

  it('risk 5 and 6 share the Balanced bucket', () => {
    expect(describeRiskTier(5)).toBe(describeRiskTier(6))
    expect(describeRiskTier(5)).toMatch(/Balanced/)
  })

  it('risk 7 and 8 share the BOLD bucket, distinct from 9-10', () => {
    expect(describeRiskTier(7)).toBe(describeRiskTier(8))
    expect(describeRiskTier(7)).toMatch(/^BOLD/)
    expect(describeRiskTier(7)).not.toBe(describeRiskTier(9))
  })

  it('risk 9 and 10 share the MAXIMUM RISK bucket and mention the Max-Risk License', () => {
    expect(describeRiskTier(9)).toBe(describeRiskTier(10))
    expect(describeRiskTier(9)).toMatch(/MAXIMUM RISK/)
    expect(describeRiskTier(9)).toMatch(/Max-Risk License/)
  })

  it('the old risk=8 default no longer produces the >=7 sentence used for 9-10', () => {
    // Regression guard: risk=8 was the constant default before this change,
    // and previously shared the ">=7" sentence with every value through 10.
    expect(describeRiskTier(8)).not.toBe(describeRiskTier(10))
  })
})

describe('resolveRiskWeight', () => {
  it('an explicitly-set env value always wins over the derived value', () => {
    expect(resolveRiskWeight('5', '2026-08-23')).toEqual({ risk: 5, explicitlySet: true })
    expect(resolveRiskWeight('10', '2026-01-01')).toEqual({ risk: 10, explicitlySet: true })
  })

  it('"0" counts as explicitly set (falsy in JS, but not unset)', () => {
    expect(resolveRiskWeight('0', '2026-08-23')).toEqual({ risk: 0, explicitlySet: true })
  })

  it('undefined and empty string both derive risk from the date instead', () => {
    const fromUndefined = resolveRiskWeight(undefined, '2026-08-23')
    const fromEmpty = resolveRiskWeight('', '2026-08-23')
    expect(fromUndefined.explicitlySet).toBe(false)
    expect(fromEmpty.explicitlySet).toBe(false)
    expect(fromUndefined.risk).toBe(fromEmpty.risk)
  })

  it('derived risk is always in range 3-10', () => {
    const dates = [
      '2026-01-01',
      '2026-02-14',
      '2026-03-30',
      '2026-04-17',
      '2026-05-05',
      '2026-06-21',
      '2026-07-04',
      '2026-08-23',
      '2026-09-09',
      '2026-10-31',
      '2026-11-11',
      '2026-12-25',
    ]
    for (const date of dates) {
      const { risk } = resolveRiskWeight(undefined, date)
      expect(risk).toBeGreaterThanOrEqual(3)
      expect(risk).toBeLessThanOrEqual(10)
    }
  })

  it('same date always derives the same risk (reproducible re-runs)', () => {
    const a = resolveRiskWeight(undefined, '2026-08-23')
    const b = resolveRiskWeight(undefined, '2026-08-23')
    expect(a).toEqual(b)
  })

  it('different dates derive different risk values across a run (not a constant)', () => {
    const dates = [
      '2026-01-01',
      '2026-02-14',
      '2026-03-30',
      '2026-04-17',
      '2026-05-05',
      '2026-06-21',
      '2026-07-04',
      '2026-08-23',
      '2026-09-09',
      '2026-10-31',
      '2026-11-11',
      '2026-12-25',
    ]
    const risks = new Set(dates.map((d) => resolveRiskWeight(undefined, d).risk))
    expect(risks.size).toBeGreaterThan(1)
  })
})
