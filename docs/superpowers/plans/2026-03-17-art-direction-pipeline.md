# Art Direction Pipeline Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the daily redesign pipeline from template-with-swapped-colors to full art direction with references, structured briefs, expanded compositional vocabulary, and two critic gates.

**Architecture:** Four additive phases layered onto the existing pipeline. Each phase is independently shippable. New stages are wrapped in try/catch with graceful fallbacks — if any new stage fails, the pipeline continues with current behavior. No existing files are refactored; only new files created and targeted edits to prompts and the orchestrator.

**Tech Stack:** Node.js scripts, Claude CLI (Max plan), PandaCSS, Playwright (for screenshots), RSS parsing

**Spec:** `docs/superpowers/specs/2026-03-17-art-direction-pipeline-design.md`

---

## Chunk 1: Phase 1 — Structured Brief + Composition Vocabulary

The highest-impact, lowest-risk phase. Prompt-only changes that immediately expand design variety.

### Task 1: Create Composition Library

**Files:**
- Create: `scripts/prompts/library-composition.md`

- [ ] **Step 1: Write the composition library**

Create `scripts/prompts/library-composition.md` with 8 archetypes. Each archetype needs: a name, a 2-3 sentence description, a structural diagram (ASCII), CSS-level layout hints, and guidance on when to use it.

```markdown
# Composition Library

Eight compositional archetypes for the Design Director to choose from. These are starting points — the Director may hybridize or adapt them. Each archetype specifies a fundamentally different spatial organization.

## Choosing an Archetype

Match the archetype to the brief's composition direction. Do NOT default to The Magazine every day. Check the last 5 days of archive briefs and avoid repeating the same archetype within a 3-day window.

---

## The Poster

One dominant element fills the viewport. Everything else is secondary. The featured project or a signal IS the page.

```
┌─────────────────────────────┐
│                             │
│      DOMINANT ELEMENT       │
│      (60-80vh)              │
│                             │
├─────────────────────────────┤
│  secondary content, small   │
│  nav · work · signals       │
└─────────────────────────────┘
```

**CSS hints:** Single column. Hero `min-height: 60vh` or larger. Navigation minimal — a few links at bottom or overlaid. Body content compact below the fold.
**Use when:** The brief has a strong singular mood or one signal dominates. Holidays, dramatic weather, a big sports win.

---

## The Broadsheet

Dense, multi-column, newspaper-like. Signals, work, and content compete for attention. Information-rich. Type-driven hierarchy.

```
┌──────┬──────┬──────────────┐
│ COL1 │ COL2 │    COL3      │
│ nav  │ feat │  signals     │
│      │ ured │  scores      │
│      │      │  weather     │
├──────┴──────┼──────────────┤
│  work list  │  quote /     │
│             │  experiments │
└─────────────┴──────────────┘
```

**CSS hints:** CSS Grid with 3+ columns, variable widths. Dense `grid-auto-flow: dense`. Small gutters (8-12px). Multiple content blocks competing.
**Use when:** Lots of interesting signals. Busy news day, multiple sports results, strong quote. Tuesday/Wednesday energy.

---

## The Gallery Wall

Asymmetric arrangement of differently-sized blocks. Nothing on a rigid grid. Curated, organic, like a salon hang.

```
┌────────┐  ┌──────────────┐
│ small  │  │              │
│ block  │  │   large      │
└────────┘  │   block      │
┌───────────┤              │
│  medium   └──────────────┘
│  block    ┌────┐  ┌──────┐
└───────────┤tiny│  │ med  │
            └────┘  └──────┘
```

**CSS hints:** CSS Grid with `grid-template-areas` or explicit row/column placement. Variable cell sizes. Gaps 16-24px. No uniform column widths.
**Use when:** Weekend energy, relaxed signals, or when the brief calls for something curated and unhurried.

---

## The Scroll

Single column, vertical rhythm. Each section is a full moment. Generous spacing between sections. Cinematic pacing.

```
┌─────────────────────────────┐
│  section 1: identity        │
│  (generous breathing room)  │
├─────────────────────────────┤
│                             │
│  section 2: featured work   │
│                             │
├─────────────────────────────┤
│  section 3: signals         │
├─────────────────────────────┤
│  section 4: more work       │
└─────────────────────────────┘
```

**CSS hints:** Single column, `max-width: 640-720px`, centered. Sections separated by 64-96px spacing or full-width dividers. Each section is a self-contained moment.
**Use when:** Brief calls for calm, contemplative mood. Rainy day, Sunday energy, minimal signals.

---

## The Split

Two asymmetric halves. One side is the "cover" — a dominant visual/typographic moment. The other is the content. Tension between sides.

```
┌──────────────┬─────────────┐
│              │             │
│   COVER      │  content    │
│   (dominant  │  nav        │
│    moment)   │  work       │
│              │  signals    │
│   60-70%     │  30-40%     │
│              │             │
└──────────────┴─────────────┘
```

**CSS hints:** CSS Grid `grid-template-columns: 1.5fr 1fr` or similar asymmetric split. Cover side may be a single color block with large type, or a signal blown up huge. Content side is scrollable.
**Use when:** Brief has a strong tension or contrast. Hot/cold, holiday vs weather, sports win vs overcast sky.

---

## The Stack

Full-width horizontal bands. Each band is a distinct moment with its own density and treatment. No sidebar.

```
┌─────────────────────────────┐
│  BAND 1: masthead + nav     │
├─────────────────────────────┤
│  BAND 2: featured (hero)    │
├─────────────────────────────┤
│  BAND 3: signals strip      │
├─────────────────────────────┤
│  BAND 4: work grid          │
├─────────────────────────────┤
│  BAND 5: quote + footer     │
└─────────────────────────────┘
```

**CSS hints:** Full-width sections, no max-width constraint on bands (content within bands can be constrained). Each band may have its own background shade. Vertical stacking with clear visual breaks.
**Use when:** Strong horizontal energy. Multiple distinct content types that each deserve their own moment.

---

## The Specimen

Typography IS the design. Extreme type scale, creative letterspacing, type as texture. Content reads almost like a type specimen sheet.

```
┌─────────────────────────────┐
│  DOUG                       │
│  MARCH          72px+       │
├─────────────────────────────┤
│  s p a c e m a n            │
│  Aerospace teams were...    │
│                    14px     │
├─────────────────────────────┤
│  TIGERS  13-6    GOLF -13   │
│  monospace / tabular        │
└─────────────────────────────┘
```

**CSS hints:** Extreme `font-size` variation (72px+ headings, 12-14px body). Wide `letter-spacing` on display type. Monospace or tabular figures for data. Minimal color — hierarchy comes from size and weight.
**Use when:** Brief calls for typographic expression. Good font pairing day. When signals are data-heavy (scores, stats).

---

## The Index

Everything is a list. Dense, systematic, almost programmatic. Monospace or tabular type. Data-forward. The aesthetic of the terminal made beautiful.

```
┌─────────────────────────────┐
│ 01  Doug March              │
│ 02  Product Designer        │
│ ---                         │
│ 03  Featured: Spaceman      │
│ 04  Type: Product Design    │
│ 05  Status: Active          │
│ ---                         │
│ 06  DET Tigers    13-6  W   │
│ 07  DET Red Wings  5-2  W   │
│ 08  Golf: Young   -13       │
│ ---                         │
│ 09  Weather: 30°F Overcast  │
│ 10  Wind: 12mph SSW         │
└─────────────────────────────┘
```

**CSS hints:** Monospace font for all or most content. Fixed-width columns. Line numbers or indices optional. Dense vertical spacing (line-height: 1.3-1.5). Minimal decoration.
**Use when:** Data-heavy day. Lots of scores, stats, numbers. When the brief calls for systematic precision.
```

- [ ] **Step 2: Commit**

```bash
git add scripts/prompts/library-composition.md
git commit -m "feat: add composition library with 8 layout archetypes"
```

---

### Task 2: Update Interpret-Signals for Structured Brief

**Files:**
- Modify: `scripts/interpret-signals.js` (lines 35-133, `buildInterpretPrompt()`)

- [ ] **Step 1: Read the current `buildInterpretPrompt()` function**

Read `scripts/interpret-signals.js` to understand the full current prompt structure. The function is at lines 35-133. Note the 6 current sections: Palette Direction, Layout Energy, Tension, Required Elements, Accent Notes, Anchor Signal.

- [ ] **Step 2: Update `buildInterpretPrompt()` to produce structured brief**

Replace the 6 current brief sections (lines ~96-133) with 5 new structured sections. Keep the signal hierarchy system (PRIMARY/SECONDARY/ACCENT) and the atmospheric writing style, but add explicit compositional directives.

The new sections are:

1. **Mood** — replaces Tension + atmosphere parts of Palette Direction. 2-4 sentences of atmospheric writing.
2. **Composition Direction** — replaces Layout Energy. Must name a specific archetype from the composition library (Poster, Broadsheet, Gallery Wall, Scroll, Split, Stack, Specimen, Index) and explain why. Can suggest hybrids.
3. **Typography Direction** — NEW. 1-2 sentences on type scale, spacing, and character. Should reference the typography library recipes.
4. **Signal Integration** — replaces Required Elements + Accent Notes. Bulleted list specifying HOW each signal should appear (not just that it should appear). E.g., "Tigers 13-6: inline celebration, not a card."
5. **Palette Direction** — enhanced version of current Palette Direction. More specific about contrast, warmth/coolness, and restraint.

Add instruction to reference the composition library archetypes by name. Add instruction to avoid repeating the same archetype within a 3-day window (the agent can check recent archive briefs in its context).

- [ ] **Step 3: Run interpret-signals manually to verify output format**

```bash
node scripts/interpret-signals.js
```

Verify `signals/today.brief.md` now has the 5 new sections: Mood, Composition Direction, Typography Direction, Signal Integration, Palette Direction. Verify an archetype is named in Composition Direction.

- [ ] **Step 4: Commit**

```bash
git add scripts/interpret-signals.js
git commit -m "feat: structured brief with composition direction and signal integration"
```

---

### Task 3: Update Design Director Prompt

**Files:**
- Modify: `scripts/prompts/design-director.md`

- [ ] **Step 1: Read the current Design Director prompt**

Read `scripts/prompts/design-director.md` (lines 1-61). Note the 5 current output sections and the `===VISUAL_SPEC===` response format.

- [ ] **Step 2: Enhance the Design Director prompt**

Update the prompt to:

1. **Add reference awareness** — add a section explaining that the Director may receive reference material (curated library images + trending design signals + brief-driven references). Instruct it to draw compositional inspiration from references when provided, but not to copy them literally.

2. **Add composition vocabulary** — reference the composition library. The Director's Layout Specification section should now name a specific archetype and provide CSS-level layout hints, not just "Magazine" or "Gallery."

3. **Update Layout Specification section** — instead of picking from 5 patterns, the Director should:
   - Name the archetype from the composition library
   - Specify CSS grid/flex structure (e.g., `grid-template-columns: 1.5fr 1fr`)
   - Specify major dimensions (hero height, sidebar width, max content width)
   - Describe how signals are spatially integrated

4. **Add range-awareness instruction** — tell the Director: "You will receive the last 5 days of archived briefs. Do not repeat the same archetype, color family, or font pairing within a 3-day window. Push for variety."

5. **Keep the existing 5 output sections** but enhance Layout Specification as above.

- [ ] **Step 3: Commit**

```bash
git add scripts/prompts/design-director.md
git commit -m "feat: enhance Design Director with composition vocabulary and reference awareness"
```

---

### Task 4: Update Layout Architect Prompt and Layout Library

**Files:**
- Modify: `scripts/prompts/structure-agent.md`
- Modify: `scripts/prompts/library-layout.md`

- [ ] **Step 1: Read both files**

Read `scripts/prompts/structure-agent.md` (full file) and `scripts/prompts/library-layout.md` (full file).

- [ ] **Step 2: Update library-layout.md**

Replace the current 5 patterns (Magazine, Gallery, Scroll, Dashboard, Minimal) with the 8 archetypes from `library-composition.md`. For each archetype, include CSS code examples showing Grid/Flex structures that implement the pattern. Keep the existing spacing system and proportion rules sections.

- [ ] **Step 3: Update structure-agent.md**

Update the Layout Architect prompt to:

1. Reference the expanded composition library instead of the old 5 patterns.
2. Accept CSS-level layout hints from the Design Director's spec (e.g., "grid-template-columns: 1.5fr 1fr").
3. Emphasize that the architect should produce genuinely different structures — not just pick "Magazine" every time.
4. Add instruction: "The Design Director has specified an archetype and CSS hints. Use these as your starting point, but you own the final implementation. If the hint doesn't work structurally, adapt it."

- [ ] **Step 4: Run a full pipeline to verify nothing is broken**

```bash
# Use the dev panel at http://localhost:3000/dev to run a pipeline
# Verify it still completes successfully with the updated prompts
```

- [ ] **Step 5: Commit**

```bash
git add scripts/prompts/structure-agent.md scripts/prompts/library-layout.md
git commit -m "feat: expand Layout Architect to 8 composition archetypes with CSS-level hints"
```

---

### Task 5: Wire Composition Library into Agent Swarm

**Files:**
- Modify: `scripts/design-agents.js` (lines 254-275, prompt loading)

- [ ] **Step 1: Read the prompt loading section of design-agents.js**

Read `scripts/design-agents.js` lines 254-275 where all prompts and libraries are loaded via `Promise.all`.

- [ ] **Step 2: Add library-composition.md to the prompt loading**

Add `libComposition` to the `Promise.all` array that loads prompt files. Then append it to the Design Director's system prompt and the Layout Architect's system prompt.

In the `Promise.all` at lines 257-273, add `library-composition.md` as the 12th item. Update the destructuring assignment to include `libComposition`:

```javascript
const [
  directorPromptRaw,
  tokenPromptRaw, layoutPromptRaw, sidebarPromptRaw, footerPromptRaw, componentPromptRaw,
  designSystemRef, libTypography, libColor, libLayout, libComponents,
  libComposition,  // ← add this
] = await Promise.all([
  // ... existing 11 entries ...
  readFile(path.join(promptDir, 'library-composition.md'), 'utf8'),  // ← add this
])
```

Then update the system prompt construction (around lines 276-281):
```javascript
const directorSystemPrompt = `${directorPromptRaw}\n\n${libTypography}\n\n${libColor}\n\n${libLayout}\n\n${libComposition}`
const layoutSystemPrompt = `${layoutPromptRaw}\n\n${libLayout}\n\n${libComposition}\n\n${designSystemRef}`
```

- [ ] **Step 3: Feed recent archive briefs to Design Director**

In the `runAgentSwarm` function, before calling the Design Director, read the last 5 days of archive briefs and include them in the Director's user prompt. This enables the range check.

First, add the sync fs imports at the top of the file (around line 22, near existing imports):
```javascript
import { existsSync, readdirSync, readFileSync } from 'fs'
```

Note: `existsSync` is already imported — just add `readdirSync` and `readFileSync` to the existing import.

After the prompt loading section, add:
```javascript
// Read recent archive briefs for range checking
const archiveDir = path.join(ROOT, 'archive')
let recentBriefs = ''
try {
  const dirs = readdirSync(archiveDir)
    .filter(d => /^\d{4}-\d{2}-\d{2}$/.test(d))
    .sort()
    .reverse()
    .slice(0, 5)
  for (const dir of dirs) {
    const briefPath = path.join(archiveDir, dir, 'brief.md')
    if (existsSync(briefPath)) {
      const content = readFileSync(briefPath, 'utf8')
      recentBriefs += `\n### ${dir}\n${content}\n`
    }
  }
} catch {}
```

Then include `recentBriefs` in the Design Director's user prompt by adding it to `buildAgentPrompt`:
```javascript
const directorUserPrompt = buildAgentPrompt('design-director', {
  brief,
  referenceFiles: [],
  tokenContext: null,
}) + (recentBriefs ? `\n\n## Recent Archive Briefs (for range checking)\n${recentBriefs}` : '')
```

- [ ] **Step 4: Commit**

```bash
git add scripts/design-agents.js
git commit -m "feat: wire composition library and recent briefs into agent swarm"
```

---

## Chunk 2: Phase 2 — Spec Critic Gate

### Task 6: Create Spec Critic Prompt

**Files:**
- Create: `scripts/prompts/spec-critic.md`

- [ ] **Step 1: Write the spec critic prompt**

Create `scripts/prompts/spec-critic.md`:

```markdown
# Spec Critic

You are a design critic reviewing a visual specification before it gets built into code. Your job is to catch safe, repetitive, or unambitious designs before they waste build time.

You receive:
1. The structured brief (mood, composition, typography, signal integration, palette)
2. The Design Director's visual specification
3. Reference material provided to the Director (if any)
4. The last 5 days of archived design briefs

## Evaluation Criteria

### Compositional Ambition
Does the spec make a genuine layout choice? Or is it defaulting to a safe sidebar-plus-main-content grid? Look for:
- A named archetype from the composition library
- CSS-level layout hints that show structural intent
- A dominant visual idea (not just "put everything in a grid")

### Brief Fidelity
Does the spec respond to TODAY'S specific signals? Or could this spec be for any day? Check:
- Does the palette reflect the brief's mood?
- Does the composition direction match what the brief asked for?
- Are the specific signals (sports, weather, holidays) addressed?

### Range Check
Compare against the recent archive briefs. Flag if:
- Same archetype used within the last 3 days
- Same color hue family (within 30° on the color wheel) as yesterday
- Same font pairing as any of the last 3 days

### Signal Integration
Are signals woven into the composition as design elements? Or dumped into a sidebar panel? The brief's Signal Integration section specifies HOW each signal should appear — does the spec honor that?

### Reference Alignment
If reference material was provided, did the Director actually draw from it? This doesn't mean copying — it means compositional influence is visible.

## Response Format

Respond with exactly one of:

### If the spec is strong:
```
===VERDICT===
APPROVED
===END===
```

### If the spec needs revision:
```
===VERDICT===
REVISE

[Specific, actionable feedback. 2-5 bullet points. Each bullet names the problem and suggests a concrete alternative.]

Examples of good feedback:
- "This is a Magazine layout again — you used Magazine 3 of the last 5 days. The brief asks for poster energy. Try The Split or The Specimen."
- "Signals are specified as a sidebar panel. The brief says 'Tigers 13-6: inline celebration.' Weave the score into the hero or a typographic moment."
- "Color hue 158° is nearly identical to yesterday's 155°. Push to a different part of the wheel — the brief's 'cold snap' could be interpreted as blue-gray rather than green."
===END===
```

Be specific. "Try harder" is not feedback. Name the archetype, the hue range, the font alternative.
```

- [ ] **Step 2: Commit**

```bash
git add scripts/prompts/spec-critic.md
git commit -m "feat: add spec critic prompt for pre-build design review"
```

---

### Task 7: Insert Spec Critic Gate into Agent Swarm

**Files:**
- Modify: `scripts/design-agents.js` (insert between Phase 0 and Phase 1)

- [ ] **Step 1: Read the Design Director and Token Designer sections**

Read `scripts/design-agents.js` lines 290-330 to understand the exact insertion point between Phase 0 (Design Director) and Phase 1 (Token Designer).

- [ ] **Step 2: Load the spec critic prompt**

Add `specCriticPromptRaw` to the `Promise.all` prompt loading section and destructuring:
```javascript
// In destructuring, add:
specCriticPromptRaw,

// In Promise.all array, add:
readFile(path.join(promptDir, 'spec-critic.md'), 'utf8'),
```

Then construct the critic prompt variable (alongside the other system prompts):
```javascript
const specCriticPrompt = specCriticPromptRaw
```

- [ ] **Step 3: Insert the spec critic gate**

After the Design Director completes and `visualSpec` is extracted (around line 306), insert the critic gate:

```javascript
// -----------------------------------------------------------------------
// Spec Critic Gate — reviews visual spec for ambition and range
// -----------------------------------------------------------------------
try {
  console.log('\n[spec-critic] Reviewing visual spec...')
  const criticUserPrompt = [
    '## Structured Brief\n\n' + brief,
    '## Visual Specification\n\n' + visualSpec,
    recentBriefs ? '## Recent Archive Briefs\n' + recentBriefs : '',
  ].filter(Boolean).join('\n\n---\n\n')

  const criticResult = await callAgent('spec-critic', specCriticPrompt, criticUserPrompt)
  const rawResponse = criticResult._rawResponse || criticResult.rationale || ''

  if (rawResponse.includes('REVISE')) {
    const feedback = rawResponse.replace(/===VERDICT===/, '').replace(/===END===/, '').replace('REVISE', '').trim()
    console.log(`  [spec-critic] REVISE: ${feedback.slice(0, 200)}...`)
    console.log('\n[spec-critic] Design Director revising...')

    // Re-run Design Director with critic feedback
    const revisionPrompt = directorUserPrompt + '\n\n---\n\n## Critic Feedback (revise your spec)\n\n' + feedback
    try {
      const revisedResult = await callAgent('design-director', directorSystemPrompt, revisionPrompt)
      visualSpec = revisedResult._rawResponse || revisedResult.rationale || visualSpec
      console.log(`  [spec-critic] Revision complete. visual spec: ${(visualSpec.length / 1024).toFixed(0)}KB`)
    } catch (err) {
      console.warn(`  [spec-critic] Director revision failed (non-blocking): ${err.message}`)
    }
  } else {
    console.log('  [spec-critic] APPROVED')
  }
} catch (err) {
  console.warn(`  [spec-critic] Critic failed (non-blocking): ${err.message}`)
  console.warn('  Proceeding without spec review')
}
```

- [ ] **Step 4: Run a full pipeline to verify the critic gate works**

Run the pipeline via the dev panel. Verify:
- The spec critic log line appears in the output
- If APPROVED, pipeline continues normally
- If REVISE, Director revises and pipeline continues
- If critic fails, pipeline continues with original spec

- [ ] **Step 5: Commit**

```bash
git add scripts/design-agents.js scripts/prompts/spec-critic.md
git commit -m "feat: add spec critic gate between Design Director and Token Designer"
```

---

## Chunk 3: Phase 3 — Reference System

### Task 8: Add Dribbble Signal Provider

**Files:**
- Create: `scripts/signals/dribbble.js`

- [ ] **Step 1: Read an existing signal provider for the pattern**

Read `scripts/signals/weather.js` or `scripts/signals/news.js` to understand the exact provider interface: `export const name`, `export const timeout`, `export async function collect(profile)`.

- [ ] **Step 2: Create the Dribbble provider**

Create `scripts/signals/dribbble.js` that fetches Dribbble's popular shots RSS feed:

```javascript
export const name = 'dribbble'
export const timeout = 10000

export async function collect() {
  const RSS_URL = 'https://dribbble.com/shots/popular.rss'

  const res = await fetch(RSS_URL, {
    headers: { 'User-Agent': 'DougMarch-DailyRedesign/1.0' },
    signal: AbortSignal.timeout(8000),
  })

  if (!res.ok) throw new Error(`Dribbble RSS ${res.status}`)

  const xml = await res.text()

  // Parse RSS items (simple regex — RSS is well-structured)
  const items = []
  const itemPattern = /<item>([\s\S]*?)<\/item>/g
  let match
  while ((match = itemPattern.exec(xml)) !== null && items.length < 8) {
    const block = match[1]
    const title = block.match(/<title><!\[CDATA\[(.*?)\]\]>/)?.[1] || block.match(/<title>(.*?)<\/title>/)?.[1] || ''
    const link = block.match(/<link>(.*?)<\/link>/)?.[1] || ''
    const creator = block.match(/<dc:creator><!\[CDATA\[(.*?)\]\]>/)?.[1] || ''
    items.push({ title, link, creator })
  }

  return {
    data: { trending: items.slice(0, 5) },
    meta: { source: RSS_URL, items: items.length },
  }
}
```

- [ ] **Step 3: Test the provider**

```bash
node -e "import('./scripts/signals/dribbble.js').then(m => m.collect()).then(r => console.log(JSON.stringify(r, null, 2))).catch(e => console.error(e.message))"
```

Verify it returns trending shots or fails gracefully. If Dribbble blocks the RSS feed, the provider throws and the collector skips it (existing behavior for failed providers).

- [ ] **Step 4: Commit**

```bash
git add scripts/signals/dribbble.js
git commit -m "feat: add Dribbble trending signal provider via RSS"
```

---

### Task 9: Add Awwwards Signal Provider

**Files:**
- Create: `scripts/signals/awwwards.js`

- [ ] **Step 1: Create the Awwwards provider**

Create `scripts/signals/awwwards.js`. Awwwards doesn't have a public RSS feed, so use a web fetch of their homepage or SOTD page and extract key info:

```javascript
export const name = 'awwwards'
export const timeout = 10000

export async function collect() {
  const URL = 'https://www.awwwards.com/websites/sites-of-the-day/'

  const res = await fetch(URL, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; DougMarch-DailyRedesign/1.0)',
      'Accept': 'text/html',
    },
    signal: AbortSignal.timeout(8000),
  })

  if (!res.ok) throw new Error(`Awwwards ${res.status}`)

  const html = await res.text()

  // Extract SOTD entries from the page (best-effort parsing)
  const sites = []
  const titlePattern = /<h2[^>]*class="[^"]*heading[^"]*"[^>]*>([\s\S]*?)<\/h2>/gi
  let match
  while ((match = titlePattern.exec(html)) !== null && sites.length < 5) {
    const title = match[1].replace(/<[^>]+>/g, '').trim()
    if (title) sites.push({ title })
  }

  // If HTML parsing fails to find structured data, extract a summary
  if (sites.length === 0) {
    // Fallback: just note that we checked Awwwards
    return {
      data: { note: 'Awwwards checked but could not parse SOTD entries' },
      meta: { source: URL, items: 0 },
    }
  }

  return {
    data: { sites_of_the_day: sites },
    meta: { source: URL, items: sites.length },
  }
}
```

- [ ] **Step 2: Test the provider**

```bash
node -e "import('./scripts/signals/awwwards.js').then(m => m.collect()).then(r => console.log(JSON.stringify(r, null, 2))).catch(e => console.error(e.message))"
```

- [ ] **Step 3: Commit**

```bash
git add scripts/signals/awwwards.js
git commit -m "feat: add Awwwards SOTD signal provider"
```

---

### Task 10: Create Curated Reference Library Structure

**Files:**
- Create: `references/index.yml`
- Create: `references/README.md`

- [ ] **Step 1: Create the references directory and index**

Create `references/index.yml` with a starter structure. Initially empty — the user will populate this over time. Include a few placeholder entries to demonstrate the format:

```yaml
# Curated Design Reference Library
# Add screenshots to this directory and index them here.
# The pipeline selects 3-5 relevant references based on the daily brief.
#
# Tags:
#   composition: poster | broadsheet | gallery | scroll | split | stack | specimen | index
#   mood: warm | cold | energetic | calm | dramatic | minimal | playful | serious
#   density: sparse | moderate | dense

references:
  # Example entry (uncomment and add your own):
  # - file: editorial-01.png
  #   url: https://example.com/inspiration
  #   description: "Full-bleed editorial layout with oversized serif headings"
  #   tags:
  #     composition: poster
  #     mood: dramatic
  #     density: sparse
```

- [ ] **Step 2: Create README.md for the references directory**

```markdown
# Design Reference Library

Drop screenshots of designs you admire into this directory and index them in `index.yml`.

The pipeline selects 3-5 relevant references each day based on the brief's composition direction and mood. The Design Director uses these as compositional inspiration.

## How to add a reference

1. Save a screenshot (PNG or JPG) to this directory
2. Add an entry to `index.yml` with tags
3. The pipeline will pick it up automatically

## Tag values

- **composition:** poster, broadsheet, gallery, scroll, split, stack, specimen, index
- **mood:** warm, cold, energetic, calm, dramatic, minimal, playful, serious
- **density:** sparse, moderate, dense
```

- [ ] **Step 3: Add references/ to .gitignore for images but track index**

The YAML index should be tracked but large screenshot files should not. Add to `.gitignore`:

```
references/*.png
references/*.jpg
references/*.jpeg
```

- [ ] **Step 4: Commit**

```bash
git add references/index.yml references/README.md .gitignore
git commit -m "feat: create curated reference library structure"
```

---

### Task 11: Create Reference Collection Script

**Files:**
- Create: `scripts/collect-references.js`

- [ ] **Step 1: Write the reference collection script**

Create `scripts/collect-references.js` that:
1. Reads the curated library (`references/index.yml`) and selects relevant entries based on brief tags
2. Reads Dribbble/Awwwards data from `signals/today.yml` (already collected)
3. Outputs `signals/today.references.md` with formatted reference material

```javascript
#!/usr/bin/env node

/**
 * Collect References for Design Director
 *
 * Reads curated library + trending design signals and produces
 * a references file for the Design Director.
 */

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import yaml from 'js-yaml'

const ROOT = resolve(fileURLToPath(import.meta.url), '../..')

export function collectReferences(briefText) {
  const sections = []

  // Layer 1: Curated Library
  const indexPath = resolve(ROOT, 'references/index.yml')
  if (existsSync(indexPath)) {
    try {
      const index = yaml.load(readFileSync(indexPath, 'utf8'))
      const refs = index?.references || []
      if (refs.length > 0) {
        // Simple keyword matching against brief text for relevance
        const briefLower = briefText.toLowerCase()
        const scored = refs.map(ref => {
          let score = 0
          const tags = ref.tags || {}
          // Check if composition archetype is mentioned in brief
          if (tags.composition && briefLower.includes(tags.composition)) score += 3
          // Check mood match
          if (tags.mood && briefLower.includes(tags.mood)) score += 2
          // Check density match
          if (tags.density && briefLower.includes(tags.density)) score += 1
          return { ...ref, score }
        })

        const selected = scored
          .filter(r => r.score > 0)
          .sort((a, b) => b.score - a.score)
          .slice(0, 5)

        if (selected.length > 0) {
          const entries = selected.map(r =>
            `- **${r.file || r.url}** — ${r.description || 'No description'} (${Object.values(r.tags || {}).join(', ')})`
          ).join('\n')
          sections.push(`## Curated References\n\n${entries}`)
        }
      }
    } catch (err) {
      console.warn(`  [references] curated library error: ${err.message}`)
    }
  }

  // Layer 2: Trending Design Signals (from today.yml)
  const signalsPath = resolve(ROOT, 'signals/today.yml')
  if (existsSync(signalsPath)) {
    try {
      const signals = yaml.load(readFileSync(signalsPath, 'utf8'))

      if (signals.dribbble?.trending?.length > 0) {
        const entries = signals.dribbble.trending.slice(0, 5).map(shot =>
          `- **${shot.title}** by ${shot.creator || 'unknown'} — [view](${shot.link})`
        ).join('\n')
        sections.push(`## Trending on Dribbble\n\n${entries}`)
      }

      if (signals.awwwards?.sites_of_the_day?.length > 0) {
        const entries = signals.awwwards.sites_of_the_day.slice(0, 3).map(site =>
          `- **${site.title}**`
        ).join('\n')
        sections.push(`## Awwwards Sites of the Day\n\n${entries}`)
      }
    } catch (err) {
      console.warn(`  [references] signals read error: ${err.message}`)
    }
  }

  if (sections.length === 0) {
    return null
  }

  return sections.join('\n\n---\n\n')
}

// CLI entry point
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const briefPath = resolve(ROOT, 'signals/today.brief.md')
  const brief = existsSync(briefPath) ? readFileSync(briefPath, 'utf8') : ''
  const result = collectReferences(brief)
  if (result) {
    const outPath = resolve(ROOT, 'signals/today.references.md')
    writeFileSync(outPath, result, 'utf8')
    console.log(`Written to ${outPath}`)
    console.log(result)
  } else {
    console.log('No references found')
  }
}
```

- [ ] **Step 2: Test the script**

```bash
node scripts/collect-references.js
```

Verify it produces output (or "No references found" if curated library is empty and Dribbble/Awwwards signals aren't in today.yml yet).

- [ ] **Step 3: Commit**

```bash
git add scripts/collect-references.js
git commit -m "feat: add reference collection script (curated library + trending signals)"
```

---

### Task 12: Wire References into Pipeline

**Files:**
- Modify: `scripts/design-agents.js`
- Modify: `scripts/run-pipeline.js`

- [ ] **Step 1: Add reference collection to run-pipeline.js**

In `scripts/run-pipeline.js`, add a reference collection step after signal interpretation but before the daily-redesign stage. This is non-blocking:

```javascript
// After Stage 2 (interpret signals), before Stage 3:
try {
  run('Stage 2.5: Collect References', 'node scripts/collect-references.js')
} catch (err) {
  console.warn('Reference collection failed (non-blocking):', err.message)
}
```

- [ ] **Step 2: Wire references into the Design Director's input in design-agents.js**

In `runAgentSwarm()`, after reading the brief, read the references file and include it in the Design Director's user prompt:

```javascript
// Read references if available
const referencesPath = path.resolve(ROOT, 'signals/today.references.md')
let references = ''
if (existsSync(referencesPath)) {
  references = await readFile(referencesPath, 'utf8')
  console.log(`  using references (${references.length} chars)`)
}
```

Then update the `directorUserPrompt` construction (this replaces the version from Task 5 Step 3 — the final version includes both `recentBriefs` AND `references`):
```javascript
const directorUserPrompt = buildAgentPrompt('design-director', {
  brief,
  referenceFiles: [],
  tokenContext: null,
}) + (recentBriefs ? '\n\n## Recent Archive Briefs\n' + recentBriefs : '')
  + (references ? '\n\n## Design References\n\n' + references : '')
```

**Note:** If implementing Phase 3 after Phase 1, find the `directorUserPrompt` line from Task 5 and extend it rather than creating a second definition.

- [ ] **Step 3: Run a full pipeline to verify references flow through**

Run the pipeline via dev panel. Check logs for:
- "Stage 2.5: Collect References" appearing
- "using references (X chars)" in the design agents output
- Pipeline completes successfully

- [ ] **Step 4: Commit**

```bash
git add scripts/design-agents.js scripts/run-pipeline.js
git commit -m "feat: wire reference system into pipeline and Design Director input"
```

---

## Chunk 4: Phase 4 — Screenshot Critic Gate

### Task 13: Extend Snapshot Utility with Screenshot Capture

**Files:**
- Modify: `scripts/utils/snapshot.js`

- [ ] **Step 1: Read the existing snapshot.js**

Read `scripts/utils/snapshot.js` to understand the Vite preview server spin-up logic. The `captureSnapshot()` function (line 89) already starts a Vite preview server on a random port, waits for it to be ready, then fetches HTML. We'll add a parallel function that uses Playwright to take a pixel screenshot.

- [ ] **Step 2: Add `captureScreenshot()` function**

Add a new exported function to `snapshot.js`:

```javascript
/**
 * Capture a PNG screenshot of the rendered homepage.
 * Spins up a Vite preview server (like captureSnapshot) and uses
 * Playwright to render the page and take a screenshot.
 *
 * @param {number} [port] - Optional port. If provided, assumes server is already running.
 * @returns {Promise<Buffer>} PNG image buffer
 */
export async function captureScreenshot(port) {
  const { chromium } = await import('playwright')

  let server = null
  let serverPort = port

  // Spin up preview server if no port provided
  if (!serverPort) {
    serverPort = 14000 + Math.floor(Math.random() * 1000)
    server = spawn('npx', ['vite', 'preview', '--port', String(serverPort)], {
      cwd: ROOT,
      stdio: 'pipe',
    })

    // Wait for server to be ready
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('Preview server timeout')), 15000)
      server.stdout.on('data', (chunk) => {
        if (chunk.toString().includes('Local:')) {
          clearTimeout(timeout)
          resolve()
        }
      })
      server.on('error', (err) => { clearTimeout(timeout); reject(err) })
    })
  }

  try {
    const browser = await chromium.launch({ headless: true })
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
    await page.goto(`http://localhost:${serverPort}/`, { waitUntil: 'networkidle' })
    // Wait a moment for fonts to load
    await page.waitForTimeout(1000)
    const screenshot = await page.screenshot({ type: 'png', fullPage: false })
    await browser.close()
    return screenshot
  } finally {
    if (server) {
      server.kill()
    }
  }
}
```

- [ ] **Step 3: Test the screenshot function**

```bash
node -e "
import { captureScreenshot } from './scripts/utils/snapshot.js'
import { writeFileSync } from 'fs'
const buf = await captureScreenshot()
writeFileSync('/tmp/test-screenshot.png', buf)
console.log('Screenshot saved to /tmp/test-screenshot.png')
"
```

Open `/tmp/test-screenshot.png` and verify it shows the current homepage.

- [ ] **Step 4: Commit**

```bash
git add scripts/utils/snapshot.js
git commit -m "feat: add Playwright screenshot capture to snapshot utility"
```

---

### Task 14: Create Screenshot Critic Prompt

**Files:**
- Create: `scripts/prompts/screenshot-critic.md`

- [ ] **Step 1: Write the screenshot critic prompt**

Create `scripts/prompts/screenshot-critic.md`:

```markdown
# Screenshot Critic

You are a design critic evaluating a rendered web page against its design specification. You receive a screenshot of the built homepage along with the original brief and visual spec.

Your job is to catch compositional problems, visual hierarchy failures, and spec deviations AFTER the code has been built and rendered.

## What You Receive

1. A screenshot of the rendered homepage (as an image)
2. The structured brief that guided the design
3. The Design Director's visual specification
4. Reference material (if any)

## Evaluation Criteria

### Visual Hierarchy
- Is there a clear dominant element? Does the eye know where to go first?
- Or is everything the same visual weight — a flat, undifferentiated page?

### Spec Fidelity
- Does the rendered result match the Director's spec?
- Right archetype/layout structure?
- Right color palette (approximate — exact hex isn't expected)?
- Right typography character (serif vs sans, scale, spacing)?

### Readability
- Is body text readable against its background?
- Are navigation links visible and findable?
- Can you actually use the site?

### Compositional Coherence
- Do the parts feel like ONE design?
- Or does it look like 5 different agents each made isolated decisions?
- Consistent spacing, border treatments, type sizing across sections?

### Polish
- Any obvious broken elements: text overflow, overlapping elements, invisible links?
- Awkward gaps or cramped sections?
- Elements that look misaligned?

## Response Format

Respond with exactly one of:

### If the design is ready to ship:
```
===VERDICT===
SHIP
===END===
```

### If the design needs revision:
```
===VERDICT===
REVISE

**Responsible agent:** [token-designer | layout-architect | sidebar-designer | footer-designer | component-agent]

**Issues:**
- [Specific issue with concrete fix suggestion]
- [Another issue]

===END===
```

Name the responsible agent so the pipeline knows which agent to re-run. If multiple agents are responsible, name the one whose fix would have the biggest impact.

Be specific about what's wrong and what would fix it. "The hierarchy is flat" is not enough — say "The featured project heading and the sidebar heading are the same size. The featured project should be 2-3x larger."
```

- [ ] **Step 2: Commit**

```bash
git add scripts/prompts/screenshot-critic.md
git commit -m "feat: add screenshot critic prompt for post-build visual review"
```

---

### Task 15: Insert Screenshot Critic Gate into Agent Swarm

**Files:**
- Modify: `scripts/design-agents.js`

- [ ] **Step 1: Read the build validation section**

Read `scripts/design-agents.js` lines 464-490 (Phase 4: Build validation and success path). The screenshot critic gate goes between build success and archiving.

- [ ] **Step 2: Load the screenshot critic prompt**

Add to the `Promise.all` prompt loading:
```javascript
readFile(path.join(promptDir, 'screenshot-critic.md'), 'utf8'),
```

- [ ] **Step 3: Insert the screenshot critic gate after build success**

After build validation passes (around line 468 `if (buildResult.success)`) but before archiving, insert:

```javascript
if (buildResult.success) {
  console.log('\n=== Build passed! ===')

  // Screenshot Critic Gate
  try {
    console.log('\n[screenshot-critic] Capturing screenshot...')
    const { captureScreenshot } = await import('./utils/snapshot.js')
    const screenshotBuffer = await captureScreenshot()
    console.log(`  screenshot captured (${(screenshotBuffer.length / 1024).toFixed(0)}KB)`)

    console.log('[screenshot-critic] Evaluating design...')
    const criticUserPrompt = [
      '## Structured Brief\n\n' + brief,
      '## Visual Specification\n\n' + visualSpec,
      references ? '## Design References\n\n' + references : '',
      '\n\nA screenshot of the rendered homepage is attached as a base64 PNG image below.\n\n' +
      '![Homepage Screenshot](data:image/png;base64,' + screenshotBuffer.toString('base64') + ')',
    ].filter(Boolean).join('\n\n---\n\n')

    const screenshotCriticResult = await callAgent('screenshot-critic', screenshotCriticPrompt, criticUserPrompt)
    const criticResponse = screenshotCriticResult._rawResponse || screenshotCriticResult.rationale || ''

    if (criticResponse.includes('REVISE')) {
      // Extract responsible agent and feedback
      const agentMatch = criticResponse.match(/\*\*Responsible agent:\*\*\s*([\w-]+)/)
      const responsibleAgent = agentMatch?.[1] || 'layout-architect'
      const feedback = criticResponse.replace(/===VERDICT===/, '').replace(/===END===/, '').replace('REVISE', '').trim()

      console.log(`  [screenshot-critic] REVISE — responsible: ${responsibleAgent}`)
      console.log(`  feedback: ${feedback.slice(0, 200)}...`)

      // Re-run the responsible agent with feedback
      const agentConfig = {
        'token-designer': { prompt: tokenSystemPrompt, user: () => buildAgentPrompt('token-designer', { brief: tokenBrief, referenceFiles: [], tokenContext: null }) },
        'layout-architect': { prompt: layoutSystemPrompt, user: () => buildAgentPrompt('layout-architect', { brief: enrichedBrief, referenceFiles: [], tokenContext }) },
        'sidebar-designer': { prompt: sidebarSystemPrompt, user: () => buildAgentPrompt('sidebar-designer', { brief: enrichedBrief, referenceFiles: layoutRef, tokenContext }) },
        'footer-designer': { prompt: footerSystemPrompt, user: () => buildAgentPrompt('footer-designer', { brief: enrichedBrief, referenceFiles: layoutRef, tokenContext }) },
        'component-agent': { prompt: componentSystemPrompt, user: () => buildAgentPrompt('component-agent', { brief: enrichedBrief, referenceFiles: [], tokenContext }) },
      }

      const config = agentConfig[responsibleAgent]
      if (config) {
        console.log(`  retrying ${responsibleAgent} with critic feedback...`)
        try {
          const retryResult = await callAgent(responsibleAgent, config.prompt, config.user(), feedback)
          await writeFiles(retryResult.files)

          // Re-validate build after revision
          const retryBuild = validateBuild()
          if (!retryBuild.success) {
            console.warn('  post-critic revision broke the build — restoring pre-revision files')
            // Restore only the revised agent's files from backup
            const filesToRestore = new Map()
            for (const [filePath, content] of originalBackup.entries()) {
              const owner = FILE_OWNERSHIP[filePath]
              if (owner === responsibleAgent) {
                filesToRestore.set(filePath, content)
              }
            }
            await restore(filesToRestore)
            // Re-run codegen if token files were restored
            if (responsibleAgent === 'token-designer') validateCodegen()
          } else {
            console.log('  post-critic revision build passed')
          }
        } catch (err) {
          console.warn(`  ${responsibleAgent} revision failed (non-blocking): ${err.message}`)
        }
      }
    } else {
      console.log('  [screenshot-critic] SHIP')
    }
  } catch (err) {
    console.warn(`  [screenshot-critic] Failed (non-blocking): ${err.message}`)
    console.warn('  Shipping without screenshot review')
  }

  // Archive (original code continues here)
  const allFiles = [
```

- [ ] **Step 4: Run a full pipeline to verify the screenshot critic works**

Run the pipeline via dev panel. Verify:
- "Capturing screenshot..." appears in logs
- "Evaluating design..." appears
- Either SHIP or REVISE verdict appears
- Pipeline completes and archives successfully regardless of critic outcome

- [ ] **Step 5: Commit**

```bash
git add scripts/design-agents.js
git commit -m "feat: add screenshot critic gate with post-build visual review"
```

---

### Task 16: Final Integration Test

- [ ] **Step 1: Run a full pipeline with all 4 phases active**

Run the pipeline via the dev panel at http://localhost:3000/dev. Verify the complete flow:
- Signals collected (including Dribbble/Awwwards)
- References collected
- Structured brief generated (5 sections)
- Design Director produces spec with named archetype
- Spec Critic evaluates and either approves or triggers one revision
- Agent swarm builds the design
- Build validation passes
- Screenshot Critic evaluates and either ships or triggers one revision
- Archive + commit

- [ ] **Step 2: Verify the design output has more compositional variety**

Compare the new output against the archived designs from the last few days. The new design should show a different archetype/structure, not just different colors on the same grid.
