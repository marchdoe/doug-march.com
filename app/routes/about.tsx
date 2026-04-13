import { createFileRoute } from '@tanstack/react-router'
import { timeline, capabilities, education } from '../content/timeline'
import { identity, personal } from '../content/about'
import { css } from '../../styled-system/css'

export const Route = createFileRoute('/about')({ component: AboutPage })

const sectionLabelText = css({
  fontFamily: 'body',
  fontWeight: '400',
  color: 'text.muted',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
})

function SectionLabel({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
      <span className={sectionLabelText} style={{ fontSize: '9px', whiteSpace: 'nowrap' }}>
        {label}
      </span>
      <div style={{ flex: '1', height: '1px', background: '#C8D1C2' }} />
    </div>
  )
}

function AboutPage() {
  return (
    <div>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>

        {/* IDENTITY HEADER */}
        <section style={{ paddingTop: '96px', paddingBottom: '64px', borderBottom: '1px solid #C8D1C2' }}>
          <p
            className={css({
              fontFamily: 'body',
              fontWeight: '400',
              color: 'text.muted',
              letterSpacing: 'widest',
              textTransform: 'uppercase',
              margin: '0 0 16px',
            })}
            style={{ fontSize: '9px' }}
          >
            About
          </p>

          <h1
            className={css({
              fontFamily: 'heading',
              fontWeight: '800',
              fontSize: '2xl',
              lineHeight: 'tight',
              letterSpacing: 'tight',
              color: 'text',
              margin: '0 0 12px',
            })}
          >
            {identity.name}
          </h1>

          <p
            className={css({
              fontFamily: 'body',
              fontWeight: '400',
              color: 'text.secondary',
              letterSpacing: 'wide',
              textTransform: 'uppercase',
              margin: '0 0 48px',
            })}
            style={{ fontSize: '14px' }}
          >
            {identity.role}
          </p>

          <p
            className={css({
              fontFamily: 'body',
              fontWeight: '300',
              color: 'text.secondary',
              lineHeight: 'normal',
              margin: '0',
            })}
            style={{ fontSize: '18px', maxWidth: '640px' }}
          >
            {identity.statement}
          </p>
        </section>

        {/* EXPERIENCE */}
        <section style={{ paddingTop: '80px', paddingBottom: '80px', borderBottom: '1px solid #C8D1C2' }}>
          <SectionLabel label="Experience" />

          {timeline.map((entry, i) => (
            <div
              key={`${entry.year}-${entry.company}-${i}`}
              style={{
                display: 'grid',
                gridTemplateColumns: '140px 1fr',
                gap: '32px',
                padding: '20px 0',
                borderBottom: i < timeline.length - 1 ? '1px solid #C8D1C2' : 'none',
                alignItems: 'start',
              }}
            >
              <span
                className={css({ fontFamily: 'mono', color: 'text.muted', letterSpacing: 'wide' })}
                style={{ fontSize: '12px', paddingTop: '2px', display: 'block' }}
              >
                {entry.year}
                {entry.current && (
                  <span
                    className={css({
                      fontFamily: 'mono',
                      color: 'accent',
                      display: 'block',
                      letterSpacing: 'widest',
                      textTransform: 'uppercase',
                    })}
                    style={{ fontSize: '8px', marginTop: '4px' }}
                  >
                    Current
                  </span>
                )}
              </span>

              <div>
                <p className={css({ fontFamily: 'body', fontWeight: '500', color: 'text', fontSize: 'sm', margin: '0 0 2px' })}>
                  {entry.role}
                </p>
                <p
                  className={css({ fontFamily: 'body', fontWeight: '400', color: 'text.secondary', margin: '0 0 10px' })}
                  style={{ fontSize: '13px' }}
                >
                  {entry.company}
                </p>
                <p
                  className={css({ fontFamily: 'body', fontWeight: '300', color: 'text.muted', lineHeight: 'normal', margin: '0' })}
                  style={{ fontSize: '14px', maxWidth: '560px' }}
                >
                  {entry.description}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* EDUCATION */}
        <section style={{ paddingTop: '64px', paddingBottom: '64px', borderBottom: '1px solid #C8D1C2' }}>
          <SectionLabel label="Education" />

          <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '32px', alignItems: 'start' }}>
            <span
              className={css({ fontFamily: 'mono', color: 'text.muted', letterSpacing: 'wide' })}
              style={{ fontSize: '12px' }}
            >
              {education.years}
            </span>
            <div>
              <p className={css({ fontFamily: 'body', fontWeight: '500', color: 'text', fontSize: 'sm', margin: '0 0 2px' })}>
                {education.degree}
              </p>
              <p
                className={css({ fontFamily: 'body', fontWeight: '400', color: 'text.secondary', margin: '0 0 4px' })}
                style={{ fontSize: '13px' }}
              >
                {education.concentration}
              </p>
              <p
                className={css({ fontFamily: 'body', fontWeight: '300', color: 'text.muted', margin: '0' })}
                style={{ fontSize: '13px' }}
              >
                {education.school}
              </p>
            </div>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section style={{ paddingTop: '64px', paddingBottom: '64px', borderBottom: '1px solid #C8D1C2' }}>
          <SectionLabel label="Capabilities" />

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {capabilities.map((cap) => (
              <span
                key={cap}
                className={css({
                  fontFamily: 'body',
                  fontWeight: '400',
                  color: 'text.secondary',
                  background: 'bg.nav',
                  letterSpacing: 'wider',
                  textTransform: 'uppercase',
                })}
                style={{ fontSize: '9px', padding: '6px 10px', border: '1px solid #C8D1C2' }}
              >
                {cap}
              </span>
            ))}
          </div>
        </section>

        {/* PERSONAL */}
        <section style={{ paddingTop: '64px', paddingBottom: '96px' }}>
          <SectionLabel label="Outside Work" />

          <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '32px', rowGap: '20px' }}>
            <span
              className={css({ fontFamily: 'mono', color: 'text.muted', letterSpacing: 'wider' })}
              style={{ fontSize: '11px', paddingTop: '2px' }}
            >
              Sport
            </span>
            <span className={css({ fontFamily: 'body', fontWeight: '400', color: 'text.secondary', fontSize: 'sm' })}>
              {personal.sport}
            </span>

            <span
              className={css({ fontFamily: 'mono', color: 'text.muted', letterSpacing: 'wider' })}
              style={{ fontSize: '11px', paddingTop: '2px' }}
            >
              Teams
            </span>
            <span className={css({ fontFamily: 'body', fontWeight: '400', color: 'text.secondary', fontSize: 'sm' })}>
              {personal.teams.join(', ')}
            </span>

            <span
              className={css({ fontFamily: 'mono', color: 'text.muted', letterSpacing: 'wider' })}
              style={{ fontSize: '11px', paddingTop: '2px' }}
            >
              Holes in One
            </span>
            <span className={css({ fontFamily: 'body', fontWeight: '400', color: 'text.secondary', fontSize: 'sm' })}>
              {personal.holesInOne}
            </span>

            <span
              className={css({ fontFamily: 'mono', color: 'text.muted', letterSpacing: 'wider' })}
              style={{ fontSize: '11px', paddingTop: '2px' }}
            >
              Current Focus
            </span>
            <span className={css({ fontFamily: 'body', fontWeight: '400', color: 'text.secondary', fontSize: 'sm' })}>
              {personal.currentFocus}
            </span>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #C8D1C2', background: '#E4E9DF', paddingTop: '28px', paddingBottom: '28px' }}>
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '0 48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span
            className={css({ fontFamily: 'mono', color: 'text.muted', letterSpacing: 'wider' })}
            style={{ fontSize: '11px' }}
          >
            DET &nbsp; PIS 133–121 W &nbsp;·&nbsp; TIG 8–2 W
          </span>

          <span
            className={css({ fontFamily: 'body', fontWeight: '300', color: 'text.muted' })}
            style={{ fontSize: '11px', letterSpacing: '0.05em' }}
          >
            doug-march.com &nbsp;©&nbsp; 2026
          </span>

          <a
            href="/archive"
            className={css({
              fontFamily: 'body',
              fontWeight: '300',
              color: 'text.muted',
              textDecoration: 'none',
              transition: 'color 200ms ease',
              _hover: { color: 'text.secondary', textDecoration: 'none' },
            })}
            style={{ fontSize: '11px', letterSpacing: '0.05em' }}
          >
            Archive
          </a>
        </div>
      </footer>
    </div>
  )
}