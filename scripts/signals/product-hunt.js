import { fetchJson } from '../utils/signal-fetch.js'

export const name = 'product_hunt'
export const timeout = 5000
export const requiresApiKey = 'PRODUCT_HUNT_TOKEN'

export async function collect(_profile, { signal } = {}) {
  const token = process.env.PRODUCT_HUNT_TOKEN
  // GraphQL answers errors with HTTP 200 and an `errors` array, so
  // `json.data.posts.edges` threw a TypeError and the recorded reason never
  // said Product Hunt. The shape check makes the failure name its source.
  const json = await fetchJson('https://api.producthunt.com/v2/api/graphql', {
    signal,
    timeoutMs: timeout,
    source: 'producthunt.com',
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query:
        '{ posts(order: RANKING, first: 3) { edges { node { name tagline votesCount url } } } }',
    }),
    expect: (v) => Array.isArray(v?.data?.posts?.edges),
  })

  const products = json.data.posts.edges.map(({ node }) => ({
    name: node.name,
    tagline: node.tagline,
    votes: node.votesCount,
    url: node.url,
  }))

  return {
    data: { products },
    meta: { source: 'producthunt.com', items: products.length },
  }
}
