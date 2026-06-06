import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'
import { Sidebar } from '../components/Sidebar'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  const allWork = [
    ...(featuredProject ? [featuredProject] : []),
    ...selectedWork,
  ]

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
      {/* LEFT PANEL — The Declaration */}
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '48px 24px',
          background: '#060B02',
          minHeight: '70vh',
          position: 'relative',
          '@media (min-width: 768px)': {
            padding: '80px 52px',
            minHeight: '100vh',
          },
        })}
      >
        {/* Date mark */}
        <span
          className={css({
            position: 'absolute',
            top: '28px',
            left: '24px',
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: '11px',
            letterSpacing: '0.10em',
            color: '#547828',
            '@media (min-width: 768px)': {
              top: '48px',
              left: '52px',
            },
          })}
        >
          06.06.2026
        </span>

        {/* Hero phrase */}
        <div
          className={css({
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '24px',
          })}
        >
          <h1
            className={css({
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(56px, 7vw, 100px)',
              lineHeight: '0.88',
              letterSpacing: '0.01em',
              color: '#7AFF18',
              textTransform: 'uppercase',
              maxWidth: '10ch',
            })}
          >
            It's your road, and yours alone.
          </h1>
          <span
            className={css({
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: '12px',
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              color: '#65A038',
            })}
          >
            — Rumi
          </span>
        </div>

        {/* Identity mark */}
        <div
          className={css({
            marginTop: '32px',
          })}
        >
          <span
            className={css({
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: '12px',
              letterSpacing: '0.08em',
              color: '#547828',
              textTransform: 'uppercase',
            })}
          >
            Doug March — Product Designer & Developer
          </span>
        </div>
      </div>

      {/* RIGHT PANEL — The Proof */}
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          padding: '48px 24px',
          background: '#0D1404',
          minHeight: '100vh',
          position: 'relative',
          borderLeft: 'none',
          '@media (min-width: 768px)': {
            padding: '64px 52px',
            borderLeft: '1px solid #182505',
          },
        })}
      >
        {/* FEATURED PROJECT */}
        {featuredProject && (
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
                marginBottom: '20px',
              })}
            >
              Featured
            </span>
            <a
              href={featuredProject.externalUrl || `/work/${featuredProject.slug}`}
              className={css({
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: '20px',
                color: '#E6F9D2',
                textDecoration: 'none',
                display: 'block',
                marginBottom: '8px',
                lineHeight: '1.3',
                _hover: { color: '#7AFF18' },
              })}
            >
              {featuredProject.title}
            </a>
            <p
              className={css({
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: '14px',
                color: '#B8E090',
                lineHeight: '1.5',
                maxWidth: '55ch',
              })}
            >
              {featuredProject.problem}
            </p>
            <div
              className={css({
                display: 'flex',
                gap: '16px',
                marginTop: '12px',
              })}
            >
              <span
                className={css({
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: '12px',
                  letterSpacing: '0.08em',
                  color: '#65A038',
                  textTransform: 'uppercase',
                })}
              >
                {featuredProject.type} · {featuredProject.year}
              </span>
            </div>
          </div>
        )}

        {/* Hairline */}
        <div className={css({ borderTop: '1px solid #182505', marginBottom: '32px' })} />

        {/* SELECTED WORK */}
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
              marginBottom: '20px',
            })}
          >
            Selected Work
          </span>

          {allWork.filter(p => p.slug !== featuredProject?.slug).map((project) => (
            <a
              key={project.slug}
              href={`/work/${project.slug}`}
              className={css({
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                padding: '14px 0',
                borderBottom: '1px solid #182505',
                textDecoration: 'none',
                gap: '16px',
                _hover: { '& span:first-child': { color: '#7AFF18' } },
              })}
            >
              <span
                className={css({
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: '16px',
                  color: '#E6F9D2',
                  transition: 'color 0.08s ease',
                  letterSpacing: '0',
                  lineHeight: '1.5',
                })}
              >
                {project.title}
              </span>
              <span
                className={css({
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: '13px',
                  color: '#65A038',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0',
                })}
              >
                {project.type} · {project.year}
              </span>
            </a>
          ))}
        </div>

        {/* Hairline */}
        <div className={css({ borderTop: '1px solid #182505', marginBottom: '32px' })} />

        {/* EXPERIMENTS */}
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
              marginBottom: '20px',
            })}
          >
            Experiments
          </span>

          {experiments.map((exp) => (
            <a
              key={exp.slug}
              href={exp.externalUrl || `/work/${exp.slug}`}
              className={css({
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                padding: '14px 0',
                borderBottom: '1px solid #182505',
                textDecoration: 'none',
                gap: '16px',
                _hover: { '& span:first-child': { color: '#7AFF18' } },
              })}
            >
              <span
                className={css({
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: '16px',
                  color: '#E6F9D2',
                  transition: 'color 0.08s ease',
                  lineHeight: '1.5',
                })}
              >
                {exp.title}
              </span>
              <span
                className={css({
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: '13px',
                  color: '#65A038',
                  whiteSpace: 'nowrap',
                })}
              >
                {exp.type} · {exp.year}
              </span>
            </a>
          ))}
        </div>

        {/* Hairline */}
        <div className={css({ borderTop: '1px solid #182505', marginBottom: '32px' })} />

        {/* TODAY — Signals */}
        <div className={css({ marginBottom: '80px' })}>
          <span
            className={css({
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '11px',
              letterSpacing: '0.14em',
              color: '#7AFF18',
              textTransform: 'uppercase',
              lineHeight: '1.1',
              display: 'block',
              marginBottom: '20px',
            })}
          >
            Today
          </span>

          <div className={css({ display: 'flex', flexDirection: 'column', gap: '16px' })}>
            {/* Tigers */}
            <div className={css({ display: 'flex', alignItems: 'baseline', gap: '12px' })}>
              <span
                className={css({
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '11px',
                  letterSpacing: '0.14em',
                  color: '#7AFF18',
                  textTransform: 'uppercase',
                })}
              >
                Tigers
              </span>
              <span
                className={css({
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '22px',
                  letterSpacing: '0.04em',
                  color: '#7AFF18',
                })}
              >
                7–3
              </span>
              <span
                className={css({
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '11px',
                  color: '#65A038',
                  verticalAlign: 'super',
                })}
              >
                W
              </span>
            </div>

            {/* Golf */}
            <div className={css({ display: 'flex', flexDirection: 'column', gap: '4px' })}>
              <div className={css({ display: 'flex', alignItems: 'baseline', gap: '12px' })}>
                <span
                  className={css({
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '11px',
                    letterSpacing: '0.14em',
                    color: '#7AFF18',
                    textTransform: 'uppercase',
                  })}
                >
                  Poston
                </span>
                <span
                  className={css({
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '22px',
                    letterSpacing: '0.04em',
                    color: '#7AFF18',
                  })}
                >
                  −9
                </span>
              </div>
              <span
                className={css({
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: '10px',
                  color: '#547828',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                })}
              >
                Memorial Tournament
              </span>
            </div>

            {/* Moon */}
            <div className={css({ display: 'flex', alignItems: 'center', gap: '10px' })}>
              <span className={css({ fontSize: '14px', color: '#B8E090' })}>☽</span>
              <span
                className={css({
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                  color: '#65A038',
                  textTransform: 'uppercase',
                })}
              >
                Last Quarter · 57%
              </span>
            </div>

            {/* Awwwards nod */}
            <span
              className={css({
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '13px',
                letterSpacing: '0.04em',
                color: '#547828',
                marginTop: '4px',
              })}
            >
              21 HRS ON THE MOON
            </span>
          </div>
        </div>

        {/* Nav + Footer */}
        <div className={css({ marginTop: 'auto' })}>
          <Sidebar />
          <div
            className={css({
              position: 'static',
              paddingTop: '64px',
              '@media (min-width: 768px)': {
                position: 'relative',
                paddingTop: '0',
              },
            })}
          >
            {/* On mobile, render nav inline since absolute positioning won't work the same */}
            <div
              className={css({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                '@media (min-width: 768px)': {
                  display: 'none',
                },
              })}
            >
              <div className={css({ display: 'flex', gap: '24px' })}>
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
            </div>
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
    </div>
  )
}