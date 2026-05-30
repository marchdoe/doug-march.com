import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'

export const Route = createFileRoute('/')({ component: HomePage })

const heroStyle = css({
  padding: '80px 6vw 48px',
  flex: '1',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  '@media (min-width: 768px)': {
    padding: '80px 6vw 48px',
  },
  '@media (max-width: 767px)': {
    padding: '48px 5vw 32px',
  },
})

const displayStyle = css({
  fontFamily: 'display',
  fontSize: 'clamp(48px, 7.5vw, 108px)',
  lineHeight: 'tight',
  letterSpacing: 'normal',
  color: 'accent',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  maxWidth: 'none',
  textWrap: 'balance',
  '@media (max-width: 480px)': {
    fontSize: 'clamp(36px, 12vw, 56px)',
  },
})

const attributionStyle = css({
  padding: '24px 6vw 0',
  textAlign: 'right',
  fontFamily: 'body',
  fontSize: 'clamp(15px, 1.2vw, 18px)',
  fontWeight: 'normal',
  lineHeight: 'normal',
  color: 'textMuted',
  '@media (max-width: 767px)': {
    padding: '20px 5vw 0',
  },
})

const signalSectionStyle = css({
  padding: '64px 6vw 48px',
  borderTop: '1px solid',
  borderColor: 'border',
  '@media (max-width: 767px)': {
    padding: '40px 5vw 40px',
  },
})

const datelineStyle = css({
  fontFamily: 'body',
  fontSize: '10px',
  fontWeight: 'normal',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '32px',
  lineHeight: 'normal',
})

const signalGridStyle = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '32px',
  '@media (max-width: 480px)': {
    gridTemplateColumns: '1fr',
    gap: '24px',
  },
})

const signalCellStyle = css({
  padding: '12px 0',
})

const signalLabelStyle = css({
  fontFamily: 'body',
  fontSize: '9px',
  fontWeight: 'medium',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '8px',
  lineHeight: 'normal',
})

const signalValueStyle = css({
  fontFamily: 'body',
  fontSize: '15px',
  fontWeight: 'bold',
  color: 'text',
  lineHeight: 'snug',
  marginBottom: '4px',
})

const signalDetailStyle = css({
  fontFamily: 'body',
  fontSize: '13px',
  fontWeight: 'normal',
  color: 'textSecondary',
  lineHeight: 'normal',
})

const signalItalicStyle = css({
  fontFamily: 'body',
  fontSize: '13px',
  fontWeight: 'normal',
  fontStyle: 'italic',
  color: 'textMuted',
  lineHeight: 'normal',
})

const moonSymbolStyle = css({
  fontSize: '24px',
  color: 'text',
  marginBottom: '4px',
})

const lossIndicatorStyle = css({
  display: 'inline-block',
  width: '8px',
  height: '8px',
  borderRadius: '9999px',
  background: '{colors.red.400}',
  marginRight: '6px',
  verticalAlign: 'middle',
})

const hnScoreStyle = css({
  fontWeight: 'bold',
  color: 'accent',
})

const footerStyle = css({
  padding: '24px 6vw',
  borderTop: '1px solid',
  borderColor: 'border',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textMuted',
})

const archiveLinkStyle = css({
  color: 'textMuted',
  textDecoration: 'none',
  _hover: {
    color: 'accent',
    textDecoration: 'underline',
  },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

function HomePage() {
  return (
    <>
      <div className={heroStyle}>
        <h1 className={displayStyle}>
          Even though you are on the right track — you will get run over if you just sit there.
        </h1>
      </div>

      <div className={attributionStyle}>
        — Will Rogers, 1935
      </div>

      <section className={signalSectionStyle} aria-label="Signals">
        <div className={datelineStyle}>
          Saturday · Full Moon · 99.9% · May 30
        </div>

        <div className={signalGridStyle}>
          <div className={signalCellStyle}>
            <div className={signalLabelStyle}>Charles Schwab Challenge</div>
            <div className={signalValueStyle}>Jordan Smith −10</div>
            <div className={signalDetailStyle}>
              Scheffler −9 · Homa −8 · Cantlay −7
            </div>
          </div>

          <div className={signalCellStyle}>
            <div className={signalLabelStyle}>Tigers</div>
            <div className={signalValueStyle}>
              <span className={css({ display: 'inline-block', width: '8px', height: '8px', borderRadius: '9999px', backgroundColor: '{colors.red.400}', marginRight: '6px', verticalAlign: 'middle' })} aria-hidden="true" />
              DET 3 · OPP 4
            </div>
            <div className={signalDetailStyle}>May 29 · L</div>
          </div>

          <div className={signalCellStyle}>
            <div className={signalLabelStyle}>Moon Phase</div>
            <div className={moonSymbolStyle}>●</div>
            <div className={signalDetailStyle}>Full Moon · 99.9%</div>
          </div>

          <div className={signalCellStyle}>
            <div className={signalLabelStyle}>Hacker News</div>
            <div className={signalDetailStyle}>
              SQLite is all you need for durable workflows{' '}
              <span className={hnScoreStyle}>546</span>
            </div>
          </div>

          <div className={signalCellStyle}>
            <div className={signalLabelStyle}>Listening</div>
            <div className={signalItalicStyle}>Wet Leg · Guided by Voices</div>
          </div>
        </div>
      </section>

      <footer className={footerStyle}>
        <span>© 2026 Doug March</span>
        <a href="/archive" className={archiveLinkStyle}>Archive</a>
      </footer>
    </>
  )
}