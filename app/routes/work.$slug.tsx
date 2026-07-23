import { createFileRoute } from '@tanstack/react-router'
import { Box, Grid, Flex } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'
import { SmallCaps, TileBox, LinkArrow, WRow } from '../components/Tile'

export const Route = createFileRoute('/work/$slug')({ component: WorkDetailPage })

function WorkDetailPage() {
  const { slug } = Route.useParams()
  const index = projects.findIndex((p) => p.slug === slug)
  const project = projects[index] ?? projects[0]
  const prev = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]

  return (
    <Grid
      gridTemplateColumns={{ base: '1fr', md: 'repeat(12, 1fr)' }}
      gridAutoRows={{ md: 'minmax(72px, auto)' }}
      gap={{ base: '4', md: '6' }}
    >
      {/* HERO */}
      <Box
        className={css({ gridColumn: { md: '1 / 9' }, gridRow: { md: '1 / 4' } })}
        background="radial-gradient(120% 120% at 22% 12%, {colors.brand.600} 0%, {colors.brand.800} 55%, {colors.brand.900} 100%)"
        border="1px solid"
        borderColor="border"
        borderRadius="lg"
        padding={{ base: '6', md: '10' }}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        minH={{ base: '38vh', md: '42vh' }}
        gap="6"
      >
        <SmallCaps color="accentGlow">
          {project.type} · {project.year}
        </SmallCaps>
        <Box
          as="h1"
          fontFamily="display"
          fontSize="clamp(48px, 9vw, 120px)"
          lineHeight="tight"
          letterSpacing="tight"
          textTransform="uppercase"
          color="text"
        >
          {project.title}
        </Box>
        <Flex wrap="wrap" gap="6" align="flex-end" justify="space-between">
          {project.problem && (
            <Box fontSize="sm" color="textSecondary" maxW="46ch" lineHeight="loose">
              {project.problem}
            </Box>
          )}
          {(project.liveUrl || project.externalUrl) && (
            <LinkArrow href={project.liveUrl ?? project.externalUrl} target="_blank" rel="noopener">
              Visit live ↗
            </LinkArrow>
          )}
        </Flex>
      </Box>

      {/* METADATA RAIL */}
      <TileBox
        background="surfaceQuiet"
        className={css({ gridColumn: { md: '9 / 13' }, gridRow: { md: '1 / 4' } })}
        display="flex"
        flexDirection="column"
        gap="5"
      >
        <SmallCaps color="accentGlow">Project charge</SmallCaps>
        {project.role && (
          <Box borderTop="1px solid" borderColor="border" paddingTop="3">
            <SmallCaps>Role</SmallCaps>
            <Box fontSize="sm" color="textSecondary" mt="1">
              {project.role}
            </Box>
          </Box>
        )}
        <Box borderTop="1px solid" borderColor="border" paddingTop="3">
          <SmallCaps>Type · Year</SmallCaps>
          <Box fontSize="sm" color="textSecondary" mt="1" fontVariantNumeric="tabular-nums">
            {project.type} · {project.year}
          </Box>
        </Box>
        {project.stack && project.stack.length > 0 && (
          <Box borderTop="1px solid" borderColor="border" paddingTop="3">
            <SmallCaps>Stack</SmallCaps>
            <Box fontSize="sm" color="textSecondary" mt="1">
              {project.stack.join(' · ')}
            </Box>
          </Box>
        )}
        <Box borderTop="1px solid" borderColor="border" paddingTop="3">
          <WRow href={`/work/${prev.slug}`}>
            <Box fontWeight="bold" fontSize="sm" color="text">
              ← {prev.title}
            </Box>
            <Box fontSize="xs" color="textMuted">
              Prev
            </Box>
          </WRow>
          <WRow href={`/work/${next.slug}`}>
            <Box fontWeight="bold" fontSize="sm" color="text">
              {next.title} →
            </Box>
            <Box fontSize="xs" color="textMuted">
              Next
            </Box>
          </WRow>
        </Box>
      </TileBox>

      {/* NARRATIVE */}
      <TileBox
        className={css({ gridColumn: { md: '1 / 9' }, gridRow: { md: '4 / 8' } })}
        display="flex"
        flexDirection="column"
        gap="6"
      >
        <Box maxW="70ch">
          {project.approach && (
            <Box mb="6">
              <SmallCaps color="accentGlow">Approach</SmallCaps>
              <Box fontSize="md" color="textSecondary" lineHeight="loose" mt="2">
                {project.approach}
              </Box>
            </Box>
          )}
          {project.outcome && (
            <Box>
              <SmallCaps color="accentGlow">Outcome</SmallCaps>
              <Box fontSize="md" color="textSecondary" lineHeight="loose" mt="2">
                {project.outcome}
              </Box>
            </Box>
          )}
          {!project.approach && !project.outcome && project.description && (
            <Box fontSize="md" color="textSecondary" lineHeight="loose">
              {project.description}
            </Box>
          )}
        </Box>
      </TileBox>
    </Grid>
  )
}