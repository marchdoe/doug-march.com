import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { collect, name } from '../../scripts/signals/sidebar.js'

const item = (title, link, description) =>
  `<item><title><![CDATA[${title}]]></title>` +
  `<description><![CDATA[${description}]]></description>` +
  `<link>${link}</link><guid isPermaLink="false">abc123</guid></item>`

const feed = (...items) =>
  `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel>${items.join('')}</channel></rss>`

const ok = (body) => ({ ok: true, status: 200, text: async () => body })

describe('sidebar provider', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns title, url, host and a plain-text description', async () => {
    fetch.mockResolvedValueOnce(
      ok(
        feed(
          item('Ordinary abundance', 'https://ordinaryabundance.com/', '<p>A walk &amp; a look</p>')
        )
      )
    )

    const result = await collect()
    expect(name).toBe('sidebar')
    expect(result.data.links).toEqual([
      {
        title: 'Ordinary abundance',
        url: 'https://ordinaryabundance.com/',
        source: 'ordinaryabundance.com',
        description: 'A walk & a look',
      },
    ])
    expect(result.meta).toEqual({ source: 'https://sidebar.io/feed.xml', items: 1 })
  })

  it('drops the sponsored slot, which is the only shortened link', async () => {
    fetch.mockResolvedValueOnce(
      ok(
        feed(
          item('Gridset: on-brand documents', 'https://bit.ly/side-grid1', '<p>An ad</p>'),
          item(
            'We used to log off',
            'https://www.doc.cc/articles/we-used-to-log-off',
            '<p>Real</p>'
          )
        )
      )
    )

    const links = (await collect()).data.links
    expect(links).toHaveLength(1)
    expect(links[0].source).toBe('doc.cc')
  })

  it('caps at five links even though the feed carries twenty', async () => {
    const many = Array.from({ length: 20 }, (_, i) =>
      item(`Link ${i}`, `https://example.com/${i}`, '<p>x</p>')
    )
    fetch.mockResolvedValueOnce(ok(feed(...many)))

    expect((await collect()).data.links).toHaveLength(5)
  })

  it('fails by name when the feed answers with something other than XML', async () => {
    fetch.mockResolvedValueOnce(ok('<!DOCTYPE html><html>challenge</html>'))
    await expect(collect()).rejects.toThrow('parsed zero items')

    fetch.mockResolvedValueOnce(ok('just words'))
    await expect(collect()).rejects.toThrow('not XML')
  })

  it('fails by name on a non-200', async () => {
    fetch.mockResolvedValueOnce({ ok: false, status: 503, text: async () => '' })
    await expect(collect()).rejects.toThrow('sidebar.io responded with 503')
  })
})
