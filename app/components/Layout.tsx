import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { css } from '../../styled-system/css'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className={css({
        display: 'grid',
        gridTemplateRows: '56px 1fr 48px',
        gridTemplateColumns: '1fr',
        minHeight: '100vh',
        background: 'bg',
        color: 'text',
      })}
    >
      <Sidebar />
      <main
        className={css({
          display: 'flex',
          flexDirection: 'column',
          minHeight: '0',
        })}
      >
        {children}
      </main>
      <footer
        className={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: '6vw',
          paddingRight: '6vw',
          borderTop: '1px solid',
          borderColor: 'border',
          background: 'bg',
          flexWrap: 'wrap',
          gap: '8px',
          fontSize: '12px',
          fontFamily: 'body',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        })}
      >
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'accent',
            minHeight: '48px',
          })}
        >
          <span>Truist Championship</span>
          <span className={css({ color: 'border' })}>·</span>
          <span>Reitan −15</span>
        </div>
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'textDim',
            minHeight: '48px',
          })}
        >
          <span>DET 103</span>
          <span className={css({ color: 'border' })}>·</span>
          <span>OPP 112</span>
        </div>
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'textSubtle',
            minHeight: '48px',
          })}
        >
          <span>🌘 13%</span>
          <span className={css({ color: 'border' })}>·</span>
          <span>Spring</span>
          <span className={css({ color: 'border' })}>·</span>
          <span>May 12</span>
          <span className={css({ color: 'border' })}>·</span>
          <a
            href="/archive"
            className={css({
              color: 'textSubtle',
              textDecoration: 'none',
              _hover: { color: 'accent' },
              _focus: {
                outline: '2px solid',
                outlineColor: 'accent',
                outlineOffset: '2px',
              },
            })}
          >
            Archive
          </a>
        </div>
      </footer>
    </div>
  )
}