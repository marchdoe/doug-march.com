import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

const heroSection = css({
  padding: '48px 6vw 40px',
  minHeight: '42vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
})

const heroPhrase = css({
  fontFamily: 'display',
  fontSize: 'clamp(48px, 9vw, 130px)',
  lineHeight: '0.92',
  letterSpacing: '-0.01em',
  color: 'accent',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  maxWidth: '100%',
})

const heroAttribution = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textMuted',
  marginTop: '16px',
  letterSpacing: '0.05em',
})

const indexBody = css({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '0',
  padding: '0 6vw 80px',
  borderTop: '1px solid',
  borderColor: 'border',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
  },
})

const columnLeft = css({
  borderRight: '1px solid',
  borderColor: 'border',
  paddingRight: '32px',
  '@media (max-width: 768px)': {
    borderRight: 'none',
    paddingRight: '0',
  },
})

const columnRight = css({
  paddingLeft: '32px',
  '@media (max-width: 768px)': {
    paddingLeft: '0',
    borderTop: '1px solid',
    borderColor: 'border',
  },
})

const sectionBlock = css({
  padding: '48px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
  _last: { borderBottom: 'none' },
})

const sectionLabel = css({
  fontFamily: 'display',
  fontSize: '20px',
  fontWeight: 'bold',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: 'textMuted',
  lineHeight: '1.1',
  marginBottom: '24px',
})

const indexRow = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '56px',
  padding: '0 8px',
  borderBottom: '1px solid',
  borderColor: 'borderSubtle',
  transition: 'all 0.12s ease',
  _last: { borderBottom: 'none' },
  _hover: {
    background: 'bgHover',
    borderLeft: '2px solid',
    borderLeftColor: 'accent',
    paddingLeft: '6px',
  },
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
  },
})

const rowLink = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  height: '100%',
  textDecoration: 'none',
  color: 'text',
  _hover: { color: 'accent' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '-2px' },
})

const rowTitle = css({
  fontFamily: 'body',
  fontSize: '16px',
  fontWeight: 'medium',
  letterSpacing: '0.01em',
  color: 'text',
})

const rowMeta = css({
  fontFamily: 'body',
  fontSize: '13px',
  fontWeight: 'normal',
  letterSpacing: '0.05em',
  color: 'textSecondary',
  flexShrink: 0,
  marginLeft: '16px',
  fontVariantNumeric: 'tabular-nums',
})

const rowType = css({
  fontFamily: 'body',
  fontSize: '12px',
  fontWeight: 'normal',
  letterSpacing: '0.08em',
  color: 'textMuted',
  textTransform: 'uppercase',
  flexShrink: 0,
  marginLeft: '12px',
})

const featuredRow = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  padding: '16px 8px',
  borderBottom: '1px solid',
  borderColor: 'borderSubtle',
})

const featuredTitle = css({
  fontFamily: 'body',
  fontSize: '18px',
  fontWeight: 'medium',
  color: 'text',
  letterSpacing: '0.01em',
})

const featuredProblem = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'textSecondary',
  lineHeight: '1.55',
  maxWidth: '65ch',
})

const featuredLink = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: 'accent',
  textDecoration: 'none',
  letterSpacing: '0.05em',
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: '44px',
  _hover: { color: 'accentLight' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
})

const signalRow = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '56px',
  padding: '0 8px',
  borderBottom: '1px solid',
  borderColor: 'borderSubtle',
  _last: { borderBottom: 'none' },
})

const signalTitle = css({
  fontFamily: 'body',
  fontSize: '14px',
  fontWeight: 'normal',
  color: 'textSecondary',
  letterSpacing: '0.01em',
})

const signalScore = css({
  fontFamily: 'body',
  fontSize: '14px',
  fontWeight: 'medium',
  color: 'accent',
  fontVariantNumeric: 'tabular-nums',
  flexShrink: 0,
  marginLeft: '16px',
})

const signalMuted = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: 'textMuted',
  letterSpacing: '0.05em',
})

const repoRow = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '44px',
  padding: '0 8px',
  borderBottom: '1px solid',
  borderColor: 'borderSubtle',
  _last: { borderBottom: 'none' },
})

const repoName = css({
  fontFamily: 'mono',
  fontSize: '13px',
  color: 'textSecondary',
  letterSpacing: '0',
})

const repoTag = css({
  fontFamily: 'body',
  fontSize: '11px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'textMuted',
  flexShrink: 0,
})

const footerBar = css({
  padding: '16px 6vw',
  borderTop: '1px solid',
  borderColor: 'border',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '8px',
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textMuted',
  letterSpacing: '0.05em',
})

const footerLink = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textMuted',
  textDecoration: 'none',
  _hover: { color: 'accent' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
})

function HomePage() {
  return (
    <>
      {/* Hero / Masthead */}
      <section className={heroSection}>
        <h1 className={heroPhrase}>
          The future<br />
          depends on what<br />
          you do today.
        </h1>
        <p className={heroAttribution}>— Mahatma Gandhi</p>
      </section>

      {/* Index Body */}
      <div className={indexBody}>
        {/* LEFT COLUMN — Portfolio */}
        <div className={columnLeft}>
          {/* Featured */}
          {featuredProject && (
            <section className={sectionBlock}>
              <h2 className={sectionLabel}>Featured</h2>
              <div className={featuredRow}>
                <span className={featuredTitle}>{featuredProject.title}</span>
                {featuredProject.problem && (
                  <p className={featuredProblem}>{featuredProject.problem}</p>
                )}
                {featuredProject.externalUrl && (
                  <a href={featuredProject.externalUrl} className={featuredLink}>
                    Visit {featuredProject.title} →
                  </a>
                )}
              </div>
            </section>
          )}

          {/* Selected Work */}
          <section className={sectionBlock}>
            <h2 className={sectionLabel}>Work</h2>
            {selectedWork.map((p) => (
              <div key={p.slug} className={indexRow}>
                <a href={`/work/${p.slug}`} className={rowLink}>
                  <span className={rowTitle}>{p.title}</span>
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <span className={rowType}>{p.type}</span>
                    <span className={rowMeta}>{p.year}</span>
                  </span>
                </a>
              </div>
            ))}
          </section>

          {/* Experiments */}
          <section className={sectionBlock}>
            <h2 className={sectionLabel}>Experiments</h2>
            {experiments.map((p) => (
              <div key={p.slug} className={indexRow}>
                <a href={p.externalUrl || `/work/${p.slug}`} className={rowLink}>
                  <span className={rowTitle}>{p.title}</span>
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <span className={rowType}>{p.type}</span>
                    <span className={rowMeta}>{p.year}</span>
                  </span>
                </a>
              </div>
            ))}
          </section>
        </div>

        {/* RIGHT COLUMN — Signals */}
        <div className={columnRight}>
          {/* Golf */}
          <section className={sectionBlock}>
            <h2 className={sectionLabel}>Golf · Memorial Tournament Final</h2>
            <div className={signalRow}>
              <span className={signalTitle}>J.T. Poston</span>
              <span className={signalScore}>−12</span>
            </div>
            <div className={signalRow}>
              <span className={signalTitle}>Ryan Gerard</span>
              <span className={signalScore}>−12</span>
            </div>
            <div className={signalRow}>
              <span className={signalTitle}>Wyndham Clark</span>
              <span className={rowMeta}>−11</span>
            </div>
          </section>

          {/* Now Playing */}
          <section className={sectionBlock}>
            <h2 className={sectionLabel}>Now Playing</h2>
            <div className={signalRow}>
              <span className={signalTitle}>The War on Drugs</span>
            </div>
            <div className={signalRow}>
              <span className={signalTitle}>Radiohead</span>
            </div>
            <div className={signalRow}>
              <span className={signalTitle}>My Morning Jacket</span>
            </div>
          </section>

          {/* Signal / HN */}
          <section className={sectionBlock}>
            <h2 className={sectionLabel}>Signal / HN</h2>
            <div className={signalRow}>
              <span className={signalTitle}>OpenCV 5 released with major overhaul</span>
              <span className={signalScore}>233</span>
            </div>
            <div className={signalRow}>
              <span className={signalTitle}>Microsoft AI developer tools hacked</span>
              <span className={signalScore}>191</span>
            </div>
          </section>

          {/* Recent Stars */}
          <section className={sectionBlock}>
            <h2 className={sectionLabel}>Recent Stars</h2>
            <div className={repoRow}>
              <span className={repoName}>browser-use/browser-use</span>
              <span className={repoTag}>Python</span>
            </div>
            <div className={repoRow}>
              <span className={repoName}>pydantic/pydantic-ai</span>
              <span className={repoTag}>Python</span>
            </div>
            <div className={repoRow}>
              <span className={repoName}>anthropics/claude-code</span>
              <span className={repoTag}>TypeScript</span>
            </div>
            <div className={repoRow}>
              <span className={repoName}>vercel/ai</span>
              <span className={repoTag}>TypeScript</span>
            </div>
            <div className={repoRow}>
              <span className={repoName}>tinygrad/tinygrad</span>
              <span className={repoTag}>Python</span>
            </div>
          </section>

          {/* Moon */}
          <section className={sectionBlock}>
            <div className={signalRow}>
              <span className={signalMuted}>Moon — Waning Crescent · 26%</span>
            </div>
          </section>

          {/* Detroit */}
          <section className={sectionBlock}>
            <div className={signalRow}>
              <span className={signalMuted}>Detroit · All Teams · Off Season</span>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className={footerBar}>
        <span className={footerText}>Sunrise 04:49 · Sunset 19:29 · 14.7h</span>
        <span style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <a href="/archive" className={footerLink}>Archive</a>
          <span className={footerText}>© 2026</span>
        </span>
      </footer>
    </>
  )
}