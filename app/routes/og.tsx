import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { panelGradient } from '../components/Nav'
import logoMono from '../assets/logo-mono.svg'

export const Route = createFileRoute('/og')({ component: OgCard })

function OgCard() {
  return (
    <div className={css({
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      bg: 'bgPanel',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    })}>
      <div className={css({
        width: '1200px',
        height: '630px',
        bg: 'bgPanel',
        backgroundImage: panelGradient,
        color: 'textOnPanel',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingInline: '96px',
        paddingBlock: '80px',
      })}>
        <p className={css({
          fontFamily: 'body',
          fontWeight: '600',
          fontSize: 'sm',
          letterSpacing: 'widest',
          textTransform: 'uppercase',
          color: 'accentGlow',
          marginBottom: '8',
        })}>
          Today&apos;s operating manifesto
        </p>
        <h1 className={css({
          fontFamily: 'display',
          fontSize: '140px',
          lineHeight: 'tight',
          letterSpacing: 'wide',
          textTransform: 'uppercase',
          color: 'textOnPanel',
        })}>
          Eighty Percent<br />On <span className={css({ color: 'accent' })}>Tomorrow</span>
        </h1>

        <div className={css({
          position: 'absolute',
          bottom: '56px',
          left: '96px',
          display: 'flex',
          alignItems: 'center',
          gap: '3',
        })}>
          <span className={css({
            display: 'inline-block',
            width: '32px',
            height: '32px',
            bg: 'textOnPanel',
            maskImage: `url(${logoMono})`,
            maskSize: 'contain',
            maskRepeat: 'no-repeat',
            maskPosition: 'center',
            WebkitMaskImage: `url(${logoMono})`,
            WebkitMaskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
          })} />
          <span className={css({ fontFamily: 'body', fontWeight: '600', fontSize: 'lg', letterSpacing: 'wide', color: 'textOnPanel' })}>
            Doug March
          </span>
        </div>
      </div>
    </div>
  )
}