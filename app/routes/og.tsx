import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Box } from '../../styled-system/jsx'
import logoMono from '../assets/logo-mono.svg'

export const Route = createFileRoute('/og')({ component: OgCard })

function OgCard() {
  return (
    <Box
      className={css({
        position: 'fixed',
        inset: '0',
        zIndex: 9999,
        background: 'bg',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      })}
    >
      <Box
        className={css({
          width: '1200px',
          height: '630px',
          background: 'bg',
          position: 'relative',
          overflow: 'hidden',
          padding: '16',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        })}
      >
        <p
          className={css({
            fontFamily: 'body',
            fontWeight: 'bold',
            fontSize: 'md',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
            color: 'textMuted',
            marginBottom: '8',
          })}
        >
          Doug March — Founder · Builder
        </p>

        <h1
          className={css({
            fontFamily: 'display',
            fontWeight: 'bold',
            fontSize: '112px',
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

        <Box
          className={css({
            position: 'absolute',
            bottom: '10',
            right: '10',
            width: '64px',
            height: '54px',
            backgroundColor: 'textMuted',
            WebkitMaskImage: `url(${logoMono})`,
            maskImage: `url(${logoMono})`,
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
          })}
        />
      </Box>
    </Box>
  )
}