import { createTheme, PaletteOptions } from '@mui/material/styles'
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

  interface TypeText {
    contrast: string
  }
}

const PRIMARY = {
  main: '#fff',
  light: '#fff',
  contrastText: '#121212',
  dark: '#fff'
}

const SECONDARY = {
  main: '#121212',
  light: '#121212',
  contrastText: '#fff',
  dark: '#121212'
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

const palette: PaletteOptions = {
  primary: PRIMARY,
  secondary: SECONDARY,
  info: merge(INFO, { contrastText: '#fff' }),
  error: merge(ERROR, { contrastText: '#fff' }),
  success: merge(SUCCESS, { contrastText: '#fff' }),
  warning: merge(WARNING, { contrastText: '#fff' }),
  mode: 'dark',
  text: {
    contrast: '#121212'
  }
}

export const Theme = createTheme({
  typography,
  shape: { borderRadius: 8 },
  palette
})

Theme.components = Object.assign(Button(Theme), Card(Theme))
