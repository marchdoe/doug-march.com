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
        background: 'bg',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      })}
    >
      <div
        className={css({
          position: 'relative',
          width: '1200px',
          height: '630px',
          background: 'bg',
          border: '3px double',
          borderColor: 'border',
          padding: '9',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          overflow: 'hidden',
        })}
      >
        <div
          className={css({
            position: 'absolute',
            inset: 0,
            background: 'accent',
            opacity: 0.1,
            pointerEvents: 'none',
          })}
        />

        <div className={css({ position: 'relative', display: 'flex', alignItems: 'center', gap: '3', marginBottom: '6' })}>
          <img src={logoMono} alt="" className={css({ height: '56px', width: 'auto', color: 'text' })} />
          <span
            className={css({
              fontFamily: 'display',
              fontWeight: 'bold',
              fontSize: '2xl',
              color: 'text',
              letterSpacing: 'tight',
            })}
          >
            Doug March
          </span>
        </div>

        <div
          className={css({
            position: 'relative',
            fontFamily: 'body',
            fontSize: 'xs',
            letterSpacing: 'widest',
            textTransform: 'lowercase',
            fontWeight: 'semibold',
            color: 'accent',
            marginBottom: '4',
          })}
        >
          The Front Page · Vol. MMXXVI · No. 210
        </div>

        <h1
          className={css({
            position: 'relative',
            fontFamily: 'display',
            fontWeight: 'bold',
            fontSize: 'clamp(3rem, 6vw, 5.5rem)',
            lineHeight: 'tight',
            letterSpacing: 'tight',
            color: 'text',
            maxWidth: '18ch',
          })}
        >
          <span className={css({ color: 'accentGlow', fontStyle: 'italic' })}>Confidence</span> is
          what you have before you understand the problem.
        </h1>
      </div>
    </div>
  )
}