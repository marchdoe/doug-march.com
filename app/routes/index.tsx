import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <div
      className={css({
        display: 'grid',
        gridTemplateRows: '1fr auto',
        gridTemplateColumns: '1fr',
        minHeight: 'calc(100vh - 60px)',
        width: '100%',
      })}
    >
      {/* Hero */}
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          padding: '0 8vw',
          minHeight: '78vh',
        })}
      >
        <div>
          <h1
            className={css({
              fontFamily: 'display',
              fontWeight: 'bold',
              fontSize: 'clamp(48px, 7.5vw, 110px)',
              lineHeight: 'tight',
              letterSpacing: 'tight',
              color: '{colors.ink.50}',
              maxWidth: '82vw',
              textWrap: 'balance',
            })}
          >
            the melancholy of{' '}
            <br className={css({ display: { base: 'none', md: 'block' } })} />
            <span>slaying{' '}</span>
            <span
              className={css({
                color: 'accent',
                textShadow: '0 0 32px rgba(251,191,36,0.25)',
              })}
            >
              monsters
            </span>
          </h1>

          <p
            className={css({
              fontFamily: 'body',
              fontSize: '12px',
              fontWeight: '400',
              color: '{colors.ink.600}',
              letterSpacing: '0.05em',
              marginTop: '24px',
            })}
          >
            — HN / MIT Press Reader · ↑115
          </p>
        </div>
      </div>

      {/* Signal strip */}
      <div
        className={css({
          borderTop: '1px solid',
          borderColor: 'border',
          padding: '24px 8vw 32px',
          width: '100%',
        })}
      >
        <div
          className={css({
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px 0',
            alignItems: 'center',
            fontFamily: 'body',
            fontSize: '12px',
            lineHeight: '1.3',
            color: '{colors.ink.500}',
            letterSpacing: '0.02em',
          })}
        >
          <span>
            DET{' '}
            <span className={css({ color: '{colors.ink.400}' })}>6</span>
            {' · '}
            MIL{' '}
            <span className={css({ color: '{colors.ink.400}' })}>10</span>
          </span>
          <span className={css({ margin: '0 10px', opacity: 0.4 })}>●</span>
          <span>
            Charles Schwab Challenge · tee time pending
          </span>
          <span className={css({ margin: '0 10px', opacity: 0.4 })}>●</span>
          <span className={css({ color: '{colors.amber.600}' })}>
            ◐ 88%
          </span>
          <span className={css({ marginLeft: '6px' })}>waxing gibbous</span>
          <span className={css({ margin: '0 10px', opacity: 0.4 })}>●</span>
          <span>14.5h ☀</span>
          <span className={css({ margin: '0 10px', opacity: 0.4 })}>●</span>
          <span className={css({ color: '{colors.ink.600}' })}>
            Wet Leg · The War on Drugs · My Morning Jacket
          </span>
        </div>
      </div>
    </div>
  )
}