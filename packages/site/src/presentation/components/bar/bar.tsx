import { Box, styled } from '@mui/material'

export const Bar = styled(Box)(({ theme }) => ({
  width: '100%',
  minHeight: 40,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  padding: '5px 10px',
  backgroundColor: theme.palette.warning.light
}))
