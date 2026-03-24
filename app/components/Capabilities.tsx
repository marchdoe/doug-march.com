import { Box, Flex } from '../../styled-system/jsx'
import { SectionHead } from './SectionHead'
import { capabilities } from '../content/timeline'

export function Capabilities() {
  return (
    <Box>
      <SectionHead label="Capabilities" />
      <Flex gap="2" flexWrap="wrap">
        {capabilities.map((cap) => (
          <Box
            key={cap}
            fontSize="2xs"
            fontFamily="body"
            fontWeight="semibold"
            letterSpacing="wide"
            color="textSecondary"
            paddingTop="1"
            paddingBottom="1"
            paddingLeft="2"
            paddingRight="2"
            borderWidth="1px"
            borderStyle="solid"
            borderColor="border"
            background="bgColumnFill"
          >
            {cap}
          </Box>
        ))}
      </Flex>
    </Box>
  )
}