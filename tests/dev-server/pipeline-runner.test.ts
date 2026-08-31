import { describe, it, expect } from 'vitest'
import { eventsFromChunk, pipelineEnv } from '../../app/dev-server/pipeline-runner'
import { parseBriefSections } from '../../app/dev-server/dev-data'

describe('eventsFromChunk', () => {
  it('turns [TRACE] lines into structured steps and everything else into log lines', () => {
    const chunk = [
      '[phase-1] starting',
      '[TRACE] {"name":"art-director","phase":1}',
      '',
      'done',
    ].join('\n')
    expect(eventsFromChunk(chunk)).toEqual([
      { type: 'log', line: '[phase-1] starting' },
      { type: 'trace', step: { name: 'art-director', phase: 1 } },
      { type: 'log', line: 'done' },
    ])
  })

  it('treats a [TRACE] line that is not JSON as a log line rather than dropping it', () => {
    expect(eventsFromChunk('[TRACE] not json')).toEqual([{ type: 'log', line: '[TRACE] not json' }])
  })
})

describe('pipelineEnv', () => {
  const base = { PATH: '/bin', ANTHROPIC_API_KEY: 'sk-live' }

  it('strips the API key from a mock run', () => {
    const env = pipelineEnv(base, { mock: true })
    expect(env.ANTHROPIC_API_KEY).toBeUndefined()
    expect(env.MOCK_MODE).toBe('true')
    expect(env.PATH).toBe('/bin')
  })

  it('keeps the API key for a real run', () => {
    expect(pipelineEnv(base, { mock: false }).ANTHROPIC_API_KEY).toBe('sk-live')
  })

  it('sends an empty WEIGHT_RISK when unset, so design-agents derives it from the date', () => {
    expect(pipelineEnv(base, {}).WEIGHT_RISK).toBe('')
    expect(pipelineEnv(base, { weights: { risk: null } }).WEIGHT_RISK).toBe('')
    expect(pipelineEnv(base, { weights: { risk: 7 } }).WEIGHT_RISK).toBe('7')
  })

  it('defaults the other weights to 5', () => {
    const env = pipelineEnv(base, { weights: { signals: 9 } })
    expect(env.WEIGHT_SIGNALS).toBe('9')
    expect(env.WEIGHT_INSPIRATION).toBe('5')
    expect(env.WEIGHT_RATINGS).toBe('5')
  })
})

describe('parseBriefSections', () => {
  it('reads the rationale and the files list out of a brief', () => {
    const md = [
      '# Brief',
      "## Claude's Rationale",
      'Because the moon.',
      'Two lines.',
      '## Files Changed',
      '- app/routes/index.tsx',
      '- elements/preset.ts',
      '',
    ].join('\n')
    expect(parseBriefSections(md)).toEqual({
      rationale: 'Because the moon.\nTwo lines.',
      filesChanged: ['app/routes/index.tsx', 'elements/preset.ts'],
    })
  })

  it('degrades to empty when a section is missing', () => {
    expect(parseBriefSections('# nothing here')).toEqual({ rationale: '', filesChanged: [] })
  })
})
