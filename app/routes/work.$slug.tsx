import { createFileRoute } from '@tanstack/react-router'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkDetailPage })

const OBSIDIAN   = '#0C1A23'
const CARD_DARK  = '#172B34'
const STONE_900  = '#070D13'
const AMBER      = '#C48930'
const TEXT_P     = '#EEF3F5'
const TEXT_S     = '#B3CAD4'
const TEXT_M     = '#577E8E'

const BC  = '"Barlow Condensed", sans-serif'
const IPS = '"IBM Plex Sans", sans-serif'

const PAGE_STYLES = `
  .wk-back:hover span { color: #C48930 !important; }
  .wk-link:hover { color: #C48930 !important; }
  .wk-scroll { scrollbar-width: none; }
  .wk-scroll::-webkit-scrollbar { display: none; }
`

function WorkDetailPage() {
  const { slug } = Route.useParams()
  const project = projects.find(p => p.slug === slug)

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PAGE_STYLES }} />
      <div className="wk-scroll" style={{
        minHeight: '100vh',
        background: OBSIDIAN,
        fontFamily: IPS,
        overflowY: 'auto',
      }}>

        {/* Header bar */}
        <div style={{
          borderBottom: `1px solid ${CARD_DARK}`,
          padding: '0 48px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          background: OBSIDIAN,
          zIndex: 10,
        }}>
          <a href="/" className="wk-back" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{
              fontFamily: BC,
              fontSize: '0.75rem',
              fontWeight: 400,
              letterSpacing: '0.06em',
              color: TEXT_M,
              textTransform: 'uppercase',
              transition: 'color 150ms ease',
            }}>
              ← DOUG MARCH
            </span>
          </a>
          <nav style={{ display: 'flex', gap: '32px' }}>
            {[
              { label: 'WORK',  href: '/'      },
              { label: 'ABOUT', href: '/about' },
            ].map(({ label, href }) => (
              <a key={label} href={href} style={{ textDecoration: 'none' }}>
                <span style={{
                  fontFamily: BC,
                  fontSize: '0.75rem',
                  fontWeight: 400,
                  letterSpacing: '0.06em',
                  color: TEXT_M,
                  textTransform: 'uppercase',
                }}>
                  {label}
                </span>
              </a>
            ))}
          </nav>
        </div>

        {/* Content */}
        {!project ? (
          <NotFound slug={slug} />
        ) : (
          <ProjectDetail project={project} />
        )}
      </div>
    </>
  )
}

function ProjectDetail({ project }: { project: NonNullable<ReturnType<typeof projects.find>> }) {
  return (
    <div style={{
      maxWidth: '760px',
      margin: '0 auto',
      padding: '72px 48px 96px',
    }}>

      {/* Meta labels */}
      <div style={{
        display: 'flex',
        gap: '24px',
        marginBottom: '24px',
      }}>
        <MetaLabel value={project.type} />
        <MetaLabel value={String(project.year)} mono />
        {project.role && <MetaLabel value={project.role} />}
      </div>

      {/* Title */}
      <h1 style={{
        fontFamily: BC,
        fontSize: '4.1875rem',
        fontWeight: 700,
        lineHeight: '0.92',
        letterSpacing: '-0.02em',
        color: TEXT_P,
        textTransform: 'uppercase',
        marginBottom: '40px',
      }}>
        {project.title}
      </h1>

      {/* Amber rule */}
      <div style={{ height: '1px', background: AMBER, marginBottom: '48px', opacity: 0.4 }} />

      {/* Content sections */}
      {project.problem && (
        <ContentSection label="PROBLEM" body={project.problem} />
      )}

      {project.description && !project.problem && (
        <ContentSection label="OVERVIEW" body={project.description} />
      )}

      {project.approach && (
        <ContentSection label="APPROACH" body={project.approach} />
      )}

      {project.outcome && (
        <ContentSection label="OUTCOME" body={project.outcome} />
      )}

      {/* Stack */}
      {project.stack && project.stack.length > 0 && (
        <div style={{ marginBottom: '40px' }}>
          <SectionLabel label="STACK" />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {project.stack.map((tech) => (
              <div key={tech} style={{
                fontFamily: IPS,
                fontSize: '0.5625rem',
                fontWeight: 400,
                letterSpacing: '0.06em',
                color: TEXT_S,
                textTransform: 'uppercase',
                padding: '4px 10px',
                border: `1px solid ${CARD_DARK}`,
              }}>
                {tech}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Links */}
      <div style={{
        display: 'flex',
        gap: '24px',
        paddingTop: '32px',
        borderTop: `1px solid ${CARD_DARK}`,
      }}>
        {project.liveUrl && (
          <ProjectLink href={project.liveUrl} label="LIVE SITE" external />
        )}
        {project.externalUrl && !project.liveUrl && (
          <ProjectLink href={project.externalUrl} label="VIEW PROJECT" external />
        )}
        {project.githubUrl && (
          <ProjectLink href={project.githubUrl} label="GITHUB" external />
        )}
        <ProjectLink href="/" label="← ALL WORK" />
      </div>
    </div>
  )
}

function ContentSection({ label, body }: { label: string; body: string }) {
  return (
    <div style={{ marginBottom: '40px' }}>
      <SectionLabel label={label} />
      <p style={{
        fontFamily: IPS,
        fontSize: '1rem',
        fontWeight: 300,
        lineHeight: '1.65',
        color: TEXT_S,
        letterSpacing: '0.01em',
        maxWidth: '640px',
      }}>
        {body}
      </p>
    </div>
  )
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div style={{
      fontFamily: IPS,
      fontSize: '0.5625rem',
      fontWeight: 500,
      letterSpacing: '0.10em',
      color: TEXT_M,
      textTransform: 'uppercase',
      marginBottom: '12px',
    }}>
      {label}
    </div>
  )
}

function MetaLabel({ value, mono = false }: { value: string; mono?: boolean }) {
  return (
    <span style={{
      fontFamily: mono ? IPS : IPS,
      fontSize: '0.5625rem',
      fontWeight: mono ? 400 : 500,
      letterSpacing: '0.08em',
      color: TEXT_M,
      textTransform: 'uppercase',
      fontVariantNumeric: mono ? 'tabular-nums' : undefined,
    }}>
      {value}
    </span>
  )
}

function ProjectLink({
  href, label, external = false
}: {
  href: string; label: string; external?: boolean
}) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="wk-link"
      style={{
        fontFamily: BC,
        fontSize: '0.75rem',
        fontWeight: 600,
        letterSpacing: '0.06em',
        color: TEXT_S,
        textTransform: 'uppercase',
        textDecoration: 'none',
        transition: 'color 150ms ease',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
      }}
    >
      {label}
      {external && (
        <span style={{ fontSize: '0.5rem', opacity: 0.6 }}>↗</span>
      )}
    </a>
  )
}

function NotFound({ slug }: { slug: string }) {
  return (
    <div style={{
      maxWidth: '520px',
      margin: '0 auto',
      padding: '96px 48px',
    }}>
      <div style={{
        fontFamily: IPS,
        fontSize: '0.5625rem',
        fontWeight: 500,
        letterSpacing: '0.10em',
        color: TEXT_M,
        textTransform: 'uppercase',
        marginBottom: '20px',
      }}>
        404
      </div>
      <h1 style={{
        fontFamily: BC,
        fontSize: '3.125rem',
        fontWeight: 700,
        lineHeight: '0.92',
        letterSpacing: '-0.02em',
        color: TEXT_P,
        textTransform: 'uppercase',
        marginBottom: '24px',
      }}>
        PROJECT<br />NOT FOUND
      </h1>
      <p style={{
        fontFamily: IPS,
        fontSize: '1rem',
        fontWeight: 300,
        color: TEXT_S,
        lineHeight: '1.65',
        marginBottom: '32px',
      }}>
        No project found for <code style={{ fontFamily: IPS, color: AMBER }}>{slug}</code>
      </p>
      <a href="/" style={{
        fontFamily: BC,
        fontSize: '0.75rem',
        fontWeight: 600,
        letterSpacing: '0.06em',
        color: TEXT_S,
        textTransform: 'uppercase',
        textDecoration: 'none',
      }}>
        ← BACK TO WORK
      </a>
    </div>
  )
}