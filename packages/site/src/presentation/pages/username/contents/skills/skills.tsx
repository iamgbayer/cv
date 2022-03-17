import { ResumeEntity } from '@cv/core'
import {
  Box,
  Divider,
  IconButton,
  Stack,
  TextField,
  Autocomplete
} from '@mui/material'
import { Button, Text } from 'presentation/components'
import { useIsMobile } from 'presentation/hooks/use-is-mobile'
import { Render } from '../../../../../../pages/[username]'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { useUpdateResume } from 'presentation/hooks/use-update-resume'
import { isEmpty } from 'lodash'
import { useState } from 'react'

type Props = {
  data: ResumeEntity
  render: Render
  setRender
}

const SKILLS = ['React', 'Javascript', 'Java', 'Angular']

export const Skills = ({ data, render, setRender }: Props) => {
  const isMobile = useIsMobile()
  const { mutateAsync, isLoading, mutate } = useUpdateResume()
  const [skills, setSkills] = useState(data.skills)

  const canRenderEmpty = isEmpty(data.skills)

  return (
    <Stack justifyContent="space-between" height="100%">
      <Stack>
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          marginBottom={2}
        >
          <Stack flexDirection="row" alignItems="center">
            {isMobile && (
              <Box marginRight={1}>
                <IconButton onClick={() => setRender(Render.MENU)}>
                  <ArrowBackIosNewIcon fontSize="small" />
                </IconButton>
              </Box>
            )}

            <Text>Skills</Text>
          </Stack>

          <Divider />
        </Stack>

        <Autocomplete
          multiple
          id="skills"
          options={SKILLS}
          onChange={(event, value) => setSkills(value)}
          value={skills}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField {...params} autoFocus label="Skills" />
          )}
        />
      </Stack>

      <Box marginTop={3} display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          loading={isLoading}
          onClick={() =>
            mutateAsync({
              ...data,
              skills
            })
          }
        >
          Save
        </Button>
      </Box>
    </Stack>
  )
}
