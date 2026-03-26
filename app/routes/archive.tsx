import { createFileRoute } from '@tanstack/react-router'
import { readArchive, type ArchiveEntry } from '../server/archive'
import { Box, Flex, VStack } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'

export const Route = createFileRoute('/archive')({
  loader: async () => {
    const entries = await readArchive()
    return { entries }
  },
  component: ArchivePage,
})

function ArchivePage() {
  const { entries } = Route.useLoaderData()

  return (
    <Box as="main">
      {/* ─── Header ─── */}
      <Box
        as="section"
        style={{
          minHeight: '40vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '120px 48px 80px',
          maxWidth: '960px',
          margin: '0 auto',
        }}
      >
        <Box
          fontFamily="body"
          fontWeight="400"
          fontSize="2xs"
          color="textMuted"
          letterSpacing="widest"
          style={{ textTransform: 'uppercase', marginBottom: '32px' }}
        >
          Archive
        </Box>

        <Box
          fontFamily="heading"
          fontWeight="700"
          fontSize="xl"
          color="text"
          letterSpacing="tight"
          lineHeight="tight"
          style={{ marginBottom: '32px', textTransform: 'uppercase' }}
        >
          Daily Redesigns
        </Box>

        <Box
          style={{
            width: '80px',
            borderTop: '1px solid #a3b49d',
            marginBottom: '32px',
          }}
        />

        <Box
          fontFamily="body"
          fontWeight="400"
          fontSize="base"
          color="textBody"
          lineHeight="normal"
          style={{ maxWidth: '520px' }}
        >
          Every morning, a multi-agent pipeline redesigns this site from scratch. Each entry below is one day's output — the brief, the rationale, and what changed.
        </Box>
      </Box>

      {/* ─── Entries ─── */}
      <Box
        as="section"
        style={{
          background: '#eaf0e6',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          style={{
            maxWidth: '760px',
            width: '100%',
            padding: '80px 48px',
          }}
        >
          {entries.length === 0 ? (
            <Box
              fontFamily="body"
              fontWeight="300"
              fontSize="sm"
              color="textMuted"
            >
              No archive entries yet.
            </Box>
          ) : (
            <VStack gap="0" align="stretch">
              {entries.map((entry, i) => (
                <ArchiveEntryRow key={entry.date} entry={entry} index={i} total={entries.length} />
              ))}
            </VStack>
          )}
        </Box>
      </Box>

      {/* ─── Footer ─── */}
      <Box
        as="footer"
        style={{
          background: '#2a322a',
          padding: '48px 48px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Flex
          justify="space-between"
          align="center"
          style={{ maxWidth: '760px', width: '100%' }}
        >
          <a
            href="/"
            className={css({
              fontFamily: 'heading',
              fontSize: 'xs',
              letterSpacing: 'wider',
              textDecoration: 'none',
              transition: 'color 200ms ease',
              _hover: { color: 'accentLight' },
            })}
            style={{ color: '#a3b49d' }}
          >
            ← Work
          </a>
          <Box
            fontFamily="body"
            fontWeight="300"
            fontSize="xs"
            style={{ color: '#596658' }}
          >
            © 2026 Doug March
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

function ArchiveEntryRow({
  entry,
  index,
  total,
}: {
  entry: ArchiveEntry
  index: number
  total: number
}) {
  const isLast = index === total - 1

  return (
    <Box
      style={{
        padding: '32px 0',
        borderBottom: isLast ? 'none' : '1px solid #c9d5c4',
      }}
    >
      {/* Date + index */}
      <Flex align="center" gap="4" style={{ marginBottom: '16px' }}>
        <Box
          fontFamily="body"
          fontWeight="400"
          fontSize="2xs"
          color="textMuted"
          letterSpacing="widest"
          style={{ textTransform: 'uppercase', fontVariantNumeric: 'tabular-nums' }}
        >
          {entry.date}
        </Box>
        <Box
          style={{
            width: '1px',
            height: '10px',
            background: '#c9d5c4',
          }}
        />
        <Box
          fontFamily="body"
          fontWeight="400"
          fontSize="2xs"
          color="textMuted"
          style={{ fontVariantNumeric: 'tabular-nums' }}
        >
          #{String(index + 1).padStart(2, '0')}
        </Box>
      </Flex>

      {/* Brief */}
      <Box
        fontFamily="heading"
        fontWeight="600"
        fontSize="base"
        color="text"
        style={{ marginBottom: '12px' }}
      >
        {entry.brief}
      </Box>

      {/* Rationale */}
      {entry.rationale && (
        <Box
          fontFamily="body"
          fontWeight="300"
          fontSize="sm"
          color="textMuted"
          lineHeight="normal"
          style={{ marginBottom: '16px', maxWidth: '600px' }}
        >
          {entry.rationale}
        </Box>
      )}

      {/* Files changed */}
      {entry.filesChanged.length > 0 && (
        <Flex gap="2" style={{ flexWrap: 'wrap' }}>
          {entry.filesChanged.map((file) => (
            <Box
              key={file}
              fontFamily="body"
              fontWeight="400"
              fontSize="2xs"
              color="textMuted"
              style={{
                padding: '3px 8px',
                background: 'rgba(163, 180, 157, 0.2)',
                border: '1px solid #c9d5c4',
                fontVariantNumeric: 'tabular-nums',
                letterSpacing: '0.01em',
              }}
            >
              {file}
            </Box>
          ))}
        </Flex>
      )}
    </Box>
  )
}
