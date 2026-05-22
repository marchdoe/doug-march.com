import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkDetail })

const pageWrap = css({
  padding: '0 5vw',
  minHeight: 'calc(100vh - 58px)',
})

const pageHeader = css({
  padding: '32px 0 16px 0',
})

const backLink = css({
  fontFamily: 'body',
  fontSize: '11px',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'textMuted',
  textDecoration: 'none',
  marginBottom: '16px',
  display: 'inline-block',
  padding: '8px 0',
  _hover: {
    color: 'accent',
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
  },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

const projectTitle = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(28px, 4vw, 56px)',
  lineHeight: 'tight',
  letterSpacing: 'tight',
  color: 'text',
})

const metaRow = css({
  display: 'flex',
  gap: '24px',
  marginTop: '8px',
  flexWrap: 'wrap',
})

const metaItem = css({
  fontFamily: 'body',
  fontSize: '11px',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'textMuted',
})

const mainRule = css({
  border: 'none',
  borderTop: '1px solid',
  borderColor: 'border',
  margin: '0',
})

const contentGrid = css({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '32px',
  padding: '24px 0 64px 0',
  '@media (min-width: 768px)': {
    gridTemplateColumns: '1.5fr 1fr',
  },
})

const sectionHeader = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '11px',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'textMuted',
  lineHeight: 'snug',
  paddingBottom: '8px',
  borderBottom: '2px solid',
  borderColor: 'borderAccent',
  marginBottom: '16px',
})

const bodyText = css({
  fontFamily: 'body',
  fontSize: '14px',
  lineHeight: 'normal',
  color: 'textSecondary',
  maxWidth: '65ch',
  marginBottom: '16px',
})

const stackTag = css({
  fontFamily: 'body',
  fontSize: '11px',
  fontWeight: 'medium',
  letterSpacing: 'wide',
  textTransform: 'uppercase',
  color: 'textSecondary',
  padding: '4px 10px',
  border: '1px solid',
  borderColor: 'border',
  lineHeight: 'snug',
})

const externalLink = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '12px',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'accent',
  textDecoration: 'none',
  display: 'inline-block',
  padding: '8px 0',
  _hover: {
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
    color: 'accentHover',
  },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

const footerWrap = css({
  padding: '24px 5vw',
  borderTop: '1px solid',
  borderColor: 'border',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '11px',
  color: 'textMuted',
  letterSpacing: 'wider',
  textTransform: 'uppercase',
})

const footerLink = css({
  fontFamily: 'body',
  fontSize: '11px',
  color: 'textMuted',
  letterSpacing: 'wider',
  textTransform: 'uppercase',
  textDecoration: 'none',
  _hover: {
    color: 'textSecondary',
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
  },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

function WorkDetail() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className={pageWrap}>
        <div className={pageHeader}>
          <a href="/" className={backLink}>← Back</a>
          <h1 className={projectTitle}>Project not found</h1>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={pageWrap}>
        <div className={pageHeader}>
          <a href="/" className={backLink}>← Back to Index</a>
          <h1 className={projectTitle}>{project.title}</h1>
          <div className={metaRow}>
            <span className={metaItem}>{project.type}</span>
            <span className={metaItem}>{project.year}</span>
            {project.role && <span className={metaItem}>{project.role}</span>}
          </div>
        </div>

        <hr className={mainRule} />

        <div className={contentGrid}>
          {/* Main content column */}
          <div>
            {project.problem && (
              <>
                <div className={sectionHeader}>Problem</div>
                <p className={bodyText}>{project.problem}</p>
              </>
            )}

            {project.approach && (
              <>
                <div className={sectionHeader}>Approach</div>
                <p className={bodyText}>{project.approach}</p>
              </>
            )}

            {project.outcome && (
              <>
                <div className={sectionHeader}>Outcome</div>
                <p className={bodyText}>{project.outcome}</p>
              </>
            )}

            {project.description && (
              <>
                <div className={sectionHeader}>Description</div>
                <p className={bodyText}>{project.description}</p>
              </>
            )}
          </div>

          {/* Sidebar column */}
          <div>
            {project.stack && project.stack.length > 0 && (
              <>
                <div className={sectionHeader}>Stack</div>
                <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' })}>
                  {project.stack.map((tech, i) => (
                    <span className={stackTag} key={i}>{tech}</span>
                  ))}
                </div>
              </>
            )}

            {(project.externalUrl || project.liveUrl) && (
              <>
                <div className={sectionHeader}>Links</div>
                {project.externalUrl && (
                  <a href={project.externalUrl} className={externalLink}>
                    Visit Project →
                  </a>
                )}
                {project.liveUrl && project.liveUrl !== project.externalUrl && (
                  <a href={project.liveUrl} className={externalLink} style={{ display: 'block' }}>
                    Live Site →
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} className={externalLink} style={{ display: 'block' }}>
                    Source Code →
                  </a>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <footer className={footerWrap}>
        <span className={footerText}>© 2026 Doug March</span>
        <a href="/archive" className={footerLink}>Archive</a>
      </footer>
    </>
  )
}