import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Alert,
  Box,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField
} from '@mui/material'
import { useFormik } from 'formik'
import { Button, Text } from 'presentation/components'
import { AuthContext } from 'presentation/contexts'
import { getInputError, getResponseError } from 'presentation/helpers'
import { useContext, useState } from 'react'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required('Required'),
  password: Yup.string().required('Required').min(8)
})

const initialValues = {
  email: '',
  password: ''
}

export const SignIn = () => {
  const [canShowPassword, setCanShowPassword] = useState(false)
  const [error, setError] = useState(null)
  const { signIn } = useContext(AuthContext)

  const {
    handleChange,
    values,
    errors,
    submitForm,
    touched,
    isSubmitting,
    setSubmitting
  } = useFormik({
    initialValues,
    validateOnChange: false,
    validationSchema,
    onSubmit: () => {
      const { email, password } = values

      signIn(email, password)
        .then(() => {})
        .catch((response) => {
          setSubmitting(false)
          setError(getResponseError(response))
        })
    }
  })

  const withError = getInputError(errors, touched)

  return (
    <Stack paddingX={3} paddingY={5}>
      <Stack direction="row" alignItems="center" marginBottom={5}>
        <Box flexGrow={1}>
          <Text variant="h4" gutterBottom>
            Sign in to <strong>Audiary</strong>
          </Text>
          <Text color="text.secondary">Enter your details below.</Text>
        </Box>
      </Stack>

      <Stack spacing={3}>
        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          fullWidth
          size="small"
          autoComplete="username"
          type="email"
          name="email"
          onChange={handleChange}
          label="Email address"
          error={Boolean(withError('email'))}
          helperText={withError('email')}
        />

        <TextField
          fullWidth
          name="password"
          id="password"
          size="small"
          onChange={handleChange}
          autoComplete="password"
          type={canShowPassword ? 'text' : 'password'}
          label="Password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setCanShowPassword(!canShowPassword)}
                  edge="end"
                >
                  {canShowPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
          error={Boolean(withError('password'))}
          helperText={withError('password')}
        />

        <Text>
          Don’t have an account? {''}
          <Link>Get started</Link>
        </Text>

        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          onClick={() => submitForm()}
        >
          Sign in
        </Button>
      </Stack>
    </Stack>
  )
}
