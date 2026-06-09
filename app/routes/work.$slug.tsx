import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: ProjectPage })

const pageWrap = css({
  padding: '0 6vw 80px',
})

const heroArea = css({
  padding: '48px 0 40px',
  borderBottom: '1px solid',
  borderColor: 'border',
  minHeight: '25vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
})

const projectTitle = css({
  fontFamily: 'display',
  fontSize: 'clamp(40px, 7vw, 96px)',
  lineHeight: '0.92',
  letterSpacing: '-0.01em',
  color: 'accent',
  fontWeight: 'bold',
  textTransform: 'uppercase',
})

const projectType = css({
  fontFamily: 'body',
  fontSize: '13px',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginTop: '16px',
})

const indexBody = css({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '0',
  borderTop: '1px solid',
  borderColor: 'border',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
  },
})

const columnLeft = css({
  borderRight: '1px solid',
  borderColor: 'border',
  paddingRight: '32px',
  '@media (max-width: 768px)': {
    borderRight: 'none',
    paddingRight: '0',
  },
})

const columnRight = css({
  paddingLeft: '32px',
  '@media (max-width: 768px)': {
    paddingLeft: '0',
    borderTop: '1px solid',
    borderColor: 'border',
  },
})

const sectionBlock = css({
  padding: '48px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
  _last: { borderBottom: 'none' },
})

const sectionLabel = css({
  fontFamily: 'display',
  fontSize: '20px',
  fontWeight: 'bold',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: 'textMuted',
  lineHeight: '1.1',
  marginBottom: '24px',
})

const bodyText = css({
  fontFamily: 'body',
  fontSize: '16px',
  color: 'text',
  lineHeight: '1.55',
  maxWidth: '65ch',
})

const metaRow = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '48px',
  padding: '0 8px',
  borderBottom: '1px solid',
  borderColor: 'borderSubtle',
  _last: { borderBottom: 'none' },
})

const metaLabel = css({
  fontFamily: 'body',
  fontSize: '13px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'textMuted',
})

const metaValue = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'text',
  textAlign: 'right',
})

const stackTag = css({
  fontFamily: 'mono',
  fontSize: '13px',
  color: 'textSecondary',
  padding: '8px',
  borderBottom: '1px solid',
  borderColor: 'borderSubtle',
  _last: { borderBottom: 'none' },
})

const extLink = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'accent',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: '44px',
  letterSpacing: '0.05em',
  _hover: { color: 'accentLight' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
})

const backLink = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'textSecondary',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: '44px',
  padding: '16px 0',
  _hover: { color: 'accent' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
})

const notFoundWrap = css({
  padding: '96px 6vw',
  textAlign: 'center',
})

const notFoundTitle = css({
  fontFamily: 'display',
  fontSize: 'clamp(32px, 5vw, 64px)',
  color: 'textMuted',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
})

function ProjectPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className={notFoundWrap}>
        <h1 className={notFoundTitle}>Project Not Found</h1>
        <a href="/" className={backLink}>← Back to index</a>
      </div>
    )
  }

  return (
    <div className={pageWrap}>
      {/* Hero */}
      <section className={heroArea}>
        <h1 className={projectTitle}>{project.title}</h1>
        <p className={projectType}>{project.type} · {project.year}</p>
      </section>

      {/* Body */}
      <div className={indexBody}>
        {/* Left — Content */}
        <div className={columnLeft}>
          {project.problem && (
            <section className={sectionBlock}>
              <h2 className={sectionLabel}>Problem</h2>
              <p className={bodyText}>{project.problem}</p>
            </section>
          )}

          {project.approach && (
            <section className={sectionBlock}>
              <h2 className={sectionLabel}>Approach</h2>
              <p className={bodyText}>{project.approach}</p>
            </section>
          )}

          {project.outcome && (
            <section className={sectionBlock}>
              <h2 className={sectionLabel}>Outcome</h2>
              <p className={bodyText}>{project.outcome}</p>
            </section>
          )}

          {project.description && !project.problem && (
            <section className={sectionBlock}>
              <h2 className={sectionLabel}>About</h2>
              <p className={bodyText}>{project.description}</p>
            </section>
          )}

          <div style={{ padding: '24px 0' }}>
            <a href="/" className={backLink}>← Back to index</a>
          </div>
        </div>

        {/* Right — Meta */}
        <div className={columnRight}>
          <section className={sectionBlock}>
            <h2 className={sectionLabel}>Details</h2>
            {project.role && (
              <div className={metaRow}>
                <span className={metaLabel}>Role</span>
                <span className={metaValue}>{project.role}</span>
              </div>
            )}
            <div className={metaRow}>
              <span className={metaLabel}>Year</span>
              <span className={metaValue}>{project.year}</span>
            </div>
            <div className={metaRow}>
              <span className={metaLabel}>Type</span>
              <span className={metaValue}>{project.type}</span>
            </div>
            {project.externalUrl && (
              <div className={metaRow}>
                <span className={metaLabel}>Link</span>
                <a href={project.externalUrl} className={extLink}>Visit →</a>
              </div>
            )}
            {project.liveUrl && (
              <div className={metaRow}>
                <span className={metaLabel}>Live</span>
                <a href={project.liveUrl} className={extLink}>View →</a>
              </div>
            )}
            {project.githubUrl && (
              <div className={metaRow}>
                <span className={metaLabel}>Source</span>
                <a href={project.githubUrl} className={extLink}>GitHub →</a>
              </div>
            )}
          </section>

          {project.stack && project.stack.length > 0 && (
            <section className={sectionBlock}>
              <h2 className={sectionLabel}>Stack</h2>
              {project.stack.map((tech, i) => (
                <div key={i} className={stackTag}>{tech}</div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  )
}