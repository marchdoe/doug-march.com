import { existsSync, readFileSync } from 'node:fs'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { extname, resolve } from 'node:path'
import { guardRequest } from './guards'

// Serve an archived site snapshot for the panel's preview viewer.
//
//   /api/archive-preview/2026-03-20/build-123456/index.html   (per-build)
//   /api/archive-preview/2026-03-16/index.html                (legacy date-level)

/**
 * Content types for what an archived site actually contains. This used to
 * read every file as utf8 and serve three types (html, css, everything else
 * as octet-stream): the favicon and both logo PNGs arrived mangled, and .js
 * and .svg were served with a type the browser refuses to execute or render
 * (#227). Files are read as bytes now.
 */
export const PREVIEW_CONTENT_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
}

export function contentTypeFor(filePath: string): string {
  return PREVIEW_CONTENT_TYPES[extname(filePath).toLowerCase()] ?? 'application/octet-stream'
}

/** Resolve a preview URL to a file under archive/, or null if it is not one. */
export function resolvePreviewPath(url: string, archiveBase: string): string | null {
  const buildMatch = url.match(/^\/(\d{4}-\d{2}-\d{2})\/(build-\d+)\/(.+)$/)
  const legacyMatch = url.match(/^\/(\d{4}-\d{2}-\d{2})\/(.+)$/)

  let fullPath: string
  if (buildMatch) {
    const [, date, buildDir, fp] = buildMatch
    fullPath = resolve(archiveBase, date, buildDir, 'site', fp)
  } else if (legacyMatch) {
    const [, date, fp] = legacyMatch
    fullPath = resolve(archiveBase, date, 'site', fp)
  } else {
    return null
  }
  // No preview URL legitimately contains a `..` segment. The old check only
  // refused paths that resolved outside archive/, which still let
  // `/2026-03-16/../../x` read a sibling date's files; refuse the segment.
  const fileSegments = (buildMatch ?? legacyMatch)?.slice(-1)[0]?.split('/') ?? []
  if (fileSegments.includes('..')) return null
  if (!fullPath.startsWith(`${archiveBase}/`)) return null
  return fullPath
}

export function archivePreviewHandler(req: IncomingMessage, res: ServerResponse): void {
  if (!guardRequest(req, res)) return

  const archiveBase = resolve('archive')
  const fullPath = resolvePreviewPath(req.url ?? '', archiveBase)
  if (!fullPath) {
    res.writeHead(404)
    res.end('Not found')
    return
  }
  if (!existsSync(fullPath)) {
    res.writeHead(404)
    res.end('Snapshot not found')
    return
  }

  res.writeHead(200, { 'Content-Type': contentTypeFor(fullPath) })
  res.end(readFileSync(fullPath))
}
