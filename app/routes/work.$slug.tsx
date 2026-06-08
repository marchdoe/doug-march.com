import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkDetail })

const pageStyle = css({
  width: '100%',
})

const heroStyle = css({
  padding: { base: '32px 6vw 28px', md: '48px 6vw 40px' },
  borderBottom: '1px solid token(colors.neutral.800)',
})

const titleStyle = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(32px, 5vw, 64px)',
  lineHeight: '0.95',
  color: 'text',
  marginBottom: '12px',
})

const metaRowStyle = css({
  display: 'flex',
  gap: '24px',
  alignItems: 'baseline',
  flexWrap: 'wrap',
})

const metaItemStyle = css({
  fontFamily: 'mono',
  fontSize: '12px',
  color: 'textMuted',
  letterSpacing: '0.05em',
  fontVariantNumeric: 'tabular-nums',
})

const metaAccentStyle = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '13px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'accent',
})

const columnsStyle = css({
  display: { base: 'flex', lg: 'grid' },
  flexDirection: { base: 'column', lg: 'unset' },
  gridTemplateColumns: { lg: '60fr 40fr' },
  borderTop: '1px solid token(colors.neutral.800)',
})

const colMainStyle = css({
  padding: { base: '24px 6vw', lg: '32px 3vw 40px 6vw' },
  borderRight: { base: 'none', lg: '1px solid token(colors.neutral.800)' },
  borderBottom: { base: '1px solid token(colors.neutral.800)', lg: 'none' },
})

const colSideStyle = css({
  padding: { base: '24px 6vw', lg: '32px 4vw 40px 3vw' },
})

const eyebrowStyle = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '11px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '12px',
})

const bodyTextStyle = css({
  fontFamily: 'display',
  fontSize: '16px',
  lineHeight: '1.65',
  color: 'textSecondary',
  maxWidth: '65ch',
  marginBottom: '24px',
})

const stackListStyle = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginBottom: '20px',
})

const stackItemStyle = css({
  fontFamily: 'mono',
  fontSize: '12px',
  color: 'textSecondary',
  letterSpacing: '0.03em',
  padding: '4px 10px',
  border: '1px solid token(colors.neutral.700)',
})

const linkStyle = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '14px',
  color: 'accent',
  textDecoration: 'none',
  display: 'inline-block',
  padding: '8px 0',
  transition: 'color 0.15s ease',
  _hover: { color: 'text' },
  _focus: {
    outline: '2px solid token(colors.chartreuse.400)',
    outlineOffset: '2px',
  },
})

const backLinkStyle = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '13px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'textMuted',
  textDecoration: 'none',
  padding: '12px 0',
  _hover: { color: 'accent' },
  _focus: {
    outline: '2px solid token(colors.chartreuse.400)',
    outlineOffset: '2px',
  },
})

const footerBandStyle = css({
  width: '100%',
  padding: '20px 6vw',
  borderTop: '1px solid token(colors.neutral.800)',
  display: 'flex',
  gap: '48px',
  alignItems: 'center',
  flexWrap: 'wrap',
})

const footerTextStyle = css({
  fontFamily: 'mono',
  fontSize: '11px',
  color: 'textMuted',
  letterSpacing: '0.05em',
})

function WorkDetail() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className={css({ padding: '48px 6vw' })}>
        <h1 className={titleStyle}>Project not found</h1>
        <a href="/" className={backLinkStyle}>← Back to work</a>
      </div>
    )
  }

  return (
    <div className={pageStyle}>
      {/* Hero */}
      <div className={heroStyle}>
        <a href="/" className={backLinkStyle}>← Back</a>
        <h1 className={titleStyle}>{project.title}</h1>
        <div className={metaRowStyle}>
          <span className={metaAccentStyle}>{project.type}</span>
          <span className={metaItemStyle}>{project.year}</span>
          {project.role && <span className={metaItemStyle}>{project.role}</span>}
        </div>
      </div>

      {/* Content columns */}
      <div className={columnsStyle}>
        <div className={colMainStyle}>
          {project.problem && (
            <>
              <p className={eyebrowStyle}>Problem</p>
              <p className={bodyTextStyle}>{project.problem}</p>
            </>
          )}
          {project.approach && (
            <>
              <p className={eyebrowStyle}>Approach</p>
              <p className={bodyTextStyle}>{project.approach}</p>
            </>
          )}
          {project.outcome && (
            <>
              <p className={eyebrowStyle}>Outcome</p>
              <p className={bodyTextStyle}>{project.outcome}</p>
            </>
          )}
          {project.description && (
            <>
              <p className={eyebrowStyle}>Description</p>
              <p className={bodyTextStyle}>{project.description}</p>
            </>
          )}
        </div>

        <div className={colSideStyle}>
          {project.stack && project.stack.length > 0 && (
            <>
              <p className={eyebrowStyle}>Stack</p>
              <div className={stackListStyle}>
                {project.stack.map((tech, i) => (
                  <span key={i} className={stackItemStyle}>{tech}</span>
                ))}
              </div>
            </>
          )}

          {project.externalUrl && (
            <a
              href={project.externalUrl}
              className={linkStyle}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Live Site →
            </a>
          )}

          {project.liveUrl && !project.externalUrl && (
            <a
              href={project.liveUrl}
              className={linkStyle}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Live Site →
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              className={linkStyle}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Source →
            </a>
          )}
        </div>
      </div>

      <footer className={footerBandStyle}>
        <span className={footerTextStyle}>© 2026 Doug March</span>
        <a href="/archive" className={css({
          fontFamily: 'mono',
          fontSize: '11px',
          color: 'textMuted',
          textDecoration: 'none',
          _hover: { color: 'accent' },
          _focus: {
            outline: '2px solid token(colors.chartreuse.400)',
            outlineOffset: '2px',
          },
        })}>Archive</a>
      </footer>
    </div>
  )
}