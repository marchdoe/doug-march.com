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
          bg: 'cyan.200',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px 90px',
        })}
      >
        <p
          className={css({
            fontSize: 'sm',
            textTransform: 'uppercase',
            letterSpacing: 'widest',
            color: 'cyan.800',
            fontWeight: 'bold',
            margin: 0,
            marginBottom: '10',
          })}
        >
          Doug March · design &amp; product · 2026-07-13
        </p>
        <h1
          className={css({
            fontFamily: 'display',
            fontWeight: 'bold',
            textTransform: 'lowercase',
            fontSize: '132px',
            lineHeight: '0.94',
            letterSpacing: 'tight',
            color: 'text',
            margin: 0,
            maxWidth: '900px',
          })}
        >
          <span className={css({ display: 'block' })}>we can</span>
          <span className={css({ display: 'block' })}>
            <span className={css({ color: 'accent' })}>lose</span> our
          </span>
          <span className={css({ display: 'block' })}>way</span>
        </h1>

        <div
          className={css({
            position: 'absolute',
            bottom: '56px',
            right: '90px',
            display: 'inline-flex',
            color: 'spineBg',
            lineHeight: 0,
          })}
        >
          <img src={logoMono} alt="Doug March" className={css({ width: '64px', height: 'auto', color: 'spineBg' })} />
        </div>
      </div>
    </div>
  )
}