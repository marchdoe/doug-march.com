import { describe, it, expect, afterEach } from 'vitest'
import { runCollector } from '../scripts/collect-signals.js'
import { unlink } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')

describe('collect-signals orchestrator', () => {
  afterEach(async () => {
    for (const f of ['signals/today.yml', 'signals/today.meta.yml']) {
      const p = path.join(ROOT, f)
      if (existsSync(p)) await unlink(p)
    }
  })

  it('collects from providers and writes YAML + meta', async () => {
    const mockProviders = [
      {
        name: 'test-ok',
        timeout: 1000,
        collect: async () => ({ data: { value: 'hello' }, meta: { source: 'test', items: 1 } }),
      },
      {
        name: 'test-fail',
        timeout: 1000,
        collect: async () => {
          throw new Error('API down')
        },
      },
    ]

    const mockProfile = { location: { zip: '20105' } }
    const result = await runCollector(mockProviders, mockProfile)

    expect(result.signals['test-ok']).toEqual({ value: 'hello' })
    expect(result.signals['test-fail']).toBeUndefined()
    expect(result.meta.sources['test-ok'].status).toBe('ok')
    expect(result.meta.sources['test-fail'].status).toBe('error')
    expect(result.meta.sources['test-fail'].reason).toContain('API down')
  })

  it('enforces per-provider timeout', async () => {
    // A provider that never settles rather than one that races a real 5s
    // timer. The old version needed a 10s test budget, accepted either
    // 'skipped' or 'error' because "CI timing jitter can cause the timeout to
    // fire slightly early", and left a live 5s timer running after the test
    // had finished. The provider's own 100ms timeout is the thing under test,
    // so nothing here needs to take 100ms of wall clock either.
    const mockProviders = [
      {
        name: 'test-slow',
        timeout: 100,
        collect: () => new Promise(() => {}),
      },
    ]

    const mockProfile = { location: { zip: '20105' } }
    const result = await runCollector(mockProviders, mockProfile)

    expect(result.meta.sources['test-slow'].status).toBe('skipped')
    expect(result.meta.sources['test-slow'].reason).toContain('timeout')
  })

  it('stamps the date in the site timezone, not UTC', async () => {
    // 22:00 in Ashburn is already tomorrow in UTC. The record used to say
    // tomorrow's date beside today's weekday.
    const now = new Date('2026-08-31T02:00:00Z')
    expect(now.toISOString().slice(0, 10)).toBe('2026-08-31')

    const result = await runCollector([], { location: { tz: 'America/New_York' } }, { now })
    expect(result.signals.date).toBe('2026-08-30')
  })

  it('hands every provider the same instant', async () => {
    // Each derived collector used to call new Date() milliseconds apart,
    // which straddles midnight about once a year.
    const seen = []
    const providers = ['a', 'b', 'c'].map((name) => ({
      name,
      timeout: 1000,
      collect: async (_p, opts) => {
        seen.push(opts.now.toISOString())
        return { data: { name }, meta: { source: 'test', items: 1 } }
      },
    }))
    const now = new Date('2026-08-30T12:00:00Z')
    await runCollector(providers, { location: { tz: 'America/New_York' } }, { now })
    expect(new Set(seen).size).toBe(1)
    expect(seen[0]).toBe('2026-08-30T12:00:00.000Z')
  })
})
