// app/server/archive-paths.ts
// The shapes an archive path segment is allowed to have, and the only reader
// that turns a file into a typed record.
//
// Both halves exist because of the same near-miss. `_readArchiveRecord` built
// its path with `join(archivePath, date, 'record.json')` and validated nothing;
// the only guard was an `inputValidator` regex one layer up in archive.ts,
// which had no test. The traversal test that was supposed to cover this passed
// because `<fixture>/../../etc/record.json` happens not to exist — not because
// traversal was refused. A stray `record.json` above the fixture root would
// have made it read that file and still go green.
//
// The `YYYY-MM-DD` regex was also written out ten times across these files, so
// tightening one copy would have left nine.

/** A date directory: exactly `YYYY-MM-DD`, nothing that can traverse. */
export const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

/** A build id: the epoch-ms timestamp in `build-<id>`. */
export const BUILD_ID_RE = /^\d+$/

/**
 * A shipped build directory. `startsWith('build-')` also matches
 * `build-failed-*` and `build-pre-*`, which are diagnostic and snapshot temp
 * dirs — never the bytes that shipped.
 */
export const BUILD_DIR_RE = /^build-\d+$/

/**
 * DATE_RE and BUILD_DIR_RE, unanchored, for embedding inside a larger regex —
 * a URL path with segments either side, a redirect route — rather than
 * testing a standalone string. `dev-server/archive-preview.ts` and
 * `dev-server/archive-static.ts` build their route regexes from these instead
 * of spelling `\d{4}-\d{2}-\d{2}` out again (#331).
 */
export const DATE_FRAGMENT = DATE_RE.source.slice(1, -1)
export const BUILD_DIR_FRAGMENT = BUILD_DIR_RE.source.slice(1, -1)

export function isArchiveDate(value: unknown): value is string {
  return typeof value === 'string' && DATE_RE.test(value)
}

export function isBuildId(value: unknown): value is string {
  return typeof value === 'string' && BUILD_ID_RE.test(value)
}
