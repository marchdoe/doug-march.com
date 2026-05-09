import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

const galleryGrid = css({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridTemplateAreas: `
    "hero"
    "golf"
    "signals"
    "work"
  `,
  padding: '48px 5vw 64px 6vw',
  gap: '32px',
  '@media (min-width: 768px)': {
    gridTemplateColumns: '1fr 280px',
    gridTemplateAreas: `
      "hero golf"
      "hero signals"
      "work work"
    `,
    columnGap: '40px',
    rowGap: '0px',
    padding: '80px 5vw 64px 6vw',
  },
  '@media (min-width: 1024px)': {
    gridTemplateColumns: '1fr 304px',
  },
})

const heroBlock = css({
  gridArea: 'hero',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  paddingBottom: '48px',
  minHeight: '50vh',
  '@media (min-width: 768px)': {
    minHeight: '74vh',
  },
})

const heroLine = css({
  fontFamily: 'display',
  lineHeight: '0.92',
  letterSpacing: '-0.02em',
  fontWeight: 'bold',
  color: 'text',
  textTransform: 'uppercase',
  margin: 0,
  padding: 0,
  textWrap: 'balance',
})

const line1 = css({
  fontSize: 'clamp(48px, 8.5vw, 122px)',
})

const line2 = css({
  fontSize: 'clamp(56px, 10vw, 144px)',
})

const line3 = css({
  fontSize: 'clamp(72px, 14vw, 202px)',
  color: 'accent',
})

const attribution = css({
  fontFamily: 'body',
  fontWeight: 'light',
  fontSize: '13px',
  letterSpacing: '0.14em',
  color: 'textMuted',
  marginTop: '24px',
})

const footnoteQuote = css({
  fontFamily: 'body',
  fontStyle: 'italic',
  fontSize: '13px',
  lineHeight: '1.55',
  color: 'textMuted',
  marginTop: '20px',
  maxWidth: '42ch',
})

const golfBlock = css({
  gridArea: 'golf',
  paddingTop: '0',
  '@media (min-width: 768px)': {
    paddingTop: '80px',
  },
})

const sectionLabel = css({
  fontFamily: 'body',
  fontWeight: 'semibold',
  fontSize: '11px',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '16px',
})

const golfCard = css({
  borderLeft: '4px solid',
  borderLeftColor: 'accent',
  paddingLeft: '16px',
})

const golfRow = css({
  display: 'grid',
  gridTemplateColumns: '24px 1fr auto',
  gap: '8px',
  fontFamily: 'body',
  fontSize: '14px',
  lineHeight: '1.55',
  color: 'textSecondary',
  padding: '4px 0',
  fontVariantNumeric: 'tabular-nums',
})

const golfHighlight = css({
  color: 'accent',
  fontWeight: 'medium',
})

const signalsBlock = css({
  gridArea: 'signals',
  marginTop: '0',
  '@media (min-width: 768px)': {
    marginTop: '24px',
  },
  padding: '24px',
  background: 'bgCard',
  borderLeft: '4px solid',
  borderLeftColor: 'accent',
})

const signalLine = css({
  fontFamily: 'body',
  fontSize: '13px',
  lineHeight: '1.55',
  color: 'textMuted',
  padding: '4px 0',
})

const signalAccent = css({
  color: 'accentLight',
})

const workBand = css({
  gridArea: 'work',
  marginTop: '40px',
  paddingTop: '40px',
  borderTop: '1px solid',
  borderColor: 'border',
  '@media (min-width: 768px)': {
    marginTop: '80px',
  },
})

const projectsGrid = css({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '0',
  '@media (min-width: 768px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  '@media (min-width: 1024px)': {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
})

const projectCard = css({
  padding: '24px 20px',
  borderLeft: '4px solid transparent',
  transition: 'border-left-color 0.15s ease, background 0.15s ease',
  _hover: {
    borderLeftColor: 'accent',
    background: 'bgCard',
  },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '-2px',
  },
})

const projectTitle = css({
  fontFamily: 'body',
  fontWeight: 'semibold',
  fontSize: '16px',
  color: 'text',
  marginBottom: '4px',
})

const projectMeta = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: 'textMuted',
  letterSpacing: '0.04em',
})

const projectProblem = css({
  fontFamily: 'body',
  fontSize: '14px',
  lineHeight: '1.55',
  color: 'textSecondary',
  marginTop: '8px',
  maxWidth: '50ch',
})

const featuredTag = css({
  display: 'inline-block',
  fontFamily: 'body',
  fontSize: '10px',
  fontWeight: 'semibold',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'accent',
  background: 'transparent',
  border: '1px solid',
  borderColor: 'accent',
  borderRadius: '2px',
  padding: '2px 8px',
  marginLeft: '8px',
  verticalAlign: 'middle',
})

const experimentsSection = css({
  marginTop: '48px',
  paddingTop: '32px',
  borderTop: '1px solid',
  borderColor: 'border',
})

const expGrid = css({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '0',
  '@media (min-width: 768px)': {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
})

const footerBar = css({
  marginTop: '80px',
  paddingTop: '24px',
  borderTop: '1px solid',
  borderColor: 'border',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: '24px',
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textMuted',
})

const golfLeaders = [
  { rank: 1, name: 'Sungjae Im', score: '–9', highlight: true },
  { rank: 2, name: 'S. Straka', score: '–7', highlight: false },
  { rank: 3, name: 'T. Finau', score: '–6', highlight: false },
  { rank: 4, name: 'C. Young', score: '–6', highlight: false },
  { rank: 5, name: 'B. Horschel', score: '–5', highlight: false },
]

function HomePage() {
  return (
    <div className={galleryGrid}>
      {/* HERO */}
      <div className={heroBlock}>
        <h1>
          <span className={`${heroLine} ${line1}`}>The unreasonable</span>
          <span className={`${heroLine} ${line2}`}>effectiveness</span>
          <span className={`${heroLine} ${line3}`}>of HTML</span>
        </h1>
        <p className={attribution}>HN ↑147 · via @trq212</p>
        <p className={footnoteQuote}>
          "To achieve, you need thought. You have to know what you are doing and that's real power."
        </p>
      </div>

      {/* GOLF */}
      <div className={golfBlock}>
        <div className={sectionLabel}>Truist Championship · In Progress</div>
        <div className={golfCard}>
          {golfLeaders.map((g) => (
            <div className={golfRow} key={g.rank}>
              <span>{g.rank}</span>
              <span className={g.highlight ? golfHighlight : ''}>{g.name}</span>
              <span className={g.highlight ? golfHighlight : ''}>{g.score}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SIGNALS */}
      <div className={signalsBlock}>
        <div className={sectionLabel}>Signals</div>
        <div className={signalLine}>▼ <span style={{ color: '#9290B8' }}>DET 3 — 4 OPP</span></div>
        <div className={signalLine}>🎵 Guided by Voices · Tobin Sprout · Radiohead</div>
        <div className={signalLine}>
          <span className={signalAccent}>✦ Mother's Day tomorrow</span>
        </div>
        <div className={signalLine}>🌙 Last quarter · 41%</div>
        <div className={signalLine}>☀ 13.9h daylight</div>
      </div>

      {/* WORK BAND */}
      <div className={workBand}>
        <div className={sectionLabel}>Selected Work</div>

        {/* Featured */}
        {featuredProject && (
          <a
            href={featuredProject.externalUrl || `/work/${featuredProject.slug}`}
            className={projectCard}
            style={{ display: 'block', textDecoration: 'none', marginBottom: '8px' }}
          >
            <div className={projectTitle}>
              {featuredProject.title}
              <span className={featuredTag}>Featured</span>
            </div>
            <div className={projectMeta}>{featuredProject.type} · {featuredProject.year}</div>
            {featuredProject.problem && (
              <p className={projectProblem}>{featuredProject.problem}</p>
            )}
          </a>
        )}

        <div className={projectsGrid}>
          {selectedWork.map((p) => (
            <a
              key={p.slug}
              href={`/work/${p.slug}`}
              className={projectCard}
              style={{ display: 'block', textDecoration: 'none' }}
            >
              <div className={projectTitle}>{p.title}</div>
              <div className={projectMeta}>{p.type} · {p.year}</div>
              {p.problem && (
                <p className={projectProblem}>{p.problem}</p>
              )}
            </a>
          ))}
        </div>

        {/* Experiments */}
        <div className={experimentsSection}>
          <div className={sectionLabel}>Experiments</div>
          <div className={expGrid}>
            {experiments.map((e) => (
              <a
                key={e.slug}
                href={e.externalUrl || `/work/${e.slug}`}
                className={projectCard}
                style={{ display: 'block', textDecoration: 'none' }}
              >
                <div className={projectTitle}>{e.title}</div>
                <div className={projectMeta}>{e.type} · {e.year}</div>
                {e.description && (
                  <p className={projectProblem}>{e.description}</p>
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className={footerBar}>
          <span className={footerText}>© Doug March · Product Designer & Developer</span>
          <a href="/archive" className={footerText} style={{ textDecoration: 'none' }}>Archive</a>
        </div>
      </div>
    </div>
  )
}