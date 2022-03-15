import { ResumeEntity } from '@cv/core'
import { Box, Chip } from '@mui/material'

type Props = {
  data: ResumeEntity
}

export const ListSkills = ({ data }: Props) => {
  return (
    <Box>
      {data.skills.map((skill) => (
        <Box display="inline" key={skill} marginRight={1}>
          <Chip label={skill} />
        </Box>
      ))}
    </Box>
  )
}
