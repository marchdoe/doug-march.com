/**
 * Product Hunt — top three ranked launches.
 *
 * The provider used to read a long-lived developer token out of
 * `PRODUCT_HUNT_TOKEN`. Those tokens expire, and when this one did the
 * collector returned 401 on every run for weeks (#247). Client credentials do
 * not expire, so the token is minted per run from an app's id and secret and
 * the failure mode goes away rather than being reset by hand every few months.
 * The `client_credentials` grant carries `public` scope, which is all the
 * `posts` query needs.
 */
import { fetchJson } from '../utils/signal-fetch.js'

export const name = 'product_hunt'
// Two round trips now — the token exchange and the query.
export const timeout = 10000
export const requiresApiKey = ['PRODUCT_HUNT_CLIENT_ID', 'PRODUCT_HUNT_CLIENT_SECRET']

const TOKEN_URL = 'https://api.producthunt.com/v2/oauth/token'
const API_URL = 'https://api.producthunt.com/v2/api/graphql'

const QUERY =
  '{ posts(order: RANKING, first: 3) { edges { node { name tagline votesCount url } } } }'

async function mintAccessToken({ signal }) {
  const json = await fetchJson(TOKEN_URL, {
    signal,
    timeoutMs: 5000,
    source: 'producthunt.com token exchange',
    method: 'POST',
    headers: { 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({
      client_id: process.env.PRODUCT_HUNT_CLIENT_ID,
      client_secret: process.env.PRODUCT_HUNT_CLIENT_SECRET,
      grant_type: 'client_credentials',
    }),
    expect: (v) => typeof v?.access_token === 'string',
  })
  return json.access_token
}

export async function collect(_profile, { signal } = {}) {
  const token = await mintAccessToken({ signal })

  // GraphQL answers errors with HTTP 200 and an `errors` array, so
  // `json.data.posts.edges` threw a TypeError and the recorded reason never
  // said Product Hunt. The shape check makes the failure name its source.
  const json = await fetchJson(API_URL, {
    signal,
    timeoutMs: 5000,
    source: 'producthunt.com',
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query: QUERY }),
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
