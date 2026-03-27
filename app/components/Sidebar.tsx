import { css } from '../../styled-system/css'

export function Sidebar() {
  return (
    <nav
      className={css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 6',
        height: '12',
      })}
    >
      <a href="/" className="nav-name">Doug March</a>
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        <a href="/" className="nav-link">Work</a>
        <a href="/about" className="nav-link">About</a>
      </div>
    </nav>
  )
}