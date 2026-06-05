import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkDetail })

const scrollColumn = css({
  width: '85vw',
  margin: '0 auto',
})

const heroBlock = css({
  minHeight: '70vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  paddingTop: 'calc(56px + 16vh)',
  paddingBottom: '64px',
})

const eyebrow = css({
  fontFamily: 'body',
  fontSize: '11px',
  textTransform: 'uppercase',
  letterSpacing: '0.14em',
  color: 'textMuted',
  marginBottom: '16px',
})

const titleStyle = css({
  fontFamily: 'display',
  fontWeight: 900,
  fontSize: 'clamp(36px, 5vw, 72px)',
  lineHeight: '0.92',
  letterSpacing: '-0.03em',
  color: 'text',
  marginBottom: '16px',
})

const metaRow = css({
  display: 'flex',
  gap: '24px',
  flexWrap: 'wrap',
  marginBottom: '40px',
})

const metaItem = css({
  fontFamily: 'body',
  fontSize: '12px',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: 'textMuted',
})

const metaValue = css({
  color: 'textSecondary',
  marginLeft: '8px',
})

const sectionWrap = css({
  padding: '64px 0',
  borderTop: '1px solid',
  borderColor: 'border',
})

const sectionLabel = css({
  fontFamily: 'body',
  fontSize: '11px',
  textTransform: 'uppercase',
  letterSpacing: '0.14em',
  color: 'textMuted',
  marginBottom: '16px',
})

const sectionBody = css({
  fontFamily: 'body',
  fontSize: '16px',
  lineHeight: '1.6',
  color: 'textSecondary',
  maxWidth: '65ch',
})

const stackGrid = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
})

const stackTag = css({
  fontFamily: 'body',
  fontSize: '12px',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: 'textSecondary',
  padding: '6px 12px',
  border: '1px solid',
  borderColor: 'border',
  borderRadius: '2px',
})

const linkRow = css({
  display: 'flex',
  gap: '24px',
  flexWrap: 'wrap',
  marginTop: '32px',
})

const projectLink = css({
  fontFamily: 'body',
  fontSize: '14px',
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: 'accent',
  textDecoration: 'none',
  padding: '12px 0',
  borderBottom: '1px solid',
  borderColor: 'borderAccent',
  transition: 'color 150ms ease',
  _hover: { color: 'accentLight' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px' },
})

const backLink = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'textMuted',
  textDecoration: 'none',
  padding: '12px 0',
  display: 'inline-block',
  marginTop: '64px',
  _hover: { color: 'textSecondary' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px' },
})

const footerBar = css({
  padding: '32px 0',
  borderTop: '1px solid',
  borderColor: 'border',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '16px',
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textMuted',
  letterSpacing: '0.06em',
})

const archiveLink = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textMuted',
  textDecoration: 'none',
  letterSpacing: '0.06em',
  _hover: { color: 'textSecondary' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
})

function WorkDetail() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className={scrollColumn} style={{ paddingTop: '120px' }}>
        <h1 className={titleStyle}>Project not found</h1>
        <a href="/" className={backLink}>← Back home</a>
      </div>
    )
  }

  return (
    <div>
      <section className={heroBlock}>
        <div className={scrollColumn}>
          <p className={eyebrow}>{project.type} · {project.year}</p>
          <h1 className={titleStyle}>{project.title}</h1>
          <div className={metaRow}>
            {project.role && (
              <span className={metaItem}>Role<span className={metaValue}>{project.role}</span></span>
            )}
            {project.year && (
              <span className={metaItem}>Year<span className={metaValue}>{project.year}</span></span>
            )}
          </div>
        </div>
      </section>

      {project.problem && (
        <section className={sectionWrap}>
          <div className={scrollColumn}>
            <p className={sectionLabel}>Problem</p>
            <p className={sectionBody}>{project.problem}</p>
          </div>
        </section>
      )}

      {project.approach && (
        <section className={sectionWrap}>
          <div className={scrollColumn}>
            <p className={sectionLabel}>Approach</p>
            <p className={sectionBody}>{project.approach}</p>
          </div>
        </section>
      )}

      {project.outcome && (
        <section className={sectionWrap}>
          <div className={scrollColumn}>
            <p className={sectionLabel}>Outcome</p>
            <p className={sectionBody}>{project.outcome}</p>
          </div>
        </section>
      )}

      {project.description && (
        <section className={sectionWrap}>
          <div className={scrollColumn}>
            <p className={sectionLabel}>About</p>
            <p className={sectionBody}>{project.description}</p>
          </div>
        </section>
      )}

      {project.stack && project.stack.length > 0 && (
        <section className={sectionWrap}>
          <div className={scrollColumn}>
            <p className={sectionLabel}>Stack</p>
            <div className={stackGrid}>
              {project.stack.map((tech) => (
                <span key={tech} className={stackTag}>{tech}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className={scrollColumn}>
        <div className={linkRow}>
          {project.externalUrl && (
            <a href={project.externalUrl} className={projectLink} target="_blank" rel="noopener noreferrer">
              Visit Site →
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} className={projectLink} target="_blank" rel="noopener noreferrer">
              Live →
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} className={projectLink} target="_blank" rel="noopener noreferrer">
              GitHub →
            </a>
          )}
        </div>
        <a href="/" className={backLink}>← Back to work</a>
      </div>

      <footer style={{ marginTop: '64px' }}>
        <div className={scrollColumn}>
          <div className={footerBar}>
            <span className={footerText}>Doug March · Product Designer & Developer</span>
            <a href="/archive" className={archiveLink}>Archive</a>
          </div>
        </div>
      </footer>
    </div>
  )
}