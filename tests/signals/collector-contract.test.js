/**
 * What every signal collector has to agree on.
 *
 * These were nineteen hand-rolled fetch blocks that disagreed with each other,
 * and the disagreements were invisible because each collector only had a
 * happy-path test of its own. The contract, asserted across all of them:
 *
 *   - `collect(profile, { signal })` — and the signal is actually forwarded.
 *     The orchestrator has always built an AbortController and aborted it in
 *     `finally`; no collector declared the argument, so ten of twelve made a
 *     bare `fetch(url)` and the sockets outlived the run.
 *   - a provider that needs a key declares `requiresApiKey`, and lets the
 *     orchestrator do the skipping rather than throwing an unreachable error.
 */
import { describe, it, expect, vi, afterEach } from 'vitest'
import { readdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const SIGNALS_DIR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../scripts/signals'
)

const files = readdirSync(SIGNALS_DIR).filter((f) => f.endsWith('.js'))
const providers = await Promise.all(
  files.map(async (f) => ({ file: f, mod: await import(path.join(SIGNALS_DIR, f)) }))
)

// Collectors that reach the network. The rest read the profile or the clock.
const NETWORK = [
  'air-quality.js',
  'awwwards.js',
  'dribbble.js',
  'github.js',
  'golf.js',
  'hacker-news.js',
  'market.js',
  'news.js',
  'product-hunt.js',
  'quote.js',
  'sports.js',
  'weather.js',
]

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('every provider', () => {
  it('is discovered', () => {
    expect(providers.length).toBeGreaterThan(15)
  })

  it.each(providers.map((p) => [p.file, p.mod]))('%s exports name, timeout, collect', (_f, mod) => {
    expect(typeof mod.name).toBe('string')
    expect(typeof mod.timeout).toBe('number')
    expect(typeof mod.collect).toBe('function')
  })

  it.each(providers.map((p) => [p.file, p.mod]))(
    '%s declares a key requirement rather than throwing for it',
    (_f, mod) => {
      // collect-signals.js returns status 'skipped' when requiresApiKey is
      // unset, so an in-collector `if (!key) throw` was never reached. Three
      // tests existed for that dead path.
      if (mod.requiresApiKey !== undefined) expect(typeof mod.requiresApiKey).toBe('string')
    }
  )
})

describe('network providers forward the abort signal', () => {
  const networkProviders = providers.filter((p) => NETWORK.includes(p.file))

  it('covers every networked collector', () => {
    expect(networkProviders.length).toBe(NETWORK.length)
  })

  it.each(networkProviders.map((p) => [p.file, p.mod]))(
    '%s passes the orchestrator signal down to fetch',
    async (_f, mod) => {
      const seen = []
      vi.stubGlobal(
        'fetch',
        vi.fn((_url, init) => {
          seen.push(init?.signal)
          // Reject the way an aborted fetch does, so the collector unwinds.
          return Promise.reject(Object.assign(new Error('aborted'), { name: 'AbortError' }))
        })
      )

      const ac = new AbortController()
      const profile = {
        location: { zip: '20105', lat: 39, lng: -77, tz: 'America/New_York' },
        sports: { teams: [{ name: 'Detroit Lions', league: 'NFL' }] },
        news: { disallow: [] },
      }

      await mod.collect(profile, { signal: ac.signal }).catch(() => {})

      expect(seen.length, 'collector never called fetch').toBeGreaterThan(0)
      for (const signal of seen) {
        expect(signal, 'fetch called with no AbortSignal').toBeInstanceOf(AbortSignal)
      }
    }
  )
})
