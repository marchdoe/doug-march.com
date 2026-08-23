/**
 * Mockup Designer — Opus agent that turns the Art Director's spec into one
 * self-contained mockup.html. The orchestrator screenshots it, the Mockup
 * Critic gates it, and only then does the React Engineer translate it.
 */
import { writeFile } from 'node:fs/promises'
import { callClaudeCLI } from '../utils/claude-cli.js'
import { parseDelimiterResponse } from '../utils/delimiter-parser.js'
import { modelFor } from '../utils/models.js'

export function buildMockupDesignerUserPrompt({
  enrichedBrief,
  tokenContext,
  contentSummary,
  measurables,
  shell,
  brandSvg,
  brandMonoSvg,
  googleFontsUrl,
  lessonsBlock,
  calibrationNote,
  archetypeContractBlock,
  polishRef,
  revisionFeedback,
  tasteMemoryBlock,
}) {
  const sections = []
  if (archetypeContractBlock) sections.push(archetypeContractBlock)
  sections.push(enrichedBrief)
  sections.push(`## Measurables (the critic will measure these)\n\n${measurables}`)
  sections.push(`## Shell Declaration (execute exactly)\n\n${shell}`)
  sections.push(
    `## Design Tokens (elements/preset.ts — use ONLY these colors)\n\n\`\`\`typescript\n${tokenContext}\n\`\`\``
  )
  sections.push(`## Google Fonts URL (load these exact families)\n\n${googleFontsUrl}`)
  sections.push(
    `## Brand Mark SVG (original colors)\n\n\`\`\`html\n${brandSvg}\n\`\`\`\n\n## Brand Mark SVG (single-color / currentColor)\n\n\`\`\`html\n${brandMonoSvg}\n\`\`\``
  )
  sections.push(
    `## Site Content (real content — render this, never placeholders)\n\n${contentSummary}`
  )
  if (lessonsBlock) sections.push(lessonsBlock)
  if (calibrationNote) sections.push(calibrationNote)
  if (tasteMemoryBlock) sections.push(tasteMemoryBlock)
  // polish.md rides in the user prompt — the system prompt is at its
  // size budget (CLI 2.1.92 fails on ~56KB+ system prompts).
  if (polishRef) sections.push(`## Execution Polish Reference (apply throughout)\n\n${polishRef}`)
  if (revisionFeedback)
    sections.push(
      `## CRITIC REVISION FEEDBACK — fix these before anything else\n\n${revisionFeedback}`
    )
  return sections.join('\n\n---\n\n')
}

export function validateMockupResult(parsed) {
  const mockup = (parsed.files || []).find((f) => f.path === 'mockup.html')
  if (!mockup?.content) {
    throw new Error('Mockup Designer response missing ===FILE:mockup.html===')
  }
  if (/<script\b/i.test(mockup.content)) {
    throw new Error('mockup.html contains a <script> tag — the mockup must be JS-free')
  }
  if (!parsed.interior_notes) {
    throw new Error('Mockup Designer response missing ===INTERIOR_NOTES===')
  }
}

/**
 * @returns {Promise<{ mockupHtml: string, interiorNotes: string, rationale: string }>}
 */
export async function runMockupDesigner(ctx) {
  const userPrompt = buildMockupDesignerUserPrompt(ctx)
  const result = await callClaudeCLI('mockup-designer', ctx.systemPrompt, userPrompt, {
    timeoutMs: 1800000, // 30 min hard cap — bounds long extended-thinking phases
    stallTimeoutMs: 480000, // 8 min of TRUE silence (zero events) = dead process
    model: modelFor('mockup-designer'), // opus in prod, sonnet in dev
  })
  let parsed
  try {
    parsed = parseDelimiterResponse(result)
    validateMockupResult(parsed)
  } catch (err) {
    console.error(`  [mockup-designer] rejected: ${err.message}`)
    console.error(`  [mockup-designer] response head: ${result.slice(0, 300).replace(/\n/g, '↵')}`)
    if (ctx.failureDumpPath) {
      try {
        await writeFile(ctx.failureDumpPath, result, 'utf8')
      } catch {}
    }
    throw err
  }
  return {
    mockupHtml: parsed.files.find((f) => f.path === 'mockup.html').content,
    interiorNotes: parsed.interior_notes,
    rationale: parsed.rationale || '',
  }
}
