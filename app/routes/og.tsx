import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Box } from '../../styled-system/jsx'
import { BrandMark } from '../components/BrandMark'

export const Route = createFileRoute('/og')({ component: OgCard })

function OgCard() {
  return (
    <Box
      className={css({
        position: 'fixed',
        inset: 0,
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
          position: 'relative',
          background: 'bg',
          border: '1px solid',
          borderColor: 'border',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingX: '20',
          overflow: 'hidden',
        })}
      >
        <p
          className={css({
            fontSize: 'lg',
            fontVariantCaps: 'all-small-caps',
            textTransform: 'lowercase',
            letterSpacing: 'wider',
            color: 'accent',
            marginBottom: '6',
            fontWeight: 'medium',
          })}
        >
          a shell colon does nothing<span className={css({ color: 'accentBright' })}>.</span>
        </p>
        <h1
          className={css({
            fontFamily: 'display',
            fontWeight: 'normal',
            fontSize: '9xl',
            lineHeight: 'tight',
            letterSpacing: 'normal',
            textTransform: 'uppercase',
            color: 'text',
          })}
        >
          Use it
          <br />
          <span className={css({ color: 'accent', textShadow: '0 0 24px {colors.emerald.400/50}' })}>
            Anyway
          </span>
        </h1>

        <Box
          className={css({
            position: 'absolute',
            bottom: '48px',
            right: '56px',
            display: 'flex',
            alignItems: 'center',
            gap: '3',
          })}
        >
          <BrandMark size={30} />
          <span
            className={css({
              fontFamily: 'body',
              fontWeight: 'bold',
              fontSize: 'md',
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