const withPlugins = require('next-compose-plugins')
const withFonts = require('next-fonts')
const withTranslate = require('next-translate')

const withImages = require('next-images')
const withTM = require('next-transpile-modules')([
  '@cv/core',
  '@mui/material',
  '@mui/system',
  '@mui/icons-material'
])

module.exports = withPlugins([
  withImages,
  withFonts,
  withTranslate,
  withTM({
    reactStrictMode: true
  })
])
