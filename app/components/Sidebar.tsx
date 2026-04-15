import logoSvg from '../assets/logo.svg'

export function Sidebar() {
  return (
    <div style={{ background: '#1A1610', width: '100%' }}>
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '36px 48px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src={logoSvg} alt="Doug March" style={{ width: '24px', height: '24px' }} />
          <span
            style={{
              fontFamily: 'Source Sans 3, sans-serif',
              fontWeight: 600,
              fontSize: '16px',
              color: '#EEE8D8',
              letterSpacing: '0em',
            }}
          >
            Doug March
          </span>
        </a>

        <nav style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <a href="/" style={{ textDecoration: 'none' }}>
            <span
              style={{
                fontFamily: 'Source Sans 3, sans-serif',
                fontSize: '14px',
                fontWeight: 400,
                color: '#B5AC97',
                letterSpacing: '0.04em',
              }}
            >
              Work
            </span>
          </a>
          <a href="/about" style={{ textDecoration: 'none' }}>
            <span
              style={{
                fontFamily: 'Source Sans 3, sans-serif',
                fontSize: '14px',
                fontWeight: 400,
                color: '#B5AC97',
                letterSpacing: '0.04em',
              }}
            >
              About
            </span>
          </a>
        </nav>
      </div>
    </div>
  )
}