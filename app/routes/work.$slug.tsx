import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: ProjectPage })

const pageWrap = css({
  paddingTop: '6xl',
  maxWidth: '760px',
  margin: '0 auto',
  padding: '6xl 3xl 4xl',
  '@media (max-width: 767px)': {
    padding: '6xl md 4xl',
  },
})

const backLink = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: 'wider',
  textTransform: 'uppercase',
  color: 'textMuted',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'xs',
  minHeight: '44px',
  marginBottom: '2xl',
  _hover: { color: 'textSecondary' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px', borderRadius: 'sm' },
})

const titleStyle = css({
  fontFamily: 'heading',
  fontSize: 'clamp(32px, 5vw, 56px)',
  fontWeight: 'normal',
  lineHeight: 'snug',
  letterSpacing: 'tight',
  color: 'text',
  marginBottom: 'md',
})

const metaRow = css({
  display: 'flex',
  gap: 'md',
  alignItems: 'center',
  flexWrap: 'wrap',
  marginBottom: '4xl',
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
})

const yearText = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: 'widest',
  color: 'textMuted',
})

const sectionLabel = css({
  fontFamily: 'body',
  fontSize: '12px',
  fontWeight: 'normal',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: 'md',
  marginTop: '4xl',
})

const bodyText = css({
  fontFamily: 'body',
  fontSize: '16px',
  lineHeight: 'normal',
  color: 'textSecondary',
  maxWidth: '600px',
})

const stackWrap = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'sm',
  marginTop: 'md',
})

const stackPill = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'textMuted',
  border: '1px solid',
  borderColor: 'border',
  borderRadius: 'md',
  padding: '4px 12px',
})

const extLink = css({
  fontFamily: 'body',
  fontSize: '14px',
  letterSpacing: 'wider',
  textTransform: 'uppercase',
  color: 'accent',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'sm',
  minHeight: '44px',
  marginTop: '4xl',
  _hover: { color: 'accentDark' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px', borderRadius: 'sm' },
})

const footerArea = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '6xl 0 4xl',
  borderTop: '1px solid',
  borderColor: 'border',
  marginTop: '6xl',
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

function ProjectPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <main className={pageWrap}>
        <a href="/" className={backLink}>← Back</a>
        <h1 className={titleStyle}>Project not found</h1>
      </main>
    )
  }

  return (
    <main className={pageWrap}>
      <a href="/" className={backLink}>← Back</a>
      <h1 className={titleStyle}>{project.title}</h1>
      <div className={metaRow}>
        <span className={pill}>{project.type}</span>
        <span className={yearText}>{project.year}</span>
        {project.role && <span className={yearText}>{project.role}</span>}
      </div>

      {project.problem && (
        <>
          <div className={sectionLabel}>Problem</div>
          <p className={bodyText}>{project.problem}</p>
        </>
      )}

      {project.approach && (
        <>
          <div className={sectionLabel}>Approach</div>
          <p className={bodyText}>{project.approach}</p>
        </>
      )}

      {project.outcome && (
        <>
          <div className={sectionLabel}>Outcome</div>
          <p className={bodyText}>{project.outcome}</p>
        </>
      )}

      {project.description && (
        <>
          <div className={sectionLabel}>About</div>
          <p className={bodyText}>{project.description}</p>
        </>
      )}

      {project.stack && project.stack.length > 0 && (
        <>
          <div className={sectionLabel}>Stack</div>
          <div className={stackWrap}>
            {project.stack.map((tech) => (
              <span key={tech} className={stackPill}>{tech}</span>
            ))}
          </div>
        </>
      )}

      {(project.externalUrl || project.liveUrl) && (
        <a
          href={project.externalUrl || project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          Visit Project →
        </a>
      )}

      <footer className={footerArea}>
        <span className={footerText}>© 2026 Doug March</span>
        <a href="/archive" className={footerLink}>Archive</a>
      </footer>
    </main>
  )
}