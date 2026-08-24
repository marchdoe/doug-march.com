// app/types/archive-record.ts
// The shape of archive/{date}/record.json, decided on issue #153 and written by
// scripts/utils/archive-record.js. Blocks lifted from a build's own artifacts
// keep their native snake_case; fields this project authors are camelCase.

/** Anything that survives a JSON round-trip. Server functions validate that
 * every field they return is serializable, so lifted blocks are typed as data
 * rather than as `unknown`. */
export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue }

export interface ArchiveTokens {
  colors: {
    /** Raw scales: `{ orange: { 500: '#F05428' } }` */
    ramps: Record<string, Record<string, string>>
    /** Semantic colours, whose values are condition maps: `{ base, _light }` */
    semantic: Record<string, Record<string, string> | string>
  }
  /** Every other token group the preset carried — varies by era. */
  [group: string]: JsonValue | ArchiveTokens['colors']
}

export interface ArchiveCost {
  total_usd: number | null
  estimated: boolean
  partial: boolean
  calls: number
  retries: number
  byAgent: JsonValue[]
}

export interface ArchiveRecord {
  date: string
  /** Stratum the build belongs to: prose → logged → traced → … → grammar. */
  era: string | null
  generatedAt: string
  buildId: string | null
  /** How many builds that day took. Nine dates needed more than one. */
  attempts: number

  brief: string | null
  rationale: string | null
  filesChanged: string[]
  /** One of the eight names the site was built on until 2026-08-23. */
  legacyArchetype: string | null

  signals: Record<string, JsonValue> | null
  hero: { copy: string | null; rationale: string | null; source: string | null }
  chassis: string | null
  /** The Art Director's brief, keyed by section. Keys differ by era. */
  adBrief: Record<string, string> | null
  tokens: ArchiveTokens | null

  colorScheme: Record<string, JsonValue> | null
  shell: Record<string, JsonValue> | null
  verdicts: JsonValue[] | null
  composition: Record<string, JsonValue> | null
  lane: Record<string, JsonValue> | null
  cost: ArchiveCost | null
}

/** One entry of `public/archive-data/index.json`. */
export interface ArchiveIndexEntry {
  date: string
  era: string | null
  brief: string | null
  legacyArchetype: string | null
  chassis: string | null
  buildId: string | null
  attempts: number
  moodWord: string | null
  primaryHue: { h: number; s: number; l: number; name?: string } | null
  hasScreenshot: boolean
  cost: { totalUsd: number | null; estimated: boolean; retries: number } | null
  rating: { grade: string; worked: string; didnt: string; try: string } | null
}
