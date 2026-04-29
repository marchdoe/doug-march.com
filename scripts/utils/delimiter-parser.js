/**
 * Shared delimiter-block parser used by the orchestrator (for the
 * Unified Designer's ===FILE:===-formatted response) and by the Art
 * Director module (for its single bundled response containing hero copy,
 * archetype, chassis, visual spec, self-check, plus the preset.ts file).
 *
 * Lives outside design-agents.js to avoid a circular import between
 * design-agents.js and scripts/agents/art-director.js — both need this
 * parser, but design-agents.js imports the Art Director and the Art
 * Director needs the parser.
 *
 * @param {string} result - raw response text
 * @returns {{
 *   files: Array<{path: string, content: string}>,
 *   rationale?: string,
 *   design_brief?: string,
 *   color_scheme?: object,
 *   hero_copy?: string,
 *   hero_rationale?: string,
 *   archetype?: string,
 *   chassis_id?: string,
 *   visual_spec?: string,
 *   self_check?: string,
 * }}
 */
export function parseDelimiterResponse(result) {
  const files = []
  const sentinel = '\n===END_SENTINEL===\n'
  const withSentinel = result + sentinel
  const filePattern = /^===FILE:([^=\n]+)===\s*\n([\s\S]*?)(?=^===FILE:|^===RATIONALE===|^===DESIGN_BRIEF===|^===COLOR_SCHEME===|^===HERO_COPY===|^===HERO_RATIONALE===|^===ARCHETYPE===|^===CHASSIS_ID===|^===VISUAL_SPEC===|^===SELF_CHECK===|^===END_SENTINEL===)/gm
  let match
  while ((match = filePattern.exec(withSentinel)) !== null) {
    const filePath = match[1].trim()
    const content = match[2].trim()
    if (filePath && content) {
      files.push({ path: filePath, content })
    }
  }

  const captureBlock = (name) => {
    const re = new RegExp(`^===${name}===\\s*\\n([\\s\\S]*?)(?=^===)`, 'm')
    const m = withSentinel.match(re)
    return m ? m[1].trim() : undefined
  }

  const rationale = captureBlock('RATIONALE')
  const design_brief = captureBlock('DESIGN_BRIEF')
  const hero_copy = captureBlock('HERO_COPY')
  const hero_rationale = captureBlock('HERO_RATIONALE')
  const archetype = captureBlock('ARCHETYPE')
  const chassis_id = captureBlock('CHASSIS_ID')
  const visual_spec = captureBlock('VISUAL_SPEC')
  const self_check = captureBlock('SELF_CHECK')

  let color_scheme
  const schemeRaw = captureBlock('COLOR_SCHEME')
  if (schemeRaw !== undefined) {
    try {
      color_scheme = JSON.parse(schemeRaw)
    } catch {
      color_scheme = { __parse_error: true, raw: schemeRaw }
    }
  }

  return {
    files,
    rationale,
    design_brief,
    color_scheme,
    hero_copy,
    hero_rationale,
    archetype,
    chassis_id,
    visual_spec,
    self_check,
  }
}
