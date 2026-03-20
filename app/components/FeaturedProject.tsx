import { Box, Flex } from '../../styled-system/jsx'
import { featuredProject } from '../content/projects'

export function FeaturedProject() {
  if (!featuredProject) return null

  const href = featuredProject.liveUrl || featuredProject.externalUrl

  return (
    <Box>
      {/* Section slug */}
      <Box
        fontSize="2xs"
        fontFamily="body"
        fontWeight="semibold"
        letterSpacing="widest"
        textTransform="uppercase"
        color="accent"
        marginBottom="2"
      >
        Featured
      </Box>
      <Box height="1px" background="borderAccent" marginBottom="6" />

      {/* Headline */}
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
          <Box
            fontFamily="heading"
            fontWeight="black"
            fontSize="2xl"
            lineHeight="tight"
            letterSpacing="tight"
            color="text"
            marginBottom="4"
            style={{ transition: 'color 0.15s ease' }}
          >
            {featuredProject.title}
          </Box>
        </a>
      ) : (
        <a href={`/work/${featuredProject.slug}`} style={{ textDecoration: 'none' }}>
          <Box
            fontFamily="heading"
            fontWeight="black"
            fontSize="2xl"
            lineHeight="tight"
            letterSpacing="tight"
            color="text"
            marginBottom="4"
            style={{ transition: 'color 0.15s ease' }}
          >
            {featuredProject.title}
          </Box>
        </a>
      )}

      {/* Type + Year */}
      <Flex gap="3" align="center" marginBottom="5">
        <Box
          fontSize="2xs"
          fontFamily="body"
          fontWeight="semibold"
          letterSpacing="widest"
          textTransform="uppercase"
          color="textMuted"
        >
          {featuredProject.type}
        </Box>
        <Box width="px" height="3" background="borderMuted" />
        <Box
          fontSize="2xs"
          fontFamily="body"
          fontWeight="semibold"
          letterSpacing="widest"
          textTransform="uppercase"
          color="textMuted"
        >
          {featuredProject.year}
        </Box>
        {featuredProject.role && (
          <>
            <Box width="px" height="3" background="borderMuted" />
            <Box
              fontSize="2xs"
              fontFamily="body"
              fontWeight="semibold"
              letterSpacing="widest"
              textTransform="uppercase"
              color="textMuted"
            >
              {featuredProject.role}
            </Box>
          </>
        )}
      </Flex>

      {/* Problem statement */}
      {featuredProject.problem && (
        <Box
          fontSize="base"
          fontFamily="body"
          fontWeight="regular"
          lineHeight="normal"
          color="textSecondary"
          maxWidth="520px"
          marginBottom="6"
        >
          {featuredProject.problem}
        </Box>
      )}

      {/* CTA */}
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
          <Box
            fontSize="xs"
            fontFamily="body"
            fontWeight="semibold"
            letterSpacing="wider"
            textTransform="uppercase"
            color="accent"
            borderBottomWidth="1px"
            borderBottomStyle="solid"
            borderBottomColor="borderAccent"
            paddingBottom="px"
            display="inline-block"
          >
            View Project →
          </Box>
        </a>
      ) : (
        <a href={`/work/${featuredProject.slug}`} style={{ textDecoration: 'none' }}>
          <Box
            fontSize="xs"
            fontFamily="body"
            fontWeight="semibold"
            letterSpacing="wider"
            textTransform="uppercase"
            color="accent"
            borderBottomWidth="1px"
            borderBottomStyle="solid"
            borderBottomColor="borderAccent"
            paddingBottom="px"
            display="inline-block"
          >
            View Project →
          </Box>
        </a>
      )}
    </Box>
  )
}