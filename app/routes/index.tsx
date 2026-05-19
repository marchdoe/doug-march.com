import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Sidebar } from '../components/Sidebar'
import { featuredProject, selectedWork, experiments } from '../content/projects'
import { identity } from '../content/about'
import { capabilities } from '../content/timeline'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <>
      {/* BAND 1 — Hero */}
      <section
        className={css({
          position: 'relative',
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '96px 6vw 64px',
          background: '{colors.stone.50}',
        })}
      >
        <Sidebar />
        <div className={css({ maxWidth: 'none' })}>
          <h1
            className={css({
              fontFamily: 'display',
              fontSize: 'clamp(52px, 10.5vw, 152px)',
              lineHeight: '0.92',
              letterSpacing: '-0.02em',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              textWrap: 'balance',
            })}
          >
            <span className={css({ display: 'block', color: '{colors.stone.900}' })}>
              Fourteen Hours
            </span>
            <span className={css({ display: 'block', color: '{colors.teal.500}' })}>
              Of Light.
            </span>
          </h1>
          <div
            className={css({
              width: '40px',
              height: '2px',
              background: '{colors.teal.400}',
              marginTop: '40px',
              marginBottom: '20px',
            })}
          />
          <p
            className={css({
              fontSize: '13px',
              letterSpacing: '0.08em',
              color: '{colors.stone.500}',
              fontFamily: 'body',
              textTransform: 'uppercase',
              fontWeight: 'medium',
            })}
          >
            May 19, 2026 · 14.3h Daylight · ☽ Waxing Crescent 13%
          </p>
        </div>
      </section>

      {/* BAND 2 — Signal Strip */}
      <section
        className={css({
          width: '100%',
          minHeight: '72px',
          padding: '20px 6vw',
          background: '{colors.teal.800}',
          display: 'flex',
          alignItems: 'center',
          gap: '40px',
          flexWrap: 'wrap',
          overflowX: 'auto',
        })}
      >
        {[
          { icon: '⛳', label: 'PGA: AARON RAI', value: '−9', color: '{colors.teal.300}', valueBold: true },
          { icon: '⚾', label: 'TIGERS', value: '2−8', color: '{colors.teal.400}', valueBold: false },
          { icon: '🌱', label: 'SPRING · DAY 139', value: '', color: '{colors.teal.100}', valueBold: false },
          { icon: '☽', label: 'CRESCENT 13%', value: '', color: '{colors.teal.100}', valueBold: false },
          { icon: '▶', label: 'MEMORIAL DAY IN 6 DAYS', value: '', color: '{colors.teal.200}', valueBold: false },
        ].map((item, i) => (
          <span
            key={i}
            className={css({
              fontSize: '13px',
              letterSpacing: '0.08em',
              color: item.color,
              fontFamily: 'body',
              whiteSpace: 'nowrap',
              fontVariantNumeric: 'tabular-nums',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            })}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
            {item.value && (
              <span
                className={css({
                  fontWeight: item.valueBold ? 'semibold' : 'normal',
                  fontSize: item.valueBold ? '14px' : '13px',
                })}
              >
                {item.value}
              </span>
            )}
          </span>
        ))}
      </section>

      {/* BAND 3 — Work */}
      <section
        className={css({
          width: '100%',
          padding: '96px 6vw',
          background: '{colors.stone.50}',
        })}
      >
        <div
          className={css({
            width: '100%',
            borderTop: '2px solid',
            borderColor: '{colors.teal.400}',
            paddingTop: '24px',
            marginBottom: '64px',
          })}
        >
          <span
            className={css({
              fontSize: '13px',
              letterSpacing: '0.1em',
              fontWeight: 'semibold',
              color: '{colors.stone.500}',
              textTransform: 'uppercase',
              fontFamily: 'body',
            })}
          >
            Selected Work
          </span>
        </div>

        {/* Featured Project */}
        {featuredProject && (
          <div
            className={css({
              marginBottom: '64px',
              padding: '48px',
              background: '{colors.stone.100}',
              transition: 'background 0.2s ease',
              _hover: { background: '{colors.stone.200}' },
              position: 'relative',
              borderLeft: '2px solid transparent',
              '&:hover': { borderLeftColor: '{colors.teal.500}' },
            })}
          >
            <span
              className={css({
                fontSize: '12px',
                letterSpacing: '0.1em',
                fontWeight: 'semibold',
                color: '{colors.teal.500}',
                textTransform: 'uppercase',
                fontFamily: 'body',
                display: 'block',
                marginBottom: '16px',
              })}
            >
              Featured · {featuredProject.year}
            </span>
            <h2
              className={css({
                fontFamily: 'display',
                fontSize: 'clamp(32px, 5vw, 64px)',
                lineHeight: '1.1',
                fontWeight: 'bold',
                color: '{colors.stone.900}',
                marginBottom: '20px',
                textTransform: 'uppercase',
              })}
            >
              {featuredProject.title}
            </h2>
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '18px',
                lineHeight: '1.6',
                color: '{colors.stone.700}',
                maxWidth: '680px',
                marginBottom: '32px',
              })}
            >
              {featuredProject.problem}
            </p>
            <a
              href={featuredProject.externalUrl}
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
                transition: 'all 0.2s ease',
                _hover: {
                  background: '{colors.teal.500}',
                  color: '{colors.stone.50}',
                  textDecoration: 'none',
                },
                '&:focus-visible': {
                  outline: '2px solid',
                  outlineColor: '{colors.teal.500}',
                  outlineOffset: '4px',
                },
              })}
            >
              View Project →
            </a>
          </div>
        )}

        {/* Selected Work Grid */}
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            marginBottom: '64px',
          })}
        >
          {selectedWork.map((project) => (
            <a
              key={project.slug}
              href={`/work/${project.slug}`}
              className={css({
                display: 'block',
                padding: '36px',
                background: '{colors.stone.100}',
                transition: 'all 0.2s ease',
                textDecoration: 'none',
                borderLeft: '2px solid transparent',
                _hover: {
                  background: '{colors.stone.200}',
                  borderLeftColor: '{colors.teal.500}',
                  textDecoration: 'none',
                },
                '&:focus-visible': {
                  outline: '2px solid',
                  outlineColor: '{colors.teal.500}',
                  outlineOffset: '2px',
                },
              })}
            >
              <div
                className={css({
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '12px',
                })}
              >
                <span
                  className={css({
                    fontSize: '12px',
                    letterSpacing: '0.08em',
                    color: '{colors.stone.500}',
                    textTransform: 'uppercase',
                    fontFamily: 'body',
                  })}
                >
                  {project.type}
                </span>
                <span
                  className={css({
                    fontSize: '12px',
                    fontVariantNumeric: 'tabular-nums',
                    color: '{colors.stone.500}',
                    fontFamily: 'body',
                  })}
                >
                  {project.year}
                </span>
              </div>
              <h3
                className={css({
                  fontFamily: 'display',
                  fontSize: 'clamp(22px, 3vw, 32px)',
                  lineHeight: '1.1',
                  fontWeight: 'bold',
                  color: '{colors.stone.900}',
                  textTransform: 'uppercase',
                  marginBottom: '12px',
                })}
              >
                {project.title}
              </h3>
              {project.problem && (
                <p
                  className={css({
                    fontFamily: 'body',
                    fontSize: '16px',
                    lineHeight: '1.6',
                    color: '{colors.stone.600}',
                    maxWidth: '55ch',
                  })}
                >
                  {project.problem}
                </p>
              )}
            </a>
          ))}
        </div>

        {/* Experiments */}
        <div
          className={css({
            borderTop: '1px solid',
            borderColor: '{colors.stone.200}',
            paddingTop: '32px',
          })}
        >
          <span
            className={css({
              fontSize: '13px',
              letterSpacing: '0.1em',
              fontWeight: 'semibold',
              color: '{colors.stone.500}',
              textTransform: 'uppercase',
              fontFamily: 'body',
              display: 'block',
              marginBottom: '24px',
            })}
          >
            Experiments
          </span>
          <div
            className={css({
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '16px',
            })}
          >
            {experiments.map((exp) => (
              <a
                key={exp.slug}
                href={exp.externalUrl || `/work/${exp.slug}`}
                className={css({
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '20px 24px',
                  background: 'transparent',
                  border: '1px solid',
                  borderColor: '{colors.stone.200}',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  _hover: {
                    borderColor: '{colors.teal.400}',
                    background: '{colors.stone.100}',
                    textDecoration: 'none',
                  },
                  '&:focus-visible': {
                    outline: '2px solid',
                    outlineColor: '{colors.teal.500}',
                    outlineOffset: '2px',
                  },
                })}
              >
                <div>
                  <h4
                    className={css({
                      fontFamily: 'display',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: '{colors.stone.900}',
                      textTransform: 'uppercase',
                      lineHeight: '1.2',
                    })}
                  >
                    {exp.title}
                  </h4>
                  <span
                    className={css({
                      fontSize: '13px',
                      color: '{colors.stone.500}',
                      fontFamily: 'body',
                    })}
                  >
                    {exp.type}
                  </span>
                </div>
                <span
                  className={css({
                    fontSize: '13px',
                    fontVariantNumeric: 'tabular-nums',
                    color: '{colors.stone.500}',
                    fontFamily: 'body',
                  })}
                >
                  {exp.year}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* BAND 4 — About + Quote */}
      <section
        className={css({
          width: '100%',
          padding: '80px 6vw',
          background: '{colors.stone.100}',
        })}
      >
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '64px',
            md: { gridTemplateColumns: '1fr 1fr', gap: '80px' },
          })}
        >
          <div>
            <h2
              className={css({
                fontFamily: 'display',
                fontSize: 'clamp(28px, 4vw, 48px)',
                lineHeight: '1.1',
                fontWeight: 'bold',
                color: '{colors.stone.900}',
                textTransform: 'uppercase',
                marginBottom: '24px',
              })}
            >
              {identity.name}
            </h2>
            <p
              className={css({
                fontSize: '13px',
                letterSpacing: '0.08em',
                fontWeight: 'semibold',
                color: '{colors.teal.500}',
                textTransform: 'uppercase',
                fontFamily: 'body',
                marginBottom: '24px',
              })}
            >
              {identity.role}
            </p>
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '18px',
                lineHeight: '1.6',
                color: '{colors.stone.700}',
                maxWidth: '55ch',
              })}
            >
              {identity.statement}
            </p>
          </div>
          <div
            className={css({
              display: 'flex',
              alignItems: 'center',
            })}
          >
            <blockquote
              className={css({
                borderLeft: '3px solid',
                borderColor: '{colors.teal.400}',
                paddingLeft: '24px',
                fontSize: 'clamp(18px, 2.5vw, 28px)',
                lineHeight: '1.5',
                color: '{colors.teal.700}',
                fontFamily: 'body',
                fontStyle: 'normal',
                letterSpacing: '-0.01em',
              })}
            >
              <p>"An optimist sees the opportunity in every difficulty."</p>
              <footer
                className={css({
                  marginTop: '16px',
                  fontSize: '13px',
                  letterSpacing: '0.08em',
                  color: '{colors.stone.500}',
                  textTransform: 'uppercase',
                  fontWeight: 'medium',
                })}
              >
                — Winston Churchill
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* BAND 5 — Capabilities + Footer */}
      <section
        className={css({
          width: '100%',
          padding: '64px 6vw 48px',
          background: '{colors.teal.800}',
          color: '{colors.teal.100}',
        })}
      >
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '48px',
            md: { gridTemplateColumns: '2fr 1fr', gap: '80px' },
          })}
        >
          <div>
            <span
              className={css({
                fontSize: '13px',
                letterSpacing: '0.1em',
                fontWeight: 'semibold',
                color: '{colors.teal.400}',
                textTransform: 'uppercase',
                fontFamily: 'body',
                display: 'block',
                marginBottom: '32px',
              })}
            >
              Capabilities
            </span>
            <div
              className={css({
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '0',
              })}
            >
              {capabilities.map((cap, i) => (
                <div
                  key={i}
                  className={css({
                    padding: '12px 0',
                    borderBottom: '1px solid',
                    borderColor: 'rgba(56, 190, 165, 0.2)',
                    fontSize: '16px',
                    fontFamily: 'body',
                    color: '{colors.teal.100}',
                    lineHeight: '1.5',
                  })}
                >
                  {cap}
                </div>
              ))}
            </div>
          </div>
          <div>
            <span
              className={css({
                fontSize: '13px',
                letterSpacing: '0.1em',
                fontWeight: 'semibold',
                color: '{colors.teal.400}',
                textTransform: 'uppercase',
                fontFamily: 'body',
                display: 'block',
                marginBottom: '24px',
              })}
            >
              Now Playing
            </span>
            <p
              className={css({
                fontSize: '16px',
                fontFamily: 'body',
                color: '{colors.teal.200}',
                lineHeight: '1.6',
                marginBottom: '8px',
              })}
            >
              Guided by Voices
            </p>
            <p
              className={css({
                fontSize: '16px',
                fontFamily: 'body',
                color: '{colors.teal.200}',
                lineHeight: '1.6',
              })}
            >
              My Morning Jacket
            </p>
          </div>
        </div>

        {/* Footer */}
        <div
          className={css({
            marginTop: '64px',
            paddingTop: '24px',
            borderTop: '1px solid',
            borderColor: 'rgba(56, 190, 165, 0.2)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          })}
        >
          <span
            className={css({
              fontSize: '13px',
              letterSpacing: '0.06em',
              color: '{colors.teal.400}',
              fontFamily: 'body',
            })}
          >
            © 2026 Doug March
          </span>
          <a
            href="/archive"
            className={css({
              fontSize: '13px',
              letterSpacing: '0.06em',
              color: '{colors.teal.400}',
              fontFamily: 'body',
              textDecoration: 'none',
              _hover: { color: '{colors.teal.200}', textDecoration: 'underline' },
              '&:focus-visible': {
                outline: '2px solid',
                outlineColor: '{colors.teal.400}',
                outlineOffset: '4px',
              },
            })}
          >
            Archive
          </a>
        </div>
      </section>
    </>
  )
}