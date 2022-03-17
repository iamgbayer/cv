import { Stack } from '@mui/material'
import { Box } from 'presentation/components'
import { useIsMobile } from 'presentation/hooks/use-is-mobile'
import React, { memo } from 'react'

export const Layout = memo(({ children }) => {
  const isMobile = useIsMobile()

  return (
    <Box sx={{ display: 'flex', minHeight: '100%' }}>
      <Stack
        paddingY={14}
        paddingX={isMobile ? 1 : 5}
        width={isMobile ? '100%' : 'calc(100% - 280px)'}
      >
        {children}
      </Stack>
    </Box>
  )
})
