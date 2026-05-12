import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <div
      className={css({
        paddingLeft: '6vw',
        paddingRight: '6vw',
        paddingTop: '48px',
        paddingBottom: '96px',
        maxWidth: '1200px',
      })}
    >
      {/* Identity */}
      <section className={css({ marginBottom: '96px' })}>
        <h1
          className={css({
            fontFamily: 'display',
            fontSize: 'clamp(36px, 5vw, 72px)',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            lineHeight: 'tight',
            color: 'accent',
            marginBottom: '24px',
          })}
        >
          {identity.name}
        </h1>
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '13px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'textSubtle',
            marginBottom: '32px',
          })}
        >
          {identity.role}
        </p>
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '16px',
            lineHeight: 'normal',
            color: 'textMuted',
            maxWidth: '65ch',
            letterSpacing: 'normal',
          })}
        >
          {identity.statement}
        </p>
      </section>

      {/* Timeline */}
      <section className={css({ marginBottom: '96px' })}>
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '13px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'textSubtle',
            marginBottom: '32px',
          })}
        >
          Timeline
        </p>
        <div className={css({ display: 'flex', flexDirection: 'column' })}>
          {timeline.map((entry, i) => (
            <div
              key={i}
              className={css({
                display: 'grid',
                gridTemplateColumns: '140px 1fr',
                gap: '24px',
                paddingTop: '16px',
                paddingBottom: '16px',
                borderTop: '1px solid',
                borderColor: 'borderSubtle',
                '@media (max-width: 640px)': {
                  gridTemplateColumns: '1fr',
                  gap: '4px',
                },
              })}
            >
              <span
                className={css({
                  fontFamily: 'body',
                  fontSize: '13px',
                  letterSpacing: '0.12em',
                  color: 'textSubtle',
                  textTransform: 'uppercase',
                  minWidth: '140px',
                  flexShrink: 0,
                })}
              >
                {entry.year}
              </span>
              <div>
                <p
                  className={css({
                    fontFamily: 'body',
                    fontSize: '16px',
                    color: 'text',
                    lineHeight: 'snug',
                    letterSpacing: 'normal',
                  })}
                >
                  <span className={css({ fontWeight: 'medium' })}>{entry.role}</span>
                  <span className={css({ color: 'textSubtle' })}> — {entry.company}</span>
                </p>
                <p
                  className={css({
                    fontFamily: 'body',
                    fontSize: '14px',
                    color: 'textSubtle',
                    lineHeight: 'normal',
                    marginTop: '4px',
                    maxWidth: '65ch',
                    letterSpacing: 'normal',
                  })}
                >
                  {entry.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className={css({ marginBottom: '96px' })}>
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '13px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'textSubtle',
            marginBottom: '32px',
          })}
        >
          Education
        </p>
        <div
          className={css({
            borderTop: '1px solid',
            borderColor: 'borderSubtle',
            paddingTop: '16px',
          })}
        >
          <p
            className={css({
              fontFamily: 'body',
              fontSize: '16px',
              color: 'text',
              lineHeight: 'snug',
              letterSpacing: 'normal',
            })}
          >
            <span className={css({ fontWeight: 'medium' })}>{education.school}</span>
          </p>
          <p
            className={css({
              fontFamily: 'body',
              fontSize: '14px',
              color: 'textSubtle',
              lineHeight: 'normal',
              marginTop: '4px',
              letterSpacing: 'normal',
            })}
          >
            {education.degree} — {education.concentration}, {education.years}
          </p>
        </div>
      </section>

      {/* Capabilities */}
      <section className={css({ marginBottom: '96px' })}>
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '13px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'textSubtle',
            marginBottom: '32px',
          })}
        >
          Capabilities
        </p>
        <div
          className={css({
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px 24px',
            borderTop: '1px solid',
            borderColor: 'borderSubtle',
            paddingTop: '16px',
          })}
        >
          {capabilities.map((cap, i) => (
            <span
              key={i}
              className={css({
                fontFamily: 'body',
                fontSize: '14px',
                color: 'textMuted',
                letterSpacing: 'normal',
                lineHeight: 'loose',
              })}
            >
              {cap}
            </span>
          ))}
        </div>
      </section>

      {/* Personal */}
      <section>
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '13px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'textSubtle',
            marginBottom: '32px',
          })}
        >
          Personal
        </p>
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
            borderTop: '1px solid',
            borderColor: 'borderSubtle',
            paddingTop: '16px',
          })}
        >
          <div>
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '13px',
                color: 'textSubtle',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '4px',
              })}
            >
              Holes in One
            </p>
            <p
              className={css({
                fontFamily: 'display',
                fontSize: '32px',
                color: 'accent',
                fontWeight: 'bold',
              })}
            >
              {personal.holesInOne}
            </p>
          </div>
          <div>
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '13px',
                color: 'textSubtle',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '4px',
              })}
            >
              Sport
            </p>
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '16px',
                color: 'text',
                letterSpacing: 'normal',
              })}
            >
              {personal.sport}
            </p>
          </div>
          <div>
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '13px',
                color: 'textSubtle',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '4px',
              })}
            >
              Teams
            </p>
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '16px',
                color: 'text',
                letterSpacing: 'normal',
              })}
            >
              {personal.teams.join(', ')}
            </p>
          </div>
          <div>
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '13px',
                color: 'textSubtle',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '4px',
              })}
            >
              Current Focus
            </p>
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '16px',
                color: 'text',
                letterSpacing: 'normal',
              })}
            >
              {personal.currentFocus}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}