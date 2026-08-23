import { beforeEach, describe, expect, it, vi } from 'vitest'

const sdkMock = vi.fn()
const cliMock = vi.fn()

vi.mock('../../scripts/utils/claude-sdk.js', async (importOriginal) => {
  /** @type {typeof import('../../scripts/utils/claude-sdk.js')} */
  const actual = await importOriginal()
  return {
    ...actual,
    callClaudeSDK: sdkMock,
    hasApiKey: () => Boolean(process.env.ANTHROPIC_API_KEY),
  }
})
vi.mock('../../scripts/utils/claude-cli.js', () => ({ callClaudeCLI: cliMock }))

const { imageBlock, textBlock } = await import('../../scripts/utils/claude-sdk.js')
const { NO_IMAGE_NOTICE, blocksToText, callVisionAgent } = await import(
  '../../scripts/utils/vision-router.js'
)

const BLOCKS = [
  textBlock('## Brief'),
  textBlock('LIGHT scheme:'),
  imageBlock(Buffer.from([0x01, 0x02, 0x03])),
]

describe('blocksToText', () => {
  it('keeps text blocks and drops images', () => {
    expect(blocksToText(BLOCKS)).toBe('## Brief\n\n---\n\nLIGHT scheme:')
  })
})

describe('callVisionAgent', () => {
  beforeEach(() => {
    sdkMock.mockReset()
    cliMock.mockReset()
    vi.unstubAllEnvs()
    vi.stubEnv('PIPELINE_TIER', 'prod')
  })

  it('routes to the SDK with image blocks when an API key is present', async () => {
    vi.stubEnv('ANTHROPIC_API_KEY', 'sk-test')
    sdkMock.mockResolvedValue('===VERDICT===\nSHIP\n===END===')

    const result = await callVisionAgent({
      agentName: 'screenshot-critic',
      systemPrompt: 'sys',
      contentBlocks: BLOCKS,
    })

    expect(result).toBe('===VERDICT===\nSHIP\n===END===')
    expect(cliMock).not.toHaveBeenCalled()
    const [agentName, systemPrompt, blocks] = sdkMock.mock.calls[0]
    expect(agentName).toBe('screenshot-critic')
    expect(systemPrompt).toBe('sys')
    expect(blocks).toEqual(BLOCKS)
    expect(blocks.filter((b) => b.type === 'image')).toHaveLength(1)
  })

  it('falls back to the text-only CLI when no API key is set', async () => {
    cliMock.mockResolvedValue('cli text')

    const result = await callVisionAgent({
      agentName: 'mockup-critic',
      systemPrompt: 'sys',
      contentBlocks: BLOCKS,
    })

    expect(result).toBe('cli text')
    expect(sdkMock).not.toHaveBeenCalled()
    const [agentName, systemPrompt, prompt, opts] = cliMock.mock.calls[0]
    expect(agentName).toBe('mockup-critic')
    expect(systemPrompt).toBe('sys')
    expect(prompt).toContain(NO_IMAGE_NOTICE)
    expect(prompt).toContain('## Brief')
    // No base64 payload smuggled into the text prompt.
    expect(prompt).not.toContain('base64')
    expect(opts.model).toBe('claude-sonnet-5')
  })

  it('uses the CLI when there are no images even with an API key', async () => {
    vi.stubEnv('ANTHROPIC_API_KEY', 'sk-test')
    cliMock.mockResolvedValue('cli text')

    await callVisionAgent({
      agentName: 'mockup-critic',
      systemPrompt: 'sys',
      contentBlocks: [textBlock('just text')],
    })

    expect(sdkMock).not.toHaveBeenCalled()
    expect(cliMock).toHaveBeenCalledTimes(1)
  })

  it('falls back to the CLI when the SDK call throws', async () => {
    vi.stubEnv('ANTHROPIC_API_KEY', 'sk-test')
    sdkMock.mockRejectedValue(new Error('overloaded'))
    cliMock.mockResolvedValue('cli fallback')

    const result = await callVisionAgent({
      agentName: 'mockup-critic',
      systemPrompt: 'sys',
      contentBlocks: BLOCKS,
    })

    expect(result).toBe('cli fallback')
    expect(sdkMock).toHaveBeenCalledTimes(1)
    expect(cliMock).toHaveBeenCalledTimes(1)
  })

  it('passes timeouts through to both paths', async () => {
    vi.stubEnv('ANTHROPIC_API_KEY', 'sk-test')
    sdkMock.mockResolvedValue('ok')
    await callVisionAgent({
      agentName: 'mockup-critic',
      systemPrompt: 'sys',
      contentBlocks: BLOCKS,
      timeoutMs: 600000,
      stallTimeoutMs: 300000,
    })
    expect(sdkMock.mock.calls[0][3]).toMatchObject({ timeoutMs: 600000 })

    vi.stubEnv('ANTHROPIC_API_KEY', '')
    cliMock.mockResolvedValue('ok')
    await callVisionAgent({
      agentName: 'mockup-critic',
      systemPrompt: 'sys',
      contentBlocks: BLOCKS,
      timeoutMs: 600000,
      stallTimeoutMs: 300000,
    })
    expect(cliMock.mock.calls[0][3]).toMatchObject({
      timeoutMs: 600000,
      stallTimeoutMs: 300000,
    })
  })
})
