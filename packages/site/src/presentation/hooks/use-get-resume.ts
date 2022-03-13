import {
  HttpClientFactory,
  IHttpClientFactory,
  useContainer
} from 'container/client'
import { GetResumeRepository } from 'infra/repositories/get-resume'
import { QUERIES } from 'presentation/queries'
import { useQuery } from 'react-query'

export const useGetResume = (username: string) => {
  const container = useContainer()

  const httpClient = container.get<IHttpClientFactory>(HttpClientFactory)({
    credentials: true
  })

  return useQuery(
    [QUERIES.Resume],
    () => {
      return new GetResumeRepository(httpClient).execute(username)
    },
    {
      refetchOnWindowFocus: false,
      retry: false
    }
  )
}
