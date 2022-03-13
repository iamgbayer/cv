import { HttpClient } from 'domain/protocols/http/HttpClient'
import { GraphQLClient } from 'graphql-request'
import { injectable } from 'inversify'

@injectable()
export class GraphQLHttpClient extends HttpClient {
  public async request(query, options) {
    const graphQLClient = new GraphQLClient(
      process.env.NEXT_PUBLIC_GRAPHQL_URL,
      {
        headers: options.headers
      }
    )

    return graphQLClient.request(query, options.variables)
  }
}
