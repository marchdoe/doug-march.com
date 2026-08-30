import { fetchJson } from '../utils/signal-fetch.js'

export const name = 'market'
export const timeout = 5000
export const requiresApiKey = 'ALPHA_VANTAGE_API_KEY'

export async function collect(_profile, { signal } = {}) {
  const key = process.env.ALPHA_VANTAGE_API_KEY
  const json = await fetchJson(
    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=SPY&apikey=${key}`,
    { signal, timeoutMs: timeout, source: 'Alpha Vantage' }
  )

  const quote = json['Global Quote']
  if (!quote?.['05. price']) {
    throw new Error('Alpha Vantage returned no quote data (rate limit or market closed)')
  }
  const price = quote['05. price']
  const change = quote['09. change']
  const change_percent = quote['10. change percent']

  const changeNum = parseFloat(change)
  const direction = changeNum > 0 ? 'up' : changeNum < 0 ? 'down' : 'flat'

  return {
    data: { symbol: 'SPY', price, change, change_percent, direction },
    meta: { source: 'alphavantage.co', items: 1 },
  }
}
