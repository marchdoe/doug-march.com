# Repair brief

The files you wrote earlier in this run are on disk and they are the base.
Do not start over. Patch them.

## Files on disk that you own this run

{{FILES}}

## What failed

{{ERRORS}}

## What to return

Return ONLY the files that must change to fix what is listed above. Each
file you return is written to disk exactly as you send it, so send every
returned file complete, in the same `===FILE:path===` format as before.

- A file you do not return stays on disk unchanged. Do not re-send a file
  to show it is fine; return a file unchanged only when a fix requires it.
- A new file is allowed when a fix needs one. Give it a path under
  `app/components/generated/` or `app/routes/`.
- To delete a file, return its `===FILE:path===` block with nothing after
  the delimiter. Only files in the list above can be deleted.
- Every error above is yours to fix, including one in a file you did not
  write in this call. The file is on disk and named in the list.
- Fix the listed errors and nothing else. A wider rewrite is how the last
  attempt traded one error for another.
