# Designer Agent Swarm — Design Spec

**Date:** 2026-03-16
**Status:** Approved (v2 — post review)

---

## Overview

The current Stage 3 (design generation) uses a single monolithic CLI call that generates all 17 mutable files as a 30KB+ JSON response. This is slow (90s-20min), unreliable (frequent timeouts and JSON parse failures), and blocked by CLI concurrency when an interactive Claude Code session is active.

This spec replaces the monolithic call with three specialized CLI calls — each small and fast enough to avoid the concurrency starvation that kills the mega-call. Each agent call generates a focused subset of files.

---

## Architecture

### Three Agents, Two Phases

```
Phase 1:  Token Designer (preset.ts + __root.tsx)
               ↓ writes to disk
          panda codegen validation gate
               ↓
Phase 2:  [Structure Agent + Component Agent] (sequential or parallel)
               ↓ both write to disk
          Full build validation (panda codegen + vite build)
```

### Token Designer

- **Role:** Design system specialist — colors, fonts, spacing, semantic tokens
- **Reads:** Creative brief
- **Writes:** `elements/preset.ts`, `app/routes/__root.tsx` (font links)
- **Also produces:** `rationale` (1-2 paragraphs) and `design_brief` (one sentence) — written to `.design-meta.json` on disk for the archiver
- **Reference files:** Current `preset.ts` and `__root.tsx` (for interfaces/structure only)
- **Estimated input:** ~8KB
- **Estimated output:** ~7KB (2 files + meta JSON)
- **Runs:** First, blocks until complete

### Structure Agent

- **Role:** Layout architect — spatial organization, page composition, signal integration, navigation
- **Reads:** Creative brief + `preset.ts` from disk (written by Token Designer)
- **Writes:** `Layout.tsx`, `Sidebar.tsx`, `MobileFooter.tsx`, `index.tsx`, `about.tsx`, `work.$slug.tsx`
- **Reference files:** Current versions of its 6 files (for interfaces/imports only)
- **Estimated input:** ~15KB
- **Estimated output:** ~15KB (6 files)
- **Runs:** Phase 2

### Component Agent

- **Role:** Component designer — data display, typography, visual hierarchy within individual components
- **Reads:** Creative brief + `preset.ts` from disk (written by Token Designer)
- **Writes:** `FeaturedProject.tsx`, `ProjectRow.tsx`, `SectionHead.tsx`, `SelectedWork.tsx`, `Experiments.tsx`, `Bio.tsx`, `Timeline.tsx`, `Capabilities.tsx`, `Personal.tsx`
- **Reference files:** Current versions of its 9 files (for interfaces/imports only)
- **Estimated input:** ~15KB
- **Estimated output:** ~10KB (9 files)
- **Runs:** Phase 2

Phase 2 agents do not read `__root.tsx`. Font loading is handled entirely by the Token Designer.

---

## Execution Model

### How Agents Run

Each agent is a `claude -p` CLI call with:
- A focused system prompt (from `scripts/prompts/<agent>.md`)
- A user message containing the brief, token context, reference files, and output instructions
- The same pipeline flags: `--settings pipeline-settings.json`, `--disable-slash-commands`, `--tools ''`
- Each call targets ~10-15KB input and ~5-15KB output — small enough to complete in 15-30 seconds

This is a standalone Node.js script (`scripts/design-agents.js`). It does NOT require running inside Claude Code. It can be triggered from the dev panel, the terminal, or a cron job.

### Response Format

Each agent responds with a JSON object:

```json
{
  "files": [
    { "path": "elements/preset.ts", "content": "...full file content..." }
  ]
}
```

Token Designer additionally includes:

```json
{
  "rationale": "1-2 paragraphs explaining creative choices",
  "design_brief": "One evocative sentence for the archive",
  "files": [...]
}
```

The orchestrator writes files to disk after each agent completes.

### Orchestration Flow

1. Pipeline reads the creative brief and site context once
2. Backs up all 17 mutable files (orchestrator owns the backup lifecycle)
3. Dispatches **Token Designer**, waits for completion
4. Writes Token Designer's files to disk
5. Verifies both `preset.ts` AND `__root.tsx` were produced
6. Runs `panda codegen` as a validation gate — if it fails, Token Designer's tokens are bad; retry Token Designer (up to 2 attempts)
7. Dispatches **Structure Agent** + **Component Agent** (sequentially by default; parallel if CLI concurrency allows)
8. Writes their files to disk
9. Runs full build validation (`panda codegen && vite build`)
10. If build passes → read `.design-meta.json` for rationale/brief → archive → done
11. If build fails → identify responsible agent → retry (see below)

### Retry Strategy

- Each agent gets up to 2 attempts
- On build failure, parse error output to identify which file(s) failed
- Map failed files to the responsible agent using the file ownership table
- Retry only the failing agent with the build error appended to its prompt
- Successful agents' files remain on disk
- If error attribution is ambiguous (e.g., error in Structure Agent file caused by a Component Agent interface change), retry both Phase 2 agents
- If Token Designer exhausts its retry budget, restore from backup and exit with error
- If all Phase 2 retries exhausted, restore from backup and exit with error

### File Ownership Table

| Agent | Files |
|---|---|
| Token Designer | `elements/preset.ts`, `app/routes/__root.tsx` |
| Structure Agent | `app/components/Layout.tsx`, `app/components/Sidebar.tsx`, `app/components/MobileFooter.tsx`, `app/routes/index.tsx`, `app/routes/about.tsx`, `app/routes/work.$slug.tsx` |
| Component Agent | `app/components/FeaturedProject.tsx`, `app/components/ProjectRow.tsx`, `app/components/SectionHead.tsx`, `app/components/SelectedWork.tsx`, `app/components/Experiments.tsx`, `app/components/Bio.tsx`, `app/components/Timeline.tsx`, `app/components/Capabilities.tsx`, `app/components/Personal.tsx` |

Total: 17 files (matches `MUTABLE_FILES` exactly).

### Coordination Protocol

- **Token Designer → disk → Phase 2 Agents**: Token Designer writes `preset.ts` and `__root.tsx` to disk. Phase 2 agents read `preset.ts` from disk at the start of their run to learn token names, color palette, font families, and spacing scale. Phase 2 agents do NOT read `__root.tsx`.
- **No agent reads another agent's component files.** Structure Agent does not need to know Component Agent's output and vice versa. They share only the design tokens.
- **Page routes compose components by import name.** The Structure Agent knows the component export names from the reference files (they don't change). It writes route files that import those components. Component prop interfaces must remain compatible (existing contract — not new).

---

## Prompt Design

### Each Agent Gets a Tailored Prompt

| Agent | Brief | Tokens File | Reference Files | Est. Input |
|---|---|---|---|---|
| Token Designer | Full brief | None (creates it) | Current preset.ts + __root.tsx | ~8KB |
| Structure Agent | Full brief | Reads preset.ts from disk | Current Layout, Sidebar, MobileFooter, 3 routes | ~15KB |
| Component Agent | Full brief | Reads preset.ts from disk | Current 9 component files | ~15KB |

### Prompt Structure (per agent)

1. **Role description** — who you are, what files you own, what files you may write (explicit allow-list)
2. **Design fundamentals** — alignment, spacing, hierarchy, color restraint, typography, whitespace, contrast, component consistency
3. **Creative brief** — full `today.brief.md` content
4. **Token context** — preset.ts contents (Structure and Component agents only)
5. **Content contract** — partitioned per agent:
   - Token Designer: no content contract (tokens only)
   - Structure Agent: home page sections (FeaturedProject, SelectedWork, Experiments), about page sections (Bio, Timeline, Capabilities, Personal), all-pages Sidebar — at the route/layout level
   - Component Agent: per-component rendering requirements (what each component must display)
6. **Technical requirements** — only the rules that apply to this agent
7. **Reference files** — only the files this agent will rewrite (for interfaces/imports)
8. **Output instruction** — "Respond with ONLY a JSON object containing a files array. Each file must have path and content."

### Prompt Files

Prompts live as markdown files for easy iteration without changing JS code:

```
scripts/
  design-agents.js          ← orchestrator (new)
  prompts/
    token-designer.md       ← system prompt for Token Designer (new)
    structure-agent.md      ← system prompt for Structure Agent (new)
    component-agent.md      ← system prompt for Component Agent (new)
```

The orchestrator reads these at runtime and injects the brief, token context, and reference files.

---

## What Changes

### New Files

- `scripts/design-agents.js` — Orchestrator: reads context, dispatches 3 CLI calls, handles retries, runs build validation, archives. Owns the full backup/restore lifecycle.
- `scripts/prompts/token-designer.md` — Token Designer system prompt
- `scripts/prompts/structure-agent.md` — Structure Agent system prompt
- `scripts/prompts/component-agent.md` — Component Agent system prompt

### Modified Files

- `scripts/daily-redesign.js` — MOCK_MODE path calls `design-agents.js` orchestrator instead of `callClaudeCLI`. Passes brief and context. Does NOT own backup/restore in MOCK_MODE (orchestrator handles it).
- `scripts/utils/site-context.js` — New exported constants for file groups (`TOKEN_FILES`, `STRUCTURE_FILES`, `COMPONENT_FILES`) and a function to read file subsets per agent group.

### Unchanged

- `scripts/utils/prompt-builder.js` — Still used for API/production mode
- `scripts/interpret-signals.js` — Stage 2 is unaffected
- `scripts/run-pipeline.js` — Pipeline runner is unaffected
- `scripts/collect-signals.js` — Stage 1 is unaffected
- Content contract, technical requirements, submit_redesign tool schema (API mode)

---

## What Does NOT Change

- **Production flow** — API mode still uses the monolithic `callAnthropicAPI` with `submit_redesign` tool. The agent swarm is for local development only (MOCK_MODE=true).
- **Stage 1 and Stage 2** — Signal collection and interpretation are unaffected.
- **Build validation** — Same `panda codegen && vite build` process.
- **Archive format** — Same structure in `archive/YYYY-MM-DD/`.
- **Content contract** — What must be rendered is unchanged.

---

## Non-Goals

- No changes to the Anthropic API production path
- No new npm dependencies
- No changes to PandaCSS or build tooling
- No changes to the content contract or component prop interfaces
- No MCP servers or external tool integrations
