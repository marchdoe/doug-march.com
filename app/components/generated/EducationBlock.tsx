import { Box } from '../../../styled-system/jsx'
import type { Education } from '../../content/timeline'

export function EducationBlock({ education }: { education: Education }) {
  return (
    <Box
      border="1px solid"
      borderColor="borderStrong"
      p="6"
      fontFamily="display"
      fontSize="sm"
      color="textMuted"
      display="flex"
      flexDirection="column"
      gap="2"
      mt="8"
    >
      <Box color="text" fontWeight="700" letterSpacing="wide" textTransform="uppercase">
        {education.school}
      </Box>
      <Box>{education.degree}</Box>
      <Box color="textFaint">{education.concentration}</Box>
      <Box color="textFaint">{education.years}</Box>
    </Box>
  )
}
