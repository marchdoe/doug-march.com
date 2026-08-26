import { css } from '../../styled-system/css'
import { LogoMark } from './LogoMark'

const navItems = [
  { label: '01 WORK', href: '/#work' },
  { label: '02 ABOUT', href: '/about' },
  { label: '03 CONTACT', href: '/#contact' },
]

export function Sidebar() {
  return (
    <aside
      className={css({
        position: 'fixed',
        top: 0,
        left: 0,
        right: { base: 0, md: 'auto' },
        width: { base: '100%', md: '72px' },
        height: { base: '56px', md: '100vh' },
        bg: 'bgSidebar',
        borderRight: { base: 'none', md: '1px solid' },
        borderBottom: { base: '1px solid', md: 'none' },
        borderColor: 'border',
        display: 'flex',
        flexDirection: { base: 'row', md: 'column' },
        alignItems: 'center',
        justifyContent: { base: 'space-between', md: 'flex-start' },
        padding: { base: '0 16px', md: '20px 0' },
        zIndex: 100,
      })}
    >
      <a
        href="/"
        aria-label="Doug March — home"
        className={css({ display: 'flex', marginBottom: { base: 0, md: '40px' } })}
      >
        <LogoMark size={26} />
      </a>

      <nav
        aria-label="Primary"
        className={css({
          display: 'flex',
          flexDirection: { base: 'row', md: 'column' },
          gap: { base: '4px', md: '28px' },
          writingMode: { base: 'horizontal-tb', md: 'vertical-rl' },
          textOrientation: 'mixed',
        })}
      >
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={css({
              fontFamily: 'mono',
              fontSize: 'xs',
              letterSpacing: 'widest',
              color: 'textMuted',
              transform: { base: 'none', md: 'rotate(180deg)' },
              padding: { base: '0 10px', md: '8px 4px' },
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              borderLeft: { base: 'none', md: '2px solid transparent' },
              borderBottom: { base: '2px solid transparent', md: 'none' },
              transition: 'color .18s ease-out, border-color .18s ease-out',
              _hover: { color: 'accentLight', borderColor: 'accent' },
            })}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div
        className={css({
          marginTop: 'auto',
          fontFamily: 'mono',
          fontSize: '2xs',
          letterSpacing: 'wide',
          color: 'border',
          writingMode: 'vertical-rl',
          display: { base: 'none', md: 'block' },
        })}
      >
        DM // 2026
      </div>
    </aside>
  )
}