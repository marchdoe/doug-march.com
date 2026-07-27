import { createFileRoute } from '@tanstack/react-router'
import { Box } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { Logo } from '../components/Logo'

export const Route = createFileRoute('/og')({ component: OgCard })

// Capture target — fixed 1200x630, no scroll, no responsiveness.
// Covers the entire shell so the headless screenshot sees only the card.
function OgCard() {
  return (
    <Box
      className={css({
        position: 'fixed',
        inset: '0',
        zIndex: '9999',
        bg: 'bgDeep',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      })}
    >
      <Box
        className={css({
          position: 'relative',
          width: '1200px',
          height: '630px',
          bg: 'bg',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingX: '80px',
          _before: {
            content: '""',
            position: 'absolute',
            inset: '0',
            background:
              'radial-gradient(120% 90% at 88% 8%, rgba(34,160,79,0.32) 0%, rgba(14,74,38,0) 55%), radial-gradient(90% 80% at 12% 100%, rgba(10,46,24,0.6) 0%, rgba(14,74,38,0) 60%)',
            pointerEvents: 'none',
          },
        })}
      >
        <Box
          className={css({
            position: 'absolute',
            top: '56px',
            left: '80px',
            color: 'accentGlow',
            zIndex: '1',
          })}
        >
          <Logo className={css({ height: '48px', width: 'auto', display: 'block' })} />
        </Box>

        <h1
          className={css({
            position: 'relative',
            zIndex: '1',
            fontFamily: 'heading',
            fontWeight: 'bold',
            fontSize: '104px',
            lineHeight: 'tight',
            letterSpacing: 'tight',
            color: 'text',
            maxWidth: '18ch',
            margin: '0',
          })}
        >
          No{' '}
          <span
            className={css({
              color: 'accentGlow',
              textShadow: '0 0 32px rgba(164,230,180,0.35)',
            })}
          >
            snowflake
          </span>{' '}
          ever falls in the wrong place.
        </h1>

        <p
          className={css({
            position: 'relative',
            zIndex: '1',
            marginTop: '32px',
            fontFamily: 'body',
            fontSize: '20px',
            fontWeight: 'medium',
            letterSpacing: 'widest',
            textTransform: 'uppercase',
            color: 'textMuted',
          })}
        >
          — Zen Proverb
        </p>
      </Box>
    </Box>
  )
}