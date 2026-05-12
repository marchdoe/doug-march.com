import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <div
      className={css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingLeft: '6vw',
        paddingRight: '6vw',
      })}
    >
      <div
        className={css({
          width: '100%',
          maxWidth: 'none',
        })}
      >
        <h1
          className={css({
            fontFamily: 'display',
            textTransform: 'uppercase',
            lineHeight: 'tight',
            margin: 0,
            padding: 0,
          })}
        >
          <span
            className={css({
              display: 'block',
              fontSize: 'clamp(52px, 7.8vw, 112px)',
              letterSpacing: '0.12em',
              color: 'textMuted',
              fontWeight: 'bold',
            })}
          >
            Put on the
          </span>
          <span
            className={css({
              display: 'block',
              fontSize: 'clamp(88px, 13.5vw, 194px)',
              letterSpacing: '0.08em',
              color: 'accent',
              fontWeight: 'bold',
              textWrap: 'balance',
            })}
          >
            Glasses.
          </span>
        </h1>
        <p
          className={css({
            marginTop: '32px',
            fontFamily: 'body',
            fontSize: '13px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'textSubtle',
            lineHeight: 'normal',
          })}
        >
          — They Live, 1988
        </p>
        <p
          className={css({
            marginTop: '16px',
            fontFamily: 'body',
            fontSize: '14px',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'textDim',
            lineHeight: 'normal',
          })}
        >
          Doug March — Product Designer &amp; Developer
        </p>
      </div>
    </div>
  )
}