import { createFileRoute, Link, Outlet, useMatch } from '@tanstack/react-router'

export interface ArchiveEntry {
  date: string
  brief: string
  rationale: string
  filesChanged: string[]
  archetype: string
  buildId: string
}

export const Route = createFileRoute('/archive')({
  loader: async () => {
    const res = await fetch('/archive/index.json')
    if (!res.ok) return { entries: [] as ArchiveEntry[] }
    const entries: ArchiveEntry[] = await res.json()
    return { entries }
  },
  component: ArchivePage,
})

function truncate(text: string, max: number) {
  if (text.length <= max) return text
  return text.slice(0, max).replace(/\s+\S*$/, '') + '...'
}

function ArchivePage() {
  const { entries } = Route.useLoaderData()
  const childMatch = useMatch({ from: '/archive/$date', shouldThrow: false })

  // If a child route is active, render only the child (Outlet)
  if (childMatch) {
    return <Outlet />
  }

  return (
    <>
      {/* Header */}
      <section
        style={{
          maxWidth: 760,
          margin: '0 auto',
          padding: '120px 48px 64px',
        }}
      >
        <p
          style={{
            fontVariant: 'all-small-caps',
            letterSpacing: '0.15em',
            fontSize: 12,
            color: 'var(--colors-text-dim, #888)',
            marginBottom: 16,
          }}
        >
          ARCHIVE
        </p>
        <h1
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: 'var(--colors-text, #111)',
            marginBottom: 16,
            lineHeight: 1.15,
          }}
        >
          Daily Redesigns
        </h1>
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.6,
            color: 'var(--colors-text-dim, #666)',
            maxWidth: 520,
          }}
        >
          Every morning a multi-agent pipeline redesigns this site from scratch.
          Each entry below is one day's output.
        </p>
      </section>

      {/* Entry list */}
      <section
        style={{
          maxWidth: 760,
          margin: '0 auto',
          padding: '0 48px 120px',
        }}
      >
        {entries.length === 0 ? (
          <p style={{ color: 'var(--colors-text-dim, #888)', fontSize: 14 }}>
            No archive entries yet.
          </p>
        ) : (
          entries.map((entry, i) => (
            <ArchiveRow
              key={entry.date}
              entry={entry}
              isLast={i === entries.length - 1}
            />
          ))
        )}
      </section>
    </>
  )
}

function ArchiveRow({
  entry,
  isLast,
}: {
  entry: ArchiveEntry
  isLast: boolean
}) {
  return (
    <Link
      to="/archive/$date"
      params={{ date: entry.date }}
      style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: 24,
        padding: '20px 12px',
        borderBottom: isLast
          ? 'none'
          : '1px solid var(--colors-border, #e0e0e0)',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'background 150ms ease',
      }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLElement).style.background =
          'var(--colors-accent, rgba(0,0,0,0.04))'
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLElement).style.background = 'transparent'
      }}
    >
      {/* Left: archetype + brief */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <span
          style={{
            fontWeight: 600,
            fontSize: 16,
            color: 'var(--colors-text, #111)',
            display: 'block',
            marginBottom: 4,
          }}
        >
          {entry.archetype || 'Untitled'}
        </span>
        <span
          style={{
            fontSize: 13,
            color: 'var(--colors-text-dim, #888)',
            lineHeight: 1.4,
          }}
        >
          {truncate(entry.brief, 120)}
        </span>
      </div>

      {/* Right: date */}
      <time
        dateTime={entry.date}
        style={{
          fontSize: 13,
          fontVariantNumeric: 'tabular-nums',
          color: 'var(--colors-text-dim, #999)',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}
      >
        {entry.date}
      </time>
    </Link>
  )
}
