import { fetchJson } from '../utils/signal-fetch.js'

export const name = 'air_quality'
export const timeout = 5000
export const requiresApiKey = 'WEATHER_API_KEY'

const AQI_LABELS = {
  1: 'Good',
  2: 'Moderate',
  3: 'Unhealthy for sensitive',
  4: 'Unhealthy',
  5: 'Very unhealthy',
  6: 'Hazardous',
}

export async function collect(profile, { signal } = {}) {
  const key = process.env.WEATHER_API_KEY
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${profile.location.zip}&days=1&aqi=yes`
  const json = await fetchJson(url, {
    signal,
    timeoutMs: timeout,
    source: 'weatherapi.com',
    expect: (v) => v?.current?.air_quality,
  })

  const aqi_index = json.current.air_quality['us-epa-index']
  const uv_index = json.current.uv

  return {
    data: {
      aqi_index,
      uv_index,
      air_quality_label: AQI_LABELS[aqi_index] ?? 'Unknown',
    },
    meta: { source: 'weatherapi.com', items: 1 },
  }
}
