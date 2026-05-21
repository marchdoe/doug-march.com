import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { css } from '../../styled-system/css'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        padding: '0 6vw',
        maxWidth: 'none',
        background: 'bg',
        color: 'text',
      })}
    >
      <Sidebar />
      <main className={css({ flex: '1' })}>
        {children}
      </main>
      <footer
        className={css({
          borderTop: '1px solid',
          borderColor: 'border',
          padding: '12px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        })}
      >
        <span
          className={css({
            fontFamily: 'body',
            fontSize: '12px',
            letterSpacing: 'wide',
            color: 'textMuted',
          })}
        >
          © 2026
        </span>
        <a
          href="/archive"
          className={css({
            fontFamily: 'body',
            fontSize: '12px',
            letterSpacing: 'wide',
            color: 'textMuted',
            textDecoration: 'none',
            padding: '12px 0',
            _hover: { color: 'accent' },
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
          })}
        >
          Archive
        </a>
      </footer>
    </div>
  )
}