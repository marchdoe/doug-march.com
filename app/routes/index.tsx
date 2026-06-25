import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Box } from '../../styled-system/jsx'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <Box
      className={css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: { base: '4vh 5vw', md: '5vh 4vw' },
        paddingRight: { md: '2vw' },
        minHeight: { base: '70vh', md: '78vh' },
        position: 'relative',
        userSelect: 'none',
      })}
    >
      {/* Line 1: WINNERS */}
      <h1
        className={css({
          fontFamily: 'display',
          fontWeight: 'bold',
          fontSize: 'clamp(80px, 22vw, 360px)',
          lineHeight: 'tight',
          letterSpacing: 'tight',
          color: 'text',
          textTransform: 'uppercase',
          margin: 0,
          padding: 0,
          textWrap: 'nowrap',
        })}
      >
        Winners
      </h1>

      {/* Line 2: DON'T QUIT. */}
      <p
        className={css({
          fontFamily: 'display',
          fontWeight: 'bold',
          fontSize: 'clamp(64px, 18vw, 280px)',
          lineHeight: 'tight',
          letterSpacing: 'tight',
          color: 'accent',
          textTransform: 'uppercase',
          margin: 0,
          padding: 0,
          textWrap: 'nowrap',
        })}
      >
        Don't Quit.
      </p>

      {/* Hairline rule */}
      <div
        className={css({
          width: '100%',
          height: '1px',
          background: 'border',
          marginTop: { base: '16px', md: '32px' },
          marginBottom: { base: '16px', md: '32px' },
        })}
        role="separator"
      />

      {/* Line 3: THAT'S WHY THEY WIN. */}
      <p
        className={css({
          fontFamily: 'display',
          fontWeight: 'bold',
          fontSize: 'clamp(28px, 10vw, 160px)',
          lineHeight: 'snug',
          letterSpacing: 'wide',
          color: 'text',
          textTransform: 'uppercase',
          margin: 0,
          padding: 0,
        })}
      >
        That's why they win.
      </p>

      {/* Attribution */}
      <p
        className={css({
          fontFamily: 'body',
          fontSize: '12px',
          letterSpacing: 'wider',
          color: '{colors.neutral.600}',
          textTransform: 'uppercase',
          marginTop: { base: '16px', md: '24px' },
        })}
      >
        — Unknown
      </p>

      {/* Subtle role line */}
      <p
        className={css({
          fontFamily: 'body',
          fontSize: '13px',
          letterSpacing: 'wider',
          color: 'textMuted',
          textTransform: 'uppercase',
          position: { md: 'absolute' },
          bottom: { md: '4vh' },
          right: { md: '4vw' },
          marginTop: { base: '32px', md: '0' },
        })}
      >
        Doug March · Product Designer & Developer
      </p>
    </Box>
  )
}