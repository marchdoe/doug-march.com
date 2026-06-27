import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Box } from '../../styled-system/jsx'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      minHeight="calc(100vh - 88px)"
      padding="0 6vw"
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '0',
        })}
      >
        <h1
          className={css({
            fontFamily: 'display',
            fontWeight: 'normal',
            fontSize: 'clamp(3rem, 18vw, 16rem)',
            lineHeight: 'tight',
            letterSpacing: 'tight',
            color: 'textSecondary',
            textWrap: 'nowrap',
          })}
        >
          well-
        </h1>
        <h1
          className={css({
            fontFamily: 'display',
            fontWeight: 'bold',
            fontSize: 'clamp(3rem, 18vw, 16rem)',
            lineHeight: 'tight',
            letterSpacing: 'tight',
            color: 'text',
            textWrap: 'nowrap',
          })}
        >
          viewed.
        </h1>
      </div>

      <p
        className={css({
          fontFamily: 'body',
          fontWeight: 'normal',
          fontSize: '14px',
          color: 'textMuted',
          letterSpacing: 'wider',
          marginTop: '48px',
        })}
      >
        — Lily Tomlin
      </p>
    </Box>
  )
}