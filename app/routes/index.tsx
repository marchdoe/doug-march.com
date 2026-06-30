import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Sidebar } from '../components/Sidebar'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <>
      {/* BAND 1 — HERO: Vivid green drench */}
      <section
        className={css({
          position: 'relative',
          minHeight: '100vh',
          background: 'bgHero',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        })}
      >
        <Sidebar />

        {/* Hero phrase container */}
        <div
          className={css({
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '80px 6vw 48px',
          })}
        >
          <h1
            className={css({
              fontFamily: 'display',
              fontWeight: 'bold',
              fontSize: 'clamp(6.5rem, 13.5vw, 15rem)',
              lineHeight: 'tight',
              letterSpacing: 'tight',
              color: 'textInverse',
              textTransform: 'uppercase',
              textWrap: 'nowrap',
            })}
          >
            Build.<br />
            Work.<br />
            Dream.<br />
            Create.
          </h1>
          <p
            className={css({
              fontFamily: 'body',
              fontSize: '0.875rem',
              fontWeight: 'normal',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'textInverse',
              opacity: '0.55',
              paddingTop: '2rem',
            })}
          >
            — Earl Nightingale
          </p>
        </div>

        {/* Signal ticker at base of hero */}
        <div
          className={css({
            background: 'rgba(1, 21, 9, 0.25)',
            padding: '14px 6vw',
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            flexWrap: 'wrap',
          })}
        >
          <span
            className={css({
              fontFamily: 'body',
              fontSize: '0.6875rem',
              letterSpacing: '0.08em',
              color: 'textInverse',
              opacity: '0.7',
              textTransform: 'uppercase',
            })}
          >
            Tigers 7–3
          </span>
          <span
            className={css({
              fontFamily: 'body',
              fontSize: '0.6875rem',
              letterSpacing: '0.08em',
              color: 'textInverse',
              opacity: '0.7',
            })}
          >
            ·
          </span>
          <span
            className={css({
              fontFamily: 'body',
              fontSize: '0.6875rem',
              letterSpacing: '0.08em',
              color: 'textInverse',
              opacity: '0.7',
              textTransform: 'uppercase',
            })}
          >
            Hovland −22
          </span>
          <span
            className={css({
              fontFamily: 'body',
              fontSize: '0.6875rem',
              letterSpacing: '0.08em',
              color: 'textInverse',
              opacity: '0.7',
            })}
          >
            ·
          </span>
          <span
            className={css({
              fontFamily: 'body',
              fontSize: '0.6875rem',
              letterSpacing: '0.08em',
              color: 'textInverse',
              opacity: '0.7',
              textTransform: 'uppercase',
            })}
          >
            Full Moon
          </span>
          <span
            className={css({
              fontFamily: 'body',
              fontSize: '0.6875rem',
              letterSpacing: '0.08em',
              color: 'textInverse',
              opacity: '0.7',
            })}
          >
            ·
          </span>
          <span
            className={css({
              fontFamily: 'body',
              fontSize: '0.6875rem',
              letterSpacing: '0.08em',
              color: 'textInverse',
              opacity: '0.7',
              textTransform: 'uppercase',
            })}
          >
            July 4 in 4 days
          </span>
        </div>
      </section>

      {/* BAND 2 — WORK: Deep forest */}
      <section
        className={css({
          background: 'bg',
          padding: '96px 6vw',
        })}
      >
        {/* Featured Project */}
        {featuredProject && (
          <div
            className={css({
              marginBottom: '80px',
            })}
          >
            <span
              className={css({
                fontFamily: 'body',
                fontSize: '0.75rem',
                fontWeight: 'medium',
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                color: 'textMuted',
                display: 'block',
                marginBottom: '16px',
              })}
            >
              Featured
            </span>
            <h2
              className={css({
                fontFamily: 'display',
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 'bold',
                lineHeight: 'snug',
                letterSpacing: 'tight',
                color: 'text',
                textTransform: 'uppercase',
                marginBottom: '16px',
              })}
            >
              <a
                href={featuredProject.externalUrl}
                className={css({
                  color: 'text',
                  textDecoration: 'none',
                  _hover: {
                    color: 'accent',
                  },
                  _focus: {
                    outline: '2px solid {colors.green.400}',
                    outlineOffset: '4px',
                    borderRadius: 'sm',
                  },
                })}
              >
                {featuredProject.title}
              </a>
            </h2>
            {featuredProject.problem && (
              <p
                className={css({
                  fontFamily: 'body',
                  fontSize: '1.0625rem',
                  lineHeight: 'normal',
                  color: 'textSecondary',
                  maxWidth: '65ch',
                })}
              >
                {featuredProject.problem}
              </p>
            )}
          </div>
        )}

        {/* Selected Work — rows */}
        <div
          className={css({
            borderTop: '1px solid {colors.forest.700}',
          })}
        >
          <span
            className={css({
              fontFamily: 'body',
              fontSize: '0.75rem',
              fontWeight: 'medium',
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              color: 'textMuted',
              display: 'block',
              padding: '20px 0',
            })}
          >
            Selected Work
          </span>
          {selectedWork.map((project) => (
            <a
              key={project.slug}
              href={`/work/${project.slug}`}
              className={css({
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 0',
                borderTop: '1px solid {colors.forest.700}',
                textDecoration: 'none',
                color: 'text',
                transition: 'background 0.15s ease',
                marginLeft: '-2vw',
                marginRight: '-2vw',
                paddingLeft: '2vw',
                paddingRight: '2vw',
                minHeight: '44px',
                _hover: {
                  background: 'bgCard',
                },
                _focus: {
                  outline: '2px solid {colors.green.400}',
                  outlineOffset: '-2px',
                  borderRadius: 'sm',
                },
              })}
            >
              <span
                className={css({
                  fontFamily: 'body',
                  fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
                  fontWeight: 'medium',
                  lineHeight: 'snug',
                })}
              >
                {project.title}
              </span>
              <span
                className={css({
                  fontFamily: 'body',
                  fontSize: '0.8125rem',
                  letterSpacing: '0.04em',
                  color: 'textMuted',
                  whiteSpace: 'nowrap',
                  marginLeft: '24px',
                })}
              >
                {project.type} · {project.year}
              </span>
            </a>
          ))}
        </div>

        {/* Experiments */}
        <div
          className={css({
            marginTop: '64px',
            borderTop: '1px solid {colors.forest.700}',
          })}
        >
          <span
            className={css({
              fontFamily: 'body',
              fontSize: '0.75rem',
              fontWeight: 'medium',
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              color: 'textMuted',
              display: 'block',
              padding: '20px 0',
            })}
          >
            Experiments
          </span>
          {experiments.map((project) => (
            <a
              key={project.slug}
              href={project.externalUrl || `/work/${project.slug}`}
              className={css({
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 0',
                borderTop: '1px solid {colors.forest.700}',
                textDecoration: 'none',
                color: 'text',
                transition: 'background 0.15s ease',
                marginLeft: '-2vw',
                marginRight: '-2vw',
                paddingLeft: '2vw',
                paddingRight: '2vw',
                minHeight: '44px',
                _hover: {
                  background: 'bgCard',
                },
                _focus: {
                  outline: '2px solid {colors.green.400}',
                  outlineOffset: '-2px',
                  borderRadius: 'sm',
                },
              })}
            >
              <span
                className={css({
                  fontFamily: 'body',
                  fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
                  fontWeight: 'medium',
                  lineHeight: 'snug',
                })}
              >
                {project.title}
              </span>
              <span
                className={css({
                  fontFamily: 'body',
                  fontSize: '0.8125rem',
                  letterSpacing: '0.04em',
                  color: 'textMuted',
                  whiteSpace: 'nowrap',
                  marginLeft: '24px',
                })}
              >
                {project.type} · {project.year}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* BAND 3 — SIGNALS: Slightly lighter forest */}
      <section
        className={css({
          background: 'bgAlt',
          padding: '72px 6vw',
        })}
      >
        {/* Golf */}
        <div
          className={css({
            marginBottom: '48px',
          })}
        >
          <span
            className={css({
              fontFamily: 'body',
              fontSize: '0.6875rem',
              fontWeight: 'medium',
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              color: 'textMuted',
              display: 'block',
              marginBottom: '20px',
            })}
          >
            Travelers Championship · Final
          </span>
          <div
            className={css({
              display: 'flex',
              alignItems: 'baseline',
              gap: '32px',
              flexWrap: 'wrap',
            })}
          >
            <div
              className={css({
                display: 'flex',
                alignItems: 'baseline',
                gap: '12px',
              })}
            >
              <span
                className={css({
                  fontFamily: 'display',
                  fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                  fontWeight: 'bold',
                  color: 'accent',
                  lineHeight: 'snug',
                })}
              >
                −22
              </span>
              <span
                className={css({
                  fontFamily: 'body',
                  fontSize: '1rem',
                  fontWeight: 'medium',
                  color: 'text',
                })}
              >
                Hovland
              </span>
            </div>
            <div
              className={css({
                display: 'flex',
                gap: '24px',
                flexWrap: 'wrap',
              })}
            >
              <span
                className={css({
                  fontFamily: 'body',
                  fontSize: '0.9375rem',
                  color: 'textSecondary',
                })}
              >
                Scheffler −21
              </span>
              <span
                className={css({
                  fontFamily: 'body',
                  fontSize: '0.9375rem',
                  color: 'textSecondary',
                })}
              >
                Morikawa −20
              </span>
            </div>
          </div>
        </div>

        {/* Tigers + Moon + July 4 row */}
        <div
          className={css({
            display: 'flex',
            gap: '48px',
            flexWrap: 'wrap',
            alignItems: 'baseline',
            borderTop: '1px solid {colors.forest.700}',
            paddingTop: '24px',
            marginBottom: '32px',
          })}
        >
          <div>
            <span
              className={css({
                fontFamily: 'body',
                fontSize: '1rem',
                fontWeight: 'medium',
                color: 'accent',
              })}
            >
              7–3 Win
            </span>
            <span
              className={css({
                fontFamily: 'body',
                fontSize: '0.875rem',
                color: 'textSecondary',
                marginLeft: '8px',
              })}
            >
              Tigers
            </span>
          </div>
          <span
            className={css({
              fontFamily: 'body',
              fontSize: '0.875rem',
              color: '{colors.stone.300}',
            })}
          >
            🌕 Full Moon · 98.4%
          </span>
          <span
            className={css({
              fontFamily: 'body',
              fontSize: '0.875rem',
              color: 'textMuted',
            })}
          >
            Independence Day — 4 days
          </span>
        </div>

        {/* Seen Today */}
        <div
          className={css({
            borderTop: '1px solid {colors.forest.700}',
            paddingTop: '20px',
          })}
        >
          <span
            className={css({
              fontFamily: 'body',
              fontSize: '0.8125rem',
              fontStyle: 'italic',
              color: 'textMuted',
            })}
          >
            Seen today: Awwwards — The Future In Black
          </span>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={css({
          background: 'bg',
          padding: '32px 6vw',
          borderTop: '1px solid {colors.forest.700}',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        })}
      >
        <span
          className={css({
            fontFamily: 'body',
            fontSize: '0.8125rem',
            color: 'textMuted',
            letterSpacing: '0.04em',
          })}
        >
          © 2026 Doug March
        </span>
        <a
          href="/archive"
          className={css({
            fontFamily: 'body',
            fontSize: '0.8125rem',
            color: 'textMuted',
            letterSpacing: '0.04em',
            textDecoration: 'none',
            padding: '8px 0',
            minHeight: '44px',
            display: 'flex',
            alignItems: 'center',
            _hover: {
              color: 'accent',
            },
            _focus: {
              outline: '2px solid {colors.green.400}',
              outlineOffset: '4px',
              borderRadius: 'sm',
            },
          })}
        >
          Archive
        </a>
      </footer>
    </>
  )
}