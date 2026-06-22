import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

const heroBand = css({
  minHeight: '100vh',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '0 6vw',
  background: 'bg',
  position: 'relative',
})

const heroText = css({
  fontFamily: 'display',
  fontSize: 'clamp(80px, 22vw, 320px)',
  lineHeight: '0.85',
  letterSpacing: '0.01em',
  color: 'accent',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  margin: 0,
  padding: 0,
})

const heroRule = css({
  width: 'clamp(160px, 22vw, 280px)',
  height: '1px',
  background: 'accent',
  border: 'none',
  marginTop: '32px',
  marginBottom: '24px',
})

const heroAttribution = css({
  fontFamily: 'body',
  fontSize: '13px',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: 'textSecondary',
  lineHeight: '1.1',
})

const leaderboardBand = css({
  width: '100%',
  background: 'bgCard',
  padding: '72px 6vw',
  borderTop: '1px solid',
  borderColor: 'border',
})

const eyebrow = css({
  fontFamily: 'body',
  fontSize: '11px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'textSecondary',
  marginBottom: '32px',
})

const lbRow = css({
  display: 'grid',
  gridTemplateColumns: '40px 1fr auto',
  alignItems: 'center',
  height: '48px',
  padding: '0 12px',
  borderBottom: '1px solid',
  borderColor: 'border',
  transition: 'background 0.15s ease',
  _hover: {
    background: '#1A2619',
  },
})

const lbRowHighlight = css({
  display: 'grid',
  gridTemplateColumns: '40px 1fr auto',
  alignItems: 'center',
  height: '48px',
  padding: '0 12px',
  borderBottom: '1px solid',
  borderColor: 'border',
  borderLeft: '3px solid',
  borderLeftColor: 'accent',
  background: '#0D2209',
  transition: 'background 0.15s ease',
  _hover: {
    background: '#1A2619',
  },
})

const lbPos = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: 'textMuted',
})

const lbName = css({
  fontFamily: 'body',
  fontSize: '16px',
  fontWeight: 'medium',
  color: 'text',
  letterSpacing: '0.05em',
})

const lbScore = css({
  fontFamily: 'display',
  fontSize: '28px',
  color: 'textSecondary',
  lineHeight: '1',
})

const lbScoreGreen = css({
  fontFamily: 'display',
  fontSize: '28px',
  color: 'accent',
  lineHeight: '1',
})

const lbScoreSecond = css({
  fontFamily: 'display',
  fontSize: '28px',
  color: 'accentBright',
  lineHeight: '1',
})

const workBand = css({
  width: '100%',
  background: 'bg',
  padding: '96px 6vw',
  borderTop: '1px solid',
  borderColor: 'border',
})

const workGrid = css({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '0',
  '@media (min-width: 768px)': {
    gridTemplateColumns: '1fr 1fr',
  },
})

const workItem = css({
  padding: '24px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
  transition: 'border-color 0.2s ease',
  display: 'block',
  textDecoration: 'none',
  _hover: {
    borderColor: 'accent',
  },
  '@media (min-width: 768px)': {
    padding: '24px 16px',
    '&:nth-child(odd)': {
      borderRight: '1px solid',
      borderRightColor: 'border',
    },
  },
})

const workItemFeatured = css({
  padding: '32px 0',
  borderBottom: '1px solid',
  borderColor: 'accent',
  display: 'block',
  textDecoration: 'none',
  gridColumn: '1 / -1',
  marginBottom: '16px',
  _hover: {
    textDecoration: 'none',
  },
})

const workTitle = css({
  fontFamily: 'display',
  fontSize: 'clamp(24px, 4vw, 48px)',
  lineHeight: '1.1',
  color: 'text',
  marginBottom: '8px',
  transition: 'color 0.2s ease',
})

const workMeta = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'textMuted',
})

const workProblem = css({
  fontFamily: 'body',
  fontSize: '16px',
  lineHeight: '1.5',
  color: 'textSecondary',
  marginTop: '12px',
  maxWidth: '60ch',
})

const workSmallTitle = css({
  fontFamily: 'body',
  fontSize: '18px',
  fontWeight: 'medium',
  color: 'text',
  marginBottom: '4px',
  transition: 'color 0.2s ease',
})

const signalsBand = css({
  width: '100%',
  background: '#0F1509',
  padding: '64px 6vw',
  borderTop: '1px solid',
  borderColor: 'border',
})

const signalsGrid = css({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '32px',
  '@media (min-width: 768px)': {
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '24px',
  },
})

const signalBlock = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
})

const signalScore = css({
  fontFamily: 'display',
  fontSize: '36px',
  color: 'accent',
  lineHeight: '1.1',
})

const signalSub = css({
  fontFamily: 'body',
  fontSize: '11px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'textMuted',
})

const signalQuote = css({
  fontFamily: 'body',
  fontSize: '14px',
  fontStyle: 'italic',
  color: 'textSecondary',
  lineHeight: '1.5',
  borderLeft: '2px solid',
  borderLeftColor: 'borderStrong',
  paddingLeft: '16px',
})

const signalBadge = css({
  fontFamily: 'body',
  fontSize: '11px',
  color: 'accent',
  marginTop: '8px',
})

const signalMoon = css({
  fontFamily: 'body',
  fontSize: '11px',
  letterSpacing: '0.05em',
  color: 'textMuted',
})

const signalMusic = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textMuted',
  lineHeight: '1.5',
})

const footerBand = css({
  width: '100%',
  background: 'bgCard',
  padding: '72px 6vw 48px',
  borderTop: '1px solid',
  borderColor: 'border',
})

const footerInner = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  '@media (min-width: 768px)': {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
})

const footerName = css({
  fontFamily: 'display',
  fontSize: 'clamp(32px, 6vw, 64px)',
  lineHeight: '0.85',
  color: 'text',
})

const footerRole = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'textSecondary',
  marginTop: '8px',
})

const footerLinks = css({
  display: 'flex',
  gap: '24px',
  alignItems: 'center',
})

const footerLink = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: 'textMuted',
  textDecoration: 'none',
  minHeight: '44px',
  display: 'flex',
  alignItems: 'center',
  transition: 'color 0.2s ease',
  _hover: {
    color: 'accent',
  },
})

const sectionLabel = css({
  fontFamily: 'body',
  fontSize: '11px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '32px',
})

const expGrid = css({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '0',
  marginTop: '48px',
  '@media (min-width: 768px)': {
    gridTemplateColumns: '1fr 1fr 1fr',
  },
})

const expItem = css({
  padding: '16px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
  textDecoration: 'none',
  display: 'block',
  transition: 'border-color 0.2s ease',
  _hover: {
    borderColor: 'accent',
  },
  '@media (min-width: 768px)': {
    padding: '16px',
    borderRight: '1px solid',
    borderRightColor: 'border',
    '&:last-child': {
      borderRight: 'none',
    },
  },
})

const expTitle = css({
  fontFamily: 'body',
  fontSize: '16px',
  fontWeight: 'medium',
  color: 'text',
  marginBottom: '4px',
})

const expMeta = css({
  fontFamily: 'body',
  fontSize: '11px',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: 'textMuted',
})

const leaderboard = [
  { pos: 1, name: 'Wyndham Clark', score: '−4', highlight: true },
  { pos: 2, name: 'Sam Burns', score: '−3', second: true },
  { pos: 'T3', name: 'Collin Morikawa', score: '−2' },
  { pos: 'T3', name: 'Hideki Matsuyama', score: '−2' },
  { pos: 'T5', name: 'Scottie Scheffler', score: '−1' },
  { pos: 'T5', name: 'Xander Schauffele', score: '−1' },
]

function HomePage() {
  const featured = featuredProject
  const golfSlugs = ['teeturn', '15th-club']

  return (
    <>
      {/* Band 1 — Hero */}
      <section className={heroBand}>
        <div>
          <h1 className={heroText}>
            HELD.<br />AGAIN.
          </h1>
          <hr className={heroRule} />
          <p className={heroAttribution}>
            Wyndham Clark · −4 · U.S. Open Final · June 22
          </p>
        </div>
      </section>

      {/* Band 2 — Leaderboard */}
      <section className={leaderboardBand}>
        <p className={eyebrow}>U.S. Open Final · 2026</p>
        <div>
          {leaderboard.map((row) => (
            <div
              key={row.name}
              className={row.highlight ? lbRowHighlight : lbRow}
            >
              <span className={lbPos}>{row.pos}</span>
              <span className={lbName}>{row.name}</span>
              <span className={row.highlight ? lbScoreGreen : row.second ? lbScoreSecond : lbScore}>
                {row.score}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Band 3 — Work */}
      <section className={workBand}>
        <p className={sectionLabel}>Selected Work</p>

        {/* Featured */}
        {featured && (
          <a
            href={featured.externalUrl || `/work/${featured.slug}`}
            className={workItemFeatured}
            {...(featured.externalUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            <p className={workMeta}>{featured.type} · {featured.year} · Featured</p>
            <h2 className={workTitle}>{featured.title}</h2>
            {featured.problem && <p className={workProblem}>{featured.problem}</p>}
          </a>
        )}

        {/* Selected work grid */}
        <div className={workGrid}>
          {selectedWork.map((project) => {
            const isGolf = golfSlugs.includes(project.slug)
            return (
              <a
                key={project.slug}
                href={`/work/${project.slug}`}
                className={workItem}
                style={isGolf ? { borderBottomColor: '#32D422' } : undefined}
              >
                <p className={workMeta}>{project.type} · {project.year}</p>
                <h3 className={workSmallTitle}>{project.title}</h3>
              </a>
            )
          })}
        </div>

        {/* Experiments */}
        <p className={css({
          fontFamily: 'body',
          fontSize: '11px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'textMuted',
          marginTop: '48px',
          marginBottom: '16px',
        })}>Experiments</p>
        <div className={expGrid}>
          {experiments.map((exp) => (
            <a
              key={exp.slug}
              href={exp.externalUrl || `/work/${exp.slug}`}
              className={expItem}
              {...(exp.externalUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <h4 className={expTitle}>{exp.title}</h4>
              <p className={expMeta}>{exp.type} · {exp.year}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Band 4 — Signals */}
      <section className={signalsBand}>
        <p className={eyebrow}>Today · June 22, 2026</p>
        <div className={signalsGrid}>
          <div className={signalBlock}>
            <span className={signalScore}>DET 5 · OAK 4</span>
            <span className={signalSub}>W · June 21</span>
          </div>

          <div className={signalBlock}>
            <blockquote className={signalQuote}>
              "Did my old job only exist because of fraud?"
            </blockquote>
            <span className={signalBadge}>620 ↑</span>
          </div>

          <div className={signalBlock}>
            <p className={signalMoon}>◐ First Quarter · 56%</p>
            <p className={signalMusic}>Radiohead, Guided by Voices, Tobin Sprout</p>
          </div>
        </div>
      </section>

      {/* Band 5 — Footer */}
      <footer className={footerBand}>
        <div className={footerInner}>
          <div>
            <h2 className={footerName}>Doug March</h2>
            <p className={footerRole}>Product Designer & Developer</p>
          </div>
          <div className={footerLinks}>
            <a href="/about" className={footerLink}>About</a>
            <a href="/archive" className={footerLink}>Archive</a>
          </div>
        </div>
      </footer>
    </>
  )
}