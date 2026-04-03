import { createFileRoute } from '@tanstack/react-router'
import { featuredProject, selectedWork, experiments } from '../content/projects'
import { identity } from '../content/about'

export const Route = createFileRoute('/')({ component: HomePage })

// ─── Gallery CSS ──────────────────────────────────────────────────────────────

const GALLERY_STYLES = `
  .gallery-cell {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: box-shadow 300ms ease;
    height: 100%;
  }
  .gallery-cell .cell-bg {
    flex: 1;
    min-height: 0;
    transition: transform 500ms ease;
  }
  .gallery-cell .cell-hairline {
    height: 1px;
    background: #D2D6C8;
    flex-shrink: 0;
  }
  .gallery-cell .cell-caption {
    height: 48px;
    background: #FAFAF8;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
    gap: 12px;
  }
  .gallery-cell .caption-lhs {
    opacity: 0;
    transform: translateY(6px);
    transition: opacity 400ms cubic-bezier(0.16, 1, 0.3, 1), transform 400ms cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    align-items: baseline;
    gap: 10px;
    overflow: hidden;
    min-width: 0;
  }
  .gallery-cell .caption-rhs {
    opacity: 0;
    transform: translateY(6px);
    transition: opacity 400ms cubic-bezier(0.16, 1, 0.3, 1), transform 400ms cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }
  .gallery-cell:hover {
    box-shadow: 0 8px 32px rgba(13, 17, 10, 0.14);
  }
  .gallery-cell:hover .cell-bg {
    transform: scale(1.015);
  }
  .gallery-cell:hover .caption-lhs,
  .gallery-cell:hover .caption-rhs {
    opacity: 1;
    transform: translateY(0);
  }
  .caption-title-link {
    font-family: Switzer, sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #1D2219;
    text-decoration: none;
    letter-spacing: -0.01em;
    transition: color 300ms ease;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .caption-title-link:hover {
    color: #C26535;
  }
  .twittertale-link:hover {
    color: #C26535;
  }
`

// ─── Cell Background Gradients ────────────────────────────────────────────────

const CELL_BG: Record<string, string> = {
  spaceman:      'linear-gradient(160deg, #0D110A 0%, #181D11 45%, #2D3224 100%)',
  fishsticks:    'linear-gradient(160deg, #181D11 0%, #2D3224 100%)',
  '15th-club':   'linear-gradient(160deg, #2D3224 0%, #484F3C 100%)',
  'doug-march':  'linear-gradient(145deg, #484F3C 0%, #636B56 55%, #8A9280 100%)',
  teeturn:       'linear-gradient(160deg, #9A4A1C 0%, #C26535 100%)',
  politweets:    'linear-gradient(160deg, #8A9280 0%, #AFB6A3 100%)',
  twittertale:   'linear-gradient(160deg, #636B56 0%, #8A9280 100%)',
}

function bgFor(slug: string): string {
  return CELL_BG[slug] ?? 'linear-gradient(160deg, #181D11, #2D3224)'
}

// ─── Gallery Cell Component ───────────────────────────────────────────────────

type GalleryCellProps = {
  href: string
  title: string
  year: number
  type?: string
  badge?: string
  slug: string
  external?: boolean
}

function GalleryCell({ href, title, year, type, badge, slug, external }: GalleryCellProps) {
  return (
    <div className="gallery-cell">
      <div
        className="cell-bg"
        style={{
          background: bgFor(slug),
          filter: 'contrast(1.08) saturate(0.90)',
        }}
      />
      <div className="cell-hairline" />
      <div className="cell-caption">
        <div className="caption-lhs">
          <a
            href={href}
            className="caption-title-link"
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
          >
            {title}
          </a>
          {type && (
            <span
              style={{
                fontFamily: '"IBM Plex Sans", sans-serif',
                fontSize: '9px',
                color: '#636B56',
                letterSpacing: '0.08em',
                textTransform: 'uppercase' as const,
                whiteSpace: 'nowrap' as const,
                flexShrink: 0,
              }}
            >
              {type}
            </span>
          )}
        </div>
        <div className="caption-rhs">
          {badge && (
            <span
              style={{
                fontFamily: '"IBM Plex Sans", sans-serif',
                fontSize: '9px',
                color: '#8A9280',
                letterSpacing: '0.08em',
                textTransform: 'uppercase' as const,
              }}
            >
              {badge}
            </span>
          )}
          <span
            style={{
              fontFamily: '"IBM Plex Sans", sans-serif',
              fontSize: '12px',
              color: '#8A9280',
              letterSpacing: '-0.01em',
            }}
          >
            {year}
          </span>
        </div>
      </div>
    </div>
  )
}

// ─── Identity Cell ────────────────────────────────────────────────────────────

function IdentityCell() {
  return (
    <div
      style={{
        background: '#FAFAF8',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        height: '100%',
      }}
    >
      <div
        style={{
          fontFamily: 'Switzer, sans-serif',
          fontSize: '21px',
          fontWeight: 500,
          color: '#1D2219',
          letterSpacing: '-0.01em',
          lineHeight: 1.0,
          marginBottom: '8px',
        }}
      >
        {identity.name}
      </div>
      <div
        style={{
          fontFamily: '"IBM Plex Sans", sans-serif',
          fontSize: '14px',
          color: '#636B56',
          letterSpacing: '0.04em',
          lineHeight: 1.4,
          marginBottom: '24px',
        }}
      >
        {identity.role}
      </div>
      {/* Paulo Coelho quote with rust vertical rule */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
        <span
          style={{
            display: 'block',
            width: '2px',
            height: '24px',
            background: '#C26535',
            flexShrink: 0,
            marginTop: '4px',
          }}
        />
        <span
          style={{
            fontFamily: '"IBM Plex Sans", sans-serif',
            fontSize: '12px',
            color: '#8A9280',
            lineHeight: 1.85,
            letterSpacing: '0em',
          }}
        >
          Dreams provide nourishment for the soul, just as a meal does for the body.
        </span>
      </div>
    </div>
  )
}

// ─── Signals Cell ─────────────────────────────────────────────────────────────

function SignalsCell() {
  return (
    <div
      style={{
        background: '#FAFAF8',
        padding: '24px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        height: '100%',
      }}
    >
      <div
        style={{
          height: '1px',
          background: '#D2D6C8',
          marginBottom: '16px',
        }}
      />
      <div
        style={{
          fontFamily: '"IBM Plex Sans", sans-serif',
          fontSize: '12px',
          color: '#636B56',
          letterSpacing: '-0.01em',
          textTransform: 'uppercase' as const,
          lineHeight: 1.4,
          marginBottom: '12px',
        }}
      >
        RED WINGS 4 – 2 · PISTONS 113 – 108
      </div>
      <div
        style={{
          fontFamily: '"IBM Plex Sans", sans-serif',
          fontSize: '12px',
          color: '#8A9280',
          letterSpacing: '0.04em',
          lineHeight: 1.6,
        }}
      >
        April 3, 2026 · 12.5 hrs daylight
      </div>
    </div>
  )
}

// ─── Home Page ────────────────────────────────────────────────────────────────

function HomePage() {
  const featured = featuredProject
  const work = selectedWork
  const exps = experiments

  return (
    <>
      <style>{GALLERY_STYLES}</style>
      <div
        style={{
          maxWidth: '1296px',
          margin: '0 auto',
          padding: '40px 48px 80px',
        }}
      >
        {/* ── Gallery Grid ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridTemplateRows: '320px 24px 240px 24px 200px',
            gap: '20px',
          }}
        >
          {/* ── Row 1: Featured (primary) + FishSticks (secondary) ── */}

          {featured && (
            <div style={{ gridColumn: '1 / 8', gridRow: '1 / 2' }}>
              <GalleryCell
                href={featured.externalUrl || `/work/${featured.slug}`}
                title={featured.title}
                year={featured.year}
                type={featured.type}
                badge="Featured"
                slug={featured.slug}
                external={!!featured.externalUrl}
              />
            </div>
          )}

          {work[0] && (
            <div style={{ gridColumn: '8 / 13', gridRow: '1 / 2' }}>
              <GalleryCell
                href={`/work/${work[0].slug}`}
                title={work[0].title}
                year={work[0].year}
                type={work[0].type}
                slug={work[0].slug}
              />
            </div>
          )}

          {/* ── Row 2: Explicit 24px whitespace band — no cells placed ── */}

          {/* ── Row 3: 15th Club + doug-march.com + Identity ── */}

          {work[1] && (
            <div style={{ gridColumn: '1 / 5', gridRow: '3 / 4' }}>
              <GalleryCell
                href={`/work/${work[1].slug}`}
                title={work[1].title}
                year={work[1].year}
                type={work[1].type}
                slug={work[1].slug}
              />
            </div>
          )}

          {work[2] && (
            <div style={{ gridColumn: '5 / 9', gridRow: '3 / 4' }}>
              <GalleryCell
                href={`/work/${work[2].slug}`}
                title={work[2].title}
                year={work[2].year}
                type={work[2].type}
                slug={work[2].slug}
              />
            </div>
          )}

          <div style={{ gridColumn: '9 / 13', gridRow: '3 / 4' }}>
            <IdentityCell />
          </div>

          {/* ── Row 4: Explicit 24px whitespace band — no cells placed ── */}

          {/* ── Row 5: TeeTurn + Politweets + Signals ── */}

          {exps[0] && (
            <div style={{ gridColumn: '1 / 6', gridRow: '5 / 6' }}>
              <GalleryCell
                href={`/work/${exps[0].slug}`}
                title={exps[0].title}
                year={exps[0].year}
                type={exps[0].type}
                slug={exps[0].slug}
              />
            </div>
          )}

          {exps[1] && (
            <div style={{ gridColumn: '6 / 9', gridRow: '5 / 6' }}>
              <GalleryCell
                href={`/work/${exps[1].slug}`}
                title={exps[1].title}
                year={exps[1].year}
                type={exps[1].type}
                slug={exps[1].slug}
              />
            </div>
          )}

          <div style={{ gridColumn: '9 / 13', gridRow: '5 / 6' }}>
            <SignalsCell />
          </div>
        </div>

        {/* ── Twittertale: below gallery as a spare list row ── */}
        {exps[2] && (
          <div
            style={{
              borderTop: '1px solid #D2D6C8',
              marginTop: '40px',
              paddingTop: '16px',
              display: 'flex',
              alignItems: 'baseline',
              gap: '16px',
            }}
          >
            <a
              href={`/work/${exps[2].slug}`}
              className="twittertale-link"
              style={{
                fontFamily: '"IBM Plex Sans", sans-serif',
                fontSize: '14px',
                color: '#484F3C',
                textDecoration: 'none',
                letterSpacing: '0em',
                transition: 'color 300ms ease',
              }}
            >
              {exps[2].title}
            </a>
            <span
              style={{
                fontFamily: '"IBM Plex Sans", sans-serif',
                fontSize: '9px',
                color: '#8A9280',
                letterSpacing: '0.08em',
                textTransform: 'uppercase' as const,
              }}
            >
              {exps[2].type}
            </span>
            <span
              style={{
                fontFamily: '"IBM Plex Sans", sans-serif',
                fontSize: '12px',
                color: '#8A9280',
                letterSpacing: '-0.01em',
              }}
            >
              {exps[2].year}
            </span>
          </div>
        )}
      </div>
    </>
  )
}