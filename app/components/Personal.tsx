import { Box, Flex } from '../../styled-system/jsx'
import { personal } from '../content/about'

const scoreData = [
  { win: true, score: '4–2' },
  { win: false, score: '1–3' },
  { win: true, score: '3–1' },
  { win: true, score: '24–17' },
]

export function Personal() {
  return (
    <Box>
      {/* SCORES */}
      <Box
        fontSize="2xs"
        fontFamily="body"
        fontWeight="semibold"
        letterSpacing="widest"
        textTransform="uppercase"
        color="textMuted"
        marginBottom="2"
      >
        {personal.sport} Scores
      </Box>
      <Box height="1px" background="borderMuted" marginBottom="3" />

      {personal.teams.map((team, i) => {
        const data = scoreData[i % scoreData.length]
        return (
          <Box
            key={team}
            paddingTop="2"
            paddingBottom="2"
            borderBottomWidth="1px"
            borderBottomStyle="solid"
            borderBottomColor="border"
          >
            <Box
              fontSize="xs"
              fontFamily="body"
              fontWeight="regular"
              color="text"
              marginBottom="1"
              lineHeight="snug"
            >
              {team}
            </Box>
            <Flex align="baseline" gap="2">
              <Box
                fontFamily="heading"
                fontWeight="bold"
                fontSize="md"
                lineHeight="tight"
                color="text"
              >
                {data.score}
              </Box>
              <Box
                fontSize="2xs"
                fontFamily="body"
                fontWeight="semibold"
                letterSpacing="wider"
                color={data.win ? 'textAmber' : 'textMastheadMuted'}
              >
                {data.win ? 'W' : 'L'}
              </Box>
            </Flex>
          </Box>
        )
      })}

      {/* GOLF */}
      <Box marginTop="6">
        <Box
          fontSize="2xs"
          fontFamily="body"
          fontWeight="semibold"
          letterSpacing="widest"
          textTransform="uppercase"
          color="textMuted"
          marginBottom="2"
        >
          Golf
        </Box>
        <Box height="1px" background="borderMuted" marginBottom="3" />
        <Flex align="baseline" gap="2">
          <Box
            fontFamily="heading"
            fontWeight="bold"
            fontSize="md"
            lineHeight="tight"
            color="text"
          >
            {personal.holesInOne}
          </Box>
          <Box
            fontSize="xs"
            fontFamily="body"
            fontWeight="regular"
            color="textMuted"
          >
            career hole{personal.holesInOne !== 1 ? 's' : ''}-in-one
          </Box>
        </Flex>
      </Box>

      {/* FOCUS */}
      <Box marginTop="6">
        <Box
          fontSize="2xs"
          fontFamily="body"
          fontWeight="semibold"
          letterSpacing="widest"
          textTransform="uppercase"
          color="textMuted"
          marginBottom="2"
        >
          Focus
        </Box>
        <Box height="1px" background="borderMuted" marginBottom="3" />
        <Box
          fontSize="xs"
          fontFamily="body"
          fontWeight="regular"
          lineHeight="normal"
          color="textSecondary"
        >
          {personal.currentFocus}
        </Box>
      </Box>
    </Box>
  )
}