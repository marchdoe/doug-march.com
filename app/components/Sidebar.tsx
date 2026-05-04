import logoSvg from '../assets/logo.svg'
import { Box, Flex, VStack } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'

export function Sidebar() {
  return (
    <Box
      className={css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100vh',
        background: 'bg-panel',
        borderRight: '1px solid',
        borderColor: 'border',
        padding: '64px 48px 48px',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '38%',
        overflowY: 'auto',
        '@media (max-width: 767px)': {
          position: 'relative',
          width: '100%',
          height: 'auto',
          padding: '32px 24px',
          borderRight: 'none',
          borderBottom: '1px solid',
          borderColor: 'border',
        },
        '@media (min-width: 768px) and (max-width: 1023px)': {
          width: '36%',
          padding: '48px 32px 40px',
        },
      })}
    >
      {/* Top: Identity */}
      <Box>
        <Flex align="center" gap="16px" mb="8px">
          <img
            src={logoSvg}
            alt="Doug March logo"
            className={css({ width: '36px', height: '36px' })}
          />
        </Flex>
        <Box
          className={css({
            fontFamily: 'space-grotesk',
            fontSize: 'clamp(28px, 3vw, 37px)',
            fontWeight: 'bold',
            lineHeight: 'tight',
            letterSpacing: 'tight',
            color: 'text-heading',
            marginBottom: '8px',
          })}
        >
          Doug March
        </Box>
        <Box
          className={css({
            fontFamily: 'work-sans',
            fontSize: '13px',
            color: 'text-muted',
            letterSpacing: 'wide',
          })}
        >
          Product Designer &amp; Developer
        </Box>

        {/* Score badges */}
        <Flex gap="8px" mt="24px" flexWrap="wrap">
          <Box
            className={css({
              background: 'bg-card',
              border: '1px solid',
              borderColor: 'border',
              borderRadius: 'sm',
              padding: '4px 10px',
              fontFamily: 'space-grotesk',
              fontSize: '11px',
              letterSpacing: 'wider',
              color: 'text-secondary',
              fontVariantNumeric: 'tabular-nums',
              whiteSpace: 'nowrap',
            })}
          >
            DET 116–94{' '}
            <Box as="span" color="accent-dark" fontWeight="semibold">
              W
            </Box>
          </Box>
          <Box
            className={css({
              background: 'bg-card',
              border: '1px solid',
              borderColor: 'border',
              borderRadius: 'sm',
              padding: '4px 10px',
              fontFamily: 'space-grotesk',
              fontSize: '11px',
              letterSpacing: 'wider',
              color: 'text-secondary',
              fontVariantNumeric: 'tabular-nums',
              whiteSpace: 'nowrap',
            })}
          >
            DET 7–1{' '}
            <Box as="span" color="accent-dark" fontWeight="semibold">
              W
            </Box>
          </Box>
        </Flex>
      </Box>

      {/* Middle: Nav */}
      <VStack
        gap="0"
        align="stretch"
        className={css({
          '@media (max-width: 767px)': {
            flexDirection: 'row',
            gap: '24px',
            marginTop: '24px',
            marginBottom: '24px',
          },
        })}
      >
        <a
          href="/"
          className={css({
            display: 'block',
            fontFamily: 'space-grotesk',
            fontSize: '13px',
            letterSpacing: 'wide',
            color: 'text-muted',
            textDecoration: 'none',
            padding: '6px 12px',
            borderLeft: '2px solid transparent',
            minHeight: '44px',
            lineHeight: '32px',
            transition: 'color 120ms ease, border-color 120ms ease',
            _hover: {
              color: 'text-heading',
            },
            _focus: {
              outline: '2px solid',
              outlineColor: 'accent',
              outlineOffset: '2px',
            },
            '@media (prefers-reduced-motion: reduce)': {
              transition: 'none',
            },
          })}
        >
          Work
        </a>
        <a
          href="/about"
          className={css({
            display: 'block',
            fontFamily: 'space-grotesk',
            fontSize: '13px',
            letterSpacing: 'wide',
            color: 'text-muted',
            textDecoration: 'none',
            padding: '6px 12px',
            borderLeft: '2px solid transparent',
            minHeight: '44px',
            lineHeight: '32px',
            transition: 'color 120ms ease, border-color 120ms ease',
            _hover: {
              color: 'text-heading',
            },
            _focus: {
              outline: '2px solid',
              outlineColor: 'accent',
              outlineOffset: '2px',
            },
            '@media (prefers-reduced-motion: reduce)': {
              transition: 'none',
            },
          })}
        >
          About
        </a>
      </VStack>

      {/* Bottom: Quote + contact */}
      <Box>
        <Box
          className={css({
            borderTop: '1px solid',
            borderColor: 'border-subtle',
            paddingTop: '16px',
            marginBottom: '20px',
          })}
        >
          <Box
            className={css({
              fontFamily: 'space-grotesk',
              fontSize: '13px',
              fontStyle: 'italic',
              lineHeight: 'loose',
              color: 'text-muted',
            })}
          >
            — If you believe you can, you can.
          </Box>
        </Box>
        <Flex gap="16px" flexWrap="wrap">
          <a
            href="/archive"
            className={css({
              fontFamily: 'space-grotesk',
              fontSize: '11px',
              letterSpacing: 'wider',
              color: 'text-light',
              textDecoration: 'none',
              minHeight: '44px',
              minWidth: '44px',
              display: 'inline-flex',
              alignItems: 'center',
              transition: 'color 120ms ease',
              _hover: { color: 'accent' },
              _focus: {
                outline: '2px solid',
                outlineColor: 'accent',
                outlineOffset: '2px',
              },
              '@media (prefers-reduced-motion: reduce)': {
                transition: 'none',
              },
            })}
          >
            Archive
          </a>
        </Flex>
      </Box>
    </Box>
  )
}