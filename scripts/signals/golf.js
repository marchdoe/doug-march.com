export const name = 'golf'
export const timeout = 10000

export async function collect(_profile) {
  const url = 'https://site.api.espn.com/apis/site/v2/sports/golf/pga/scoreboard'
  const res = await fetch(url)
  if (!res.ok) throw new Error(`ESPN golf error: ${res.status}`)

  const json = await res.json()
  const events = json.events || []

  if (events.length === 0) {
    return {
      data: { tournament: null, status: 'no active tournament', leaders: [] },
      meta: { source: 'espn', items: 0 },
    }
  }

  const event = events[0]
  const tournament = event.name || null
  const status = event.status?.type?.description || 'Unknown'
  const competitors = event.competitions?.[0]?.competitors || []

  const leaders = competitors.slice(0, 5).map((c) => ({
    name: c.athlete?.displayName || 'Unknown',
    position: c.status?.position?.displayName || '-',
    score: c.score?.displayValue || 'E',
  }))

  return {
    data: { tournament, status, leaders },
    meta: { source: 'espn', items: leaders.length },
  }
}
