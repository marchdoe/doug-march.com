import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const canvasCss = css({
  display: 'grid',
  gridTemplateColumns: { base: '1fr', md: 'repeat(12, 1fr)' },
  columnGap: '24px',
  padding: '0 4vw',
  paddingTop: '48px',
  paddingBottom: '48px',
})

const eyebrowCss = css({
  fontFamily: 'body',
  fontSize: '10px',
  textTransform: 'uppercase',
  letterSpacing: '0.10em',
  color: 'textMuted',
  marginBottom: '16px',
  paddingBottom: '8px',
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderBottomColor: 'border',
})

function AboutPage() {
  return (
    <div className={canvasCss}>
      {/* Identity — large lede */}
      <div className={css({ gridColumn: { base: '1 / -1', md: '1 / 9' }, marginBottom: '48px' })}>
        <div className={eyebrowCss}>About</div>
        <h1 className={css({
          fontFamily: 'display',
          fontWeight: 'bold',
          fontSize: 'clamp(28px, 3vw, 44px)',
          lineHeight: 'snug',
          letterSpacing: 'tight',
          color: 'text',
          marginBottom: '24px',
          maxWidth: '20ch',
        })}>
          {identity.name}
        </h1>
        <p className={css({
          fontFamily: 'display',
          fontSize: 'clamp(18px, 2vw, 24px)',
          lineHeight: 'normal',
          color: 'textSecondary',
          marginBottom: '16px',
        })}>
          {identity.role}
        </p>
        <p className={css({
          fontFamily: 'body',
          fontSize: '16px',
          lineHeight: 'normal',
          color: 'textSecondary',
          maxWidth: '65ch',
        })}>
          {identity.statement}
        </p>
      </div>

      {/* Capabilities — right rail */}
      <div className={css({
        gridColumn: { base: '1 / -1', md: '9 / 13' },
        borderLeftWidth: { base: '0', md: '1px' },
        borderLeftStyle: 'solid',
        borderLeftColor: 'border',
        paddingLeft: { base: '0', md: '24px' },
        marginBottom: '48px',
      })}>
        <div className={eyebrowCss}>Capabilities</div>
        <ul className={css({ listStyle: 'none', padding: '0' })}>
          {capabilities.map((c, i) => (
            <li key={i} className={css({
              fontFamily: 'body',
              fontSize: '13px',
              lineHeight: 'normal',
              color: 'textSecondary',
              paddingTop: '4px',
              paddingBottom: '4px',
              borderBottomWidth: '1px',
              borderBottomStyle: 'solid',
              borderBottomColor: 'border',
            })}>
              {c}
            </li>
          ))}
        </ul>
      </div>

      {/* Timeline — full width */}
      <div className={css({ gridColumn: '1 / -1', marginBottom: '48px' })}>
        <div className={eyebrowCss}>Experience</div>
        <div className={css({ display: 'flex', flexDirection: 'column' })}>
          {timeline.map((entry, i) => (
            <div key={i} className={css({
              display: 'grid',
              gridTemplateColumns: { base: '1fr', md: '140px 200px 1fr' },
              columnGap: '24px',
              paddingTop: '10px',
              paddingBottom: '10px',
              borderBottomWidth: '1px',
              borderBottomStyle: 'solid',
              borderBottomColor: 'border',
              alignItems: 'baseline',
            })}>
              <span className={css({
                fontFamily: 'mono',
                fontSize: '12px',
                color: 'textMuted',
                minWidth: '120px',
                fontVariantNumeric: 'tabular-nums',
              })}>
                {entry.year}
              </span>
              <span className={css({
                fontFamily: 'body',
                fontWeight: 'semibold',
                fontSize: '14px',
                color: 'text',
              })}>
                {entry.role}
              </span>
              <div>
                <span className={css({
                  fontFamily: 'body',
                  fontSize: '14px',
                  color: 'accent',
                })}>
                  {entry.company}
                </span>
                <span className={css({
                  fontFamily: 'body',
                  fontSize: '13px',
                  color: 'textMuted',
                  marginLeft: '12px',
                  display: { base: 'block', md: 'inline' },
                })}>
                  {entry.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className={css({ gridColumn: { base: '1 / -1', md: '1 / 7' }, marginBottom: '48px' })}>
        <div className={eyebrowCss}>Education</div>
        <div className={css({
          fontFamily: 'body',
          fontSize: '14px',
          lineHeight: 'normal',
          color: 'textSecondary',
        })}>
          <div className={css({ fontWeight: 'semibold', color: 'text', marginBottom: '4px' })}>{education.school}</div>
          <div>{education.degree}, {education.concentration}</div>
          <div className={css({ fontFamily: 'mono', fontSize: '12px', color: 'textMuted', marginTop: '4px' })}>{education.years}</div>
        </div>
      </div>

      {/* Personal */}
      <div className={css({ gridColumn: { base: '1 / -1', md: '7 / 13' }, marginBottom: '48px', borderLeftWidth: { base: '0', md: '1px' }, borderLeftStyle: 'solid', borderLeftColor: 'border', paddingLeft: { base: '0', md: '24px' } })}>
        <div className={eyebrowCss}>Personal</div>
        <div className={css({ display: 'grid', gridTemplateColumns: { base: '1fr', sm: '1fr 1fr' }, gap: '12px' })}>
          <div>
            <div className={css({ fontFamily: 'mono', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.10em', color: 'textMuted', marginBottom: '4px' })}>Holes in One</div>
            <div className={css({ fontFamily: 'display', fontWeight: 'bold', fontSize: '28px', color: 'text' })}>{personal.holesInOne}</div>
          </div>
          <div>
            <div className={css({ fontFamily: 'mono', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.10em', color: 'textMuted', marginBottom: '4px' })}>Sport</div>
            <div className={css({ fontFamily: 'body', fontSize: '14px', color: 'textSecondary' })}>{personal.sport}</div>
          </div>
          <div>
            <div className={css({ fontFamily: 'mono', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.10em', color: 'textMuted', marginBottom: '4px' })}>Teams</div>
            <div className={css({ fontFamily: 'body', fontSize: '14px', color: 'textSecondary' })}>{personal.teams.join(', ')}</div>
          </div>
          <div>
            <div className={css({ fontFamily: 'mono', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.10em', color: 'textMuted', marginBottom: '4px' })}>Current Focus</div>
            <div className={css({ fontFamily: 'body', fontSize: '14px', color: 'textSecondary' })}>{personal.currentFocus}</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={css({
        gridColumn: '1 / -1',
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: '16px',
        borderTopWidth: '1px',
        borderTopStyle: 'solid',
        borderTopColor: 'border',
        flexWrap: 'wrap',
        gap: '8px',
      })}>
        <span className={css({ fontFamily: 'mono', fontSize: '11px', color: 'textMuted' })}>© 2026 Doug March</span>
        <a href="/archive" className={css({ fontFamily: 'mono', fontSize: '11px', color: 'textMuted', textDecoration: 'none', _hover: { color: 'accent', textDecoration: 'underline' }, _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' }, padding: '8px 0' })}>Archive</a>
      </div>
    </div>
  )
}