import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700&family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;1,300&family=IBM+Plex+Mono:wght@400&display=swap');`}</style>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        .work-link:hover .work-title { color: #C4992E; }
        .lb-row:hover { background-color: #E9EAE0; }
        .hn-item:hover .hn-title { text-decoration: underline; color: #4C4F3F; }
        .nav-link { transition: letter-spacing 0s; }
        .nav-link:hover { letter-spacing: 0.15em !important; }

        body { background-color: #F4F5ED; margin: 0; padding: 0; }
      `}</style>
      <Sidebar />
      <div style={{ minHeight: 'calc(100vh - 52px)', backgroundColor: '#F4F5ED' }}>
        {children}
      </div>
      <footer style={{
        borderTop: '2px solid #1D1F13',
        backgroundColor: '#F4F5ED',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '14px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span style={{
            fontFamily: '"IBM Plex Sans", sans-serif',
            fontSize: '11px',
            color: '#676A59',
            letterSpacing: '0.07em',
          }}>
            Doug March · Product Designer & Developer · Vol. 2026
          </span>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span style={{
              fontFamily: '"IBM Plex Sans", sans-serif',
              fontSize: '11px',
              color: '#B2B5A2',
              letterSpacing: '0.07em',
            }}>
              Tuesday, April 7, 2026
            </span>
            <span style={{ color: '#B2B5A2', fontFamily: '"IBM Plex Sans", sans-serif', fontSize: '11px' }}>·</span>
            <a href="/archive" style={{
              fontFamily: '"IBM Plex Sans", sans-serif',
              fontSize: '11px',
              color: '#676A59',
              textDecoration: 'none',
              letterSpacing: '0.07em',
            }}>
              Archive
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}