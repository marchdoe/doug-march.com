import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkDetail })

const heroBand = css({
  width: '100%',
  background: 'bg',
  padding: '128px 6vw 72px',
  minHeight: '50vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
})

const heroTitle = css({
  fontFamily: 'display',
  fontSize: 'clamp(48px, 10vw, 128px)',
  lineHeight: '0.85',
  color: 'accent',
  marginBottom: '16px',
})

const heroMeta = css({
  fontFamily: 'body',
  fontSize: '13px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'textMuted',
})

const band = css({
  width: '100%',
  padding: '72px 6vw',
  borderTop: '1px solid',
  borderColor: 'border',
})

const bandDark = css({
  width: '100%',
  padding: '72px 6vw',
  borderTop: '1px solid',
  borderColor: 'border',
  background: 'bgCard',
})

const sectionLabel = css({
  fontFamily: 'body',
  fontSize: '11px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '16px',
})

const bodyText = css({
  fontFamily: 'body',
  fontSize: '16px',
  lineHeight: '1.5',
  color: 'text',
  maxWidth: '60ch',
})

const stackList = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginTop: '16px',
})

const stackTag = css({
  fontFamily: 'mono',
  fontSize: '13px',
  color: 'textSecondary',
  padding: '6px 12px',
  border: '1px solid',
  borderColor: 'border',
})

const linkBtn = css({
  display: 'inline-flex',
  alignItems: 'center',
  fontFamily: 'body',
  fontSize: '14px',
  fontWeight: 'medium',
  letterSpacing: '0.05em',
  color: 'accent',
  textDecoration: 'none',
  padding: '12px 24px',
  border: '1px solid',
  borderColor: 'accent',
  minHeight: '44px',
  transition: 'background 0.2s ease, color 0.2s ease',
  _hover: {
    background: 'accent',
    color: 'bg',
    textDecoration: 'none',
  },
})

const footerBand = css({
  width: '100%',
  background: 'bgCard',
  padding: '48px 6vw',
  borderTop: '1px solid',
  borderColor: 'border',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '16px',
})

const footerLink = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: 'textMuted',
  textDecoration: 'none',
  minHeight: '44px',
  display: 'flex',
  alignItems: 'center',
  _hover: {
    color: 'accent',
  },
})

const notFoundText = css({
  fontFamily: 'display',
  fontSize: 'clamp(32px, 8vw, 96px)',
  lineHeight: '0.85',
  color: 'textMuted',
  padding: '128px 6vw',
})

const detailGrid = css({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '48px',
  '@media (min-width: 768px)': {
    gridTemplateColumns: '1fr 1fr',
  },
})

const detailBlock = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
})

function WorkDetail() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <>
        <h1 className={notFoundText}>Project not found</h1>
        <footer className={footerBand}>
          <a href="/" className={footerLink}>← Work</a>
        </footer>
      </>
    )
  }

  return (
    <>
      {/* Hero */}
      <section className={heroBand}>
        <p className={heroMeta}>{project.type} · {project.year}</p>
        <h1 className={heroTitle}>{project.title}</h1>
      </section>

      {/* Details */}
      {project.depth === 'full' ? (
        <>
          <section className={bandDark}>
            <div className={detailGrid}>
              {project.role && (
                <div className={detailBlock}>
                  <p className={sectionLabel}>Role</p>
                  <p className={bodyText}>{project.role}</p>
                </div>
              )}
              {project.problem && (
                <div className={detailBlock}>
                  <p className={sectionLabel}>Problem</p>
                  <p className={bodyText}>{project.problem}</p>
                </div>
              )}
              {project.approach && (
                <div className={detailBlock}>
                  <p className={sectionLabel}>Approach</p>
                  <p className={bodyText}>{project.approach}</p>
                </div>
              )}
              {project.outcome && (
                <div className={detailBlock}>
                  <p className={sectionLabel}>Outcome</p>
                  <p className={bodyText}>{project.outcome}</p>
                </div>
              )}
            </div>
          </section>

          {project.stack && project.stack.length > 0 && (
            <section className={band}>
              <p className={sectionLabel}>Stack</p>
              <div className={stackList}>
                {project.stack.map((tech) => (
                  <span key={tech} className={stackTag}>{tech}</span>
                ))}
              </div>
            </section>
          )}
        </>
      ) : (
        project.description && (
          <section className={bandDark}>
            <p className={sectionLabel}>About</p>
            <p className={bodyText}>{project.description}</p>
          </section>
        )
      )}

      {/* Links */}
      {(project.externalUrl || project.liveUrl || project.githubUrl) && (
        <section className={band}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {project.externalUrl && (
              <a href={project.externalUrl} className={linkBtn} target="_blank" rel="noopener noreferrer">
                Visit Site ↗
              </a>
            )}
            {project.liveUrl && !project.externalUrl && (
              <a href={project.liveUrl} className={linkBtn} target="_blank" rel="noopener noreferrer">
                Live ↗
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} className={linkBtn} target="_blank" rel="noopener noreferrer">
                GitHub ↗
              </a>
            )}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className={footerBand}>
        <a href="/" className={footerLink}>← All Work</a>
        <a href="/archive" className={footerLink}>Archive</a>
      </footer>
    </>
  )
}