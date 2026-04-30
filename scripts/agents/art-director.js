/**
 * Art Director — single-agent compositional decision.
 *
 * Replaces the historical brief-writer + Design Director + Token Designer
 * trio. Reads raw signals, content, chassis catalog, archetype history,
 * color mandate, and impeccable references, then asks Claude to make ONE
 * unified decision: hero copy, archetype, chassis, full preset.ts,
 * visual spec, self-check.
 *
 * The orchestrator (scripts/design-agents.js) handles backup/restore,
 * Phase 2 (Unified Designer), build validation, and archive.
 */
import { callClaudeCLI } from '../utils/claude-cli.js'
import { parseDelimiterResponse } from '../utils/delimiter-parser.js'
const ARCHETYPE_NAMES = new Set([
  'Gallery Wall', 'Broadsheet', 'Specimen', 'Poster', 'Scroll', 'Split', 'Stack', 'Index',
])

/**
 * Assemble the user prompt for the Art Director call.
 * Pure function — no I/O — so unit tests can drive it directly.
 */
export function buildArtDirectorUserPrompt({
  signals,
  contentSummary,
  chassisCatalogBlock,
  archetypeHistoryBlock,
  recentBriefs,
  recentRatings,
  references,
  colorMandateSection,
  weightsBlock,
}) {
  const sections = []
  sections.push(`## Today's Raw Signals\n\n\`\`\`yaml\n${formatSignalsAsYaml(signals)}\n\`\`\``)
  sections.push(`## Site Content (read-only — for hero phrase mining)\n\n${contentSummary}`)
  sections.push(`## Typography Chassis Catalog\n\n${chassisCatalogBlock}`)
  if (archetypeHistoryBlock) sections.push(archetypeHistoryBlock)
  if (recentBriefs) sections.push(`## Recent Archive Briefs\n\n${recentBriefs}`)
  if (recentRatings) sections.push(`## User Design Ratings (learn from these)\n\n${recentRatings}`)
  if (references) sections.push(`## Design References\n\n${references}`)
  if (colorMandateSection) sections.push(colorMandateSection)
  if (weightsBlock) sections.push(`## Creative Weights\n\n${weightsBlock}`)
  return sections.join('\n\n---\n\n')
}

function formatSignalsAsYaml(signals) {
  return Object.entries(signals)
    .filter(([, v]) => v !== undefined)
    .map(([k, v]) => typeof v === 'string' ? `${k}: '${v}'` : `${k}: ${JSON.stringify(v)}`)
    .join('\n')
}

/**
 * Validate that an Art Director response has all required blocks and a
 * recognized archetype. Throws with a specific reason on failure so the
 * orchestrator can decide whether to retry or surface the error.
 */
export function validateArtDirectorResult(parsed) {
  if (!parsed.hero_copy || parsed.hero_copy.length < 3) {
    throw new Error('Art Director response missing or empty hero_copy (===HERO_COPY===)')
  }
  if (!parsed.archetype) {
    throw new Error('Art Director response missing ===ARCHETYPE===')
  }
  if (!ARCHETYPE_NAMES.has(parsed.archetype)) {
    throw new Error(`Art Director archetype "${parsed.archetype}" is not in the allowed set: ${[...ARCHETYPE_NAMES].join(', ')}`)
  }
  if (!parsed.chassis_id) {
    throw new Error('Art Director response missing chassis_id (===CHASSIS_ID===)')
  }
  if (!parsed.visual_spec) {
    throw new Error('Art Director response missing ===VISUAL_SPEC===')
  }
  if (!parsed.self_check) {
    throw new Error('Art Director response missing ===SELF_CHECK===')
  }
  const presetFile = (parsed.files || []).find(f => f.path === 'elements/preset.ts')
  if (!presetFile || !presetFile.content) {
    throw new Error('Art Director response missing ===FILE:elements/preset.ts=== block')
  }
}

/**
 * Run the Art Director phase.
 *
 * @param {{
 *   signals: object,
 *   contentSummary: string,
 *   chassisCatalog: object[],
 *   chassisCatalogBlock: string,
 *   archetypeHistoryBlock: string,
 *   recentBriefs: string,
 *   recentRatings: string,
 *   references: string,
 *   colorMandateSection: string,
 *   weightsBlock: string,
 *   systemPrompt: string,
 *   designReferenceImages?: Array<{ data: string, media_type: string, title?: string }>,
 * }} ctx
 * @returns {Promise<{ heroCopy: string, heroRationale: string, archetype: string, chassisId: string, presetTs: string, visualSpec: string, selfCheck: string, rationale: string, designBrief: string, colorScheme: object|null, brief: string }>}
 */
export async function runArtDirector(ctx) {
  const userPrompt = buildArtDirectorUserPrompt(ctx)

  // 20-minute total / 15-minute stall headroom. AD calls in production
  // have run 7:45 (run 1) and 8:55 (run 2) at 5–9 weight settings; a
  // higher-inspiration prompt with the export-name guard added pushed
  // run 3 past the original 10-minute hard cap. Match the shape of the
  // unified-designer config (30 min total / 25 min stall) one register
  // tighter — the AD prompt is smaller and shouldn't need that much.
  const result = await callClaudeCLI('art-director', ctx.systemPrompt, userPrompt, {
    timeoutMs: 1200000,
    stallTimeoutMs: 900000,
    model: 'sonnet',
  })

  let parsed
  try {
    parsed = parseDelimiterResponse(result)
  } catch (err) {
    throw new Error(`Art Director response unparseable: ${err.message}`)
  }

  validateArtDirectorResult(parsed)

  // Compose the human-readable brief used in archive/brief.md (the previous
  // pipeline produced this from interpret-signals.js; the Art Director must
  // still produce it — see spec, "Loss of brief-as-artifact").
  const brief = [
    `## Hero Copy`,
    parsed.hero_copy,
    '',
    `## Hero Rationale`,
    parsed.hero_rationale || '(none)',
    '',
    `## Archetype`,
    parsed.archetype,
    '',
    `## Chassis`,
    parsed.chassis_id,
    '',
    `## Visual Specification`,
    parsed.visual_spec,
    '',
    `## Self-Check`,
    parsed.self_check,
    '',
    `## Rationale`,
    parsed.rationale || '',
  ].join('\n')

  return {
    heroCopy: parsed.hero_copy,
    heroRationale: parsed.hero_rationale || '',
    archetype: parsed.archetype,
    chassisId: parsed.chassis_id,
    presetTs: parsed.files.find(f => f.path === 'elements/preset.ts').content,
    visualSpec: parsed.visual_spec,
    selfCheck: parsed.self_check,
    rationale: parsed.rationale || '',
    designBrief: parsed.design_brief || '',
    colorScheme: parsed.color_scheme || null,
    brief,
  }
}
