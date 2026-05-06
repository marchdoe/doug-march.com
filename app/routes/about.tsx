import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <div
      className={css({
        padding: '96px 6vw 96px',
        maxWidth: '1200px',
        '@media (max-width: 640px)': {
          padding: '80px 5vw 64px',
        },
      })}
    >
      {/* Identity */}
      <section className={css({ marginBottom: '96px' })}>
        <h1
          className={css({
            fontFamily: 'display',
            fontSize: 'clamp(48px, 10vw, 120px)',
            fontWeight: '700',
            lineHeight: '0.88',
            letterSpacing: '-0.02em',
            color: 'heroText',
            textTransform: 'uppercase',
            marginBottom: '24px',
          })}
        >
          {identity.name}
        </h1>
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '14px',
            fontWeight: '400',
            letterSpacing: '0.20em',
            textTransform: 'uppercase',
            color: 'textMuted',
            marginBottom: '32px',
          })}
        >
          {identity.role}
        </p>
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '18px',
            fontWeight: '400',
            lineHeight: '1.6',
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
            fontSize: '12px',
            fontWeight: '400',
            letterSpacing: '0.20em',
            textTransform: 'uppercase',
            color: 'textMuted',
            marginBottom: '48px',
            paddingBottom: '16px',
            borderBottom: '1px solid',
            borderColor: 'border',
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
                gridTemplateColumns: '140px 1fr',
                gap: '24px',
                padding: '20px 0',
                borderBottom: '1px solid',
                borderColor: 'border',
                '@media (max-width: 640px)': {
                  gridTemplateColumns: '1fr',
                  gap: '8px',
                },
              })}
            >
              <span
                className={css({
                  fontFamily: 'mono',
                  fontSize: '13px',
                  fontWeight: '400',
                  letterSpacing: '0.05em',
                  color: 'textMuted',
                  minWidth: '120px',
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
                    fontWeight: '500',
                    color: 'text',
                    marginBottom: '4px',
                  })}
                >
                  {entry.role}
                  <span className={css({ color: 'textMuted', fontWeight: '400' })}>
                    {' '}— {entry.company}
                  </span>
                </p>
                <p
                  className={css({
                    fontFamily: 'body',
                    fontSize: '16px',
                    fontWeight: '400',
                    lineHeight: '1.5',
                    color: 'textSecondary',
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

      {/* Education */}
      <section className={css({ marginBottom: '96px' })}>
        <h2
          className={css({
            fontFamily: 'mono',
            fontSize: '12px',
            fontWeight: '400',
            letterSpacing: '0.20em',
            textTransform: 'uppercase',
            color: 'textMuted',
            marginBottom: '48px',
            paddingBottom: '16px',
            borderBottom: '1px solid',
            borderColor: 'border',
          })}
        >
          Education
        </h2>
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: '140px 1fr',
            gap: '24px',
            '@media (max-width: 640px)': {
              gridTemplateColumns: '1fr',
              gap: '8px',
            },
          })}
        >
          <span
            className={css({
              fontFamily: 'mono',
              fontSize: '13px',
              fontWeight: '400',
              letterSpacing: '0.05em',
              color: 'textMuted',
            })}
          >
            {education.years}
          </span>
          <div>
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '16px',
                fontWeight: '500',
                color: 'text',
                marginBottom: '4px',
              })}
            >
              {education.degree}
              <span className={css({ color: 'textMuted', fontWeight: '400' })}>
                {' '}— {education.school}
              </span>
            </p>
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '16px',
                fontWeight: '400',
                color: 'textSecondary',
              })}
            >
              {education.concentration}
            </p>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className={css({ marginBottom: '96px' })}>
        <h2
          className={css({
            fontFamily: 'mono',
            fontSize: '12px',
            fontWeight: '400',
            letterSpacing: '0.20em',
            textTransform: 'uppercase',
            color: 'textMuted',
            marginBottom: '48px',
            paddingBottom: '16px',
            borderBottom: '1px solid',
            borderColor: 'border',
          })}
        >
          Capabilities
        </h2>
        <div
          className={css({
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px 24px',
          })}
        >
          {capabilities.map((cap, i) => (
            <span
              key={i}
              className={css({
                fontFamily: 'body',
                fontSize: '16px',
                fontWeight: '400',
                color: 'textSecondary',
                whiteSpace: 'nowrap',
              })}
            >
              {cap}
            </span>
          ))}
        </div>
      </section>

      {/* Personal */}
      <section className={css({ marginBottom: '96px' })}>
        <h2
          className={css({
            fontFamily: 'mono',
            fontSize: '12px',
            fontWeight: '400',
            letterSpacing: '0.20em',
            textTransform: 'uppercase',
            color: 'textMuted',
            marginBottom: '48px',
            paddingBottom: '16px',
            borderBottom: '1px solid',
            borderColor: 'border',
          })}
        >
          Personal
        </h2>
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '32px',
          })}
        >
          <div>
            <p
              className={css({
                fontFamily: 'mono',
                fontSize: '12px',
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                color: 'textMuted',
                marginBottom: '8px',
              })}
            >
              Holes in One
            </p>
            <p
              className={css({
                fontFamily: 'display',
                fontSize: '48px',
                fontWeight: '700',
                color: 'heroText',
                lineHeight: '1',
              })}
            >
              {personal.holesInOne}
            </p>
          </div>
          <div>
            <p
              className={css({
                fontFamily: 'mono',
                fontSize: '12px',
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                color: 'textMuted',
                marginBottom: '8px',
              })}
            >
              Sport
            </p>
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '16px',
                fontWeight: '400',
                color: 'text',
              })}
            >
              {personal.sport}
            </p>
          </div>
          <div>
            <p
              className={css({
                fontFamily: 'mono',
                fontSize: '12px',
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                color: 'textMuted',
                marginBottom: '8px',
              })}
            >
              Teams
            </p>
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '16px',
                fontWeight: '400',
                color: 'text',
                lineHeight: '1.5',
              })}
            >
              {personal.teams.join(', ')}
            </p>
          </div>
          <div>
            <p
              className={css({
                fontFamily: 'mono',
                fontSize: '12px',
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                color: 'textMuted',
                marginBottom: '8px',
              })}
            >
              Current Focus
            </p>
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '16px',
                fontWeight: '400',
                color: 'text',
                maxWidth: '45ch',
                lineHeight: '1.5',
              })}
            >
              {personal.currentFocus}
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={css({
          borderTop: '1px solid',
          borderColor: 'border',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        })}
      >
        <p
          className={css({
            fontFamily: 'mono',
            fontSize: '12px',
            letterSpacing: '0.10em',
            textTransform: 'uppercase',
            color: 'textMuted',
          })}
        >
          Doug March © 2026
        </p>
        <a
          href="/archive"
          className={css({
            fontFamily: 'mono',
            fontSize: '12px',
            letterSpacing: '0.10em',
            textTransform: 'uppercase',
            color: 'textMuted',
            textDecoration: 'none',
            padding: '12px 0',
            _hover: { color: 'accent' },
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px' },
          })}
        >
          Archive
        </a>
      </footer>
    </div>
  )
}