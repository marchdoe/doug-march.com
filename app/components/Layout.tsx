import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: 'auto 1px 1fr 1px auto',
        minHeight: '100vh',
        background: '#0e1510',
        color: '#f2f4f0',
      }}
    >
      <Sidebar />
      <div style={{ background: '#2c362a', width: '100%' }} />
      <main>{children}</main>
      <div style={{ background: '#2c362a', width: '100%' }} />
      <footer
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          height: 'auto',
          minHeight: '48px',
          padding: '12px 5vw',
          fontFamily: "'Albert Sans', sans-serif",
          fontSize: '0.75rem',
          color: '#566452',
          letterSpacing: '0.05em',
        }}
      >
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <span>☽ LAST QUARTER 31%</span>
          <span>14.6 hrs · ☀ 04:56–19:33</span>
        </div>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <a
            href="/archive"
            style={{
              color: '#566452',
              textDecoration: 'none',
              fontSize: '0.75rem',
            }}
          >
            Archive
          </a>
          <span>© 2026</span>
        </div>
      </footer>

      <style>{`
        footer a:hover { color: #76e035 !important; text-decoration: underline !important; }
        footer a:focus-visible { outline: 2px solid #76e035; outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  )
}