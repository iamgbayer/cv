import { Grid, IconButton, Stack, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { Box, Button, Text } from 'presentation/components'
import { useState } from 'react'
import { isEmpty } from 'lodash'
import Adapter from '@mui/lab/AdapterDayjs'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { DatePicker } from '@mui/lab'
import dayjs from 'dayjs'
import { useUpdateResume } from 'presentation/hooks/use-update-resume'
import { ExperienceEntity, ResumeEntity } from '@cv/core'
import { arrayMoveImmutable } from 'array-move'
import { v4 } from 'uuid'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { useIsMobile } from 'presentation/hooks/use-is-mobile'
import { Is } from 'domain/vos/is'
import { Render } from 'domain/vos/render'
import { ListWorkExperiences } from './list-work-experiences'

type Props = {
  data: ResumeEntity
  render: Render
  setRender
}

export const WorkExperiences = ({ data, render, setRender }: Props) => {
  const [is, setIs] = useState(Is.NONE)
  const { mutateAsync, isLoading, mutate } = useUpdateResume()
  const isMobile = useIsMobile()

  const {
    resetForm,
    setValues,
    submitForm,
    handleChange,
    setFieldValue,
    values
  } = useFormik({
    initialValues: {
      id: v4(),
      from: '',
      to: '',
      title: '',
      company: '',
      url: '',
      location: '',
      description: ''
    },
    onSubmit: async (values) => {
      const getExperiences = () => {
        let experiences = data.experiences

        return is === Is.EDITING
          ? experiences.filter((experience) => values.id !== experience.id)
          : experiences
      }

      let experiences = [...getExperiences(), values]

      await mutateAsync({
        ...data,
        experiences
      })

      resetForm()
      setIs(Is.NONE)
    }
  })

  const canRenderData = is === Is.NONE && !isEmpty(data.experiences)
  const canRenderEmpty = isEmpty(data.experiences) && is === Is.NONE
  const isEditing = [Is.ADDIND, Is.EDITING].includes(is)

  const onEdit = (value: ExperienceEntity) => {
    setValues(value)
    setIs(Is.EDITING)
  }

  const onDelete = async (value: ExperienceEntity) => {
    mutate({
      ...data,
      experiences: data.experiences.filter(
        (experience) => value.id !== experience.id
      )
    })
  }

  const onMoveDown = (index: number) => {
    mutate({
      ...data,
      experiences: arrayMoveImmutable(data.experiences, index, index + 1)
    })
  }

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

          <Text>Work experiences</Text>
        </Stack>

        {is === Is.NONE && (
          <Button variant="contained" onClick={() => setIs(Is.ADDIND)}>
            Add
          </Button>
        )}
      </Stack>

      {isEditing && (
        <>
          <Grid container>
            <Grid item sm={6} paddingRight={1} marginBottom={2}>
              <LocalizationProvider dateAdapter={Adapter}>
                <DatePicker
                  label="From*"
                  openTo="year"
                  views={['year', 'month']}
                  value={dayjs(values.from).format('MMM - YYYY')}
                  onChange={(value) =>
                    setFieldValue('from', dayjs(value).toDate())
                  }
                  maxDate={dayjs()}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth disabled size="small" />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item sm={6} paddingLeft={1} marginBottom={2}>
              <LocalizationProvider dateAdapter={Adapter}>
                <DatePicker
                  label="To*"
                  openTo="year"
                  views={['year', 'month']}
                  value={dayjs(values.to).format('MMM - YYYY')}
                  onChange={(value) =>
                    setFieldValue('to', dayjs(value).toDate())
                  }
                  maxDate={dayjs()}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth disabled size="small" />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item sm={6} paddingRight={1} marginBottom={2}>
              <TextField
                id="title"
                size="small"
                label="Title*"
                fullWidth
                onChange={handleChange}
                value={values.title}
              />
            </Grid>

            <Grid item sm={6} paddingLeft={1} marginBottom={2}>
              <TextField
                id="company"
                label="Company*"
                fullWidth
                size="small"
                onChange={handleChange}
                value={values.company}
              />
            </Grid>

            <Grid item sm={6} paddingRight={1} marginBottom={2}>
              <TextField
                id="location"
                label="Location"
                fullWidth
                size="small"
                onChange={handleChange}
                value={values.location}
              />
            </Grid>

            <Grid item sm={6} paddingLeft={1} marginBottom={2}>
              <TextField
                id="url"
                label="URL"
                fullWidth
                size="small"
                onChange={handleChange}
                value={values.url}
              />
            </Grid>

            <TextField
              fullWidth
              id="description"
              label="Description"
              multiline
              rows={2}
              onChange={handleChange}
              value={values.description}
            />
          </Grid>

          <Stack flexDirection="row" justifyContent="flex-end" marginTop={5}>
            <Button
              onClick={() => {
                setIs(Is.NONE)
                resetForm()
              }}
            >
              Cancel
            </Button>

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
        </>
      )}

      {canRenderEmpty && <Text>empty</Text>}

      <ListWorkExperiences
        is={is}
        data={data}
        hasControls={true}
        hasDivider={true}
      />
    </>
  )
}
