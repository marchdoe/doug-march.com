import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <div
      className={css({
        padding: '64px 8vw 80px',
        maxWidth: '1200px',
      })}
    >
      {/* Identity */}
      <section className={css({ marginBottom: '96px' })}>
        <h1
          className={css({
            fontFamily: 'display',
            fontWeight: 'bold',
            fontSize: 'clamp(36px, 5vw, 64px)',
            lineHeight: 'tight',
            letterSpacing: 'tight',
            color: '{colors.ink.50}',
            marginBottom: '24px',
          })}
        >
          {identity.name}
        </h1>
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '13px',
            fontWeight: '400',
            letterSpacing: '0.08em',
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
            fontSize: 'clamp(16px, 1.8vw, 20px)',
            lineHeight: 'normal',
            color: '{colors.ink.300}',
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
            fontFamily: 'body',
            fontSize: '12px',
            fontWeight: '400',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '{colors.ink.500}',
            marginBottom: '32px',
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
                gridTemplateColumns: { base: '1fr', md: '140px 1fr' },
                gap: { base: '4px', md: '32px' },
                padding: '20px 0',
                borderTop: '1px solid',
                borderColor: 'border',
              })}
            >
              <span
                className={css({
                  fontFamily: 'body',
                  fontSize: '13px',
                  color: '{colors.ink.500}',
                  letterSpacing: '0.02em',
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
                    color: '{colors.ink.50}',
                    marginBottom: '4px',
                  })}
                >
                  {entry.role}
                  <span className={css({ color: '{colors.ink.500}', fontWeight: '400' })}>
                    {' '}— {entry.company}
                  </span>
                </p>
                <p
                  className={css({
                    fontFamily: 'body',
                    fontSize: '14px',
                    lineHeight: 'normal',
                    color: '{colors.ink.400}',
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
            fontFamily: 'body',
            fontSize: '12px',
            fontWeight: '400',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '{colors.ink.500}',
            marginBottom: '24px',
          })}
        >
          Education
        </h2>
        <div
          className={css({
            padding: '20px 0',
            borderTop: '1px solid',
            borderColor: 'border',
          })}
        >
          <p
            className={css({
              fontFamily: 'body',
              fontSize: '16px',
              fontWeight: '500',
              color: '{colors.ink.50}',
              marginBottom: '4px',
            })}
          >
            {education.school}
          </p>
          <p
            className={css({
              fontFamily: 'body',
              fontSize: '14px',
              color: '{colors.ink.400}',
            })}
          >
            {education.degree} · {education.concentration} · {education.years}
          </p>
        </div>
      </section>

      {/* Capabilities */}
      <section className={css({ marginBottom: '96px' })}>
        <h2
          className={css({
            fontFamily: 'body',
            fontSize: '12px',
            fontWeight: '400',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '{colors.ink.500}',
            marginBottom: '24px',
          })}
        >
          Capabilities
        </h2>
        <div
          className={css({
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px 16px',
            borderTop: '1px solid',
            borderColor: 'border',
            paddingTop: '20px',
          })}
        >
          {capabilities.map((cap) => (
            <span
              key={cap}
              className={css({
                fontFamily: 'body',
                fontSize: '14px',
                color: '{colors.ink.300}',
                padding: '6px 0',
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
            fontFamily: 'body',
            fontSize: '12px',
            fontWeight: '400',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '{colors.ink.500}',
            marginBottom: '24px',
          })}
        >
          Personal
        </h2>
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: { base: '1fr', sm: '1fr 1fr' },
            gap: '24px',
            borderTop: '1px solid',
            borderColor: 'border',
            paddingTop: '20px',
          })}
        >
          <div>
            <p className={css({ fontFamily: 'body', fontSize: '12px', color: '{colors.ink.500}', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '6px' })}>
              Holes in One
            </p>
            <p className={css({ fontFamily: 'display', fontSize: '32px', fontWeight: 'bold', color: 'accent' })}>
              {personal.holesInOne}
            </p>
          </div>
          <div>
            <p className={css({ fontFamily: 'body', fontSize: '12px', color: '{colors.ink.500}', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '6px' })}>
              Sport
            </p>
            <p className={css({ fontFamily: 'body', fontSize: '16px', color: '{colors.ink.300}' })}>
              {personal.sport}
            </p>
          </div>
          <div>
            <p className={css({ fontFamily: 'body', fontSize: '12px', color: '{colors.ink.500}', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '6px' })}>
              Teams
            </p>
            <p className={css({ fontFamily: 'body', fontSize: '16px', color: '{colors.ink.300}' })}>
              {personal.teams.join(', ')}
            </p>
          </div>
          <div>
            <p className={css({ fontFamily: 'body', fontSize: '12px', color: '{colors.ink.500}', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '6px' })}>
              Current Focus
            </p>
            <p className={css({ fontFamily: 'body', fontSize: '16px', color: '{colors.ink.300}' })}>
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
          fontFamily: 'body',
          fontSize: '12px',
          color: '{colors.ink.600}',
        })}
      >
        <a
          href="/archive"
          className={css({
            color: '{colors.ink.600}',
            textDecoration: 'none',
            _hover: { color: '{colors.ink.400}' },
            transition: 'color 200ms ease',
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
          })}
        >
          Archive
        </a>
      </footer>
    </div>
  )
}