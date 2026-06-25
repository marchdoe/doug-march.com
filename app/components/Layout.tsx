import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { css } from '../../styled-system/css'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className={css({
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
        minHeight: '100vh',
        minHeight: '100dvh',
        background: 'bg',
        color: 'text',
        overflow: 'hidden',
      })}
    >
      <Sidebar />
      <main
        className={css({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100%',
          minHeight: 0,
        })}
      >
        {children}
      </main>
      <footer
        className={css({
          height: '48px',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          padding: '0 4vw',
          borderTop: '1px solid',
          borderColor: 'border',
          background: 'sidebarBg',
          gap: '0',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          justifyContent: 'space-between',
        })}
      >
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: '0',
            fontFamily: 'body',
            fontSize: '13px',
            letterSpacing: 'wide',
            color: 'textMuted',
            overflow: 'hidden',
          })}
        >
          <span className={css({ display: 'inline-flex', alignItems: 'center', gap: '4px' })}>
            <span className={css({ textTransform: 'uppercase', fontSize: '11px', letterSpacing: 'wider', color: '{colors.neutral.600}' })}>DET</span>
            <span className={css({ fontVariantNumeric: 'tabular-nums', color: 'textSecondary' })}>2–4</span>
            <span className={css({ color: 'accentDark', fontWeight: 'bold', fontSize: '12px' })}>L</span>
          </span>

          <span className={css({ color: 'border', margin: '0 12px', userSelect: 'none' })}>|</span>

          <span>☽ 84%</span>

          <span className={css({ color: 'border', margin: '0 12px', userSelect: 'none', display: { base: 'none', md: 'inline' } })}>|</span>

          <span className={css({ display: { base: 'none', md: 'inline' } })}>☀ 14.7h</span>

          <span className={css({ color: 'border', margin: '0 12px', userSelect: 'none', display: { base: 'none', lg: 'inline' } })}>|</span>

          <span className={css({ display: { base: 'none', lg: 'inline' } })}>The War on Drugs · Wet Leg</span>

          <span className={css({ color: 'border', margin: '0 12px', userSelect: 'none', display: { base: 'none', lg: 'inline' } })}>|</span>

          <span className={css({ display: { base: 'none', lg: 'inline' } })}>
            OpenAI chip{' '}
            <span className={css({ color: 'textSecondary' })}>↑712</span>
          </span>
        </div>

        <a
          href="/archive"
          className={css({
            fontFamily: 'body',
            fontSize: '12px',
            letterSpacing: 'wider',
            color: 'textMuted',
            textDecoration: 'none',
            flexShrink: 0,
            padding: '12px 4px',
            _hover: { color: 'accent' },
            transition: 'color 0.12s ease',
            _focus: {
              outline: '2px solid',
              outlineColor: 'accent',
              outlineOffset: '2px',
            },
          })}
        >
          Archive
        </a>
      </footer>
    </div>
  )
}