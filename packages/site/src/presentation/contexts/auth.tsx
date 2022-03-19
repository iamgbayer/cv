import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useGetUser } from 'presentation/hooks/use-get-user'
import { useCreateUser } from 'presentation/hooks/use-create-user'
import { useContainer } from 'container/client'
import { Auth, AuthProvider } from '@cv/core'

type AuthContextType = {
  authenticate: () => Promise<void>
  unauthenticate: () => void
  isLoading: boolean
  isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const { data, refetch, isLoading } = useGetUser()
  const { mutateAsync } = useCreateUser()
  const container = useContainer()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const auth = container.get(Auth)

  useEffect(() => {
    auth.listen((user) => setIsAuthenticated(!!user))
  }, [auth])

  useEffect(() => {
    data && ['/auth'].includes(router.pathname) && router.push(data.username)
  }, [data, router])

  const authenticate = (): Promise<void> => {
    return container
      .get(Auth)
      .authenticate(AuthProvider.GOOGLE)
      .then(async (response) => {
        const { isNewUser, user } = response

        if (!isNewUser) {
          refetch()
          return
        }

        await mutateAsync({
          displayName: user.displayName,
          email: user.email,
          photoUrl: user.photoURL
        })

        router.push('/onboarding')
      })
      .catch(console.error)
  }

  const unauthenticate = async () => {
    return container.get(Auth).unauthenticate()
  }

  return (
    <AuthContext.Provider
      value={{
        authenticate,
        unauthenticate,
        isLoading,
        isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
