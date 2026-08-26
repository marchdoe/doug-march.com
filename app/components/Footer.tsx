import { css } from '../../styled-system/css'
import { identity } from '../content/about'

const linkStyle = css({
  fontFamily: 'mono',
  fontSize: 'xs',
  letterSpacing: 'wide',
  color: 'textMuted',
  minHeight: '44px',
  display: 'flex',
  alignItems: 'center',
  _hover: { color: 'accentLight' },
})

export function Footer() {
  return (
    <section
      id="contact"
      className={css({ padding: { base: '0 20px 40px', md: '0 5vw 64px' } })}
    >
      <div
        className={css({
          border: '1px solid',
          borderColor: 'border',
          padding: '32px',
          display: 'grid',
          gridTemplateColumns: { base: '1fr', md: '1fr auto' },
          gap: '16px',
          alignItems: 'start',
        })}
      >
        <div>
          <div
            className={css({
              fontFamily: 'mono',
              fontSize: '2xs',
              letterSpacing: 'widest',
              textTransform: 'uppercase',
              color: 'accent',
              marginBottom: '12px',
            })}
          >
            POSTMORTEM
          </div>
          <p
            className={css({
              fontSize: 'sm',
              color: 'textSecondary',
              maxWidth: '60ch',
              lineHeight: 'normal',
            })}
          >
            Root cause: none. System nominal. Rebuilt nightly by design — today's incident report
            is the design. Contact: reach {identity.name} directly for work inquiries.
          </p>
          <div className={css({ marginTop: '24px', display: 'flex', gap: '32px', flexWrap: 'wrap' })}>
            <a href="mailto:hello@doug-march.com" className={linkStyle}>
              EMAIL
            </a>
            <a href="https://github.com/dougmarch" target="_blank" rel="noopener" className={linkStyle}>
              GITHUB
            </a>
          </div>
        </div>
        <div
          className={css({
            textAlign: { base: 'left', md: 'right' },
            fontFamily: 'mono',
            fontSize: '2xs',
            color: 'textMuted',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          })}
        >
          <span>STATUS: NOMINAL</span>
          <span className={css({ color: 'neutral.300' })}>{identity.role.toUpperCase()}</span>
          <span>© {identity.name}</span>
        </div>
      </div>
    </section>
  )
}