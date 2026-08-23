import { beforeEach, describe, expect, it, vi } from 'vitest'
import { callClaudeSDK, hasApiKey, imageBlock, textBlock } from '../../scripts/utils/claude-sdk.js'

/** Minimal stand-in for the Anthropic client — never touches the network. */
function stubClient(response) {
  const create = vi.fn().mockResolvedValue(response)
  return { client: { messages: { create } }, create }
}

const OK = {
  content: [{ type: 'text', text: 'Some analysis.\n===VERDICT===\nAPPROVE\n===END===' }],
  stop_reason: 'end_turn',
  usage: { input_tokens: 5000, output_tokens: 400 },
}

describe('content block helpers', () => {
  it('base64-encodes a buffer as an image block, JPEG by default', () => {
    const block = imageBlock(Buffer.from([0xff, 0xd8, 0xff]))
    expect(block).toEqual({
      type: 'image',
      source: { type: 'base64', media_type: 'image/jpeg', data: '/9j/' },
    })
  })

  it('honours an explicit media type', () => {
    expect(imageBlock(Buffer.from('x'), 'image/png').source.media_type).toBe('image/png')
  })

  it('wraps text', () => {
    expect(textBlock('hi')).toEqual({ type: 'text', text: 'hi' })
  })
})

describe('hasApiKey', () => {
  beforeEach(() => {
    vi.unstubAllEnvs()
  })

  it('is true only when ANTHROPIC_API_KEY is set', () => {
    vi.stubEnv('ANTHROPIC_API_KEY', 'sk-test')
    expect(hasApiKey()).toBe(true)
    vi.stubEnv('ANTHROPIC_API_KEY', '')
    expect(hasApiKey()).toBe(false)
  })
})

describe('callClaudeSDK', () => {
  beforeEach(() => {
    vi.unstubAllEnvs()
    vi.stubEnv('ANTHROPIC_API_KEY', 'sk-test')
    vi.stubEnv('PIPELINE_TIER', 'prod')
  })

  it('sends one user turn carrying the given content blocks', async () => {
    const { client, create } = stubClient(OK)
    const blocks = [textBlock('brief'), imageBlock(Buffer.from([0x01]))]

    const text = await callClaudeSDK('mockup-critic', 'you are a critic', blocks, { client })

    expect(text).toBe(OK.content[0].text)
    expect(create).toHaveBeenCalledTimes(1)
    const args = create.mock.calls[0][0]
    expect(args.system).toBe('you are a critic')
    expect(args.messages).toHaveLength(1)
    expect(args.messages[0].role).toBe('user')
    expect(args.messages[0].content).toEqual(blocks)
    expect(args.messages[0].content[1].source.type).toBe('base64')
  })

  it('resolves the model from modelFor(agentName)', async () => {
    const { client, create } = stubClient(OK)
    await callClaudeSDK('screenshot-critic', 'sys', [textBlock('x')], { client })
    expect(create.mock.calls[0][0].model).toBe('claude-sonnet-5')
  })

  it('accepts an explicit model and max_tokens override', async () => {
    const { client, create } = stubClient(OK)
    await callClaudeSDK('mockup-critic', 'sys', [textBlock('x')], {
      client,
      model: 'claude-opus-4-8',
      maxTokens: 4096,
    })
    expect(create.mock.calls[0][0].model).toBe('claude-opus-4-8')
    expect(create.mock.calls[0][0].max_tokens).toBe(4096)
  })

  it('requests adaptive thinking on models that support it', async () => {
    const { client, create } = stubClient(OK)
    await callClaudeSDK('mockup-critic', 'sys', [textBlock('x')], { client })
    expect(create.mock.calls[0][0].thinking).toEqual({ type: 'adaptive' })
  })

  it('omits thinking on haiku, which rejects adaptive', async () => {
    const { client, create } = stubClient(OK)
    await callClaudeSDK('spec-critic', 'sys', [textBlock('x')], {
      client,
      model: 'claude-haiku-4-5',
    })
    expect(create.mock.calls[0][0].thinking).toBeUndefined()
  })

  it('concatenates text blocks and ignores thinking blocks', async () => {
    const { client } = stubClient({
      content: [
        { type: 'thinking', thinking: 'hmm' },
        { type: 'text', text: 'part one ' },
        { type: 'text', text: 'part two' },
      ],
      stop_reason: 'end_turn',
      usage: {},
    })
    const text = await callClaudeSDK('mockup-critic', 'sys', [textBlock('x')], { client })
    expect(text).toBe('part one part two')
  })

  it('throws without an API key', async () => {
    vi.stubEnv('ANTHROPIC_API_KEY', '')
    const { client } = stubClient(OK)
    await expect(
      callClaudeSDK('mockup-critic', 'sys', [textBlock('x')], { client })
    ).rejects.toThrow(/ANTHROPIC_API_KEY/)
  })

  it('throws on an empty block list', async () => {
    const { client } = stubClient(OK)
    await expect(callClaudeSDK('mockup-critic', 'sys', [], { client })).rejects.toThrow(
      /at least one content block/
    )
  })

  it('propagates SDK errors', async () => {
    const client = { messages: { create: vi.fn().mockRejectedValue(new Error('rate_limit')) } }
    await expect(
      callClaudeSDK('mockup-critic', 'sys', [textBlock('x')], { client })
    ).rejects.toThrow(/rate_limit/)
  })
})
