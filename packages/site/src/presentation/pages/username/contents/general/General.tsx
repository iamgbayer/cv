import { ResumeEntity } from '@cv/core'
import { Box, Divider, IconButton, Stack, TextField } from '@mui/material'
import { Button, Text } from 'presentation/components'
import { useIsMobile } from 'presentation/hooks/use-is-mobile'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { useUpdateResume } from 'presentation/hooks/use-update-resume'
import { useFormik } from 'formik'
import { Render } from 'domain/vos/render'

type Props = {
  data: ResumeEntity
  setRender
}

export const General = ({ data, setRender }: Props) => {
  const isMobile = useIsMobile()
  const { mutateAsync, isLoading } = useUpdateResume()

  const { values, submitForm, handleChange } = useFormik({
    initialValues: data.general,
    enableReinitialize: true,
    onSubmit: async (values) => {
      await mutateAsync({
        ...data,
        general: values
      })
    }
  })

  return (
    <>
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

          <Text>General</Text>
        </Stack>

        <Divider />
      </Stack>

      <Stack justifyContent="space-between" height="100%">
        <Stack marginBottom={3}>
          <TextField
            id="username"
            label="Username*"
            fullWidth
            disabled
            size="small"
            onChange={handleChange}
            value={values.username}
          />
        </Stack>

        <Stack marginBottom={3}>
          <TextField
            id="displayName"
            label="Display name*"
            fullWidth
            size="small"
            onChange={handleChange}
            value={values.displayName}
          />
        </Stack>

        <Stack marginBottom={3}>
          <TextField
            id="role"
            label="What do you do?"
            fullWidth
            size="small"
            onChange={handleChange}
            value={values.role}
          />
        </Stack>

        <Stack marginBottom={3}>
          <TextField
            id="location"
            label="Location"
            fullWidth
            size="small"
            onChange={handleChange}
            value={values.location}
          />
        </Stack>

        <TextField
          id="about"
          label="About"
          fullWidth
          size="small"
          multiline
          rows={5}
          onChange={handleChange}
          value={values.about}
        />

        <Stack flexDirection="row" justifyContent="flex-end" marginTop={5}>
          <Box marginLeft={2}>
            <Button
              variant="contained"
              loading={isLoading}
              onClick={() => submitForm()}
            >
              Save
            </Button>
          </Box>
        </Stack>
      </Stack>
    </>
  )
}
