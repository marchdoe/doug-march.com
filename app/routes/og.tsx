import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Logo } from '../components/Logo'

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
          width: '1200px',
          height: '630px',
          position: 'relative',
          background: 'bg',
          overflow: 'hidden',
        })}
      >
        <div
          className={css({
            position: 'absolute',
            inset: 0,
            background: 'surface',
            opacity: 0.6,
          })}
        />
        <div
          className={css({
            position: 'absolute',
            top: '64px',
            left: '72px',
            right: '72px',
            fontFamily: 'body',
            fontSize: '20px',
            fontWeight: 'semibold',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
            color: 'accent',
          })}
        >
          Friday 24 July 2026 — rewritten by hand
        </div>
        <h1
          className={css({
            position: 'absolute',
            top: '160px',
            left: '72px',
            right: '72px',
            fontFamily: 'heading',
            fontWeight: 'medium',
            fontSize: '104px',
            lineHeight: '1.0',
            letterSpacing: 'tight',
            color: 'text',
            maxWidth: '13ch',
          })}
        >
          Writing{' '}
          <span
            className={css({
              fontStyle: 'italic',
              color: 'accent',
              borderBottom: '0.07em solid',
              borderColor: 'accent',
            })}
          >
            by hand
          </span>{' '}
          is good for your brain
        </h1>
        <div
          className={css({
            position: 'absolute',
            bottom: '56px',
            left: '72px',
            display: 'flex',
            alignItems: 'center',
            gap: '4',
          })}
        >
          <Logo size={48} />
          <span
            className={css({
              fontFamily: 'heading',
              fontWeight: 'medium',
              fontSize: '28px',
              letterSpacing: 'tight',
              color: 'text',
            })}
          >
            Doug March
          </span>
        </div>
        <div
          className={css({
            position: 'absolute',
            bottom: '56px',
            right: '72px',
            fontFamily: 'body',
            fontSize: '18px',
            fontWeight: 'semibold',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
            color: 'textMuted',
          })}
        >
          doug-march.com
        </div>
      </div>
    </div>
  )
}