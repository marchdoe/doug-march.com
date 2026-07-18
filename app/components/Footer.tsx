import { Box, Grid } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'

type NavLink = { label: string; href: string; external?: boolean }

type PersonalData = {
  holesInOne: number
  sport: string
  teams: string[]
  currentFocus: string
}

const cell = css({
  background: 'olive.900',
  padding: { base: '6', md: '7' },
})

const heading = css({
  fontFamily: 'body',
  fontWeight: 'bold',
  fontSize: '2xs',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '4',
})

export function Footer({
  personal,
  extraNavLinks,
  dateLabel = '18 July 2026',
}: {
  personal?: PersonalData
  extraNavLinks?: NavLink[]
  dateLabel?: string
}) {
  const navLinks: NavLink[] = [
    { label: 'Work', href: '/' },
    { label: 'About', href: '/about' },
    ...(extraNavLinks ?? []),
    { label: 'Live site ↗', href: 'https://doug-march.com', external: true },
  ]

  return (
    <Box
      as="footer"
      display="grid"
      gap="1px"
      background="border"
      borderTop="1px solid"
      borderColor="border"
      gridTemplateColumns={{ base: '1fr', md: 'repeat(auto-fit, minmax(220px, 1fr))' }}
    >
      <div className={cell}>
        <h4 className={heading}>The Open — leaderboard</h4>
        <div className={css({ display: 'flex', justifyContent: 'space-between', fontSize: 'sm', color: 'accent', fontWeight: 'bold', padding: '1 0' })}>
          <span>Lucas Herbert</span><span>−8</span>
        </div>
        <div className={css({ display: 'flex', justifyContent: 'space-between', fontSize: 'sm', color: 'textSecondary', padding: '1 0' })}>
          <span>Brian Young</span><span>−6</span>
        </div>
        <div className={css({ display: 'flex', justifyContent: 'space-between', fontSize: 'sm', color: 'textSecondary', padding: '1 0' })}>
          <span>Ryan Gerard</span><span>−6</span>
        </div>
      </div>

      <div className={cell}>
        <h4 className={heading}>Detroit Tigers</h4>
        <p className={css({ fontSize: 'sm', color: 'text' })}>
          <span className={css({ color: 'accent', fontWeight: 'bold' })}>W</span> 2–1{' '}
          <span className={css({ color: 'textMuted' })}>— a candle, not a blowout</span>
        </p>
        <h4 className={css({ fontFamily: 'body', fontWeight: 'bold', fontSize: '2xs', letterSpacing: 'widest', textTransform: 'uppercase', color: 'textMuted', marginTop: '6', marginBottom: '4' })}>
          Now playing
        </h4>
        <ul className={css({ listStyle: 'none', margin: 0, padding: 0 })}>
          {['Tobin Sprout', 'Wet Leg', 'The War on Drugs'].map((song) => (
            <li key={song} className={css({ display: 'flex', alignItems: 'center', gap: '2', padding: '1 0', fontSize: 'sm', color: 'textSecondary' })}>
              <span className={css({ width: '7px', height: '7px', borderRadius: 'full', background: 'accent', flex: 'none', boxShadow: '0 0 8px token(colors.lime.400/35)' })} />
              {song}
            </li>
          ))}
        </ul>
      </div>

      <div className={cell}>
        <h4 className={heading}>Sky tonight</h4>
        <p className={css({ fontSize: 'sm', color: 'textSecondary', lineHeight: 'loose' })}>
          Waxing crescent · day 4.4<br />
          <b className={css({ color: 'accent' })}>20% illuminated</b> — a small light returning to the sky.
        </p>
      </div>

      {personal && (
        <div className={cell}>
          <h4 className={heading}>Off the clock</h4>
          <p className={css({ fontSize: 'sm', color: 'textSecondary', lineHeight: 'loose' })}>
            Holes in one: <b className={css({ color: 'accent' })}>{personal.holesInOne}</b><br />
            {personal.sport} — {personal.teams.join(', ')}<br />
            {personal.currentFocus}
          </p>
        </div>
      )}

      <div className={cell}>
        <h4 className={heading}>Navigate</h4>
        <nav className={css({ display: 'flex', flexDirection: 'column', gap: '2' })} aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.label + link.href}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener' : undefined}
              className={css({
                fontFamily: 'body',
                fontWeight: 'bold',
                fontSize: 'sm',
                letterSpacing: 'wider',
                textTransform: 'uppercase',
                color: 'text',
                padding: '2 0',
                _hover: { color: 'accent' },
              })}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div
        className={css({
          gridColumn: '1 / -1',
          background: 'olive.900',
          padding: { base: '6', md: '7' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '4',
          flexWrap: 'wrap',
          fontSize: '2xs',
          letterSpacing: 'wide',
          textTransform: 'uppercase',
          color: 'textMuted',
        })}
      >
        <span>Doug March — Product, Design &amp; AI</span>
        <span>Rebuilt daily · <span className={css({ color: 'accent' })}>{dateLabel}</span></span>
      </div>
    </Box>
  )
}