/**
 * Deterministic string hashing — turns a string (typically a date, or a
 * date+archetype key) into a reproducible integer with no I/O and no
 * randomness. Same input always produces the same output, which is the
 * whole point: it lets the pipeline vary a choice day-to-day (which seed
 * lane to use, how much creative risk to take) while staying reproducible
 * for a given date — re-running the same day's build picks the same lane,
 * the same risk level, deterministically.
 *
 * Algorithm: FNV-1a (32-bit). Not cryptographic — just a cheap, well-
 * distributed, dependency-free hash suitable for "pick one of N options."
 */

const FNV_OFFSET_BASIS = 0x811c9dc5
const FNV_PRIME = 0x01000193

/**
 * Hash a string to a non-negative 32-bit integer.
 * @param {string} str
 * @returns {number}
 */
export function hashString(str) {
  let hash = FNV_OFFSET_BASIS
  const s = String(str)
  for (let i = 0; i < s.length; i++) {
    hash ^= s.charCodeAt(i)
    hash = Math.imul(hash, FNV_PRIME)
  }
  return hash >>> 0
}

/**
 * Deterministically map a string to an integer in [min, max] inclusive.
 * @param {string} str
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function hashToRange(str, min, max) {
  if (max < min) throw new Error(`hashToRange: max (${max}) < min (${min})`)
  const span = max - min + 1
  return min + (hashString(str) % span)
}
