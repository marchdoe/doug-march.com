export const name = 'awwwards'
export const timeout = 30000

const LISTING_URL = 'https://www.awwwards.com/websites/sites-of-the-day/'
const BASE_URL = 'https://www.awwwards.com'
const MAX_SITES = 3

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
}

/**
 * Extract slugs from the SOTD listing page.
 * Looks for links like /sites/some-slug within figure-rollover blocks.
 */
function extractSlugs(html) {
  const slugs = []
  // Match href="/sites/slug" patterns — these are the individual SOTD links
  const pattern = /href="\/sites\/([a-z0-9][a-z0-9\-]*)"/gi
  let match
  while ((match = pattern.exec(html)) !== null) {
    const slug = match[1]
    if (!slugs.includes(slug)) slugs.push(slug)
    if (slugs.length >= MAX_SITES) break
  }
  return slugs
}

/**
 * Decode common HTML entities in extracted text.
 */
function decodeEntities(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&ndash;/g, '–')
    .replace(/&mdash;/g, '—')
}

/**
 * Clean up an og:title — decode entities and strip Awwwards suffixes.
 */
function cleanTitle(raw) {
  if (!raw) return null
  let title = decodeEntities(raw)
  title = title.replace(/\s*[-–—]\s*Awwwards\s*(Nominee|SOTD|Winner|Honorable Mention)?\s*$/i, '')
  return title.trim() || null
}

/**
 * Extract Open Graph meta tags from an individual SOTD page.
 */
function extractOgMeta(html) {
  const get = (property) => {
    // Match both property="og:X" and name="og:X" attribute orders
    const patterns = [
      new RegExp(`<meta[^>]*property=["']${property}["'][^>]*content=["']([^"']*)["']`, 'i'),
      new RegExp(`<meta[^>]*content=["']([^"']*?)["'][^>]*property=["']${property}["']`, 'i'),
    ]
    for (const pat of patterns) {
      const m = pat.exec(html)
      if (m?.[1]) return m[1].trim()
    }
    return null
  }

  return {
    title: cleanTitle(get('og:title')),
    description: get('og:description') ? decodeEntities(get('og:description')) : null,
    screenshot_url: get('og:image'),
  }
}

/**
 * Fetch the og:image bytes and return base64 + media type. Returns null on
 * failure so the caller can fall back to URL-only or text-only references.
 *
 * Per Spec 01: we download once at signal-collection time so downstream
 * agents (interpret-signals via API) get deterministic image content blocks
 * without re-fetching during every Claude call. Failures here are
 * non-blocking — the run continues with whatever screenshots succeeded.
 */
async function fetchScreenshotBytes(url) {
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(8000),
      headers: { 'User-Agent': HEADERS['User-Agent'] },
    })
    if (!res.ok) return null
    const contentType = res.headers.get('content-type') || ''
    // Anthropic accepts image/jpeg, image/png, image/gif, image/webp.
    // og:image is typically jpeg/png from awwwards.
    let mediaType = 'image/jpeg'
    if (contentType.includes('png')) mediaType = 'image/png'
    else if (contentType.includes('webp')) mediaType = 'image/webp'
    else if (contentType.includes('gif')) mediaType = 'image/gif'
    const buf = Buffer.from(await res.arrayBuffer())
    // Sanity guard — Anthropic per-image cap is 5MB
    if (buf.length > 5 * 1024 * 1024) return null
    return { data: buf.toString('base64'), media_type: mediaType }
  } catch {
    return null
  }
}

/**
 * Fetch a single SOTD page and extract metadata.
 * Returns null on failure (timeout, non-200, missing data).
 */
async function fetchSitePage(slug) {
  const url = `${BASE_URL}/sites/${slug}`
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(5000),
      headers: HEADERS,
    })
    if (!res.ok) return null

    const html = await res.text()
    const meta = extractOgMeta(html)

    // Screenshot URL is the key artifact — skip if missing
    if (!meta.screenshot_url) return null

    // Download the screenshot bytes for downstream API image-block use.
    // Failure here is non-blocking — the site object still ships with
    // url/title/description; the API path falls back to text references.
    const bytes = await fetchScreenshotBytes(meta.screenshot_url)

    return {
      title: meta.title || slug,
      description: meta.description || '',
      screenshot_url: meta.screenshot_url,
      ...(bytes ? {
        screenshot_b64: bytes.data,
        screenshot_media_type: bytes.media_type,
      } : {}),
    }
  } catch {
    return null
  }
}

export async function collect() {
  // Step 1: Fetch listing page to get slugs
  const listingRes = await fetch(LISTING_URL, {
    signal: AbortSignal.timeout(8000),
    headers: HEADERS,
  })

  if (!listingRes.ok) throw new Error(`awwwards.com error: ${listingRes.status}`)

  const listingHtml = await listingRes.text()
  const slugs = extractSlugs(listingHtml)

  if (slugs.length === 0) {
    return {
      data: { note: 'Awwwards checked but could not parse SOTD entry slugs' },
      meta: { source: LISTING_URL, items: 0 },
    }
  }

  // Step 2: Fetch individual pages in parallel
  const results = await Promise.all(slugs.map(fetchSitePage))
  const sites = results.filter(Boolean)

  if (sites.length === 0) {
    return {
      data: { note: 'Awwwards slugs found but could not extract OG metadata from individual pages' },
      meta: { source: LISTING_URL, items: 0 },
    }
  }

  return {
    data: {
      sites_of_the_day: sites,
    },
    meta: {
      source: LISTING_URL,
      items: sites.length,
    },
  }
}
