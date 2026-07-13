import type { ReactNode } from 'react'
import { css } from '../../styled-system/css'
import { Sidebar } from './Sidebar'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className={css({
        display: 'grid',
        gridTemplateColumns: { base: '1fr', md: '72px 1fr' },
        minHeight: '100vh',
        bg: 'bg',
      })}
    >
      <Sidebar />
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
        })}
      >
        <main
          id="top"
          className={css({
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            minWidth: 0,
          })}
        >
          {children}
        </main>
        <footer
          className={css({
            bg: 'spineBg',
            color: 'textOnSpine',
            paddingY: { base: '6', md: '8' },
            paddingX: '7vw',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '3',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 'sm',
            letterSpacing: 'wide',
          })}
        >
          <span className={css({ color: 'cyan.200' })}>
            On the reel today —{' '}
            <b className={css({ color: 'textOnSpine', fontWeight: 'bold' })}>Wet Leg</b> ·{' '}
            <b className={css({ color: 'textOnSpine', fontWeight: 'bold' })}>The War on Drugs</b> ·{' '}
            <b className={css({ color: 'textOnSpine', fontWeight: 'bold' })}>Tobin Sprout</b>
          </span>
          <span
            className={css({
              color: 'cyan.300',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: 'widest',
              fontSize: 'xs',
            })}
          >
            Rebuilt blind every morning · 2026-07-13
          </span>
        </footer>
      </div>
    </div>
  )
}