import { IconButton, styled, Theme, Tooltip, alpha, Stack } from '@mui/material'
import { useAudio } from 'react-use'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import PauseCircleIcon from '@mui/icons-material/PauseCircle'
import { Box, Text } from 'presentation/components'
import DownloadIcon from '@mui/icons-material/Download'
import { toMinutesAndSeconds } from 'presentation/helpers'

const Container = styled('div')(({ theme, color }) => ({
  border: '1px solid',
  borderColor: color,
  backgroundColor: alpha(color, 0.2),
  borderRadius: Number(theme.shape.borderRadius) * 1,
  padding: theme.spacing(1.5),
  position: 'relative'
}))

const Actions = styled('div')(() => ({
  position: 'absolute',
  right: 5,
  top: 5
}))

const Times = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: theme.spacing(0.5)
}))

const Duration = styled('div')(({ theme, color }) => ({
  width: '100%',
  height: 4,
  backgroundColor: alpha(color, 0.6),
  borderRadius: 4,
  marginTop: theme.spacing(0.5)
}))

interface Progressable {
  time: number
}

const Progress = styled('div')<Progressable>(
  ({ theme, time, color }: { time: number; theme: Theme; color: string }) => ({
    width: `${time}%`,
    height: 4,
    borderRadius: 4,
    backgroundColor: color
  })
)

export const Player = ({ src, color = '#212B36' }) => {
  const [audio, state, controls] = useAudio({
    src
  })

  const { playing, time, duration } = state
  const { pause, play } = controls

  const getProgress = () => {
    const progress = (100 * time) / duration

    return isNaN(progress) ? 0 : progress
  }

  const icon = {
    fontSize: 50,
    color
  }

  return (
    <Container color={color}>
      {audio}

      <Actions>
        <Tooltip title="Download" arrow>
          <a href={src} download>
            <IconButton>
              <DownloadIcon fontSize="small" sx={{ color }} />
            </IconButton>
          </a>
        </Tooltip>
      </Actions>

      <Stack alignItems="center">
        <IconButton
          sx={{ mr: 0.5 }}
          onClick={() => (playing ? pause() : play())}
        >
          {playing ? (
            <PauseCircleIcon sx={icon} />
          ) : (
            <PlayCircleIcon sx={icon} />
          )}
        </IconButton>

        <Box width="100%">
          <Text fontSize={13} color={color} fontWeight={500}>
            Listen to the content
          </Text>

          <Duration color={color}>
            <Progress color={color} time={getProgress()} />
          </Duration>
          <Times>
            <Text fontSize={12} color={color}>
              {toMinutesAndSeconds(time)}
            </Text>
            <Text fontSize={12} color={color}>
              {toMinutesAndSeconds(duration)}
            </Text>
          </Times>
        </Box>
      </Stack>
    </Container>
  )
}
