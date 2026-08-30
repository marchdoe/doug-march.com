/**
 * Format a cautionary lesson from a chosen build's worstFailure.
 */
function formatLesson(b) {
  const f = b.worstFailure
  return [
    `Recent lesson (${b.date}, ${b.archetype || 'unknown'} archetype, ${f.viewport} score ${b.viewports?.[f.viewport]?.score ?? '?'}/5):`,
    '',
    `The ${f.check} check failed: ${f.detail}.`,
    '',
    'Apply the mobile-first rules above to avoid repeating this pattern.',
  ].join('\n')
}

/**
 * Pick a recent failing build to inject as a lesson in today's prompt.
 *
 * @param {object} opts
 * @param {Array<object>} opts.history - recent builds, newest-first (expected from readResponsiveHistory)
 * @param {string} opts.todayArchetype
 * @returns {{ lesson: string|null, selectedBuildId: string|null }}
 */
/** Builds considered, newest first. */
const RECENT_WINDOW = 7
/** Fewer builds than this and there is no pattern to learn from yet. */
const MIN_HISTORY = 3
/** A build scoring at or under this is a failure worth repeating back. */
const FAILURE_SCORE_MAX = 3
/** A lesson quoted this many times has been heard; retire it. */
const MAX_PROMPT_USES = 2

export function selectRecentFailure({ history, todayArchetype }) {
  const recent = history.slice(0, RECENT_WINDOW)
  if (recent.length < MIN_HISTORY) return { lesson: null, selectedBuildId: null }

  const eligible = recent.filter(
    (b) =>
      typeof b.overallScore === 'number' &&
      b.overallScore <= FAILURE_SCORE_MAX &&
      (Array.isArray(b.usedInPromptFor) ? b.usedInPromptFor.length < MAX_PROMPT_USES : true) &&
      b.worstFailure
  )
  if (eligible.length === 0) return { lesson: null, selectedBuildId: null }

  // Prefer matching archetype
  const matching = eligible.find((b) => b.archetype === todayArchetype)
  const chosen = matching || eligible[0]

  return { lesson: formatLesson(chosen), selectedBuildId: chosen.buildId }
}
