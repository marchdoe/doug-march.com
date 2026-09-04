import { createFileRoute } from '@tanstack/react-router'
import { Box } from '../../styled-system/jsx'
import { HeroPanel } from '../components/generated/HeroPanel'
import { FieldPanel } from '../components/generated/FieldPanel'
import { FeaturedProjectCard } from '../components/generated/FeaturedProjectCard'
import { WorkRowList } from '../components/generated/WorkRowList'
import { featuredProject, selectedWork, experiments, projects } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  const years = projects.map((p) => p.year)
  const minYear = Math.min(...years)
  const maxYear = Math.max(...years)

  return (
    <>
      <Box
        display="grid"
        gridTemplateColumns={{ base: '1fr', md: '7fr 5fr' }}
        minH={{ md: '82vh' }}
      >
        <HeroPanel
          eyebrow="Dispatch · 2026-09-04 · Aldie VA"
          heading={
            <>
              Where did
              <br />
              the work
              <br />
              <Box as="span" color="accent">
                go?
              </Box>
            </>
          }
          standfirst={
            <>
              The whole feed asks it this week —{' '}
              <Box as="b" color="text" fontWeight="500">
                AI is making development faster, but where did the work go?
              </Box>{' '}
              This portfolio is the object that question interrogates: a site redrawn nightly by an
              agent. The answer isn&apos;t hidden. It&apos;s catalogued below.
            </>
          }
        />
        <FieldPanel tag="Featured — the answer">
          <Box
            fontFamily="display"
            fontWeight="700"
            fontSize={{ base: '5xl', md: 'hero' }}
            lineHeight="tight"
            letterSpacing="tight"
            color="fieldInk"
          >
            Here,
            <br />
            all
            <br />
            of it.
          </Box>
          {featuredProject && <FeaturedProjectCard project={featuredProject} />}
        </FieldPanel>
      </Box>

      <Box
        as="section"
        bg="bg"
        px={{ base: '5', md: '6' }}
        py={{ base: '10', md: '9' }}
        borderTop="1px solid"
        borderColor="borderStrong"
      >
        <Box
          display="flex"
          alignItems="baseline"
          justifyContent="space-between"
          gap="5"
          flexWrap="wrap"
          mb="8"
        >
          <Box
            as="h2"
            fontFamily="display"
            fontWeight="700"
            fontSize={{ base: '3xl', md: '4xl' }}
            letterSpacing="tight"
            color="text"
          >
            Selected work
          </Box>
          <Box
            fontFamily="display"
            fontSize="2xs"
            letterSpacing="wide"
            textTransform="uppercase"
            color="textFaint"
          >
            {String(projects.length).padStart(2, '0')} entries · {minYear} → {maxYear}
          </Box>
        </Box>

        <WorkRowList projects={selectedWork} startIndex={1} />

        <Box
          fontFamily="display"
          fontSize="2xs"
          letterSpacing="wide"
          textTransform="uppercase"
          color="textFaint"
          mt="10"
          pt="5"
          borderTop="1px solid"
          borderColor="borderStrong"
        >
          Experiments — where the questions get tested
        </Box>
        <Box mt="4">
          <WorkRowList projects={experiments} startIndex={selectedWork.length + 1} />
        </Box>
      </Box>
    </>
  )
}
