import type { ReactNode } from 'react'
import { Box } from '../../styled-system/jsx'
import { Sidebar } from './Sidebar'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <Box background="bg" minHeight="100vh">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=DM+Sans:wght@300;400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: #111C28; color: #EEF2F8; }
        a { color: inherit; text-decoration: none; }
        .gallery-cell-project {
          background: #192535;
          transition: background 150ms ease;
          cursor: crosshair;
        }
        .gallery-cell-project:hover {
          background: #1F3346;
        }
        .work-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding: 10px 0;
          border-bottom: 1px solid #344D62;
          border-left: 2px solid transparent;
          padding-left: 0;
          transition: border-color 150ms ease, padding-left 150ms ease, color 150ms ease;
          cursor: crosshair;
          text-decoration: none;
        }
        .work-row:hover {
          border-left-color: #A8C040;
          padding-left: 10px;
        }
        .nav-link {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 9px;
          color: #4B6478;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          transition: color 150ms ease;
          text-decoration: none;
        }
        .nav-link:hover { color: #EEF2F8; }
        .nav-name {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: 12px;
          color: #4B6478;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: color 150ms ease;
          text-decoration: none;
        }
        .nav-name:hover { color: #93A8BC; }
        .experiment-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          color: #4B6478;
          transition: color 150ms ease;
          text-decoration: none;
          display: block;
          padding: 4px 0;
        }
        .experiment-link:hover { color: #93A8BC; }
        :focus-visible {
          outline: 2px solid #4AA494;
          outline-offset: 2px;
        }
      `}} />
      <Sidebar />
      {children}
    </Box>
  )
}