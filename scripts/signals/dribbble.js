export const name = 'dribbble'
export const timeout = 10000

const RSS_URL = 'https://dribbble.com/shots/popular.rss'

function parseRssItems(xml) {
  const items = []
  const itemRegex = /<item>([\s\S]*?)<\/item>/g
  let match

  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1]

    const title = (/<title><!\[CDATA\[(.*?)\]\]><\/title>/.exec(block) ||
                   /<title>(.*?)<\/title>/.exec(block) || [])[1]?.trim()

    const link = (/<link>(.*?)<\/link>/.exec(block) ||
                  /<guid[^>]*>(.*?)<\/guid>/.exec(block) || [])[1]?.trim()

    const creator = (/<dc:creator><!\[CDATA\[(.*?)\]\]><\/dc:creator>/.exec(block) ||
                     /<dc:creator>(.*?)<\/dc:creator>/.exec(block) || [])[1]?.trim()

    if (title && link) {
      items.push({ title, link, creator: creator ?? null })
    }
  }

  return items
}

export async function collect(_profile) {
  const res = await fetch(RSS_URL, {
    signal: AbortSignal.timeout(8000),
    headers: {
      'User-Agent': 'doug-march-signals/1.0 (https://doug-march.com)',
      Accept: 'application/rss+xml, application/xml, text/xml',
    },
  })

  // Dribbble serves a WAF JS-challenge (202 + empty body) to non-browser clients.
  // Treat any non-200 status as a failure so the collector skips this provider.
  if (!res.ok) throw new Error(`Dribbble RSS responded with ${res.status}`)

  const contentType = res.headers.get('content-type') ?? ''
  const xml = await res.text()

  // If we got an HTML page instead of XML the WAF intercepted the request.
  if (!xml.trim().startsWith('<') || contentType.includes('text/html')) {
    throw new Error('Dribbble RSS returned non-XML content (WAF challenge or redirect)')
  }

  const all = parseRssItems(xml)
  if (all.length === 0) throw new Error('Dribbble RSS parsed zero items — feed structure may have changed')
  const trending = all.slice(0, 7)

  return {
    data: { trending },
    meta: { source: RSS_URL, items: trending.length },
  }
}
