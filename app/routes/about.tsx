import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <div
      className={css({
        padding: '5vh 5vw',
        maxWidth: '1200px',
        width: '100%',
      })}
    >
      {/* Identity */}
      <section className={css({ marginBottom: '96px' })}>
        <h1
          className={css({
            fontFamily: 'display',
            fontSize: 'clamp(48px, 7vw, 96px)',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            lineHeight: 'tight',
            letterSpacing: '-0.02em',
            marginBottom: '32px',
          })}
        >
          {identity.name}
        </h1>
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '13px',
            fontVariant: 'all-small-caps',
            letterSpacing: '0.15em',
            color: 'accent',
            marginBottom: '24px',
          })}
        >
          {identity.role}
        </p>
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '16px',
            lineHeight: 'normal',
            color: 'textSecondary',
            maxWidth: '65ch',
          })}
        >
          {identity.statement}
        </p>
      </section>

      {/* Timeline */}
      <section className={css({ marginBottom: '96px' })}>
        <h2
          className={css({
            fontFamily: 'mono',
            fontSize: '10px',
            fontVariant: 'all-small-caps',
            letterSpacing: '0.15em',
            color: 'textMuted',
            marginBottom: '32px',
            borderBottom: '1px solid',
            borderColor: 'border',
            paddingBottom: '12px',
          })}
        >
          Timeline
        </h2>
        <div className={css({ display: 'flex', flexDirection: 'column', gap: '0' })}>
          {timeline.map((entry, i) => (
            <div
              key={i}
              className={css({
                display: 'grid',
                gridTemplateColumns: { base: '1fr', sm: '140px 1fr' },
                gap: { base: '4px', sm: '32px' },
                padding: '16px 0',
                borderBottom: '1px solid',
                borderColor: 'border',
              })}
            >
              <span
                className={css({
                  fontFamily: 'mono',
                  fontSize: '12px',
                  color: 'textMuted',
                  minWidth: '120px',
                  lineHeight: 'snug',
                  whiteSpace: 'nowrap',
                })}
              >
                {entry.year}
              </span>
              <div>
                <span
                  className={css({
                    fontFamily: 'body',
                    fontSize: '16px',
                    color: 'text',
                    fontWeight: 'medium',
                  })}
                >
                  {entry.role}
                </span>
                <span
                  className={css({
                    fontFamily: 'body',
                    fontSize: '16px',
                    color: 'textMuted',
                    marginLeft: '8px',
                  })}
                >
                  — {entry.company}
                </span>
                <p
                  className={css({
                    fontFamily: 'body',
                    fontSize: '14px',
                    color: 'textSecondary',
                    lineHeight: 'normal',
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

      {/* Capabilities */}
      <section className={css({ marginBottom: '96px' })}>
        <h2
          className={css({
            fontFamily: 'mono',
            fontSize: '10px',
            fontVariant: 'all-small-caps',
            letterSpacing: '0.15em',
            color: 'textMuted',
            marginBottom: '32px',
            borderBottom: '1px solid',
            borderColor: 'border',
            paddingBottom: '12px',
          })}
        >
          Capabilities
        </h2>
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: { base: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' },
            gap: '8px 24px',
          })}
        >
          {capabilities.map((cap, i) => (
            <span
              key={i}
              className={css({
                fontFamily: 'body',
                fontSize: '14px',
                color: 'textSecondary',
                lineHeight: 'snug',
                padding: '6px 0',
              })}
            >
              {cap}
            </span>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className={css({ marginBottom: '96px' })}>
        <h2
          className={css({
            fontFamily: 'mono',
            fontSize: '10px',
            fontVariant: 'all-small-caps',
            letterSpacing: '0.15em',
            color: 'textMuted',
            marginBottom: '32px',
            borderBottom: '1px solid',
            borderColor: 'border',
            paddingBottom: '12px',
          })}
        >
          Education
        </h2>
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: { base: '1fr', sm: '140px 1fr' },
            gap: { base: '4px', sm: '32px' },
          })}
        >
          <span
            className={css({
              fontFamily: 'mono',
              fontSize: '12px',
              color: 'textMuted',
              minWidth: '120px',
            })}
          >
            {education.years}
          </span>
          <div>
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '16px',
                color: 'text',
                fontWeight: 'medium',
              })}
            >
              {education.school}
            </p>
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '14px',
                color: 'textSecondary',
                marginTop: '4px',
              })}
            >
              {education.degree} — {education.concentration}
            </p>
          </div>
        </div>
      </section>

      {/* Personal */}
      <section className={css({ marginBottom: '48px' })}>
        <h2
          className={css({
            fontFamily: 'mono',
            fontSize: '10px',
            fontVariant: 'all-small-caps',
            letterSpacing: '0.15em',
            color: 'textMuted',
            marginBottom: '32px',
            borderBottom: '1px solid',
            borderColor: 'border',
            paddingBottom: '12px',
          })}
        >
          Personal
        </h2>
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: { base: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: '24px',
          })}
        >
          <div>
            <span
              className={css({
                fontFamily: 'mono',
                fontSize: '10px',
                fontVariant: 'all-small-caps',
                letterSpacing: '0.12em',
                color: 'textMuted',
                display: 'block',
                marginBottom: '4px',
              })}
            >
              Holes in One
            </span>
            <span
              className={css({
                fontFamily: 'display',
                fontSize: '32px',
                fontWeight: 'bold',
                color: 'accent',
              })}
            >
              {personal.holesInOne}
            </span>
          </div>
          <div>
            <span
              className={css({
                fontFamily: 'mono',
                fontSize: '10px',
                fontVariant: 'all-small-caps',
                letterSpacing: '0.12em',
                color: 'textMuted',
                display: 'block',
                marginBottom: '4px',
              })}
            >
              Sport
            </span>
            <span
              className={css({
                fontFamily: 'body',
                fontSize: '16px',
                color: 'text',
              })}
            >
              {personal.sport}
            </span>
          </div>
          <div>
            <span
              className={css({
                fontFamily: 'mono',
                fontSize: '10px',
                fontVariant: 'all-small-caps',
                letterSpacing: '0.12em',
                color: 'textMuted',
                display: 'block',
                marginBottom: '4px',
              })}
            >
              Teams
            </span>
            <span
              className={css({
                fontFamily: 'body',
                fontSize: '16px',
                color: 'text',
              })}
            >
              {personal.teams.join(', ')}
            </span>
          </div>
          <div>
            <span
              className={css({
                fontFamily: 'mono',
                fontSize: '10px',
                fontVariant: 'all-small-caps',
                letterSpacing: '0.12em',
                color: 'textMuted',
                display: 'block',
                marginBottom: '4px',
              })}
            >
              Current Focus
            </span>
            <span
              className={css({
                fontFamily: 'body',
                fontSize: '16px',
                color: 'text',
              })}
            >
              {personal.currentFocus}
            </span>
          </div>
        </div>
      </section>

      {/* Footer with Archive */}
      <footer
        className={css({
          borderTop: '1px solid',
          borderColor: 'border',
          paddingTop: '16px',
          marginTop: '48px',
        })}
      >
        <a
          href="/archive"
          className={css({
            fontFamily: 'mono',
            fontSize: '10px',
            color: 'textMuted',
            _hover: { color: 'accentLight' },
            transition: 'color 200ms ease',
            minHeight: '44px',
            display: 'inline-flex',
            alignItems: 'center',
          })}
        >
          Archive
        </a>
      </footer>
    </div>
  )
}