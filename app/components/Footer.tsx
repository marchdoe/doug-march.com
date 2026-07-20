import { Box, Flex } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'

const rowClass = css({
  display: 'grid',
  gridTemplateColumns: { base: '1fr auto', md: 'minmax(88px,1.3fr) minmax(0,3fr) minmax(90px,auto)' },
  gap: '3',
  alignItems: 'baseline',
  paddingY: '2.5',
  borderBottom: '1px solid rgba(255,196,0,0.18)',
})

const kClass = css({
  fontFamily: 'body',
  fontWeight: 'bold',
  fontSize: '2xs',
  letterSpacing: 'wide',
  textTransform: 'uppercase',
  color: 'neutral.400',
  gridColumn: { base: '1 / -1', md: 'auto' },
})

const vClass = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: 'sm',
  color: 'surfaceText',
  lineHeight: 'normal',
})

const amtClass = css({
  fontFamily: 'body',
  fontWeight: 'bold',
  fontSize: 'sm',
  textAlign: 'right',
  color: 'primary.300',
  fontVariantNumeric: 'tabular-nums',
  whiteSpace: 'nowrap',
})

export function Footer() {
  return (
    <Box
      as="footer"
      background="surface"
      color="surfaceText"
      paddingY="8"
      paddingX={{ base: '6vw', md: '6vw' }}
      borderTop="3px solid"
      borderColor="border"
    >
      <Flex
        justify="space-between"
        align="baseline"
        gap="4"
        wrap="wrap"
        borderBottom="2px solid"
        className={css({ borderColor: 'accent' })}
        paddingBottom="3"
        marginBottom="2"
      >
        <span className={css({ fontFamily: 'body', fontWeight: 'bold', fontSize: 'xs', letterSpacing: 'widest', textTransform: 'uppercase', color: 'surfaceText' })}>
          Bill of Materials — daily build
        </span>
        <span className={css({ fontFamily: 'body', fontWeight: 'medium', fontSize: '2xs', letterSpacing: 'wide', textTransform: 'uppercase', color: 'neutral.400', fontVariantNumeric: 'tabular-nums' })}>
          doug-march.com · rev 2026-07-20
        </span>
      </Flex>

      <div className={rowClass}>
        <span className={kClass}>Line 01 · Ballgame</span>
        <span className={vClass}>DET Tigers vs. opponent — road loss</span>
        <span className={amtClass}>2–3 L</span>
      </div>
      <div className={rowClass}>
        <span className={kClass}>Line 02 · On the bench</span>
        <span className={vClass}>Guided by Voices · Wet Leg · My Morning Jacket</span>
        <span className={amtClass}>3 tracks</span>
      </div>
      <div className={rowClass}>
        <span className={kClass}>Line 03 · Almanac</span>
        <span className={vClass}>Moon: first quarter, 40% illuminated · Sun 05:05 → 19:27</span>
        <span className={amtClass}>14h 22m</span>
      </div>
      <div className={css({ ...rowClass.raw ?? {}, borderBottom: 'none' })}>
        <span className={kClass}>Line 04 · Signal source</span>
        <span className={vClass}>Hacker News — $120K system rebuilt on ESP32s</span>
        <span className={amtClass}>2,379 pts</span>
      </div>

      <Flex
        justify="space-between"
        gap="4"
        wrap="wrap"
        marginTop="4"
        paddingTop="3.5"
        borderTop="2px solid"
        className={css({ borderColor: 'accent' })}
      >
        <span className={css({ fontFamily: 'body', fontWeight: 'medium', fontSize: '2xs', letterSpacing: 'wide', textTransform: 'uppercase', color: 'neutral.400', fontVariantNumeric: 'tabular-nums' })}>
          Edition 2026-07-20 · rebuilt nightly
        </span>
        <span className={css({ fontFamily: 'body', fontWeight: 'medium', fontSize: '2xs', letterSpacing: 'wide', textTransform: 'uppercase', color: 'neutral.400', fontVariantNumeric: 'tabular-nums' })}>
          Assembled by Doug March · Founder / builder
        </span>
      </Flex>
    </Box>
  )
}