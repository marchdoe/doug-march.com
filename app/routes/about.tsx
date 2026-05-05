import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <main
      className={css({
        position: 'relative',
        minHeight: '100vh',
        background: 'bg',
        paddingTop: { base: '88px', md: '96px' },
        paddingBottom: { base: '88px', md: '104px' },
        overflow: 'hidden',
      })}
    >
      {/* Eyebrow */}
      <div
        className={css({
          paddingX: '6vw',
          marginBottom: { base: '20px', md: '28px' },
          fontFamily: 'body',
          fontSize: '12px',
          color: 'warm.400',
          letterSpacing: '0.20em',
          textTransform: 'uppercase',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        })}
      >
        <span>About · {identity.name}</span>
        <span>Aldie, VA · 79°</span>
      </div>

      {/* Cascading name hero — DOUG (left) / MARCH (right) */}
      <header
        className={css({
          marginBottom: { base: '40px', md: '64px' },
          fontFamily: 'display',
          color: 'hero',
          textTransform: 'uppercase',
        })}
      >
        <div
          className={css({
            display: 'flex',
            justifyContent: 'flex-start',
            paddingX: '6vw',
            lineHeight: '0.88',
          })}
        >
          <span
            className={css({
              fontWeight: '800',
              letterSpacing: '-0.02em',
              fontSize: 'clamp(72px, 22vw, 320px)',
              display: 'inline-block',
            })}
          >
            Doug
          </span>
        </div>
        <div
          className={css({
            display: 'flex',
            justifyContent: 'flex-end',
            paddingX: '6vw',
            lineHeight: '0.88',
            marginTop: { base: '-8px', md: '-18px' },
          })}
        >
          <span
            className={css({
              fontWeight: '800',
              letterSpacing: '-0.02em',
              fontSize: 'clamp(72px, 22vw, 320px)',
              display: 'inline-block',
            })}
          >
            March
          </span>
        </div>
      </header>

      {/* Identity statement — wide measure, italic body */}
      <section
        className={css({
          paddingX: '6vw',
          marginBottom: { base: '64px', md: '96px' },
          display: 'grid',
          gridTemplateColumns: { base: '1fr', md: '160px 1fr' },
          gap: { base: '12px', md: '32px' },
          alignItems: 'baseline',
        })}
      >
        <div
          className={css({
            fontFamily: 'body',
            fontSize: '12px',
            color: 'textMuted',
            letterSpacing: '0.20em',
            textTransform: 'uppercase',
            paddingTop: { base: '0', md: '10px' },
          })}
        >
          Statement
        </div>
        <p
          className={css({
            fontFamily: 'display',
            fontWeight: '500',
            fontSize: 'clamp(22px, 3.6vw, 44px)',
            lineHeight: '1.18',
            color: 'text',
            letterSpacing: '-0.005em',
            maxWidth: '28ch',
          })}
        >
          {identity.role}. {identity.statement}
        </p>
      </section>

      {/* Timeline — masthead-style dense rows, fixed-width year column */}
      <section
        className={css({
          paddingX: '6vw',
          marginBottom: { base: '64px', md: '96px' },
        })}
      >
        <h2
          className={css({
            fontFamily: 'body',
            fontSize: '12px',
            color: 'textMuted',
            letterSpacing: '0.20em',
            textTransform: 'uppercase',
            marginBottom: '24px',
            borderBottom: '1px solid token(colors.border)',
            paddingBottom: '12px',
            display: 'flex',
            justifyContent: 'space-between',
          })}
        >
          <span>Filed under: 2006 → present</span>
          <span className={css({ color: 'warm.400' })}>{timeline.length} entries</span>
        </h2>
        <ol className={css({ listStyle: 'none', margin: '0', padding: '0' })}>
          {timeline.map((entry, idx) => (
            <li
              key={`${entry.year}-${entry.company}-${idx}`}
              className={css({
                display: 'grid',
                gridTemplateColumns: { base: '1fr', md: '140px 1fr', lg: '140px 1fr 1fr' },
                columnGap: '24px',
                rowGap: '6px',
                alignItems: 'baseline',
                paddingY: { base: '20px', md: '24px' },
                borderBottom: '1px solid token(colors.border)',
                _last: { borderBottom: 'none' },
              })}
            >
              <span
                className={css({
                  fontFamily: 'body',
                  fontSize: '13px',
                  color: 'accent',
                  letterSpacing: '0.10em',
                  fontVariantNumeric: 'tabular-nums',
                  whiteSpace: 'nowrap',
                })}
              >
                {entry.year}
                {entry.current ? ' ●' : ''}
              </span>
              <div className={css({ minWidth: 0 })}>
                <div
                  className={css({
                    fontFamily: 'display',
                    fontWeight: '700',
                    fontSize: { base: '22px', md: '26px' },
                    lineHeight: '1.05',
                    color: 'text',
                    letterSpacing: '-0.01em',
                    textTransform: 'uppercase',
                  })}
                >
                  {entry.role}
                </div>
                <div
                  className={css({
                    marginTop: '4px',
                    fontFamily: 'body',
                    fontSize: '14px',
                    color: 'textSecondary',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  })}
                >
                  {entry.company}
                </div>
              </div>
              <p
                className={css({
                  fontFamily: 'body',
                  fontSize: '16px',
                  lineHeight: '1.5',
                  color: 'textSecondary',
                  maxWidth: '60ch',
                })}
              >
                {entry.description}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Capabilities — flowing list separated by middle dots */}
      <section
        className={css({
          paddingX: '6vw',
          marginBottom: { base: '64px', md: '96px' },
          display: 'grid',
          gridTemplateColumns: { base: '1fr', md: '160px 1fr' },
          gap: { base: '12px', md: '32px' },
          alignItems: 'baseline',
        })}
      >
        <h2
          className={css({
            fontFamily: 'body',
            fontSize: '12px',
            color: 'textMuted',
            letterSpacing: '0.20em',
            textTransform: 'uppercase',
          })}
        >
          Capabilities
        </h2>
        <p
          className={css({
            fontFamily: 'display',
            fontWeight: '500',
            fontSize: 'clamp(20px, 2.6vw, 32px)',
            lineHeight: '1.25',
            color: 'text',
            letterSpacing: '-0.005em',
          })}
        >
          {capabilities.map((cap, i) => (
            <span key={cap}>
              <span>{cap}</span>
              {i < capabilities.length - 1 && (
                <span className={css({ color: 'accent', marginX: '12px' })} aria-hidden>
                  /
                </span>
              )}
            </span>
          ))}
        </p>
      </section>

      {/* Two-up: Education + Personal */}
      <section
        className={css({
          paddingX: '6vw',
          display: 'grid',
          gridTemplateColumns: { base: '1fr', md: '1fr 1fr' },
          gap: { base: '48px', md: '64px' },
          borderTop: '1px solid token(colors.border)',
          paddingTop: { base: '40px', md: '56px' },
        })}
      >
        <div>
          <h2
            className={css({
              fontFamily: 'body',
              fontSize: '12px',
              color: 'textMuted',
              letterSpacing: '0.20em',
              textTransform: 'uppercase',
              marginBottom: '20px',
            })}
          >
            Education
          </h2>
          <div
            className={css({
              fontFamily: 'display',
              fontWeight: '700',
              fontSize: 'clamp(24px, 3.4vw, 40px)',
              lineHeight: '1.1',
              letterSpacing: '-0.01em',
              color: 'text',
              textTransform: 'uppercase',
            })}
          >
            {education.school}
          </div>
          <div
            className={css({
              marginTop: '8px',
              fontFamily: 'body',
              fontSize: '16px',
              lineHeight: '1.5',
              color: 'textSecondary',
            })}
          >
            {education.degree}, {education.concentration}
          </div>
          <div
            className={css({
              marginTop: '4px',
              fontFamily: 'body',
              fontSize: '13px',
              color: 'textMuted',
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              fontVariantNumeric: 'tabular-nums',
            })}
          >
            {education.years}
          </div>
        </div>

        <div>
          <h2
            className={css({
              fontFamily: 'body',
              fontSize: '12px',
              color: 'textMuted',
              letterSpacing: '0.20em',
              textTransform: 'uppercase',
              marginBottom: '20px',
            })}
          >
            Off the clock
          </h2>
          <dl
            className={css({
              display: 'grid',
              gridTemplateColumns: '160px 1fr',
              rowGap: '14px',
              columnGap: '16px',
              fontFamily: 'body',
              fontSize: '16px',
              lineHeight: '1.5',
            })}
          >
            <dt
              className={css({
                color: 'textMuted',
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                fontSize: '12px',
                paddingTop: '4px',
              })}
            >
              Holes in one
            </dt>
            <dd
              className={css({
                margin: '0',
                fontFamily: 'display',
                fontSize: '32px',
                fontWeight: '700',
                color: 'accent',
                lineHeight: '1',
                fontVariantNumeric: 'tabular-nums',
              })}
            >
              {personal.holesInOne}
            </dd>

            <dt
              className={css({
                color: 'textMuted',
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                fontSize: '12px',
                paddingTop: '4px',
              })}
            >
              Sport
            </dt>
            <dd className={css({ margin: '0', color: 'text' })}>{personal.sport}</dd>

            <dt
              className={css({
                color: 'textMuted',
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                fontSize: '12px',
                paddingTop: '4px',
              })}
            >
              Teams
            </dt>
            <dd className={css({ margin: '0', color: 'text' })}>
              {personal.teams.join(' · ')}
            </dd>

            <dt
              className={css({
                color: 'textMuted',
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                fontSize: '12px',
                paddingTop: '4px',
              })}
            >
              Currently
            </dt>
            <dd className={css({ margin: '0', color: 'text' })}>
              {personal.currentFocus}
            </dd>
          </dl>
        </div>
      </section>
    </main>
  )
}