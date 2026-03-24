export const name = 'music'
export const timeout = 1000

export async function collect(profile) {
  const bands = profile?.music?.bands ?? []
  if (bands.length === 0) return { data: { bands: [] }, meta: { source: 'profile', items: 0 } }

  // Pick 2-3 random bands
  const count = Math.min(bands.length, Math.random() < 0.5 ? 2 : 3)
  const shuffled = [...bands].sort(() => Math.random() - 0.5)
  const picked = shuffled.slice(0, count)

  return {
    data: { bands: picked },
    meta: { source: 'profile', items: picked.length },
  }
}
