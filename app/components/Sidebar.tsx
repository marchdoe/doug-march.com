import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

const navLink = css({
  display: 'flex',
  alignItems: 'center',
  height: '40px',
  fontFamily: 'mono',
  fontSize: 'xs',
  letterSpacing: 'wider',
  color: '#78947A',
  textDecoration: 'none',
  textTransform: 'uppercase',
  transition: 'color 150ms ease',
  _hover: {
    color: '#519A58',
    textDecoration: 'none',
  },
})

export function Sidebar() {
  return (
    <aside
      style={{
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        padding: '48px 40px',
        background: '#DCE6DD',
        borderRight: '1px solid #CDD9CE',
        boxSizing: 'border-box',
      }}
    >
      {/* Logo */}
      <div style={{ marginBottom: '20px' }}>
        <img
          src={logoSvg}
          alt="Doug March"
          style={{ width: '34px', height: '34px', display: 'block' }}
        />
      </div>

      {/* Identity */}
      <div style={{ marginBottom: '48px' }}>
        <div
          style={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontWeight: 600,
            fontSize: '28px',
            lineHeight: '1.05',
            letterSpacing: '-0.02em',
            color: '#192B1A',
            marginBottom: '12px',
          }}
        >
          Doug
          <br />
          March
        </div>
        <div
          style={{
            fontFamily: '"Source Sans 3", sans-serif',
            fontSize: '12px',
            color: '#78947A',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            lineHeight: '1.6',
          }}
        >
          Product Designer
          <br />
          &amp; Developer
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ marginBottom: '24px' }}>
        <a href="/" className={navLink}>
          Home
        </a>
        <a href="/about" className={navLink}>
          About
        </a>
      </nav>

      {/* Tigers Score Signal */}
      <div
        style={{
          borderTop: '1px solid #CDD9CE',
          paddingTop: '16px',
          marginBottom: '16px',
        }}
      >
        <div
          style={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '12px',
            color: '#3D5C3F',
            marginBottom: '4px',
            letterSpacing: '0.05em',
          }}
        >
          DET 10 &nbsp;·&nbsp; OAK 9
        </div>
        <div
          style={{
            fontFamily: '"Source Sans 3", sans-serif',
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: '12px',
            color: '#78947A',
          }}
        >
          Tigers win.
        </div>
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Quote — earned at bottom */}
      <div style={{ paddingBottom: '0' }}>
        <div
          style={{
            fontFamily: '"Source Sans 3", sans-serif',
            fontStyle: 'italic',
            fontSize: '12px',
            color: '#78947A',
            lineHeight: '1.72',
            marginBottom: '3px',
          }}
        >
          "Things cannot forever go downward."
        </div>
        <div
          style={{
            fontFamily: '"Source Sans 3", sans-serif',
            fontSize: '12px',
            color: '#78947A',
          }}
        >
          — Deng Xiaoping
        </div>
      </div>
    </aside>
  )
}