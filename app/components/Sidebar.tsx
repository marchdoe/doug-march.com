import { BrandLockup } from './BrandLockup'
import { identity } from '../content/about'
import { css } from '../../styled-system/css'
import { Box } from '../../styled-system/jsx'

const navItems = [
  { label: 'work', href: '/' },
  { label: 'about', href: '/about' },
  { label: 'contact', href: `mailto:${identity.email}` },
]

export function Sidebar() {
  return (
    <Box
      className={css({
        gridArea: 'header',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '3',
        pt: { base: '8', lg: '10' },
        px: { base: '6', lg: '8' },
      })}
    >
      <BrandLockup variant="stacked-md" mode="original" roleLine />
      <Box
        as="nav"
        className={css({
          display: 'flex',
          justifyContent: 'center',
          gap: '1',
          flexWrap: 'wrap',
          mt: '4',
        })}
      >
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={css({
              textDecoration: 'none',
              textStyle: 'sm',
              fontWeight: 500,
              letterSpacing: 'wide',
              textTransform: 'lowercase',
              fontVariant: 'small-caps',
              color: 'text',
              px: '3',
              py: '3',
              minH: '44px',
              display: 'inline-flex',
              alignItems: 'center',
              borderBottom: '1px solid',
              borderColor: 'border',
            })}
          >
            {item.label}
          </a>
        ))}
      </Box>
      <Box
        className={css({
          width: '100%',
          borderTop: '1px solid',
          borderColor: 'borderStrong',
          mt: '4',
        })}
      />
    </Box>
  )
}
