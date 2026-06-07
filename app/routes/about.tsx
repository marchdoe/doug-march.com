import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Sidebar } from '../components/Sidebar'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <>
      {/* Nav band */}
      <Sidebar />

      {/* Identity band */}
      <section
        className={css({
          padding: '80px 6vw 64px',
          background: 'bg',
        })}
      >
        <h1
          className={css({
            fontFamily: 'display',
            fontWeight: 'bold',
            fontSize: 'clamp(36px, 4.5vw, 64px)',
            lineHeight: 'snug',
            letterSpacing: 'tight',
            color: 'text',
            marginBottom: '16px',
          })}
        >
          {identity.name}
        </h1>
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '14px',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
            color: 'accent',
            marginBottom: '32px',
          })}
        >
          {identity.role}
        </p>
        <p
          className={css({
            fontFamily: 'body',
            fontSize: 'clamp(16px, 1.5vw, 20px)',
            lineHeight: 'normal',
            color: 'textSecondary',
            maxWidth: '65ch',
          })}
        >
          {identity.statement}
        </p>
      </section>

      {/* Timeline band */}
      <section
        className={css({
          padding: '64px 6vw',
          background: 'bgCard',
        })}
      >
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '12px',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
            color: 'textMuted',
            marginBottom: '32px',
          })}
        >
          Timeline
        </p>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
          })}
        >
          {timeline.map((entry, i) => (
            <div
              key={i}
              className={css({
                display: 'grid',
                gridTemplateColumns: '140px 1fr',
                gap: '32px',
                padding: '20px 0',
                borderBottom: '1px solid',
                borderColor: 'border',
                '@media (max-width: 768px)': {
                  gridTemplateColumns: '1fr',
                  gap: '4px',
                },
              })}
            >
              <span
                className={css({
                  fontFamily: 'mono',
                  fontSize: '13px',
                  color: 'textMuted',
                  minWidth: '140px',
                  flexShrink: 0,
                })}
              >
                {entry.year}
              </span>
              <div>
                <span
                  className={css({
                    fontFamily: 'body',
                    fontSize: '16px',
                    fontWeight: 'medium',
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
                    marginLeft: '12px',
                  })}
                >
                  {entry.company}
                </span>
                <p
                  className={css({
                    fontFamily: 'body',
                    fontSize: '14px',
                    lineHeight: 'normal',
                    color: 'textSecondary',
                    marginTop: '4px',
                    maxWidth: '60ch',
                  })}
                >
                  {entry.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Capabilities band */}
      <section
        className={css({
          padding: '64px 6vw',
          background: 'bg',
        })}
      >
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '12px',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
            color: 'textMuted',
            marginBottom: '24px',
          })}
        >
          Capabilities
        </p>
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px 32px',
          })}
        >
          {capabilities.map((cap) => (
            <span
              key={cap}
              className={css({
                fontFamily: 'body',
                fontSize: '15px',
                color: 'textSecondary',
                padding: '10px 0',
                borderBottom: '1px solid',
                borderColor: 'border',
              })}
            >
              {cap}
            </span>
          ))}
        </div>
      </section>

      {/* Education band */}
      <section
        className={css({
          padding: '64px 6vw',
          background: 'bgCard',
        })}
      >
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '12px',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
            color: 'textMuted',
            marginBottom: '24px',
          })}
        >
          Education
        </p>
        <div>
          <p
            className={css({
              fontFamily: 'body',
              fontSize: '16px',
              fontWeight: 'medium',
              color: 'text',
            })}
          >
            {education.school}
          </p>
          <p
            className={css({
              fontFamily: 'body',
              fontSize: '15px',
              color: 'textSecondary',
              marginTop: '4px',
            })}
          >
            {education.degree} — {education.concentration}
          </p>
          <p
            className={css({
              fontFamily: 'mono',
              fontSize: '13px',
              color: 'textMuted',
              marginTop: '4px',
            })}
          >
            {education.years}
          </p>
        </div>
      </section>

      {/* Personal band (crimson inversion) */}
      <section
        className={css({
          padding: '64px 6vw',
          background: 'bgInverse',
        })}
      >
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '32px',
          })}
        >
          <div>
            <span
              className={css({
                fontFamily: 'body',
                fontSize: '11px',
                letterSpacing: 'widest',
                textTransform: 'uppercase',
                color: 'textInverse',
                opacity: 0.7,
                display: 'block',
                marginBottom: '8px',
              })}
            >
              Holes in One
            </span>
            <span
              className={css({
                fontFamily: 'display',
                fontWeight: 'bold',
                fontSize: '48px',
                color: 'textInverse',
              })}
            >
              {personal.holesInOne}
            </span>
          </div>
          <div>
            <span
              className={css({
                fontFamily: 'body',
                fontSize: '11px',
                letterSpacing: 'widest',
                textTransform: 'uppercase',
                color: 'textInverse',
                opacity: 0.7,
                display: 'block',
                marginBottom: '8px',
              })}
            >
              Sport
            </span>
            <span
              className={css({
                fontFamily: 'body',
                fontSize: '18px',
                color: 'textInverse',
              })}
            >
              {personal.sport}
            </span>
          </div>
          <div>
            <span
              className={css({
                fontFamily: 'body',
                fontSize: '11px',
                letterSpacing: 'widest',
                textTransform: 'uppercase',
                color: 'textInverse',
                opacity: 0.7,
                display: 'block',
                marginBottom: '8px',
              })}
            >
              Teams
            </span>
            <span
              className={css({
                fontFamily: 'body',
                fontSize: '16px',
                color: 'textInverse',
                lineHeight: 'normal',
              })}
            >
              {personal.teams.join(', ')}
            </span>
          </div>
          <div>
            <span
              className={css({
                fontFamily: 'body',
                fontSize: '11px',
                letterSpacing: 'widest',
                textTransform: 'uppercase',
                color: 'textInverse',
                opacity: 0.7,
                display: 'block',
                marginBottom: '8px',
              })}
            >
              Current Focus
            </span>
            <span
              className={css({
                fontFamily: 'body',
                fontSize: '16px',
                color: 'textInverse',
                lineHeight: 'normal',
              })}
            >
              {personal.currentFocus}
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={css({
          borderTop: '1px solid',
          borderColor: 'border',
          padding: '24px 6vw',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          '@media (max-width: 768px)': {
            flexDirection: 'column',
            gap: '12px',
            alignItems: 'flex-start',
          },
        })}
      >
        <span
          className={css({
            fontFamily: 'body',
            fontSize: '13px',
            color: 'textMuted',
          })}
        >
          Doug March
        </span>
        <a
          href="/archive"
          className={css({
            fontFamily: 'body',
            fontSize: '13px',
            color: 'textMuted',
            textDecoration: 'none',
            _hover: { color: 'accent' },
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
          })}
        >
          Archive
        </a>
      </footer>
    </>
  )
}