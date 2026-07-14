import { createFileRoute } from '@tanstack/react-router'
import { Box } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import logoMono from '../assets/logo-mono.svg'
import { identity } from '../content/about'

export const Route = createFileRoute('/og')({ component: OgCard })

function OgCard() {
  return (
    <Box position="fixed" inset="0" zIndex={9999} bg="bg" overflow="hidden">
      <Box
        position="absolute"
        top="50%"
        left="50%"
        width="1200px"
        height="630px"
        transform="translate(-50%, -50%)"
        bg="bg"
        css={{
          backgroundImage:
            'radial-gradient(120% 90% at 12% 0%, {colors.cobalt.500} 0%, {colors.cobalt.600} 46%, {colors.cobalt.700} 100%)',
        }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        paddingX="80px"
      >
        <Box display="flex" alignItems="center" gap="3" position="absolute" top="48px" left="64px">
          <img src={logoMono} alt="" className={css({ height: '48px', width: 'auto', display: 'block' })} />
          <span
            className={css({
              fontFamily: 'body',
              fontWeight: 'semibold',
              fontSize: 'lg',
              color: 'text',
              whiteSpace: 'nowrap',
            })}
          >
            {identity.name}
          </span>
        </Box>

        <p
          className={css({
            fontFamily: 'body',
            fontWeight: 'semibold',
            fontSize: 'sm',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
            color: 'textSecondary',
            marginBottom: '6',
          })}
        >
          Today's read · Jul 14 2026
        </p>

        <h1
          className={css({
            fontFamily: 'display',
            fontWeight: 'normal',
            fontSize: '108px',
            lineHeight: 'tight',
            letterSpacing: 'tight',
            textTransform: 'uppercase',
            color: 'text',
            maxWidth: '13ch',
          })}
        >
          It is better to point out your{' '}
          <span className={css({ color: 'accent' })}>own mistakes</span>.
        </h1>

        <p
          className={css({
            marginTop: '7',
            fontFamily: 'body',
            fontWeight: 'medium',
            fontSize: 'md',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
            color: 'textSecondary',
          })}
        >
          — Warren Buffett
        </p>
      </Box>
    </Box>
  )
}