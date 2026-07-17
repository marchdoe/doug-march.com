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
      <Box position="relative" width="1200px" height="630px" bg="bg" overflow="hidden">
        <Box
          position="absolute"
          top="48px"
          left="64px"
          display="flex"
          alignItems="center"
          gap="2"
          color="text"
        >
          <img src={logoMono} alt="" className={css({ width: '28px', height: 'auto' })} />
          <span
            className={css({
              fontFamily: 'body',
              fontWeight: 'bold',
              fontSize: 'md',
              color: 'text',
              letterSpacing: 'normal',
            })}
          >
            Doug March
          </span>
        </Box>

        <Box position="absolute" left="64px" right="64px" top="200px">
          <p
            className={css({
              fontSize: 'xs',
              letterSpacing: 'widest',
              textTransform: 'uppercase',
              color: 'textSecondary',
              fontWeight: 'bold',
              marginBottom: '6',
            })}
          >
            Naval Ravikant · Daily manifesto
          </p>
          <h1
            className={css({
              fontFamily: 'display',
              fontWeight: '900',
              textTransform: 'uppercase',
              lineHeight: 'tight',
              letterSpacing: 'tight',
              fontSize: '108px',
              color: 'text',
            })}
          >
            <span className={css({ display: 'block' })}>It's your</span>
            <span className={css({ display: 'block' })}>Responsibility</span>
            <span className={css({ display: 'block', color: 'accent' })}>That you're happy</span>
          </h1>
        </Box>

        <Box
          position="absolute"
          bottom="40px"
          right="64px"
          fontSize="2xs"
          letterSpacing="widest"
          textTransform="uppercase"
          color="textMuted"
          fontWeight="bold"
        >
          Specimen № 07·17·26
        </Box>
      </Box>
    </Box>
  )
}