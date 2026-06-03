import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkDetail })

const page = css({
  paddingTop: '96px',
  paddingBottom: '80px',
  paddingLeft: '5vw',
  paddingRight: '5vw',
  minHeight: '100vh',
})

const backLink = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'textMuted',
  textDecoration: 'none',
  marginBottom: '48px',
  display: 'inline-block',
  transition: 'color 0.15s ease',
  _hover: { color: 'accentLight' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px' },
})

const projectTitle = css({
  fontFamily: 'display',
  fontSize: 'clamp(48px, 10vw, 140px)',
  fontWeight: 'bold',
  lineHeight: 'tight',
  letterSpacing: '-0.02em',
  color: 'text',
  textTransform: 'uppercase',
  marginBottom: '16px',
})

const metaRow = css({
  display: 'flex',
  gap: '24px',
  marginBottom: '48px',
  flexWrap: 'wrap',
})

const metaItem = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'textMuted',
})

const sectionLabel = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: '0.20em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '12px',
  borderBottom: '1px solid',
  borderColor: 'border',
  paddingBottom: '8px',
})

const bodyText = css({
  fontFamily: 'body',
  fontSize: '16px',
  lineHeight: 'normal',
  color: 'textSecondary',
  maxWidth: '65ch',
  marginBottom: '48px',
})

const stackGrid = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginBottom: '48px',
})

const stackItem = css({
  fontFamily: 'body',
  fontSize: '13px',
  letterSpacing: '0.05em',
  color: 'textSecondary',
  padding: '6px 12px',
  border: '1px solid',
  borderColor: 'border',
  borderRadius: '0',
  lineHeight: 'normal',
})

const extLink = css({
  fontFamily: 'body',
  fontSize: '14px',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: 'accent',
  textDecoration: 'none',
  borderBottom: '1px solid',
  borderColor: 'accent',
  paddingBottom: '2px',
  transition: 'color 0.15s ease, border-color 0.15s ease',
  _hover: { color: 'accentLight', borderColor: 'accentLight' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px' },
})

const notFound = css({
  fontFamily: 'display',
  fontSize: 'clamp(32px, 6vw, 64px)',
  fontWeight: 'bold',
  color: 'textMuted',
  textTransform: 'uppercase',
  letterSpacing: '-0.02em',
})

const footerStrip = css({
  padding: '24px 5vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderTop: '1px solid',
  borderColor: 'border',
  flexWrap: 'wrap',
  gap: '12px',
  marginTop: 'auto',
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: 'textMuted',
})

const footerLink = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: 'textMuted',
  textDecoration: 'none',
  transition: 'color 0.15s ease',
  _hover: { color: 'accentLight' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px' },
})

function WorkDetail() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <>
        <main className={page}>
          <a href="/" className={backLink}>← Back</a>
          <h1 className={notFound}>Project Not Found</h1>
        </main>
        <footer className={footerStrip}>
          <span className={footerText}>Doug March</span>
          <a href="/archive" className={footerLink}>Archive</a>
        </footer>
      </>
    )
  }

  return (
    <>
      <main className={page}>
        <a href="/" className={backLink}>← Back</a>
        <h1 className={projectTitle}>{project.title}</h1>

        <div className={metaRow}>
          <span className={metaItem}>{project.type}</span>
          <span className={metaItem}>{project.year}</span>
          {project.role && <span className={metaItem}>{project.role}</span>}
        </div>

        {project.problem && (
          <div>
            <div className={sectionLabel}>Problem</div>
            <p className={bodyText}>{project.problem}</p>
          </div>
        )}

        {project.approach && (
          <div>
            <div className={sectionLabel}>Approach</div>
            <p className={bodyText}>{project.approach}</p>
          </div>
        )}

        {project.outcome && (
          <div>
            <div className={sectionLabel}>Outcome</div>
            <p className={bodyText}>{project.outcome}</p>
          </div>
        )}

        {project.description && (
          <div>
            <div className={sectionLabel}>Description</div>
            <p className={bodyText}>{project.description}</p>
          </div>
        )}

        {project.stack && project.stack.length > 0 && (
          <div>
            <div className={sectionLabel}>Stack</div>
            <div className={stackGrid}>
              {project.stack.map((tech, i) => (
                <span key={i} className={stackItem}>{tech}</span>
              ))}
            </div>
          </div>
        )}

        {(project.externalUrl || project.liveUrl || project.githubUrl) && (
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            {project.externalUrl && (
              <a href={project.externalUrl} className={extLink} target="_blank" rel="noopener noreferrer">
                Visit Site ↗
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} className={extLink} target="_blank" rel="noopener noreferrer">
                Live ↗
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} className={extLink} target="_blank" rel="noopener noreferrer">
                GitHub ↗
              </a>
            )}
          </div>
        )}
      </main>

      <footer className={footerStrip}>
        <span className={footerText}>Doug March — Product Designer &amp; Developer</span>
        <a href="/archive" className={footerLink}>Archive</a>
      </footer>
    </>
  )
}