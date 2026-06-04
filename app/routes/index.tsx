import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'

export const Route = createFileRoute('/')({ component: HomePage })

const heroSectionStyles = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '0 6vw',
  position: 'relative',
})

const heroTextStyles = css({
  fontSize: 'clamp(42px, 11vw, 162px)',
  fontWeight: '800',
  lineHeight: '0.88',
  letterSpacing: '-0.02em',
  color: 'text',
  textTransform: 'uppercase',
  fontFamily: 'display',
  maxWidth: '95vw',
  textWrap: 'balance',
})

const heroLineStyles = css({
  display: 'block',
})

const attributionStyles = css({
  marginTop: '32px',
  fontSize: 'clamp(0.75rem, 1.2vw, 0.875rem)',
  fontWeight: '500',
  letterSpacing: '0.12em',
  color: 'textMuted',
  fontVariantCaps: 'all-small-caps',
  fontFamily: 'body',
  lineHeight: '1.4',
})

const signalStripStyles = css({
  display: 'flex',
  alignItems: 'center',
  padding: '0 6vw',
  gap: '32px',
  borderTop: '1px solid',
  borderColor: 'border',
  overflow: 'hidden',
  flexWrap: 'wrap',
})

const signalItemStyles = css({
  fontSize: '0.75rem',
  fontWeight: '400',
  color: 'textMuted',
  fontFamily: 'body',
  letterSpacing: '0.08em',
  lineHeight: '1.4',
  whiteSpace: 'nowrap',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
})

const signalScoreStyles = css({
  fontSize: '0.875rem',
  fontWeight: '600',
  color: 'text',
  fontFamily: 'body',
  fontVariantNumeric: 'tabular-nums',
  letterSpacing: '0.02em',
})

const signalWinStyles = css({
  fontSize: '0.75rem',
  fontWeight: '600',
  color: 'textSecondary',
  fontFamily: 'body',
  marginLeft: '4px',
})

const signalStoryStyles = css({
  fontSize: '0.75rem',
  fontWeight: '400',
  color: 'textMuted',
  fontFamily: 'body',
  fontStyle: 'italic',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  maxWidth: '300px',
})

const signalStoryScoreStyles = css({
  fontSize: '0.75rem',
  fontWeight: '500',
  color: 'textSecondary',
  fontFamily: 'body',
})

const mobileHideStyles = css({
  display: 'none',
  '@media (min-width: 768px)': {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
})

function HomePage() {
  return (
    <>
      <main className={heroSectionStyles}>
        <h1 className={heroTextStyles}>
          <span className={heroLineStyles}>Nothing</span>
          <span className={heroLineStyles}>external to you</span>
          <span className={heroLineStyles}>has any power</span>
          <span className={heroLineStyles}>over you.</span>
        </h1>
        <p className={attributionStyles}>— Ralph Waldo Emerson</p>
      </main>

      <footer className={signalStripStyles} aria-label="Daily signals">
        <div className={signalItemStyles}>
          <span className={signalScoreStyles}>DET 7 · 2</span>
          <span className={signalWinStyles}>W</span>
        </div>

        <div className={signalItemStyles}>
          <span>◑ 76.8%</span>
        </div>

        <div className={mobileHideStyles}>
          <span className={signalStoryStyles}>"They're made out of weights"</span>
          <span className={signalStoryScoreStyles}>755</span>
        </div>

        <div className={signalItemStyles}>
          <span>☀ 14.6h</span>
        </div>

        <div className={css({ marginLeft: 'auto' })}>
          <a
            href="/archive"
            className={css({
              fontSize: '0.75rem',
              color: 'textMuted',
              textDecoration: 'none',
              letterSpacing: '0.08em',
              fontFamily: 'body',
              padding: '10px 0',
              _hover: { color: 'text' },
              _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px' },
              transition: 'color 0.15s ease',
            })}
          >
            Archive
          </a>
        </div>
      </footer>
    </>
  )
}