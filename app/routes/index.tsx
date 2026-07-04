import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Sidebar } from '../components/Sidebar'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

const galleryWall = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
  gridTemplateRows: 'repeat(8, minmax(80px, auto))',
  gap: '2vw',
  padding: '2vw',
  minHeight: '100vh',
  maxWidth: 'none',
  '@media (max-width: 768px)': {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '16px',
  },
})

const zoneA = css({
  gridColumn: '1 / 9',
  gridRow: '1 / 6',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: 'clamp(24px, 5vw, 72px) clamp(20px, 6vw, 86px)',
  '@media (max-width: 768px)': {
    order: 1,
    padding: '32px 16px',
  },
})

const zoneB = css({
  gridColumn: '9 / 13',
  gridRow: '1 / 2',
  '@media (max-width: 768px)': {
    order: 0,
  },
})

const zoneC = css({
  gridColumn: '9 / 13',
  gridRow: '2 / 6',
  background: 'bgCard',
  borderRadius: 'md',
  padding: 'clamp(16px, 2vw, 32px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  boxShadow: '0 2px 16px rgba(2, 8, 16, 0.55)',
  transition: 'background 180ms ease',
  _hover: {
    background: '{colors.neutral.700}',
  },
  '@media (max-width: 768px)': {
    order: 2,
  },
})

const zoneD = css({
  gridColumn: '1 / 5',
  gridRow: '6 / 9',
  background: 'bgCard',
  borderRadius: 'md',
  padding: 'clamp(16px, 2vw, 28px)',
  boxShadow: '0 2px 16px rgba(2, 8, 16, 0.55)',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  '@media (max-width: 768px)': {
    order: 4,
  },
})

const zoneE = css({
  gridColumn: '5 / 9',
  gridRow: '6 / 9',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  '@media (max-width: 768px)': {
    order: 3,
  },
})

const zoneF = css({
  gridColumn: '9 / 13',
  gridRow: '6 / 9',
  background: 'bgCard',
  borderRadius: 'md',
  padding: 'clamp(16px, 2vw, 28px)',
  boxShadow: '0 2px 16px rgba(2, 8, 16, 0.55)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  '@media (max-width: 768px)': {
    order: 5,
  },
})

const heroPhrase = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(2.5rem, 7.5vw, 10rem)',
  lineHeight: '0.90',
  letterSpacing: '-0.03em',
  color: 'text',
  textWrap: 'balance',
  '@media (max-width: 768px)': {
    fontSize: 'clamp(2.5rem, 12vw, 4.5rem)',
  },
})

const heroAttribution = css({
  fontFamily: 'body',
  fontStyle: 'italic',
  fontSize: '0.875rem',
  color: 'textMuted',
  marginTop: '48px',
  '@media (max-width: 768px)': {
    marginTop: '24px',
  },
})

const heroSetup = css({
  fontFamily: 'body',
  fontSize: '1.125rem',
  color: 'textMuted',
  marginBottom: '24px',
  lineHeight: '1.55',
})

const featuredLabel = css({
  fontFamily: 'body',
  fontWeight: 'semibold',
  fontSize: '0.6875rem',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: 'textMuted',
  marginBottom: '12px',
})

const featuredTitle = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
  lineHeight: '1.15',
  color: 'text',
  marginBottom: '12px',
})

const featuredProblem = css({
  fontFamily: 'body',
  fontSize: '0.9375rem',
  lineHeight: '1.55',
  color: 'textSecondary',
  marginBottom: '20px',
})

const featuredLink = css({
  fontFamily: 'body',
  fontWeight: 'semibold',
  fontSize: '0.8125rem',
  color: 'accent',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  padding: '8px 16px',
  borderRadius: 'sm',
  border: '1px solid',
  borderColor: 'accent',
  transition: 'all 200ms ease',
  _hover: {
    background: 'accent',
    color: '{colors.neutral.900}',
  },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accentLight',
    outlineOffset: '2px',
  },
})

const holidayTitle = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: '1.125rem',
  textTransform: 'uppercase',
  letterSpacing: '0.2em',
  color: 'accent',
  lineHeight: '1',
})

const holidayDate = css({
  fontFamily: 'body',
  fontSize: '0.875rem',
  color: 'textSecondary',
  marginTop: '4px',
})

const golfHeader = css({
  fontFamily: 'body',
  fontWeight: 'semibold',
  fontSize: '0.6875rem',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: 'textMuted',
  marginBottom: '8px',
})

const golfRow = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '6px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
  '&:last-child': {
    borderBottom: 'none',
  },
})

const golfName = css({
  fontFamily: 'body',
  fontSize: '0.8125rem',
  color: 'textSecondary',
})

const golfScore = css({
  fontFamily: 'body',
  fontWeight: 'semibold',
  fontSize: '0.8125rem',
  color: 'accent',
})

const workCard = css({
  background: 'bgCard',
  borderRadius: 'md',
  padding: '16px',
  boxShadow: '0 2px 16px rgba(2, 8, 16, 0.55)',
  textDecoration: 'none',
  display: 'block',
  transition: 'all 180ms ease',
  border: '1px solid transparent',
  _hover: {
    borderColor: 'accentDim',
    background: '{colors.neutral.700}',
  },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

const workTitle = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: '1rem',
  color: 'text',
  lineHeight: '1.15',
})

const workMeta = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  color: 'textMuted',
  marginTop: '6px',
  letterSpacing: '0.05em',
})

const aboutSnippet = css({
  fontFamily: 'body',
  fontSize: '0.9375rem',
  lineHeight: '1.55',
  color: 'textSecondary',
  marginBottom: '16px',
})

const capLabel = css({
  fontFamily: 'body',
  fontWeight: 'semibold',
  fontSize: '0.6875rem',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: 'textMuted',
  marginBottom: '8px',
})

const capList = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '6px',
})

const capTag = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  color: 'textSecondary',
  background: 'bgSubtle',
  padding: '4px 8px',
  borderRadius: 'sm',
})

const musicLine = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  color: 'textMuted',
  marginTop: 'auto',
  paddingTop: '16px',
})

const lunarLine = css({
  fontFamily: 'body',
  fontSize: '0.6875rem',
  color: 'textMuted',
  marginTop: '12px',
})

const footerArea = css({
  padding: '2vw',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '@media (max-width: 768px)': {
    padding: '16px',
    flexDirection: 'column',
    gap: '8px',
  },
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  color: 'textMuted',
})

const footerLink = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  color: 'textMuted',
  textDecoration: 'none',
  _hover: {
    color: 'accentLight',
  },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

const experimentsLabel = css({
  fontFamily: 'body',
  fontWeight: 'semibold',
  fontSize: '0.6875rem',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: 'textMuted',
  marginTop: '8px',
  marginBottom: '4px',
  '@media (max-width: 768px)': {
    marginTop: '12px',
  },
})

const expRow = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  padding: '8px 0',
  borderBottom: '1px solid',
  borderColor: 'borderSubtle',
  '&:last-child': {
    borderBottom: 'none',
  },
})

const expTitle = css({
  fontFamily: 'body',
  fontSize: '0.8125rem',
  color: 'textSecondary',
  textDecoration: 'none',
  _hover: {
    color: 'accentLight',
  },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

const expYear = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  color: 'textMuted',
  letterSpacing: '0.05em',
})

function HomePage() {
  const golfLeaders = [
    { pos: '1', name: 'Lucas Glover', score: '−14' },
    { pos: '2', name: 'Lee Hodges', score: '−12' },
    { pos: '3', name: 'Zac Blair', score: '−11' },
    { pos: 'T4', name: 'Robert Suber', score: '−10' },
    { pos: 'T4', name: 'David Lipsky', score: '−10' },
  ]

  return (
    <>
      <div className={galleryWall}>
        {/* Zone B — Nav */}
        <div className={zoneB}>
          <Sidebar />
        </div>

        {/* Zone A — Hero phrase */}
        <div className={zoneA}>
          <p className={heroSetup}>
            A bird does not sing because it has an answer.
          </p>
          <h1 className={heroPhrase}>
            It sings because it has a song.
          </h1>
          <p className={heroAttribution}>— Chinese Proverb</p>
        </div>

        {/* Zone C — Featured project */}
        <div className={zoneC}>
          <div>
            <p className={featuredLabel}>Featured Project</p>
            {featuredProject && (
              <>
                <h2 className={featuredTitle}>{featuredProject.title}</h2>
                <p className={featuredProblem}>{featuredProject.problem}</p>
              </>
            )}
          </div>
          {featuredProject?.externalUrl && (
            <a href={featuredProject.externalUrl} className={featuredLink}>
              View Project →
            </a>
          )}
        </div>

        {/* Zone D — Holiday + Golf */}
        <div className={zoneD}>
          <div>
            <h3 className={holidayTitle}>Independence Day</h3>
            <p className={holidayDate}>July 4, 2026</p>
          </div>
          <div>
            <p className={golfHeader}>John Deere Classic · In Progress</p>
            {golfLeaders.map((g, i) => (
              <div key={i} className={golfRow}>
                <span className={golfName}>{g.pos}. {g.name}</span>
                <span className={golfScore}>{g.score}</span>
              </div>
            ))}
          </div>
          <p className={lunarLine}>🌖 Waning gibbous 72.6% · ↑ 4:54 ↓ 19:34</p>
        </div>

        {/* Zone E — Work index */}
        <div className={zoneE}>
          {selectedWork.map((project) => (
            <a
              key={project.slug}
              href={`/work/${project.slug}`}
              className={workCard}
            >
              <h3 className={workTitle}>{project.title}</h3>
              <p className={workMeta}>{project.type} · {project.year}</p>
            </a>
          ))}
          <p className={experimentsLabel}>Experiments</p>
          {experiments.map((exp) => (
            <div key={exp.slug} className={expRow}>
              <a href={`/work/${exp.slug}`} className={expTitle}>{exp.title}</a>
              <span className={expYear}>{exp.year}</span>
            </div>
          ))}
        </div>

        {/* Zone F — About + capabilities + music */}
        <div className={zoneF}>
          <div>
            <p className={aboutSnippet}>
              Product Designer & Developer building digital tools with care and curiosity.
            </p>
            <p className={capLabel}>Capabilities</p>
            <div className={capList}>
              {['Product Design', 'UI/UX', 'React', 'TypeScript', 'Node.js', 'Prototyping'].map((c) => (
                <span key={c} className={capTag}>{c}</span>
              ))}
            </div>
          </div>
          <div className={musicLine}>
            <span style={{ color: 'var(--colors-aqua-700)' }}>— </span>
            Radiohead · My Morning Jacket · Guided by Voices
          </div>
        </div>
      </div>

      <footer className={footerArea}>
        <span className={footerText}>© 2026 Doug March</span>
        <a href="/archive" className={footerLink}>Archive</a>
      </footer>
    </>
  )
}