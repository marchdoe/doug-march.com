export const name = 'awwwards'
export const timeout = 10000

const URL = 'https://www.awwwards.com/websites/sites-of-the-day/'

export async function collect() {
  const res = await fetch(URL, {
    signal: AbortSignal.timeout(8000),
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    },
  })

  if (!res.ok) throw new Error(`awwwards.com error: ${res.status}`)

  const html = await res.text()

  // Extract site names — fragile HTML scraping, best-effort
  const entries = []
  let match

  // Primary: figure-rollover links have aria-label set to the site name
  const ariaPattern = /class="figure-rollover__link"[^>]*aria-label="([^"]+)"/gi
  while ((match = ariaPattern.exec(html)) !== null) {
    const title = match[1].trim()
    if (title && !entries.includes(title)) entries.push(title)
  }

  // Also try reversed attribute order
  if (entries.length === 0) {
    const ariaPattern2 = /aria-label="([^"]+)"[^>]*class="figure-rollover__link"/gi
    while ((match = ariaPattern2.exec(html)) !== null) {
      const title = match[1].trim()
      if (title && !entries.includes(title)) entries.push(title)
    }
  }

  // Fallback: any anchor with aria-label inside a figure-rollover block
  if (entries.length === 0) {
    const figureBlocks = html.match(/<figure class="figure-rollover"[\s\S]*?<\/figure>/gi) || []
    for (const block of figureBlocks) {
      const labelMatch = /aria-label="([^"]+)"/.exec(block)
      if (labelMatch) {
        const title = labelMatch[1].trim()
        if (title && !entries.includes(title)) entries.push(title)
      }
    }
  }

  if (entries.length === 0) {
    return {
      data: { note: 'Awwwards checked but could not parse SOTD entries' },
      meta: { source: URL, items: 0 },
    }
  }

  return {
    data: {
      sites_of_the_day: entries.slice(0, 10),
    },
    meta: {
      source: URL,
      items: entries.length,
    },
  }
}
