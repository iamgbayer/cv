import {
  Divider,
  Grid,
  IconButton,
  Link,
  Stack,
  TextField
} from '@mui/material'
import { useFormik } from 'formik'
import { Box, Button, Text } from 'presentation/components'
import { useState } from 'react'
import { isEmpty } from 'lodash'
import Adapter from '@mui/lab/AdapterDayjs'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { DatePicker } from '@mui/lab'
import dayjs from 'dayjs'
import { useUpdateResume } from 'presentation/hooks/use-update-resume'
import { merge } from 'lodash'
import { ExperienceEntity, ResumeEntity } from '@cv/core'
import { last } from 'ramda'
import { arrayMoveImmutable } from 'array-move'
import { v4 } from 'uuid'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { useIsMobile } from 'presentation/hooks/use-is-mobile'
import { Render } from '../../../../../pages/[username]'

type Props = {
  data: ResumeEntity
  render: Render
  setRender
}

enum Is {
  NONE = 'NONE',
  EDITING = 'EDITING',
  ADDIND = 'ADDIND'
}

export const WorkExperiences = ({ data, render, setRender }: Props) => {
  const [is, setIs] = useState(Is.NONE)
  const { mutateAsync, isLoading, mutate } = useUpdateResume()
  const isMobile = useIsMobile()

  const formik = useFormik({
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

      formik.resetForm()
      setIs(Is.NONE)
    }
  })

  const canRenderData = is === Is.NONE && !isEmpty(data.experiences)
  const canRenderEmpty = isEmpty(data) && is === Is.NONE

  const onEdit = (value: ExperienceEntity) => {
    formik.setValues(value)
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

      {[Is.ADDIND, Is.EDITING].includes(is) && (
        <>
          <Grid container>
            <Grid item sm={6}>
              <LocalizationProvider dateAdapter={Adapter}>
                <DatePicker
                  label="From*"
                  openTo="year"
                  views={['year', 'month']}
                  value={dayjs(formik.values.from).format('MMM - YYYY')}
                  onChange={(value) =>
                    formik.setFieldValue('from', dayjs(value).toDate())
                  }
                  maxDate={dayjs()}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth disabled size="small" />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item sm={6}>
              <LocalizationProvider dateAdapter={Adapter}>
                <DatePicker
                  label="To*"
                  openTo="year"
                  views={['year', 'month']}
                  value={dayjs(formik.values.to).format('MMM - YYYY')}
                  onChange={(value) =>
                    formik.setFieldValue('to', dayjs(value).toDate())
                  }
                  maxDate={dayjs()}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth disabled size="small" />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item sm={6}>
              <TextField
                id="title"
                size="small"
                label="Title*"
                fullWidth
                onChange={formik.handleChange}
                value={formik.values.title}
              />
            </Grid>

            <Grid item sm={6}>
              <TextField
                id="company"
                label="Company*"
                fullWidth
                size="small"
                onChange={formik.handleChange}
                value={formik.values.company}
              />
            </Grid>

            <Grid item sm={6}>
              <TextField
                id="location"
                label="Location"
                fullWidth
                size="small"
                onChange={formik.handleChange}
                value={formik.values.location}
              />
            </Grid>

            <Grid item sm={6}>
              <TextField
                id="url"
                label="URL"
                fullWidth
                size="small"
                onChange={formik.handleChange}
                value={formik.values.url}
              />
            </Grid>

            <TextField
              fullWidth
              id="description"
              label="Description"
              maxRows={6}
              onChange={formik.handleChange}
              value={formik.values.description}
            />
          </Grid>

          <Stack flexDirection="row" justifyContent="flex-end">
            <Button
              onClick={() => {
                setIs(Is.NONE)
                formik.resetForm()
              }}
            >
              Cancel
            </Button>

            <Box marginLeft={2}>
              <Button
                variant="contained"
                loading={isLoading}
                onClick={() => formik.submitForm()}
              >
                Save
              </Button>
            </Box>
          </Stack>
        </>
      )}

      {canRenderEmpty && <Text>empty</Text>}

      {canRenderData &&
        data.experiences.map((experience, index) => {
          return (
            <>
              <Divider />
              <Stack flexDirection="row" paddingY={2}>
                <Text variant="body2" color="text.secondary">
                  {dayjs(experience.from).format('MMM YYYY')}
                </Text>
                <Text variant="body2" color="text.secondary" marginX={1}>
                  —
                </Text>
                <Text variant="body2" color="text.secondary">
                  {dayjs(experience.to).format('MMM YYYY')}
                </Text>

                <Stack marginLeft={4}>
                  <Text variant="body2">
                    {experience.title} at {experience.company}
                  </Text>
                  <Text variant="body2">{experience.location}</Text>
                  <Stack flexDirection="row" marginTop={1}>
                    <Link
                      color="text.secondary"
                      variant="body2"
                      onClick={() => onEdit(experience)}
                    >
                      Edit
                    </Link>
                    <Link
                      color="text.secondary"
                      variant="body2"
                      marginX={1}
                      onClick={() => onDelete(experience)}
                    >
                      Delete
                    </Link>
                    <Link
                      color="text.secondary"
                      variant="body2"
                      onClick={() => onMoveDown(index)}
                    >
                      Move down
                    </Link>
                  </Stack>
                </Stack>
              </Stack>
            </>
          )
        })}
    </>
  )
}
