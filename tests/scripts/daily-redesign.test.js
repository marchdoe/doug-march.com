// tests/scripts/daily-redesign.test.js
import { describe, it, expect } from 'vitest'
import { CLAUDE_CLI_ARGS } from '../../scripts/daily-redesign.js'

describe('CLAUDE_CLI_ARGS', () => {
  it('includes print mode flag', () => {
    expect(CLAUDE_CLI_ARGS).toContain('-p')
  })

  it('disables all built-in tools', () => {
    const toolsIdx = CLAUDE_CLI_ARGS.indexOf('--tools')
    expect(toolsIdx).toBeGreaterThan(-1)
    expect(CLAUDE_CLI_ARGS[toolsIdx + 1]).toBe('')
  })

  it('disables slash commands / skills', () => {
    expect(CLAUDE_CLI_ARGS).toContain('--disable-slash-commands')
  })

  it('limits to one turn', () => {
    const idx = CLAUDE_CLI_ARGS.indexOf('--max-turns')
    expect(idx).toBeGreaterThan(-1)
    expect(CLAUDE_CLI_ARGS[idx + 1]).toBe('1')
  })

  it('uses stream-json output format', () => {
    const idx = CLAUDE_CLI_ARGS.indexOf('--output-format')
    expect(idx).toBeGreaterThan(-1)
    expect(CLAUDE_CLI_ARGS[idx + 1]).toBe('stream-json')
  })

  it('uses sonnet model with fallback', () => {
    const modelIdx = CLAUDE_CLI_ARGS.indexOf('--model')
    expect(modelIdx).toBeGreaterThan(-1)
    expect(CLAUDE_CLI_ARGS[modelIdx + 1]).toBe('sonnet')

    const fallbackIdx = CLAUDE_CLI_ARGS.indexOf('--fallback-model')
    expect(fallbackIdx).toBeGreaterThan(-1)
    expect(CLAUDE_CLI_ARGS[fallbackIdx + 1]).toBe('haiku')
  })

  it('uses a rich designer system prompt with design fundamentals', () => {
    const idx = CLAUDE_CLI_ARGS.indexOf('--system-prompt')
    expect(idx).toBeGreaterThan(-1)
    const prompt = CLAUDE_CLI_ARGS[idx + 1]
    expect(prompt).toContain('expert web designer')
    expect(prompt).toContain('grid discipline')
    expect(prompt).toContain('Visual hierarchy')
    expect(prompt).toContain('Color restraint')
    expect(prompt).toContain('valid JSON')
  })
})
