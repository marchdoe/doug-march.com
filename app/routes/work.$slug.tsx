import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: ProjectPage })

const pageStyle = css({
  padding: '96px 6vw 64px',
  minHeight: '100vh',
  maxWidth: '960px',
})

const backLinkStyle = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '{colors.parchment.600}',
  textDecoration: 'none',
  display: 'inline-block',
  marginBottom: '48px',
  padding: '12px 0',
  _hover: {
    color: '{colors.indigo.900}',
    textDecoration: 'underline',
  },
  '&:focus-visible': {
    outline: '2px solid {colors.gold.400}',
    outlineOffset: '4px',
  },
})

const titleStyle = css({
  fontFamily: 'heading',
  fontSize: 'clamp(2.5rem, 8vw, 6rem)',
  fontWeight: '800',
  letterSpacing: '-0.01em',
  lineHeight: '0.88',
  color: '{colors.indigo.900}',
  textTransform: 'uppercase',
  marginBottom: '16px',
})

const metaRowStyle = css({
  display: 'flex',
  gap: '24px',
  marginBottom: '48px',
  flexWrap: 'wrap',
})

const metaItemStyle = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '{colors.parchment.600}',
})

const sectionLabelStyle = css({
  fontFamily: 'heading',
  fontSize: '0.75rem',
  fontWeight: '600',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: '{colors.gold.400}',
  marginBottom: '12px',
})

const sectionTextStyle = css({
  fontFamily: 'body',
  fontSize: 'clamp(0.875rem, 1vw, 1rem)',
  lineHeight: '1.6',
  color: '{colors.indigo.700}',
  maxWidth: '65ch',
  marginBottom: '48px',
})

const stackListStyle = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  listStyle: 'none',
  padding: '0',
  margin: '0 0 48px 0',
})

const stackItemStyle = css({
  fontFamily: 'body',
  fontSize: '0.8rem',
  color: '{colors.indigo.700}',
  padding: '4px 12px',
  border: '1px solid {colors.parchment.300}',
})

const externalLinkStyle = css({
  fontFamily: 'body',
  fontSize: '0.875rem',
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  color: '{colors.gold.600}',
  textDecoration: 'none',
  padding: '12px 0',
  display: 'inline-block',
  borderBottom: '1px solid {colors.gold.400}',
  _hover: {
    color: '{colors.indigo.900}',
    borderBottomColor: '{colors.indigo.900}',
  },
  '&:focus-visible': {
    outline: '2px solid {colors.gold.400}',
    outlineOffset: '4px',
  },
})

const footerStyle = css({
  marginTop: '96px',
  paddingTop: '24px',
  borderTop: '1px solid {colors.parchment.300}',
  fontFamily: 'body',
  fontSize: '0.75rem',
  color: '{colors.parchment.500}',
})

const archiveLinkStyle = css({
  color: '{colors.parchment.500}',
  textDecoration: 'none',
  _hover: {
    textDecoration: 'underline',
    color: '{colors.parchment.700}',
  },
  '&:focus-visible': {
    outline: '2px solid {colors.gold.400}',
    outlineOffset: '2px',
  },
})

const notFoundStyle = css({
  fontFamily: 'heading',
  fontSize: 'clamp(2rem, 6vw, 4rem)',
  fontWeight: '800',
  color: '{colors.indigo.900}',
  textTransform: 'uppercase',
  letterSpacing: '-0.01em',
  lineHeight: '0.88',
})

function ProjectPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <main className={pageStyle}>
        <a href="/" className={backLinkStyle}>← Back</a>
        <h1 className={notFoundStyle}>Project not found</h1>
      </main>
    )
  }

  return (
    <main className={pageStyle}>
      <a href="/" className={backLinkStyle}>← Back</a>

      <h1 className={titleStyle}>{project.title}</h1>

      <div className={metaRowStyle}>
        <span className={metaItemStyle}>{project.type}</span>
        <span className={metaItemStyle}>{project.year}</span>
        {project.role && <span className={metaItemStyle}>{project.role}</span>}
      </div>

      {project.problem && (
        <div>
          <h2 className={sectionLabelStyle}>Problem</h2>
          <p className={sectionTextStyle}>{project.problem}</p>
        </div>
      )}

      {project.approach && (
        <div>
          <h2 className={sectionLabelStyle}>Approach</h2>
          <p className={sectionTextStyle}>{project.approach}</p>
        </div>
      )}

      {project.outcome && (
        <div>
          <h2 className={sectionLabelStyle}>Outcome</h2>
          <p className={sectionTextStyle}>{project.outcome}</p>
        </div>
      )}

      {project.description && (
        <div>
          <h2 className={sectionLabelStyle}>Description</h2>
          <p className={sectionTextStyle}>{project.description}</p>
        </div>
      )}

      {project.stack && project.stack.length > 0 && (
        <div>
          <h2 className={sectionLabelStyle}>Stack</h2>
          <ul className={stackListStyle}>
            {project.stack.map((tech, i) => (
              <li key={i} className={stackItemStyle}>{tech}</li>
            ))}
          </ul>
        </div>
      )}

      {(project.externalUrl || project.liveUrl) && (
        <a
          href={project.externalUrl || project.liveUrl}
          className={externalLinkStyle}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit Project →
        </a>
      )}

      {project.githubUrl && (
        <a
          href={project.githubUrl}
          className={externalLinkStyle}
          style={{ marginLeft: '24px' }}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub →
        </a>
      )}

      <footer className={footerStyle}>
        <a href="/archive" className={archiveLinkStyle}>Archive</a>
      </footer>
    </main>
  )
}