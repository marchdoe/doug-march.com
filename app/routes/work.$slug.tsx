import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkDetail })

const pageWrap = css({
  padding: '0 4vw',
  minHeight: 'calc(100vh - 56px)',
})

const masthead = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  paddingBottom: '32px',
  paddingTop: '48px',
  borderBottom: '1px solid',
  borderColor: 'borderAccent',
})

const heroTitle = css({
  fontFamily: 'display',
  fontSize: 'clamp(42px, 8vw, 120px)',
  lineHeight: 'tight',
  letterSpacing: '0.01em',
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
  fontSize: '12px',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: 'textMuted',
})

const metaValue = css({
  color: 'accent',
})

const bodyGrid = css({
  display: 'grid',
  gridTemplateColumns: '1.5fr 1fr',
  '@media (max-width: 767px)': {
    gridTemplateColumns: '1fr',
  },
})

const mainCol = css({
  padding: '24px 24px 48px 0',
  borderRight: '1px solid',
  borderColor: 'border',
  '@media (max-width: 767px)': {
    borderRight: 'none',
    padding: '24px 0 32px',
    borderBottom: '1px solid',
    borderColor: 'border',
  },
})

const sideCol = css({
  padding: '24px 0 48px 24px',
  '@media (max-width: 767px)': {
    padding: '24px 0 32px',
  },
})

const sectionLabel = css({
  fontFamily: 'display',
  fontSize: 'clamp(13px, 1.2vw, 18px)',
  letterSpacing: '0.14em',
  color: 'accent',
  textTransform: 'uppercase',
  lineHeight: '1',
  paddingBottom: '16px',
  borderBottom: '1px solid',
  borderColor: 'borderAccent',
  marginBottom: '0',
})

const firstSection = css({
  fontFamily: 'display',
  fontSize: 'clamp(13px, 1.2vw, 18px)',
  letterSpacing: '0.14em',
  color: 'accent',
  textTransform: 'uppercase',
  lineHeight: '1',
  paddingBottom: '16px',
  borderBottom: '1px solid',
  borderColor: 'borderAccent',
  marginBottom: '0',
  marginTop: '0',
})

const sectionAfter = css({
  fontFamily: 'display',
  fontSize: 'clamp(13px, 1.2vw, 18px)',
  letterSpacing: '0.14em',
  color: 'accent',
  textTransform: 'uppercase',
  lineHeight: '1',
  paddingBottom: '16px',
  borderBottom: '1px solid',
  borderColor: 'borderAccent',
  marginBottom: '0',
  marginTop: '32px',
})

const bodyText = css({
  fontFamily: 'body',
  fontSize: '16px',
  color: 'textSecondary',
  lineHeight: 'normal',
  padding: '16px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
  maxWidth: '65ch',
})

const stackItem = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textSecondary',
  padding: '8px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
})

const linkStyle = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '14px',
  color: 'accent',
  textDecoration: 'none',
  padding: '12px 0',
  display: 'inline-block',
  borderBottom: '1px solid',
  borderColor: 'border',
  width: '100%',
  _hover: { color: 'accentLight' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
})

const backLink = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textMuted',
  textDecoration: 'none',
  padding: '24px 0',
  display: 'inline-block',
  _hover: { color: 'text' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
})

const footerStyle = css({
  padding: '24px 0',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderTop: '1px solid',
  borderColor: 'border',
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '11px',
  color: 'textMuted',
})

function WorkDetail() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className={pageWrap}>
        <div className={masthead}>
          <h1 className={heroTitle}>NOT FOUND</h1>
        </div>
        <a href="/" className={backLink}>← Back to index</a>
      </div>
    )
  }

  return (
    <div className={pageWrap}>
      <div className={masthead}>
        <h1 className={heroTitle}>{project.title.toUpperCase()}</h1>
        <div className={metaRow}>
          <span className={metaItem}><span className={metaValue}>{project.type}</span></span>
          <span className={metaItem}><span className={metaValue}>{project.year}</span></span>
          {project.role && <span className={metaItem}>Role: <span className={metaValue}>{project.role}</span></span>}
        </div>
      </div>

      <div className={bodyGrid}>
        <div className={mainCol}>
          {project.problem && (
            <>
              <div className={firstSection}>PROBLEM</div>
              <p className={bodyText}>{project.problem}</p>
            </>
          )}
          {project.description && !project.problem && (
            <>
              <div className={firstSection}>ABOUT</div>
              <p className={bodyText}>{project.description}</p>
            </>
          )}
          {project.approach && (
            <>
              <div className={sectionAfter}>APPROACH</div>
              <p className={bodyText}>{project.approach}</p>
            </>
          )}
          {project.outcome && (
            <>
              <div className={sectionAfter}>OUTCOME</div>
              <p className={bodyText}>{project.outcome}</p>
            </>
          )}
        </div>

        <div className={sideCol}>
          {project.stack && project.stack.length > 0 && (
            <>
              <div className={firstSection}>STACK</div>
              {project.stack.map((s, i) => (
                <div className={stackItem} key={i}>{s}</div>
              ))}
            </>
          )}

          {(project.liveUrl || project.externalUrl || project.githubUrl) && (
            <>
              <div className={sectionAfter}>LINKS</div>
              {(project.liveUrl || project.externalUrl) && (
                <a href={project.liveUrl || project.externalUrl} className={linkStyle}>
                  Visit Site ↗
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} className={linkStyle}>
                  GitHub ↗
                </a>
              )}
            </>
          )}

          <a href="/" className={backLink}>← Back to index</a>
        </div>
      </div>

      <div className={footerStyle}>
        <span className={footerText}>Doug March · Product Designer & Developer</span>
        <a href="/archive" className={css({ fontFamily: 'body', fontSize: '11px', color: 'textMuted', textDecoration: 'none', _hover: { color: 'textSecondary' }, _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' } })}>Archive</a>
      </div>
    </div>
  )
}