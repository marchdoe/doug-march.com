import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { EventEmitter } from 'node:events'
import { Readable } from 'node:stream'

// We need to mock child_process.spawn before importing claude-cli.js
// so the spawn call inside resolves to our fake child process.

const mockChildren = []

vi.mock('child_process', () => ({
  spawn: vi.fn(() => {
    const child = new EventEmitter()
    child.stdout = new EventEmitter()
    child.stderr = new EventEmitter()
    // stdin needs a writable-like interface with the methods that pipe() uses
    child.stdin = Object.assign(new EventEmitter(), {
      write: vi.fn(),
      end: vi.fn(),
      on: EventEmitter.prototype.on.bind(child.stdin ?? new EventEmitter()),
    })
    // Simpler: use a proper Writable stream
    const { Writable } = require('node:stream')
    child.stdin = new Writable({
      write(chunk, enc, cb) {
        cb()
      },
    })
    child.stdin.on('error', () => {})
    child.kill = vi.fn((signal) => {
      // Simulate a process that ignores SIGTERM but responds to SIGKILL
      if (signal === 'SIGKILL') {
        setImmediate(() => child.emit('close', null))
      }
    })
    mockChildren.push(child)
    return child
  }),
}))

// Also mock fs/promises writeFile/unlink since we don't want to actually
// write the temp prompt file
vi.mock('fs/promises', async () => {
  const actual = await vi.importActual('fs/promises')
  return {
    ...actual,
    writeFile: vi.fn(async () => {}),
    unlink: vi.fn(async () => {}),
  }
})

vi.mock('fs', async () => {
  const actual = await vi.importActual('fs')
  return {
    ...actual,
    createReadStream: vi.fn(() => {
      // Return a readable stream that emits nothing and ends immediately
      return Readable.from([])
    }),
  }
})

describe('claude-cli stall detection', () => {
  beforeEach(async () => {
    mockChildren.length = 0
    vi.useFakeTimers()
    const { resetLedger } = await import('../../scripts/utils/cost-ledger.js')
    resetLedger()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.clearAllMocks()
  })

  it('rejects with /stalled/ when no content arrives within stallTimeoutMs', async () => {
    const { callClaudeCLI } = await import('../../scripts/utils/claude-cli.js')

    const promise = callClaudeCLI('test-agent', 'system', 'user prompt', {
      timeoutMs: 60 * 60 * 1000, // 1 hour — much longer than stall
      stallTimeoutMs: 1000, // 1 second stall timeout for the test
    })

    // Attach rejection handler immediately so unhandled rejection doesn't fail
    const rejected = promise.catch((err) => err)

    // Advance past the stall check interval (30s is default, but the stall
    // timeout itself is 1s — we need to trigger a check after that).
    // The stallCheck interval runs every 30s, so we need 30s+ of fake time.
    await vi.advanceTimersByTimeAsync(35000)

    // The first child should be killed by stall detection
    expect(mockChildren[0].kill).toHaveBeenCalled()

    // Wait for SIGKILL fallback (5s after SIGTERM) and close event
    await vi.advanceTimersByTimeAsync(6000)

    const err = await rejected
    expect(err).toBeInstanceOf(Error)
    expect(err.message).toMatch(/stalled/)
    expect(err.message).toMatch(/test-agent/)

    // A stalled call still consumed real time (and, on a billed run, real
    // tokens) — it must show up in cost.json as unpriceable, not disappear.
    const { getUsageRecords } = await import('../../scripts/utils/cost-ledger.js')
    const [record] = getUsageRecords()
    expect(record.agent).toBe('test-agent')
    expect(record.cost_usd).toBeNull()
  })

  it('does NOT stall when content arrives periodically', async () => {
    const { callClaudeCLI } = await import('../../scripts/utils/claude-cli.js')

    const promise = callClaudeCLI('test-agent', 'system', 'user prompt', {
      timeoutMs: 60 * 60 * 1000,
      stallTimeoutMs: 10000, // 10s stall
    })

    const rejected = promise.catch((err) => err)

    // Wait for the spawn to happen
    await vi.advanceTimersByTimeAsync(10)
    const child = mockChildren[0]
    expect(child).toBeDefined()

    // Emit actual text content events at 5s intervals — under stall threshold
    for (let i = 0; i < 3; i++) {
      await vi.advanceTimersByTimeAsync(5000)
      const event = {
        type: 'assistant',
        message: { content: [{ type: 'text', text: 'content chunk' }] },
      }
      child.stdout.emit('data', Buffer.from(`${JSON.stringify(event)}\n`))
    }

    // At this point 15 seconds have passed but the content kept arriving.
    // Kill shouldn't have been called.
    expect(child.kill).not.toHaveBeenCalled()

    // Now stop emitting and let it stall
    await vi.advanceTimersByTimeAsync(40000)
    expect(child.kill).toHaveBeenCalled()

    await vi.advanceTimersByTimeAsync(6000)
    const err = await rejected
    expect(err.message).toMatch(/stalled/)
  })

  it('books an unpriceable call when the hard timeout fires', async () => {
    const { callClaudeCLI } = await import('../../scripts/utils/claude-cli.js')
    const { getUsageRecords } = await import('../../scripts/utils/cost-ledger.js')

    const promise = callClaudeCLI('timeout-agent', 'system', 'user prompt', {
      timeoutMs: 1000,
      stallTimeoutMs: 60 * 60 * 1000, // stall check must not fire first
    })
    const rejected = promise.catch((err) => err)

    await vi.advanceTimersByTimeAsync(1000) // trips the hard timeout
    await vi.advanceTimersByTimeAsync(6000) // SIGKILL fallback + close

    const err = await rejected
    expect(err.message).toMatch(/timed out/)

    const [record] = getUsageRecords()
    expect(record.agent).toBe('timeout-agent')
    expect(record.cost_usd).toBeNull()
  })

  it('books an unpriceable call, not a $0 one, when the process crashes with no result event', async () => {
    const { callClaudeCLI } = await import('../../scripts/utils/claude-cli.js')
    const { getUsageRecords } = await import('../../scripts/utils/cost-ledger.js')

    const promise = callClaudeCLI('crash-agent', 'system', 'user prompt', {
      timeoutMs: 60 * 60 * 1000,
      stallTimeoutMs: 60 * 60 * 1000,
    })
    const rejected = promise.catch((err) => err)

    await vi.advanceTimersByTimeAsync(10)
    const child = mockChildren[0]
    child.stderr.emit('data', Buffer.from('fatal: bad auth config\n'))
    child.emit('close', 1)

    const err = await rejected
    expect(err.message).toMatch(/exited with code 1/)

    const [record] = getUsageRecords()
    expect(record.agent).toBe('crash-agent')
    // The bug this guards: an empty usage object must not price to $0 —
    // that would read as "this call was free" instead of "we don't know".
    expect(record.cost_usd).toBeNull()
    expect(record.estimated).toBe(false)
  })
})
