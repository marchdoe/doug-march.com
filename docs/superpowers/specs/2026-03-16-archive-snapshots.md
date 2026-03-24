# Archive Site Snapshots — Design Spec

**Date:** 2026-03-16
**Status:** Approved (v2 — post review)

---

## Overview

After each successful pipeline run, capture a static HTML snapshot of every portfolio page with CSS inlined. Store it in `archive/YYYY-MM-DD/site/`. The dev panel Archive pane can then load any past design instantly in an iframe — like the Wayback Machine.

---

## How It Works

### Snapshot Step (runs after brief.md is written)

The snapshot is captured AFTER `brief.md` is written (not before). This ensures the brief is always saved even if the snapshot fails.

1. Start the built site using `vite preview` on a random high port (e.g., 14000 + random offset). The `dist/server/server.js` is NOT a standalone HTTP server — it exports a fetch handler consumed by Vite. Use `vite preview --port <port>` to serve it.
2. Wait for the server to be ready — poll `http://localhost:<port>/` until it returns 200, with a 10-second timeout.
3. For each portfolio route (`/`, `/about`, `/work/$slug` for each project slug), fetch the fully rendered HTML from the running server.
4. Inline all CSS: find `<link rel="stylesheet" href="/assets/...">` tags, fetch each CSS URL from the same running server (paths are hashed, don't read from disk), replace the `<link>` tag with an inline `<style>` block.
5. Remove all `<script>` tags and `<script>` related attributes — the snapshot is view-only, no interactivity needed.
6. Rewrite nav links for self-contained browsing:
   - `/` → `index.html`
   - `/about` → `about.html`
   - `/work/$slug` → `work/$slug.html`
   - Leave anchor (`#`) links and external links (`http://`, `https://`) unchanged
7. Save each page as a static HTML file in `archive/YYYY-MM-DD/site/`.
8. Kill the `vite preview` process.

### Failure Handling

**Snapshot failure must NOT block the pipeline.** The brief.md is already written at this point. If the snapshot step fails (server won't start, crawl fails, CSS fetch fails), log a warning and continue. The archive entry exists without a snapshot — the "Preview" button in the dev panel is simply hidden for that entry.

```javascript
try {
  await captureSnapshot(date)
} catch (err) {
  console.warn(`  snapshot failed (non-blocking): ${err.message}`)
}
```

### Font Handling

Google Fonts are loaded via `<link>` tags pointing to fonts.googleapis.com. Keep the external links — simplest, works as long as there's internet. If offline viewing becomes important, we can inline later.

### Image Handling

The portfolio site currently has no images. If images are added later, they will reference absolute URLs or the live site — they may be broken in archived snapshots. This is a known limitation and can be addressed when images are introduced.

### Output Structure

```
archive/YYYY-MM-DD/
  brief.md              ← existing (rationale, design brief, file list)
  site/                 ← new
    index.html          ← / (home page)
    about.html          ← /about
    work/
      project-slug.html ← /work/$slug (one per project)
```

Each HTML file is self-contained: inlined CSS, no JS, external font links only. Estimated ~20-50KB per page, ~100-200KB total per day.

---

## Archive Viewer (Dev Panel)

The Archive pane in the dev panel gets a "Preview" button per entry (only shown if `site/index.html` exists for that date). Clicking it shows the snapshot in an iframe below the archive list.

### Serving Snapshots

The Vite dev server does not serve files from `archive/` by default. Add a middleware route in `vite.config.ts` to serve snapshot files:

```
/api/archive-preview/:date/:path* → reads archive/:date/site/:path and serves as text/html
```

This avoids CORS issues and `file://` protocol restrictions. The iframe `src` would be `/api/archive-preview/2026-03-16/index.html`.

### Iframe Viewer

- Preview area appears below the archive list when a date is selected
- Loads `/api/archive-preview/YYYY-MM-DD/index.html` in an iframe
- Nav links within the snapshot work because they were rewritten to relative HTML files, and the middleware serves them all
- Small nav bar above iframe: Home | About (links to different snapshot pages for the selected date)
- Close button to dismiss the preview

### Preview Controls

- Click on an archive row to load that day's snapshot
- If no snapshot exists for that date, the "Preview" button is hidden
- Clicking a different date switches the iframe source

---

## What Changes

### New Files

- `scripts/utils/snapshot.js` — Snapshot function: starts `vite preview`, crawls routes, inlines CSS, strips JS, rewrites links, saves HTML files. Exports `captureSnapshot(date)`.

### Modified Files

- `scripts/utils/archiver.js` — After writing `brief.md`, call `captureSnapshot(date)` wrapped in try/catch (non-blocking).
- `vite.config.ts` — Add middleware route to serve archived snapshot files at `/api/archive-preview/:date/:path`.
- `app/dev-panel.tsx` — Archive pane gets a "Preview" button and iframe viewer.

### Route List

The snapshot needs to know which routes to crawl. Get the project slugs from `app/content/projects.ts`:
- `/` (home)
- `/about`
- `/work/$slug` for each project in the `projects` array

---

## What Does NOT Change

- Pipeline flow — snapshot is an additional step after archiving, not a replacement
- Archive brief.md format — unchanged, snapshot is alongside it
- Build process — snapshot reads from the already-built site (dist/ must be fresh from a successful build)
- Dev panel layout structure — just adds preview capability to the existing Archive pane

---

## Non-Goals

- No offline font support (keep Google Fonts external links)
- No JavaScript in snapshots (view-only, no interactivity)
- No image inlining (known limitation, no images in portfolio currently)
- No diffing between snapshots (future feature)
- No automatic cleanup of old snapshots (storage is small enough to keep all)
- No concurrent pipeline run protection (unlikely edge case for a daily pipeline)
