import { describe, it, expect, vi } from 'vitest'
import { collect, name, parseHTML } from '../../scripts/signals/github.js'

const MOCK_HTML = `
<article class="Box-row">
  <h2 class="h3 lh-condensed">
    <a href="/vercel/ai">vercel / ai</a>
  </h2>
  <p class="col-9 color-fg-muted my-1 pr-4">Build AI-powered apps</p>
  <div class="f6 color-fg-muted mt-2">
    <span itemprop="programmingLanguage">TypeScript</span>
    <a class="Link--muted d-inline-block mr-3" href="/vercel/ai/stargazers">
      45,000
    </a>
  </div>
</article>
<article class="Box-row">
  <h2 class="h3 lh-condensed">
    <a href="/microsoft/vscode">microsoft / vscode</a>
  </h2>
  <p class="col-9 color-fg-muted my-1 pr-4">Visual Studio Code</p>
  <div class="f6 color-fg-muted mt-2">
    <span itemprop="programmingLanguage">TypeScript</span>
    <a class="Link--muted d-inline-block mr-3" href="/microsoft/vscode/stargazers">
      165,000
    </a>
  </div>
</article>
`

describe('github provider', () => {
  it('exports correct name', () => {
    expect(name).toBe('github')
  })

  it('parses trending HTML correctly', () => {
    const repos = parseHTML(MOCK_HTML)
    expect(repos.length).toBeGreaterThanOrEqual(1)
    expect(repos[0]).toHaveProperty('name')
    expect(repos[0]).toHaveProperty('description')
  })

  it('fetches from GitHub trending', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValueOnce({
        ok: true,
        text: async () => MOCK_HTML,
      })
    )

    const result = await collect({})
    expect(result.data.repos.length).toBeGreaterThanOrEqual(1)
    expect(result.meta.source).toBe('github.com/trending')

    vi.restoreAllMocks()
  })
})

describe('a broken scrape is not an empty day', () => {
  it('throws when the markup no longer matches, rather than reporting no repos', async () => {
    // parseHTML keys on the exact class string `col-9 color-fg-muted my-1 pr-4`.
    // When GitHub changes it, `{ repos: [] }` with status 'ok' made the failure
    // indistinguishable from a quiet day, and the archive page then said
    // "Nothing that day."
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response('<html>redesigned</html>', { status: 200 }))
    )
    await expect(collect({}, {})).rejects.toThrow(/markup selectors have moved/)
    vi.unstubAllGlobals()
  })

  it('counts the repos it found rather than hardcoding five', async () => {
    const article = (n) =>
      `<article class="Box-row"><a href="/org/repo${n}"></a>` +
      `<p class="col-9 color-fg-muted my-1 pr-4">desc</p></article>`
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response(article(1) + article(2), { status: 200 }))
    )
    const result = await collect({}, {})
    expect(result.meta.items).toBe(2)
    expect(result.data.repos).toHaveLength(2)
    vi.unstubAllGlobals()
  })
})
