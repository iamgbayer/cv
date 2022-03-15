import { createTheme, alpha, PaletteOptions } from '@mui/material/styles'
import { merge } from 'ramda'
import { Button } from '../button/button.overrides'
import { Card } from '../card/card.overrides'
import { typography } from '../tokens'

declare module '@mui/material/styles' {
  interface PaletteColorOptions {
    main: string
  }
}
declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    neutral: string
  }
}

const PRIMARY = {
  light: '#5e35b1',
  main: '#512da8',
  dark: '#4527a0'
}

const INFO = {
  lighter: '#D0F2FF',
  light: '#74CAFF',
  main: '#1890FF',
  dark: '#0C53B7',
  darker: '#04297A'
}
const SUCCESS = {
  lighter: '#E9FCD4',
  light: '#AAF27F',
  main: '#54D62C',
  dark: '#229A16',
  darker: '#08660D'
}
const WARNING = {
  lighter: '#FFF7CD',
  light: '#FFE16A',
  main: '#FFC107',
  dark: '#B78103',
  darker: '#7A4F01'
}
const ERROR = {
  lighter: '#FFE7D9',
  light: '#FFA48D',
  main: '#FF4842',
  dark: '#B72136',
  darker: '#7A0C2E'
}

const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
  500_8: alpha('#919EAB', 0.08),
  500_12: alpha('#919EAB', 0.12),
  500_16: alpha('#919EAB', 0.16),
  500_24: alpha('#919EAB', 0.24),
  500_32: alpha('#919EAB', 0.32),
  500_48: alpha('#919EAB', 0.48),
  500_56: alpha('#919EAB', 0.56),
  500_80: alpha('#919EAB', 0.8)
}

const palette: PaletteOptions = {
  primary: merge(PRIMARY, { contrastText: '#fff' }),
  info: merge(INFO, { contrastText: '#fff' }),
  error: merge(ERROR, { contrastText: '#fff' }),
  success: merge(SUCCESS, { contrastText: GREY[800] }),
  warning: merge(WARNING, { contrastText: GREY[800] }),
  mode: 'dark'
}

export const Theme = createTheme({
  typography,
  shape: { borderRadius: 8 },
  palette
})

Theme.components = Object.assign(Button(Theme), Card(Theme))
