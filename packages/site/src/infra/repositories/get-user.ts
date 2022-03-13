import { gql } from 'graphql-request'
import { inject } from 'inversify'
import { User } from '@cv/core'
import { HttpClient } from 'domain/protocols/http/HttpClient'

export class GetUserRepository {
  public constructor(@inject(HttpClient) private httpClient: HttpClient) {}

  public async execute(): Promise<User> {
    const query = gql`
      query FindUser {
        findUser {
          username
          displayName
          email
          photoUrl
        }
      }
    `

    const response = await this.httpClient.request(query)

    return response?.findUser
  }
}
