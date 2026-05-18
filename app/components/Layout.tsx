import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { css } from '../../styled-system/css'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={css({
      display: 'grid',
      gridTemplateRows: '48px 1fr 56px',
      minHeight: '100vh',
      background: 'bg',
      color: 'text',
    })}>
      <Sidebar />
      <main>{children}</main>
      <footer className={css({
        borderTop: '1px solid',
        borderColor: 'border',
        display: 'flex',
        alignItems: 'center',
        padding: '0 6vw',
        gap: '8',
        fontSize: '9px',
        fontFamily: 'body',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'textMuted',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      })}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>☽</span>
          <span>2.5D / 6.9%</span>
        </span>
        <span className={css({ width: '1px', height: '20px', background: 'borderSubtle', flexShrink: 0 })} />
        <span>MON 18 MAY 2026 / 14.2H DAYLIGHT</span>
        <span className={css({ width: '1px', height: '20px', background: 'borderSubtle', flexShrink: 0 })} />
        <span className={css({ color: 'loss' })}>PISTONS 94–125</span>
        <span className={css({ width: '1px', height: '20px', background: 'borderSubtle', flexShrink: 0 })} />
        <span className={css({ color: 'loss' })}>TIGERS 1–4</span>
        <span className={css({ flex: 1 })} />
        <span className={css({ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', lineHeight: '1.3' })}>
          <span className={css({ fontSize: '9px', color: 'textLabel' })}>PGA CHAMPION</span>
          <span className={css({ fontSize: '13px', fontWeight: 'bold', color: 'accentLight' })}>AARON RAI −9</span>
        </span>
        <span className={css({ marginLeft: '8' })}>
          <a href="/archive" className={css({ color: 'textMuted', textDecoration: 'none', _hover: { color: 'accentLight' } })}>Archive</a>
        </span>
      </footer>
    </div>
  )
}