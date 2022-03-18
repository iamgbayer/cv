import React, { createContext, ReactNode, useEffect, useState } from 'react'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { User } from '@cv/core'
import { useRouter } from 'next/router'
import { useGetResume } from 'presentation/hooks/use-get-resume'
import { useGetUser } from 'presentation/hooks/use-get-user'
import { useCreateUser } from 'presentation/hooks/use-create-user'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyBBOnzNfqtJlGftHaC2Z1nmzaC4j8NKBtw',
    authDomain: 'curriculum-26bd6.firebaseapp.com',
    projectId: 'curriculum-26bd6',
    storageBucket: 'curriculum-26bd6.appspot.com',
    messagingSenderId: '371762892095',
    appId: '1:371762892095:web:20ec0fa8cf0309fd63578a'
  })
  firebase.firestore()
}

type Auth = {
  authByGoogle: () => Promise<void>
  logout: () => void
  isLoading: boolean
}

export const AuthContext = createContext<Auth | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const { data, refetch, isLoading } = useGetUser()
  const { mutateAsync } = useCreateUser()

  useEffect(() => {
    data && ['/auth'].includes(router.pathname) && router.push(data.username)
  }, [data, router])

  const authByGoogle = (): Promise<void> => {
    const provider = new firebase.auth.GoogleAuthProvider()

    provider.addScope('email')

    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(async (response) => {
        const { additionalUserInfo, user } = response
        const { isNewUser } = additionalUserInfo

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
  }

  const logout = async () => {
    await firebase
      .auth()
      .signOut()
      .then(() => router.push('/'))
  }

  return (
    <AuthContext.Provider
      value={{
        authByGoogle,
        logout,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
