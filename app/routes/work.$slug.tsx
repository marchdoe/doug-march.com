import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'
import logoSvg from '../assets/logo.svg'

export const Route = createFileRoute('/work/$slug')({ component: ProjectPage })

function ProjectPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: '#080D02',
        })}
      >
        <p
          className={css({
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: '16px',
            color: '#65A038',
          })}
        >
          Project not found.
        </p>
      </div>
    )
  }

  return (
    <div
      className={css({
        display: 'grid',
        gridTemplateColumns: '1fr',
        minHeight: '100vh',
        width: '100%',
        '@media (min-width: 768px)': {
          gridTemplateColumns: '45fr 55fr',
        },
      })}
    >
      {/* LEFT PANEL — Project Identity */}
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '48px 24px',
          background: '#060B02',
          minHeight: '50vh',
          position: 'relative',
          '@media (min-width: 768px)': {
            padding: '80px 52px',
            minHeight: '100vh',
            position: 'sticky',
            top: '0',
          },
        })}
      >
        {/* Nav */}
        <div
          className={css({
            position: 'absolute',
            top: '28px',
            left: '24px',
            right: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            '@media (min-width: 768px)': {
              top: '48px',
              left: '52px',
              right: '52px',
            },
          })}
        >
          <a href="/" aria-label="Home">
            <img src={logoSvg} alt="Doug March logo" width={28} height={28} />
          </a>
          <a
            href="/"
            className={css({
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: '12px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#8EC864',
              textDecoration: 'none',
              padding: '10px 0',
            })}
          >
            Work
          </a>
          <a
            href="/about"
            className={css({
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: '12px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#8EC864',
              textDecoration: 'none',
              padding: '10px 0',
            })}
          >
            About
          </a>
        </div>

        <div
          className={css({
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '16px',
          })}
        >
          <span
            className={css({
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '11px',
              letterSpacing: '0.14em',
              color: '#65A038',
              textTransform: 'uppercase',
              lineHeight: '1.1',
            })}
          >
            {project.type} · {project.year}
          </span>
          <h1
            className={css({
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(48px, 6vw, 80px)',
              lineHeight: '0.88',
              letterSpacing: '0.01em',
              color: '#7AFF18',
              textTransform: 'uppercase',
            })}
          >
            {project.title}
          </h1>
          {project.role && (
            <span
              className={css({
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: '14px',
                color: '#B8E090',
                lineHeight: '1.5',
                marginTop: '8px',
              })}
            >
              {project.role}
            </span>
          )}
          {project.externalUrl && (
            <a
              href={project.externalUrl}
              className={css({
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: '13px',
                letterSpacing: '0.04em',
                color: '#7AFF18',
                textDecoration: 'none',
                marginTop: '16px',
                padding: '10px 0',
                display: 'inline-block',
                _hover: { color: '#C3EE92' },
              })}
            >
              Visit Site ↗
            </a>
          )}
        </div>
      </div>

      {/* RIGHT PANEL — Project Details */}
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          padding: '48px 24px',
          background: '#0D1404',
          borderLeft: 'none',
          '@media (min-width: 768px)': {
            padding: '64px 52px',
            borderLeft: '1px solid #182505',
          },
        })}
      >
        {/* Problem */}
        {project.problem && (
          <div className={css({ marginBottom: '48px' })}>
            <span
              className={css({
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '11px',
                letterSpacing: '0.14em',
                color: '#7AFF18',
                textTransform: 'uppercase',
                lineHeight: '1.1',
                display: 'block',
                marginBottom: '16px',
              })}
            >
              Problem
            </span>
            <p
              className={css({
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: '16px',
                color: '#E6F9D2',
                lineHeight: '1.5',
                maxWidth: '55ch',
              })}
            >
              {project.problem}
            </p>
          </div>
        )}

        {project.problem && (
          <div className={css({ borderTop: '1px solid #182505', marginBottom: '32px' })} />
        )}

        {/* Approach */}
        {project.approach && (
          <div className={css({ marginBottom: '48px' })}>
            <span
              className={css({
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '11px',
                letterSpacing: '0.14em',
                color: '#7AFF18',
                textTransform: 'uppercase',
                lineHeight: '1.1',
                display: 'block',
                marginBottom: '16px',
              })}
            >
              Approach
            </span>
            <p
              className={css({
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: '16px',
                color: '#E6F9D2',
                lineHeight: '1.5',
                maxWidth: '55ch',
              })}
            >
              {project.approach}
            </p>
          </div>
        )}

        {project.approach && (
          <div className={css({ borderTop: '1px solid #182505', marginBottom: '32px' })} />
        )}

        {/* Outcome */}
        {project.outcome && (
          <div className={css({ marginBottom: '48px' })}>
            <span
              className={css({
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '11px',
                letterSpacing: '0.14em',
                color: '#7AFF18',
                textTransform: 'uppercase',
                lineHeight: '1.1',
                display: 'block',
                marginBottom: '16px',
              })}
            >
              Outcome
            </span>
            <p
              className={css({
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: '16px',
                color: '#E6F9D2',
                lineHeight: '1.5',
                maxWidth: '55ch',
              })}
            >
              {project.outcome}
            </p>
          </div>
        )}

        {project.outcome && (
          <div className={css({ borderTop: '1px solid #182505', marginBottom: '32px' })} />
        )}

        {/* Description (for experiments) */}
        {project.description && !project.problem && (
          <div className={css({ marginBottom: '48px' })}>
            <span
              className={css({
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '11px',
                letterSpacing: '0.14em',
                color: '#7AFF18',
                textTransform: 'uppercase',
                lineHeight: '1.1',
                display: 'block',
                marginBottom: '16px',
              })}
            >
              About
            </span>
            <p
              className={css({
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: '16px',
                color: '#E6F9D2',
                lineHeight: '1.5',
                maxWidth: '55ch',
              })}
            >
              {project.description}
            </p>
          </div>
        )}

        {/* Stack */}
        {project.stack && project.stack.length > 0 && (
          <div className={css({ marginBottom: '48px' })}>
            <span
              className={css({
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '11px',
                letterSpacing: '0.14em',
                color: '#7AFF18',
                textTransform: 'uppercase',
                lineHeight: '1.1',
                display: 'block',
                marginBottom: '16px',
              })}
            >
              Stack
            </span>
            <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '8px 16px' })}>
              {project.stack.map((tech, i) => (
                <span
                  key={i}
                  className={css({
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    fontSize: '14px',
                    color: '#B8E090',
                    lineHeight: '1.5',
                  })}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        <div className={css({ display: 'flex', gap: '24px', marginTop: 'auto', paddingTop: '32px' })}>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              className={css({
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: '13px',
                letterSpacing: '0.04em',
                color: '#7AFF18',
                textDecoration: 'none',
                padding: '10px 0',
                _hover: { color: '#C3EE92' },
              })}
            >
              Live Site ↗
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              className={css({
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: '13px',
                letterSpacing: '0.04em',
                color: '#7AFF18',
                textDecoration: 'none',
                padding: '10px 0',
                _hover: { color: '#C3EE92' },
              })}
            >
              GitHub ↗
            </a>
          )}
          <a
            href="/"
            className={css({
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: '13px',
              letterSpacing: '0.04em',
              color: '#65A038',
              textDecoration: 'none',
              padding: '10px 0',
              _hover: { color: '#E6F9D2' },
            })}
          >
            ← All Work
          </a>
        </div>

        <div className={css({ marginTop: '24px' })}>
          <a
            href="/archive"
            className={css({
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: '11px',
              letterSpacing: '0.08em',
              color: '#547828',
              textDecoration: 'none',
              textTransform: 'uppercase',
            })}
          >
            Archive
          </a>
        </div>
      </div>
    </div>
  )
}