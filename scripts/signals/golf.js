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
  const statusDescription = event.status?.type?.description || 'Unknown'
  const statusState = event.status?.type?.state || 'pre'

  // Don't return fake leaders before play has started — competitors are just
  // field-entry order at this stage, all showing E (even par).
  if (statusState === 'pre') {
    return {
      data: { tournament, status: statusDescription, leaders: [] },
      meta: { source: 'espn', items: 0 },
    }
  }

  const competitors = event.competitions?.[0]?.competitors || []

  // Sort by ESPN's order field (leaderboard position during/after play),
  // then take the top 5.
  const sorted = [...competitors].sort((a, b) => (a.order ?? 999) - (b.order ?? 999))

  const leaders = sorted.slice(0, 5).map(c => ({
    name: c.athlete?.displayName || 'Unknown',
    position: String(c.order ?? '?'),
    score: typeof c.score === 'string' ? c.score : (c.score?.displayValue || 'E'),
  }))

  return {
    data: { tournament, status: statusDescription, leaders },
    meta: { source: 'espn', items: leaders.length },
  }
}
