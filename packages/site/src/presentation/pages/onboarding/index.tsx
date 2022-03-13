import { Avatar } from '@mui/material'
import { useRouter } from 'next/router'
import { Button, Modal, Text } from 'presentation/components'
import { useGetUser } from 'presentation/hooks/use-get-user'
import { useEffect, useState } from 'react'

export const Onboarding = () => {
  const { data, isLoading } = useGetUser({ enabled: true })
  const [modal, setModal] = useState(false)
  const router = useRouter()

  if (isLoading) {
    return <></>
  }

  return (
    <>
      <Modal open={modal} onClose={() => setModal(false)}>
        <Text>LinkeIn</Text>
      </Modal>

      <Avatar
        alt={data.displayName}
        src={data.photoUrl}
        sx={{ width: 100, height: 100 }}
      />

      <Text variant="h2">Hey {data.displayName}</Text>

      <Button variant="contained" onClick={() => setModal(true)}>
        Import from LinkedIn
      </Button>
      <Button variant="outlined" onClick={() => router.push(data.username)}>
        Start from scratch
      </Button>
    </>
  )
}
