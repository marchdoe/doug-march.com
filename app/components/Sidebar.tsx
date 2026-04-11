import logoSvg from '../assets/logo.svg'

export function Sidebar() {
  return (
    <>
      {/* Logo — fixed top-left corner mark */}
      <div style={{
        position: 'fixed',
        top: '28px',
        left: '32px',
        zIndex: 200,
      }}>
        <a href="/" style={{ display: 'block', lineHeight: 1 }}>
          <img
            src={logoSvg}
            alt="Doug March"
            style={{ width: '26px', height: '26px', display: 'block' }}
          />
        </a>
      </div>

      {/* Nav — fixed bottom-left, like map coordinates */}
      <div
        className="nav-group"
        style={{
          position: 'fixed',
          bottom: '40px',
          left: '64px',
          zIndex: 200,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontFamily: '"Space Grotesk", sans-serif',
          fontSize: '12px',
          letterSpacing: '0.08em',
        }}
      >
        <a href="/" className="nav-link" style={{ color: '#6B8599', textDecoration: 'none' }}>work</a>
        <span style={{ color: '#2E3E4D' }}>·</span>
        <a href="/about" className="nav-link" style={{ color: '#6B8599', textDecoration: 'none' }}>about</a>
        <span style={{ color: '#2E3E4D' }}>·</span>
        <a href="mailto:hello@doug-march.com" className="nav-link" style={{ color: '#6B8599', textDecoration: 'none' }}>contact</a>
      </div>
    </>
  )
}