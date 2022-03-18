import { Alert, Box, Stack } from '@mui/material'
import { Button, Text } from 'presentation/components'
import { getResponseError } from 'presentation/helpers'
import { useAuth } from 'presentation/hooks/use-auth'
import { useState } from 'react'

export const Auth = () => {
  const [error, setError] = useState(null)
  const { authenticate, isLoading } = useAuth()

  const signIn = () => {
    authenticate()
      .then(() => {})
      .catch((response) => {
        setError(getResponseError(response))
      })
  }

  return (
    <Stack paddingX={3} paddingY={5}>
      <Stack direction="row" alignItems="center" marginBottom={5}>
        <Box flexGrow={1}>
          <Text variant="h4" gutterBottom>
            Welcome to <strong>Audiary</strong>
          </Text>
          <Text color="text.secondary">Enter your details below.</Text>
        </Box>
      </Stack>

      <Stack spacing={3}>
        {error && <Alert severity="error">{error}</Alert>}

        <Button
          fullWidth
          size="large"
          loading={isLoading}
          type="submit"
          variant="contained"
          onClick={signIn}
        >
          Continue with Google
        </Button>
      </Stack>
    </Stack>
  )
}
