export const name = 'books'
export const timeout = 1000

export async function collect(profile) {
  const books = profile?.books?.currently_reading ?? []
  return {
    data: { currently_reading: books },
    meta: { source: 'profile', items: books.length },
  }
}
