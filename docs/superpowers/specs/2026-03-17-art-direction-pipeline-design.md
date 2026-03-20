# Art Direction Pipeline Design

**Date:** 2026-03-17
**Status:** Approved
**Goal:** Transform the daily redesign pipeline from "template with swapped colors" to "daily composition that feels intentionally designed" — full art direction where the site itself is a design artifact.

## Design Principles

1. **Every day should feel like a finished composition**, not a template with different tokens
2. **Signals are design elements**, woven into the composition — not data in a sidebar panel
3. **Full art direction freedom** — the site is as much a design artifact as a portfolio
4. **The code always compiles** — design quality varies day to day, but the build never breaks
5. **Don't break the working pipeline** — all changes are additive with graceful fallbacks

## Pipeline Architecture

### Current Pipeline
```
Collect Signals → Interpret Brief → Design Director → Token Designer →
Layout Architect → Sidebar/Footer/Component Agents → Build Validation → Archive
```

### New Pipeline
```
Collect Signals → Collect References → Interpret Brief (structured) →
Design Director → Spec Critic (1 revision max) → Token Designer →
Layout Architect → Sidebar/Footer/Component Agents → Build Validation →
Screenshot Critic (1 revision max) → Archive
```

New stages: Collect References, Spec Critic, Screenshot Critic.
Enhanced stages: Interpret Brief (structured output), Design Director (receives references, uses composition vocabulary), Layout Architect (expanded patterns).

## New Stage: Collect References

Three reference layers, collected in parallel:

### Layer 1: Curated Library
A `references/` directory in the project root containing screenshots and a YAML index:

```
references/
  index.yml          # tags and descriptions
  poster-01.png
  brutalist-03.png
  editorial-07.png
```

Each entry in `index.yml` has tags: `composition` (poster, broadsheet, split, etc.), `mood` (warm, cold, energetic, calm), `density` (sparse, moderate, dense). The pipeline selects 3-5 relevant references based on the structured brief's composition and mood directions.

Start with 15-20 references. Grow the library over time.

### Layer 2: Trending Design Signal
New signal providers added to `scripts/collect-signals.js`:

- **Dribbble Popular** — top shots from the last 24h via Dribbble's RSS feed (`https://dribbble.com/shots/popular.rss`). Captures: title, designer, thumbnail URL. Fallback: if RSS is unavailable, skip this provider (non-blocking, like the existing Product Hunt provider).
- **Awwwards SOTD** — Site of the Day via Awwwards RSS or web scrape of the homepage. Captures: site name, description, category. Fallback: if unavailable, skip.

These flow into `signals/today.yml` alongside weather and sports. The interpret-signals step can reference trends in its compositional direction. If both providers fail, the pipeline continues without trending design signals — the curated library and brief-driven search still provide reference material.

### Layer 3: Brief-Driven Search
After the structured brief is written, a targeted search runs based on the brief's composition direction + mood + notable signals. Sources: Google Images, Are.na, design blogs. Extracts 3-5 relevant references with compositional notes.

Output: `signals/today.references.md` — URLs, descriptions, and compositional notes provided to the Design Director.

## Enhanced: Structured Brief

The interpret-signals step produces a structured brief with explicit sections instead of atmospheric prose only:

```markdown
## Mood
Frost on new growth. Cold snap on a holiday.
The green wants to celebrate; the air says no.

## Composition Direction
Poster composition — one dominant element (the holiday tension)
with work receding to supporting role. Asymmetric split, not a grid.

## Typography Direction
Display face at extreme scale for the dateline.
Body text tight and structured — Tuesday energy.

## Signal Integration
- St. Patrick's Day: structural, not decorative
- Tigers 13-6: inline celebration, not a card
- Golf leaderboard: typographic table treatment
- Quote: pull quote interrupting the main flow

## Palette Direction
Cold emerald on near-black. One warm accent for sports wins.
No pastels, no warmth.
```

This replaces the current brief sections (Palette Direction, Layout Energy, Tension, Required Elements, Accent Notes, Anchor Signal). The mapping: "Tension" and "Layout Energy" fold into "Mood" and "Composition Direction." "Required Elements" and "Accent Notes" fold into "Signal Integration." "Anchor Signal" is no longer a separate concept — it's expressed through which signal gets prominence in "Signal Integration." "Palette Direction" stays but becomes more explicit about contrast and restraint.

Note: The interpret-signals prompt is hardcoded in `scripts/interpret-signals.js` (the `buildInterpretPrompt()` function), not in a separate prompt file. Phase 1 edits this function directly.

## Expanded Compositional Vocabulary

Replace the current 5 layout patterns (Magazine, Gallery, Scroll, Dashboard, Minimal) with a richer vocabulary. These are starting points, not rigid templates — the Design Director specifies one (or a hybrid) with CSS-level hints.

| Archetype | Description |
|-----------|-------------|
| **The Poster** | One dominant element fills the viewport. Everything else secondary. Featured project or signal IS the page. |
| **The Broadsheet** | Dense, multi-column, newspaper-like. Signals, work, and content compete. Type-driven hierarchy. |
| **The Gallery Wall** | Asymmetric arrangement of differently-sized blocks. Nothing on a rigid grid. Curated, organic. |
| **The Scroll** | Single column, vertical rhythm. Each section a full moment. Generous spacing. Cinematic pacing. |
| **The Split** | Two asymmetric halves. One side is the "cover" (dominant visual/typographic moment), the other is content. |
| **The Stack** | Full-width horizontal bands. Each band a distinct moment. No sidebar. Bold section breaks. |
| **The Specimen** | Typography IS the design. Extreme type scale, creative letterspacing, type as texture. |
| **The Index** | Everything is a list. Dense, systematic, programmatic. Monospace or tabular type. Data-forward. |

The Design Director specifies the archetype plus CSS-level layout hints: "asymmetric 60/40 split," "single column max-width 640px," "masonry with 3 variable-width columns." The Layout Architect interprets from there.

New file: `scripts/prompts/library-composition.md` containing detailed descriptions, structural examples, and CSS patterns for each archetype.

## New Stage: Spec Critic

Runs after Design Director writes the visual spec, before any code is generated.

### Input
- The structured brief
- The Design Director's visual spec
- The reference material provided to the Director
- The last 5 days of archived briefs

### Evaluation Criteria

| Criterion | Question |
|-----------|----------|
| Compositional ambition | Does the spec make a genuine layout choice, or default to a safe sidebar grid? |
| Brief fidelity | Does the spec respond to today's signals, or could it be any day? |
| Range check | Same archetype or color family in the last 5 days? Typography pairing a repeat? |
| Signal integration | Are signals woven into the composition, or dumped in a sidebar panel? |
| Reference alignment | Did the Director draw from the references, or ignore them? |

### Output
- **APPROVED** — spec proceeds to build
- **REVISE** — specific, actionable feedback. Director gets one revision pass. Then build proceeds regardless.

Example feedback: "This is a Magazine layout again — you used Magazine 3 of the last 5 days. The brief asks for poster energy. Try The Split or The Specimen."

New file: `scripts/prompts/spec-critic.md`

## New Stage: Screenshot Critic

Runs after successful build, before archiving.

### Input
- Screenshot of the rendered homepage
- The structured brief
- The Design Director's visual spec
- The reference material

### Evaluation Criteria

| Criterion | Question |
|-----------|----------|
| Visual hierarchy | Clear dominant element? Does the eye know where to go? |
| Spec fidelity | Does the render match the Director's spec? Right colors, layout, typography? |
| Readability | Body text readable? Navigation findable? Site usable? |
| Compositional coherence | Do the parts feel like one design or a Frankenstein of 5 agents? |
| Polish | Overflows, overlapping text, invisible links, awkward gaps? |

### Output
- **SHIP** — archive and commit
- **REVISE** — identifies responsible agent + specific fixes. One revision pass. Then ship regardless.

New file: `scripts/prompts/screenshot-critic.md`

## Implementation Phases

Each phase is independently shippable. The pipeline is better after each phase.

### Phase 1: Structured Brief + Composition Vocabulary
- Update `scripts/interpret-signals.js` (`buildInterpretPrompt()`) — structured brief output (mood/composition/typography/signals/palette sections)
- Create `scripts/prompts/library-composition.md` — 8 archetypes with detailed descriptions and CSS patterns
- Update `scripts/prompts/design-director.md` — receives references, uses composition vocabulary, specifies layouts with CSS-level detail
- Update `scripts/prompts/structure-agent.md` — expanded layout patterns, accepts richer specs

**Impact:** Immediate improvement in design variety. Zero risk — prompt-only changes.

### Phase 2: Spec Critic Gate
- Create `scripts/prompts/spec-critic.md`
- Insert critic call in `scripts/design-agents.js` between Design Director and Token Designer
- Wrapped in try/catch — critic failure skips the gate

**Impact:** Catches safe/repetitive designs before build time. Graceful fallback.

### Phase 3: Reference System
- Add Dribbble + Awwwards providers to `scripts/collect-signals.js`
- Create `references/` directory structure with `index.yml` and starter references
- Create `scripts/collect-references.js` — selects relevant curated refs + runs brief-driven search
- Wire references into Design Director's input in `scripts/design-agents.js`

**Impact:** Director designs with visual precedent. Library grows over time.

### Phase 4: Screenshot Critic Gate
- Create `scripts/prompts/screenshot-critic.md`
- After successful build, capture a pixel screenshot of the rendered homepage. Extend `scripts/utils/snapshot.js` to add a `captureScreenshot()` function using Playwright (already a project dependency). The existing `captureSnapshot()` function handles Vite preview server spin-up — the new function reuses that server to navigate Playwright to the homepage and take a PNG screenshot. Returns the image buffer for the critic agent.
- Insert critic call in `scripts/design-agents.js` after build validation
- If issues found, identify responsible agent for one revision pass
- Wrapped in try/catch — critic failure ships without critique

**Impact:** Visual feedback loop. Catches compositional incoherence. Graceful fallback.

## Safety: What Changes vs What Doesn't

### New files (additive)
- `scripts/collect-references.js`
- `scripts/prompts/spec-critic.md`
- `scripts/prompts/screenshot-critic.md`
- `scripts/prompts/library-composition.md`
- `references/index.yml` + starter images
- Dribbble + Awwwards signal providers

### Enhanced files (careful edits)
- `scripts/interpret-signals.js` (`buildInterpretPrompt()`) — structured brief output
- `scripts/prompts/design-director.md` — receives references, uses composition vocabulary
- `scripts/prompts/structure-agent.md` — expanded layout patterns
- `scripts/design-agents.js` — insert critic gates around existing swarm
- `scripts/collect-signals.js` — add Dribbble/Awwwards providers

### Untouched
- SSE pipeline infrastructure (`vite.config.ts`)
- Dev panel UI (`app/dev-panel.tsx`)
- Token Designer, Sidebar Designer, Footer Designer, Component Agent prompts
- Backup/restore logic (`scripts/utils/file-manager.js`)
- Build validation (`scripts/utils/build-validator.js`)
- Archive (`scripts/utils/archiver.js`)
- Snapshot HTML capture (`scripts/utils/snapshot.js` — extended in Phase 4 to add `captureScreenshot()`)
- CLI spawning (`scripts/utils/claude-cli.js`)
- All app components, routes, content files

### Fallback Pattern
Every new stage uses the same pattern:
```javascript
let references = null
try {
  references = await collectReferences(brief)
} catch (err) {
  console.warn('References failed (non-blocking):', err.message)
  console.warn('Proceeding without references')
}
// Director gets references if available, designs without if not
```

If any new stage fails, the pipeline continues with the current behavior. No new stage can block the pipeline from shipping.
