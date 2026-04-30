import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

export function Sidebar() {
  return (
    <header className={css({
      display: 'grid',
      gridTemplateColumns: { base: '1fr', md: 'auto 1fr' },
      alignItems: 'end',
      gap: { base: '16px', md: '24px' },
      maxWidth: '1120px',
      margin: '0 auto',
      padding: { base: '32px 24px 0', md: '80px 48px 0' },
    })}>
      <div className={css({ display: 'flex', alignItems: 'center', gap: '16px' })}>
        <a href="/" aria-label="Home" className={css({ display: 'block', flexShrink: 0 })}>
          <img src={logoSvg} alt="Doug March logo" className={css({ width: '36px', height: '36px' })} />
        </a>
        <div>
          <div className={css({
            fontFamily: 'heading',
            fontSize: { base: '24px', md: '28px' },
            fontWeight: 'bold',
            lineHeight: 'snug',
            letterSpacing: 'tight',
            color: 'text',
          })}>
            Doug March
          </div>
          <div className={css({
            fontFamily: 'body',
            fontSize: '14px',
            letterSpacing: 'wider',
            color: 'text-secondary',
            lineHeight: 'loose',
          })}>
            Product Designer &amp; Developer
          </div>
        </div>
      </div>

      <nav className={css({
        display: 'flex',
        gap: '24px',
        justifyContent: { base: 'flex-start', md: 'flex-end' },
        alignItems: 'end',
        paddingBottom: '4px',
      })}>
        {[
          { href: '/', label: 'Work' },
          { href: '/about', label: 'About' },
        ].map(link => (
          <a
            key={link.href}
            href={link.href}
            className={css({
              fontFamily: 'body',
              fontSize: '12px',
              letterSpacing: 'widest',
              textTransform: 'uppercase',
              color: 'text-muted',
              textDecoration: 'none',
              padding: '8px 4px',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              borderBottom: '1.5px solid transparent',
              transition: 'color 0.2s, border-color 0.2s',
              _hover: {
                color: 'text',
                borderBottomColor: 'accent',
              },
              _focus: {
                outline: '2px solid',
                outlineColor: 'accent',
                outlineOffset: '2px',
              },
            })}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  )
}