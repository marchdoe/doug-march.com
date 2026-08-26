import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { LogoMark } from '../components/LogoMark'

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
          bg: 'bg',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          overflow: 'hidden',
        })}
      >
        <div
          className={css({
            fontFamily: 'mono',
            fontSize: 'sm',
            letterSpacing: 'widest',
            textTransform: 'uppercase',
            color: 'textMuted',
            marginBottom: '32px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          })}
        >
          <span className={css({ width: '12px', height: '12px', bg: 'accent', display: 'inline-block' })} />
          INCIDENT REPORT — LIVE SYSTEM
        </div>

        <h1
          className={css({
            fontFamily: 'mono',
            fontWeight: 'bold',
            fontSize: '128px',
            lineHeight: 'tight',
            letterSpacing: 'tight',
            color: 'accent',
            textShadow: '0 0 48px token(colors.accentGlow)',
            margin: 0,
          })}
        >
          How Complex
          <br />
          Systems Fail
        </h1>

        <div className={css({ position: 'absolute', top: '64px', right: '64px' })}>
          <LogoMark size={48} />
        </div>

        <div
          className={css({
            position: 'absolute',
            bottom: '64px',
            left: '80px',
            fontFamily: 'mono',
            fontSize: 'sm',
            letterSpacing: 'wide',
            color: 'textMuted',
          })}
        >
          DOUG MARCH // DM
        </div>
      </div>
    </div>
  )
}