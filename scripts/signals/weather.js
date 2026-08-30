import { fetchJson } from '../utils/signal-fetch.js'

export const name = 'weather'
export const timeout = 5000
// collect-signals.js skips a provider whose requiresApiKey env var is unset,
// so the in-collector `if (!key) throw` this used to carry was unreachable.
export const requiresApiKey = 'WEATHER_API_KEY'

export async function collect(profile, { signal } = {}) {
  const key = process.env.WEATHER_API_KEY
  const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${profile.location.zip}&aqi=yes`
  const json = await fetchJson(url, {
    signal,
    timeoutMs: timeout,
    source: 'weatherapi.com',
    expect: (v) => v?.current?.condition && v?.location,
  })
  const { location, current } = json

  return {
    data: {
      location: `${location.name}, ${location.region}`,
      conditions: current.condition.text,
      temp_f: current.temp_f,
      temp_c: current.temp_c,
      humidity: current.humidity,
      wind_mph: current.wind_mph,
      wind_dir: current.wind_dir,
      feels_like_f: current.feelslike_f,
    },
    meta: { source: 'weatherapi.com', items: 1 },
  }
}
