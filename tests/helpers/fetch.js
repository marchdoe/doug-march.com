/**
 * One fetch stub instead of nine hand-rolled ones.
 *
 * Nine signal tests built `{ ok: true, json: async () => … }` by hand and then
 * called `vi.restoreAllMocks()`, which does not undo `vi.stubGlobal` — only
 * `vi.unstubAllGlobals()` does. The stub therefore leaked past the file that
 * installed it.
 */
import { afterEach, vi } from 'vitest'

afterEach(() => {
  vi.unstubAllGlobals()
})

/**
 * Install a fetch stub and return it.
 * @returns {import('vitest').Mock}
 */
export function stubFetch() {
  const mock = vi.fn()
  vi.stubGlobal('fetch', mock)
  return mock
}

/**
 * A JSON Response. Built fresh per call on purpose: a Response body can only
 * be read once, so `mockResolvedValue(jsonResponse(x))` breaks any caller that
 * fans out in parallel.
 */
export function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}

/** Reply with the same JSON to every call, a fresh Response each time. */
export function alwaysJson(mock, data, status = 200) {
  mock.mockImplementation(() => Promise.resolve(jsonResponse(data, status)))
  return mock
}

/** Reply with text, for the HTML-scraping collectors. */
export function textResponse(body, status = 200) {
  return new Response(body, { status, headers: { 'content-type': 'text/html' } })
}
