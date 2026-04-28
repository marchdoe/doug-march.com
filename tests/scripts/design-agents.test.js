import { describe, it, expect } from 'vitest'
import {
  FILE_OWNERSHIP,
  buildAgentPrompt,
  identifyFailingAgent,
  extractArchetypeFromText,
  parseDelimiterResponse,
  resolveChassisFromDirectorOutput,
} from '../../scripts/design-agents.js'

describe('FILE_OWNERSHIP', () => {
  it('maps every file to exactly one agent', () => {
    const allFiles = Object.values(FILE_OWNERSHIP)
    expect(new Set(allFiles).size).toBeLessThanOrEqual(5)
    expect(Object.keys(FILE_OWNERSHIP)).toHaveLength(15)
  })

  it('maps preset.ts to token-designer', () => {
    expect(FILE_OWNERSHIP['elements/preset.ts']).toBe('token-designer')
  })

  it('does not map __root.tsx to any agent (orchestrator owns it via the chassis template)', () => {
    expect(FILE_OWNERSHIP['app/routes/__root.tsx']).toBeUndefined()
  })

  it('maps layout, route, sidebar, and component files to unified-designer', () => {
    expect(FILE_OWNERSHIP['app/components/Layout.tsx']).toBe('unified-designer')
    expect(FILE_OWNERSHIP['app/routes/index.tsx']).toBe('unified-designer')
    expect(FILE_OWNERSHIP['app/components/Sidebar.tsx']).toBe('unified-designer')
    expect(FILE_OWNERSHIP['app/components/Bio.tsx']).toBe('unified-designer')
    expect(FILE_OWNERSHIP['app/components/FeaturedProject.tsx']).toBe('unified-designer')
  })

  it('MobileFooter.tsx is not in FILE_OWNERSHIP (removed from mutable files)', () => {
    expect(FILE_OWNERSHIP['app/components/MobileFooter.tsx']).toBeUndefined()
  })
})

describe('identifyFailingAgent', () => {
  it('identifies unified-designer from a build error mentioning Layout.tsx', () => {
    const error = "app/components/Layout.tsx(15,7): error TS2322"
    expect(identifyFailingAgent(error)).toBe('unified-designer')
  })

  it('identifies unified-designer from a build error mentioning Bio.tsx', () => {
    const error = "app/components/Bio.tsx(8,3): error TS2304"
    expect(identifyFailingAgent(error)).toBe('unified-designer')
  })

  it('identifies token-designer from error mentioning preset', () => {
    const error = "Error in elements/preset.ts: invalid token"
    expect(identifyFailingAgent(error)).toBe('token-designer')
  })

  it('returns unified-designer when errors span multiple unified-designer files', () => {
    const error = "app/components/Layout.tsx(15,7): error\napp/components/Bio.tsx(8,3): error"
    expect(identifyFailingAgent(error)).toBe('unified-designer')
  })

  it('returns "both" when no file can be identified', () => {
    const error = "Unknown build error"
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
      referenceFiles: [{ path: 'app/components/Layout.tsx', content: 'export function Layout() {}' }],
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

describe('extractArchetypeFromText', () => {
  it('extracts from the structured **Archetype:** declaration', () => {
    const spec = `# Visual Specification\n**Date:** 2026-04-09\n**Archetype:** The Broadsheet\n\n...`
    expect(extractArchetypeFromText(spec)).toBe('Broadsheet')
  })

  it('handles archetype without "The" prefix', () => {
    const spec = `**Archetype:** Specimen\n\nbody`
    expect(extractArchetypeFromText(spec)).toBe('Specimen')
  })

  it('handles "Gallery Wall" with space (avoids partial match on Wall)', () => {
    const spec = `**Archetype:** The Gallery Wall\n\nbody`
    expect(extractArchetypeFromText(spec)).toBe('Gallery Wall')
  })

  it('picks the chosen archetype, not forbidden names from constraint text', () => {
    // This was the regression that shipped wrong archetypes — the
    // forbidden-list echo appears earlier in the text than the actual
    // choice, and the old first-match implementation returned the
    // forbidden name.
    const spec = `
## Archetype History — MANDATORY CONSTRAINT
Recent archetype usage: Gallery Wall, Specimen, Gallery Wall
**FORBIDDEN TODAY**: Gallery Wall, Specimen

You MUST choose from: Broadsheet, Poster, Scroll, Split, Stack, Index.

# Visual Specification
**Archetype:** The Index
`
    expect(extractArchetypeFromText(spec)).toBe('Index')
  })

  it('falls back to last-match when structured line is absent', () => {
    const spec = 'FORBIDDEN: Gallery Wall, Specimen\n\nThis uses the Stack approach with horizontal bands.'
    expect(extractArchetypeFromText(spec)).toBe('Stack')
  })

  it('returns null when no archetype is mentioned', () => {
    expect(extractArchetypeFromText('random prose with no archetype names')).toBeNull()
  })

  it('returns null for empty string', () => {
    expect(extractArchetypeFromText('')).toBeNull()
  })

  it('matches Broadsheet case-insensitively in structured line', () => {
    expect(extractArchetypeFromText('**Archetype:** THE BROADSHEET')).toBe('Broadsheet')
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
    const input = [
      '===FILE:app/components/Foo.tsx===',
      'export const x = 42',
      '',
    ].join('\n')
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
    const input = [
      '===FILE: ===',
      'content',
      '===FILE:valid.tsx===',
      'const x = 1',
      '',
    ].join('\n')
    const { files } = parseDelimiterResponse(input)
    expect(files).toHaveLength(1)
    expect(files[0].path).toBe('valid.tsx')
  })
})

describe('agent prompt files include anti-anchoring language', () => {
  it('structure-agent.md tells the model to design from scratch', async () => {
    const { readFile } = await import('fs/promises')
    const content = await readFile('scripts/prompts/structure-agent.md', 'utf8')
    expect(content).toContain('complete reimagination')
    expect(content).toContain('blank canvas')
  })
})
