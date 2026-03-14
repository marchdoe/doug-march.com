# Dev Control Panel — Design Spec

**Date:** 2026-03-14
**Branch:** `feature/daily-redesign-phase1`
**Scope:** TanStack Start migration + `/dev` route for local pipeline control

---

## Overview

Two deliverables shipped together:

1. **TanStack Start migration** — upgrade the site from a pure SPA (TanStack Router + Vite) to a full-stack app (TanStack Start + Vinxi). This unlocks server functions and API routes, which the dev panel depends on.

2. **`/dev` control panel** — a local-only route for triggering and monitoring the daily redesign pipeline. Not linked from nav. Not useful in production (no API key). Designed as a morning dashboard.

---

## Part 1 — TanStack Start Migration

### Packages

Add: `@tanstack/start`, `vinxi`
Keep: `@tanstack/react-router`
Remove: `@tanstack/router-plugin` (Start's config subsumes it — do not add it explicitly to `app.config.ts` to avoid duplicate plugin conflicts)

### Config

Replace `vite.config.ts` with `app.config.ts` using `defineConfig` from `@tanstack/start/config`. The existing Vite plugins carry over into the `vite.plugins` array inside the Start config: `tsconfigPaths`, `viteReact`, and the PandaCSS plugin. Do not add `tanstackRouter` explicitly — Start handles it internally. The `@tanstack/devtools-vite` plugin also carries over into `vite.plugins`.

### New Entry Files

| File | Purpose |
|------|---------|
| `app/router.tsx` | `createRouter()` with routeTree, ScrollRestoration, `TanStackRouterDevtools` from `@tanstack/react-router-devtools` |
| `app/client.tsx` | Client entry — `hydrateRoot` with `StartClient` from `@tanstack/start/client` |
| `app/ssr.tsx` | SSR entry — `StartServer` render from `@tanstack/start/server` |

### Route Changes

`app/routes/__root.tsx` updated to use Start's `<Scripts />` and `<Meta />` for SSR head management. All other routes unchanged.

### Build Scripts

```json
"dev":   "panda codegen && vinxi dev --port 3000",
"build": "panda codegen && vinxi build"
```

`build-validator.js` runs `pnpm build` — no change needed.

### Deployment

Vercel detects TanStack Start automatically. Deploys as serverless functions. No `vercel.json` changes required.

---

## Part 2 — `/dev` Control Panel

### Route

`app/routes/dev.tsx` — file-based TanStack route at `/dev`. Not linked from any nav component. Loads signals and archive data via server functions on mount.

### UI Layout

Dashboard style. Four sections top to bottom:

**1. Header**
Page title ("Daily Redesign"), today's date, "dev server running" badge.

**2. Signals**
Five read-only cards: Weather, Sports, Golf, GitHub, News. Data sourced from `signals/today.yml` via `readSignals()` server function. No editing — file stays the source of truth.

**3. Overrides**
Two fields that write back to `signals/today.yml`:
- Mood override dropdown: `— none —`, dark, celebratory, tense, playful
- Notes textarea: free-text extra context for Claude
- "Save overrides" button calls `saveOverrides()` server function

**4. Run section**
- "Run Pipeline" button — opens SSE connection to `/api/pipeline`
- Dry run checkbox — passes `?dryRun=true` to the API route
- Last run summary: date, design brief, pass/fail

**5. Progress / result area** (mutually exclusive states — only one renders at a time)

*Idle state:* shows last-run summary line (date, brief, pass/fail) or nothing on first use.

*Running state:* split layout:
- Left (200px): phase tracker — named stages with dot indicators (pending / active / done). Phases: Read signals → Build prompt → Claude thinking → Write files → Build & validate → Archive & commit. Shows attempt number on retries.
- Right: dark log pane — timestamped lines streamed from the child process stdout/stderr. Scrolls automatically.

Phase advancement uses `line.includes(pattern)` (substring match):

| Phase | Trigger pattern |
|-------|----------------|
| Read signals | `[1/4] Reading site context` |
| Build prompt | `[2/4] Building Claude prompt` |
| Claude thinking | `calling Claude API` |
| Write files | `writing files` |
| Build & validate | `running pnpm build` | (emitted by `build-validator.js` line 13, same process) |
| Archive & commit | `=== Build passed!` | (marks start of archive/commit work, not completion) |

Retry detection: `--- Attempt` resets phases back to "Claude thinking" and updates the attempt counter. `=== All` triggers the error state.

The UI transition from running → success/error is driven by the `done` SSE event, not by phase trigger patterns. Phase patterns only advance the tracker dots.

*Success state:* replaces the running layout after `done` event with `success: true`:
- Green banner: checkmark, "Build passed · committed", design brief (italic), timestamp, attempt count
- "Open site ↗" button — opens `localhost:3000` in a new tab
- Archive list: last ~10 designs, date + brief, today's entry highlighted

*Error state:* replaces the running layout after `done` event with `success: false`:
- Red banner with last error message. Retry button re-opens the SSE connection, resetting to running state.

### Server Functions

All use `createServerFn` from `@tanstack/start`. Server-only — never bundled to the client.

**`readSignals()`**
Reads and parses `signals/today.yml`. Returns the full signals object.

**`saveOverrides({ moodOverride, notes })`**
Reads `signals/today.yml`, parses with `js-yaml`, overwrites `mood_override` (set to `null` if none selected) and overwrites a `notes` key (set to `null` if empty), then serializes back with `yaml.dump()` and writes to disk. Using `yaml.dump()` will reformat the file and strip inline comments — this is acceptable. The file structure and all data fields are preserved; only formatting and comments are lost.

**Important:** `prompt-builder.js`'s `formatSignals()` only renders known keys and will silently ignore `notes` unless updated. As part of this work, add a `### Notes` section to `formatSignals()` in `scripts/utils/prompt-builder.js`:
```js
if (signals.notes) {
  lines.push('### Notes from site owner')
  lines.push(signals.notes)
  lines.push('')
}
```
This ensures Claude actually sees the notes in its prompt. `archiver.js` has a separate `formatSignalsMarkdown()` function — do **not** add `notes` there. The archive is a historical record; notes are transient context for Claude.

**`readArchive()`**
Scans `archive/` directory. For each date subdirectory, reads `brief.md`. The format has no YAML frontmatter — use pattern matching (not line index) to extract fields:
- Date: first line that starts with `# ` — strip the `# ` prefix
- Design brief: first line that starts with `**Design Brief:** ` — strip the prefix

Returns array of `{ date: string, brief: string }` sorted descending by date.

### API Route — SSE Pipeline Stream

**`app/routes/api/pipeline.ts`**
`GET /api/pipeline?dryRun=true|false`

Handler:
1. Reads `ANTHROPIC_API_KEY` from environment — returns 500 if missing
2. Spawns `node scripts/daily-redesign.js` with `DRY_RUN` env var set accordingly
3. Creates a `ReadableStream` that:
   - Pipes child process stdout/stderr line-by-line as `log` SSE events
   - On child process `close` event, emits a final `done` SSE event: `{ type: 'done', success: true }` if exit code is 0, or `{ type: 'done', success: false, error: '...' }` if non-zero
   - Closes the stream after the `done` event
4. Returns `new Response(stream, { headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' } })`

The `done` event is synthesized by the API route handler — the child process only emits plain log lines and exits with code 0 or 1.

SSE event schema:
```json
{ "type": "log", "line": "[05:00:01] Reading signals..." }
{ "type": "done", "success": true }
{ "type": "done", "success": false, "error": "..." }
```

Client uses `EventSource` in a `useEffect`. The URL is constructed as a template string: `` `/api/pipeline?dryRun=${dryRun}` `` — `EventSource` only supports GET with URL params, no request body. On each `log` event: appends to log pane, pattern-matches to advance phase tracker. On `done`: transitions to success or error state, closes the connection.

### Dev-Only Guarantee

The route exists in production but does nothing harmful — `ANTHROPIC_API_KEY` is not set on Vercel, so the API route returns 500 immediately. No nav link, no discoverability.

---

## File Checklist

**Migration (new files):**
- `app.config.ts`
- `app/router.tsx`
- `app/client.tsx`
- `app/ssr.tsx`

**Migration (modified files):**
- `app/routes/__root.tsx`
- `package.json` (scripts + new deps)
- `scripts/utils/prompt-builder.js` (add `notes` section to `formatSignals()`)
- Delete `vite.config.ts`

**Dev panel (new files):**
- `app/routes/dev.tsx`
- `app/routes/api/pipeline.ts`
- `app/server/signals.ts` (server functions: readSignals, saveOverrides)
- `app/server/archive.ts` (server function: readArchive)

---

## Out of Scope

- Auto-populating signals (Phase 2 of the original roadmap)
- Archive UI with screenshots (Phase 3)
- Making `/dev` password-protected or otherwise secured
- Any changes to `daily-redesign.js` or other pipeline scripts
