import logoSvg from '../assets/logo.svg'

export function Sidebar() {
  return (
    <div
      style={{
        background: '#183848',
        width: '100%',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: '48px',
        paddingRight: '48px',
        boxSizing: 'border-box',
        flexShrink: 0,
      }}
    >
      {/* Logo + name */}
      <a
        href="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          textDecoration: 'none',
        }}
      >
        <img
          src={logoSvg}
          alt=""
          style={{ height: '22px', width: '22px', display: 'block' }}
        />
        <span
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '13px',
            fontWeight: 500,
            color: '#E5EDF1',
            letterSpacing: '0.04em',
          }}
        >
          Doug March
        </span>
      </a>

      {/* Nav links */}
      <nav style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
        <a
          href="/"
          style={{
            fontFamily: '"IBM Plex Sans", sans-serif',
            fontSize: '13px',
            fontWeight: 400,
            color: '#9DB6C0',
            textDecoration: 'none',
            letterSpacing: '0.04em',
            transition: 'opacity 120ms ease',
          }}
        >
          work
        </a>
        <a
          href="/about"
          style={{
            fontFamily: '"IBM Plex Sans", sans-serif',
            fontSize: '13px',
            fontWeight: 400,
            color: '#9DB6C0',
            textDecoration: 'none',
            letterSpacing: '0.04em',
            transition: 'opacity 120ms ease',
          }}
        >
          about
        </a>
      </nav>
    </div>
  )
}