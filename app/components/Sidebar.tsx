import { Box, Flex } from '../../styled-system/jsx'

export function Sidebar() {
  return (
    <Box
      width="100%"
      background="bgMasthead"
      height="13"
      position="sticky"
      top="0"
      zIndex="10"
      borderBottom="1px solid"
      borderColor="hay.700"
    >
      <Flex
        align="center"
        justify="space-between"
        height="100%"
        maxWidth="1200px"
        mx="auto"
        px="12"
      >
        <Flex align="baseline" gap="2">
          <a href="/">
            <Box
              fontSize="sm"
              fontFamily="body"
              fontWeight="400"
              color="textOnDark"
              letterSpacing="normal"
              _hover={{ color: 'accentLight' }}
            >
              Doug March
            </Box>
          </a>
          <Box
            fontSize="xs"
            fontFamily="body"
            fontWeight="300"
            color="textOnDarkMuted"
          >
            · Designer &amp; Developer
          </Box>
        </Flex>

        <Flex gap="6" align="center">
          <a href="/">
            <Box
              fontSize="xs"
              fontFamily="body"
              fontWeight="500"
              color="textOnDarkMuted"
              letterSpacing="wider"
              textTransform="uppercase"
              _hover={{ color: 'accentLight' }}
            >
              Work
            </Box>
          </a>
          <a href="/about">
            <Box
              fontSize="xs"
              fontFamily="body"
              fontWeight="500"
              color="textOnDarkMuted"
              letterSpacing="wider"
              textTransform="uppercase"
              _hover={{ color: 'accentLight' }}
            >
              About
            </Box>
          </a>
        </Flex>
      </Flex>
    </Box>
  )
}