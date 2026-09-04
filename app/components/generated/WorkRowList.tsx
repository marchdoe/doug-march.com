import { Grid, Box } from '../../../styled-system/jsx'
import { css } from '../../../styled-system/css'
import type { Project } from '../../content/projects'

export function WorkRowList({ projects, startIndex }: { projects: Project[]; startIndex: number }) {
  return (
    <Grid columns={{ base: 1, md: 2, lg: 3 }} gap="0" columnGap="5">
      {projects.map((project, i) => {
        const idx = String(startIndex + i).padStart(2, '0')
        const href = project.externalUrl ?? `/work/${project.slug}`
        const external = Boolean(project.externalUrl)
        return (
          <a
            key={project.slug}
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener' : undefined}
            className={css({
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              alignItems: 'baseline',
              gap: '2',
              py: '5',
              borderTop: '1px solid',
              borderColor: 'border',
              _hover: { bg: 'bgAlt' },
            })}
          >
            <Box
              gridColumn="1 / -1"
              fontFamily="display"
              fontSize="2xs"
              letterSpacing="wide"
              color="textFaint"
              textTransform="uppercase"
            >
              {idx} — {project.type}
            </Box>
            <Box
              fontFamily="display"
              fontWeight="700"
              fontSize={{ base: 'xl', md: '2xl' }}
              letterSpacing="tight"
              color="text"
              lineHeight="tight"
              className={css({
                borderBottom: '1px solid transparent',
                _groupHover: { color: 'accent' },
              })}
            >
              {project.title}
            </Box>
            <Box
              fontFamily="display"
              fontSize="2xs"
              letterSpacing="wide"
              textTransform="uppercase"
              color="textMuted"
              textAlign="right"
              whiteSpace="nowrap"
            >
              {project.type}
              <br />
              <Box as="span" color="textFaint">
                {project.year}
              </Box>
            </Box>
          </a>
        )
      })}
    </Grid>
  )
}
