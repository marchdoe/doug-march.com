import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

const heroBand = css({
  width: '100%',
  minHeight: '88vh',
  background: 'bg',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  padding: '0 6vw',
  paddingBottom: '10vh',
  position: 'relative',
})

const eyebrow = css({
  fontFamily: 'body',
  fontSize: '11px',
  fontWeight: '500',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: '{colors.neutral.400}',
  marginBottom: '20px',
})

const heroPhrase = css({
  fontFamily: 'display',
  fontWeight: '700',
  fontSize: 'clamp(42px, 7.8vw, 118px)',
  lineHeight: '0.92',
  letterSpacing: '-0.025em',
  color: '{colors.neutral.100}',
  maxWidth: '90vw',
  textWrap: 'balance',
})

const heroAccent = css({
  color: '{colors.primary.300}',
})

const signalStrip = css({
  width: '100%',
  background: 'bgCard',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  alignItems: 'center',
  minHeight: '112px',
  padding: '0 6vw',
  '@media (max-width: 640px)': {
    gridTemplateColumns: '1fr',
    gap: '0',
    padding: '16px 6vw',
    minHeight: 'auto',
  },
})

const signalCell = css({
  padding: '24px 0',
  borderRight: '1px solid',
  borderRightColor: '{colors.neutral.700}',
  paddingRight: '24px',
  _last: { borderRight: 'none', paddingRight: '0' },
  '&:not(:first-child)': { paddingLeft: '24px' },
  '@media (max-width: 640px)': {
    borderRight: 'none',
    borderBottom: '1px solid',
    borderBottomColor: '{colors.neutral.700}',
    padding: '12px 0',
    _last: { borderBottom: 'none' },
    '&:not(:first-child)': { paddingLeft: '0' },
  },
})

const signalLabel = css({
  fontFamily: 'body',
  fontSize: '11px',
  fontWeight: '500',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: '{colors.neutral.500}',
  marginBottom: '4px',
})

const signalValue = css({
  fontFamily: 'body',
  fontSize: '14px',
  fontWeight: '700',
  color: 'accent',
  fontVariantNumeric: 'tabular-nums',
})

const signalSub = css({
  fontFamily: 'body',
  fontSize: '12px',
  fontWeight: '400',
  color: '{colors.neutral.400}',
  marginTop: '2px',
})

const workBand = css({
  width: '100%',
  minHeight: '60vh',
  background: 'bgBand',
  padding: '64px 6vw',
  '@media (max-width: 640px)': {
    padding: '40px 6vw',
  },
})

const workBandTitle = css({
  fontFamily: 'display',
  fontSize: 'clamp(18px, 2vw, 28px)',
  fontWeight: '700',
  color: '{colors.neutral.50}',
  letterSpacing: '-0.025em',
  marginBottom: '40px',
})

const featuredCard = css({
  width: '100%',
  background: 'bgCard',
  padding: 'clamp(24px, 4vw, 48px)',
  marginBottom: '1px',
  transition: 'background 0.2s ease',
  _hover: { background: '{colors.neutral.700}' },
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
  },
})

const featuredLabel = css({
  fontFamily: 'body',
  fontSize: '11px',
  fontWeight: '500',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: 'accent',
  marginBottom: '12px',
})

const featuredTitle = css({
  fontFamily: 'display',
  fontSize: 'clamp(28px, 4vw, 52px)',
  fontWeight: '700',
  color: '{colors.neutral.50}',
  letterSpacing: '-0.025em',
  lineHeight: '1.1',
  marginBottom: '16px',
  textDecoration: 'none',
  display: 'block',
  _hover: { color: 'accent' },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '4px',
  },
})

const featuredProblem = css({
  fontFamily: 'body',
  fontSize: '16px',
  lineHeight: '1.5',
  color: '{colors.neutral.200}',
  maxWidth: '65ch',
})

const projectGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '1px',
  marginTop: '1px',
})

const projectCard = css({
  background: 'bgCard',
  padding: 'clamp(20px, 3vw, 32px)',
  transition: 'background 0.2s ease',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  textDecoration: 'none',
  _hover: { background: '{colors.neutral.700}' },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '-2px',
  },
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
  },
})

const projectTitle = css({
  fontFamily: 'display',
  fontSize: 'clamp(18px, 2vw, 24px)',
  fontWeight: '700',
  color: '{colors.neutral.50}',
  lineHeight: '1.2',
  transition: 'color 0.2s ease',
  'a:hover &, div:hover &': { color: '{colors.primary.300}' },
})

const projectMeta = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: '{colors.neutral.400}',
  letterSpacing: '0.04em',
})

const projectDesc = css({
  fontFamily: 'body',
  fontSize: '14px',
  lineHeight: '1.5',
  color: '{colors.neutral.300}',
  maxWidth: '55ch',
})

const capBand = css({
  width: '100%',
  minHeight: '40vh',
  background: 'bg',
  padding: '64px 6vw',
  '@media (max-width: 640px)': {
    padding: '40px 6vw',
  },
})

const capTitle = css({
  fontFamily: 'display',
  fontSize: 'clamp(18px, 2vw, 28px)',
  fontWeight: '700',
  color: '{colors.neutral.50}',
  letterSpacing: '-0.025em',
  marginBottom: '32px',
})

const expGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
  gap: '1px',
})

const expCard = css({
  background: 'bgCard',
  padding: '20px 24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  textDecoration: 'none',
  transition: 'background 0.2s ease',
  _hover: { background: '{colors.neutral.700}' },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '-2px',
  },
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
  },
})

const footerBand = css({
  width: '100%',
  background: 'bgCard',
  padding: '24px 6vw',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
})

const footerMusic = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: '{colors.neutral.500}',
  textAlign: 'center',
})

const footerRow = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: '{colors.neutral.500}',
  display: 'flex',
  gap: '16px',
  alignItems: 'center',
})

const footerLink = css({
  color: '{colors.neutral.500}',
  textDecoration: 'none',
  _hover: { color: 'accent' },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

const awwwardsNote = css({
  fontFamily: 'body',
  fontSize: '12px',
  fontStyle: 'italic',
  color: '{colors.neutral.500}',
  marginTop: '32px',
  maxWidth: '65ch',
})

function HomePage() {
  return (
    <>
      {/* Band 1: Hero */}
      <section className={heroBand}>
        <div className={eyebrow} aria-label="Source attribution">
          ↑ Hacker News · 414 pts · May 11
        </div>
        <h1 className={heroPhrase}>
          I'm going back<br />
          to writing code<br />
          <span className={heroAccent}>by hand.</span>
        </h1>
      </section>

      {/* Band 2: Signal Strip */}
      <section className={signalStrip} aria-label="Daily signals">
        <div className={signalCell}>
          <div className={signalLabel}>Tigers</div>
          <div className={signalValue}>DET 6 · 3 OPP</div>
        </div>
        <div className={signalCell}>
          <div className={signalLabel}>Truist Final</div>
          <div style={{ fontFamily: 'var(--fonts-body)', fontSize: '14px', fontWeight: '700', color: 'var(--colors-neutral-100)' }}>
            Reitan −15
          </div>
          <div className={signalSub}>Fowler / Højgaard −13</div>
        </div>
        <div className={signalCell}>
          <div className={signalLabel}>Monday · Day 131 · 14h light</div>
          <div className={signalSub}>☽ waning crescent 21%</div>
        </div>
      </section>

      {/* Band 3: Work */}
      <section className={workBand}>
        <h2 className={workBandTitle}>Selected Work</h2>

        {featuredProject && (
          <div className={featuredCard}>
            <div className={featuredLabel}>Featured</div>
            <a
              href={featuredProject.externalUrl || `/work/${featuredProject.slug}`}
              className={featuredTitle}
            >
              {featuredProject.title}
            </a>
            {featuredProject.problem && (
              <p className={featuredProblem}>{featuredProject.problem}</p>
            )}
          </div>
        )}

        <div className={projectGrid}>
          {selectedWork.map((project) => (
            <a
              key={project.slug}
              href={`/work/${project.slug}`}
              className={projectCard}
            >
              <span className={projectTitle}>{project.title}</span>
              <span className={projectMeta}>{project.type} · {project.year}</span>
            </a>
          ))}
        </div>

        <div style={{ marginTop: '48px' }}>
          <h2 className={workBandTitle}>Experiments</h2>
          <div className={expGrid}>
            {experiments.map((exp) => (
              <a
                key={exp.slug}
                href={exp.externalUrl || `/work/${exp.slug}`}
                className={expCard}
              >
                <span className={projectTitle}>{exp.title}</span>
                <span className={projectMeta}>{exp.type} · {exp.year}</span>
                {exp.description && (
                  <span className={projectDesc}>{exp.description}</span>
                )}
              </a>
            ))}
          </div>
        </div>

        <p className={awwwardsNote}>
          Site of the Day: The Kesey Signal — 1999 cyber-noir terminal archive
        </p>
      </section>

      {/* Footer */}
      <footer className={footerBand}>
        <div className={footerMusic}>♫ Wet Leg · The War on Drugs · Tobin Sprout</div>
        <div className={footerRow}>
          <span>© 2026 Doug March</span>
          <a href="/archive" className={footerLink}>Archive</a>
        </div>
      </footer>
    </>
  )
}