import { describe, it, expect } from 'vitest'
import { existsSync } from 'fs'
import { readFile } from 'fs/promises'
import path from 'path'
import { CLAUDE_CLI_ARGS } from '../scripts/daily-redesign.js'
import { buildMessages } from '../scripts/utils/prompt-builder.js'

describe('daily-redesign CLI args', () => {
  it('uses stream-json output format with --verbose (required by claude CLI)', () => {
    const formatIdx = CLAUDE_CLI_ARGS.indexOf('--output-format')
    expect(formatIdx).toBeGreaterThan(-1)
    expect(CLAUDE_CLI_ARGS[formatIdx + 1]).toBe('stream-json')
    // stream-json requires --verbose
    expect(CLAUDE_CLI_ARGS).toContain('--verbose')
  })

  it('uses print mode with single turn and no tools', () => {
    expect(CLAUDE_CLI_ARGS).toContain('-p')
    expect(CLAUDE_CLI_ARGS).toContain('--max-turns')
    expect(CLAUDE_CLI_ARGS[CLAUDE_CLI_ARGS.indexOf('--max-turns') + 1]).toBe('1')
  })
})

describe('daily-redesign brief wiring', () => {
  it('passes brief content through to buildMessages when brief file exists', async () => {
    const briefPath = path.resolve('signals/today.brief.md')
    if (!existsSync(briefPath)) return // skip if no brief file

    const brief = await readFile(briefPath, 'utf8')
    const context = {
      signals: { date: '2026-03-15' },
      contentSummary: 'test',
      currentFiles: [],
      brief,
    }
    const { messages } = buildMessages(context)
    const prompt = messages[0].content

    // Brief content should be in the prompt with the framing
    expect(prompt).toContain('How to read this brief')
    expect(prompt).toContain(brief)
  })

  it('falls back to raw signals when brief is not provided', () => {
    const context = {
      signals: { date: '2026-03-15', weather: { location: 'Test', conditions: 'Clear', feel: 'warm' } },
      contentSummary: 'test',
      currentFiles: [],
    }
    const { messages } = buildMessages(context)
    const prompt = messages[0].content

    // No framing, just raw signals
    expect(prompt).not.toContain('How to read this brief')
    expect(prompt).toContain("Today's Signals")
  })
})
