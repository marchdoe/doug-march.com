/**
 * Build the OG/twitter meta entries injected into the {{OG_META}}
 * placeholder of scripts/templates/__root.tsx.template. Returns TSX
 * source — object literals joined by newlines, each ending in a comma —
 * shaped for TanStack's head() meta array.
 */
export function buildOgMetaEntries({
  date,
  heroCopy,
  designBrief,
  siteUrl = 'https://doug-march.com',
}) {
  const title = JSON.stringify(heroCopy || 'Doug March')
  const description = JSON.stringify(
    designBrief || 'A multi-agent pipeline redesigns this site every morning.'
  )
  const image = JSON.stringify(`${siteUrl}/og/${date}.png`)
  const url = JSON.stringify(siteUrl)
  return [
    `{ property: 'og:title', content: ${title} },`,
    `{ property: 'og:description', content: ${description} },`,
    `{ property: 'og:image', content: ${image} },`,
    `{ property: 'og:image:width', content: '1200' },`,
    `{ property: 'og:image:height', content: '630' },`,
    `{ property: 'og:url', content: ${url} },`,
    `{ property: 'og:type', content: 'website' },`,
    `{ name: 'twitter:card', content: 'summary_large_image' },`,
    `{ name: 'twitter:title', content: ${title} },`,
    `{ name: 'twitter:image', content: ${image} },`,
  ].join('\n        ')
}
