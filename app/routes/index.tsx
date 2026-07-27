import { createFileRoute } from '@tanstack/react-router'
import { Box } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'

export const Route = createFileRoute('/')({ component: HomePage })

// Specimen / poster archetype — the home page IS the hero phrase.
// No project listing, no featured section, no experiments here.
function HomePage() {
  return (
    <Box
      as="main"
      className={css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingX: { base: '6', md: '12', lg: '24' },
        paddingY: { base: '10', md: '16', lg: '22' },
        minHeight: { base: '70vh', md: '78vh' },
      })}
    >
      <h1
        className={css({
          fontFamily: 'heading',
          fontWeight: 'bold',
          fontSize: 'clamp(48px, 8.5vw, 132px)',
          lineHeight: 'tight',
          letterSpacing: 'tight',
          color: 'text',
          maxWidth: '22ch',
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
          marginTop: { base: '6', md: '10' },
          fontFamily: 'body',
          fontSize: 'sm',
          fontWeight: 'medium',
          letterSpacing: 'widest',
          textTransform: 'uppercase',
          color: 'textMuted',
        })}
      >
        — Zen Proverb
      </p>
    </Box>
  )
}