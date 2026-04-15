export function Footer() {
  return (
    <div style={{ background: '#1A1610', position: 'relative' }}>
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '40px 48px 56px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'Source Sans 3, sans-serif',
            fontSize: '12px',
            color: '#695F50',
            letterSpacing: '0.04em',
          }}
        >
          © 2026 Doug March
        </span>

        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <a
            href="/archive"
            style={{
              fontFamily: 'Source Sans 3, sans-serif',
              fontSize: '12px',
              color: '#695F50',
              textDecoration: 'none',
              letterSpacing: '0.04em',
            }}
          >
            Archive
          </a>
          <a
            href="/about"
            style={{
              fontFamily: 'Source Sans 3, sans-serif',
              fontSize: '12px',
              color: '#695F50',
              textDecoration: 'none',
              letterSpacing: '0.04em',
            }}
          >
            About
          </a>
          <a
            href="https://github.com/dougmarch"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'Source Sans 3, sans-serif',
              fontSize: '12px',
              color: '#695F50',
              textDecoration: 'none',
              letterSpacing: '0.04em',
            }}
          >
            GitHub
          </a>
        </div>
      </div>

      {/* Tigers score — peripheral annotation */}
      <div
        style={{
          position: 'absolute',
          left: '48px',
          bottom: '20px',
          fontFamily: 'Source Sans 3, sans-serif',
          fontSize: '10px',
          color: '#C08B1C',
          letterSpacing: '0.08em',
        }}
      >
        DET 2 · OAK 1
      </div>
    </div>
  )
}