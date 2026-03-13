/**
 * Builds the messages array for the Claude API call.
 * All prompting lives here — system prompt and user prompt.
 */

const SYSTEM_PROMPT = `You are the daily designer for doug-march.com — a personal portfolio site for Doug March, a product designer and developer.

Every day, you redesign this site from scratch. Your brief comes from signals: what happened in the world yesterday. Weather, sports, news, what's trending on GitHub. These signals are not just data — they are your creative palette. Let them genuinely inform your design decisions.

This is inspired by CSS Zen Garden, but you have more power: you can change components, layout, typography, color, animation, density, anything in the presentation layer. The content (projects, bio) is fixed. How that content is presented is entirely yours.

Be bold. A safe redesign is a failed redesign. The person who owns this site wants to be surprised by their own website every morning.`

/**
 * Format the signals object into a readable string for the prompt.
 * @param {object} signals - parsed YAML signals object
 * @returns {string}
 */
function formatSignals(signals) {
  const lines = []

  lines.push(`## Today's Signals (${signals.date})`)
  lines.push('')

  if (signals.weather) {
    lines.push('### Weather')
    lines.push(`Location: ${signals.weather.location}`)
    lines.push(`Conditions: ${signals.weather.conditions}`)
    lines.push(`Feel: ${signals.weather.feel}`)
    lines.push('')
  }

  if (signals.sports && signals.sports.length > 0) {
    lines.push('### Sports')
    for (const s of signals.sports) {
      lines.push(`- **${s.team}**: ${s.result}${s.notes ? ` — ${s.notes}` : ''}`)
    }
    lines.push('')
  }

  if (signals.golf && signals.golf.length > 0) {
    lines.push('### Golf')
    for (const g of signals.golf) {
      lines.push(`- ${g}`)
    }
    lines.push('')
  }

  if (signals.github_trending && signals.github_trending.length > 0) {
    lines.push('### GitHub Trending')
    for (const repo of signals.github_trending) {
      lines.push(`- **${repo.repo}** (${repo.stars?.toLocaleString() ?? '?'} stars)`)
      lines.push(`  ${repo.description}`)
      if (repo.why_interesting) {
        lines.push(`  *Why interesting: ${repo.why_interesting}*`)
      }
    }
    lines.push('')
  }

  if (signals.news && signals.news.length > 0) {
    lines.push('### News Headlines')
    for (const n of signals.news) {
      lines.push(`- ${n}`)
    }
    lines.push('')
  }

  if (signals.mood_override) {
    lines.push(`### Mood Override`)
    lines.push(`The site owner has requested a **${signals.mood_override}** mood today. This overrides your own interpretation of the signals.`)
    lines.push('')
  }

  return lines.join('\n')
}

/**
 * Build the user prompt from context.
 * @param {{ signals: object, contentSummary: string, currentFiles: Array<{path: string, content: string}> }} context
 * @returns {string}
 */
function buildUserPrompt(context) {
  const sections = []

  sections.push(formatSignals(context.signals))

  sections.push(`## Site Content Reference

The following describes the content structure. This is for reference only — you must preserve all import statements that reference these files. Do not modify anything in \`app/content/\`.

${context.contentSummary}`)

  sections.push(`## Technical Requirements

1. **No new packages.** You cannot add new npm dependencies. Use only what is already available in the project.
2. **TypeScript must compile.** All TypeScript must be valid. Fix type errors in the code itself — do not suggest changing \`tsconfig.json\`.
3. **PandaCSS build must pass.** The build runs \`panda codegen\` first, then \`vite build\`. Your token names in \`elements/preset.ts\` must be consistent with how they are used in components. If you change a semantic token name, update all usages.
4. **Preserve import paths.** Components import from \`'../../styled-system/jsx'\` and \`'../../styled-system/css'\`. Routes import components from \`'../components/...'\`. Do not change these paths.
5. **Preserve route exports.** Every route file must keep its \`export const Route = createFileRoute('...')({ component: ... })\` exactly as-is. The route path string (e.g., \`'/'\`, \`'/about'\`, \`'/work/\$slug'\`) must not change.
6. **Preserve content imports.** Routes that import from \`'../content/projects'\` or \`'../content/timeline'\` must keep those imports exactly.
7. **elements/preset.ts structure.** Must export \`elementsPreset\` as a named export. Must use \`definePreset\` from \`'@pandacss/dev'\`. The structure must be: \`export const elementsPreset = definePreset({ name: 'elements', ... })\`.
8. **Submit all files.** In the \`files\` array of your \`submit_redesign\` call, include only files you have changed. You must include at minimum \`elements/preset.ts\`. Include the complete file content — not diffs.

## Design Prompt

Here are the current files. Redesign them as you see fit, guided by today's signals.

An example of how signals might translate: if there's a blizzard, maybe the layout is dense and claustrophobic with cold desaturated blues and heavy monospace — every element pressing against the next, no breathing room. Or maybe it's the opposite: spare, empty, quiet — the cold stripped everything away. You decide. Neither is wrong. Safe is wrong.

The signals are your palette. Use them.`)

  sections.push(`## Current File Contents`)
  for (const file of context.currentFiles) {
    sections.push(`### ${file.path}

\`\`\`typescript
${file.content}
\`\`\``)
  }

  return sections.join('\n\n')
}

/**
 * Build the messages array for the Claude API call.
 * @param {{ signals: object, contentSummary: string, currentFiles: Array<{path: string, content: string}> }} context
 * @returns {{ system: string, messages: Array<{role: string, content: string}> }}
 */
export function buildMessages(context) {
  return {
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: buildUserPrompt(context),
      },
    ],
  }
}
