import logoSvg from '../assets/logo.svg'

export function Sidebar() {
  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 48px',
        height: '52px',
        background: 'rgba(242, 247, 245, 0.94)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(201, 221, 217, 0.55)',
      }}
    >
      <a
        href="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
        }}
      >
        <img src={logoSvg} alt="Doug March" style={{ height: '26px', width: 'auto' }} />
      </a>
      <nav style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        <a
          href="/"
          style={{
            fontSize: '12px',
            letterSpacing: '0.05em',
            fontFamily: "'Lora', serif",
            color: '#4A7870',
            textDecoration: 'none',
          }}
        >
          work
        </a>
        <a
          href="/about"
          style={{
            fontSize: '12px',
            letterSpacing: '0.05em',
            fontFamily: "'Lora', serif",
            color: '#4A7870',
            textDecoration: 'none',
          }}
        >
          about
        </a>
      </nav>
    </header>
  )
}