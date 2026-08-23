import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { collect, name } from '../../scripts/signals/awwwards.js'

const listingHtml = `
  <a href="/sites/alpha-studio"></a>
  <a href="/sites/beta-lab"></a>
`

const sitePage = (title, desc, img) => `
  <meta property="og:title" content="${title} - Awwwards SOTD" />
  <meta property="og:description" content="${desc}" />
  <meta property="og:image" content="${img}" />
`

describe('awwwards provider', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns sites with url/title/description but no downloaded image bytes', async () => {
    fetch
      .mockResolvedValueOnce({ ok: true, text: async () => listingHtml })
      .mockResolvedValueOnce({
        ok: true,
        text: async () => sitePage('Alpha Studio', 'A studio', 'https://cdn/a.jpg'),
      })
      .mockResolvedValueOnce({
        ok: true,
        text: async () => sitePage('Beta Lab', 'A lab', 'https://cdn/b.png'),
      })

    const result = await collect()
    expect(name).toBe('awwwards')
    const sites = result.data.sites_of_the_day
    expect(sites).toHaveLength(2)
    expect(sites[0]).toEqual({
      title: 'Alpha Studio',
      description: 'A studio',
      screenshot_url: 'https://cdn/a.jpg',
    })
    // The image bytes are deliberately NOT downloaded/stored — nothing
    // consumes them and the sanitizer would truncate them to garbage.
    for (const s of sites) {
      expect(s).not.toHaveProperty('screenshot_b64')
      expect(s).not.toHaveProperty('screenshot_media_type')
    }
  })

  it('does not fetch image URLs (one call for listing + one per site page only)', async () => {
    fetch
      .mockResolvedValueOnce({ ok: true, text: async () => listingHtml })
      .mockResolvedValueOnce({
        ok: true,
        text: async () => sitePage('Alpha Studio', 'A studio', 'https://cdn/a.jpg'),
      })
      .mockResolvedValueOnce({
        ok: true,
        text: async () => sitePage('Beta Lab', 'A lab', 'https://cdn/b.png'),
      })

    await collect()
    // 1 listing + 2 site pages = 3. No extra fetches for the og:image bytes.
    expect(fetch).toHaveBeenCalledTimes(3)
    const fetchedUrls = fetch.mock.calls.map((c) => c[0])
    expect(fetchedUrls).not.toContain('https://cdn/a.jpg')
    expect(fetchedUrls).not.toContain('https://cdn/b.png')
  })
})
