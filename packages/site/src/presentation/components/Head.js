import Headable from 'next/head'
import React from 'react'

export const Head = () => {
  return (
    <Headable>
      <title>Audio</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      <meta property="og:url" content="" />
      <meta property="og:type" content="product" />
      <meta property="og:site_name" content="Wishlist" />
      <meta property="og:title" content="Wishlist" />

      <meta property="og:description" content="" />
      <meta property="og:image" content="" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="" />
      <meta name="twitter:title" content="Wishlist" />
      <meta name="twitter:description" content="" />
      <meta name="twitter:image" content="" />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
    </Headable>
  )
}
