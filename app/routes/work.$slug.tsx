import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Sidebar } from '../components/Sidebar'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: ProjectPage })

const heroBand = css({
  width: '100%',
  minHeight: '50dvh',
  background: '{colors.ink.900}',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '0 6vw',
  paddingTop: '56px',
  position: 'relative',
})

const eyebrow = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '12px',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '{colors.seafoam.400}',
  marginBottom: '16px',
})

const title = css({
  fontFamily: 'display',
  fontWeight: 'extrabold',
  fontSize: 'clamp(36px, 5vw, 72px)',
  lineHeight: '0.95',
  letterSpacing: '-0.03em',
  color: '{colors.stone.50}',
  marginBottom: '24px',
})

const problem = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '20px',
  color: '{colors.stone.300}',
  lineHeight: '1.6',
  maxWidth: '60ch',
})

const detailBand = css({
  width: '100%',
  background: '{colors.stone.50}',
  padding: '96px 6vw',
})

const detailGrid = css({
  display: 'grid',
  gridTemplateColumns: '200px 1fr',
  gap: '24px 48px',
  marginBottom: '48px',
  '@media (max-width: 640px)': {
    gridTemplateColumns: '1fr',
    gap: '8px',
    marginBottom: '32px',
  },
})

const detailLabel = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '12px',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '{colors.stone.500}',
  paddingTop: '4px',
})

const detailValue = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '16px',
  color: '{colors.stone.900}',
  lineHeight: '1.6',
  maxWidth: '65ch',
  paddingBottom: '24px',
  borderBottom: '1px solid {colors.stone.200}',
})

const stackList = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  paddingBottom: '24px',
  borderBottom: '1px solid {colors.stone.200}',
})

const stackTag = css({
  fontFamily: 'mono',
  fontWeight: 'normal',
  fontSize: '13px',
  color: '{colors.stone.700}',
  background: '{colors.stone.100}',
  borderRadius: 'sm',
  padding: '4px 10px',
  lineHeight: '1.4',
})

const linkBtn = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '14px',
  color: '{colors.stone.50}',
  background: '{colors.seafoam.600}',
  borderRadius: 'sm',
  padding: '12px 24px',
  textDecoration: 'none',
  transition: 'background 0.15s ease',
  _hover: { background: '{colors.seafoam.500}' },
  _focus: { outline: '2px solid {colors.seafoam.400}', outlineOffset: '2px' },
})

const backLink = css({
  display: 'inline-flex',
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '14px',
  color: '{colors.stone.500}',
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
  marginTop: '48px',
  _hover: { color: '{colors.stone.900}' },
  _focus: { outline: '2px solid {colors.seafoam.400}', outlineOffset: '2px', borderRadius: 'sm' },
})

const footer = css({
  width: '100%',
  background: '{colors.ink.900}',
  padding: '32px 6vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: '16px',
})

const footerText = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '13px',
  color: '{colors.stone.500}',
})

const footerLink = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '13px',
  color: '{colors.stone.500}',
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
  _hover: { color: '{colors.stone.300}' },
  _focus: { outline: '2px solid {colors.seafoam.400}', outlineOffset: '2px', borderRadius: 'sm' },
})

function ProjectPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <>
        <section className={heroBand}>
          <Sidebar />
          <h1 className={title}>Project not found</h1>
          <a href="/" className={css({ color: '{colors.seafoam.400}', fontFamily: 'body', fontSize: '16px', textDecoration: 'underline', _focus: { outline: '2px solid {colors.seafoam.400}', outlineOffset: '2px' } })}>Back to home</a>
        </section>
      </>
    )
  }

  return (
    <>
      {/* Hero */}
      <section className={heroBand}>
        <Sidebar />
        <span className={eyebrow}>{project.type} · {project.year}</span>
        <h1 className={title}>{project.title}</h1>
        {project.problem && <p className={problem}>{project.problem}</p>}
      </section>

      {/* Details */}
      <section className={detailBand}>
        {project.role && (
          <div className={detailGrid}>
            <span className={detailLabel}>Role</span>
            <span className={detailValue}>{project.role}</span>
          </div>
        )}

        {project.approach && (
          <div className={detailGrid}>
            <span className={detailLabel}>Approach</span>
            <span className={detailValue}>{project.approach}</span>
          </div>
        )}

        {project.outcome && (
          <div className={detailGrid}>
            <span className={detailLabel}>Outcome</span>
            <span className={detailValue}>{project.outcome}</span>
          </div>
        )}

        {project.stack && project.stack.length > 0 && (
          <div className={detailGrid}>
            <span className={detailLabel}>Stack</span>
            <div className={stackList}>
              {project.stack.map((s) => (
                <span key={s} className={stackTag}>{s}</span>
              ))}
            </div>
          </div>
        )}

        {project.description && (
          <div className={detailGrid}>
            <span className={detailLabel}>Description</span>
            <span className={detailValue}>{project.description}</span>
          </div>
        )}

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          {project.externalUrl && (
            <a href={project.externalUrl} className={linkBtn}>
              Visit Project ↗
            </a>
          )}
          {project.liveUrl && !project.externalUrl && (
            <a href={project.liveUrl} className={linkBtn}>
              Live Site ↗
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} className={linkBtn}>
              GitHub ↗
            </a>
          )}
        </div>

        <a href="/" className={backLink}>← Back to all work</a>
      </section>

      {/* Footer */}
      <footer className={footer}>
        <span className={footerText}>© 2026 Doug March</span>
        <a href="/archive" className={footerLink}>Archive</a>
      </footer>
    </>
  )
}