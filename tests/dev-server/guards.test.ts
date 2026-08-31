import { describe, it, expect, vi } from 'vitest'
import { EventEmitter } from 'node:events'
import {
  MAX_BODY_SIZE,
  guardRequest,
  isAllowedOrigin,
  isLocalRequest,
  readBodyLimited,
} from '../../app/dev-server/guards'

// The dev API spawns processes with live secrets and writes files that steer
// the next pipeline run. This guard is the only thing between it and the
// network when Vite is bound to 0.0.0.0. It had no test until #227.

const req = (remoteAddress: string | undefined, origin?: string) =>
  ({ socket: { remoteAddress }, headers: origin ? { origin } : {} }) as never

function fakeRes() {
  const res = { status: 0, body: '', writeHead: vi.fn(), end: vi.fn() }
  res.writeHead.mockImplementation((s: number) => {
    res.status = s
  })
  res.end.mockImplementation((b: string) => {
    res.body = b
  })
  return res
}

describe('isLocalRequest', () => {
  it('accepts every spelling of loopback', () => {
    for (const a of ['127.0.0.1', '::1', '::ffff:127.0.0.1'])
      expect(isLocalRequest(req(a))).toBe(true)
  })

  it('refuses everything else, including a missing address', () => {
    for (const a of ['192.168.1.20', '10.0.0.5', '::ffff:192.168.1.20', '0.0.0.0', undefined]) {
      expect(isLocalRequest(req(a))).toBe(false)
    }
  })
})

describe('isAllowedOrigin', () => {
  it('allows no Origin at all — the panel fetching its own API', () => {
    expect(isAllowedOrigin(req('127.0.0.1'))).toBe(true)
  })

  it('allows a local page on any port', () => {
    for (const o of ['http://localhost:3001', 'http://127.0.0.1:5173', 'http://[::1]:3001']) {
      expect(isAllowedOrigin(req('127.0.0.1', o))).toBe(true)
    }
  })

  it('refuses another site, which is the DNS-rebinding case', () => {
    for (const o of ['https://evil.example', 'http://localhost.evil.example:80', 'not a url']) {
      expect(isAllowedOrigin(req('127.0.0.1', o))).toBe(false)
    }
  })
})

describe('guardRequest', () => {
  it('403s a remote peer before the handler runs, and says why', () => {
    const res = fakeRes()
    expect(guardRequest(req('192.168.1.20'), res as never)).toBe(false)
    expect(res.status).toBe(403)
    expect(res.body).toContain('localhost-only')
  })

  it('403s a foreign origin from a local peer', () => {
    const res = fakeRes()
    expect(guardRequest(req('127.0.0.1', 'https://evil.example'), res as never)).toBe(false)
    expect(res.status).toBe(403)
    expect(res.body).toContain('invalid origin')
  })

  it('lets a local, same-origin request through untouched', () => {
    const res = fakeRes()
    expect(guardRequest(req('::1'), res as never)).toBe(true)
    expect(res.writeHead).not.toHaveBeenCalled()
  })
})

describe('readBodyLimited', () => {
  function bodyStream(chunks: string[]) {
    const s = new EventEmitter() as EventEmitter & { destroy: () => void }
    s.destroy = vi.fn()
    queueMicrotask(() => {
      for (const c of chunks) s.emit('data', Buffer.from(c))
      s.emit('end')
    })
    return s as never
  }

  it('assembles a body under the cap', async () => {
    await expect(readBodyLimited(bodyStream(['{"a":', '1}']))).resolves.toBe('{"a":1}')
  })

  it('rejects and destroys the request once the cap is passed', async () => {
    const big = 'x'.repeat(MAX_BODY_SIZE + 1)
    const s = bodyStream([big])
    await expect(readBodyLimited(s)).rejects.toThrow(/exceeds/)
    expect((s as { destroy: () => void }).destroy).toHaveBeenCalled()
  })
})
