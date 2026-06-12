import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <div className={css({ padding: { base: '100px 6vw 64px', md: '120px 6vw 96px' } })}>
      {/* Identity */}
      <header className={css({ marginBottom: '64px', maxWidth: '680px' })}>
        <h1
          className={css({
            fontFamily: 'display',
            fontWeight: 'bold',
            fontSize: 'clamp(32px, 3.5vw, 56px)',
            lineHeight: 'tight',
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
            fontWeight: 'bold',
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
            color: 'text-secondary',
            maxWidth: '60ch',
          })}
        >
          {identity.statement}
        </p>
      </header>

      {/* Timeline */}
      <section className={css({ marginBottom: '64px' })}>
        <h2
          className={css({
            fontFamily: 'body',
            fontSize: '11px',
            fontWeight: 'bold',
            letterSpacing: 'widest',
            textTransform: 'uppercase',
            color: '{colors.stone.500}',
            marginBottom: '24px',
            paddingBottom: '12px',
            borderBottom: '1px solid',
            borderColor: 'border',
          })}
        >
          Experience
        </h2>
        <div className={css({ display: 'flex', flexDirection: 'column', gap: '0' })}>
          {timeline.map((entry, i) => (
            <div
              key={i}
              className={css({
                display: { base: 'block', md: 'grid' },
                gridTemplateColumns: { md: '140px 200px 1fr' },
                gap: { md: '24px' },
                padding: '16px 0',
                borderBottom: '1px solid',
                borderColor: 'border-subtle',
                alignItems: 'baseline',
              })}
            >
              <span
                className={css({
                  fontFamily: 'mono',
                  fontSize: '13px',
                  color: '{colors.stone.500}',
                  minWidth: '140px',
                  display: 'block',
                  marginBottom: { base: '4px', md: '0' },
                })}
              >
                {entry.year}
              </span>
              <span
                className={css({
                  fontFamily: 'body',
                  fontSize: '15px',
                  fontWeight: 'semibold',
                  color: 'text',
                  display: 'block',
                  marginBottom: { base: '4px', md: '0' },
                })}
              >
                {entry.role}
              </span>
              <div>
                <span
                  className={css({
                    fontFamily: 'body',
                    fontSize: '14px',
                    color: 'accent',
                    display: 'block',
                    marginBottom: '4px',
                  })}
                >
                  {entry.company}
                </span>
                <p
                  className={css({
                    fontFamily: 'body',
                    fontSize: '14px',
                    lineHeight: 'normal',
                    color: 'text-secondary',
                    maxWidth: '55ch',
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
      <section className={css({ marginBottom: '64px' })}>
        <h2
          className={css({
            fontFamily: 'body',
            fontSize: '11px',
            fontWeight: 'bold',
            letterSpacing: 'widest',
            textTransform: 'uppercase',
            color: '{colors.stone.500}',
            marginBottom: '24px',
            paddingBottom: '12px',
            borderBottom: '1px solid',
            borderColor: 'border',
          })}
        >
          Education
        </h2>
        <div
          className={css({
            display: { base: 'block', md: 'grid' },
            gridTemplateColumns: { md: '140px 1fr' },
            gap: { md: '24px' },
          })}
        >
          <span
            className={css({
              fontFamily: 'mono',
              fontSize: '13px',
              color: '{colors.stone.500}',
              marginBottom: { base: '4px', md: '0' },
              display: 'block',
            })}
          >
            {education.years}
          </span>
          <div>
            <p className={css({ fontFamily: 'body', fontSize: '15px', fontWeight: 'semibold', color: 'text' })}>
              {education.school}
            </p>
            <p className={css({ fontFamily: 'body', fontSize: '14px', color: 'text-secondary', marginTop: '4px' })}>
              {education.degree} — {education.concentration}
            </p>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className={css({ marginBottom: '64px' })}>
        <h2
          className={css({
            fontFamily: 'body',
            fontSize: '11px',
            fontWeight: 'bold',
            letterSpacing: 'widest',
            textTransform: 'uppercase',
            color: '{colors.stone.500}',
            marginBottom: '24px',
            paddingBottom: '12px',
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
            gap: '8px',
          })}
        >
          {capabilities.map((cap, i) => (
            <span
              key={i}
              className={css({
                fontFamily: 'body',
                fontSize: '13px',
                color: '{colors.stone.600}',
                background: '{colors.stone.200}',
                padding: '6px 14px',
                borderRadius: 'sm',
              })}
            >
              {cap}
            </span>
          ))}
        </div>
      </section>

      {/* Personal */}
      <section className={css({ marginBottom: '64px' })}>
        <h2
          className={css({
            fontFamily: 'body',
            fontSize: '11px',
            fontWeight: 'bold',
            letterSpacing: 'widest',
            textTransform: 'uppercase',
            color: '{colors.stone.500}',
            marginBottom: '24px',
            paddingBottom: '12px',
            borderBottom: '1px solid',
            borderColor: 'border',
          })}
        >
          Personal
        </h2>
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: { base: '1fr', sm: '1fr 1fr' },
            gap: '20px',
            maxWidth: '600px',
          })}
        >
          <div>
            <span className={css({ fontFamily: 'body', fontSize: '12px', color: '{colors.stone.500}', textTransform: 'uppercase', letterSpacing: 'wider', display: 'block', marginBottom: '4px' })}>
              Holes in One
            </span>
            <span className={css({ fontFamily: 'display', fontSize: '28px', fontWeight: 'bold', color: 'text' })}>
              {personal.holesInOne}
            </span>
          </div>
          <div>
            <span className={css({ fontFamily: 'body', fontSize: '12px', color: '{colors.stone.500}', textTransform: 'uppercase', letterSpacing: 'wider', display: 'block', marginBottom: '4px' })}>
              Sport
            </span>
            <span className={css({ fontFamily: 'body', fontSize: '16px', color: 'text' })}>
              {personal.sport}
            </span>
          </div>
          <div>
            <span className={css({ fontFamily: 'body', fontSize: '12px', color: '{colors.stone.500}', textTransform: 'uppercase', letterSpacing: 'wider', display: 'block', marginBottom: '4px' })}>
              Teams
            </span>
            <span className={css({ fontFamily: 'body', fontSize: '16px', color: 'text' })}>
              {personal.teams.join(', ')}
            </span>
          </div>
          <div>
            <span className={css({ fontFamily: 'body', fontSize: '12px', color: '{colors.stone.500}', textTransform: 'uppercase', letterSpacing: 'wider', display: 'block', marginBottom: '4px' })}>
              Current Focus
            </span>
            <span className={css({ fontFamily: 'body', fontSize: '16px', color: 'text' })}>
              {personal.currentFocus}
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}