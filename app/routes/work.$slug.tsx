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
      <div className={css({ padding: '96px 48px', textAlign: 'center' })}>
        <h1
          className={css({
            fontFamily: 'display',
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: '{colors.stone.50}',
          })}
        >
          Not Found
        </h1>
        <a
          href="/"
          className={css({
            fontFamily: 'body',
            fontSize: '1rem',
            color: '{colors.lime.400}',
            marginTop: '24px',
            display: 'inline-block',
            minHeight: '44px',
            lineHeight: '44px',
            _focusVisible: { outline: '2px solid', outlineColor: '{colors.lime.400}', outlineOffset: '2px' },
          })}
        >
          Back to home
        </a>
      </div>
    )
  }

  return (
    <div
      className={css({
        display: 'grid',
        gridTemplateColumns: '1fr',
        minHeight: '100vh',
        '@media (min-width: 768px)': {
          gridTemplateColumns: '45fr 55fr',
        },
      })}
    >
      {/* LEFT — Project Identity */}
      <div
        className={css({
          background: '{colors.stone.900}',
          minHeight: '50vh',
          display: 'flex',
          flexDirection: 'column',
          padding: '24px 24px 32px',
          '@media (min-width: 768px)': {
            padding: '48px 48px 48px 6vw',
            position: 'sticky',
            top: '0',
            height: '100vh',
          },
        })}
      >
        <Sidebar />

        <div
          className={css({
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '24px',
          })}
        >
          <div>
            <span
              className={css({
                fontFamily: 'mono',
                fontSize: '0.6875rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '{colors.stone.400}',
                display: 'block',
                marginBottom: '8px',
              })}
            >
              {project.type} · {project.year}
            </span>
            <h1
              className={css({
                fontFamily: 'display',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                lineHeight: '0.88',
                letterSpacing: '-0.02em',
                color: '{colors.stone.50}',
                fontSize: 'clamp(48px, 6vw, 96px)',
              })}
            >
              {project.title}
            </h1>
          </div>

          {project.role && (
            <p className={css({ fontFamily: 'body', fontSize: '1rem', color: '{colors.lime.400}', letterSpacing: '0.05em' })}>
              {project.role}
            </p>
          )}

          {project.stack && project.stack.length > 0 && (
            <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '6px' })}>
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className={css({
                    fontFamily: 'mono',
                    fontSize: '0.75rem',
                    color: '{colors.stone.200}',
                    border: '1px solid',
                    borderColor: '{colors.stone.700}',
                    padding: '4px 10px',
                    letterSpacing: '0.05em',
                  })}
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          <div className={css({ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '8px' })}>
            {project.externalUrl && (
              <a
                href={project.externalUrl}
                className={css({
                  fontFamily: 'mono',
                  fontSize: '0.875rem',
                  color: '{colors.stone.900}',
                  background: '{colors.lime.400}',
                  padding: '10px 20px',
                  borderRadius: '0',
                  textDecoration: 'none',
                  minHeight: '44px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  letterSpacing: '0.05em',
                  _hover: { background: '{colors.lime.300}', textDecoration: 'none' },
                  _focusVisible: { outline: '3px solid', outlineColor: '{colors.lime.400}', outlineOffset: '2px' },
                })}
              >
                Visit Site ↗
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                className={css({
                  fontFamily: 'mono',
                  fontSize: '0.875rem',
                  color: '{colors.stone.300}',
                  border: '1px solid',
                  borderColor: '{colors.stone.700}',
                  padding: '10px 20px',
                  borderRadius: '0',
                  textDecoration: 'none',
                  minHeight: '44px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  letterSpacing: '0.05em',
                  _hover: { borderColor: '{colors.lime.400}', color: '{colors.lime.400}', textDecoration: 'none' },
                  _focusVisible: { outline: '3px solid', outlineColor: '{colors.lime.400}', outlineOffset: '2px' },
                })}
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT — Project Details on lime */}
      <div
        className={css({
          background: '{colors.lime.400}',
          minHeight: '100vh',
          padding: '24px 24px 48px',
          '@media (min-width: 768px)': {
            padding: '48px 6vw 48px 48px',
          },
        })}
      >
        <div
          className={css({
            paddingTop: '48px',
            '@media (min-width: 768px)': {
              paddingTop: '112px',
            },
            display: 'flex',
            flexDirection: 'column',
            gap: '48px',
          })}
        >
          {project.problem && (
            <div>
              <span
                className={css({
                  fontFamily: 'mono',
                  fontSize: '0.6875rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '{colors.stone.600}',
                  display: 'block',
                  marginBottom: '12px',
                })}
              >
                Problem
              </span>
              <p
                className={css({
                  fontFamily: 'body',
                  fontSize: 'clamp(1.125rem, 1.5vw, 1.375rem)',
                  lineHeight: '1.6',
                  color: '{colors.stone.900}',
                  maxWidth: '55ch',
                })}
              >
                {project.problem}
              </p>
            </div>
          )}

          {project.approach && (
            <div>
              <span
                className={css({
                  fontFamily: 'mono',
                  fontSize: '0.6875rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '{colors.stone.600}',
                  display: 'block',
                  marginBottom: '12px',
                })}
              >
                Approach
              </span>
              <p
                className={css({
                  fontFamily: 'body',
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  color: '{colors.stone.800}',
                  maxWidth: '55ch',
                })}
              >
                {project.approach}
              </p>
            </div>
          )}

          {project.outcome && (
            <div>
              <span
                className={css({
                  fontFamily: 'mono',
                  fontSize: '0.6875rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '{colors.stone.600}',
                  display: 'block',
                  marginBottom: '12px',
                })}
              >
                Outcome
              </span>
              <p
                className={css({
                  fontFamily: 'body',
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  color: '{colors.stone.800}',
                  maxWidth: '55ch',
                })}
              >
                {project.outcome}
              </p>
            </div>
          )}

          {project.description && !project.problem && (
            <div>
              <p
                className={css({
                  fontFamily: 'body',
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  color: '{colors.stone.800}',
                  maxWidth: '55ch',
                })}
              >
                {project.description}
              </p>
            </div>
          )}

          <div
            className={css({
              borderTop: '1px solid rgba(13,18,9,0.2)',
              paddingTop: '24px',
            })}
          >
            <a
              href="/"
              className={css({
                fontFamily: 'mono',
                fontSize: '0.875rem',
                color: '{colors.stone.700}',
                textDecoration: 'none',
                minHeight: '44px',
                display: 'inline-flex',
                alignItems: 'center',
                _hover: { color: '{colors.stone.900}', textDecoration: 'underline' },
                _focusVisible: { outline: '2px solid', outlineColor: '{colors.stone.900}', outlineOffset: '2px' },
              })}
            >
              ← All Projects
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}