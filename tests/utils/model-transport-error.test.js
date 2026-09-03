import { describe, expect, it } from 'vitest'
import { ModelTransportError } from '../../scripts/utils/model-transport-error.js'

describe('ModelTransportError', () => {
  it('shapes the exit-code message from agent, channel, exit code, and stderr tail', () => {
    const err = new ModelTransportError({
      agent: 'art-director',
      channel: 'cli',
      exitCode: 1,
      stderrTail: 'fatal: bad auth config',
    })

    expect(err).toBeInstanceOf(Error)
    expect(err.name).toBe('ModelTransportError')
    expect(err.message).toBe(
      'no response from the model for art-director (cli, exit 1): fatal: bad auth config'
    )
    expect(err.agent).toBe('art-director')
    expect(err.channel).toBe('cli')
    expect(err.exitCode).toBe(1)
    expect(err.stderrTail).toBe('fatal: bad auth config')
    expect(err.emptyReply).toBe(false)
    expect(err.transport).toBe(true)
  })

  it('shapes the empty-reply message without an exit code or stderr tail', () => {
    const err = new ModelTransportError({
      agent: 'screenshot-critic',
      channel: 'sdk-vision',
      emptyReply: true,
    })

    expect(err.message).toBe(
      'no response from the model for screenshot-critic (sdk-vision, empty reply)'
    )
    expect(err.exitCode).toBeNull()
    expect(err.stderrTail).toBe('')
    expect(err.emptyReply).toBe(true)
    expect(err.transport).toBe(true)
  })

  it('names the cli-text-fallback channel distinctly from cli', () => {
    const err = new ModelTransportError({
      agent: 'mockup-critic',
      channel: 'cli-text-fallback',
      exitCode: 1,
      stderrTail: '',
    })

    expect(err.channel).toBe('cli-text-fallback')
    expect(err.message).toContain('(cli-text-fallback, exit 1)')
  })

  it('is always flagged transport:true so callers can skip a same-call retry', () => {
    const err = new ModelTransportError({ agent: 'x', channel: 'cli', emptyReply: true })
    expect(err.transport).toBe(true)
  })
})
