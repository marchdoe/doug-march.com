import { Box, Grid } from '../../../styled-system/jsx'
import { css } from '../../../styled-system/css'
import { ContactColophon } from './ContactColophon'

type WorkItem = { slug: string; title: string; type: string; year: number; externalUrl?: string }

function WorkColumn({ heading, items }: { heading: string; items: WorkItem[] }) {
  return (
    <Box>
      <h2
        className={css({
          fontSize: 'xs',
          textTransform: 'uppercase',
          letterSpacing: 'wide',
          color: 'textFaint',
          borderBottom: '1px solid',
          borderColor: 'border',
          pb: '2',
          mb: '2',
        })}
      >
        {heading}
      </h2>
      {items.map((item) => (
        <a
          key={item.slug}
          href={item.externalUrl ?? `/work/${item.slug}`}
          className={css({
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            gap: '4',
            borderBottom: '1px solid',
            borderColor: 'border',
            py: '3',
            minHeight: '44px',
            '&:hover > span:first-child': { color: 'accent' },
          })}
        >
          <span
            className={css({
              fontSize: { base: 'xl', lg: '2xl' },
              fontWeight: '600',
              color: 'text',
            })}
          >
            {item.title}
          </span>
          <span
            className={css({
              fontSize: 'xs',
              letterSpacing: 'wide',
              color: 'textMuted',
              whiteSpace: 'nowrap',
            })}
          >
            {item.type} · {item.year}
          </span>
        </a>
      ))}
    </Box>
  )
}

export function WorkFooter({
  selectedWork,
  experiments,
  email,
  name,
  role,
}: {
  selectedWork: WorkItem[]
  experiments: WorkItem[]
  email: string
  name: string
  role: string
}) {
  return (
    <Box
      as="footer"
      position="relative"
      bg="bg"
      borderTop="2px solid"
      borderColor="borderStrong"
      px={{ base: '5', md: '7', lg: '9' }}
      py={{ base: '9', lg: '9' }}
    >
      <Grid gap="9" gridTemplateColumns={{ base: '1fr', lg: '1.15fr 0.85fr' }}>
        <WorkColumn heading="Selected work" items={selectedWork} />
        <WorkColumn heading="Experiments" items={experiments} />
      </Grid>
      <Box mt="9" borderTop="1px solid" borderColor="border" pt="5">
        <ContactColophon email={email} name={name} role={role} />
      </Box>
    </Box>
  )
}
