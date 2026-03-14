export const name = 'weather'
export const timeout = 5000

export async function collect(profile) {
  const key = process.env.WEATHER_API_KEY
  if (!key) throw new Error('WEATHER_API_KEY not set')

  const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${profile.location.zip}&aqi=yes`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`weatherapi.com error: ${res.status}`)

  const json = await res.json()
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
    meta: {
      source: 'weatherapi.com',
      items: 1,
    },
  }
}
