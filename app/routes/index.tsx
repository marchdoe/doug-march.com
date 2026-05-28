import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Sidebar } from '../components/Sidebar'
import { featuredProject, selectedWork, experiments } from '../content/projects'
import { identity, personal } from '../content/about'
import { capabilities } from '../content/timeline'

export const Route = createFileRoute('/')({ component: HomePage })

const heroBand = css({
  width: '100%',
  minHeight: '88dvh',
  background: '{colors.ink.900}',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '0 6vw',
  paddingTop: '56px',
  position: 'relative',
})

const heroPhrase = css({
  fontFamily: 'display',
  fontWeight: 'extrabold',
  fontSize: 'clamp(42px, 7vw, 100px)',
  lineHeight: '0.9',
  letterSpacing: '-0.03em',
  color: '{colors.stone.50}',
  textWrap: 'balance',
  maxWidth: '900px',
})

const accentWord = css({
  color: '{colors.seafoam.400}',
})

const attribution = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '18px',
  color: '{colors.stone.500}',
  marginTop: '32px',
})

const signalBand = css({
  width: '100%',
  background: '{colors.seafoam.400}',
  padding: '32px 6vw',
  display: 'flex',
  alignItems: 'center',
  gap: '48px',
  flexWrap: 'wrap',
  minHeight: '160px',
})

const signalGroup = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
})

const signalLabel = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '11px',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '{colors.ink.900}',
  opacity: 0.7,
})

const signalValue = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: '28px',
  color: '{colors.ink.900}',
  lineHeight: '1.1',
})

const signalValueSm = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: '24px',
  color: '{colors.ink.900}',
  lineHeight: '1.1',
})

const signalSmall = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '14px',
  color: '{colors.ink.900}',
  lineHeight: '1.4',
})

const signalMicro = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '12px',
  color: '{colors.ink.900}',
  opacity: 0.6,
})

const pill = css({
  display: 'inline-block',
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '12px',
  color: '{colors.stone.900}',
  background: 'rgba(7,20,16,0.12)',
  borderRadius: 'full',
  padding: '4px 10px',
  lineHeight: '1.4',
})

const hnLabel = css({
  fontFamily: 'display',
  fontWeight: 'semibold',
  fontSize: '13px',
  color: '{colors.stone.800}',
})

const workBand = css({
  width: '100%',
  background: '{colors.stone.50}',
  padding: '96px 6vw',
})

const sectionTitle = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(28px, 3vw, 40px)',
  color: '{colors.stone.900}',
  marginBottom: '48px',
  letterSpacing: '-0.02em',
  lineHeight: '1.1',
})

const projectGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '32px',
  marginBottom: '80px',
})

const projectCard = css({
  background: 'white',
  borderRadius: 'md',
  border: '1px solid {colors.stone.200}',
  padding: '32px',
  transition: 'transform 0.2s ease, border-color 0.2s ease',
  textDecoration: 'none',
  display: 'block',
  _hover: {
    transform: 'translateY(-4px)',
    borderColor: '{colors.seafoam.300}',
  },
  _focus: {
    outline: '2px solid {colors.seafoam.400}',
    outlineOffset: '2px',
  },
})

const featuredCard = css({
  background: 'white',
  borderRadius: 'md',
  border: '1px solid {colors.stone.200}',
  padding: '40px',
  marginBottom: '80px',
  boxShadow: '0 2px 12px rgba(7,20,16,0.08)',
  display: 'block',
  textDecoration: 'none',
  transition: 'transform 0.2s ease, border-color 0.2s ease',
  _hover: {
    transform: 'translateY(-4px)',
    borderColor: '{colors.seafoam.300}',
  },
  _focus: {
    outline: '2px solid {colors.seafoam.400}',
    outlineOffset: '2px',
  },
})

const cardEyebrow = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '11px',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '{colors.stone.500}',
  marginBottom: '8px',
})

const cardTitle = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: '22px',
  color: '{colors.stone.900}',
  lineHeight: '1.2',
  marginBottom: '8px',
})

const featuredTitle = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(24px, 3vw, 36px)',
  color: '{colors.stone.900}',
  lineHeight: '1.1',
  marginBottom: '12px',
})

const cardDesc = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '16px',
  color: '{colors.stone.600}',
  lineHeight: '1.5',
  maxWidth: '65ch',
})

const featuredLabel = css({
  fontFamily: 'body',
  fontWeight: 'semibold',
  fontSize: '12px',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '{colors.seafoam.600}',
  marginBottom: '16px',
  display: 'inline-block',
})

const expGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
  gap: '24px',
})

const expCard = css({
  padding: '24px',
  borderRadius: 'md',
  border: '1px solid {colors.stone.200}',
  background: 'white',
  textDecoration: 'none',
  display: 'block',
  transition: 'transform 0.2s ease, border-color 0.2s ease',
  _hover: {
    transform: 'translateY(-2px)',
    borderColor: '{colors.seafoam.300}',
  },
  _focus: {
    outline: '2px solid {colors.seafoam.400}',
    outlineOffset: '2px',
  },
})

const aboutBand = css({
  width: '100%',
  background: '{colors.stone.800}',
  padding: '80px 6vw',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '48px',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
    gap: '40px',
    padding: '64px 6vw',
  },
})

const aboutTitle = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(24px, 3vw, 36px)',
  color: '{colors.stone.50}',
  lineHeight: '1.1',
  marginBottom: '20px',
})

const aboutText = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '16px',
  color: '{colors.stone.300}',
  lineHeight: '1.6',
  maxWidth: '65ch',
})

const capList = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginTop: '24px',
})

const capTag = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '13px',
  color: '{colors.stone.50}',
  background: 'rgba(255,255,255,0.08)',
  borderRadius: 'sm',
  padding: '6px 12px',
  lineHeight: '1.4',
})

const footer = css({
  width: '100%',
  background: '{colors.ink.900}',
  padding: '32px 6vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: '16px',
})

const footerText = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '13px',
  color: '{colors.stone.500}',
})

const footerLink = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '13px',
  color: '{colors.stone.500}',
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
  _hover: {
    color: '{colors.stone.300}',
  },
  _focus: {
    outline: '2px solid {colors.seafoam.400}',
    outlineOffset: '2px',
    borderRadius: 'sm',
  },
})

const shutoutZero = css({
  color: '{colors.stone.800}',
})

const musicPills = css({
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
})

const subSectionTitle = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(22px, 2.5vw, 30px)',
  color: '{colors.stone.900}',
  marginBottom: '32px',
  letterSpacing: '-0.01em',
  lineHeight: '1.1',
})

function HomePage() {
  const featured = featuredProject

  return (
    <>
      {/* Band 1 — Hero */}
      <section className={heroBand}>
        <Sidebar />
        <div className={heroPhrase}>
          <span>In the middle</span><br />
          <span>of difficulty</span><br />
          <span>lies </span><span className={accentWord}>opportunity.</span>
        </div>
        <p className={attribution}>— Albert Einstein</p>
      </section>

      {/* Band 2 — Signals */}
      <section className={signalBand} aria-label="Today's signals">
        <div className={signalGroup}>
          <span className={signalLabel}>Detroit Tigers</span>
          <span className={signalValue}>4–<span className={shutoutZero}>0</span></span>
          <span className={css({ fontFamily: 'body', fontWeight: 'semibold', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '{colors.ink.900}' })}>WIN</span>
        </div>

        <div className={signalGroup}>
          <span className={signalLabel}>Moon</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '22px' }}>🌔</span>
            <span className={signalValueSm}>94.3%</span>
          </span>
          <span className={signalLabel}>Waxing Gibbous</span>
        </div>

        <div className={signalGroup}>
          <span className={hnLabel}>HN ↑893</span>
          <span className={signalSmall}>Anthropic and OpenAI: PMF found</span>
        </div>

        <div className={signalGroup}>
          <span className={signalLabel}>Listening</span>
          <div className={musicPills}>
            <span className={pill}>Guided by Voices</span>
            <span className={pill}>Wet Leg</span>
          </div>
        </div>

        <div className={signalGroup}>
          <span className={signalLabel}>Charles Schwab Challenge</span>
          <span className={signalSmall}>Scheduled</span>
        </div>

        <div className={signalGroup}>
          <span className={signalMicro}>14.5H LIGHT · ↑04:53 ↓19:21</span>
        </div>
      </section>

      {/* Band 3 — Work */}
      <section className={workBand}>
        {/* Featured Project */}
        {featured && (
          <div>
            <span className={featuredLabel}>Featured Project</span>
            <a
              href={featured.externalUrl || `/work/${featured.slug}`}
              className={featuredCard}
            >
              <div className={cardEyebrow}>{featured.type} · {featured.year}</div>
              <h2 className={featuredTitle}>{featured.title}</h2>
              {featured.problem && <p className={cardDesc}>{featured.problem}</p>}
            </a>
          </div>
        )}

        {/* Selected Work */}
        <h2 className={sectionTitle}>Selected Work</h2>
        <div className={projectGrid}>
          {selectedWork.map((project) => (
            <a
              key={project.slug}
              href={`/work/${project.slug}`}
              className={projectCard}
            >
              <div className={cardEyebrow}>{project.type} · {project.year}</div>
              <h3 className={cardTitle}>{project.title}</h3>
              {project.problem && <p className={cardDesc}>{project.problem}</p>}
            </a>
          ))}
        </div>

        {/* Experiments */}
        <h2 className={subSectionTitle}>Experiments</h2>
        <div className={expGrid}>
          {experiments.map((exp) => (
            <a
              key={exp.slug}
              href={exp.externalUrl || `/work/${exp.slug}`}
              className={expCard}
            >
              <div className={cardEyebrow}>{exp.type} · {exp.year}</div>
              <h3 className={css({ fontFamily: 'display', fontWeight: 'bold', fontSize: '18px', color: '{colors.stone.900}', lineHeight: '1.2', marginBottom: '4px' })}>{exp.title}</h3>
              {exp.description && <p className={css({ fontFamily: 'body', fontSize: '14px', color: '{colors.stone.500}', lineHeight: '1.5' })}>{exp.description}</p>}
            </a>
          ))}
        </div>
      </section>

      {/* Band 4 — About / Capabilities */}
      <section className={aboutBand}>
        <div>
          <h2 className={aboutTitle}>{identity.name}</h2>
          <p className={css({ fontFamily: 'body', fontWeight: 'medium', fontSize: '16px', color: '{colors.seafoam.300}', marginBottom: '16px' })}>{identity.role}</p>
          <p className={aboutText}>{identity.statement}</p>
        </div>
        <div>
          <h3 className={css({ fontFamily: 'display', fontWeight: 'bold', fontSize: '20px', color: '{colors.stone.50}', marginBottom: '20px', lineHeight: '1.1' })}>Capabilities</h3>
          <div className={capList}>
            {capabilities.map((cap) => (
              <span key={cap} className={capTag}>{cap}</span>
            ))}
          </div>
          <div className={css({ marginTop: '32px' })}>
            <p className={css({ fontFamily: 'body', fontSize: '14px', color: '{colors.stone.400}', lineHeight: '1.6' })}>
              {personal.holesInOne} holes in one · {personal.sport} · {personal.currentFocus}
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={footer}>
        <span className={footerText}>© 2026 Doug March</span>
        <a href="/archive" className={footerLink}>Archive</a>
      </footer>
    </>
  )
}