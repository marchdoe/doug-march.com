import type { ReactNode } from 'react'
import { Box } from '../../styled-system/jsx'
import { Sidebar } from './Sidebar'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Work+Sans:wght@300;400&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        /* Nav hover inversion */
        .nav-group:hover .nav-link {
          opacity: 0.5;
          transition: opacity 200ms ease-out, color 200ms ease-out;
        }
        .nav-group:hover .nav-link:hover {
          opacity: 1 !important;
          color: #C34B22 !important;
        }
        .nav-link {
          transition: opacity 200ms ease-out, color 200ms ease-out;
        }

        /* Hover underline animation */
        .u-line {
          position: relative;
          display: inline-block;
        }
        .u-line::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 1px;
          background: #C34B22;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 200ms ease-out;
        }
        .u-line:hover::after {
          transform: scaleX(1);
        }
        .u-line:hover {
          color: #C34B22 !important;
          transition: color 200ms ease-out;
        }

        /* Work item hover left-border effect */
        .work-item {
          position: relative;
          transition: background 150ms ease-out;
          padding-left: 18px;
          margin-left: -18px;
        }
        .work-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: #C34B22;
          transform: translateX(-4px);
          opacity: 0;
          transition: transform 150ms ease-out, opacity 150ms ease-out;
        }
        .work-item:hover::before {
          transform: translateX(0);
          opacity: 1;
        }
        .work-item:hover {
          background: rgba(195, 75, 34, 0.04);
        }

        /* Easter egg on name hover */
        .name-mark {
          position: relative;
          display: inline-block;
          cursor: default;
        }
        .name-mark::after {
          content: 'H:218°  26%☾';
          position: absolute;
          top: -20px;
          left: 0;
          font-size: 9px;
          font-family: 'Space Grotesk', sans-serif;
          color: #6B8599;
          letter-spacing: 0.12em;
          opacity: 0;
          pointer-events: none;
          white-space: nowrap;
        }
        .name-mark:hover::after {
          animation: easterLabel 1400ms ease-out forwards;
        }
        @keyframes easterLabel {
          0%   { opacity: 0; }
          12%  { opacity: 1; }
          65%  { opacity: 1; }
          100% { opacity: 0; }
        }

        /* Tabular nums utility */
        .tabnum { font-variant-numeric: tabular-nums; }
      `}</style>
      <Sidebar />
      <Box as="main" style={{ background: '#0D1822', minHeight: '100vh' }}>
        {children}
      </Box>
    </>
  )
}