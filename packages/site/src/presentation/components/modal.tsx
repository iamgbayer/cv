import React from 'react'
import { Dialog, Drawer, useMediaQuery, useTheme } from '@mui/material'

type Props = {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

export const Modal = ({ open, onClose, children }: Props) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return isMobile ? (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      sx={{ '.MuiPaper-root': { borderRadius: theme.spacing(3, 3, 0, 0) } }}
    >
      {children}
    </Drawer>
  ) : (
    <Dialog open={open} onClose={onClose}>
      {children}
    </Dialog>
  )
}
