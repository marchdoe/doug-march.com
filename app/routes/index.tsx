import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

const hero = css({
  position: 'relative',
  minHeight: '88vh',
  display: 'grid',
  placeItems: 'center',
  padding: '6xl 3xl 5xl',
  background: 'radial-gradient(ellipse 58% 62% at 58% 40%, #FFFFFF 0%, #EDF2F8 55%, #F4F7FB 100%)',
  '@media (max-width: 767px)': {
    padding: '6xl md 4xl',
    minHeight: '85vh',
  },
})

const heroInner = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  maxWidth: '840px',
  width: '100%',
})

const quoteStyle = css({
  fontFamily: 'heading',
  fontWeight: 'light',
  fontStyle: 'italic',
  fontSize: 'clamp(28px, 5.5vw, 68px)',
  lineHeight: 'tight',
  letterSpacing: 'tight',
  color: 'text',
  maxWidth: '800px',
  margin: '0',
  '@media (prefers-reduced-motion: reduce)': {
    animation: 'none',
  },
})

const sageRule = css({
  width: '80px',
  height: '1px',
  background: 'accentLight',
  border: 'none',
  margin: '28px auto',
})

const attribution = css({
  fontFamily: 'body',
  fontSize: '13px',
  fontWeight: 'normal',
  letterSpacing: '0.06em',
  color: 'textMuted',
})

const content = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: '760px',
  margin: '0 auto',
  padding: '6xl 3xl',
  '@media (max-width: 767px)': {
    padding: '4xl md',
  },
})

const sectionLabel = css({
  fontFamily: 'body',
  fontSize: '12px',
  fontWeight: 'normal',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '4xl',
  width: '100%',
})

const workSection = css({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '0',
})

const projectRow = css({
  width: '100%',
  padding: '2xl 0',
  borderTop: '1px solid',
  borderColor: 'border',
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  columnGap: 'xl',
  rowGap: 'sm',
  alignItems: 'start',
  transition: 'background 160ms ease',
  _hover: { background: 'cardBg' },
  '@media (max-width: 600px)': {
    gridTemplateColumns: '1fr',
  },
})

const projectTitle = css({
  fontFamily: 'heading',
  fontSize: '28px',
  fontWeight: 'normal',
  lineHeight: 'snug',
  color: 'text',
  '@media (max-width: 767px)': {
    fontSize: '22px',
  },
})

const projectDesc = css({
  fontFamily: 'body',
  fontSize: '16px',
  fontWeight: 'normal',
  lineHeight: 'normal',
  color: 'textSecondary',
  maxWidth: '560px',
  gridColumn: '1 / -1',
  '@media (max-width: 600px)': {
    gridColumn: '1',
  },
})

const projectMeta = css({
  display: 'flex',
  alignItems: 'center',
  gap: 'sm',
  gridColumn: '1 / -1',
  flexWrap: 'wrap',
  '@media (max-width: 600px)': {
    gridColumn: '1',
  },
})

const pill = css({
  fontFamily: 'body',
  fontSize: '12px',
  fontWeight: 'normal',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  background: 'accentLight',
  color: 'accentDark',
  borderRadius: 'md',
  padding: '3px 10px',
  lineHeight: 'normal',
})

const yearStamp = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: 'widest',
  color: 'textMuted',
})

const arrowLink = css({
  fontFamily: 'body',
  fontSize: '16px',
  color: 'textMuted',
  textDecoration: 'none',
  transition: 'color 160ms ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '44px',
  minHeight: '44px',
  _hover: { color: 'accentDark' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px', borderRadius: 'sm' },
})

const sectionSpacer = css({
  height: '6xl',
})

const lastBorder = css({
  width: '100%',
  borderTop: '1px solid',
  borderColor: 'border',
})

const footerArea = css({
  width: '100%',
  maxWidth: '760px',
  margin: '0 auto',
  padding: '2xl 3xl 4xl',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '@media (max-width: 767px)': {
    padding: '2xl md 4xl',
  },
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: 'wide',
  color: 'textMuted',
})

const footerLink = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: 'wide',
  color: 'textMuted',
  textDecoration: 'none',
  padding: 'xs',
  minHeight: '44px',
  display: 'flex',
  alignItems: 'center',
  _hover: { color: 'textSecondary' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px', borderRadius: 'sm' },
})

function HomePage() {
  return (
    <>
      <section className={hero}>
        <div className={heroInner}>
          <blockquote className={quoteStyle}>
            "You came empty handed, and you will leave empty handed."
          </blockquote>
          <hr className={sageRule} />
          <p className={attribution}>— Bhagavad Gita, Chapter 2</p>
        </div>
      </section>

      <main className={content}>
        {featuredProject && (
          <>
            <div className={sectionLabel}>Featured</div>
            <div className={workSection}>
              <div className={projectRow}>
                <a
                  href={featuredProject.externalUrl || `/work/${featuredProject.slug}`}
                  target={featuredProject.externalUrl ? '_blank' : undefined}
                  rel={featuredProject.externalUrl ? 'noopener noreferrer' : undefined}
                  style={{ textDecoration: 'none', gridColumn: '1' }}
                >
                  <div className={projectTitle}>{featuredProject.title}</div>
                </a>
                <a
                  href={featuredProject.externalUrl || `/work/${featuredProject.slug}`}
                  target={featuredProject.externalUrl ? '_blank' : undefined}
                  rel={featuredProject.externalUrl ? 'noopener noreferrer' : undefined}
                  className={arrowLink}
                  aria-label={`View ${featuredProject.title}`}
                >
                  →
                </a>
                {featuredProject.problem && (
                  <p className={projectDesc}>{featuredProject.problem}</p>
                )}
                <div className={projectMeta}>
                  {featuredProject.stack && featuredProject.stack.length > 0 && (
                    <span className={pill}>{featuredProject.stack[0]}</span>
                  )}
                  <span className={yearStamp}>{featuredProject.year}</span>
                </div>
              </div>
            </div>
          </>
        )}

        <div className={sectionSpacer} />

        <div className={sectionLabel}>Selected Work</div>
        <div className={workSection}>
          {selectedWork.map((project) => (
            <div key={project.slug} className={projectRow}>
              <a href={`/work/${project.slug}`} style={{ textDecoration: 'none', gridColumn: '1' }}>
                <div className={projectTitle}>{project.title}</div>
              </a>
              <a
                href={`/work/${project.slug}`}
                className={arrowLink}
                aria-label={`View ${project.title}`}
              >
                →
              </a>
              {project.problem && (
                <p className={projectDesc}>{project.problem}</p>
              )}
              <div className={projectMeta}>
                <span className={pill}>{project.type}</span>
                <span className={yearStamp}>{project.year}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={sectionSpacer} />

        <div className={sectionLabel}>Experiments</div>
        <div className={workSection}>
          {experiments.map((project) => (
            <div key={project.slug} className={projectRow}>
              <a
                href={project.externalUrl || `/work/${project.slug}`}
                target={project.externalUrl ? '_blank' : undefined}
                rel={project.externalUrl ? 'noopener noreferrer' : undefined}
                style={{ textDecoration: 'none', gridColumn: '1' }}
              >
                <div className={projectTitle}>{project.title}</div>
              </a>
              <a
                href={project.externalUrl || `/work/${project.slug}`}
                target={project.externalUrl ? '_blank' : undefined}
                rel={project.externalUrl ? 'noopener noreferrer' : undefined}
                className={arrowLink}
                aria-label={`View ${project.title}`}
              >
                →
              </a>
              {project.description && (
                <p className={projectDesc}>{project.description}</p>
              )}
              <div className={projectMeta}>
                <span className={pill}>{project.type}</span>
                <span className={yearStamp}>{project.year}</span>
              </div>
            </div>
          ))}
          <div className={lastBorder} />
        </div>
      </main>

      <footer className={footerArea}>
        <span className={footerText}>© 2026 Doug March</span>
        <a href="/archive" className={footerLink}>Archive</a>
      </footer>
    </>
  )
}