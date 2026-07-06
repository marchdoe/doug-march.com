import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: ProjectPage })

const scrollRoot = css({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  paddingTop: '52px',
})

const heroSection = css({
  padding: '96px 6vw',
  borderBottom: '1px solid',
  borderColor: 'border',
})

const backLink = css({
  fontFamily: 'body',
  fontSize: '0.8125rem',
  fontWeight: 'medium',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'textMuted',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  marginBottom: '48px',
  minHeight: '44px',
  padding: '8px 0',
  transition: 'color 0.18s ease',
  '&:hover': { color: 'accentLight' },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '4px',
    borderRadius: '2px',
  },
})

const title = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(2.5rem, 6vw, 6rem)',
  lineHeight: '1.1',
  letterSpacing: '-0.02em',
  color: 'text',
  marginBottom: '16px',
})

const metaRow = css({
  display: 'flex',
  gap: '24px',
  flexWrap: 'wrap',
  alignItems: 'baseline',
})

const metaItem = css({
  fontFamily: 'body',
  fontSize: '0.8125rem',
  fontWeight: 'medium',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: 'textMuted',
})

const sectionWrap = css({
  width: '100%',
  padding: '64px 6vw',
  borderBottom: '1px solid',
  borderColor: 'border',
})

const sectionLabel = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  fontWeight: 'medium',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '16px',
})

const bodyText = css({
  fontFamily: 'body',
  fontSize: 'clamp(1rem, 1.3vw, 1.125rem)',
  lineHeight: '1.55',
  color: 'text',
  maxWidth: '72ch',
})

const stackList = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
})

const stackTag = css({
  fontFamily: 'body',
  fontSize: '0.8125rem',
  fontWeight: 'medium',
  color: 'textSecondary',
  background: 'bgCard',
  padding: '8px 16px',
  borderRadius: 'full',
})

const externalLink = css({
  fontFamily: 'body',
  fontSize: '0.9375rem',
  fontWeight: 'medium',
  color: 'accent',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  minHeight: '44px',
  padding: '8px 0',
  transition: 'color 0.18s ease',
  '&:hover': { color: 'accentLight' },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '4px',
    borderRadius: '2px',
  },
})

const footerWrap = css({
  width: '100%',
  padding: '48px 6vw',
  borderTop: '1px solid',
  borderColor: 'border',
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: '16px',
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '0.8125rem',
  color: 'textMuted',
  letterSpacing: '0.04em',
})

const footerLink = css({
  fontFamily: 'body',
  fontSize: '0.8125rem',
  color: 'textMuted',
  letterSpacing: '0.04em',
  textDecoration: 'none',
  transition: 'color 0.18s ease',
  padding: '8px 0',
  minHeight: '44px',
  display: 'inline-flex',
  alignItems: 'center',
  '&:hover': { color: 'accentLight' },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '4px',
    borderRadius: '2px',
  },
})

function ProjectPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className={scrollRoot}>
        <section className={heroSection}>
          <a href="/" className={backLink}>← Back</a>
          <h1 className={title}>Project not found</h1>
        </section>
      </div>
    )
  }

  return (
    <div className={scrollRoot}>
      <section className={heroSection}>
        <a href="/" className={backLink}>← Back</a>
        <h1 className={title}>{project.title}</h1>
        <div className={metaRow}>
          <span className={metaItem}>{project.type}</span>
          <span className={metaItem}>{project.year}</span>
          {project.role && <span className={metaItem}>{project.role}</span>}
        </div>
      </section>

      {project.problem && (
        <section className={sectionWrap}>
          <p className={sectionLabel}>Problem</p>
          <p className={bodyText}>{project.problem}</p>
        </section>
      )}

      {project.approach && (
        <section className={sectionWrap}>
          <p className={sectionLabel}>Approach</p>
          <p className={bodyText}>{project.approach}</p>
        </section>
      )}

      {project.outcome && (
        <section className={sectionWrap}>
          <p className={sectionLabel}>Outcome</p>
          <p className={bodyText}>{project.outcome}</p>
        </section>
      )}

      {project.description && (
        <section className={sectionWrap}>
          <p className={sectionLabel}>About</p>
          <p className={bodyText}>{project.description}</p>
        </section>
      )}

      {project.stack && project.stack.length > 0 && (
        <section className={sectionWrap}>
          <p className={sectionLabel}>Stack</p>
          <div className={stackList}>
            {project.stack.map((tech) => (
              <span key={tech} className={stackTag}>{tech}</span>
            ))}
          </div>
        </section>
      )}

      {(project.externalUrl || project.liveUrl || project.githubUrl) && (
        <section className={sectionWrap}>
          <p className={sectionLabel}>Links</p>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            {project.externalUrl && (
              <a href={project.externalUrl} className={externalLink} target="_blank" rel="noopener noreferrer">
                Visit site →
              </a>
            )}
            {project.liveUrl && project.liveUrl !== project.externalUrl && (
              <a href={project.liveUrl} className={externalLink} target="_blank" rel="noopener noreferrer">
                Live →
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} className={externalLink} target="_blank" rel="noopener noreferrer">
                GitHub →
              </a>
            )}
          </div>
        </section>
      )}

      <footer className={footerWrap}>
        <span className={footerText}>© 2026 Doug March</span>
        <a href="/archive" className={footerLink}>Archive</a>
      </footer>
    </div>
  )
}