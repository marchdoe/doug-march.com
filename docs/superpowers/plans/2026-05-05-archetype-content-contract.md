# Archetype-Conditional Content Contract Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Specimen/Poster home pages contain only the hero phrase + navigation, with the UD system prompt, a runtime orchestrator injection, and the screenshot critic all enforcing and validating this contract.

**Architecture:** Three-layer defense — (1) UD system prompt conditional data-render rule, (2) per-run archetype contract block prepended to the UD user prompt by the orchestrator closure, (3) screenshot critic Section 8 enforces the rule and routes REVISE verdicts to the only real agent (`unified-designer`).

**Tech Stack:** Node.js ESM, Vitest (tests), markdown prompt files

---

### Task 1: Extract and test `buildArchetypeContractBlock`

This pure function is the source of truth for the archetype injection. Extracting it makes it testable and keeps the closure clean.

**Files:**
- Modify: `scripts/design-agents.js` (add export before `runAgentSwarm`)
- Modify: `tests/scripts/design-agents.test.js` (add describe block)

- [ ] **Step 1: Write the failing tests**

Open `tests/scripts/design-agents.test.js`. The existing import block at lines 2–9 is:

```javascript
import {
  FILE_OWNERSHIP,
  buildAgentPrompt,
  identifyFailingAgent,
  extractArchetypeFromText,
  parseDelimiterResponse,
  resolveChassisFromDirectorOutput,
} from '../../scripts/design-agents.js'
```

Add `buildArchetypeContractBlock` to it:

```javascript
import {
  FILE_OWNERSHIP,
  buildAgentPrompt,
  identifyFailingAgent,
  extractArchetypeFromText,
  parseDelimiterResponse,
  resolveChassisFromDirectorOutput,
  buildArchetypeContractBlock,
} from '../../scripts/design-agents.js'
```

Then add a new describe block at the bottom of the file (after all existing describes):

```javascript
describe('buildArchetypeContractBlock', () => {
  it('returns override block for Specimen', () => {
    const block = buildArchetypeContractBlock('Specimen')
    expect(block).toContain('ARCHETYPE CONTRACT — SPECIMEN')
    expect(block).toContain('hero phrase + navigation ONLY')
    expect(block).toContain('Do NOT render project cards')
  })

  it('returns override block for Poster', () => {
    const block = buildArchetypeContractBlock('Poster')
    expect(block).toContain('ARCHETYPE CONTRACT — POSTER')
    expect(block).toContain('hero phrase + navigation ONLY')
  })

  it('returns empty string for all other archetypes', () => {
    expect(buildArchetypeContractBlock('Broadsheet')).toBe('')
    expect(buildArchetypeContractBlock('Scroll')).toBe('')
    expect(buildArchetypeContractBlock('Stack')).toBe('')
    expect(buildArchetypeContractBlock('Gallery Wall')).toBe('')
    expect(buildArchetypeContractBlock('Split')).toBe('')
    expect(buildArchetypeContractBlock('Index')).toBe('')
    expect(buildArchetypeContractBlock(undefined)).toBe('')
    expect(buildArchetypeContractBlock(null)).toBe('')
  })
})
```

- [ ] **Step 2: Run tests — confirm they fail**

```bash
pnpm vitest run tests/scripts/design-agents.test.js
```

Expected: 3 new failures with `buildArchetypeContractBlock is not a function` or similar.

- [ ] **Step 3: Add the export to `scripts/design-agents.js`**

Find the block of `export function` declarations (around line 87). Add after `identifyFailingAgent` (around line 244) but before `runAgentSwarm` (line 387):

```javascript
export function buildArchetypeContractBlock(archetype) {
  if (archetype === 'Specimen' || archetype === 'Poster') {
    return `⚠ ARCHETYPE CONTRACT — ${archetype.toUpperCase()}:
Home page = hero phrase + navigation ONLY.
Do NOT render project cards, featured project, experiments, or any portfolio section.
index.tsx is a single-composition canvas today, not a portfolio hub.`
  }
  return ''
}
```

- [ ] **Step 4: Run tests — confirm they pass**

```bash
pnpm vitest run tests/scripts/design-agents.test.js
```

Expected: all tests pass including the 3 new ones.

- [ ] **Step 5: Commit**

```bash
git add scripts/design-agents.js tests/scripts/design-agents.test.js
git commit -m "feat(orchestrator): add buildArchetypeContractBlock for Specimen/Poster injection"
```

---

### Task 2: Wire injection into `buildUnifiedDesignerPrompt`

`buildUnifiedDesignerPrompt` is a closure defined at line 968 of `scripts/design-agents.js`. It already closes over `chosenArchetype` (set at line 737). Modify the closure to prepend the contract block. Both `agentConfig` objects (screenshot-critic retry at line 1127, build-failure retry at line 1234) reference this closure as `user: buildUnifiedDesignerPrompt` and call it as `config.user()` — they automatically pick up the change with no further edits.

**Files:**
- Modify: `scripts/design-agents.js` (~line 968, inside `runAgentSwarm`)

- [ ] **Step 1: Locate and modify the closure**

Find the `buildUnifiedDesignerPrompt` closure (around line 968):

```javascript
const buildUnifiedDesignerPrompt = () => {
  const { messages } = buildMessages({
    signals,
    brief: enrichedBrief,
    contentSummary: '',
    currentFiles: [],
    tokenContext,
    responsiveLesson,
  })
  return messages[0].content
    + (recentRatings ? '\n\n## User Design Ratings (learn from these)\n\nThe site owner rates each design after it ships. Higher scores = what they want to see more of. Notes explain what specifically worked or didn\'t.\n' + recentRatings : '')
    + weightsPrompt
}
```

Replace it with:

```javascript
const buildUnifiedDesignerPrompt = () => {
  const { messages } = buildMessages({
    signals,
    brief: enrichedBrief,
    contentSummary: '',
    currentFiles: [],
    tokenContext,
    responsiveLesson,
  })
  const archetypeBlock = buildArchetypeContractBlock(chosenArchetype)
  return (archetypeBlock ? archetypeBlock + '\n\n' : '')
    + messages[0].content
    + (recentRatings ? '\n\n## User Design Ratings (learn from these)\n\nThe site owner rates each design after it ships. Higher scores = what they want to see more of. Notes explain what specifically worked or didn\'t.\n' + recentRatings : '')
    + weightsPrompt
}
```

- [ ] **Step 2: Run full test suite — confirm nothing broke**

```bash
pnpm vitest run
```

Expected: all tests pass. (The closure is not directly unit-tested — `buildArchetypeContractBlock` covers the logic, and the closure wiring is validated by the integration path.)

- [ ] **Step 3: Commit**

```bash
git add scripts/design-agents.js
git commit -m "feat(orchestrator): inject archetype content contract into UD user prompt"
```

---

### Task 3: UD system prompt — conditional data-render contract

The flat "Home page must render" block (lines 150–153 of `scripts/prompts/unified-designer.md`) is replaced with a two-branch conditional. A DO NOT entry is added to close the implicit loophole.

**Files:**
- Modify: `scripts/prompts/unified-designer.md`

- [ ] **Step 1: Replace the home page data-render block**

Find and replace in `scripts/prompts/unified-designer.md`:

Old (lines 150–153):
```markdown
**Home page must render:**
- Featured project: title, problem statement, external link
- Each selected-work project: title, type, year, and a link to `/work/$slug`
- Each experiment: title, type, year, and a link (internal or external)
```

New:
```markdown
**Home page content contract — varies by archetype:**

**Specimen / Poster:** Home page IS the hero phrase. Render ONLY: the hero phrase at full-page scale, navigation, and optional signal annotation. Do NOT render a project listing, featured project section, or experiments section. Projects are reachable via navigation.

**All other archetypes:** Must render:
- Featured project: title, problem statement, external link
- Each selected-work project: title, type, year, and a link to `/work/$slug`
- Each experiment: title, type, year, and a link (internal or external)
```

- [ ] **Step 2: Add to the DO NOT list**

Find in `scripts/prompts/unified-designer.md` (around line 140):
```markdown
- Stack three identical card grids down the page. Vary scale, density, or treatment between sections
```

Add after it:
```markdown
- For Specimen/Poster days, render a project listing, featured project section, or experiments below the hero phrase — the phrase IS the entire page and projects are reachable via navigation
```

- [ ] **Step 3: Run full test suite — confirm nothing broke**

```bash
pnpm vitest run
```

Expected: all tests pass. (Prompt-only change, no code affected.)

- [ ] **Step 4: Commit**

```bash
git add scripts/prompts/unified-designer.md
git commit -m "feat(ud-prompt): conditional home page data-render contract for Specimen/Poster"
```

---

### Task 4: Screenshot critic — fix stale agents + add Section 8

Three edits to `scripts/prompts/screenshot-critic.md`: fix a stale `layout-architect` mention in Section 6, replace the five stale responsible agents with `unified-designer` only, and add Section 8 enforcing Specimen/Poster archetype purity.

**Files:**
- Modify: `scripts/prompts/screenshot-critic.md`

- [ ] **Step 1: Fix stale `layout-architect` in Section 6**

Find (around line 82):
```markdown
Failures: A 40%-wide column of body text on the left half of the page with a 60% empty cream rail on the right. Specimen archetype but headline rendered at body-article scale. Index archetype but only one list, narrow, in a single column. When this fails, owner is **layout-architect**.
```

Replace with:
```markdown
Failures: A 40%-wide column of body text on the left half of the page with a 60% empty cream rail on the right. Specimen archetype but headline rendered at body-article scale. Index archetype but only one list, narrow, in a single column. When this fails, owner is **unified-designer**.
```

- [ ] **Step 2: Add Section 8 — Archetype Purity**

Find the line `## Verdict Rules` and insert the new section directly before it:

```markdown
### 8. Archetype Purity (Specimen / Poster days only)

Skip this section entirely if the archetype is not Specimen or Poster.

For Specimen and Poster days: The home page IS the hero phrase. There must be NO visible project cards, NO work grid, NO "Selected Work" heading, NO featured project section, and NO experiments section on the home page. Projects are accessible only via navigation.

Check:
- Are any project cards, project titles, or a "Selected Work" / "Experiments" section visible on the home page?
- Is any content other than the hero phrase, navigation, and optional signal annotation visible?

If yes to either: REVISE. Responsible agent: unified-designer.

```

- [ ] **Step 3: Replace the stale responsible agents list**

Find and replace the entire Responsible Agents block:

Old:
```markdown
### Responsible Agents

Assign the revision to exactly one agent. Choose based on scope:

- **token-designer** — Color is wrong, fonts did not load, spacing scale is off throughout the entire site
- **layout-architect** — Page structure is wrong: nav placement, column proportions, overall grid, section order
- **sidebar-designer** — Sidebar-specific issues: sidebar content, sidebar layout, sidebar styling
- **footer-designer** — Footer-specific issues: footer content, footer layout, footer styling
- **component-agent** — Individual component problems: card styling, typography within components, component-level layout, visual hierarchy between heading and body within a section

When in doubt about which agent owns a problem, pick the one whose scope is closest to the surface where the issue appears.
```

New:
```markdown
### Responsible Agents

All revisions go to **unified-designer**. It owns the entire rendered output: color, fonts, layout structure, nav placement, component styling, hero phrase execution, and archetype purity.
```

- [ ] **Step 4: Update the SHIP verdict rule**

Find:
```markdown
**SHIP** if: All seven areas are acceptable. Minor imperfections are fine — no build is perfect. Ship when a real visitor would have a good experience and the design intent is clearly executed.
```

Replace with:
```markdown
**SHIP** if: All applicable areas are acceptable — seven standard areas, plus Section 8 if the archetype is Specimen or Poster. Minor imperfections are fine — no build is perfect. Ship when a real visitor would have a good experience and the design intent is clearly executed.
```

- [ ] **Step 5: Run full test suite — confirm nothing broke**

```bash
pnpm vitest run
```

Expected: all tests pass. (Prompt-only change.)

- [ ] **Step 6: Commit**

```bash
git add scripts/prompts/screenshot-critic.md
git commit -m "fix(screenshot-critic): replace stale agent names with unified-designer; add Section 8 archetype purity check"
```

---

### Task 5: Verification

Confirm all changes are internally consistent and tests pass cleanly.

- [ ] **Step 1: Run full test suite one final time**

```bash
pnpm vitest run
```

Expected output:
```
Test Files  41 passed (41)
     Tests  272 passed (272)
```

(+3 new tests from Task 1 on top of the existing 269)

- [ ] **Step 2: Verify the injection wires through both retry paths**

Grep to confirm both `agentConfig` objects use the closure reference (not a stale copy):

```bash
grep -n "user: buildUnifiedDesignerPrompt" scripts/design-agents.js
```

Expected: two matches — one around line 1127 (screenshot-critic retry) and one around line 1234 (build-failure retry). Both call `config.user()` at runtime, so they execute the updated closure with the archetype injection.

- [ ] **Step 3: Verify the screenshot-critic no longer names stale agents**

```bash
grep "layout-architect\|token-designer\|sidebar-designer\|footer-designer\|component-agent" scripts/prompts/screenshot-critic.md
```

Expected: no output.

- [ ] **Step 4: Commit delimiter-fix changes alongside these if not already committed**

The delimiter-discipline fixes from the previous session (Task 14 followup) should already be committed. Confirm:

```bash
git log --oneline -5
```

Expected: the `fix(art-director): raise call timeout` and `fix(art-director): require explicit elementsPreset export name` commits are present, plus the new ones from this plan.
