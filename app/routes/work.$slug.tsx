import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: ProjectPage })

const headlineBandStyle = css({
  padding: '32px 4vw 24px',
  borderBottom: '1px solid',
  borderColor: 'border',
})

const titleStyle = css({
  fontFamily: 'display',
  fontSize: 'clamp(36px, 5vw, 72px)',
  lineHeight: 'tight',
  letterSpacing: 'tight',
  textTransform: 'uppercase',
  color: 'text',
})

const metaRow = css({
  display: 'flex',
  gap: '24px',
  marginTop: '12px',
  flexWrap: 'wrap',
})

const metaItem = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: 'textMuted',
  letterSpacing: 'wide',
  textTransform: 'uppercase',
})

const gridStyle = css({
  display: 'grid',
  gridTemplateColumns: { base: '1fr', lg: '2fr 1fr' },
  gap: '0',
  padding: '0 4vw',
  minHeight: '50vh',
})

const mainCol = css({
  padding: { base: '24px 0', lg: '32px 32px 32px 0' },
  borderRight: { base: 'none', lg: '1px solid' },
  borderColor: 'border',
})

const sideCol = css({
  padding: { base: '24px 0', lg: '32px 0 32px 32px' },
})

const eyebrowStyle = css({
  fontFamily: 'display',
  fontSize: '13px',
  color: 'accent',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  marginBottom: '12px',
})

const bodyStyle = css({
  fontFamily: 'body',
  fontSize: '16px',
  lineHeight: 'normal',
  color: 'text',
  marginBottom: '24px',
  maxWidth: '65ch',
})

const linkStyle = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'accent',
  textDecoration: 'none',
  letterSpacing: 'wide',
  textTransform: 'uppercase',
  padding: '4px 0',
  display: 'inline-block',
  _hover: { textDecoration: 'underline', opacity: 1 },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
})

const sideLabel = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: 'textMuted',
  letterSpacing: 'wide',
  textTransform: 'uppercase',
  marginBottom: '4px',
})

const sideValue = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'text',
  marginBottom: '20px',
  lineHeight: 'normal',
})

const stackTag = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: 'text',
  letterSpacing: 'wide',
  padding: '6px 12px',
  border: '1px solid',
  borderColor: 'border',
  display: 'inline-block',
  marginRight: '8px',
  marginBottom: '8px',
})

const footerStyle = css({
  padding: '24px 4vw',
  borderTop: '1px solid',
  borderColor: 'border',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  flexWrap: 'wrap',
  gap: '8px',
})

const footerTextStyle = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textMuted',
  letterSpacing: 'wide',
})

function ProjectPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className={css({ padding: '64px 4vw', textAlign: 'center' })}>
        <h1 className={titleStyle}>Project Not Found</h1>
        <a href="/" className={linkStyle}>← Back to Home</a>
      </div>
    )
  }

  return (
    <>
      <div className={headlineBandStyle}>
        <h1 className={titleStyle}>{project.title}</h1>
        <div className={metaRow}>
          <span className={metaItem}>{project.type}</span>
          <span className={metaItem}>{project.year}</span>
          {project.role && <span className={metaItem}>{project.role}</span>}
        </div>
      </div>

      <div className={gridStyle}>
        <div className={mainCol}>
          {project.problem && (
            <>
              <div className={eyebrowStyle}>Problem</div>
              <p className={bodyStyle}>{project.problem}</p>
            </>
          )}
          {project.approach && (
            <>
              <div className={eyebrowStyle}>Approach</div>
              <p className={bodyStyle}>{project.approach}</p>
            </>
          )}
          {project.outcome && (
            <>
              <div className={eyebrowStyle}>Outcome</div>
              <p className={bodyStyle}>{project.outcome}</p>
            </>
          )}
          {project.description && (
            <>
              <div className={eyebrowStyle}>Description</div>
              <p className={bodyStyle}>{project.description}</p>
            </>
          )}

          <div className={css({ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '8px' })}>
            {project.externalUrl && (
              <a href={project.externalUrl} className={linkStyle} target="_blank" rel="noopener noreferrer">
                Visit Site →
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} className={linkStyle} target="_blank" rel="noopener noreferrer">
                Live →
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} className={linkStyle} target="_blank" rel="noopener noreferrer">
                GitHub →
              </a>
            )}
            <a href="/" className={linkStyle}>← All Work</a>
          </div>
        </div>

        <div className={sideCol}>
          {project.role && (
            <>
              <div className={sideLabel}>Role</div>
              <div className={sideValue}>{project.role}</div>
            </>
          )}
          <div className={sideLabel}>Year</div>
          <div className={sideValue}>{project.year}</div>
          <div className={sideLabel}>Type</div>
          <div className={sideValue}>{project.type}</div>
          {project.stack && project.stack.length > 0 && (
            <>
              <div className={css({ ...Object.fromEntries(Object.entries({ fontFamily: 'body', fontSize: '13px', color: 'textMuted', letterSpacing: 'wide', textTransform: 'uppercase', marginBottom: '8px' }).map(([k,v]) => [k,v])) })}>
                <div className={sideLabel}>Stack</div>
              </div>
              <div>
                {project.stack.map((tech, i) => (
                  <span key={i} className={stackTag}>{tech}</span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <footer className={footerStyle}>
        <span className={footerTextStyle}>© 2026 Doug March</span>
        <a href="/archive" className={css({ fontFamily: 'body', fontSize: '12px', color: 'textMuted', letterSpacing: 'wide', textDecoration: 'none', _hover: { color: 'accent', textDecoration: 'underline', opacity: 1 }, _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' } })}>Archive</a>
      </footer>
    </>
  )
}