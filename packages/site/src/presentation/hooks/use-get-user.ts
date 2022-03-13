import {
  HttpClientFactory,
  IHttpClientFactory,
  useContainer
} from 'container/client'
import { GetUserRepository } from 'infra/repositories/get-user'
import { QUERIES } from 'presentation/queries'
import { useQuery } from 'react-query'

export const useGetUser = ({ enabled = false } = {}) => {
  const container = useContainer()

  const httpClient = container.get<IHttpClientFactory>(HttpClientFactory)({
    credentials: true
  })

  return useQuery(
    [QUERIES.User],
    () => {
      return new GetUserRepository(httpClient).execute()
    },
    {
      refetchOnWindowFocus: false,
      retry: false,
      enabled
    }
  )
}
