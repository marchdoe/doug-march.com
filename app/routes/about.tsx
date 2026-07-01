import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <div
      className={css({
        width: '100%',
        maxWidth: '900px',
        margin: '0 auto',
        padding: '100px 5vw 120px',
      })}
    >
      {/* Identity */}
      <section className={css({ marginBottom: '96px' })}>
        <h1
          className={css({
            fontFamily: 'display',
            fontWeight: 'black',
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            lineHeight: 'tight',
            letterSpacing: 'tight',
            textTransform: 'uppercase',
            color: 'accent',
            marginBottom: '24px',
          })}
        >
          {identity.name}
        </h1>
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '14px',
            fontWeight: 'semibold',
            letterSpacing: 'wider',
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
            fontFamily: 'display',
            fontWeight: 'bold',
            fontSize: '14px',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
            color: 'textMuted',
            marginBottom: '48px',
          })}
        >
          Experience
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
                borderTop: '1px solid',
                borderColor: 'borderSubtle',
                '@media (max-width: 640px)': {
                  gridTemplateColumns: '1fr',
                  gap: '8px',
                },
              })}
            >
              <span
                className={css({
                  fontFamily: 'body',
                  fontSize: '13px',
                  letterSpacing: 'wide',
                  color: 'textMuted',
                  whiteSpace: 'nowrap',
                  minWidth: '120px',
                })}
              >
                {entry.year}
              </span>
              <div>
                <p className={css({ fontFamily: 'body', fontSize: '16px', fontWeight: 'semibold', color: 'text', marginBottom: '4px' })}>
                  {entry.role}
                  <span className={css({ color: 'textMuted', fontWeight: 'normal' })}> — {entry.company}</span>
                </p>
                <p className={css({ fontFamily: 'body', fontSize: '15px', lineHeight: 'normal', color: 'textSecondary', maxWidth: '55ch' })}>
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
            fontFamily: 'display',
            fontWeight: 'bold',
            fontSize: '14px',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
            color: 'textMuted',
            marginBottom: '32px',
          })}
        >
          Education
        </h2>
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: '140px 1fr',
            gap: '24px',
            padding: '20px 0',
            borderTop: '1px solid',
            borderColor: 'borderSubtle',
            '@media (max-width: 640px)': {
              gridTemplateColumns: '1fr',
              gap: '8px',
            },
          })}
        >
          <span className={css({ fontFamily: 'body', fontSize: '13px', letterSpacing: 'wide', color: 'textMuted', whiteSpace: 'nowrap', minWidth: '120px' })}>
            {education.years}
          </span>
          <div>
            <p className={css({ fontFamily: 'body', fontSize: '16px', fontWeight: 'semibold', color: 'text', marginBottom: '4px' })}>
              {education.degree}, {education.concentration}
            </p>
            <p className={css({ fontFamily: 'body', fontSize: '15px', color: 'textSecondary' })}>
              {education.school}
            </p>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className={css({ marginBottom: '96px' })}>
        <h2
          className={css({
            fontFamily: 'display',
            fontWeight: 'bold',
            fontSize: '14px',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
            color: 'textMuted',
            marginBottom: '32px',
          })}
        >
          Capabilities
        </h2>
        <div
          className={css({
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
          })}
        >
          {capabilities.map((cap) => (
            <span
              key={cap}
              className={css({
                fontFamily: 'body',
                fontSize: '13px',
                letterSpacing: 'wide',
                textTransform: 'uppercase',
                color: 'textSecondary',
                padding: '8px 16px',
                border: '1px solid',
                borderColor: 'border',
              })}
            >
              {cap}
            </span>
          ))}
        </div>
      </section>

      {/* Personal */}
      <section className={css({ marginBottom: '48px' })}>
        <h2
          className={css({
            fontFamily: 'display',
            fontWeight: 'bold',
            fontSize: '14px',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
            color: 'textMuted',
            marginBottom: '32px',
          })}
        >
          Personal
        </h2>
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
          })}
        >
          <div>
            <p className={css({ fontFamily: 'body', fontSize: '13px', letterSpacing: 'wide', textTransform: 'uppercase', color: 'textMuted', marginBottom: '8px' })}>
              Holes in One
            </p>
            <p className={css({ fontFamily: 'display', fontSize: '32px', fontWeight: 'black', color: 'accent' })}>
              {personal.holesInOne}
            </p>
          </div>
          <div>
            <p className={css({ fontFamily: 'body', fontSize: '13px', letterSpacing: 'wide', textTransform: 'uppercase', color: 'textMuted', marginBottom: '8px' })}>
              Sport
            </p>
            <p className={css({ fontFamily: 'body', fontSize: '16px', color: 'text' })}>
              {personal.sport}
            </p>
          </div>
          <div>
            <p className={css({ fontFamily: 'body', fontSize: '13px', letterSpacing: 'wide', textTransform: 'uppercase', color: 'textMuted', marginBottom: '8px' })}>
              Teams
            </p>
            <p className={css({ fontFamily: 'body', fontSize: '16px', color: 'text' })}>
              {personal.teams.join(', ')}
            </p>
          </div>
          <div>
            <p className={css({ fontFamily: 'body', fontSize: '13px', letterSpacing: 'wide', textTransform: 'uppercase', color: 'textMuted', marginBottom: '8px' })}>
              Current Focus
            </p>
            <p className={css({ fontFamily: 'body', fontSize: '16px', color: 'text' })}>
              {personal.currentFocus}
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={css({ paddingTop: '48px', borderTop: '1px solid', borderColor: 'borderSubtle' })}>
        <a
          href="/archive"
          className={css({
            fontFamily: 'body',
            fontSize: '13px',
            color: 'textMuted',
            textDecoration: 'none',
            letterSpacing: 'wide',
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