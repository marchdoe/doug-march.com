import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Sidebar } from '../components/Sidebar'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
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
      {/* LEFT COLUMN — DARK */}
      <div
        className={css({
          background: '{colors.stone.900}',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          padding: '24px 24px 32px',
          '@media (min-width: 768px)': {
            padding: '48px 48px 48px 6vw',
          },
        })}
      >
        {/* Nav */}
        <Sidebar />

        {/* Hero phrase — left half */}
        <div
          className={css({
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minHeight: '50vh',
            '@media (min-width: 768px)': {
              minHeight: '65vh',
            },
          })}
        >
          <h1
            className={css({
              fontFamily: 'display',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              lineHeight: '0.88',
              letterSpacing: '-0.02em',
              color: '{colors.stone.50}',
              fontSize: 'clamp(48px, 5.8vw, 84px)',
              textWrap: 'balance',
            })}
          >
            Only those
            <br />
            who will risk
            <br />
            going too
            <br />
            far
          </h1>
        </div>

        {/* Signal strip — left bottom */}
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            paddingTop: '24px',
            borderTop: '1px solid',
            borderColor: '{colors.stone.700}',
          })}
        >
          {/* Full Moon */}
          <div className={css({ display: 'flex', alignItems: 'center', gap: '10px' })}>
            <div
              className={css({
                width: '36px',
                height: '36px',
                borderRadius: '9999px',
                background: '{colors.lime.400}',
                flexShrink: '0',
              })}
              aria-hidden="true"
            />
            <span
              className={css({
                fontFamily: 'mono',
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '{colors.stone.400}',
              })}
            >
              Full Moon · 98.2%
            </span>
          </div>

          {/* Golf leaderboard */}
          <div>
            <span
              className={css({
                fontFamily: 'mono',
                fontSize: '0.6875rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '{colors.stone.400}',
                display: 'block',
                marginBottom: '6px',
              })}
            >
              Charles Schwab
            </span>
            <div className={css({ display: 'flex', flexDirection: 'column', gap: '2px' })}>
              {['Gerard', 'Putnam', 'Kim', 'Spaun', 'McCarty'].map((name) => (
                <div
                  key={name}
                  className={css({
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontFamily: 'mono',
                    fontSize: '0.75rem',
                  })}
                >
                  <span className={css({ color: '{colors.stone.200}' })}>{name}</span>
                  <span className={css({ color: '{colors.lime.400}', fontVariantNumeric: 'tabular-nums' })}>
                    −6
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tigers */}
          <div
            className={css({
              fontFamily: 'mono',
              fontSize: '0.75rem',
              color: '{colors.stone.500}',
              letterSpacing: '0.05em',
              fontVariantNumeric: 'tabular-nums',
              borderTop: '1px solid',
              borderColor: '{colors.stone.700}',
              paddingTop: '12px',
            })}
          >
            Tigers 1 – 7
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN — LIME */}
      <div
        className={css({
          background: '{colors.lime.400}',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          padding: '24px 24px 32px',
          '@media (min-width: 768px)': {
            padding: '48px 6vw 48px 48px',
          },
        })}
      >
        {/* Hero phrase — right half */}
        <div
          className={css({
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minHeight: '50vh',
            '@media (min-width: 768px)': {
              minHeight: '65vh',
            },
          })}
        >
          <h2
            className={css({
              fontFamily: 'display',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              lineHeight: '0.88',
              letterSpacing: '-0.02em',
              color: '{colors.stone.900}',
              fontSize: 'clamp(48px, 5.8vw, 84px)',
              textWrap: 'balance',
            })}
          >
            can possibly
            <br />
            find out
            <br />
            how far
            <br />
            one can go.
          </h2>
          <span
            className={css({
              fontFamily: 'body',
              fontSize: '0.875rem',
              letterSpacing: '0.12em',
              color: '{colors.stone.700}',
              marginTop: '24px',
              fontVariantCaps: 'all-small-caps',
            })}
          >
            — T.S. Eliot
          </span>
        </div>

        {/* Projects strip */}
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            borderTop: '1px solid rgba(13,18,9,0.25)',
            paddingTop: '24px',
          })}
        >
          {/* Featured */}
          {featuredProject && (
            <a
              href={featuredProject.externalUrl || `/work/${featuredProject.slug}`}
              className={css({
                display: 'block',
                background: '{colors.stone.900}',
                borderRadius: '2px',
                padding: '20px',
                textDecoration: 'none',
                border: '1px solid rgba(13,18,9,0.25)',
                transition: 'transform 0.2s ease',
                _hover: { transform: 'scale(1.02)', textDecoration: 'none' },
                _focusVisible: {
                  outline: '3px solid',
                  outlineColor: '{colors.stone.900}',
                  outlineOffset: '2px',
                },
                '@media (prefers-reduced-motion: reduce)': {
                  transition: 'none',
                },
              })}
            >
              <span
                className={css({
                  fontFamily: 'mono',
                  fontSize: '0.6875rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '{colors.lime.400}',
                  display: 'block',
                  marginBottom: '6px',
                })}
              >
                Featured
              </span>
              <span
                className={css({
                  fontFamily: 'display',
                  fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                  fontWeight: 'bold',
                  color: '{colors.stone.50}',
                  display: 'block',
                  textTransform: 'uppercase',
                  lineHeight: '1.15',
                })}
              >
                {featuredProject.title}
              </span>
              {featuredProject.problem && (
                <span
                  className={css({
                    fontFamily: 'body',
                    fontSize: '0.875rem',
                    color: '{colors.stone.300}',
                    lineHeight: '1.6',
                    display: 'block',
                    marginTop: '6px',
                    maxWidth: '60ch',
                  })}
                >
                  {featuredProject.problem}
                </span>
              )}
            </a>
          )}

          {/* Selected work grid */}
          <div
            className={css({
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '8px',
              '@media (min-width: 480px)': {
                gridTemplateColumns: '1fr 1fr',
              },
            })}
          >
            {selectedWork.map((project) => (
              <a
                key={project.slug}
                href={`/work/${project.slug}`}
                className={css({
                  display: 'block',
                  background: '{colors.stone.900}',
                  borderRadius: '2px',
                  padding: '16px',
                  textDecoration: 'none',
                  border: '1px solid rgba(13,18,9,0.25)',
                  transition: 'transform 0.2s ease',
                  _hover: { transform: 'scale(1.02)', textDecoration: 'none' },
                  _focusVisible: {
                    outline: '3px solid',
                    outlineColor: '{colors.stone.900}',
                    outlineOffset: '2px',
                  },
                  '@media (prefers-reduced-motion: reduce)': {
                    transition: 'none',
                  },
                })}
              >
                <span
                  className={css({
                    fontFamily: 'display',
                    fontSize: '1.125rem',
                    fontWeight: 'bold',
                    color: '{colors.stone.50}',
                    display: 'block',
                    textTransform: 'uppercase',
                    lineHeight: '1.15',
                  })}
                >
                  {project.title}
                </span>
                <span
                  className={css({
                    fontFamily: 'mono',
                    fontSize: '0.6875rem',
                    color: '{colors.stone.400}',
                    letterSpacing: '0.08em',
                    display: 'block',
                    marginTop: '4px',
                  })}
                >
                  {project.type} · {project.year}
                </span>
              </a>
            ))}
          </div>

          {/* Experiments inline */}
          <div
            className={css({
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              paddingTop: '8px',
            })}
          >
            {experiments.map((exp) => (
              <a
                key={exp.slug}
                href={exp.externalUrl || `/work/${exp.slug}`}
                className={css({
                  fontFamily: 'mono',
                  fontSize: '0.75rem',
                  color: '{colors.stone.900}',
                  border: '1px solid rgba(13,18,9,0.4)',
                  borderRadius: '0',
                  padding: '6px 12px',
                  textDecoration: 'none',
                  letterSpacing: '0.05em',
                  minHeight: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  _hover: { background: 'rgba(13,18,9,0.1)', textDecoration: 'none' },
                  _focusVisible: {
                    outline: '3px solid',
                    outlineColor: '{colors.stone.900}',
                    outlineOffset: '2px',
                  },
                })}
              >
                {exp.title} · {exp.type} · {exp.year}
              </a>
            ))}
          </div>

          {/* Signals — right bottom */}
          <div
            className={css({
              borderTop: '1px solid rgba(13,18,9,0.25)',
              paddingTop: '12px',
              marginTop: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            })}
          >
            <span
              className={css({
                fontFamily: 'mono',
                fontSize: '0.875rem',
                color: '{colors.stone.800}',
              })}
            >
              Claude Opus 4.8 ↑1558
            </span>
            <span
              className={css({
                fontFamily: 'body',
                fontSize: '0.75rem',
                color: '{colors.stone.700}',
              })}
            >
              The War on Drugs · Tobin Sprout · Wet Leg
            </span>
            <span
              className={css({
                fontFamily: 'body',
                fontSize: '0.6875rem',
                color: '{colors.stone.600}',
                marginTop: '8px',
              })}
            >
              <a
                href="/archive"
                className={css({
                  color: '{colors.stone.600}',
                  textDecoration: 'none',
                  _hover: { color: '{colors.stone.900}', textDecoration: 'underline' },
                  _focusVisible: {
                    outline: '2px solid',
                    outlineColor: '{colors.stone.900}',
                    outlineOffset: '2px',
                  },
                })}
              >
                Archive
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}