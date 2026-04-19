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
 * @param {string} opts.today - ISO date of today's build
 * @returns {{ lesson: string|null, selectedBuildId: string|null }}
 */
export function selectRecentFailure({ history, todayArchetype, today }) {
  const recent = history.slice(0, 7)
  if (recent.length < 3) return { lesson: null, selectedBuildId: null }

  const eligible = recent.filter(b =>
    typeof b.overallScore === 'number' && b.overallScore <= 3 &&
    (Array.isArray(b.usedInPromptFor) ? b.usedInPromptFor.length < 2 : true) &&
    b.worstFailure
  )
  if (eligible.length === 0) return { lesson: null, selectedBuildId: null }

  // Prefer matching archetype
  const matching = eligible.find(b => b.archetype === todayArchetype)
  const chosen = matching || eligible[0]

  return { lesson: formatLesson(chosen), selectedBuildId: chosen.buildId }
}
