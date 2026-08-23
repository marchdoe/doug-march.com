#!/usr/bin/env node
/**
 * Harvest daily-rating GitHub issues into archive/{date}/rating-{ts}.json
 * (new schema: { date, grade, worked, didnt, try, timestamp }), then close
 * each harvested issue. Runs as the first pipeline step in CI; requires
 * GH_TOKEN (the workflow's GITHUB_TOKEN). Degrades to a no-op locally or
 * when gh is unavailable. Never fails the run.
 */
import { execFileSync } from 'node:child_process'
import { writeFileSync, mkdirSync } from 'node:fs'
import { resolve, join } from 'node:path'

const ROOT = resolve(import.meta.dirname, '..')

// The daily-rating issue is public: anyone can comment, and comment text
// flows into the Art Director prompt as owner instructions. Only accept
// rating comments from accounts GitHub vouches for on this repo. The issue
// body needs no gate — it's bot-authored and only collaborators can edit it.
const TRUSTED_ASSOCIATIONS = new Set(['OWNER', 'MEMBER', 'COLLABORATOR'])

export function parseRatingFromIssue(issue) {
  const dateMatch = /Rate:\s*(\d{4}-\d{2}-\d{2})/.exec(issue.title || '')
  if (!dateMatch) return null
  const date = dateMatch[1]
  const trusted = (issue.comments || []).filter((c) =>
    TRUSTED_ASSOCIATIONS.has(c.authorAssociation)
  )
  const sources = [...trusted.map((c) => c.body).reverse(), issue.body || '']
  for (const text of sources) {
    const fence = /```ya?ml\s*\n([\s\S]*?)```/.exec(text || '')
    if (!fence) continue
    const kv = {}
    for (const line of fence[1].split('\n')) {
      const m = /^\s*(grade|worked|didnt|try)\s*:\s*(.*?)\s*$/.exec(line)
      if (m) kv[m[1]] = m[2].replace(/^["']|["']$/g, '')
    }
    if (kv.grade && /^[A-Da-d]$/.test(kv.grade)) {
      return {
        date,
        grade: kv.grade.toUpperCase(),
        worked: kv.worked || '',
        didnt: kv.didnt || '',
        try: kv.try || '',
      }
    }
  }
  return null
}

function harvest() {
  let issues
  try {
    const raw = execFileSync(
      'gh',
      [
        'issue',
        'list',
        '--label',
        'daily-rating',
        '--state',
        'open',
        '--json',
        'number,title,body,comments',
        '--limit',
        '30',
      ],
      { encoding: 'utf8' }
    )
    issues = JSON.parse(raw)
  } catch (err) {
    console.log(
      `[collect-ratings] gh unavailable or no issues (non-blocking): ${err.message.split('\n')[0]}`
    )
    return
  }
  let harvested = 0
  for (const issue of issues) {
    // Whole body in the try so even a parse throw can't escape harvest()
    // and fail the run — this script's one promise is "never blocks".
    try {
      const rating = parseRatingFromIssue(issue)
      if (!rating) {
        console.log(`[collect-ratings] #${issue.number} not yet filled — leaving open`)
        continue
      }
      const dateDir = join(ROOT, 'archive', rating.date)
      mkdirSync(dateDir, { recursive: true })
      const ts = Date.now()
      writeFileSync(
        join(dateDir, `rating-${ts}.json`),
        JSON.stringify({ ...rating, timestamp: ts }, null, 2)
      )
      execFileSync('gh', [
        'issue',
        'close',
        String(issue.number),
        '--comment',
        `Harvested: grade ${rating.grade}. This feeds tomorrow's run.`,
      ])
      harvested++
      console.log(
        `[collect-ratings] #${issue.number} → archive/${rating.date}/rating-${ts}.json (grade ${rating.grade})`
      )
    } catch (err) {
      console.warn(
        `[collect-ratings] #${issue.number} harvest failed (non-blocking): ${err.message}`
      )
    }
  }
  console.log(`[collect-ratings] harvested ${harvested} rating(s)`)
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  harvest()
}
