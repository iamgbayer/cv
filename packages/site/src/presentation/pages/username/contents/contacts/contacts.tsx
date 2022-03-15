import { ResumeEntity } from '@cv/core'
import {
  Box,
  Divider,
  IconButton,
  Stack,
  Grid,
  TextField,
  Autocomplete,
  Link
} from '@mui/material'
import { Button, Text } from 'presentation/components'
import { useIsMobile } from 'presentation/hooks/use-is-mobile'
import { Fragment, useState } from 'react'
import { Render } from '../../../../../../pages/[username]'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { useUpdateResume } from 'presentation/hooks/use-update-resume'
import { useFormik } from 'formik'
import { v4 } from 'uuid'
import { isEmpty } from 'lodash'
import { ListContacts } from './list-contacts'

type Props = {
  data: ResumeEntity
  render: Render
  setRender
}

export enum Is {
  NONE = 'NONE',
  EDITING = 'EDITING',
  ADDIND = 'ADDIND'
}

const contacts = [
  { name: 'Email', label: 'Email address*', value: 'email' },
  { name: 'Instagram', label: 'Instagram username*', value: 'instagram' },
  { name: 'GitHub', label: 'GitHub username*', value: 'github' },
  { name: 'GitLab', label: 'GitLab username*', value: 'gitlab' },
  { name: 'LinkedIn', label: 'LinkedIn username*', value: 'linkedin' },
  { name: 'Twitter', label: 'Twitter username*', value: 'twitter' },
  { name: 'Website', label: 'Website URL*', value: 'website' },
  { name: 'Youtube', label: 'Youtube channel URL*', value: 'youtube' },
  { name: 'Telegram', label: 'Telegram username*', value: 'telegram' },
  { name: 'Dribbble', label: 'Dribbble username*', value: 'dribbble' }
]

export const getName = (value) =>
  contacts.find((contact) => contact.value === value).name

export const Contacts = ({ data, render, setRender }: Props) => {
  const isMobile = useIsMobile()
  const [is, setIs] = useState(Is.NONE)
  const { mutateAsync, isLoading, mutate } = useUpdateResume()
  const [label, setLabel] = useState('Value*')

  const formik = useFormik({
    initialValues: {
      id: v4(),
      type: '',
      value: ''
    },
    onSubmit: async (values) => {
      const getContacts = () => {
        let contacts = data.contacts

        return is === Is.EDITING
          ? contacts.filter((experience) => values.id !== experience.id)
          : contacts
      }

      let contacts = [...getContacts(), values]

      await mutateAsync({
        ...data,
        contacts
      })

      formik.resetForm()
      setIs(Is.NONE)
    }
  })

  const canRenderEmpty = isEmpty(data.contacts) && is === Is.NONE
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

          <Text>Contacts</Text>
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
                id="type"
                getOptionLabel={(option) => option.name}
                onChange={(event, value) => {
                  //@ts-ignore
                  setLabel(value.label)
                  //@ts-ignore
                  formik.setFieldValue('type', value?.value)
                }}
                options={contacts}
                renderInput={(params) => (
                  <TextField {...params} size="small" label="Type*" />
                )}
              />
            </Grid>

            <Grid item sm={6} paddingLeft={1} marginBottom={2}>
              <TextField
                id="value"
                label={label}
                fullWidth
                size="small"
                onChange={formik.handleChange}
                value={formik.values.value}
              />
            </Grid>
          </Grid>

          <Stack flexDirection="row" justifyContent="flex-end" marginTop={5}>
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
        </Stack>
      )}

      <ListContacts data={data} hasControls={true} hasDivider={true} is={is} />
    </>
  )
}
