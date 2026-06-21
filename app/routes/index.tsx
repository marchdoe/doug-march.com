import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

const splitWrap = css({
  display: 'flex',
  flexDirection: 'column',
  '@media (min-width: 768px)': {
    display: 'grid',
    gridTemplateColumns: '3fr 2fr',
    minHeight: '100vh',
    position: 'fixed',
    inset: '0',
    zIndex: '1',
  },
})

const heroPanel = css({
  background: 'bgHero',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '48 6vw',
  minHeight: '80vh',
  '@media (min-width: 768px)': {
    minHeight: '100vh',
    padding: '80 6vw',
  },
})

const eyebrow = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: 'clamp(0.625rem, 0.9vw, 0.75rem)',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: '{colors.cream.300}',
  marginBottom: '24',
})

const heroQuote = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(2.25rem, 6vw, 6rem)',
  lineHeight: 'snug',
  letterSpacing: '-0.02em',
  color: 'textHero',
  maxWidth: '18ch',
  textWrap: 'balance',
})

const attribution = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontStyle: 'italic',
  fontSize: 'clamp(0.875rem, 1.2vw, 1rem)',
  letterSpacing: '0.02em',
  color: '{colors.cream.400}',
  marginTop: '32',
})

const rightPanel = css({
  background: 'bg',
  display: 'flex',
  flexDirection: 'column',
  padding: '48 5vw',
  overflowY: 'auto',
  '@media (min-width: 768px)': {
    minHeight: '100vh',
    padding: '64 5vw',
  },
})

const navArea = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingBottom: '24',
  borderBottom: '1px solid',
  borderColor: 'border',
  marginBottom: '40',
})

const logoName = css({
  fontFamily: 'body',
  fontWeight: 'bold',
  fontSize: '0.875rem',
  color: 'text',
  textDecoration: 'none',
  _hover: { color: 'accent', textDecoration: 'none' },
})

const navLinksList = css({
  display: 'flex',
  gap: '24',
})

const navLinkStyle = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '0.875rem',
  color: 'textSecondary',
  textDecoration: 'none',
  transition: 'color 0.2s ease',
  minHeight: '44px',
  display: 'flex',
  alignItems: 'center',
  _hover: { color: 'accent', textDecoration: 'none' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px', borderRadius: 'sm' },
})

const sectionLabel = css({
  fontFamily: 'body',
  fontWeight: 'semibold',
  fontSize: '0.6875rem',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '16',
})

const featuredWrap = css({
  marginBottom: '40',
})

const featuredTitle = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
  lineHeight: 'snug',
  color: 'text',
  marginBottom: '8',
})

const featuredProblem = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '1rem',
  lineHeight: 'normal',
  color: 'textSecondary',
  marginBottom: '12',
  maxWidth: '55ch',
})

const featuredLink = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '0.875rem',
  color: 'accent',
  textDecoration: 'none',
  transition: 'color 0.2s ease',
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: '44px',
  _hover: { textDecoration: 'underline' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px', borderRadius: 'sm' },
})

const workRow = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  padding: '12 0',
  borderBottom: '1px solid',
  borderColor: 'border',
  _last: { borderBottom: 'none' },
})

const workTitle = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '1rem',
  color: 'text',
  textDecoration: 'none',
  transition: 'color 0.2s ease',
  _hover: { color: 'accent', textDecoration: 'none' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px', borderRadius: 'sm' },
})

const workMeta = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '0.75rem',
  color: 'textMuted',
  flexShrink: '0',
  marginLeft: '16',
})

const signalSection = css({
  marginTop: '40',
  paddingTop: '24',
  borderTop: '1px solid',
  borderColor: 'border',
})

const signalLabel = css({
  fontFamily: 'body',
  fontWeight: 'semibold',
  fontSize: '0.6875rem',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '12',
})

const signalRow = css({
  fontFamily: 'body',
  fontSize: '0.875rem',
  lineHeight: 'normal',
  marginBottom: '6',
})

const scoreName = css({
  fontWeight: 'bold',
  color: 'text',
})

const scoreValue = css({
  fontWeight: 'bold',
  color: 'accent',
})

const smallSignal = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  color: 'textMuted',
  letterSpacing: '0.06em',
  marginTop: '16',
})

const footerArea = css({
  marginTop: 'auto',
  paddingTop: '32',
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '0.6875rem',
  color: 'textMuted',
  letterSpacing: '0.06em',
})

const archiveLink = css({
  color: 'textMuted',
  textDecoration: 'none',
  _hover: { textDecoration: 'underline' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px', borderRadius: 'sm' },
})

const expTitle = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '0.875rem',
  color: 'text',
  textDecoration: 'none',
  transition: 'color 0.2s ease',
  _hover: { color: 'accent', textDecoration: 'none' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px', borderRadius: 'sm' },
})

function HomePage() {
  return (
    <div className={splitWrap}>
      {/* LEFT PANEL — Hero declaration */}
      <div className={heroPanel}>
        <p className={eyebrow}>Father's Day · June 21, 2026 · Summer Solstice</p>
        <h1 className={heroQuote}>
          The best thing to hold onto in life is each other.
        </h1>
        <p className={attribution}>— Audrey Hepburn</p>
      </div>

      {/* RIGHT PANEL — Nav + Work + Signals */}
      <div className={rightPanel}>
        {/* Nav */}
        <nav className={navArea} aria-label="Main navigation">
          <a href="/" className={logoName}>doug march</a>
          <div className={navLinksList}>
            <a href="/" className={navLinkStyle}>Work</a>
            <a href="/about" className={navLinkStyle}>About</a>
          </div>
        </nav>

        {/* Featured Project */}
        {featuredProject && (
          <section className={featuredWrap}>
            <p className={sectionLabel}>Featured</p>
            <h2 className={featuredTitle}>{featuredProject.title}</h2>
            {featuredProject.problem && (
              <p className={featuredProblem}>{featuredProject.problem}</p>
            )}
            {featuredProject.externalUrl && (
              <a href={featuredProject.externalUrl} className={featuredLink}>
                View Project →
              </a>
            )}
          </section>
        )}

        {/* Selected Work */}
        <section className={css({ marginBottom: '32' })}>
          <p className={sectionLabel}>Selected Work</p>
          {selectedWork.map((project) => (
            <div key={project.slug} className={workRow}>
              <a href={`/work/${project.slug}`} className={workTitle}>
                {project.title}
              </a>
              <span className={workMeta}>{project.type} · {project.year}</span>
            </div>
          ))}
        </section>

        {/* Experiments */}
        <section className={css({ marginBottom: '32' })}>
          <p className={sectionLabel}>Experiments</p>
          {experiments.map((exp) => (
            <div key={exp.slug} className={workRow}>
              <a href={`/work/${exp.slug}`} className={expTitle}>
                {exp.title}
              </a>
              <span className={workMeta}>{exp.type} · {exp.year}</span>
            </div>
          ))}
        </section>

        {/* Signals */}
        <section className={signalSection}>
          <p className={signalLabel}>U.S. Open · In Progress</p>
          <div className={signalRow}>
            <span className={scoreName}>Clark </span>
            <span className={scoreValue}>−7</span>
          </div>
          <div className={signalRow}>
            <span className={css({ fontWeight: 'normal', color: 'textSecondary', fontSize: '0.875rem' })}>Scheffler </span>
            <span className={css({ fontWeight: 'bold', color: 'accent', fontSize: '0.875rem' })}>−1</span>
          </div>
          <div className={signalRow}>
            <span className={css({ fontWeight: 'normal', color: 'textSecondary', fontSize: '0.875rem' })}>Theegala </span>
            <span className={css({ fontWeight: 'bold', color: 'accent', fontSize: '0.875rem' })}>−1</span>
          </div>
          <div className={signalRow}>
            <span className={css({ fontWeight: 'normal', color: 'textSecondary', fontSize: '0.875rem' })}>T. Kim </span>
            <span className={css({ fontWeight: 'bold', color: 'accent', fontSize: '0.875rem' })}>−1</span>
          </div>

          <div className={css({ marginTop: '16', display: 'flex', gap: '16', alignItems: 'center', flexWrap: 'wrap' })}>
            <span className={css({ fontFamily: 'body', fontSize: '0.8125rem', fontWeight: 'semibold', color: 'textSecondary' })}>
              DET <span className={css({ color: 'accent', fontWeight: 'bold' })}>4</span> – <span className={css({ color: 'accent', fontWeight: 'bold' })}>1</span> WIN
            </span>
            <span className={css({ fontFamily: 'body', fontSize: '0.75rem', color: 'textMuted' })}>
              Loupe — 311 pts
            </span>
          </div>

          <p className={smallSignal}>◑ First Quarter · 45%</p>
          <p className={css({ fontFamily: 'body', fontSize: '0.6875rem', color: 'textMuted', letterSpacing: '0.06em', marginTop: '24' })}>
            Now Listening — Tobin Sprout · The War on Drugs · Wet Leg
          </p>
        </section>

        {/* Footer */}
        <footer className={footerArea}>
          <p className={footerText}>
            © 2026 Doug March · <a href="/archive" className={archiveLink}>Archive</a>
          </p>
        </footer>
      </div>
    </div>
  )
}