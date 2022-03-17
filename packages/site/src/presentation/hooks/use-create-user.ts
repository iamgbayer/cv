import { CreateUserInput } from '@cv/core'
import {
  HttpClientFactory,
  IHttpClientFactory,
  useContainer
} from 'container/client'
import { CreateUserRepository } from 'infra/repositories/create-user'
import { QUERIES } from 'presentation/queries'
import { useMutation, useQueryClient } from 'react-query'

export const useCreateUser = () => {
  const queryClient = useQueryClient()
  const container = useContainer()

  const httpClient = container.get<IHttpClientFactory>(HttpClientFactory)({
    credentials: true
  })

  return useMutation(
    (data: CreateUserInput) =>
      new CreateUserRepository(httpClient).execute(data),
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(QUERIES.User)
      }
    }
  )
}
