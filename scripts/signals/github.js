export const name = 'github'
export const timeout = 10000

export function parseHTML(html) {
  const repos = []
  const articleRe = /<article class="Box-row"[\s\S]*?<\/article>/g
  const articles = html.match(articleRe) ?? []

  for (const article of articles) {
    // Repo name from href="/org/repo"
    const hrefMatch = article.match(/<a\s+href="\/([^"]+\/[^"]+)"/)
    if (!hrefMatch) continue
    const repoName = hrefMatch[1].trim()

    // Description
    const descMatch = article.match(/<p class="col-9 color-fg-muted my-1 pr-4"[^>]*>([\s\S]*?)<\/p>/)
    const description = descMatch ? descMatch[1].trim() : ''

    // Language
    const langMatch = article.match(/<span itemprop="programmingLanguage">([\s\S]*?)<\/span>/)
    const language = langMatch ? langMatch[1].trim() : null

    // Stars — the stargazers link contains the count
    const starsMatch = article.match(/href="\/[^"]+\/stargazers"[^>]*>\s*([\d,]+)\s*<\/a>/)
    const stars = starsMatch ? starsMatch[1].replace(/,/g, '').trim() : null

    repos.push({ name: repoName, description, language, stars })

    if (repos.length >= 5) break
  }

  return repos
}

export async function collect(_profile) {
  const res = await fetch('https://github.com/trending', {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; doug-march-signals/1.0)' },
  })
  if (!res.ok) throw new Error(`github.com/trending responded with ${res.status}`)
  const html = await res.text()
  const repos = parseHTML(html)
  return {
    data: { repos },
    meta: { source: 'github.com/trending', items: 5 },
  }
}
