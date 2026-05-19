import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Sidebar } from '../components/Sidebar'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: ProjectPage })

function ProjectPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <section className={css({ padding: '160px 6vw', minHeight: '100vh', position: 'relative' })}>
        <Sidebar />
        <h1 className={css({ fontFamily: 'display', fontSize: '48px', color: '{colors.stone.900}', textTransform: 'uppercase' })}>
          Project Not Found
        </h1>
        <a href="/" className={css({ color: '{colors.teal.500}', fontSize: '16px', fontFamily: 'body', marginTop: '24px', display: 'inline-block' })}>
          ← Back to Home
        </a>
      </section>
    )
  }

  return (
    <>
      {/* Hero */}
      <section
        className={css({
          position: 'relative',
          width: '100%',
          padding: '160px 6vw 80px',
          background: '{colors.stone.50}',
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        })}
      >
        <Sidebar />
        <div className={css({ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap' })}>
          <span className={css({ fontSize: '13px', letterSpacing: '0.08em', color: '{colors.teal.500}', textTransform: 'uppercase', fontFamily: 'body', fontWeight: 'semibold' })}>
            {project.type}
          </span>
          <span className={css({ fontSize: '13px', color: '{colors.stone.400}' })}>·</span>
          <span className={css({ fontSize: '13px', fontVariantNumeric: 'tabular-nums', color: '{colors.stone.500}', fontFamily: 'mono' })}>
            {project.year}
          </span>
        </div>
        <h1
          className={css({
            fontFamily: 'display',
            fontSize: 'clamp(48px, 8vw, 120px)',
            lineHeight: '0.92',
            fontWeight: 'bold',
            color: '{colors.stone.900}',
            textTransform: 'uppercase',
            marginBottom: '32px',
          })}
        >
          {project.title}
        </h1>
        <div className={css({ width: '40px', height: '2px', background: '{colors.teal.400}' })} />
      </section>

      {/* Signal strip */}
      <div
        className={css({
          width: '100%',
          padding: '20px 6vw',
          background: '{colors.teal.800}',
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
          flexWrap: 'wrap',
        })}
      >
        <span className={css({ fontSize: '13px', letterSpacing: '0.08em', color: '{colors.teal.100}' })}>
          May 19, 2026
        </span>
        <span className={css({ fontSize: '13px', letterSpacing: '0.08em', color: '{colors.teal.300}' })}>
          14.3h Daylight
        </span>
      </div>

      {/* Content */}
      <section
        className={css({
          width: '100%',
          padding: '96px 6vw',
          background: '{colors.stone.50}',
        })}
      >
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '64px',
            md: { gridTemplateColumns: '1fr 2fr', gap: '80px' },
          })}
        >
          {/* Sidebar info */}
          <div className={css({ display: 'flex', flexDirection: 'column', gap: '32px' })}>
            {project.role && (
              <div>
                <span className={css({ fontSize: '13px', letterSpacing: '0.08em', color: '{colors.stone.500}', textTransform: 'uppercase', fontFamily: 'body', fontWeight: 'semibold', display: 'block', marginBottom: '8px' })}>
                  Role
                </span>
                <span className={css({ fontSize: '16px', color: '{colors.stone.900}', fontFamily: 'body' })}>
                  {project.role}
                </span>
              </div>
            )}
            {project.stack && project.stack.length > 0 && (
              <div>
                <span className={css({ fontSize: '13px', letterSpacing: '0.08em', color: '{colors.stone.500}', textTransform: 'uppercase', fontFamily: 'body', fontWeight: 'semibold', display: 'block', marginBottom: '12px' })}>
                  Stack
                </span>
                <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '8px' })}>
                  {project.stack.map((tech, i) => (
                    <span
                      key={i}
                      className={css({
                        fontSize: '13px',
                        padding: '6px 12px',
                        border: '1px solid',
                        borderColor: '{colors.stone.200}',
                        color: '{colors.stone.700}',
                        fontFamily: 'mono',
                      })}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {(project.externalUrl || project.liveUrl) && (
              <a
                href={project.externalUrl || project.liveUrl}
                className={css({
                  display: 'inline-block',
                  fontSize: '14px',
                  letterSpacing: '0.06em',
                  fontWeight: 'semibold',
                  textTransform: 'uppercase',
                  color: '{colors.teal.500}',
                  border: '1px solid',
                  borderColor: '{colors.teal.500}',
                  padding: '12px 32px',
                  textDecoration: 'none',
                  textAlign: 'center',
                  transition: 'all 0.2s ease',
                  _hover: { background: '{colors.teal.500}', color: '{colors.stone.50}', textDecoration: 'none' },
                  '&:focus-visible': { outline: '2px solid', outlineColor: '{colors.teal.500}', outlineOffset: '4px' },
                })}
              >
                Visit Project →
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                className={css({
                  fontSize: '14px',
                  color: '{colors.teal.600}',
                  textDecoration: 'underline',
                  fontFamily: 'body',
                  '&:focus-visible': { outline: '2px solid', outlineColor: '{colors.teal.500}', outlineOffset: '4px' },
                })}
              >
                View Source
              </a>
            )}
          </div>

          {/* Main content */}
          <div className={css({ display: 'flex', flexDirection: 'column', gap: '48px' })}>
            {project.problem && (
              <div>
                <span className={css({ fontSize: '13px', letterSpacing: '0.08em', color: '{colors.stone.500}', textTransform: 'uppercase', fontFamily: 'body', fontWeight: 'semibold', display: 'block', marginBottom: '16px' })}>
                  Problem
                </span>
                <p className={css({ fontSize: '18px', lineHeight: '1.6', color: '{colors.stone.700}', fontFamily: 'body', maxWidth: '65ch' })}>
                  {project.problem}
                </p>
              </div>
            )}
            {project.approach && (
              <div>
                <span className={css({ fontSize: '13px', letterSpacing: '0.08em', color: '{colors.stone.500}', textTransform: 'uppercase', fontFamily: 'body', fontWeight: 'semibold', display: 'block', marginBottom: '16px' })}>
                  Approach
                </span>
                <p className={css({ fontSize: '18px', lineHeight: '1.6', color: '{colors.stone.700}', fontFamily: 'body', maxWidth: '65ch' })}>
                  {project.approach}
                </p>
              </div>
            )}
            {project.outcome && (
              <div>
                <span className={css({ fontSize: '13px', letterSpacing: '0.08em', color: '{colors.stone.500}', textTransform: 'uppercase', fontFamily: 'body', fontWeight: 'semibold', display: 'block', marginBottom: '16px' })}>
                  Outcome
                </span>
                <p className={css({ fontSize: '18px', lineHeight: '1.6', color: '{colors.stone.700}', fontFamily: 'body', maxWidth: '65ch' })}>
                  {project.outcome}
                </p>
              </div>
            )}
            {project.description && (
              <div>
                <p className={css({ fontSize: '18px', lineHeight: '1.6', color: '{colors.stone.700}', fontFamily: 'body', maxWidth: '65ch' })}>
                  {project.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <section
        className={css({
          width: '100%',
          padding: '48px 6vw',
          background: '{colors.teal.800}',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        })}
      >
        <a
          href="/"
          className={css({
            fontSize: '14px',
            letterSpacing: '0.06em',
            color: '{colors.teal.300}',
            textDecoration: 'none',
            fontFamily: 'body',
            _hover: { color: '{colors.teal.100}', textDecoration: 'underline' },
            '&:focus-visible': { outline: '2px solid', outlineColor: '{colors.teal.400}', outlineOffset: '4px' },
          })}
        >
          ← All Work
        </a>
        <a
          href="/archive"
          className={css({
            fontSize: '13px',
            letterSpacing: '0.06em',
            color: '{colors.teal.400}',
            fontFamily: 'body',
            textDecoration: 'none',
            _hover: { color: '{colors.teal.200}', textDecoration: 'underline' },
            '&:focus-visible': { outline: '2px solid', outlineColor: '{colors.teal.400}', outlineOffset: '4px' },
          })}
        >
          Archive
        </a>
      </section>
    </>
  )
}