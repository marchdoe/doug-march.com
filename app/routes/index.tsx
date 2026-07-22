import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Box } from '../../styled-system/jsx'
import { identity } from '../content/about'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <Box
      className={css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: { base: '8', md: 'clamp(2rem, 5vw, 5rem)' },
        position: 'relative',
        overflow: 'hidden',
      })}
    >
      <p
        className={css({
          fontFamily: 'body',
          fontWeight: 'bold',
          fontSize: 'xs',
          letterSpacing: 'wider',
          textTransform: 'uppercase',
          color: 'textMuted',
          marginBottom: 'clamp(1.5rem, 4vh, 2.75rem)',
        })}
      >
        {identity.name} — {identity.role}
      </p>

      <h1
        className={css({
          fontFamily: 'display',
          fontWeight: 'bold',
          fontSize: 'clamp(3.5rem, 12vw, 12.5rem)',
          lineHeight: 'tight',
          letterSpacing: 'tight',
          textTransform: 'uppercase',
          color: 'text',
          margin: '0',
        })}
      >
        <span className={css({ display: 'block' })}>No Choice</span>
        <span className={css({ display: 'block' })}>But To</span>
        <span
          className={css({
            display: 'block',
            color: 'accent',
            textShadow: '0 0 40px {colors.accentGlow}',
          })}
        >
          Live It
        </span>
      </h1>

      <p
        className={css({
          marginTop: 'clamp(2rem, 5vh, 4rem)',
          fontFamily: 'body',
          fontWeight: 'medium',
          fontSize: 'xs',
          letterSpacing: 'wider',
          textTransform: 'uppercase',
          color: 'textMuted',
          display: 'flex',
          alignItems: 'baseline',
          gap: '3',
          flexWrap: 'wrap',
        })}
      >
        <span className={css({ color: 'textSecondary' })}>— Kamal Ravikant</span>
        <span>On what comes from within</span>
      </p>
    </Box>
  )
}