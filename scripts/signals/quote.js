import { fetchJson } from '../utils/signal-fetch.js'

export const name = 'quote'
export const timeout = 5000

export async function collect(_profile, { signal } = {}) {
  // The old form destructured `[{ q, a }]` straight out of the response, so an
  // empty array or an error object surfaced as a TypeError and the recorded
  // reason never named the API.
  const body = await fetchJson('https://zenquotes.io/api/random', {
    signal,
    timeoutMs: timeout,
    source: 'zenquotes.io',
    expect: (v) => Array.isArray(v) && typeof v[0]?.q === 'string',
  })
  const [{ q: text, a: author }] = body
  return {
    data: { text, author },
    meta: { source: 'zenquotes.io', items: 1 },
  }
}
