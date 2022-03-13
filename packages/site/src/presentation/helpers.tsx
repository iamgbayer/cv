import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ContainerContext } from 'container/client'
import { Container } from 'inversify'

type Response = {
  message: string
}

const padZero = (number) => (number < 10 ? `0${number}` : number)

export const toMinutesAndSeconds = (milliseconds: number) =>
  padZero(parseInt(((milliseconds / 60) % 60).toString())) +
  ':' +
  padZero(parseInt((milliseconds % 60).toString()))

export const textEllipsis = (text: string, maxLength: number): string => {
  const ellipsis = '...'

  return text.length > maxLength
    ? text.slice(0, maxLength - ellipsis.length) + ellipsis
    : text
}

export const getInputError = (errors, touched) => (property) =>
  touched[property] && errors[property]

export const getResponseError = ({ message }: Response) => {
  if (message.includes('auth/user-not-found')) {
    return 'User does not exist.'
  }

  return 'Some error happened.'
}

export const enterWithY = (y: number) => ({
  initial: { opacity: 0 },
  enter: { opacity: 1, y },
  exit: { opacity: 0 }
})

export const enterWithX = (initial: number, x: number) => ({
  initial: { opacity: 0, x: initial },
  enter: {
    opacity: 1,
    x,
    transition: {
      duration: 0.4
    }
  },
  exit: { opacity: 0 }
})

export const withTestDependencies = () => {
  const container = new Container()

  return {
    container,
    render: (children) =>
      render(
        <QueryClientProvider client={new QueryClient()}>
          <ContainerContext.Provider value={container}>
            {children}
          </ContainerContext.Provider>
        </QueryClientProvider>
      )
  }
}
