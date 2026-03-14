export const name = 'sports'
export const timeout = 10000

const LEAGUE_TO_SPORT = {
  NFL: 'football',
  NHL: 'hockey',
  NBA: 'basketball',
  MLB: 'baseball',
}

async function fetchTeamResult(team) {
  const sport = LEAGUE_TO_SPORT[team.league.toUpperCase()]
  if (!sport) {
    return { name: team.name, league: team.league, last_game: null, result: 'unknown league', score: null }
  }

  const league = team.league.toLowerCase()
  const url = `https://site.api.espn.com/apis/site/v2/sports/${sport}/${league}/scoreboard`

  const res = await fetch(url)
  if (!res.ok) throw new Error(`ESPN API error: ${res.status}`)

  const json = await res.json()
  const events = json.events ?? []

  // Find the most recent event involving this team
  for (const event of events) {
    const competition = event.competitions?.[0]
    if (!competition) continue

    const competitors = competition.competitors ?? []
    const match = competitors.find(
      c => c.team?.displayName?.toLowerCase() === team.name.toLowerCase()
    )

    if (!match) continue

    const completed = competition.status?.type?.completed ?? false
    if (!completed) continue

    const opponent = competitors.find(c => c !== match)
    const teamScore = match.score
    const opponentScore = opponent?.score ?? '?'
    const result = match.winner ? 'win' : 'loss'
    const score = `${teamScore}-${opponentScore}`
    const last_game = event.date ?? null

    return { name: team.name, league: team.league, last_game, result, score }
  }

  // No recent completed game found
  return { name: team.name, league: team.league, last_game: null, result: 'off season', score: null }
}

export async function collect(profile) {
  const teams = profile?.sports?.teams ?? []

  const results = await Promise.all(
    teams.map(async team => {
      try {
        return await fetchTeamResult(team)
      } catch {
        return { name: team.name, league: team.league, last_game: null, result: 'error', score: null }
      }
    })
  )

  return {
    data: { teams: results },
    meta: { source: 'espn', items: results.length },
  }
}
