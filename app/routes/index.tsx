import { createFileRoute } from '@tanstack/react-router'
import { Box } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { HeroNav } from '../components/HeroNav'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <Box
      flex="1"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="flex-start"
      paddingY={{ base: '6vh', md: '6vh' }}
    >
      <p
        className={css({
          fontSize: 'xs',
          letterSpacing: 'widest',
          textTransform: 'uppercase',
          color: 'textSecondary',
          fontWeight: 'bold',
          marginBottom: { base: '4', md: '8' },
          display: 'flex',
          alignItems: 'center',
          gap: '3',
        })}
      >
        <span
          className={css({
            width: { base: '28px', md: '56px' },
            height: '2px',
            background: 'accent',
            display: 'inline-block',
          })}
        />
        Naval Ravikant · Daily manifesto
      </p>

      <h1
        className={css({
          fontFamily: 'display',
          fontWeight: '900',
          textTransform: 'uppercase',
          lineHeight: 'tight',
          letterSpacing: 'tight',
          fontSize: 'clamp(72px, 12vw, 168px)',
          color: 'text',
          maxWidth: '100%',
        })}
      >
        <span className={css({ display: 'block' })}>It's your</span>
        <span className={css({ display: 'block' })}>Responsibility</span>
        <span className={css({ display: 'block' })}>That you're</span>
        <span className={css({ display: 'block', color: 'accent' })}>Happy</span>
      </h1>

      <Box marginTop={{ base: '6', md: '8' }}>
        <HeroNav active="work" />
      </Box>
    </Box>
  )
}