export const name = 'quote'
export const timeout = 5000

export async function collect(_profile) {
  const res = await fetch('https://zenquotes.io/api/random')
  if (!res.ok) throw new Error(`zenquotes.io responded with ${res.status}`)
  const [{ q: text, a: author }] = await res.json()
  return {
    data: { text, author },
    meta: { source: 'zenquotes.io', items: 1 },
  }
}
