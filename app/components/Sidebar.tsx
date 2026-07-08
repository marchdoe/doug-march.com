import logoSvg from '../assets/logo.svg'

export function Sidebar() {
  return (
    <header
      className="masthead"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '48px',
        padding: '0 5vw',
        borderBottom: '1px solid #2c362a',
        background: '#0e1510',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logoSvg} alt="Doug March logo" style={{ height: '22px', width: '22px' }} />
        </a>
        <a
          href="/"
          style={{
            fontFamily: "'Albert Sans', sans-serif",
            fontWeight: 700,
            fontSize: '0.75rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase' as const,
            color: '#f2f4f0',
            textDecoration: 'none',
          }}
        >
          DOUG MARCH
        </a>
      </div>

      <div
        style={{
          fontFamily: "'Albert Sans', sans-serif",
          fontWeight: 300,
          fontSize: '0.7rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase' as const,
          color: '#7d8c77',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          whiteSpace: 'nowrap' as const,
        }}
      >
        <span className="masthead-date-full">WEDNESDAY — JULY 8, 2026</span>
        <span className="masthead-date-short" style={{ display: 'none' }}>07.08.26</span>
      </div>

      <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <a
          href="/"
          style={{
            fontFamily: "'Albert Sans', sans-serif",
            fontWeight: 400,
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase' as const,
            color: '#a8b4a2',
            textDecoration: 'none',
            padding: '12px 0',
          }}
        >
          WORK
        </a>
        <a
          href="/about"
          style={{
            fontFamily: "'Albert Sans', sans-serif",
            fontWeight: 400,
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase' as const,
            color: '#a8b4a2',
            textDecoration: 'none',
            padding: '12px 0',
          }}
        >
          ABOUT
        </a>
      </nav>

      <style>{`
        @media (max-width: 640px) {
          .masthead-date-full { display: none !important; }
          .masthead-date-short { display: inline !important; }
        }
        .masthead a:hover { color: #76e035 !important; }
        .masthead a:focus-visible {
          outline: 2px solid #76e035;
          outline-offset: 2px;
        }
      `}</style>
    </header>
  )
}