import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

const scrollRoot = css({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
})

const heroSection = css({
  minHeight: '100svh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  padding: '0 6vw',
  paddingBottom: '10vh',
  paddingTop: '52px',
  position: 'relative',
})

const dateline = css({
  color: 'textMuted',
  fontFamily: 'body',
  fontSize: '0.75rem',
  fontWeight: 'medium',
  letterSpacing: '0.20em',
  textTransform: 'uppercase',
  marginBottom: '48px',
})

const heroPhrase = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(3.5rem, 9.5vw, 13.5rem)',
  lineHeight: '0.9',
  letterSpacing: '-0.03em',
  color: 'text',
  textShadow: '0 0 80px rgba(255,147,48,0.15)',
  maxWidth: '100%',
})

const attribution = css({
  color: 'textMuted',
  fontFamily: 'body',
  fontSize: 'clamp(0.8125rem, 1.2vw, 0.9375rem)',
  lineHeight: '1.55',
  marginTop: '24px',
  letterSpacing: '0.04em',
})

const dispatchBand = css({
  width: '100%',
  background: 'bgCard',
  padding: '32px 6vw',
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
  flexWrap: 'wrap',
  borderTop: '1px solid',
  borderColor: 'border',
})

const dispatchItem = css({
  fontFamily: 'body',
  fontSize: '0.9375rem',
  lineHeight: '1.4',
  fontVariantNumeric: 'tabular-nums',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
})

const dispatchDivider = css({
  width: '1px',
  height: '20px',
  background: 'border',
  display: 'block',
  '@media (max-width: 640px)': { display: 'none' },
})

const resultBadge = css({
  background: 'accent',
  color: 'bg',
  fontFamily: 'body',
  fontSize: '0.6875rem',
  fontWeight: 'bold',
  letterSpacing: '0.05em',
  padding: '2px 6px',
  borderRadius: '2px',
  lineHeight: '1',
})

const sectionWrap = css({
  width: '100%',
  padding: '96px 6vw',
  borderTop: '1px solid',
  borderColor: 'border',
})

const sectionLabel = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  fontWeight: 'medium',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '48px',
})

const featuredCard = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
})

const featuredTitle = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(2.5rem, 5vw, 5rem)',
  lineHeight: '1.1',
  letterSpacing: '-0.02em',
  color: 'text',
})

const featuredProblem = css({
  fontFamily: 'body',
  fontSize: 'clamp(1rem, 1.5vw, 1.1875rem)',
  lineHeight: '1.55',
  color: 'textSecondary',
  maxWidth: '72ch',
})

const accentRule = css({
  width: '48px',
  height: '2px',
  background: 'accent',
  borderRadius: 'full',
})

const featuredLink = css({
  fontFamily: 'body',
  fontSize: '0.9375rem',
  fontWeight: 'medium',
  letterSpacing: '0.05em',
  color: 'accent',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  padding: '12px 0',
  minHeight: '44px',
  transition: 'color 0.18s ease',
  '&:hover': { color: 'accentLight' },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '4px',
    borderRadius: '2px',
  },
})

const projectGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '24px',
})

const projectCard = css({
  background: 'bgCard',
  borderRadius: '4px',
  padding: '32px',
  borderTop: '2px solid',
  borderColor: 'accent',
  transition: 'background 0.18s ease, border-color 0.18s ease',
  textDecoration: 'none',
  display: 'block',
  minHeight: '44px',
  '&:hover': {
    background: 'bgSurface',
    borderColor: 'accentLight',
  },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '4px',
  },
})

const cardTitle = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: '1.25rem',
  lineHeight: '1.1',
  color: 'text',
  marginBottom: '12px',
})

const cardMeta = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  fontWeight: 'medium',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: 'textMuted',
})

const expList = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
})

const expItem = css({
  display: 'flex',
  alignItems: 'baseline',
  gap: '16px',
  padding: '16px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
  flexWrap: 'wrap',
})

const expTitle = css({
  fontFamily: 'display',
  fontWeight: 'semibold',
  fontSize: '1.0625rem',
  color: 'text',
  textDecoration: 'none',
  transition: 'color 0.18s ease',
  minHeight: '44px',
  display: 'inline-flex',
  alignItems: 'center',
  '&:hover': { color: 'accentLight' },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '4px',
    borderRadius: '2px',
  },
})

const expMeta = css({
  fontFamily: 'body',
  fontSize: '0.8125rem',
  letterSpacing: '0.04em',
  color: 'textMuted',
})

const footerWrap = css({
  width: '100%',
  padding: '48px 6vw',
  borderTop: '1px solid',
  borderColor: 'border',
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: '16px',
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '0.8125rem',
  color: 'textMuted',
  letterSpacing: '0.04em',
})

const footerLink = css({
  fontFamily: 'body',
  fontSize: '0.8125rem',
  color: 'textMuted',
  letterSpacing: '0.04em',
  textDecoration: 'none',
  transition: 'color 0.18s ease',
  padding: '8px 0',
  minHeight: '44px',
  display: 'inline-flex',
  alignItems: 'center',
  '&:hover': { color: 'accentLight' },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '4px',
    borderRadius: '2px',
  },
})

function HomePage() {
  return (
    <div className={scrollRoot}>
      {/* Fold 1 — Hero */}
      <section className={heroSection}>
        <p className={dateline}>Mon 06 July 2026</p>
        <h1 className={heroPhrase}>
          Guided<br />by voices.
        </h1>
        <p className={attribution}>
          Guided by Voices, est. Dayton OH<br />
          with Tobin Sprout · My Morning Jacket
        </p>
      </section>

      {/* Fold 2 — Signal Dispatch */}
      <div className={dispatchBand} role="complementary" aria-label="Today's signals">
        <span className={dispatchItem} style={{ color: '#FFB862' }}>
          DET 6 · 3 CIN{' '}
          <span className={resultBadge}>W</span>
        </span>
        <span className={dispatchDivider} aria-hidden="true" />
        <span className={dispatchItem} style={{ color: '#BCA882' }}>
          Gotterup −20 · JD Classic Final
        </span>
        <span className={dispatchDivider} aria-hidden="true" />
        <span className={dispatchItem} style={{ color: '#93785A', fontStyle: 'italic' }}>
          ↓ Last Quarter · 52% lit
        </span>
      </div>

      {/* Fold 3 — Featured Project */}
      {featuredProject && (
        <section className={sectionWrap}>
          <p className={sectionLabel}>Featured</p>
          <div className={featuredCard}>
            <h2 className={featuredTitle}>{featuredProject.title}</h2>
            <div className={accentRule} />
            {featuredProject.problem && (
              <p className={featuredProblem}>{featuredProject.problem}</p>
            )}
            {featuredProject.externalUrl && (
              <a
                href={featuredProject.externalUrl}
                className={featuredLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit {featuredProject.title} →
              </a>
            )}
          </div>
        </section>
      )}

      {/* Fold 4 — Selected Work */}
      <section className={sectionWrap}>
        <p className={sectionLabel}>Selected Work</p>
        <div className={projectGrid}>
          {selectedWork.map((p) => (
            <a
              key={p.slug}
              href={`/work/${p.slug}`}
              className={projectCard}
            >
              <h3 className={cardTitle}>{p.title}</h3>
              <span className={cardMeta}>
                {p.type} · {p.year}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Fold 5 — Experiments */}
      <section className={sectionWrap}>
        <p className={sectionLabel}>Experiments</p>
        <div className={expList}>
          {experiments.map((e) => (
            <div key={e.slug} className={expItem}>
              <a
                href={e.externalUrl || `/work/${e.slug}`}
                className={expTitle}
                {...(e.externalUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {e.title}
              </a>
              <span className={expMeta}>
                {e.type} · {e.year}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className={footerWrap}>
        <span className={footerText}>© 2026 Doug March</span>
        <a href="/archive" className={footerLink}>Archive</a>
      </footer>
    </div>
  )
}