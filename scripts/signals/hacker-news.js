export const name = 'hacker_news'
export const timeout = 10000

export async function collect(_profile) {
  const topRes = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
  if (!topRes.ok) throw new Error(`HN topstories responded with ${topRes.status}`)
  const ids = await topRes.json()

  const top5 = ids.slice(0, 5)
  const stories = await Promise.all(
    top5.map(async (id) => {
      const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      if (!res.ok) throw new Error(`HN item/${id} responded with ${res.status}`)
      const item = await res.json()
      return { title: item.title, url: item.url, score: item.score, by: item.by }
    }),
  )

  return {
    data: { stories },
    meta: { source: 'hacker-news.firebaseio.com', items: 5 },
  }
}
