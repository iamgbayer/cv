import { Auth } from '@cv/core'
import { HttpClient } from 'domain/protocols/http/HttpClient'
import { inject, injectable } from 'inversify'
import { GraphQLHttpClient } from './graphql-http-client'

@injectable()
export class CredentialsGraphQLHttpClient extends HttpClient {
  public constructor(
    @inject(GraphQLHttpClient) private readonly httpClient: GraphQLHttpClient,
    @inject(Auth) private readonly auth: Auth
  ) {
    super()
  }

  public async request(query, options) {
    const token = await this.auth.getToken()

    return this.httpClient.request(query, {
      headers: {
        authorization: `Bearer ${token}`
      },
      variables: options?.variables
    })
  }
}
