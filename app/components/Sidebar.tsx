import logoSvg from '../assets/logo.svg'

export function Sidebar() {
  return (
    <nav
      style={{
        position: 'absolute',
        bottom: '48px',
        left: '52px',
        right: '52px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 10,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <a href="/" aria-label="Home" style={{ display: 'block', width: '28px', height: '28px' }}>
          <img src={logoSvg} alt="Doug March logo" width={28} height={28} />
        </a>
        <a
          href="/"
          style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: '12px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase' as const,
            color: '#8EC864',
            textDecoration: 'none',
            padding: '10px 0',
          }}
        >
          Work
        </a>
        <a
          href="/about"
          style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: '12px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase' as const,
            color: '#8EC864',
            textDecoration: 'none',
            padding: '10px 0',
          }}
        >
          About
        </a>
      </div>
      <span
        style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: '11px',
          letterSpacing: '0.10em',
          textTransform: 'uppercase' as const,
          color: '#547828',
        }}
      >
        D.M.
      </span>
    </nav>
  )
}