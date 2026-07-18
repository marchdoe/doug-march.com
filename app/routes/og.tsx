import { createFileRoute } from '@tanstack/react-router'
import { Box } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { BrandMark } from '../components/Sidebar'

export const Route = createFileRoute('/og')({ component: OgCard })

function OgCard() {
  return (
    <Box position="fixed" inset="0" zIndex={9999} bg="bg" display="flex" alignItems="center" justifyContent="center">
      <Box
        width="1200px"
        height="630px"
        bg="bgCandle"
        color="textOnCandle"
        position="relative"
        overflow="hidden"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        padding="80px"
      >
        <p className={css({ fontFamily: 'body', fontWeight: 'bold', fontSize: '16px', letterSpacing: 'widest', textTransform: 'uppercase', color: 'olive.700', marginBottom: '28px' })}>
          Today's rebuild — 18 July 2026
        </p>
        <h1
          className={css({
            fontFamily: 'display',
            fontWeight: 'bold',
            fontSize: '96px',
            lineHeight: 'tight',
            letterSpacing: 'tight',
            maxWidth: '15ch',
          })}
        >
          Better to light a candle than to curse the darkness.
        </h1>

        <Box position="absolute" bottom="48px" right="56px" display="flex" alignItems="center" gap="16px">
          <span className={css({ color: 'olive.700' })}>
            <BrandMark size={48} />
          </span>
        </Box>
      </Box>
    </Box>
  )
}