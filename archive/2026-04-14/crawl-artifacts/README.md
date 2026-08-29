# Crawl artifacts, not archived designs

Fifteen pages rescued from `public/archive/2026-04-14/archive/` before that
directory was deleted. They live here, outside `public/`, because they are
**not** a record of what shipped on the dates their paths name — and serving
them as though they were would make the archive lie.

## Where they came from

On 2026-04-14 the pipeline crawled the site to snapshot it. `/archive/` was a
live route at the time, so the crawler walked into it and captured copies of 28
earlier days inside that one day's snapshot: 182 pages, an archive of the
archive.

167 of those were byte-equivalent to pages already preserved at the top level,
once the injected frame is discounted. Those were deleted. These fifteen were
not duplicated anywhere, so they were kept.

## Why they are not history

**The six under `2026-03-27/work/`** are pages for 15th Club, FishSticks,
Politweets, Twittertale, TeeTurn and doug-march.com. The real 2026-03-27
snapshot has three work pages — `ai-experiment`, `project-alpha`, `spaceman`.
Those projects did not exist in the site's content in March. The crawler
requested paths the stored snapshot did not contain, SPA routing returned the
shell, and the live April application rendered April content under a March URL.

Their design fingerprint matches no other page in the archive: not the
2026-03-27 design they sit beside, not 2026-04-14's, not any of the other 121
archived days.

**The nine under `2026-04-13/`** carry the same visible text as the archived
2026-04-13 but a different generated stylesheet — the Panda reset differs:

    kept:     *{box-sizing:border-box}html{height:100%}body{margin:...}
    archived: *,*:before,*:after{margin:...;box-sizing:border-box}

`archiver.js` wrote the top-level copy at build time from the build that
actually shipped. This is a crawl of a rendered route a day later. Where the two
disagree, the archived one is the record.

## What to do with them

Nothing, most likely. They are kept because deleting the only copy of anything
is hard to undo, not because they are owed a place in the archive. They are
unsealed and unframed, and 15 of the pages here still carry absolute links to
`https://doug-march.com`, which is why they must not be served.

Removed from `public/` in the PR that closed
"Fate of the 182-page 2026-04-14 nested copy".
