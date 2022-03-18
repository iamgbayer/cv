import { container } from 'container/server'
import { GraphQLHttpClient } from 'infra/protocols/http/graphql-http-client'
import { GetResumeRepository } from 'infra/repositories/get-resume'
import { GetServerSideProps } from 'next'
import { Username } from 'presentation/pages/username/username'
import { QUERIES } from 'presentation/queries'
import { dehydrate, QueryClient } from 'react-query'

export default function ({ pageProps }) {
  const username = pageProps.username

  return <Username username={username} />
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const queryClient = new QueryClient()
  const username = query?.username as string

  try {
    await queryClient.fetchQuery([QUERIES.Resume], () =>
      new GetResumeRepository(container.get(GraphQLHttpClient)).execute(
        username
      )
    )
  } catch (error) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      username,
      dehydratedState: dehydrate(queryClient)
    }
  }
}
