import { CreateUserDto } from '@cv/core'
import { gql } from 'graphql-request'
import { GraphQLHttpClient } from 'infra/protocols/http/graphql-http-client'

export class CreateUserRepository {
  public constructor(private httpClient: GraphQLHttpClient) {}

  public async execute(data: CreateUserDto) {
    const query = gql`
      mutation CreateUser(
        $username: String!
        $displayName: String!
        $email: String!
        $photoUrl: String!
      ) {
        createUser(
          createUserInput: {
            username: $username
            displayName: $displayName
            email: $email
            photoUrl: $photoUrl
          }
        ) {
          id
        }
      }
    `

    console.log(this.makeData(data))

    const response = await this.httpClient.request(query, {
      variables: this.makeData(data)
    })

    console.log(response)

    return response.createResume
  }

  private makeData(data: CreateUserDto) {
    return {
      email: data.email,
      displayName: data.displayName,
      photoUrl: data.photoUrl,
      username: data.email.substr(0, data.email.indexOf('@'))
    }
  }
}
