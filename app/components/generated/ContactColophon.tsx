import { Box } from '../../../styled-system/jsx'
import { css } from '../../../styled-system/css'

export function ContactColophon({
  email,
  name,
  role,
}: {
  email: string
  name: string
  role: string
}) {
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="space-between"
      gap="2"
      fontSize="xs"
      color="textMuted"
    >
      <span>
        {name} — {role}
      </span>
      <Box display="flex" gap="4" alignItems="baseline" flexWrap="wrap">
        <a href={`mailto:${email}`} className={css({ color: 'text', _hover: { color: 'accent' } })}>
          {email}
        </a>
        <span>© 2026 · a portfolio in perpetual redraft</span>
      </Box>
    </Box>
  )
}
