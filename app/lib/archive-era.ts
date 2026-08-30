/**
 * What the pipeline could and could not do on a given day — #159.
 *
 * Coverage here is stratigraphic: each artifact starts on a date and runs
 * unbroken from there. So a missing field has two very different meanings, and
 * the explainer has to tell them apart. "No composition tuple" is a bug report;
 * "the pipeline had no such concept in the prose era" is a fact about March.
 *
 * The table mirrors ERAS in scripts/utils/archive-record.js, which is what
 * stamps `record.era` in the first place.
 */

export const ERA_ORDER = [
  'prose',
  'logged',
  'traced',
  'color-directed',
  'shell-directed',
  'grammar',
] as const

export type Era = (typeof ERA_ORDER)[number]

export const ERA_LABELS: Record<Era, string> = {
  prose: 'prose',
  logged: 'logged',
  traced: 'traced',
  'color-directed': 'color-directed',
  'shell-directed': 'shell-directed',
  grammar: 'grammar',
}

/** The era each part of the record first appeared in. */
export const FIELD_ERA = {
  brief: 'prose',
  legacyArchetype: 'prose',
  buildId: 'logged',
  attempts: 'logged',
  signals: 'traced',
  tokens: 'traced',
  adBrief: 'traced',
  chassis: 'traced',
  colorScheme: 'color-directed',
  shell: 'shell-directed',
  verdicts: 'shell-directed',
  composition: 'grammar',
  lane: 'grammar',
  cost: 'grammar',
} as const

export type RecordField = keyof typeof FIELD_ERA

const rank = (era: string | null): number => {
  const i = ERA_ORDER.indexOf(era as Era)
  return i === -1 ? ERA_ORDER.length : i
}

/** True when the day predates the concept entirely. */
export function predates(field: RecordField, era: string | null): boolean {
  return rank(era) < rank(FIELD_ERA[field])
}

/**
 * Why a field is missing, in a sentence.
 *
 * Two cases, and the difference matters: the pipeline could not have produced
 * it, or it could have and did not.
 */
export function absenceNote(field: RecordField, era: string | null, noun: string): string {
  if (predates(field, era)) {
    const label = ERA_LABELS[(era ?? 'prose') as Era] ?? era ?? 'earliest'
    return `No ${noun}. The pipeline had no such concept in the ${label} era.`
  }
  return `No ${noun} was recorded that day.`
}
