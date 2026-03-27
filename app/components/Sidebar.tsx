export function Sidebar() {
  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: '#19130D',
      padding: '0 48px',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <a href="/" className="nav-logo">
        Doug March
      </a>
      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        <a href="/" className="nav-link">Work</a>
        <a href="/about" className="nav-link">About</a>
      </div>
    </nav>
  )
}