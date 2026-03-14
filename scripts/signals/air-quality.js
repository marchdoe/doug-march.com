export const name = 'air_quality'
export const timeout = 5000

const AQI_LABELS = {
  1: 'Good',
  2: 'Moderate',
  3: 'Unhealthy for sensitive',
  4: 'Unhealthy',
  5: 'Very unhealthy',
  6: 'Hazardous',
}

export async function collect(profile) {
  const key = process.env.WEATHER_API_KEY
  if (!key) throw new Error('WEATHER_API_KEY not set')

  const url = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${profile.location.zip}&days=1&aqi=yes`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`weatherapi.com error: ${res.status}`)

  const json = await res.json()
  const aqi_index = json.current.air_quality['us-epa-index']
  const uv_index = json.current.uv

  return {
    data: {
      aqi_index,
      uv_index,
      air_quality_label: AQI_LABELS[aqi_index] ?? 'Unknown',
    },
    meta: {
      source: 'weatherapi.com',
      items: 1,
    },
  }
}
