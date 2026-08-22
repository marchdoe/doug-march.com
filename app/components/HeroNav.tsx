import { css } from '../../styled-system/css'

const links = [
  { href: '/work', label: 'Work', idx: '01', key: 'work' },
  { href: '/about', label: 'About', idx: '02', key: 'about' },
  { href: '/work#experiments', label: 'Experiments', idx: '03', key: 'experiments' },
] as const

export function HeroNav({ active }: { active?: 'work' | 'about' | 'experiments' }) {
  return (
    <nav
      aria-label="Primary"
      className={css({ display: 'flex', flexWrap: 'wrap', gap: { base: '4', md: '6' } })}
    >
      {links.map((l) => {
        const isActive = active === l.key
        return (
          <a
            key={l.href}
            href={l.href}
            className={css({
              fontFamily: 'body',
              fontWeight: 'bold',
              fontSize: 'sm',
              letterSpacing: 'widest',
              textTransform: 'uppercase',
              color: isActive ? 'text' : 'textSecondary',
              paddingY: '2',
              minHeight: '44px',
              display: 'inline-flex',
              alignItems: 'center',
              textDecoration: isActive ? 'underline' : 'none',
              textDecorationColor: 'accent',
              textUnderlineOffset: '4px',
              transition: 'color .2s ease',
              _hover: {
                color: 'text',
                textDecoration: 'underline',
                textDecorationColor: 'accent',
                textUnderlineOffset: '4px',
              },
            })}
          >
            <span className={css({ color: 'textMuted', marginRight: '2', fontWeight: 'normal' })}>
              {l.idx}
            </span>
            {l.label}
          </a>
        )
      })}
    </nav>
  )
}
