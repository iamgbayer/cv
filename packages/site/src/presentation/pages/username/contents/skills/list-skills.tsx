import { ResumeEntity } from '@cv/core'
import { Box, Chip } from '@mui/material'
import { isEmpty } from 'lodash'

type Props = {
  data: ResumeEntity
}

export const ListSkills = ({ data }: Props) => {
  const canRenderData = !isEmpty(data.languages)

  return (
    <Box paddingY={2}>
      {data.skills.map((skill) => (
        <Box display="inline" key={skill} marginRight={1}>
          <Chip label={skill} />
        </Box>
      ))}
    </Box>
  )
}
