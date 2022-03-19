import React, { useState } from 'react'
import { Bar, Button, Text, Box, Modal } from 'presentation/components'
import { useRouter } from 'next/router'
import { Container, Stack, styled, useTheme } from '@mui/material'
import Link from 'next/link'

const Content = styled('div')(({ theme }) => ({
  margin: 'auto',
  overflow: 'hidden',
  padding: theme.spacing(5),
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  backgroundImage: `linear-gradient(135deg,
    ${theme.palette.primary.main} 0%,
    ${theme.palette.primary.dark} 100%)`,
  [theme.breakpoints.up('lg')]: {
    display: 'flex',
    maxWidth: '100%',
    width: '100%',
    alignItems: 'center'
  }
}))

const Background = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.neutral
}))

const Section = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  textAlign: 'center'
}))

export enum MODAL {
  SIGN_IN = 'SIGN_IN',
  SIGN_UP = 'SIGN_UP'
}

export const Index = () => {
  const router = useRouter()
  const theme = useTheme()

  return (
    <>
      <Bar>
        <Text>
          Our application still in beta, give us your suggestion
          <Link
            passHref
            href="https://emojicom.io/feedback#q5uvFvidEQB4Kg0fjLHc"
          >
            <Text marginLeft={0.5} fontWeight={700} sx={{ cursor: 'pointer' }}>
              clicking here
            </Text>
          </Link>
        </Text>
      </Bar>

      <Section fixed>
        <Text variant="h1" fontSize={64}>
          Add audio
          <br />
          to your articles
        </Text>
        <Text mt={5} maxWidth={540}>
          Easiest way to convert your articles into high quality AI-generated
          audio. Allow your users to enjoy your content without looking at the
          screen.
        </Text>
        <Box mt={5}>
          <Button
            size="large"
            variant="contained"
            onClick={() => router.push('/auth')}
          >
            Give a try
          </Button>
        </Box>
      </Section>

      <Section fixed>
        <Text variant="h2" mb={3} textAlign="center">
          Grow your audience
        </Text>
      </Section>
      <Section fixed>
        <Text variant="h2" mb={3} textAlign="center">
          Increase user engagement
        </Text>
      </Section>

      <Background>
        <Section fixed>
          <Box textAlign="center" p={5} mt={10}>
            <Text variant="h2">Still have questions?</Text>

            <Text color="text.secondary" mt={3} mb={5}>
              Please describe your case to receive the most accurate advice.
            </Text>

            <Button
              size="large"
              variant="contained"
              href="mailto:support@minimals.cc?subject=[Feedback] from Customer"
            >
              Contact us
            </Button>
          </Box>
        </Section>
      </Background>

      <Section fixed>
        <Content>
          <Box
            sx={{
              pl: { md: 10 },
              textAlign: { xs: 'center', md: 'left' }
            }}
          >
            <Text variant="h2" color="common.white" mb={5}>
              Add audio to your articles,
              <br />
              is quick and easy.
            </Text>

            <Button
              size="large"
              variant="contained"
              onClick={() => router.push('/auth')}
              sx={{
                whiteSpace: 'nowrap',
                color: (theme) =>
                  theme.palette.getContrastText(theme.palette.common.white),
                bgcolor: 'common.white',
                '&:hover': { bgcolor: 'grey.300' }
              }}
            >
              Give a try
            </Button>
          </Box>
        </Content>
      </Section>
    </>
  )
}
