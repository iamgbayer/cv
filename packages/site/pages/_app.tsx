import React, { useEffect } from 'react'
import TagManager from 'react-gtm-module'
import 'reflect-metadata'
import { Head, Theme } from 'presentation/components'
import { ThemeProvider } from '@mui/material/styles'
import { CacheProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { AuthContextProvider } from 'presentation/contexts'
import { QueryClient, QueryClientProvider } from 'react-query'
import createEmotionCache from '../src/presentation/create-emotion-cache'

const tagManagerArgs = {
  gtmId: 'GTM-WPP798F'
}

const cache = createEmotionCache()

const queryClient = new QueryClient()

export default function App({ Component, emotionCache = cache, ...props }) {
  useEffect(() => {
    TagManager.initialize(tagManagerArgs)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={Theme}>
            <Head />
            <CssBaseline />
            <Component {...props} />
          </ThemeProvider>
        </CacheProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  )
}
