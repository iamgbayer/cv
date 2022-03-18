import { ResumeEntity } from '@cv/core'
import {
  Box,
  Divider,
  IconButton,
  Stack,
  Grid,
  TextField,
  Autocomplete,
  Link,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'
import { Button, Text } from 'presentation/components'
import { useIsMobile } from 'presentation/hooks/use-is-mobile'
import { useState } from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { useUpdateResume } from 'presentation/hooks/use-update-resume'
import { useFormik } from 'formik'
import { v4 } from 'uuid'
import { isEmpty } from 'lodash'
import { ListLanguages } from './list-languages'
import { Is } from 'domain/vos/is'
import { Render } from 'domain/vos/render'

type Props = {
  data: ResumeEntity
  render: Render
  setRender
}

const languages = [
  { name: 'English', value: 'english' },
  { name: 'Portuguese', value: 'portuguese' }
]

const proficiencies = [
  { name: 'Elementary proficiency', value: 'elementary' },
  { name: 'Limited working proficiency', value: 'limitedWorking' },
  { name: 'Professional working proficiency', value: 'professionalWorking' },
  { name: 'Full professional proficiency', value: 'fullProfessional' },
  { name: 'Native or bilingual proficiency', value: 'nativeOrBilingual' }
]

export const getLanguageName = (value) =>
  languages.find((language) => language.value === value).name

export const getProficiencyName = (value) =>
  proficiencies.find((proficiency) => proficiency.value === value).name

export const Languages = ({ data, render, setRender }: Props) => {
  const isMobile = useIsMobile()
  const [is, setIs] = useState(Is.NONE)
  const { mutateAsync, isLoading, mutate } = useUpdateResume()

  const { resetForm, handleChange, setFieldValue, values, submitForm } =
    useFormik({
      initialValues: {
        id: v4(),
        language: '',
        proficiency: ''
      },
      onSubmit: async (values) => {
        const getLanguages = () => {
          let languages = data.languages

          return is === Is.EDITING
            ? languages.filter((experience) => values.id !== experience.id)
            : languages
        }

        let languages = [...getLanguages(), values]

        await mutateAsync({
          ...data,
          languages
        })

        resetForm()
        setIs(Is.NONE)
      }
    })

  const canRenderEmpty = isEmpty(data.languages) && is === Is.NONE
  const isEditing = [Is.ADDIND, Is.EDITING].includes(is)

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

          <Text>Languages</Text>
        </Stack>

        <Divider />

        {is === Is.NONE && (
          <Button variant="contained" onClick={() => setIs(Is.ADDIND)}>
            Add
          </Button>
        )}
      </Stack>

      {isEditing && (
        <Stack justifyContent="space-between" height="100%">
          <Grid container>
            <Grid item sm={6} paddingRight={1} marginBottom={2}>
              <Autocomplete
                id="language"
                getOptionLabel={(option) => option.name}
                onChange={(event, value) => {
                  //@ts-ignore
                  setFieldValue('language', value?.value)
                }}
                options={languages}
                renderInput={(params) => (
                  <TextField {...params} size="small" label="Language*" />
                )}
              />
            </Grid>

            <Grid item sm={6} paddingLeft={1} marginBottom={2}>
              <FormControl fullWidth>
                <InputLabel id="proficiency-label">Proficiency*</InputLabel>
                <Select
                  labelId="proficiency-label"
                  id="proficiency"
                  name="proficiency"
                  size="small"
                  value={values.proficiency}
                  label="Proficiency*"
                  onChange={handleChange}
                >
                  {proficiencies.map((proficiency) => (
                    <MenuItem key={proficiency.value} value={proficiency.value}>
                      {proficiency.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
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
        </Stack>
      )}

      <ListLanguages is={is} data={data} hasControls={true} hasDivider={true} />
    </>
  )
}
