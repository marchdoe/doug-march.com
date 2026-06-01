import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkPage })

const pageMasthead = css({
  background: '{colors.stone.900}',
  padding: '36px 5vw 40px',
})

const pageTitle = css({
  fontFamily: 'display',
  fontSize: 'clamp(36px, 4vw, 64px)',
  letterSpacing: '0.06em',
  lineHeight: '0.95',
  color: '{colors.stone.50}',
})

const metaLine = css({
  fontFamily: 'body',
  fontSize: '13px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '{colors.stone.400}',
  marginTop: '8px',
})

const pageWrap = css({
  padding: '0 5vw',
  flex: 1,
})

const sectionHeader = css({
  fontFamily: 'display',
  fontSize: '13px',
  letterSpacing: '0.15em',
  color: '{colors.stone.500}',
  textTransform: 'uppercase',
  padding: '8px 0',
  borderBottom: '2px solid',
  borderColor: '{colors.stone.900}',
  marginTop: '32px',
})

const contentBlock = css({
  fontFamily: 'body',
  fontSize: '16px',
  lineHeight: '1.5',
  color: '{colors.stone.700}',
  maxWidth: '65ch',
  padding: '16px 0',
  borderBottom: '1px solid',
  borderColor: '{colors.stone.200}',
})

const stackRow = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0',
})

const stackItem = css({
  fontFamily: 'body',
  fontSize: '13px',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  color: '{colors.stone.700}',
  padding: '10px 16px',
  borderBottom: '1px solid',
  borderRight: '1px solid',
  borderColor: '{colors.stone.200}',
})

const linkStyle = css({
  fontFamily: 'body',
  fontSize: '14px',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  color: '{colors.magenta.600}',
  textDecoration: 'none',
  padding: '12px 0',
  display: 'inline-block',
  '&:hover': {
    color: '{colors.magenta.400}',
  },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: '{colors.magenta.400}',
    outlineOffset: '2px',
  },
})

const footerWrap = css({
  padding: '16px 5vw',
  borderTop: '1px solid',
  borderColor: '{colors.stone.200}',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 'auto',
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: '{colors.stone.500}',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
})

const footerLink = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: '{colors.stone.500}',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  textDecoration: 'none !important',
  '&:hover': {
    color: '{colors.magenta.500} !important',
  },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: '{colors.magenta.400}',
    outlineOffset: '2px',
  },
})

const notFound = css({
  fontFamily: 'display',
  fontSize: '24px',
  letterSpacing: '0.06em',
  color: '{colors.stone.500}',
  padding: '48px 5vw',
})

function WorkPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <>
        <div className={notFound}>PROJECT NOT FOUND</div>
        <footer className={footerWrap}>
          <span className={footerText}>© 2026 Doug March</span>
          <a href="/archive" className={footerLink}>Archive</a>
        </footer>
      </>
    )
  }

  return (
    <>
      <div className={pageMasthead}>
        <h1 className={pageTitle}>{project.title.toUpperCase()}</h1>
        <p className={metaLine}>{project.type} · {project.year}{project.role ? ` · ${project.role}` : ''}</p>
      </div>

      <div className={pageWrap}>
        {project.problem && (
          <>
            <div className={sectionHeader}>Problem</div>
            <p className={contentBlock}>{project.problem}</p>
          </>
        )}

        {project.approach && (
          <>
            <div className={sectionHeader}>Approach</div>
            <p className={contentBlock}>{project.approach}</p>
          </>
        )}

        {project.outcome && (
          <>
            <div className={sectionHeader}>Outcome</div>
            <p className={contentBlock}>{project.outcome}</p>
          </>
        )}

        {project.description && !project.problem && (
          <>
            <div className={sectionHeader}>Description</div>
            <p className={contentBlock}>{project.description}</p>
          </>
        )}

        {project.stack && project.stack.length > 0 && (
          <>
            <div className={sectionHeader}>Stack</div>
            <div className={stackRow}>
              {project.stack.map((s, i) => (
                <div key={i} className={stackItem}>{s}</div>
              ))}
            </div>
          </>
        )}

        <div style={{ padding: '24px 0' }}>
          {project.liveUrl && (
            <a href={project.liveUrl} className={linkStyle}>
              View Live →
            </a>
          )}
          {project.githubUrl && (
            <>
              {project.liveUrl && <span style={{ margin: '0 16px', color: '#E3DFEC' }}>|</span>}
              <a href={project.githubUrl} className={linkStyle}>
                GitHub →
              </a>
            </>
          )}
          {project.externalUrl && !project.liveUrl && (
            <a href={project.externalUrl} className={linkStyle}>
              View Project →
            </a>
          )}
        </div>

        <div style={{ padding: '16px 0' }}>
          <a href="/" className={linkStyle}>← Back to Index</a>
        </div>
      </div>

      <footer className={footerWrap}>
        <span className={footerText}>© 2026 Doug March</span>
        <a href="/archive" className={footerLink}>Archive</a>
      </footer>
    </>
  )
}