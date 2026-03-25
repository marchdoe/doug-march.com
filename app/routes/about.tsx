import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

function SectionLabel({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
      <span className={css({
        fontFamily: 'oswald',
        fontSize: 'xs',
        fontWeight: '400',
        color: 'textRightMuted',
        letterSpacing: 'widest',
        textTransform: 'uppercase',
      })}>
        {label}
      </span>
      <div style={{ flex: 1, height: '1px', background: '#EAE6D2' }} />
    </div>
  )
}

function AboutPage() {
  return (
    <div style={{ padding: '52px', paddingBottom: '96px' }}>

      {/* Identity statement */}
      <div style={{ marginBottom: '52px' }}>
        <p className={css({
          fontFamily: 'spectral',
          fontSize: 'md',
          fontWeight: '300',
          fontStyle: 'italic',
          color: 'textRightSecondary',
          lineHeight: 'loose',
          letterSpacing: 'normal',
        })} style={{ maxWidth: '480px' }}>
          {identity.statement}
        </p>
      </div>

      {/* Experience */}
      <div style={{ marginBottom: '48px' }}>
        <SectionLabel label="Experience" />
        {timeline.map(entry => (
          <div
            key={`${entry.year}-${entry.company}`}
            style={{ borderBottom: '1px solid #EAE6D2', paddingTop: '16px', paddingBottom: '16px' }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '56px 1fr', gap: '24px', alignItems: 'start' }}>
              <span className={css({
                fontFamily: 'oswald',
                fontSize: 'xs',
                fontWeight: '400',
                color: 'textRightMuted',
                fontVariantNumeric: 'tabular-nums',
                paddingTop: '2px',
              })}>
                {entry.year}
              </span>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className={css({
                    fontFamily: 'oswald',
                    fontSize: 'base',
                    fontWeight: '500',
                    color: 'textRight',
                    letterSpacing: 'normal',
                  })}>
                    {entry.role}
                  </span>
                  {entry.current && (
                    <span className={css({
                      fontFamily: 'oswald',
                      fontSize: 'xs',
                      fontWeight: '400',
                      color: 'accentOpeningDay',
                      letterSpacing: 'widest',
                      textTransform: 'uppercase',
                    })}>
                      now
                    </span>
                  )}
                </div>
                <div className={css({
                  fontFamily: 'oswald',
                  fontSize: 'xs',
                  fontWeight: '400',
                  color: 'textRightSecondary',
                  letterSpacing: 'wide',
                  textTransform: 'uppercase',
                })} style={{ marginTop: '3px' }}>
                  {entry.company}
                </div>
                {entry.description && (
                  <p className={css({
                    fontFamily: 'spectral',
                    fontSize: 'sm',
                    fontWeight: '300',
                    color: 'textRightSecondary',
                    lineHeight: 'normal',
                  })} style={{ marginTop: '8px', maxWidth: '420px' }}>
                    {entry.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}

        {education && (
          <div style={{ paddingTop: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '56px 1fr', gap: '24px', alignItems: 'start' }}>
              <span className={css({
                fontFamily: 'oswald',
                fontSize: 'xs',
                color: 'textRightMuted',
                fontVariantNumeric: 'tabular-nums',
                paddingTop: '2px',
              })}>
                {education.years}
              </span>
              <div>
                <div className={css({
                  fontFamily: 'oswald',
                  fontSize: 'base',
                  fontWeight: '500',
                  color: 'textRight',
                })}>
                  {education.degree}
                </div>
                <div className={css({
                  fontFamily: 'oswald',
                  fontSize: 'xs',
                  color: 'textRightSecondary',
                  letterSpacing: 'wide',
                  textTransform: 'uppercase',
                })} style={{ marginTop: '3px' }}>
                  {education.school}
                </div>
                {education.concentration && (
                  <div className={css({
                    fontFamily: 'oswald',
                    fontSize: 'xs',
                    color: 'textRightMuted',
                    letterSpacing: 'wide',
                  })} style={{ marginTop: '2px' }}>
                    {education.concentration}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Capabilities */}
      <div style={{ marginBottom: '48px' }}>
        <SectionLabel label="Capabilities" />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '16px' }}>
          {capabilities.map(cap => (
            <span
              key={cap}
              className={css({
                fontFamily: 'oswald',
                fontSize: 'xs',
                fontWeight: '400',
                color: 'textRightSecondary',
                letterSpacing: 'wide',
                textTransform: 'uppercase',
              })}
              style={{
                padding: '4px 10px',
                border: '1px solid #EAE6D2',
                borderRadius: '2px',
              }}
            >
              {cap}
            </span>
          ))}
        </div>
      </div>

      {/* Personal */}
      <div>
        <SectionLabel label="Personal" />
        <div style={{ marginTop: '8px' }}>
          {personal.holesInOne > 0 && (
            <PersonalRow label="Holes in one" value={String(personal.holesInOne)} />
          )}
          <PersonalRow label="Sport" value={personal.sport} />
          <PersonalRow label="Teams" value={personal.teams.join(', ')} />
          <PersonalRow label="Current focus" value={personal.currentFocus} />
        </div>
      </div>
    </div>
  )
}

function PersonalRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '130px 1fr',
        gap: '16px',
        paddingTop: '12px',
        paddingBottom: '12px',
        borderBottom: '1px solid #EAE6D2',
        alignItems: 'baseline',
      }}
    >
      <span className={css({
        fontFamily: 'oswald',
        fontSize: 'xs',
        fontWeight: '400',
        color: 'textRightMuted',
        letterSpacing: 'widest',
        textTransform: 'uppercase',
      })}>
        {label}
      </span>
      <span className={css({
        fontFamily: 'spectral',
        fontSize: 'sm',
        fontWeight: '300',
        color: 'textRightSecondary',
        lineHeight: 'normal',
      })}>
        {value}
      </span>
    </div>
  )
}