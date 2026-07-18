import { createFileRoute } from '@tanstack/react-router'
import { Box } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { Footer } from '../components/Footer'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <>
      {/* CANDLE BAND — identity statement as marquee */}
      <Box
        as="section"
        minH="34vh"
        padding={{ base: '10 6vw', md: 'clamp(40px,7vw,80px) 6vw' }}
        bg="bgCandle"
        color="textOnCandle"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        boxShadow="0 40px 120px token(colors.lime.400/35)"
      >
        <p className={css({ fontFamily: 'body', fontWeight: 'bold', fontSize: 'xs', letterSpacing: 'widest', textTransform: 'uppercase', color: 'olive.700', marginBottom: '5' })}>
          About — {identity.role}
        </p>
        <h1 className={css({ fontFamily: 'display', fontWeight: 'bold', fontSize: 'clamp(40px,6.5vw,96px)', lineHeight: 'tight', letterSpacing: 'tight', maxWidth: '18ch' })}>
          {identity.statement}
        </h1>
      </Box>

      {/* DARKNESS BAND — one-line positioning subhead */}
      <Box as="section" minH="16vh" padding={{ base: '8 6vw', md: 'clamp(32px,5vw,56px) 6vw' }} bg="bg" display="flex" flexDirection="column" justifyContent="center">
        <h2 className={css({ fontFamily: 'display', fontWeight: 'bold', fontSize: 'clamp(24px,3.5vw,44px)', letterSpacing: 'tight', color: 'accent' })}>
          {identity.name} <span className={css({ color: 'olive.400' })}>— {identity.role}</span>
        </h2>
      </Box>

      {/* TIMELINE */}
      <Box as="section" padding={{ base: '10 6vw', md: 'clamp(48px,7vw,88px) 6vw' }} bg="bgLedger" borderTop="1px solid" borderColor="border">
        <h2 className={css({ fontSize: { base: 'lg', md: 'xl' }, letterSpacing: 'tight', color: 'text', marginBottom: '6' })}>Timeline</h2>
        <Box>
          {timeline.map((entry, i) => (
            <Box
              key={`${entry.year}-${entry.company}`}
              display="flex"
              gap="6"
              padding="5 6"
              bg={i % 2 === 0 ? 'olive.900' : 'olive.800'}
              flexWrap={{ base: 'wrap', md: 'nowrap' }}
            >
              <Box minW="120px" flex="0 0 120px" fontVariantNumeric="tabular-nums" fontFamily="mono" color="accent" fontWeight="bold" fontSize="sm">
                {entry.year}
              </Box>
              <Box>
                <p className={css({ fontFamily: 'display', fontWeight: 'semibold', fontSize: 'md', color: 'olive.100', marginBottom: '1' })}>
                  {entry.role} <span className={css({ color: 'olive.300', fontWeight: 'normal' })}>· {entry.company}</span>
                </p>
                <p className={css({ fontSize: 'sm', color: 'olive.300', lineHeight: 'loose' })}>{entry.description}</p>
              </Box>
            </Box>
          ))}
        </Box>

        {/* CAPABILITIES */}
        <h3 className={css({ fontFamily: 'body', fontWeight: 'bold', fontSize: 'xs', letterSpacing: 'widest', textTransform: 'uppercase', color: 'textSecondary', margin: 'clamp(36px,5vw,56px) 0 4' })}>
          Capabilities
        </h3>
        <Box display="flex" flexWrap="wrap" gap="4" marginBottom="10">
          {capabilities.map((cap) => (
            <span key={cap} className={css({ display: 'flex', alignItems: 'center', gap: '2', fontSize: 'sm', color: 'textSecondary' })}>
              <span className={css({ width: '7px', height: '7px', borderRadius: 'full', background: 'accent', flex: 'none', boxShadow: '0 0 8px token(colors.lime.400/35)' })} />
              {cap}
            </span>
          ))}
        </Box>

        {/* EDUCATION */}
        <h3 className={css({ fontFamily: 'body', fontWeight: 'bold', fontSize: 'xs', letterSpacing: 'widest', textTransform: 'uppercase', color: 'textSecondary', marginBottom: '4' })}>
          Education
        </h3>
        <Box border="1px solid" borderColor="border" borderRadius="md" bg="olive.900" padding="6" maxW="480px">
          <p className={css({ fontFamily: 'display', fontWeight: 'semibold', fontSize: 'md', color: 'text', marginBottom: '1' })}>{education.school}</p>
          <p className={css({ fontSize: 'sm', color: 'textSecondary' })}>{education.degree} · {education.concentration}</p>
          <p className={css({ fontSize: 'xs', color: 'accent', marginTop: '2', fontVariantNumeric: 'tabular-nums' })}>{education.years}</p>
        </Box>
      </Box>

      <Footer personal={personal} />
    </>
  )
}