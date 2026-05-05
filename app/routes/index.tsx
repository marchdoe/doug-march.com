import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <main
      className={css({
        position: 'relative',
        minHeight: '100vh',
        background: 'bg',
        overflow: 'hidden',
        paddingTop: { base: '88px', md: '96px' },
        paddingBottom: { base: '72px', md: '88px' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      })}
    >
      {/* Eyebrow — flush right at 6vw, the source + date label */}
      <div
        className={css({
          paddingRight: '6vw',
          paddingLeft: '6vw',
          marginBottom: { base: '24px', md: '32px' },
          textAlign: 'right',
          fontFamily: 'body',
          fontSize: '12px',
          color: 'warm.400',
          letterSpacing: '0.20em',
          textTransform: 'uppercase',
        })}
      >
        Guided by Voices · May 5
      </div>

      {/* Hero stack — left / center / right cascade */}
      <h1
        className={css({
          margin: '0',
          padding: '0',
          fontFamily: 'display',
          color: 'hero',
          lineHeight: '0.86',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        })}
      >
        <span
          className={css({
            display: 'flex',
            justifyContent: 'flex-start',
            paddingLeft: '6vw',
            paddingRight: '6vw',
          })}
        >
          <span
            className={css({
              fontWeight: '800',
              letterSpacing: '-0.02em',
              fontSize: 'clamp(76px, 26vw, 380px)',
              lineHeight: '0.86',
              textTransform: 'uppercase',
              display: 'inline-block',
            })}
          >
            Guided
          </span>
        </span>
        <span
          className={css({
            display: 'flex',
            justifyContent: 'center',
            paddingX: '6vw',
            marginY: { base: '-4px', md: '-12px' },
          })}
        >
          <span
            className={css({
              fontWeight: '300',
              letterSpacing: '0.20em',
              fontSize: 'clamp(34px, 8vw, 115px)',
              lineHeight: '1',
              textTransform: 'uppercase',
              color: 'accent',
              display: 'inline-block',
            })}
          >
            By
          </span>
        </span>
        <span
          className={css({
            display: 'flex',
            justifyContent: 'flex-end',
            paddingLeft: '6vw',
            paddingRight: '6vw',
          })}
        >
          <span
            className={css({
              fontWeight: '800',
              letterSpacing: '-0.02em',
              fontSize: 'clamp(76px, 26vw, 380px)',
              lineHeight: '0.86',
              textTransform: 'uppercase',
              display: 'inline-block',
            })}
          >
            Voices
          </span>
        </span>
      </h1>

      {/* Attribution — quote fragment, centered, italic, small */}
      <p
        className={css({
          marginTop: { base: '28px', md: '40px' },
          paddingX: '6vw',
          textAlign: 'center',
          fontFamily: 'body',
          fontStyle: 'italic',
          fontSize: { base: '13px', md: '14px' },
          lineHeight: '1.5',
          color: 'textMuted',
          maxWidth: '70ch',
          marginX: 'auto',
        })}
      >
        “during times of adversity our true character will show”
      </p>
    </main>
  )
}