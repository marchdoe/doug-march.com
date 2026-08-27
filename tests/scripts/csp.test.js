/**
 * The Content-Security-Policy must not quietly break 120 designs.
 *
 * The archive serves 1,214 pages of HTML an LLM wrote, from the same origin as
 * an authenticated admin API. That is the reason for a CSP. It is also the
 * reason a careless one is dangerous: every archived page carries its whole
 * design in an inline `<style>` block and pulls its typefaces from Google Fonts
 * or Fontshare. A policy that forgets either does not fail loudly — the pages
 * still render, in Times New Roman, with no colour.
 *
 * These assertions are derived from what the committed corpus actually
 * contains, measured rather than assumed:
 *
 *   1,214 pages with <style>        →  style-src needs 'unsafe-inline'
 *     648 pages with style="…"      →  same
 *   2,758 fonts.googleapis.com refs →  style-src needs that origin
 *   1,370 fonts.gstatic.com refs    →  font-src needs it
 *      18 api.fontshare.com refs    →  both need it
 *     946 data:image/svg+xml refs   →  img-src needs data:
 *       0 <script>, 0 on*=, 0 <form>, 0 external images
 */

import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')
const config = JSON.parse(readFileSync(path.join(ROOT, 'vercel.json'), 'utf8'))

const cspFor = (source) => {
  const rule = config.headers.find((h) => h.source === source)
  const header = rule?.headers.find((x) => x.key === 'Content-Security-Policy')
  return header?.value ?? null
}

/** `{ 'script-src': ['self', ...], … }` */
function directives(policy) {
  const out = {}
  for (const part of policy.split(';')) {
    const [name, ...values] = part.trim().split(/\s+/)
    if (name) out[name] = values
  }
  return out
}

const SITE = '/(.*)'
const ARCHIVE = '/archive/(.*)'

describe('both policies exist', () => {
  it('one for the site, one for the preserved designs', () => {
    expect(cspFor(SITE)).toBeTruthy()
    expect(cspFor(ARCHIVE)).toBeTruthy()
  })

  /**
   * Both rules match an archived page, and Vercel sends one header per key.
   *
   * Which of the two wins is NOT asserted here, because it was not confirmed.
   * Two deploy previews disagreed with each attempted ordering, the published
   * configuration docs do not state duplicate-key precedence, and further
   * probing tripped Vercel's bot mitigation. Encoding a guess as a test would
   * make it look settled.
   *
   * What is safe either way: both policies permit everything an archived page
   * needs, so whichever lands, the designs render. The strict one is hardening
   * on pages that already contain no script at all.
   *
   * To settle it, after any deploy:
   *   curl -sD - -o /dev/null https://<host>/archive/2026-06-28/ | grep -i content-security-policy
   * If it reports script-src 'none', the archive rule wins and this ordering
   * is right. If it reports 'self' 'unsafe-inline', move the archive rule to
   * the other side of the catch-all.
   */
  it('has both rules present, whichever precedence turns out to be', () => {
    const sources = config.headers.map((h) => h.source)
    expect(sources).toContain(ARCHIVE)
    expect(sources).toContain(SITE)
  })
})

describe.each([
  ['site', SITE],
  ['archive', ARCHIVE],
])('the %s policy still lets a design render', (_label, source) => {
  const d = directives(cspFor(source))

  it('allows the inline styles that are the design itself', () => {
    expect(d['style-src']).toContain("'unsafe-inline'")
  })

  it('allows the webfont stylesheet hosts', () => {
    expect(d['style-src']).toContain('https://fonts.googleapis.com')
    expect(d['style-src']).toContain('https://api.fontshare.com')
  })

  it('allows the webfont files themselves', () => {
    expect(d['font-src']).toContain('https://fonts.gstatic.com')
    expect(d['font-src']).toContain('https://api.fontshare.com')
  })

  it('allows the inlined SVGs', () => {
    expect(d['img-src']).toContain('data:')
  })

  it('refuses framing, plugins, and base tag rewrites', () => {
    expect(d['frame-ancestors']).toEqual(["'none'"])
    expect(d['object-src']).toEqual(["'none'"])
    expect(d['base-uri']).toEqual(["'none'"])
  })

  it('refuses form submission, since nothing anywhere has a form', () => {
    expect(d['form-action']).toEqual(["'none'"])
  })
})

describe('the archive policy is the strict one', () => {
  const d = directives(cspFor(ARCHIVE))

  it('forbids script outright — a snapshot has none and never should', () => {
    // snapshot.js strips every <script> at capture. This is the second lock.
    expect(d['script-src']).toEqual(["'none'"])
  })

  it('forbids the page phoning anywhere', () => {
    expect(d['connect-src']).toEqual(["'none'"])
  })
})

describe('the site policy', () => {
  const d = directives(cspFor(SITE))

  it('permits inline script, because the framework emits hydration scripts', () => {
    // TanStack Start emits two inline scripts whose content changes with the
    // framework, plus the theme-init script. Hashes would break silently on any
    // upgrade and static hosting cannot issue a nonce, so this is the honest
    // ceiling. External script origins are still refused.
    expect(d['script-src']).toContain("'self'")
    expect(d['script-src']).toContain("'unsafe-inline'")
  })

  it('loads script from nowhere else', () => {
    const external = d['script-src'].filter((v) => v.startsWith('http'))
    expect(external).toEqual([])
  })

  it('permits no eval', () => {
    expect(d['script-src']).not.toContain("'unsafe-eval'")
  })

  it('talks only to itself', () => {
    expect(d['connect-src']).toEqual(["'self'"])
  })
})

describe('the older headers survive', () => {
  const rule = config.headers.find((h) => h.source === SITE)
  const keys = rule.headers.map((h) => h.key)

  it.each([['X-Content-Type-Options'], ['X-Frame-Options'], ['Referrer-Policy']])(
    'still sets %s',
    (key) => {
      expect(keys).toContain(key)
    }
  )
})
