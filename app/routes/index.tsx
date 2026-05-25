import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Box, Flex } from '../../styled-system/jsx'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

const heroSection = css({
  width: '100vw',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '0 6vw',
  position: 'relative',
})

const heroPhrase = css({
  fontFamily: 'display',
  fontWeight: 'black',
  fontSize: 'clamp(48px, 11.5vw, 158px)',
  lineHeight: '0.88',
  letterSpacing: '-0.025em',
  color: 'text',
  textAlign: 'left',
  width: '90vw',
  maxWidth: '90vw',
  textWrap: 'balance',
})

const accentWord = css({
  color: 'accent',
})

const attribution = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: 'clamp(11px, 1.1vw, 14px)',
  letterSpacing: '0.08em',
  color: 'textMuted',
  marginTop: '32px',
  fontVariant: 'all-small-caps',
})

const heroRule = css({
  width: '94vw',
  height: '1px',
  background: 'border',
  position: 'absolute',
  bottom: '0',
  left: '3vw',
})

const sectionWrap = css({
  width: '100%',
  padding: '96px 8vw',
  minHeight: '80vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
})

const sectionAlt = css({
  width: '100%',
  padding: '96px 8vw',
  minHeight: '80vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  background: 'bgSection',
})

const eyebrow = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '11px',
  letterSpacing: '0.12em',
  color: 'accentLight',
  textTransform: 'uppercase',
  marginBottom: '48px',
})

const featuredTitle = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(36px, 5vw, 72px)',
  lineHeight: '1.05',
  letterSpacing: '-0.015em',
  color: 'text',
  marginBottom: '24px',
})

const featuredProblem = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: 'clamp(16px, 1.4vw, 20px)',
  lineHeight: '1.65',
  color: 'textSecondary',
  maxWidth: '65ch',
  marginBottom: '32px',
})

const featuredLink = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '14px',
  letterSpacing: '0.06em',
  color: 'accent',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  padding: '12px 0',
  transition: 'color 200ms ease',
  _hover: { color: 'accentLight' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px', borderRadius: 'sm' },
})

const workGrid = css({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '0',
  width: '100%',
  md: {
    gridTemplateColumns: '1fr',
  },
})

const workCard = css({
  display: 'flex',
  flexDirection: 'column',
  padding: '32px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
  transition: 'background 200ms ease',
  md: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: '32px',
  },
})

const workYear = css({
  fontFamily: 'mono',
  fontWeight: 'normal',
  fontSize: '13px',
  color: 'textMuted',
  letterSpacing: '0.02em',
  minWidth: '80px',
  marginBottom: '8px',
  md: { marginBottom: '0' },
  fontVariantNumeric: 'tabular-nums',
})

const workTitle = css({
  fontFamily: 'display',
  fontWeight: 'semibold',
  fontSize: 'clamp(20px, 2.5vw, 32px)',
  lineHeight: '1.1',
  color: 'text',
  flex: '1',
  marginBottom: '4px',
})

const workType = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '14px',
  color: 'textMuted',
  minWidth: '120px',
  textAlign: 'left',
  md: { textAlign: 'right' },
})

const workLink = css({
  textDecoration: 'none',
  color: 'inherit',
  display: 'block',
  _hover: {
    '& > div': {
      background: 'bgCard',
    },
  },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px', borderRadius: 'sm' },
})

const expGrid = css({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '16px',
  width: '100%',
  md: {
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px',
  },
})

const expCard = css({
  padding: '24px',
  background: 'bgCard',
  borderRadius: 'md',
  transition: 'background 200ms ease',
  _hover: { background: 'bgSubtle' },
})

const expTitle = css({
  fontFamily: 'display',
  fontWeight: 'semibold',
  fontSize: '18px',
  lineHeight: '1.2',
  color: 'text',
  marginBottom: '8px',
})

const expMeta = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: 'textMuted',
  marginBottom: '12px',
})

const expDesc = css({
  fontFamily: 'body',
  fontSize: '14px',
  lineHeight: '1.5',
  color: 'textSecondary',
})

const expLink = css({
  textDecoration: 'none',
  color: 'inherit',
  display: 'block',
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px', borderRadius: 'sm' },
})

/* Signal band */
const signalBand = css({
  width: '100%',
  padding: '64px 8vw',
  minHeight: '40vh',
  background: 'bgCard',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
})

const signalEyebrow = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '11px',
  letterSpacing: '0.12em',
  color: 'accentLight',
  textTransform: 'uppercase',
  marginBottom: '48px',
})

const signalGrid = css({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '32px',
  md: {
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '0',
  },
})

const signalNode = css({
  padding: '0 24px',
  md: {
    borderRight: '1px solid',
    borderColor: 'border',
    _last: { borderRight: 'none' },
    _first: { paddingLeft: '0' },
  },
})

const signalLabel = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textMuted',
  marginBottom: '8px',
  letterSpacing: '0.04em',
})

const signalValue = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(28px, 3vw, 42px)',
  lineHeight: '1.1',
  color: 'text',
  fontVariantNumeric: 'tabular-nums',
})

const signalMinus = css({
  color: 'accent',
})

const signalSmall = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: 'textSecondary',
  fontWeight: 'medium',
})

const lossTag = css({
  display: 'inline-block',
  fontFamily: 'body',
  fontSize: '11px',
  fontWeight: 'medium',
  color: 'textSecondary',
  background: 'bgSubtle',
  borderRadius: 'full',
  padding: '2px 8px',
  marginLeft: '8px',
  letterSpacing: '0.04em',
})

const signalFootnote = css({
  fontFamily: 'body',
  fontSize: '11px',
  letterSpacing: '0.06em',
  color: 'textMuted',
  marginTop: '48px',
  opacity: 0.7,
})

const memorialLabel = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '11px',
  letterSpacing: '0.12em',
  color: 'accentLight',
  fontVariant: 'all-small-caps',
})

/* Footer */
const footer = css({
  width: '100%',
  padding: '48px 8vw',
  borderTop: '1px solid',
  borderColor: 'border',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  alignItems: 'flex-start',
  md: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: 'textMuted',
})

const footerLink = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: 'textMuted',
  textDecoration: 'none',
  _hover: { color: 'textSecondary' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px', borderRadius: 'sm' },
})

function HomePage() {
  return (
    <>
      {/* Hero fold */}
      <section className={heroSection}>
        <div>
          <h1 className={heroPhrase}>
            You only<br />
            have this<br />
            <span className={accentWord}>moment</span>.
          </h1>
          <p className={attribution}>— Dan Millman · Memorial Day, 2026</p>
        </div>
        <div className={heroRule} />
      </section>

      {/* Featured Project */}
      <section className={sectionWrap}>
        <p className={eyebrow}>Featured</p>
        {featuredProject && (
          <div>
            <h2 className={featuredTitle}>{featuredProject.title}</h2>
            <p className={featuredProblem}>{featuredProject.problem}</p>
            {featuredProject.externalUrl && (
              <a href={featuredProject.externalUrl} className={featuredLink} target="_blank" rel="noopener noreferrer">
                Visit {featuredProject.title} →
              </a>
            )}
          </div>
        )}
      </section>

      {/* Selected Work */}
      <section className={sectionAlt}>
        <p className={eyebrow}>Selected Work</p>
        <div className={workGrid}>
          {selectedWork.map((project) => (
            <a key={project.slug} href={`/work/${project.slug}`} className={workLink}>
              <div className={workCard}>
                <span className={workYear}>{project.year}</span>
                <span className={workTitle}>{project.title}</span>
                <span className={workType}>{project.type}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Experiments */}
      <section className={sectionWrap}>
        <p className={eyebrow}>Experiments</p>
        <div className={expGrid}>
          {experiments.map((exp) => (
            <a
              key={exp.slug}
              href={exp.externalUrl || `/work/${exp.slug}`}
              className={expLink}
              {...(exp.externalUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <div className={expCard}>
                <h3 className={expTitle}>{exp.title}</h3>
                <p className={expMeta}>{exp.type} · {exp.year}</p>
                {exp.description && <p className={expDesc}>{exp.description}</p>}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Signal Band */}
      <section className={signalBand}>
        <p className={signalEyebrow}>Today's Frequency</p>
        <div className={signalGrid}>
          {/* Golf */}
          <div className={signalNode}>
            <p className={signalLabel}>CJ CUP Byron Nelson · Final</p>
            <p className={signalValue}>
              <span className={signalMinus}>−</span>30
            </p>
            <p className={signalSmall} style={{ marginTop: '4px' }}>Wyndham Clark</p>
          </div>

          {/* Tigers */}
          <div className={signalNode}>
            <p className={signalLabel}>Tigers</p>
            <p className={signalSmall} style={{ fontSize: 'clamp(24px, 2.5vw, 36px)', fontWeight: '600' }}>
              3–5
              <span className={lossTag}>L</span>
            </p>
          </div>

          {/* Moon */}
          <div className={signalNode}>
            <p className={signalLabel}>Lunar Phase</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <circle cx="10" cy="10" r="9" stroke="#5C70FF" strokeWidth="1.5" fill="none" />
                <path d="M10 1 A9 9 0 0 1 10 19 A5.4 9 0 0 0 10 1Z" fill="#5C70FF" opacity="0.7" />
              </svg>
              <span className={signalSmall}>Waxing Gibbous · 71.8%</span>
            </div>
          </div>

          {/* Memorial Day */}
          <div className={signalNode}>
            <p className={memorialLabel}>Memorial Day 2026</p>
            <p className={css({ fontFamily: 'body', fontSize: '14px', color: 'textSecondary', lineHeight: '1.5', marginTop: '8px' })}>
              Honoring those who gave their moments so others could have theirs.
            </p>
          </div>
        </div>
        <p className={signalFootnote}>The War on Drugs · Wet Leg</p>
      </section>

      {/* Footer */}
      <footer className={footer}>
        <span className={footerText}>© 2026 Doug March</span>
        <div style={{ display: 'flex', gap: '24px' }}>
          <a href="/archive" className={footerLink}>Archive</a>
          <a href="/about" className={footerLink}>About</a>
        </div>
      </footer>
    </>
  )
}