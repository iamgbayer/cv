import { Text } from 'presentation/components'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { AuthContext } from 'presentation/contexts'

export const IsUserAuthenticated = ({ children }) => {
  const router = useRouter()

  return <>{children}</>
}
