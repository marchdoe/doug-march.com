import { Flex, Box } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import logoMono from '../assets/logo-mono.svg'

export function Sidebar() {
  return (
    <Box
      as="header"
      bg="panel"
      color="knockout"
      borderBottom="4px solid"
      borderColor="border"
    >
      <Flex
        align="center"
        justify="space-between"
        gap="4"
        wrap="wrap"
        minH="64px"
        px={{ base: '5', md: '12' }}
        py="2"
      >
        <a
          href="/"
          aria-label="Doug March — home"
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: '3',
            color: 'knockout',
            lineHeight: '1',
          })}
        >
          <img
            src={logoMono}
            alt=""
            className={css({ height: '36px', width: 'auto', color: 'knockout' })}
          />
          <styled.span
            className={css({
              fontFamily: 'display',
              fontWeight: 'bold',
              fontSize: 'xl',
              letterSpacing: 'wide',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            })}
          >
            Doug March
          </styled.span>
        </a>

        <Box
          flex="1 1 auto"
          textAlign="center"
          fontSize="2xs"
          letterSpacing="widest"
          textTransform="uppercase"
          color="knockout"
        >
          Sunday · July 19 2026 · Late Edition
        </Box>

        <Flex as="nav" gap="5" aria-label="Primary">
          <a
            href="/#work"
            className={css({
              fontSize: 'xs',
              fontWeight: 'bold',
              letterSpacing: 'wider',
              textTransform: 'uppercase',
              padding: '2px 4px',
              color: 'knockout',
              transition: 'color .18s ease, background .18s ease',
              _hover: { bg: 'bg', color: 'text' },
            })}
          >
            Work
          </a>
          <a
            href="/about"
            className={css({
              fontSize: 'xs',
              fontWeight: 'bold',
              letterSpacing: 'wider',
              textTransform: 'uppercase',
              padding: '2px 4px',
              color: 'knockout',
              transition: 'color .18s ease, background .18s ease',
              _hover: { bg: 'bg', color: 'text' },
            })}
          >
            About
          </a>
          <a
            href="/#index"
            className={css({
              fontSize: 'xs',
              fontWeight: 'bold',
              letterSpacing: 'wider',
              textTransform: 'uppercase',
              padding: '2px 4px',
              color: 'knockout',
              transition: 'color .18s ease, background .18s ease',
              _hover: { bg: 'bg', color: 'text' },
            })}
          >
            Index
          </a>
        </Flex>
      </Flex>
    </Box>
  )
}

// local import kept minimal; styled used only for the brand name span
import { styled } from '../../styled-system/jsx'