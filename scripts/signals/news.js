export const name = 'news'
export const timeout = 5000
export const requiresApiKey = 'NEWS_API_KEY'

export function filterHeadlines(headlines, disallow) {
  const keywords = disallow.map(k => k.toLowerCase())
  return headlines.filter(article => {
    const title = article.title?.toLowerCase() ?? ''
    return !keywords.some(keyword => title.includes(keyword))
  })
}

export async function collect(profile) {
  const key = process.env.NEWS_API_KEY
  if (!key) throw new Error('NEWS_API_KEY not set')

  const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${key}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`newsapi.org error: ${res.status}`)

  const json = await res.json()
  const articles = json.articles ?? []
  const disallow = profile?.news?.disallow ?? []

  const filtered = filterHeadlines(articles, disallow)
  const top5 = filtered.slice(0, 5).map(a => ({
    title: a.title,
    source: a.source?.name,
    url: a.url,
  }))

  return {
    data: {
      headlines: top5,
    },
    meta: {
      source: 'newsapi.org',
      items: top5.length,
      filtered: articles.length - filtered.length,
    },
  }
}
