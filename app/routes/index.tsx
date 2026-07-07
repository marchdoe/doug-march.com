import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

const heroBand = css({
  width: '100%',
  minHeight: 'calc(90vh - 56px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  padding: '7vh 6vw 0',
  position: 'relative',
})

const heroPhrase = css({
  fontFamily: 'display',
  fontSize: 'clamp(3rem, 8.5vw, 10.5rem)',
  lineHeight: 'tight',
  letterSpacing: 'tight',
  textTransform: 'uppercase',
  color: 'text',
  maxWidth: '100%',
  textWrap: 'balance',
})

const heroAttribution = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  color: 'textDim',
  letterSpacing: 'wider',
  textTransform: 'uppercase',
  marginTop: '32px',
  paddingBottom: '24px',
})

const heroRule = css({
  width: '100%',
  height: '1px',
  background: 'borderAccent',
})

const signalBand = css({
  width: '100%',
  minHeight: '160px',
  padding: '0 6vw',
  display: 'grid',
  gridTemplateColumns: '1fr 1px 1.8fr 1px 1fr',
  alignItems: 'center',
  background: 'bgSignal',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
    gap: '0',
    padding: '24px 6vw',
    minHeight: 'auto',
  },
})

const signalDivider = css({
  width: '1px',
  height: '60%',
  background: 'borderAccent',
  alignSelf: 'center',
  '@media (max-width: 768px)': {
    width: '100%',
    height: '1px',
    margin: '16px 0',
  },
})

const signalCol = css({
  padding: '24px 24px',
  '@media (max-width: 768px)': {
    padding: '12px 0',
  },
})

const signalEyebrow = css({
  fontFamily: 'body',
  fontSize: '0.65rem',
  color: 'textDim',
  textTransform: 'uppercase',
  letterSpacing: '0.15em',
  marginBottom: '8px',
})

const signalScore = css({
  fontFamily: 'display',
  fontSize: '2.5rem',
  color: 'accentLight',
  lineHeight: '0.9',
})

const signalName = css({
  fontFamily: 'display',
  fontSize: '1rem',
  color: 'text',
  textTransform: 'uppercase',
})

const signalSub = css({
  fontFamily: 'body',
  fontSize: '0.7rem',
  color: 'textDim',
  marginTop: '6px',
  textTransform: 'uppercase',
  letterSpacing: 'wider',
})

const hnEntry = css({
  fontFamily: 'body',
  fontSize: '0.8rem',
  color: 'textSecondary',
  lineHeight: '1.2',
  marginBottom: '6px',
})

const hnScore = css({
  fontWeight: 'bold',
  color: 'accentLight',
})

const hnScoreGlow = css({
  fontWeight: 'bold',
  color: 'accentLight',
  textShadow: '0 0 12px rgba(13,229,145,0.5)',
})

const workBandSection = css({
  width: '100%',
  padding: '80px 6vw',
  '@media (max-width: 768px)': {
    padding: '48px 6vw',
  },
})

const workBandLabel = css({
  fontFamily: 'body',
  fontSize: '0.65rem',
  color: 'textDim',
  textTransform: 'uppercase',
  letterSpacing: '0.15em',
  marginBottom: '32px',
})

const featuredCard = css({
  background: 'bgCard',
  padding: '48px',
  borderLeft: '2px solid',
  borderColor: 'accentLight',
  marginBottom: '48px',
  transition: 'background 0.2s ease, box-shadow 0.2s ease',
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
  },
  _hover: {
    background: 'bgSubtle',
    boxShadow: '-2px 0 16px rgba(13,229,145,0.25)',
  },
  '@media (max-width: 768px)': {
    padding: '24px',
  },
})

const featuredTitle = css({
  fontFamily: 'display',
  fontSize: 'clamp(1.5rem, 3vw, 3rem)',
  color: 'text',
  textTransform: 'uppercase',
  lineHeight: 'snug',
  marginBottom: '16px',
})

const featuredProblem = css({
  fontFamily: 'body',
  fontSize: '1rem',
  color: 'textSecondary',
  lineHeight: 'normal',
  maxWidth: '65ch',
  marginBottom: '20px',
})

const featuredLink = css({
  fontFamily: 'body',
  fontSize: '0.8rem',
  color: 'accent',
  textTransform: 'uppercase',
  letterSpacing: 'wider',
  textDecoration: 'none',
  display: 'inline-block',
  padding: '10px 0',
  _hover: {
    color: 'accentLight',
  },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accentLight',
    outlineOffset: '4px',
  },
})

const workGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '1px',
  background: 'borderAccent',
  '@media (max-width: 1024px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  '@media (max-width: 640px)': {
    gridTemplateColumns: '1fr',
  },
})

const workCard = css({
  background: 'bgCard',
  padding: '32px',
  borderLeft: '2px solid transparent',
  transition: 'background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
  },
  _hover: {
    background: 'bgSubtle',
    borderLeftColor: 'accentLight',
    boxShadow: '-2px 0 12px rgba(13,229,145,0.3)',
  },
})

const workCardLink = css({
  textDecoration: 'none',
  display: 'block',
  color: 'inherit',
  minHeight: '44px',
  _focus: {
    outline: '2px solid',
    outlineColor: 'accentLight',
    outlineOffset: '2px',
  },
})

const workCardType = css({
  fontFamily: 'body',
  fontSize: '0.65rem',
  color: 'textDim',
  textTransform: 'uppercase',
  letterSpacing: '0.15em',
  marginBottom: '8px',
})

const workCardTitle = css({
  fontFamily: 'display',
  fontSize: '1.25rem',
  color: 'text',
  textTransform: 'uppercase',
  lineHeight: 'snug',
  marginBottom: '4px',
})

const workCardYear = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  color: 'textDim',
  letterSpacing: 'wider',
})

const experimentsBand = css({
  width: '100%',
  padding: '64px 6vw',
  background: 'bgCard',
  '@media (max-width: 768px)': {
    padding: '40px 6vw',
  },
})

const expGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '32px',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
    gap: '24px',
  },
})

const expCard = css({
  borderLeft: '1px solid',
  borderColor: 'borderAccent',
  paddingLeft: '20px',
})

const expTitle = css({
  fontFamily: 'display',
  fontSize: '1rem',
  color: 'text',
  textTransform: 'uppercase',
  marginBottom: '4px',
})

const expMeta = css({
  fontFamily: 'body',
  fontSize: '0.7rem',
  color: 'textDim',
  textTransform: 'uppercase',
  letterSpacing: 'wider',
})

const expLink = css({
  textDecoration: 'none',
  display: 'block',
  color: 'inherit',
  minHeight: '44px',
  _focus: {
    outline: '2px solid',
    outlineColor: 'accentLight',
    outlineOffset: '4px',
  },
})

const footerBand = css({
  width: '100%',
  padding: '32px 6vw',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderTop: '1px solid',
  borderColor: 'borderAccent',
  '@media (max-width: 640px)': {
    flexDirection: 'column',
    gap: '12px',
    alignItems: 'flex-start',
  },
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '0.7rem',
  color: 'textDim',
  letterSpacing: 'wider',
  textTransform: 'uppercase',
})

const footerLink = css({
  fontFamily: 'body',
  fontSize: '0.7rem',
  color: 'textDim',
  letterSpacing: 'wider',
  textTransform: 'uppercase',
  textDecoration: 'none',
  padding: '10px 0',
  _hover: {
    color: 'accentLight',
  },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accentLight',
    outlineOffset: '4px',
  },
})

const quoteFooter = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  color: 'textDim',
  fontStyle: 'italic',
  padding: '0 6vw 24px',
  maxWidth: '65ch',
})

function HomePage() {
  return (
    <>
      {/* HERO BAND */}
      <section className={heroBand}>
        <h1 className={heroPhrase}>
          the coming AI margin collapse
        </h1>
        <p className={heroAttribution}>
          — Martin Alderson · Hacker News · 457 pts
        </p>
        <div className={heroRule} />
      </section>

      {/* SIGNAL BAND */}
      <section className={signalBand} aria-label="Daily signals">
        <div className={signalCol}>
          <div className={signalEyebrow}>John Deere Classic · Final</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
            <span className={signalName}>Gotterup</span>
            <span className={signalScore}>−20</span>
          </div>
          <div className={signalSub}>Homa −19 · Kohles −18</div>
        </div>

        <div className={signalDivider} />

        <div className={signalCol}>
          <div className={signalEyebrow}>Hacker News Today</div>
          <div className={hnEntry}>
            <span className={hnScoreGlow}>457</span> · AI Margin Collapse ↑
          </div>
          <div className={hnEntry}>
            <span className={hnScore}>312</span> · Show HN: Open-source LLM benchmarks
          </div>
          <div className={hnEntry}>
            <span className={hnScore}>289</span> · Why SQLite is taking over embedded
          </div>
        </div>

        <div className={signalDivider} />

        <div className={signalCol}>
          <div className={signalEyebrow}>Dispatch</div>
          <div className={signalSub} style={{ marginTop: 0 }}>
            My Morning Jacket · Guided by Voices · Wet Leg
          </div>
          <div className={signalSub}>◑ Last Quarter 41%</div>
          <div className={signalSub}>☀ 14.6h Daylight</div>
          <div className={css({ fontFamily: 'body', fontSize: '0.7rem', color: 'textDim', fontStyle: 'italic', marginTop: '4px' })}>
            All teams off season
          </div>
        </div>
      </section>

      {/* FEATURED PROJECT */}
      <section className={workBandSection}>
        <div className={workBandLabel}>Featured</div>
        {featuredProject && (
          <div className={featuredCard}>
            <h2 className={featuredTitle}>{featuredProject.title}</h2>
            {featuredProject.problem && (
              <p className={featuredProblem}>{featuredProject.problem}</p>
            )}
            {featuredProject.externalUrl && (
              <a href={featuredProject.externalUrl} className={featuredLink}>
                Visit {featuredProject.title} →
              </a>
            )}
          </div>
        )}

        {/* SELECTED WORK GRID */}
        <div className={workBandLabel}>Selected Work</div>
        <div className={workGrid}>
          {selectedWork.map((project) => (
            <a
              key={project.slug}
              href={`/work/${project.slug}`}
              className={workCardLink}
            >
              <div className={workCard}>
                <div className={workCardType}>{project.type} · {project.year}</div>
                <div className={workCardTitle}>{project.title}</div>
                {project.role && (
                  <div className={workCardYear}>{project.role}</div>
                )}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* EXPERIMENTS BAND */}
      <section className={experimentsBand}>
        <div className={workBandLabel}>Experiments</div>
        <div className={expGrid}>
          {experiments.map((exp) => (
            <a
              key={exp.slug}
              href={`/work/${exp.slug}`}
              className={expLink}
            >
              <div className={expCard}>
                <div className={expTitle}>{exp.title}</div>
                <div className={expMeta}>{exp.type} · {exp.year}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <div className={quoteFooter}>
        "Be the reason someone smiles. Be the reason someone feels loved and believes in the goodness in people." — Roy T. Bennett
      </div>
      <footer className={footerBand}>
        <span className={footerText}>© 2026 Doug March</span>
        <a href="/archive" className={footerLink}>Archive</a>
      </footer>
    </>
  )
}