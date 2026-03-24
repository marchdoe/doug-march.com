export const name = 'product_hunt'
export const timeout = 5000

export async function collect(_profile) {
  const token = process.env.PRODUCT_HUNT_TOKEN
  if (!token) throw new Error('PRODUCT_HUNT_TOKEN not set')

  const res = await fetch('https://api.producthunt.com/v2/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: '{ posts(order: RANKING, first: 3) { edges { node { name tagline votesCount url } } } }',
    }),
  })
  if (!res.ok) throw new Error(`Product Hunt API responded with ${res.status}`)
  const json = await res.json()

  const edges = json.data.posts.edges
  const products = edges.map(({ node }) => ({
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
