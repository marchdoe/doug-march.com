import { createFileRoute } from '@tanstack/react-router'
import { Box } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { Badge } from '../components/Badge'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <>
      <Badge
        href="#"
        ariaLabel="The Open final result"
        kicker="The Open · Final"
        lead="R. Fox −10"
        sub="Cameron Young −9 · runner-up"
      />

      <Box
        as="main"
        className={css({
          padding: { base: '0 6vw', md: '0 6vw' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: '60vh',
          flex: '1',
        })}
      >
        <p
          className={css({
            fontFamily: 'body',
            fontWeight: 'bold',
            fontSize: { base: 'xs', md: 'sm' },
            letterSpacing: 'widest',
            textTransform: 'uppercase',
            color: 'textSecondary',
            marginBottom: { base: '4', md: '7' },
          })}
        >
          #1 on Hacker News · 2,379 points · leverage &gt; budget
        </p>

        <h1
          className={css({
            fontFamily: 'display',
            fontWeight: 'normal',
            lineHeight: 'tight',
            letterSpacing: 'tight',
            textTransform: 'uppercase',
          })}
        >
          <span
            className={css({
              display: 'block',
              fontSize: 'clamp(48px, 8.25vw, 132px)',
              color: 'textSecondary',
            })}
          >
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
          <span
            className={css({
              display: 'block',
              fontSize: 'clamp(88px, 15vw, 240px)',
              color: 'text',
              marginTop: '0.04em',
            })}
          >
            $1,600 in ESP32s.
          </span>
        </h1>

        <p
          className={css({
            fontFamily: 'body',
            fontWeight: 'medium',
            fontSize: { base: 'sm', md: 'base' },
            color: 'textSecondary',
            maxWidth: '60ch',
            marginTop: { base: '5', md: '9' },
            lineHeight: 'normal',
          })}
        >
          Someone tore out a $120,000 bowling-alley control system and rebuilt it with $1,600 of
          ESP32 microcontrollers. That ratio is the whole thesis of this site — which itself{' '}
          <a
            href="/about"
            className={css({
              fontWeight: 'bold',
              borderBottom: '1px solid',
              borderColor: 'textSecondary',
              _hover: { color: 'text', borderColor: 'text' },
            })}
          >
            tears down and rebuilds nightly
          </a>
          .
        </p>
      </Box>
    </>
  )
}