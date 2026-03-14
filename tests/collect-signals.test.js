import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { runCollector } from '../scripts/collect-signals.js'
import { readFile, unlink } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import yaml from 'js-yaml'

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
        collect: async () => { throw new Error('API down') },
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
    const mockProviders = [
      {
        name: 'test-slow',
        timeout: 100,
        collect: async () => {
          await new Promise(r => setTimeout(r, 5000))
          return { data: {}, meta: {} }
        },
      },
    ]

    const mockProfile = { location: { zip: '20105' } }
    const result = await runCollector(mockProviders, mockProfile)

    expect(result.meta.sources['test-slow'].status).toBe('skipped')
    expect(result.meta.sources['test-slow'].reason).toContain('timeout')
  }, 10000)
})
