import { Theme, alpha, Components } from '@mui/material/styles'

export const Card = (
  theme: Theme
): Pick<Components, 'MuiCard' | 'MuiCardHeader' | 'MuiCardContent'> => {
  // const boxShadow = `0 0 2px 0 ${alpha(theme.palette.grey[500], 0.2)}, ${
  //   theme.customShadows.z12
  // }`

  return {
    MuiCard: {
      styleOverrides: {
        root: {
          // boxShadow,
          position: 'relative',
          borderRadius: Number(theme.shape.borderRadius) * 2,
          zIndex: 0
        }
      }
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: { variant: 'h6' },
        subheaderTypographyProps: {
          variant: 'body2',
          marginTop: theme.spacing(0.5)
        }
      },
      styleOverrides: {
        root: {
          padding: theme.spacing(3, 3, 0)
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: theme.spacing(3)
        }
      }
    }
  }
}
