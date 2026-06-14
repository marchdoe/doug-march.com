import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <>
      {/* Hero Band */}
      <section
        className={css({
          paddingTop: '120px',
          padding: '120px 6vw 80px',
          background: 'bg',
          borderBottom: '1px solid',
          borderColor: 'border',
        })}
      >
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '11px',
            fontWeight: 'medium',
            letterSpacing: '0.18em',
            color: 'textMuted',
            textTransform: 'uppercase',
            marginBottom: '24px',
          })}
        >
          ABOUT
        </p>
        <h1
          className={css({
            fontFamily: 'display',
            fontSize: 'clamp(36px, 6vw, 72px)',
            fontWeight: 'bold',
            lineHeight: 'tight',
            color: 'text',
            marginBottom: '32px',
          })}
        >
          {identity.name}
        </h1>
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '14px',
            fontWeight: 'medium',
            letterSpacing: '0.1em',
            color: 'accent',
            textTransform: 'uppercase',
            marginBottom: '32px',
          })}
        >
          {identity.role}
        </p>
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '18px',
            lineHeight: '1.65',
            color: 'textSecondary',
            maxWidth: '60ch',
            letterSpacing: '0.01em',
          })}
        >
          {identity.statement}
        </p>
      </section>

      {/* Timeline Band */}
      <section
        className={css({
          padding: '80px 6vw',
          background: 'bgCard',
          borderBottom: '1px solid',
          borderColor: 'border',
        })}
      >
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '11px',
            fontWeight: 'medium',
            letterSpacing: '0.18em',
            color: 'textMuted',
            textTransform: 'uppercase',
            marginBottom: '48px',
          })}
        >
          EXPERIENCE
        </p>
        <div className={css({ display: 'flex', flexDirection: 'column' })}>
          {timeline.map((entry, i) => (
            <div
              key={i}
              className={css({
                display: 'grid',
                gridTemplateColumns: '140px 1fr',
                gap: '32px',
                padding: '24px 0',
                borderTop: '1px solid',
                borderColor: 'border',
                '@media (max-width: 768px)': {
                  gridTemplateColumns: '1fr',
                  gap: '8px',
                },
              })}
            >
              <span
                className={css({
                  fontFamily: 'mono',
                  fontSize: '13px',
                  color: 'textMuted',
                  flexShrink: 0,
                  minWidth: '120px',
                })}
              >
                {entry.year}
              </span>
              <div>
                <div
                  className={css({
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '12px',
                    marginBottom: '6px',
                    flexWrap: 'wrap',
                  })}
                >
                  <span
                    className={css({
                      fontFamily: 'heading',
                      fontSize: '16px',
                      fontWeight: 'semibold',
                      color: 'text',
                    })}
                  >
                    {entry.role}
                  </span>
                  <span
                    className={css({
                      fontFamily: 'body',
                      fontSize: '14px',
                      color: 'textMuted',
                    })}
                  >
                    {entry.company}
                  </span>
                  {entry.current && (
                    <span
                      className={css({
                        fontFamily: 'body',
                        fontSize: '10px',
                        letterSpacing: '0.14em',
                        color: 'accent',
                        textTransform: 'uppercase',
                        padding: '2px 6px',
                        border: '1px solid',
                        borderColor: 'borderAccent',
                        borderRadius: 'sm',
                      })}
                    >
                      CURRENT
                    </span>
                  )}
                </div>
                <p
                  className={css({
                    fontFamily: 'body',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    color: 'textSecondary',
                    maxWidth: '55ch',
                    letterSpacing: '0.01em',
                  })}
                >
                  {entry.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Capabilities + Education Band */}
      <section
        className={css({
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          background: 'bg',
          borderBottom: '1px solid',
          borderColor: 'border',
          '@media (max-width: 768px)': {
            gridTemplateColumns: '1fr',
          },
        })}
      >
        <div
          className={css({
            padding: '80px 6vw',
            borderRight: '1px solid',
            borderColor: 'border',
            '@media (max-width: 768px)': {
              borderRight: 'none',
              borderBottom: '1px solid',
              borderColor: 'border',
              padding: '48px 6vw',
            },
          })}
        >
          <p
            className={css({
              fontFamily: 'body',
              fontSize: '11px',
              fontWeight: 'medium',
              letterSpacing: '0.18em',
              color: 'textMuted',
              textTransform: 'uppercase',
              marginBottom: '32px',
            })}
          >
            CAPABILITIES
          </p>
          <div
            className={css({
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
            })}
          >
            {capabilities.map((cap) => (
              <span
                key={cap}
                className={css({
                  fontFamily: 'body',
                  fontSize: '13px',
                  color: 'textSecondary',
                  padding: '6px 12px',
                  border: '1px solid',
                  borderColor: 'border',
                  borderRadius: 'sm',
                  letterSpacing: '0.02em',
                })}
              >
                {cap}
              </span>
            ))}
          </div>
        </div>
        <div
          className={css({
            padding: '80px 6vw',
            '@media (max-width: 768px)': {
              padding: '48px 6vw',
            },
          })}
        >
          <p
            className={css({
              fontFamily: 'body',
              fontSize: '11px',
              fontWeight: 'medium',
              letterSpacing: '0.18em',
              color: 'textMuted',
              textTransform: 'uppercase',
              marginBottom: '32px',
            })}
          >
            EDUCATION
          </p>
          <div className={css({ marginBottom: '40px' })}>
            <p
              className={css({
                fontFamily: 'heading',
                fontSize: '16px',
                fontWeight: 'semibold',
                color: 'text',
                marginBottom: '4px',
              })}
            >
              {education.school}
            </p>
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '14px',
                color: 'textSecondary',
                marginBottom: '4px',
              })}
            >
              {education.degree}, {education.concentration}
            </p>
            <p
              className={css({
                fontFamily: 'mono',
                fontSize: '13px',
                color: 'textMuted',
              })}
            >
              {education.years}
            </p>
          </div>

          <p
            className={css({
              fontFamily: 'body',
              fontSize: '11px',
              fontWeight: 'medium',
              letterSpacing: '0.18em',
              color: 'textMuted',
              textTransform: 'uppercase',
              marginBottom: '24px',
            })}
          >
            PERSONAL
          </p>
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            })}
          >
            <PersonalRow label="Holes in One" value={String(personal.holesInOne)} />
            <PersonalRow label="Sport" value={personal.sport} />
            <PersonalRow label="Teams" value={personal.teams.join(', ')} />
            <PersonalRow label="Current Focus" value={personal.currentFocus} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={css({
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 6vw',
          background: 'bg',
          borderTop: '1px solid',
          borderColor: 'border',
          '@media (max-width: 768px)': {
            height: 'auto',
            padding: '16px 6vw',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '8px',
          },
        })}
      >
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
          })}
        >
          <span
            className={css({
              fontFamily: 'body',
              fontSize: '11px',
              letterSpacing: '0.14em',
              color: 'textMuted',
            })}
          >
            © 2026 DOUG MARCH
          </span>
          <a
            href="/archive"
            className={css({
              fontFamily: 'body',
              fontSize: '11px',
              letterSpacing: '0.14em',
              color: 'textMuted',
              textDecoration: 'none',
              _hover: { color: 'textSecondary', textDecoration: 'underline' },
              _focus: {
                outline: '2px solid',
                outlineColor: 'accent',
                outlineOffset: '4px',
              },
            })}
          >
            ARCHIVE
          </a>
        </div>
        <a
          href="/"
          className={css({
            fontFamily: 'body',
            fontSize: '11px',
            letterSpacing: '0.14em',
            color: 'textMuted',
            textDecoration: 'none',
            _hover: { color: 'textSecondary', textDecoration: 'underline' },
            _focus: {
              outline: '2px solid',
              outlineColor: 'accent',
              outlineOffset: '4px',
            },
          })}
        >
          ← HOME
        </a>
      </footer>
    </>
  )
}

function PersonalRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      className={css({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        padding: '8px 0',
        borderBottom: '1px solid',
        borderColor: 'borderSubtle',
      })}
    >
      <span
        className={css({
          fontFamily: 'body',
          fontSize: '13px',
          color: 'textMuted',
        })}
      >
        {label}
      </span>
      <span
        className={css({
          fontFamily: 'body',
          fontSize: '14px',
          color: 'textSecondary',
          textAlign: 'right',
        })}
      >
        {value}
      </span>
    </div>
  )
}