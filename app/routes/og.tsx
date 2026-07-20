import { createFileRoute } from '@tanstack/react-router'
import { Box } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import logo from '../assets/logo.svg'

export const Route = createFileRoute('/og')({ component: OgCard })

function OgCard() {
  return (
    <Box
      position="fixed"
      inset="0"
      zIndex="9999"
      background="bg"
      className={css({ display: 'flex', alignItems: 'center', justifyContent: 'center' })}
    >
      <Box
        width="1200px"
        height="630px"
        background="bg"
        position="relative"
        overflow="hidden"
        className={css({ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px' })}
      >
        <p
          className={css({
            fontFamily: 'body',
            fontWeight: 'bold',
            fontSize: 'md',
            letterSpacing: 'widest',
            textTransform: 'uppercase',
            color: 'textSecondary',
            marginBottom: '8',
          })}
        >
          #1 on Hacker News · 2,379 points
        </p>
        <h1
          className={css({
            fontFamily: 'display',
            fontWeight: 'normal',
            textTransform: 'uppercase',
            letterSpacing: 'tight',
            lineHeight: 'tight',
          })}
        >
          <span className={css({ display: 'block', fontSize: '96px', color: 'textSecondary' })}>
            <span
              className={css({
                color: 'text',
                WebkitTextFillColor: 'transparent',
                WebkitTextStrokeWidth: '2px',
                WebkitTextStrokeColor: 'currentColor',
              })}
            >
              $120K
            </span>{' '}
            System.
          </span>
          <span className={css({ display: 'block', fontSize: '150px', color: 'text', marginTop: '0.04em' })}>
            $1,600 in ESP32s.
          </span>
        </h1>

        <Box position="absolute" bottom="56px" left="80px" className={css({ display: 'flex', alignItems: 'center', gap: '3' })}>
          <img src={logo} alt="Doug March" className={css({ height: '56px', width: 'auto', display: 'block' })} />
          <span
            className={css({
              fontFamily: 'body',
              fontWeight: 'bold',
              fontSize: 'lg',
              letterSpacing: 'wide',
              textTransform: 'uppercase',
              color: 'text',
            })}
          >
            Doug March
          </span>
        </Box>
      </Box>
    </Box>
  )
}