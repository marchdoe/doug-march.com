/**
 * Sidebar — the five best design links, every weekday.
 *
 * This slot used to be Dribbble's popular-shots RSS. That feed sits behind a
 * JS challenge: a server-side fetch gets 202 with an empty body and no amount
 * of header shaping passes it, so the collector failed on every run since it
 * was written and never once returned data (#247). Sidebar publishes the same
 * kind of signal — hand-picked design work and writing — over a feed that
 * answers a plain GET.
 */
import { signalFetch } from '../utils/signal-fetch.js'

export const name = 'sidebar'
export const timeout = 10000

const RSS_URL = 'https://sidebar.io/feed.xml'
const MAX_LINKS = 5

/** Pull the first capture of whichever pattern matches, CDATA or bare. */
function field(block, tag) {
  const cdata = new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`).exec(block)
  const plain = new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`).exec(block)
  return (cdata?.[1] ?? plain?.[1])?.trim() || null
}

/** Feed descriptions are HTML fragments; the prompt wants a sentence. */
function toText(html) {
  if (!html) return null
  return (
    html
      .replace(/<[^>]*>/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#0?39;|&#x27;/g, "'")
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim() || null
  )
}

function hostOf(url) {
  try {
    return new URL(url).host.replace(/^www\./, '')
  } catch {
    return null
  }
}

function parseItems(xml) {
  const items = []
  for (const match of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
    const block = match[1]
    const title = field(block, 'title')
    const url = field(block, 'link') ?? field(block, 'guid')
    if (!title || !url) continue
    items.push({
      title,
      url,
      source: hostOf(url),
      description: toText(field(block, 'description')),
    })
  }
  return items
}

export async function collect(_profile, { signal } = {}) {
  const res = await signalFetch(RSS_URL, {
    signal,
    timeoutMs: 8000,
    headers: { accept: 'application/rss+xml, application/xml, text/xml' },
  })

  if (!res.ok) throw new Error(`sidebar.io responded with ${res.status}`)

  const xml = await res.text()
  if (!xml.trim().startsWith('<')) {
    throw new Error('sidebar.io returned a body that is not XML')
  }

  const all = parseItems(xml)
  if (all.length === 0) {
    throw new Error('sidebar.io parsed zero items — the feed structure has moved')
  }

  // Sidebar's paid slot is the only entry that points at a shortener; every
  // editorial link goes straight to the source. Dropping it keeps an ad out
  // of the art-direction prompt.
  const editorial = all.filter((item) => hostOf(item.url) !== 'bit.ly')
  const links = (editorial.length > 0 ? editorial : all).slice(0, MAX_LINKS)

  return {
    data: { links },
    meta: { source: RSS_URL, items: links.length },
  }
}
