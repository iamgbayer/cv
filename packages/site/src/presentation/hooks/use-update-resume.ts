import { UpdateResumeDto } from '@cv/core'
import {
  container,
  HttpClientFactory,
  IHttpClientFactory
} from 'container/client'
import { UpdateResumeRepository } from 'infra/repositories/update-resume'
import { QUERIES } from 'presentation/queries'
import { useMutation, useQueryClient } from 'react-query'

export const useUpdateResume = () => {
  const queryClient = useQueryClient()

  const httpClient = container.get<IHttpClientFactory>(HttpClientFactory)({
    credentials: true
  })

  return useMutation(
    (data: UpdateResumeDto) =>
      new UpdateResumeRepository(httpClient).execute(data),
    {
      onSuccess: () => {
        queryClient.fetchQuery(QUERIES.Resume)
      }
    }
  )
}
