import logoSvg from '../assets/logo.svg'

export function Sidebar() {
  return (
    <nav
      className="site-nav"
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        zIndex: 100,
        padding: '24px 5vw',
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
      }}
    >
      <a href="/" style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logoSvg} alt="Doug March" style={{ width: '28px', height: '28px' }} />
      </a>
      <a
        href="/"
        style={{
          fontFamily: 'var(--fonts-body)',
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.12em',
          textTransform: 'uppercase' as const,
          color: 'var(--colors-stone-400)',
          textDecoration: 'none',
          padding: '10px 0',
        }}
      >
        Work
      </a>
      <a
        href="/about"
        style={{
          fontFamily: 'var(--fonts-body)',
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.12em',
          textTransform: 'uppercase' as const,
          color: 'var(--colors-stone-400)',
          textDecoration: 'none',
          padding: '10px 0',
        }}
      >
        About
      </a>
      <span
        style={{
          fontFamily: 'var(--fonts-body)',
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.12em',
          textTransform: 'uppercase' as const,
          color: 'var(--colors-stone-500)',
        }}
      >
        Fri 10 Jul 2026
      </span>
    </nav>
  )
}