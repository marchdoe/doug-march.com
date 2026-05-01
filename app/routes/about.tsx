import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Box, Flex, Grid } from '../../styled-system/jsx'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <Box maxW="1200px" mx="auto" px={{ base: '16', md: '32', lg: '48' }} width="100%">
      <Grid
        gridTemplateColumns={{ base: '1fr', lg: '2fr 1fr' }}
        columnGap="0"
      >
        {/* Main Column */}
        <Box
          py="40"
          pr={{ base: '0', lg: '32' }}
          borderRight={{ base: 'none', lg: '1px solid {colors.neutral.200}' }}
        >
          {/* Identity */}
          <Box mb="40" pb="32" borderBottom="1px solid {colors.neutral.800}">
            <Box
              fontFamily="heading"
              fontWeight="700"
              fontSize={{ base: '28px', md: '37px' }}
              lineHeight="snug"
              letterSpacing="tight"
              color="{colors.neutral.800}"
              mb="8"
            >
              {identity.name}
            </Box>
            <Box
              fontFamily="body"
              fontSize="14px"
              letterSpacing="wide"
              color="{colors.accent.DEFAULT}"
              mb="24"
              textTransform="uppercase"
            >
              {identity.role}
            </Box>
            <Box
              fontFamily="body"
              fontSize="16px"
              lineHeight="normal"
              color="{colors.neutral.600}"
              maxW="600px"
            >
              {identity.statement}
            </Box>
          </Box>

          {/* Timeline */}
          <Box mb="40">
            <Box
              fontFamily="heading"
              fontSize="9px"
              letterSpacing="widest"
              color="{colors.neutral.500}"
              textTransform="uppercase"
              mb="16"
              pb="8"
              borderBottom="1px solid {colors.neutral.800}"
            >
              Experience
            </Box>
            {timeline.map((entry) => (
              <Flex
                key={entry.year + entry.company}
                gap={{ base: '16', md: '24' }}
                py="12"
                borderBottom="1px solid {colors.neutral.100}"
                flexDirection={{ base: 'column', md: 'row' }}
              >
                <Box
                  fontFamily="mono"
                  fontSize="13px"
                  color="{colors.neutral.400}"
                  minW="120px"
                  flexShrink={0}
                  fontVariantNumeric="tabular-nums"
                >
                  {entry.year}
                </Box>
                <Box flex="1">
                  <Box fontFamily="body" fontSize="16px" fontWeight="500" color="{colors.neutral.800}">
                    {entry.role}
                  </Box>
                  <Box fontFamily="body" fontSize="13px" color="{colors.neutral.500}" mb="4">
                    {entry.company}
                  </Box>
                  <Box
                    fontFamily="body"
                    fontSize="14px"
                    lineHeight="normal"
                    color="{colors.neutral.600}"
                    maxW="520px"
                  >
                    {entry.description}
                  </Box>
                </Box>
              </Flex>
            ))}
          </Box>

          {/* Education */}
          <Box mb="40">
            <Box
              fontFamily="heading"
              fontSize="9px"
              letterSpacing="widest"
              color="{colors.neutral.500}"
              textTransform="uppercase"
              mb="16"
              pb="8"
              borderBottom="1px solid {colors.neutral.800}"
            >
              Education
            </Box>
            <Flex gap="24" py="12" flexDirection={{ base: 'column', md: 'row' }}>
              <Box fontFamily="mono" fontSize="13px" color="{colors.neutral.400}" minW="120px" flexShrink={0}>
                {education.years}
              </Box>
              <Box>
                <Box fontFamily="body" fontSize="16px" fontWeight="500" color="{colors.neutral.800}">
                  {education.degree}
                </Box>
                <Box fontFamily="body" fontSize="13px" color="{colors.neutral.500}">
                  {education.concentration} — {education.school}
                </Box>
              </Box>
            </Flex>
          </Box>
        </Box>

        {/* Side Column */}
        <Box
          py="40"
          pl={{ base: '0', lg: '24' }}
          borderTop={{ base: '1px solid {colors.neutral.200}', lg: 'none' }}
        >
          {/* Capabilities */}
          <Box mb="32">
            <Box
              fontFamily="heading"
              fontSize="9px"
              letterSpacing="widest"
              color="{colors.neutral.500}"
              textTransform="uppercase"
              mb="16"
              pb="8"
              borderBottom="1px solid {colors.neutral.800}"
            >
              Capabilities
            </Box>
            <Flex gap="8" flexWrap="wrap">
              {capabilities.map((cap) => (
                <Box
                  key={cap}
                  fontFamily="body"
                  fontSize="12px"
                  letterSpacing="wide"
                  color="{colors.neutral.600}"
                  px="12"
                  py="4"
                  border="1px solid {colors.neutral.200}"
                  borderRadius="sm"
                >
                  {cap}
                </Box>
              ))}
            </Flex>
          </Box>

          {/* Personal */}
          <Box>
            <Box
              fontFamily="heading"
              fontSize="9px"
              letterSpacing="widest"
              color="{colors.neutral.500}"
              textTransform="uppercase"
              mb="16"
              pb="8"
              borderBottom="1px solid {colors.neutral.800}"
            >
              Personal
            </Box>
            <Box mb="16">
              <Box fontFamily="body" fontSize="12px" letterSpacing="wider" color="{colors.neutral.400}" textTransform="uppercase" mb="4">
                Holes in One
              </Box>
              <Box fontFamily="heading" fontWeight="700" fontSize="28px" color="{colors.neutral.800}" letterSpacing="tight">
                {personal.holesInOne}
              </Box>
            </Box>
            <Box mb="16">
              <Box fontFamily="body" fontSize="12px" letterSpacing="wider" color="{colors.neutral.400}" textTransform="uppercase" mb="4">
                Sport
              </Box>
              <Box fontFamily="body" fontSize="15px" color="{colors.neutral.600}">
                {personal.sport}
              </Box>
            </Box>
            <Box mb="16">
              <Box fontFamily="body" fontSize="12px" letterSpacing="wider" color="{colors.neutral.400}" textTransform="uppercase" mb="4">
                Teams
              </Box>
              {personal.teams.map((team) => (
                <Box key={team} fontFamily="body" fontSize="15px" color="{colors.neutral.600}" mb="2">
                  {team}
                </Box>
              ))}
            </Box>
            <Box>
              <Box fontFamily="body" fontSize="12px" letterSpacing="wider" color="{colors.neutral.400}" textTransform="uppercase" mb="4">
                Current Focus
              </Box>
              <Box fontFamily="body" fontSize="15px" lineHeight="normal" color="{colors.neutral.600}">
                {personal.currentFocus}
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Box>
  )
}