import logoSvg from '../assets/logo.svg'

export function Sidebar() {
  return (
    <header style={{
      height: '52px',
      borderBottom: '2px solid #1D1F13',
      backgroundColor: '#F4F5ED',
      display: 'flex',
      alignItems: 'center',
      padding: '0 40px',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      width: '100%',
    }}>
      {/* Left zone: logo + name + nav */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <img src={logoSvg} style={{ height: '26px', width: 'auto' }} alt="Doug March" />
          <span style={{
            fontFamily: '"Syne", sans-serif',
            fontWeight: 600,
            fontSize: '16px',
            color: '#1D1F13',
            letterSpacing: '-0.01em',
            lineHeight: 1,
          }}>
            Doug March
          </span>
        </a>

        <nav style={{ display: 'flex', gap: '20px' }}>
          <a
            href="/"
            className="nav-link"
            style={{
              fontFamily: '"IBM Plex Sans", sans-serif',
              fontSize: '11px',
              color: '#676A59',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            Home
          </a>
          <a
            href="/about"
            className="nav-link"
            style={{
              fontFamily: '"IBM Plex Sans", sans-serif',
              fontSize: '11px',
              color: '#676A59',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            About
          </a>
        </nav>
      </div>

      {/* Center zone: broadsheet flag */}
      <div style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: '"Syne", sans-serif',
        fontWeight: 700,
        fontSize: '11px',
        color: '#1D1F13',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
      }}>
        DOUG MARCH · PORTFOLIO
      </div>

      {/* Right zone: date + masters countdown */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '7px',
        fontFamily: '"IBM Plex Sans", sans-serif',
        fontSize: '11px',
        color: '#676A59',
      }}>
        <span style={{ letterSpacing: '0.03em' }}>Tuesday, April 7</span>
        <span style={{ color: '#B2B5A2' }}>·</span>
        <span style={{ letterSpacing: '0.12em' }}>MASTERS · 2D</span>
      </div>
    </header>
  )
}