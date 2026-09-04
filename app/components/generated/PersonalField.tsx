import { Box } from '../../../styled-system/jsx'
import type { personal as PersonalType } from '../../content/about'

export function PersonalField({ personal }: { personal: typeof PersonalType }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="4"
      fontFamily="display"
      fontSize="sm"
      color="fieldInkMuted"
    >
      <Box
        fontFamily="display"
        fontWeight="700"
        fontSize="2xl"
        color="fieldInk"
        letterSpacing="tight"
      >
        {personal.currentFocus}
      </Box>
      <Box>Holes in one: {personal.holesInOne}</Box>
      <Box>Sport: {personal.sport}</Box>
      <Box>Teams: {personal.teams.join(', ')}</Box>
    </Box>
  )
}
