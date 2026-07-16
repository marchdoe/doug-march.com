import { createFileRoute } from '@tanstack/react-router'
import { Box } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import logoMono from '../assets/logo-mono.svg'

export const Route = createFileRoute('/og')({ component: OgCard })

function OgCard() {
  return (
    <Box
      position="fixed"
      inset="0"
      zIndex="9999"
      bg="bg"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        width="1200px"
        height="630px"
        bg="bg"
        position="relative"
        overflow="hidden"
        padding="64px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <img
          src={logoMono}
          alt="Doug March"
          className={css({ position: 'absolute', top: '48px', left: '64px', height: '36px', width: 'auto', color: 'accent' })}
        />
        <h1
          className={css({
            fontFamily: 'display',
            textTransform: 'uppercase',
            fontSize: '132px',
            lineHeight: 'tight',
            letterSpacing: 'tight',
            color: 'text',
            display: 'flex',
            flexDirection: 'column',
          })}
        >
          <span>We <span className={css({ color: 'accent' })}>Win</span></span>
          <span>By Helping</span>
          <span>Each Other <span className={css({ color: 'accent' })}>Win</span></span>
        </h1>
        <p
          className={css({
            marginTop: '24px',
            fontSize: '22px',
            letterSpacing: 'widest',
            textTransform: 'uppercase',
            color: 'accent',
            fontWeight: 'bold',
          })}
        >
          — Jack Butcher
        </p>
      </Box>
    </Box>
  )
}