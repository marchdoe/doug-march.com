import { describe, it, expect, afterEach } from 'vitest'
import { assertDevOnly, assertLocalRequest } from '../../app/server/dev-only'

const originalEnv = process.env.NODE_ENV

describe('assertDevOnly', () => {
  afterEach(() => {
    process.env.NODE_ENV = originalEnv
  })

  it('throws in production', () => {
    process.env.NODE_ENV = 'production'
    expect(() => assertDevOnly()).toThrow(/only available in development/)
  })

  it('passes in development', () => {
    process.env.NODE_ENV = 'development'
    expect(() => assertDevOnly()).not.toThrow()
  })

  it('passes in test', () => {
    process.env.NODE_ENV = 'test'
    expect(() => assertDevOnly()).not.toThrow()
  })
})

describe('assertLocalRequest', () => {
  // #323: the server functions were gated on NODE_ENV alone, so a LAN peer
  // under `pnpm dev --host` could read trace.json through /_serverFn/*.
  const local = {
    host: 'localhost:5173',
    origin: 'http://localhost:5173',
    'sec-fetch-site': 'same-origin',
  }

  it('passes the panel calling its own server functions', () => {
    expect(() => assertLocalRequest({ ip: '127.0.0.1', headers: local })).not.toThrow()
    expect(() => assertLocalRequest({ ip: '::1', headers: { host: '[::1]:5173' } })).not.toThrow()
  })

  it('refuses a LAN peer even with a local-looking Host', () => {
    expect(() => assertLocalRequest({ ip: '192.168.1.20', headers: local })).toThrow(
      /localhost-only/
    )
    expect(() => assertLocalRequest({ ip: undefined, headers: local })).toThrow(/localhost-only/)
  })

  it('refuses a rebinding Host from a loopback peer', () => {
    expect(() =>
      assertLocalRequest({ ip: '127.0.0.1', headers: { ...local, host: 'evil.example' } })
    ).toThrow(/host is not local/)
  })

  it('refuses a cross-site fetch with no Origin', () => {
    expect(() =>
      assertLocalRequest({
        ip: '127.0.0.1',
        headers: { host: 'localhost:5173', 'sec-fetch-site': 'cross-site' },
      })
    ).toThrow(/invalid origin/)
  })
})
