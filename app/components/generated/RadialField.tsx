import type { ReactNode } from 'react'
import { Box } from '../../../styled-system/jsx'
import { css } from '../../../styled-system/css'

const RING_SIZES = ['34vmax', '52vmax', '72vmax', '94vmax', '120vmax']

export function RadialField({ children, dateline }: { children: ReactNode; dateline?: string }) {
  return (
    <Box
      position="relative"
      minH="100svh"
      overflow="hidden"
      pt={{ base: '160px', lg: '220px' }}
      pb={{ base: '9', lg: '9' }}
      px={{ base: '5', md: '7', lg: '9' }}
      className={css({
        background:
          'radial-gradient(ellipse 60% 42% at 50% 47%, token(colors.field) 0%, token(colors.field) 58%, transparent 100%), radial-gradient(circle at 50% 45%, token(colors.field) 0%, token(colors.accent) 24%, token(colors.accentAlt) 54%, token(colors.bg) 100%)',
      })}
    >
      <Box
        position="absolute"
        inset="0"
        zIndex={0}
        pointerEvents="none"
        display="grid"
        className={css({ placeItems: 'center' })}
      >
        {RING_SIZES.map((size, i) => (
          <Box
            key={size}
            position="absolute"
            width={size}
            height={size}
            borderRadius="full"
            border="1px solid"
            borderColor="fieldBorder"
            opacity={i >= 3 ? 0.15 : 0.28}
          />
        ))}
      </Box>

      {dateline && (
        <Box
          position="absolute"
          top={{ base: '5', lg: '7' }}
          right={{ base: '5', md: '7', lg: '9' }}
          zIndex={3}
          textAlign="right"
          fontSize="xs"
          color="fieldInkMuted"
          className={css({ whiteSpace: 'pre-line' })}
        >
          {dateline}
        </Box>
      )}

      <Box
        position="relative"
        zIndex={2}
        display={{ base: 'flex', lg: 'grid' }}
        flexDirection="column"
        gap="9"
        gridTemplateColumns={{
          lg: 'minmax(150px,1fr) minmax(0,600px) minmax(150px,1fr)',
          xl: 'minmax(170px,1fr) minmax(0,780px) minmax(170px,1fr)',
        }}
        gridTemplateAreas={{ lg: '"lf eye rf"' }}
        alignItems={{ lg: 'stretch' }}
        mt={{ lg: '9' }}
      >
        {children}
      </Box>
    </Box>
  )
}
