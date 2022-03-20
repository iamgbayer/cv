import { Theme, Components } from '@mui/material/styles'

export const Button = (theme: Theme): Pick<Components, 'MuiButton'> => ({
  MuiButton: {
    variants: [
      {
        props: { variant: 'contained', color: 'info' },
        style: {}
      },
      {
        props: { variant: 'contained', color: 'success' },
        style: {}
      },
      {
        props: { variant: 'contained', color: 'warning' },
        style: {}
      },
      {
        props: { variant: 'contained', color: 'error' },
        style: {}
      }
    ],
    styleOverrides: {
      root: {
        textTransform: 'none',
        '&:hover': {
          boxShadow: 'none'
        }
      },
      sizeLarge: {
        height: 48
      },
      containedInherit: {
        color: theme.palette.grey[800],
        boxShadow: 'none',
        '&:hover': {
          backgroundColor: theme.palette.grey[400]
        }
      },
      containedPrimary: {
        boxShadow: 'none'
      },
      containedSecondary: {
        boxShadow: 'none'
      },
      outlinedInherit: {
        border: `1px solid ${theme.palette.grey[500_32]}`,
        '&:hover': {
          backgroundColor: theme.palette.action.hover
        }
      },
      textInherit: {
        '&:hover': {
          backgroundColor: theme.palette.action.hover
        }
      }
    }
  }
})
