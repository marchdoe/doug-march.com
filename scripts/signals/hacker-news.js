import { fetchJson } from '../utils/signal-fetch.js'

export const name = 'hacker_news'
export const timeout = 10000

// The provider budget above covers two sequential rounds (top stories, then
// items) — each request gets less than half, or round one exhausts it (#344).
export const REQUEST_TIMEOUT_MS = 4000

const SOURCE = 'hacker-news.firebaseio.com'

export async function collect(_profile, { signal } = {}) {
  const ids = await fetchJson('https://hacker-news.firebaseio.com/v0/topstories.json', {
    signal,
    timeoutMs: REQUEST_TIMEOUT_MS,
    source: SOURCE,
    expect: (v) => Array.isArray(v) && v.length > 0,
  })

  const stories = await Promise.all(
    ids.slice(0, 5).map(async (id) => {
      const item = await fetchJson(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, {
        signal,
        timeoutMs: REQUEST_TIMEOUT_MS,
        source: `${SOURCE} item/${id}`,
        expect: (v) => v && typeof v === 'object',
      })
      return { title: item.title, url: item.url, score: item.score, by: item.by }
    })
  )

  return {
    data: { stories },
    // Counted, not hardcoded to 5. `items` is what today.meta.yml reports as
    // the size of the read; a literal cannot notice a short response.
    meta: { source: SOURCE, items: stories.length },
  }
}
