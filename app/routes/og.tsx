import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import logoMono from '../assets/logo-mono.svg'

export const Route = createFileRoute('/og')({ component: OgCard })

function OgCard() {
  return (
    <div
      className={css({
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        bg: 'bg',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      })}
    >
      <div
        className={css({
          width: '1200px',
          height: '630px',
          position: 'relative',
          overflow: 'hidden',
          bg: 'bg',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '20',
        })}
      >
        <p
          className={css({
            fontSize: 'md',
            textTransform: 'uppercase',
            letterSpacing: 'wider',
            color: 'textMuted',
            marginBottom: '6',
          })}
        >
          New Moon · Day 28 <span className={css({ color: 'accentGlow' })}>◐</span>
        </p>
        <h1
          className={css({
            fontFamily: 'display',
            textTransform: 'uppercase',
            lineHeight: 'tight',
            color: 'text',
          })}
          style={{ fontSize: '150px' }}
        >
          <span className={css({ display: 'block' })}>Start Over</span>
          <span className={css({ display: 'block' })}>
            In The <span className={css({ color: 'accent', textShadow: '0 0 48px {colors.accent.300}' })}>Dark</span>
          </span>
        </h1>

        <div
          className={css({
            position: 'absolute',
            bottom: '20',
            right: '20',
            display: 'flex',
            alignItems: 'center',
            gap: '3',
          })}
        >
          <img src={logoMono} alt="" className={css({ width: '40px', height: 'auto', color: 'accentGlow' })} />
          <span
            className={css({
              fontFamily: 'body',
              fontWeight: 'medium',
              fontSize: 'lg',
              letterSpacing: 'wide',
              color: 'text',
            })}
          >
            Doug March
          </span>
        </div>
      </div>
    </div>
  )
}