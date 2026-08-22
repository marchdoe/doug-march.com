import { css } from '../../styled-system/css'
import { Box, Flex } from '../../styled-system/jsx'

type Row = { k: string; v: string; amt: string; linky?: boolean }

const rows: Row[] = [
  { k: 'Line 01 · Ballgame', v: 'DET Tigers vs. opponent — road loss', amt: '2–3 L', linky: true },
  {
    k: 'Line 02 · On the bench',
    v: 'Guided by Voices · Wet Leg · My Morning Jacket',
    amt: '3 tracks',
  },
  {
    k: 'Line 03 · Almanac',
    v: 'Moon: first quarter, 40% illuminated · Sun 05:05 → 19:27',
    amt: '14h 22m',
  },
  {
    k: 'Line 04 · Signal source',
    v: 'Hacker News — $120K system rebuilt on ESP32s',
    amt: '2,379 pts',
    linky: true,
  },
]

export function BomFooter() {
  return (
    <Box
      as="footer"
      className={css({
        bg: 'surface',
        color: 'surfaceText',
        padding: '8 6vw',
        borderTop: '3px solid',
        borderColor: 'border',
      })}
    >
      <Flex
        justify="space-between"
        align="baseline"
        gap="4"
        wrap="wrap"
        className={css({
          borderBottom: '2px solid',
          borderColor: 'primary.600',
          paddingBottom: '3',
          marginBottom: '2',
        })}
      >
        <span
          className={css({
            fontFamily: 'body',
            fontWeight: 'bold',
            fontSize: 'sm',
            letterSpacing: 'widest',
            textTransform: 'uppercase',
            color: 'surfaceText',
          })}
        >
          Bill of Materials — daily build
        </span>
        <span
          className={css({
            fontFamily: 'body',
            fontWeight: 'medium',
            fontSize: 'xs',
            letterSpacing: 'wide',
            textTransform: 'uppercase',
            color: 'neutral.400',
          })}
        >
          doug-march.com · rev 2026-07-20
        </span>
      </Flex>

      {rows.map((row) => (
        <Box
          key={row.k}
          tabIndex={row.linky ? 0 : undefined}
          className={css({
            display: 'grid',
            gridTemplateColumns: {
              base: '1fr auto',
              sm: 'minmax(88px,1.3fr) minmax(0,3fr) minmax(90px,auto)',
            },
            gap: '3',
            alignItems: 'baseline',
            padding: '3 0',
            borderBottom: '1px solid',
            borderColor: 'primary.800',
            cursor: row.linky ? 'pointer' : 'default',
            '& .v': { borderBottom: '1px solid transparent', display: 'inline-block' },
            _hover: row.linky ? { '& .v': { borderColor: 'surfaceText' } } : undefined,
          })}
        >
          <span
            className={css({
              gridColumn: { base: '1 / -1', sm: 'auto' },
              fontFamily: 'body',
              fontWeight: 'bold',
              fontSize: '2xs',
              letterSpacing: 'widest',
              textTransform: 'uppercase',
              color: 'neutral.400',
            })}
          >
            {row.k}
          </span>
          <span
            className={css({
              fontFamily: 'body',
              fontWeight: 'medium',
              fontSize: 'sm',
              color: 'surfaceText',
              lineHeight: 'normal',
            })}
          >
            <span className="v">{row.v}</span>
          </span>
          <span
            className={css({
              fontFamily: 'body',
              fontWeight: 'bold',
              fontSize: 'sm',
              textAlign: 'right',
              color: 'primary.300',
              whiteSpace: 'nowrap',
            })}
          >
            {row.amt}
          </span>
        </Box>
      ))}

      <Flex
        justify="space-between"
        gap="4"
        wrap="wrap"
        className={css({
          marginTop: '4',
          paddingTop: '3',
          borderTop: '2px solid',
          borderColor: 'primary.600',
          fontFamily: 'body',
          fontWeight: 'medium',
          fontSize: '2xs',
          letterSpacing: 'wider',
          textTransform: 'uppercase',
          color: 'neutral.400',
        })}
      >
        <span>Edition 2026-07-20 · rebuilt nightly</span>
        <span>Assembled by Doug March · Founder / builder</span>
      </Flex>
    </Box>
  )
}
