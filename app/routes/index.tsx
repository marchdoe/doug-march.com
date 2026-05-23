import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Box, Flex } from '../../styled-system/jsx'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  const specimenLine = css({
    fontFamily: 'display',
    fontSize: 'clamp(64px, 14vw, 210px)',
    lineHeight: 'tight',
    letterSpacing: 'wide',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '{colors.stone.50}',
    margin: 0,
    padding: 0,
  })

  const purposeHighlight = css({
    color: '{colors.violet.400}',
  })

  const footerLabel = css({
    fontFamily: 'mono',
    fontSize: '11px',
    letterSpacing: 'widest',
    textTransform: 'uppercase',
    color: '{colors.stone.500}',
    lineHeight: 'normal',
    transition: 'color 0.2s ease',
  })

  const footerLabelHover = css({
    fontFamily: 'mono',
    fontSize: '11px',
    letterSpacing: 'widest',
    textTransform: 'uppercase',
    color: '{colors.stone.500}',
    lineHeight: 'normal',
    transition: 'color 0.2s ease',
    _hover: { color: '{colors.stone.300}' },
    display: 'inline-block',
    minHeight: '44px',
    minWidth: '44px',
    paddingTop: '12px',
    paddingBottom: '12px',
  })

  const scoreAccent = css({
    color: '{colors.violet.400}',
    fontVariantNumeric: 'tabular-nums',
  })

  const scoreMuted = css({
    color: '{colors.stone.500}',
    fontVariantNumeric: 'tabular-nums',
  })

  const whisper = css({
    fontFamily: 'mono',
    fontSize: '10px',
    letterSpacing: 'wider',
    textTransform: 'uppercase',
    color: '{colors.stone.600}',
    lineHeight: 'normal',
  })

  const attribution = css({
    fontFamily: 'body',
    fontSize: '11px',
    fontStyle: 'italic',
    color: '{colors.stone.500}',
    lineHeight: 'normal',
  })

  return (
    <>
      {/* Specimen Zone */}
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        minHeight="78vh"
      >
        <div aria-label="Hero phrase: The purpose of life is the life of purpose">
          <p className={specimenLine}>
            The <span className={purposeHighlight}>Purpose</span>
          </p>
          <p className={specimenLine}>
            of life is
          </p>
          <p className={specimenLine}>
            the life of
          </p>
          <p className={specimenLine}>
            <span className={purposeHighlight}>Purpose.</span>
          </p>
        </div>
      </Box>

      {/* Signal Footer */}
      <Box
        borderTop="1px solid"
        borderColor="border"
        paddingTop="3vh"
      >
        {/* Desktop layout */}
        <Flex
          justifyContent="space-between"
          alignItems="flex-end"
          flexWrap="wrap"
          gap="4"
          display={{ base: 'none', md: 'flex' }}
        >
          {/* Left cluster: signals */}
          <Flex alignItems="baseline" gap="3" flexWrap="wrap">
            <span className={footerLabel}>Memorial Day Mon</span>
            <span className={css({ color: '{colors.stone.700}' })}>·</span>
            <span className={footerLabel}>
              Si Woo Kim <span className={scoreAccent}>−18</span>
            </span>
            <span className={css({ color: '{colors.stone.700}' })}>·</span>
            <span className={footerLabel}>
              <span className={scoreMuted}>Tigers 4–7</span>
            </span>
            <span className={css({ color: '{colors.stone.700}' })}>·</span>
            <span className={footerLabel}>◑ First Quarter</span>
            <span className={css({ color: '{colors.stone.700}' })}>·</span>
            <span className={footerLabel}>14.4h Daylight · 23 May 2026</span>
          </Flex>

          {/* Right cluster: nav + attribution + music */}
          <Flex alignItems="flex-end" gap="6" flexDirection="column">
            <Flex gap="6" alignItems="baseline">
              <a href="/" className={footerLabelHover} aria-label="Home">Home</a>
              <a href="/about" className={footerLabelHover} aria-label="About">About</a>
              <a href="/archive" className={footerLabelHover} aria-label="Archive">Archive</a>
            </Flex>
            <Flex gap="4" alignItems="baseline">
              <span className={whisper}>Guided by Voices · My Morning Jacket</span>
              <span className={attribution}>— Robin Sharma</span>
            </Flex>
          </Flex>
        </Flex>

        {/* Mobile layout */}
        <Box display={{ base: 'block', md: 'none' }}>
          <Flex flexDirection="column" gap="4">
            <Flex flexWrap="wrap" gap="2" alignItems="baseline">
              <span className={footerLabel}>Memorial Day Mon</span>
              <span className={css({ color: '{colors.stone.700}' })}>·</span>
              <span className={footerLabel}>
                Si Woo Kim <span className={scoreAccent}>−18</span>
              </span>
            </Flex>
            <Flex flexWrap="wrap" gap="2" alignItems="baseline">
              <span className={footerLabel}>
                <span className={scoreMuted}>Tigers 4–7</span>
              </span>
              <span className={css({ color: '{colors.stone.700}' })}>·</span>
              <span className={footerLabel}>◑ First Quarter</span>
              <span className={css({ color: '{colors.stone.700}' })}>·</span>
              <span className={footerLabel}>14.4h Daylight</span>
            </Flex>
            <Flex flexWrap="wrap" gap="2" alignItems="baseline">
              <span className={footerLabel}>23 May 2026</span>
            </Flex>

            <Flex
              gap="6"
              alignItems="baseline"
              paddingTop="2"
              borderTop="1px solid"
              borderColor="border"
            >
              <a href="/" className={footerLabelHover}>Home</a>
              <a href="/about" className={footerLabelHover}>About</a>
              <a href="/archive" className={footerLabelHover}>Archive</a>
            </Flex>

            <Flex justifyContent="space-between" alignItems="baseline">
              <span className={whisper}>Guided by Voices · My Morning Jacket</span>
              <span className={attribution}>— Robin Sharma</span>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </>
  )
}