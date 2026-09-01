/**
 * A link to a route that does not exist is invisible to every other gate.
 *
 * 2026-09-01 shipped a nav reading WORK / ABOUT / NOW. There is no `/now`
 * route, and because the nav lives in the shell, every page on the site
 * carried a link straight to the 404. The route rendered, the build compiled,
 * the token gate is about colour and spacing, and the surface gate only walks
 * routes it already knows exist — so nothing looked.
 */

import { describe, it, expect } from 'vitest'
import { internalHrefs, routeExists } from '../../scripts/utils/build-validator.js'

const routes = {
  static: ['/', '/about', '/archive', '/work', '/work/spaceman'],
  dynamic: ['/how/:date'],
}

describe('finding the links in a source file', () => {
  it('reads both spellings the tree uses', () => {
    const src = `<a href="/about">a</a><Link to="/work">w</Link>`
    expect(internalHrefs(src).sort()).toEqual(['/about', '/work'])
  })

  it('ignores links that are not ours to check', () => {
    const src = `
      <a href="https://dougmar.ch/x">ext</a>
      <a href="mailto:hello@dougmar.ch">mail</a>
      <a href="#contact">anchor</a>
    `
    expect(internalHrefs(src)).toEqual([])
  })

  it('skips template expressions rather than guessing at them', () => {
    // `/work/${slug}` is not a literal and cannot be resolved here. Reporting
    // it would be a false positive on correct code, and this gate blocks.
    expect(internalHrefs('<a href={`/work/${slug}`}>d</a>')).toEqual([])
  })

  it('normalises a query, a hash and a trailing slash to the path', () => {
    expect(internalHrefs(`<a href="/about/?x=1#top">a</a>`)).toEqual(['/about'])
  })

  it('keeps the root as the root', () => {
    expect(internalHrefs(`<a href="/">home</a>`)).toEqual(['/'])
  })
})

describe('resolving a link against the routes that exist', () => {
  it('accepts a real route', () => {
    expect(routeExists('/about', routes)).toBe(true)
    expect(routeExists('/work/spaceman', routes)).toBe(true)
  })

  it('rejects the nav item that shipped', () => {
    expect(routeExists('/now', routes)).toBe(false)
  })

  it('accepts a pattern it cannot enumerate', () => {
    // One /how page per archived build; the dates are not a fixed list.
    expect(routeExists('/how/2026-09-01', routes)).toBe(true)
  })

  it('rejects an invented project even though a slug pattern could match it', () => {
    // The real slugs are enumerated, so `/work/:slug` is dropped from the
    // patterns. Without that, a link to a project that does not exist passes —
    // the same bug as /now wearing a different name.
    expect(routeExists('/work/invented', routes)).toBe(false)
  })

  it('does not match a pattern of the wrong depth', () => {
    expect(routeExists('/how/2026-09-01/extra', routes)).toBe(false)
    expect(routeExists('/how', routes)).toBe(false)
  })
})
