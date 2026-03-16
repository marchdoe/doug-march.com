# Designer Agent Swarm Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the monolithic CLI call in daily-redesign.js with three specialized CLI calls (Token Designer, Structure Agent, Component Agent) orchestrated by a new design-agents.js file.

**Architecture:** A new orchestrator (`scripts/design-agents.js`) dispatches three focused `claude -p` CLI calls sequentially/in-parallel. Token Designer runs first and writes design tokens to disk. Structure Agent and Component Agent run next, reading those tokens. Each call is ~10-15KB input / 5-15KB output — fast enough to avoid concurrency starvation. The orchestrator owns backup/restore, build validation, and archiving.

**Tech Stack:** Node.js ESM, `claude` CLI (`-p` mode with `--output-format stream-json`), PandaCSS, Vite, existing file-manager.js/build-validator.js utilities.

---

## Chunk 1: File Groups in site-context.js

### Task 1: Add file group constants to site-context.js

**Files:**
- Modify: `scripts/utils/site-context.js`
- Test: `tests/scripts/site-context.test.js`

- [ ] **Step 1: Write failing tests for file group constants**

```javascript
// tests/scripts/site-context.test.js
import { describe, it, expect } from 'vitest'
import {
  MUTABLE_FILES,
  TOKEN_FILES,
  STRUCTURE_FILES,
  COMPONENT_FILES,
} from '../../scripts/utils/site-context.js'

describe('file group constants', () => {
  it('TOKEN_FILES contains preset.ts and __root.tsx', () => {
    expect(TOKEN_FILES).toEqual([
      'elements/preset.ts',
      'app/routes/__root.tsx',
    ])
  })

  it('STRUCTURE_FILES contains layout and route files', () => {
    expect(STRUCTURE_FILES).toEqual([
      'app/components/Layout.tsx',
      'app/components/Sidebar.tsx',
      'app/components/MobileFooter.tsx',
      'app/routes/index.tsx',
      'app/routes/about.tsx',
      'app/routes/work.$slug.tsx',
    ])
  })

  it('COMPONENT_FILES contains all component files', () => {
    expect(COMPONENT_FILES).toHaveLength(9)
    expect(COMPONENT_FILES).toContain('app/components/FeaturedProject.tsx')
    expect(COMPONENT_FILES).toContain('app/components/Personal.tsx')
  })

  it('all groups combined equal MUTABLE_FILES', () => {
    const combined = [...TOKEN_FILES, ...STRUCTURE_FILES, ...COMPONENT_FILES]
    expect(combined.sort()).toEqual([...MUTABLE_FILES].sort())
  })

  it('no file appears in more than one group', () => {
    const all = [...TOKEN_FILES, ...STRUCTURE_FILES, ...COMPONENT_FILES]
    const unique = new Set(all)
    expect(unique.size).toBe(all.length)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/scripts/site-context.test.js`
Expected: FAIL — TOKEN_FILES, STRUCTURE_FILES, COMPONENT_FILES not exported

- [ ] **Step 3: Add file group constants to site-context.js**

Add after the `MUTABLE_FILES` array in `scripts/utils/site-context.js`:

```javascript
/** Files owned by the Token Designer agent. */
export const TOKEN_FILES = [
  'elements/preset.ts',
  'app/routes/__root.tsx',
]

/** Files owned by the Structure Agent. */
export const STRUCTURE_FILES = [
  'app/components/Layout.tsx',
  'app/components/Sidebar.tsx',
  'app/components/MobileFooter.tsx',
  'app/routes/index.tsx',
  'app/routes/about.tsx',
  'app/routes/work.$slug.tsx',
]

/** Files owned by the Component Agent. */
export const COMPONENT_FILES = [
  'app/components/FeaturedProject.tsx',
  'app/components/ProjectRow.tsx',
  'app/components/SectionHead.tsx',
  'app/components/SelectedWork.tsx',
  'app/components/Experiments.tsx',
  'app/components/Bio.tsx',
  'app/components/Timeline.tsx',
  'app/components/Capabilities.tsx',
  'app/components/Personal.tsx',
]
```

- [ ] **Step 4: Add readFileGroup function**

Add to `scripts/utils/site-context.js`:

```javascript
/**
 * Read a subset of mutable files from disk.
 * @param {string[]} filePaths - relative paths to read
 * @returns {Promise<Array<{path: string, content: string}>>}
 */
export async function readFileGroup(filePaths) {
  const files = []
  for (const relPath of filePaths) {
    const absPath = path.join(ROOT, relPath)
    if (existsSync(absPath)) {
      const content = await readFile(absPath, 'utf8')
      files.push({ path: relPath, content })
    }
  }
  return files
}
```

- [ ] **Step 5: Add readFileGroup test**

Add to `tests/scripts/site-context.test.js`:

```javascript
import { readFileGroup } from '../../scripts/utils/site-context.js'

describe('readFileGroup', () => {
  it('reads existing files and returns path + content', async () => {
    const files = await readFileGroup(['elements/preset.ts'])
    expect(files).toHaveLength(1)
    expect(files[0].path).toBe('elements/preset.ts')
    expect(files[0].content).toContain('definePreset')
  })

  it('skips files that do not exist', async () => {
    const files = await readFileGroup(['nonexistent/file.ts', 'elements/preset.ts'])
    expect(files).toHaveLength(1)
  })
})
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `npx vitest run tests/scripts/site-context.test.js`
Expected: PASS (all 7 tests)

- [ ] **Step 6: Run existing tests to verify no regressions**

Run: `npx vitest run tests/scripts/`
Expected: All tests pass

- [ ] **Step 7: Commit**

```bash
git add scripts/utils/site-context.js tests/scripts/site-context.test.js
git commit -m "feat: add file group constants for agent swarm (TOKEN_FILES, STRUCTURE_FILES, COMPONENT_FILES)"
```

---

## Chunk 2: Agent Prompt Files

### Task 2: Create the three agent prompt markdown files

**Files:**
- Create: `scripts/prompts/token-designer.md`
- Create: `scripts/prompts/structure-agent.md`
- Create: `scripts/prompts/component-agent.md`

- [ ] **Step 1: Create scripts/prompts/ directory**

Run: `mkdir -p scripts/prompts`

- [ ] **Step 2: Write token-designer.md**

Create `scripts/prompts/token-designer.md`:

```markdown
You are a Design System Specialist working in an automated pipeline. You create the foundational design tokens — colors, fonts, spacing, and semantic tokens — that all other designers will build on.

## Color Philosophy

**Favor vibrancy by default.** Most days should feel alive — saturated accents, warm or cool but never grey. Muted, dark, desaturated palettes are reserved for signals that genuinely call for it: blizzards, deep winter, bad news days, heavy losses. An overcast spring day is NOT dreary — it's soft greens and warm fog, not grey. When in doubt, choose the more vibrant option.

## Design Fundamentals

- **Color restraint** — 2-3 colors maximum plus neutrals. Build a full shade scale (50-900) for your primary neutral and 3-5 shades for your accent. Let one accent color do the work. The accent should have real presence — not a whisper at 0.2 opacity.
- **Consistent spacing** — Define a spacing scale (4px, 8px, 16px, 24px, 32px, 48px, 64px). Every spacing value in the system must come from this scale.
- **Typographic system** — Choose 1-2 fonts from Google Fonts. Define a clear size scale from 2xs to 2xl with meaningful jumps. Define line-height and letter-spacing tokens.
- **Semantic tokens** — Map your raw color tokens to semantic names (bg, text, accent, border) with light/dark variants. Components will reference these, not raw colors.

## Your Files

You MUST produce exactly these files:
- `elements/preset.ts` — the full PandaCSS preset with all design tokens
- `app/routes/__root.tsx` — update the Google Fonts links array in head() to load your chosen fonts

You must also produce `rationale` and `design_brief` fields in your JSON response.

## Accessibility — Non-Negotiable

- Body text color against background must meet WCAG AA (4.5:1 ratio)
- Large text (18px+ or 14px+ bold) must meet 3:1
- No body text smaller than 14px (0.875rem minimum for base)

## Technical Requirements

- `elements/preset.ts` must export `elementsPreset` as a named export using `definePreset` from `@pandacss/dev`
- Structure: `export const elementsPreset = definePreset({ name: 'elements', ... })`
- Include globalCss, conditions, theme.tokens, and theme.semanticTokens
- `app/routes/__root.tsx` must keep its existing structure — only update the `links` array in `head()` for font loading. Keep the preconnect hints for fonts.googleapis.com and fonts.gstatic.com.

## Response Format

Respond with ONLY a valid JSON object:
```json
{
  "rationale": "1-2 paragraphs explaining your creative choices",
  "design_brief": "One evocative sentence for the archive",
  "files": [
    { "path": "elements/preset.ts", "content": "...full file content..." },
    { "path": "app/routes/__root.tsx", "content": "...full file content..." }
  ]
}
```
```

- [ ] **Step 3: Write structure-agent.md**

Create `scripts/prompts/structure-agent.md`:

```markdown
You are a Layout Architect working in an automated pipeline. You design the spatial organization, page composition, and navigation of the site. You receive design tokens (already created) and a creative brief.

## Design Fundamentals

- **Alignment and grid discipline** — Every element should feel intentionally placed. Use a consistent grid. Align elements to shared edges and baselines.
- **Visual hierarchy** — Establish clear levels: one dominant element, supporting elements, and background elements. Not everything can be loud.
- **Whitespace as design** — Empty space is not wasted space. It creates breathing room, groups related elements, and directs attention.
- **Consistent spacing** — Use only the spacing tokens from preset.ts. Never use arbitrary pixel values.
- **Contrast and readability** — Body text must be effortlessly readable. Line length must not exceed 75 characters. Line height for body text must be at least 1.4.

## What "Genuinely Different" Looks Like

The structure itself is a creative choice, not just the styling of a fixed structure:
- Nav at the bottom, content reads bottom-to-top
- Featured project fills the entire viewport, scroll past to reach work list
- Persistent left sidebar for identity and nav
- Asymmetric split — one large panel, one narrow panel
- Generous whitespace pushes content to one corner
- Signal-driven elements integrated with portfolio content

## Your Files

You MUST produce all of these files:
- `app/components/Layout.tsx` — the root layout wrapper
- `app/components/Sidebar.tsx` — navigation component
- `app/components/MobileFooter.tsx` — mobile navigation
- `app/routes/index.tsx` — home page composition
- `app/routes/about.tsx` — about page composition
- `app/routes/work.$slug.tsx` — project detail page

You may ONLY write these files. Do not write any other files.

## Content Contract (Route Level)

**Home page (index.tsx) must compose:**
- FeaturedProject — renders project title, problem statement, external link
- SelectedWork — renders each project: title, type, year, link to /work/$slug
- Experiments — renders each project: title, type, year, link or external URL

**About page (about.tsx) must compose:**
- Bio, Timeline, Capabilities, Personal components

**All pages must include:**
- Sidebar with name, role, and all nav links
- All nav links must be keyboard-accessible and visually distinguishable

## Technical Requirements

- Preserve route exports: `export const Route = createFileRoute('...')({ component: ... })`
- Preserve content imports from `'../content/projects'` and `'../content/timeline'`
- Components import from `'../../styled-system/jsx'` and `'../../styled-system/css'`
- Routes import components from `'../components/...'`
- Use only the semantic tokens and spacing values defined in preset.ts
- Component exports you can import: FeaturedProject, SelectedWork, Experiments, SectionHead, ProjectRow, Bio, Timeline, Capabilities, Personal, Layout, Sidebar, MobileFooter

## Response Format

Respond with ONLY a valid JSON object:
```json
{
  "files": [
    { "path": "app/components/Layout.tsx", "content": "...full file content..." },
    { "path": "app/components/Sidebar.tsx", "content": "..." },
    { "path": "app/components/MobileFooter.tsx", "content": "..." },
    { "path": "app/routes/index.tsx", "content": "..." },
    { "path": "app/routes/about.tsx", "content": "..." },
    { "path": "app/routes/work.$slug.tsx", "content": "..." }
  ]
}
```
```

- [ ] **Step 4: Write component-agent.md**

Create `scripts/prompts/component-agent.md`:

```markdown
You are a Component Designer working in an automated pipeline. You design individual data-display components — how project cards look, how timelines render, how capabilities are presented. You receive design tokens (already created) and a creative brief.

## Design Fundamentals

- **Typographic hierarchy** — Headings, subheads, body, captions, and labels should have clear, distinct sizes and weights. Use 2-3 levels of contrast, not 7.
- **Component consistency** — Cards should look like cards. Lists should look like lists. Borders, shadows, and radii should be consistent within a family.
- **Color restraint** — Use only the semantic tokens from preset.ts. Let the accent color do the work. Don't introduce new colors.
- **Consistent spacing** — Use only the spacing tokens from preset.ts. Never use arbitrary pixel values.
- **Contrast and readability** — All text must be readable. No body text smaller than 14px. No interactive element text smaller than 12px.

## Your Files

You MUST produce all of these files:
- `app/components/FeaturedProject.tsx`
- `app/components/ProjectRow.tsx`
- `app/components/SectionHead.tsx`
- `app/components/SelectedWork.tsx`
- `app/components/Experiments.tsx`
- `app/components/Bio.tsx`
- `app/components/Timeline.tsx`
- `app/components/Capabilities.tsx`
- `app/components/Personal.tsx`

You may ONLY write these files. Do not write any other files.

## Content Contract (Per Component)

Each component imports its own data directly from app/content/. Do not change import paths.

- **FeaturedProject** — must render: project title, problem statement, external link
- **ProjectRow** — must accept props (project, index), render: title, type, year, link
- **SectionHead** — must accept a label prop and render it
- **SelectedWork** — must render each project via ProjectRow with link to /work/$slug
- **Experiments** — must render each project: title, type, year, link or external URL
- **Bio** — must render the identity statement
- **Timeline** — must render each entry: year, role, company, description
- **Capabilities** — must render all capability strings
- **Personal** — must render: holes in one count, sport, teams, current focus

## Technical Requirements

- Components import from `'../../styled-system/jsx'` and `'../../styled-system/css'`
- Content imports from `'../../content/projects'`, `'../../content/timeline'`, `'../../content/about'`
- ProjectRow prop interface `(project, index)` must remain compatible — you may add optional props but never remove required ones
- Use only the semantic tokens and spacing values defined in preset.ts
- Every data key listed in the content contract must appear somewhere in the rendered output

## Response Format

Respond with ONLY a valid JSON object:
```json
{
  "files": [
    { "path": "app/components/FeaturedProject.tsx", "content": "..." },
    { "path": "app/components/ProjectRow.tsx", "content": "..." },
    { "path": "app/components/SectionHead.tsx", "content": "..." },
    { "path": "app/components/SelectedWork.tsx", "content": "..." },
    { "path": "app/components/Experiments.tsx", "content": "..." },
    { "path": "app/components/Bio.tsx", "content": "..." },
    { "path": "app/components/Timeline.tsx", "content": "..." },
    { "path": "app/components/Capabilities.tsx", "content": "..." },
    { "path": "app/components/Personal.tsx", "content": "..." }
  ]
}
```
```

- [ ] **Step 5: Commit**

```bash
git add scripts/prompts/
git commit -m "feat: add agent prompt files for token-designer, structure-agent, component-agent"
```

---

## Chunk 3: The Orchestrator (design-agents.js)

### Task 3: Create the CLI call helper

**Files:**
- Create: `scripts/design-agents.js`
- Test: `tests/scripts/design-agents.test.js`

- [ ] **Step 1: Write tests for callAgent helper and file ownership mapping**

```javascript
// tests/scripts/design-agents.test.js
import { describe, it, expect } from 'vitest'
import {
  FILE_OWNERSHIP,
  buildAgentPrompt,
  identifyFailingAgent,
} from '../../scripts/design-agents.js'

describe('FILE_OWNERSHIP', () => {
  it('maps every file to exactly one agent', () => {
    const allFiles = Object.values(FILE_OWNERSHIP)
    expect(new Set(allFiles).size).toBeLessThanOrEqual(3)
    expect(Object.keys(FILE_OWNERSHIP)).toHaveLength(17)
  })

  it('maps preset.ts and __root.tsx to token-designer', () => {
    expect(FILE_OWNERSHIP['elements/preset.ts']).toBe('token-designer')
    expect(FILE_OWNERSHIP['app/routes/__root.tsx']).toBe('token-designer')
  })

  it('maps layout files to structure-agent', () => {
    expect(FILE_OWNERSHIP['app/components/Layout.tsx']).toBe('structure-agent')
    expect(FILE_OWNERSHIP['app/routes/index.tsx']).toBe('structure-agent')
  })

  it('maps component files to component-agent', () => {
    expect(FILE_OWNERSHIP['app/components/Bio.tsx']).toBe('component-agent')
    expect(FILE_OWNERSHIP['app/components/FeaturedProject.tsx']).toBe('component-agent')
  })
})

describe('identifyFailingAgent', () => {
  it('identifies structure-agent from a build error mentioning Layout.tsx', () => {
    const error = "app/components/Layout.tsx(15,7): error TS2322: Type 'string' is not assignable"
    expect(identifyFailingAgent(error)).toBe('structure-agent')
  })

  it('identifies component-agent from a build error mentioning Bio.tsx', () => {
    const error = "app/components/Bio.tsx(8,3): error TS2304"
    expect(identifyFailingAgent(error)).toBe('component-agent')
  })

  it('identifies token-designer from a panda codegen error mentioning preset', () => {
    const error = "Error in elements/preset.ts: invalid token"
    expect(identifyFailingAgent(error)).toBe('token-designer')
  })

  it('returns "both" when errors span multiple agents', () => {
    const error = "app/components/Layout.tsx(15,7): error\napp/components/Bio.tsx(8,3): error"
    expect(identifyFailingAgent(error)).toBe('both')
  })

  it('returns "both" when no file can be identified', () => {
    const error = "Unknown build error"
    expect(identifyFailingAgent(error)).toBe('both')
  })
})

describe('buildAgentPrompt', () => {
  it('includes the brief in the prompt', () => {
    const prompt = buildAgentPrompt('token-designer', {
      brief: '## Palette Direction\nWarm and golden.',
      referenceFiles: [],
      tokenContext: null,
    })
    expect(prompt).toContain('Warm and golden')
  })

  it('includes token context for structure-agent', () => {
    const prompt = buildAgentPrompt('structure-agent', {
      brief: 'brief text',
      referenceFiles: [],
      tokenContext: 'export const elementsPreset = ...',
    })
    expect(prompt).toContain('elementsPreset')
  })

  it('does not include token context for token-designer', () => {
    const prompt = buildAgentPrompt('token-designer', {
      brief: 'brief text',
      referenceFiles: [],
      tokenContext: null,
    })
    expect(prompt).not.toContain('## Design Tokens')
  })

  it('includes reference files', () => {
    const prompt = buildAgentPrompt('component-agent', {
      brief: 'brief text',
      referenceFiles: [{ path: 'app/components/Bio.tsx', content: 'const Bio = ...' }],
      tokenContext: 'tokens',
    })
    expect(prompt).toContain('Bio.tsx')
    expect(prompt).toContain('const Bio')
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/scripts/design-agents.test.js`
Expected: FAIL — module not found

- [ ] **Step 3: Write design-agents.js with exports for FILE_OWNERSHIP, buildAgentPrompt, identifyFailingAgent**

Create `scripts/design-agents.js`:

```javascript
#!/usr/bin/env node

/**
 * Designer Agent Swarm Orchestrator
 *
 * Dispatches three specialized CLI calls to generate a site redesign:
 *   1. Token Designer — preset.ts + __root.tsx
 *   2. Structure Agent — Layout, Sidebar, MobileFooter, routes
 *   3. Component Agent — all data-display components
 *
 * Each call is small and fast (~15s) to avoid CLI concurrency starvation.
 */

import { config } from 'dotenv'
import { fileURLToPath } from 'url'
import path from 'path'
config({ path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../.env') })

import { readFile, writeFile } from 'fs/promises'
import { existsSync } from 'fs'
import { spawnSync } from 'child_process'
import {
  MUTABLE_FILES,
  TOKEN_FILES,
  STRUCTURE_FILES,
  COMPONENT_FILES,
  readFileGroup,
  readContext,
} from './utils/site-context.js'
import { backup, writeFiles, restore, ROOT } from './utils/file-manager.js'
import { validateBuild } from './utils/build-validator.js'
import { archive } from './utils/archiver.js'

/** Map every mutable file to its owning agent. */
export const FILE_OWNERSHIP = Object.fromEntries([
  ...TOKEN_FILES.map(f => [f, 'token-designer']),
  ...STRUCTURE_FILES.map(f => [f, 'structure-agent']),
  ...COMPONENT_FILES.map(f => [f, 'component-agent']),
])

const PIPELINE_SETTINGS = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  'pipeline-settings.json'
)

const AGENT_PROMPTS_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  'prompts'
)

/**
 * Identify which agent is responsible for a build error.
 * Parses file paths from TypeScript/PandaCSS error output.
 * @param {string} errorOutput
 * @returns {'token-designer' | 'structure-agent' | 'component-agent' | 'both'}
 */
export function identifyFailingAgent(errorOutput) {
  const agents = new Set()

  for (const [filePath, agent] of Object.entries(FILE_OWNERSHIP)) {
    // Match file paths in error output (TypeScript uses forward slashes)
    if (errorOutput.includes(filePath)) {
      agents.add(agent)
    }
  }

  if (agents.size === 0) return 'both'
  if (agents.size === 1) return [...agents][0]
  // If errors span token-designer + others, it's likely a token issue
  if (agents.has('token-designer')) return 'token-designer'
  return 'both'
}

/**
 * Build the user prompt for a specific agent.
 * @param {'token-designer' | 'structure-agent' | 'component-agent'} agentName
 * @param {{ brief: string, referenceFiles: Array<{path: string, content: string}>, tokenContext: string|null }} context
 * @returns {string}
 */
export function buildAgentPrompt(agentName, context) {
  const sections = []

  // Creative brief
  sections.push(`## Creative Brief\n\n${context.brief}`)

  // Token context (Phase 2 agents only)
  if (context.tokenContext) {
    sections.push(`## Design Tokens (from elements/preset.ts)\n\nUse these token names in your styled components. Do not invent new token names.\n\n\`\`\`typescript\n${context.tokenContext}\n\`\`\``)
  }

  // Reference files
  if (context.referenceFiles.length > 0) {
    sections.push(`## Reference Files\n\nThese are the current files for technical reference. They show you the component API, import paths, and TypeScript interfaces you must preserve. Design from scratch — the styling and structure should be entirely new.\n`)
    for (const file of context.referenceFiles) {
      sections.push(`### ${file.path}\n\n\`\`\`typescript\n${file.content}\n\`\`\``)
    }
  }

  return sections.join('\n\n')
}

/**
 * Call a single agent via the claude CLI.
 * @param {string} agentName - 'token-designer', 'structure-agent', or 'component-agent'
 * @param {string} systemPrompt - the agent's system prompt (from prompts/ dir)
 * @param {string} userPrompt - assembled user prompt with brief + context
 * @param {string} [buildError] - optional build error from a previous attempt
 * @returns {Promise<{files: Array<{path: string, content: string}>, rationale?: string, design_brief?: string}>}
 */
async function callAgent(agentName, systemPrompt, userPrompt, buildError) {
  const { createReadStream } = await import('fs')

  let fullPrompt = userPrompt
  if (buildError) {
    fullPrompt += `\n\n---\n\nThe previous attempt failed with this build error:\n\n${buildError}\n\nPlease fix the issues and try again.`
  }

  // Only send the user prompt via stdin — system prompt goes via --system-prompt flag
  const promptPath = path.join(ROOT, `.agent-prompt-${agentName}.tmp`)
  await writeFile(promptPath, fullPrompt, 'utf8')

  console.log(`  [${agentName}] calling claude CLI...`)
  console.log(`  [${agentName}] prompt: ${(fullPrompt.length / 1024).toFixed(0)}KB`)

  const cliEnv = { ...process.env }
  delete cliEnv.ANTHROPIC_API_KEY

  const cliArgs = [
    '-p',
    '--verbose',
    '--output-format', 'stream-json',
    '--max-turns', '1',
    '--model', 'sonnet',
    '--tools', '',
    '--disable-slash-commands',
    '--settings', PIPELINE_SETTINGS,
    '--system-prompt', systemPrompt,
  ]

  const { spawn } = await import('child_process')

  const result = await new Promise((resolve, reject) => {
    const child = spawn('claude', cliArgs, { cwd: ROOT, env: cliEnv })

    let fullText = ''
    let finalResult = ''
    let stderr = ''
    let lineBuffer = ''
    let charCount = 0

    const promptStream = createReadStream(promptPath)
    child.stdin.on('error', () => {})
    promptStream.pipe(child.stdin)

    child.stdout.on('data', (chunk) => {
      lineBuffer += chunk.toString()
      const lines = lineBuffer.split('\n')
      lineBuffer = lines.pop() || ''

      for (const line of lines) {
        if (!line.trim()) continue
        try {
          const event = JSON.parse(line)
          if (event.type === 'assistant' && event.message?.content) {
            for (const block of event.message.content) {
              if (block.type === 'text' && block.text) {
                fullText += block.text
                charCount += block.text.length
              }
            }
          } else if (event.type === 'result') {
            finalResult = event.result || ''
          }
        } catch {}
      }
    })
    child.stderr.on('data', (chunk) => { stderr += chunk.toString() })

    const timeout = setTimeout(() => {
      child.kill()
      reject(new Error(`[${agentName}] timed out after 5 minutes (${(charCount / 1024).toFixed(0)}KB generated)`))
    }, 300000) // 5 minute timeout per agent

    child.on('close', (code) => {
      clearTimeout(timeout)
      if (lineBuffer.trim()) {
        try {
          const event = JSON.parse(lineBuffer)
          if (event.type === 'result') finalResult = event.result || ''
          if (event.type === 'assistant' && event.message?.content) {
            for (const block of event.message.content) {
              if (block.type === 'text') fullText += block.text
            }
          }
        } catch {}
      }
      console.log(`  [${agentName}] finished (${(charCount / 1024).toFixed(0)}KB)`)
      if (code !== 0 && !finalResult && !fullText) {
        reject(new Error(`[${agentName}] exited with code ${code}: ${stderr.slice(0, 500)}`))
      } else {
        resolve(finalResult || fullText)
      }
    })

    child.on('error', (err) => { clearTimeout(timeout); reject(err) })
  })

  // Parse JSON response
  let parsed
  try {
    parsed = JSON.parse(result)
  } catch {
    let cleaned = result.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    try {
      parsed = JSON.parse(cleaned)
    } catch {
      const jsonStart = cleaned.indexOf('{')
      if (jsonStart > 0) {
        cleaned = cleaned.slice(jsonStart)
        try { parsed = JSON.parse(cleaned) } catch (e) {
          throw new Error(`[${agentName}] failed to parse JSON: ${e.message}\nFirst 300 chars: ${result.slice(0, 300)}`)
        }
      } else {
        throw new Error(`[${agentName}] no JSON found in response\nFirst 300 chars: ${result.slice(0, 300)}`)
      }
    }
  }

  if (!Array.isArray(parsed.files)) {
    throw new Error(`[${agentName}] response missing files array. Got keys: ${Object.keys(parsed).join(', ')}`)
  }

  console.log(`  [${agentName}] produced ${parsed.files.length} files`)

  // Clean up temp file
  try { const { unlink } = await import('fs/promises'); await unlink(promptPath) } catch {}

  return parsed
}

/**
 * Run panda codegen only (no full vite build).
 * Used as a validation gate after Token Designer.
 * @returns {{ success: boolean, error?: string }}
 */
function validateCodegen() {
  console.log('  running panda codegen...')
  const result = spawnSync('pnpm', ['panda', 'codegen'], {
    cwd: ROOT, encoding: 'utf8', timeout: 30000,
  })
  if (result.status === 0) {
    console.log('  codegen passed')
    return { success: true }
  }
  const error = ((result.stderr ?? '') + (result.stdout ?? '')).slice(-2000)
  console.log('  codegen failed')
  return { success: false, error }
}

/**
 * Main orchestrator function.
 * @param {{ signals: object, brief: string, contentSummary: string }} context
 */
export async function runAgentSwarm(context) {
  console.log('\n=== Agent Swarm: Design Generation ===\n')

  // Load agent prompts from markdown files
  const tokenPrompt = await readFile(path.join(AGENT_PROMPTS_DIR, 'token-designer.md'), 'utf8')
  const structurePrompt = await readFile(path.join(AGENT_PROMPTS_DIR, 'structure-agent.md'), 'utf8')
  const componentPrompt = await readFile(path.join(AGENT_PROMPTS_DIR, 'component-agent.md'), 'utf8')

  // Read reference files for each agent
  const tokenRefFiles = await readFileGroup(TOKEN_FILES)
  const structureRefFiles = await readFileGroup(STRUCTURE_FILES)
  const componentRefFiles = await readFileGroup(COMPONENT_FILES)

  // Backup all mutable files
  console.log('[1/5] Backing up mutable files...')
  const originalBackup = await backup(MUTABLE_FILES)
  console.log(`  backed up ${originalBackup.size} files`)

  // --- Phase 1: Token Designer ---
  console.log('\n[2/5] Phase 1: Token Designer...')

  let tokenResult
  for (let attempt = 1; attempt <= 2; attempt++) {
    console.log(`\n  --- Token Designer attempt ${attempt}/2 ---`)
    try {
      const userPrompt = buildAgentPrompt('token-designer', {
        brief: context.brief,
        referenceFiles: tokenRefFiles,
        tokenContext: null,
      })
      tokenResult = await callAgent('token-designer', tokenPrompt, userPrompt)

      // Write token files to disk
      await writeFiles(tokenResult.files)

      // Verify required files exist
      if (!tokenResult.files.find(f => f.path === 'elements/preset.ts')) {
        throw new Error('Token Designer did not produce elements/preset.ts')
      }
      if (!tokenResult.files.find(f => f.path === 'app/routes/__root.tsx')) {
        throw new Error('Token Designer did not produce app/routes/__root.tsx')
      }

      // Validation gate: panda codegen
      const codegenResult = validateCodegen()
      if (!codegenResult.success) {
        throw new Error(`Codegen failed: ${codegenResult.error}`)
      }

      break // success
    } catch (err) {
      console.error(`  Token Designer error: ${err.message}`)
      if (attempt === 2) {
        console.error('  Token Designer exhausted retries. Restoring originals.')
        await restore(originalBackup)
        throw err
      }
      // Restore for retry
      await restore(originalBackup)
    }
  }

  // Read the token context for Phase 2 agents
  const tokenContext = await readFile(path.join(ROOT, 'elements/preset.ts'), 'utf8')

  // --- Phase 2: Structure Agent + Component Agent ---
  console.log('\n[3/5] Phase 2: Structure Agent + Component Agent...')

  for (let attempt = 1; attempt <= 2; attempt++) {
    console.log(`\n  --- Phase 2 attempt ${attempt}/2 ---`)

    let structureResult, componentResult
    let structureError, componentError

    // Run sequentially (parallel if concurrency allows in future)
    try {
      const structureUserPrompt = buildAgentPrompt('structure-agent', {
        brief: context.brief,
        referenceFiles: structureRefFiles,
        tokenContext,
      })
      structureResult = await callAgent('structure-agent', structurePrompt, structureUserPrompt)
      await writeFiles(structureResult.files)
    } catch (err) {
      structureError = err
      console.error(`  Structure Agent error: ${err.message}`)
    }

    try {
      const componentUserPrompt = buildAgentPrompt('component-agent', {
        brief: context.brief,
        referenceFiles: componentRefFiles,
        tokenContext,
      })
      componentResult = await callAgent('component-agent', componentPrompt, componentUserPrompt)
      await writeFiles(componentResult.files)
    } catch (err) {
      componentError = err
      console.error(`  Component Agent error: ${err.message}`)
    }

    if (structureError || componentError) {
      if (attempt === 2) {
        console.error('  Phase 2 agents exhausted retries. Restoring originals.')
        await restore(originalBackup)
        throw structureError || componentError
      }
      // Restore structure/component files for retry (keep token files)
      for (const f of [...STRUCTURE_FILES, ...COMPONENT_FILES]) {
        if (originalBackup.has(f)) {
          const absPath = path.join(ROOT, f)
          const content = originalBackup.get(f)
          if (content !== null) await writeFile(absPath, content, 'utf8')
        }
      }
      continue
    }

    // --- Build validation ---
    console.log('\n[4/5] Validating build...')
    const buildResult = validateBuild()

    if (buildResult.success) {
      console.log('\n=== Build passed! ===')

      // Collect all changed paths
      const allFiles = [
        ...tokenResult.files,
        ...structureResult.files,
        ...componentResult.files,
      ]
      const changedPaths = allFiles.map(f => f.path)

      // Archive
      console.log('\n[5/5] Archiving...')
      await archive(
        context.signals.date,
        context.signals,
        tokenResult.rationale || 'No rationale provided',
        tokenResult.design_brief || 'No design brief provided',
        changedPaths,
      )

      return {
        rationale: tokenResult.rationale,
        design_brief: tokenResult.design_brief,
        files: allFiles,
      }
    }

    // Build failed — identify responsible agent and retry selectively
    console.log('\n  Build failed.')
    const failingAgent = identifyFailingAgent(buildResult.error)
    console.log(`  Identified failing agent: ${failingAgent}`)

    if (attempt < 2) {
      if (failingAgent === 'token-designer') {
        console.error('  Token issue detected in Phase 2 build. Restoring and restarting.')
        await restore(originalBackup)
        throw new Error('Token issue detected during Phase 2 build — manual intervention needed')
      }

      // Restore only the failing agent's files, then re-run only that agent
      const filesToRestore = failingAgent === 'structure-agent' ? STRUCTURE_FILES
        : failingAgent === 'component-agent' ? COMPONENT_FILES
        : [...STRUCTURE_FILES, ...COMPONENT_FILES] // 'both'
      for (const f of filesToRestore) {
        if (originalBackup.has(f)) {
          const absPath = path.join(ROOT, f)
          const content = originalBackup.get(f)
          if (content !== null) await writeFile(absPath, content, 'utf8')
        }
      }

      // Re-run only the failing agent(s) with build error context
      if (failingAgent === 'structure-agent' || failingAgent === 'both') {
        const structureRetryPrompt = buildAgentPrompt('structure-agent', {
          brief: context.brief, referenceFiles: structureRefFiles, tokenContext,
        })
        const retryResult = await callAgent('structure-agent', structurePrompt, structureRetryPrompt, buildResult.error)
        await writeFiles(retryResult.files)
      }
      if (failingAgent === 'component-agent' || failingAgent === 'both') {
        const componentRetryPrompt = buildAgentPrompt('component-agent', {
          brief: context.brief, referenceFiles: componentRefFiles, tokenContext,
        })
        const retryResult = await callAgent('component-agent', componentPrompt, componentRetryPrompt, buildResult.error)
        await writeFiles(retryResult.files)
      }

      // Re-validate after retry
      const retryBuild = validateBuild()
      if (retryBuild.success) {
        console.log('\n=== Build passed on retry! ===')
        const allFiles = [
          ...tokenResult.files,
          ...(structureResult?.files || []),
          ...(componentResult?.files || []),
        ]
        const changedPaths = [...new Set([
          ...allFiles.map(f => f.path),
          ...filesToRestore,
        ])]
        console.log('\n[5/5] Archiving...')
        await archive(
          context.signals.date, context.signals,
          tokenResult.rationale || 'No rationale provided',
          tokenResult.design_brief || 'No design brief provided',
          changedPaths,
        )
        return {
          rationale: tokenResult.rationale,
          design_brief: tokenResult.design_brief,
          files: allFiles,
        }
      }
    }
  }

  // All retries exhausted
  await restore(originalBackup)
  throw new Error('All Phase 2 retries exhausted. Originals restored.')
}

// CLI entry point
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  (async () => {
    const context = await readContext()
    const briefPath = path.join(ROOT, 'signals/today.brief.md')
    if (existsSync(briefPath)) {
      context.brief = await readFile(briefPath, 'utf8')
    } else {
      console.error('Error: signals/today.brief.md not found. Run interpret-signals first.')
      process.exit(1)
    }

    try {
      const result = await runAgentSwarm(context)
      console.log(`\nDesign brief: ${result.design_brief}`)
      console.log('Reload the site to see the new design.')
    } catch (err) {
      console.error(`\nAgent swarm failed: ${err.message}`)
      process.exit(1)
    }
  })()
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/scripts/design-agents.test.js`
Expected: PASS

- [ ] **Step 5: Run all tests**

Run: `npx vitest run tests/scripts/`
Expected: All tests pass

- [ ] **Step 7: Commit**

```bash
git add scripts/design-agents.js tests/scripts/design-agents.test.js
git commit -m "feat: add designer agent swarm orchestrator with callAgent, retry, and build validation"
```

---

## Chunk 4: Wire into daily-redesign.js

### Task 4: Modify daily-redesign.js MOCK_MODE path

**Files:**
- Modify: `scripts/daily-redesign.js`

- [ ] **Step 1: Import runAgentSwarm at top of daily-redesign.js**

Add after the existing imports:

```javascript
import { runAgentSwarm } from './design-agents.js'
```

- [ ] **Step 2: Add MOCK_MODE early exit BEFORE the retry loop**

In `main()`, insert the following block at line 411 (before `let lastError = null`). This exits early for MOCK_MODE — the agent swarm handles its own backup/retry/archive. The API retry loop below remains untouched.

```javascript
  if (MOCK_MODE) {
    // Agent swarm handles its own backup/restore/retry/archive
    console.log('[4/4] Running agent swarm...')
    try {
      const result = await runAgentSwarm(context)
      console.log(`\ndesign_brief: ${result.design_brief}`)
      console.log('\nMOCK_MODE=true — files written to disk, skipping git commit.')
      console.log('Reload the site to see the new design.')
      process.exit(0)
    } catch (err) {
      console.error(`\nAgent swarm failed: ${err.message}`)
      process.exit(1)
    }
  }

  // --- API mode (production) — unchanged below this line ---
```

Then remove the `if (MOCK_MODE) { ... }` block inside the `for (let attempt...)` loop (lines ~417-429 including `toolUseId = 'cli-tool-use-id'`). Keep the entire API mode path (the `else` block with `client.messages.create`, `extractToolUse`, retry loop, etc.) unchanged.

- [ ] **Step 3: Remove backup call for MOCK_MODE**

The backup is now handled by the orchestrator. In main(), the `[3/4] Backing up current mutable files...` section should only run for API mode:

```javascript
  let originalBackup
  if (!MOCK_MODE) {
    console.log('[3/4] Backing up current mutable files...')
    originalBackup = await backup(MUTABLE_FILES)
    console.log(`  backed up ${originalBackup.size} files`)
  }
```

- [ ] **Step 4: Run all tests**

Run: `npx vitest run tests/scripts/`
Expected: All tests pass (existing daily-redesign tests should still pass since CLAUDE_CLI_ARGS is still exported)

- [ ] **Step 5: Test the full pipeline end-to-end**

Run: `node scripts/run-pipeline.js`

Expected: Pipeline runs through all 3 stages. Stage 3 dispatches three agent CLI calls sequentially. Each completes in ~15-60s. Build passes. Archive is written.

- [ ] **Step 6: Commit**

```bash
git add scripts/daily-redesign.js
git commit -m "feat: wire agent swarm into MOCK_MODE path of daily-redesign.js"
```

---

## Chunk 5: Cleanup and Integration Test

### Task 5: Run full pipeline and verify

- [ ] **Step 1: Run full pipeline**

Run: `node scripts/run-pipeline.js`

Verify:
- Stage 1 (collect signals) passes
- Stage 2 (interpret signals) produces a brief
- Stage 3 dispatches Token Designer, Structure Agent, Component Agent
- Each agent produces its expected files
- Build passes
- Archive is written to `archive/YYYY-MM-DD/brief.md`

- [ ] **Step 2: Verify the generated site**

Run: `pnpm dev` and open in browser. Check:
- All content contract items are present (projects, bio, timeline, etc.)
- Fonts load correctly (check network tab)
- No console errors
- Layout is responsive

- [ ] **Step 3: Run all tests one final time**

Run: `npx vitest run`
Expected: All tests pass

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: designer agent swarm — complete implementation with orchestrator, prompts, and wiring"
```
