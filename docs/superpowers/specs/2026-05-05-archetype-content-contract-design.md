# Archetype-Conditional Content Contract

**Date:** 2026-05-05
**Branch:** feat/impeccable-integration
**Status:** Approved for implementation

## Problem

The Unified Designer (UD) currently has an unconditional data-render contract: the home page must always render featured project + all selected-work projects + all experiments. This directly conflicts with the Specimen and Poster archetypes, which call for the hero phrase to fill the entire page. The UD resolves the conflict by honoring both — it makes the hero Specimen-grade, then adds the required project listing below. The result is AD intent vs. UD execution drift: the AD says "phrase IS the page," the UD ships phrase-plus-portfolio.

Additionally, the screenshot critic's responsible agents list names agents (`token-designer`, `layout-architect`, `sidebar-designer`, `footer-designer`, `component-agent`) that no longer exist in the pipeline. Any REVISE verdict silently no-ops because the orchestrator's `agentConfig` only knows `unified-designer`.

## Approach

Defense-in-depth across three layers:

1. **UD system prompt** — conditional data-render contract by archetype
2. **Orchestrator runtime injection** — per-archetype constraint block prepended to the UD user prompt on every call, including retries
3. **Screenshot critic** — stale agent names replaced + Specimen/Poster enforcement check added

## Design

### 1. UD System Prompt — Conditional Data-Render Contract

Replace the flat "Home page must render" block with a two-branch conditional.

**Specimen / Poster:**
Home page IS the hero phrase. Render only: hero phrase at full-page scale, navigation, and optional signal annotation. No project listing, no featured project section, no experiments. Projects are reachable via navigation.

**All other archetypes:**
Current requirements unchanged — featured project, all selected-work projects, all experiments.

Also add to the "DO NOT" list:
> For Specimen/Poster days, do not add a project listing, featured project section, or experiments below the hero phrase.

No other changes to the UD system prompt.

### 2. Orchestrator Runtime Injection

**Where:** The function that assembles the UD user prompt (`buildUnifiedDesignerPrompt`). Prepend a per-archetype contract block when `chosenArchetype` is `'Specimen'` or `'Poster'`. For all other archetypes, prepend nothing.

**Specimen/Poster block (prepended at top of user prompt):**
```
⚠ ARCHETYPE CONTRACT — [ARCHETYPE]:
Home page = hero phrase + navigation ONLY.
Do NOT render project cards, featured project, experiments, or any portfolio section.
index.tsx is a single-composition canvas today, not a portfolio hub.
```

**Injection point:** Top of the user prompt string, before the brief, signals, and visual spec. First thing the model reads.

**Retry coverage:** Both the primary UD call and the screenshot-critic retry call (`config.user()`) must carry the injection. `chosenArchetype` is in scope throughout `runAgentSwarm` — pass it into `buildUnifiedDesignerPrompt` as a parameter.

**Interface change:** The `agentConfig` object currently stores `user: buildUnifiedDesignerPrompt` as a bare reference — the retry path calls `config.user()` with no arguments. Change `user` to a closure that captures `chosenArchetype` at the point `agentConfig` is built: `user: () => buildUnifiedDesignerPrompt(chosenArchetype)`. This ensures both the primary call and both retry call sites (`config.user()`) carry the archetype without any new function parameter.

### 3. Screenshot Critic

**Fix 1 — Stale agent names:**
Replace the entire responsible agents list with a single entry:
- **unified-designer** — All failure categories: color, fonts, layout structure, nav placement, component styling, hero phrase execution, archetype purity.

**Fix 2 — Specimen/Poster enforcement (new Section 8):**
Add a conditional check that fires only when the archetype is Specimen or Poster:

> **Section 8 — Archetype Purity (Specimen / Poster only)**
> Does the home page contain any visible project cards, work grid, featured project section, or "Selected Work" heading? If yes → REVISE. The phrase IS the page. Responsible agent: unified-designer.

The critic already receives the archetype in its user prompt, so the condition is natural.

## Scope

- `scripts/prompts/unified-designer.md` — data-render section + DO NOT list
- `scripts/prompts/screenshot-critic.md` — responsible agents + Section 8
- `scripts/design-agents.js` — `buildUnifiedDesignerPrompt` signature + injection logic at both call sites (primary + screenshot-critic retry)

## Out of Scope

- No changes to other archetypes' data-render contracts
- No changes to the Art Director prompt
- No changes to the spec-critic
- No new agent config entries
- The remaining open items (a–j) from the original verification pass

## Success Criteria

A Specimen or Poster pipeline run produces a home page that is only the hero phrase and navigation — no project cards, no "Selected Work" heading, no featured project section — and the screenshot critic SHIPs it without REVISE. An equivalent run with a non-Specimen archetype (e.g., Broadsheet) still renders the full project listing.
