import { createFileRoute } from '@tanstack/react-router'
import { Box } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { BrandLockup } from '../components/BrandLockup'

export const Route = createFileRoute('/og')({ component: OgCard })

function OgCard() {
  return (
    <Box
      position="fixed"
      inset="0"
      zIndex={9999}
      bg="bg"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        width="1200px"
        height="630px"
        position="relative"
        overflow="hidden"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        px="80px"
        className={css({
          background:
            'radial-gradient(circle at 50% 45%, token(colors.field) 0%, token(colors.accent) 30%, token(colors.accentAlt) 60%, token(colors.bg) 100%)',
        })}
      >
        <p
          className={css({
            fontSize: 'sm',
            fontVariantCaps: 'small-caps',
            letterSpacing: 'wide',
            color: 'fieldInkMuted',
            fontWeight: '600',
            mb: '5',
          })}
        >
          Not genius or talent.
        </p>
        <h1
          className={css({
            textStyle: 'hero',
            fontWeight: '600',
            color: 'fieldInk',
            textAlign: 'center',
            maxWidth: '1000px',
          })}
        >
          Mastery is a function of time and intense focus.
        </h1>
        <Box position="absolute" bottom="40px" left="60px" className={css({ color: 'fieldInk' })}>
          <BrandLockup variant="horizontal-md" mode="single-color" />
        </Box>
      </Box>
    </Box>
  )
}
