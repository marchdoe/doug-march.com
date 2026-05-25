import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkDetail })

const pageWrap = css({
  width: '100%',
  paddingTop: '120px',
})

const section = css({
  width: '100%',
  padding: '96px 8vw',
})

const sectionAlt = css({
  width: '100%',
  padding: '96px 8vw',
  background: 'bgSection',
})

const eyebrow = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '11px',
  letterSpacing: '0.12em',
  color: 'accentLight',
  textTransform: 'uppercase',
  marginBottom: '16px',
})

const title = css({
  fontFamily: 'display',
  fontWeight: 'black',
  fontSize: 'clamp(36px, 6vw, 80px)',
  lineHeight: '0.95',
  letterSpacing: '-0.025em',
  color: 'text',
  marginBottom: '24px',
})

const meta = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'textMuted',
  marginBottom: '48px',
  display: 'flex',
  gap: '16px',
  flexWrap: 'wrap',
  alignItems: 'center',
})

const metaTag = css({
  background: 'bgCard',
  borderRadius: 'full',
  padding: '6px 16px',
  fontSize: '13px',
  color: 'textSecondary',
})

const bodyText = css({
  fontFamily: 'body',
  fontSize: 'clamp(16px, 1.3vw, 20px)',
  lineHeight: '1.65',
  color: 'textSecondary',
  maxWidth: '65ch',
  marginBottom: '32px',
})

const detailLabel = css({
  fontFamily: 'body',
  fontSize: '12px',
  fontWeight: 'medium',
  color: 'textMuted',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  marginBottom: '8px',
})

const detailValue = css({
  fontFamily: 'body',
  fontSize: '16px',
  lineHeight: '1.5',
  color: 'text',
  marginBottom: '32px',
})

const stackGrid = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginBottom: '32px',
})

const stackItem = css({
  fontFamily: 'mono',
  fontSize: '13px',
  color: 'textSecondary',
  background: 'bgCard',
  borderRadius: 'full',
  padding: '6px 16px',
})

const linkBtn = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '14px',
  letterSpacing: '0.04em',
  color: 'accent',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  padding: '12px 0',
  marginRight: '32px',
  transition: 'color 200ms ease',
  _hover: { color: 'accentLight' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px', borderRadius: 'sm' },
})

const backLink = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'textMuted',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  padding: '12px 0',
  _hover: { color: 'textSecondary' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px', borderRadius: 'sm' },
})

const footer = css({
  width: '100%',
  padding: '48px 8vw',
  borderTop: '1px solid',
  borderColor: 'border',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  alignItems: 'flex-start',
  md: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: 'textMuted',
})

const footerLinkStyle = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: 'textMuted',
  textDecoration: 'none',
  _hover: { color: 'textSecondary' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px', borderRadius: 'sm' },
})

function WorkDetail() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className={pageWrap}>
        <section className={section}>
          <h1 className={title}>Project not found</h1>
          <a href="/" className={backLink}>← Back to work</a>
        </section>
      </div>
    )
  }

  return (
    <div className={pageWrap}>
      <section className={section}>
        <p className={eyebrow}>{project.type} · {project.year}</p>
        <h1 className={title}>{project.title}</h1>
        <div className={meta}>
          {project.role && <span className={metaTag}>{project.role}</span>}
          <span className={metaTag}>{project.type}</span>
          <span className={metaTag}>{project.year}</span>
        </div>
      </section>

      <section className={sectionAlt}>
        {project.problem && (
          <>
            <p className={detailLabel}>Problem</p>
            <p className={bodyText}>{project.problem}</p>
          </>
        )}
        {project.approach && (
          <>
            <p className={detailLabel}>Approach</p>
            <p className={bodyText}>{project.approach}</p>
          </>
        )}
        {project.outcome && (
          <>
            <p className={detailLabel}>Outcome</p>
            <p className={bodyText}>{project.outcome}</p>
          </>
        )}
        {project.description && (
          <>
            <p className={detailLabel}>Description</p>
            <p className={bodyText}>{project.description}</p>
          </>
        )}
      </section>

      {project.stack && project.stack.length > 0 && (
        <section className={section}>
          <p className={detailLabel}>Stack</p>
          <div className={stackGrid}>
            {project.stack.map((tech, i) => (
              <span key={i} className={stackItem}>{tech}</span>
            ))}
          </div>
        </section>
      )}

      <section className={css({ width: '100%', padding: '48px 8vw' })}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          {project.externalUrl && (
            <a href={project.externalUrl} className={linkBtn} target="_blank" rel="noopener noreferrer">
              Visit Live →
            </a>
          )}
          {project.liveUrl && !project.externalUrl && (
            <a href={project.liveUrl} className={linkBtn} target="_blank" rel="noopener noreferrer">
              Visit Live →
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} className={linkBtn} target="_blank" rel="noopener noreferrer">
              GitHub →
            </a>
          )}
          <a href="/" className={backLink}>← Back to work</a>
        </div>
      </section>

      <footer className={footer}>
        <span className={footerText}>© 2026 Doug March</span>
        <div style={{ display: 'flex', gap: '24px' }}>
          <a href="/archive" className={footerLinkStyle}>Archive</a>
          <a href="/about" className={footerLinkStyle}>About</a>
        </div>
      </footer>
    </div>
  )
}