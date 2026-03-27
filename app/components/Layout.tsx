import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div data-color-mode="light" style={{ minHeight: '100vh', backgroundColor: '#EEE8DF' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Lora:ital,wght@0,400;0,700;1,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .nav-logo {
          font-family: "DM Sans", sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #B5A98D;
          text-decoration: none;
          letter-spacing: 0.05em;
          transition: opacity 0.2s;
        }
        .nav-logo:hover { opacity: 0.6; text-decoration: none; }

        .nav-link {
          font-family: "DM Sans", sans-serif;
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #B5A98D;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .nav-link:hover { opacity: 0.6; text-decoration: none; }

        .work-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding: 12px 0;
          border-bottom: 1px solid #D8CEBD;
          text-decoration: none;
          transition: padding-left 0.15s;
        }
        .work-row:hover { padding-left: 6px; }
        .work-row:hover .work-row-title { color: #E8950E; }

        .exp-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding: 10px 0;
          border-bottom: 1px solid #D8CEBD;
          text-decoration: none;
          transition: padding-left 0.15s;
        }
        .exp-row:hover { padding-left: 6px; }
        .exp-row:hover .exp-row-title { color: #E8950E; }

        .leaderboard-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 8px;
          font-variant-numeric: tabular-nums;
          transition: background 0.15s;
          margin: 0 -8px;
        }
        .leaderboard-row:hover { background: #EEE8DF; }

        .footer-link {
          font-family: "DM Sans", sans-serif;
          font-size: 12px;
          letter-spacing: 0.05em;
          color: #B5A98D;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-link:hover { color: #F5C97A; text-decoration: none; }

        .project-link {
          text-decoration: none;
        }
        .project-link:hover h1,
        .project-link:hover h2 { color: #E8950E; }

        .capability-tag {
          display: inline-block;
          padding: 6px 12px;
          font-family: "DM Sans", sans-serif;
          font-size: 11px;
          letter-spacing: 0.05em;
          color: #6A5840;
          background: #EEE8DF;
          border: 1px solid #D8CEBD;
          transition: border-color 0.15s;
        }
        .capability-tag:hover { border-color: #B5A98D; }

        .timeline-entry { border-bottom: 1px solid #D8CEBD; }
        .timeline-entry:last-child { border-bottom: none; }

        @media (max-width: 768px) {
          .band-inner-grid { grid-template-columns: 1fr !important; }
          .signals-grid { grid-template-columns: 1fr !important; }
          .band-pad { padding: 48px 24px !important; }
          .opening-day-hed { font-size: 48px !important; }
        }
      `}} />
      <Sidebar />
      {children}
    </div>
  )
}