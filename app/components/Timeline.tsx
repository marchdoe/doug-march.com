import { Box, Flex } from '../../styled-system/jsx'
import { SectionHead } from './SectionHead'
import { timeline } from '../content/timeline'

export function Timeline() {
  return (
    <Box>
      <SectionHead label="Experience" />
      <Box>
        {timeline.map((entry, index) => (
          <Box
            key={`${entry.year}-${entry.company}`}
            paddingTop="4"
            paddingBottom="4"
            borderBottomWidth="1px"
            borderBottomStyle="solid"
            borderBottomColor="border"
          >
            <Flex gap="6" align="flex-start">
              <Box
                fontSize="xs"
                fontFamily="body"
                fontWeight="regular"
                color="textMuted"
                letterSpacing="normal"
                style={{ fontVariantNumeric: 'tabular-nums', minWidth: '44px', flexShrink: 0 }}
              >
                {entry.year}
              </Box>
              <Box flex="1">
                <Flex align="baseline" gap="2" marginBottom="1">
                  <Box
                    fontSize="sm"
                    fontFamily="body"
                    fontWeight="semibold"
                    color="text"
                    lineHeight="snug"
                  >
                    {entry.role}
                  </Box>
                  {entry.current && (
                    <Box
                      fontSize="2xs"
                      fontFamily="body"
                      fontWeight="semibold"
                      letterSpacing="widest"
                      textTransform="uppercase"
                      color="accent"
                      paddingTop="px"
                      paddingBottom="px"
                      paddingLeft="1"
                      paddingRight="1"
                      borderWidth="1px"
                      borderStyle="solid"
                      borderColor="borderAccent"
                    >
                      Now
                    </Box>
                  )}
                </Flex>
                <Box
                  fontSize="xs"
                  fontFamily="body"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  textTransform="uppercase"
                  color="textMuted"
                  marginBottom="2"
                >
                  {entry.company}
                </Box>
                <Box
                  fontSize="sm"
                  fontFamily="body"
                  fontWeight="regular"
                  lineHeight="normal"
                  color="textSecondary"
                >
                  {entry.description}
                </Box>
              </Box>
            </Flex>
          </Box>
        ))}
      </Box>
    </Box>
  )
}