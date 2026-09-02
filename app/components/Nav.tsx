import { css } from '../../styled-system/css'
import { identity } from '../content/about'

export function Nav({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const linkColor = tone === 'dark' ? 'fieldInkMuted' : 'textMuted'
  const hoverColor = tone === 'dark' ? 'fieldInk' : 'accent'
  const sepColor = tone === 'dark' ? 'fieldBorder' : 'border'

  const linkClass = css({
    padding: '2 0',
    minHeight: '44px',
    display: 'inline-flex',
    alignItems: 'center',
    color: linkColor,
    textUnderlineOffset: '6px',
    textDecoration: '2px underline transparent',
    transition: 'color 0.12s ease-out, text-decoration-color 0.12s ease-out',
    _hover: { color: hoverColor, textDecorationColor: hoverColor },
  })

  const sepClass = css({ color: sepColor, paddingX: '2', userSelect: 'none' })

  return (
    <nav
      aria-label="Primary"
      className={css({
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        fontSize: 'xs',
        letterSpacing: 'wide',
        textTransform: 'uppercase',
        fontWeight: '600',
        minWidth: 0,
      })}
    >
      <a href="/work" className={linkClass}>
        Work
      </a>
      <span className={sepClass}>·</span>
      <a href="/about" className={linkClass}>
        About
      </a>
      <span className={sepClass}>·</span>
      <a href={`mailto:${identity.email}`} className={linkClass}>
        Contact
      </a>
    </nav>
  )
}
