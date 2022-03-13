import { gql } from 'graphql-request'
import { inject } from 'inversify'
import { ResumeEntity } from '@cv/core'
import { HttpClient } from 'domain/protocols/http/HttpClient'

export class GetResumeRepository {
  public constructor(@inject(HttpClient) private httpClient: HttpClient) {}

  public async execute(username: string): Promise<ResumeEntity> {
    const query = gql`
      query FindResume($username: String!) {
        findResume(username: $username) {
          id
          views
          general {
            username
            displayName
            role
            location
            website
            about
            photoUrl
          }
          experiences {
            id
            from
            to
            title
            url
            company
            location
            description
          }
          projects {
            title
            year
            url
            description
          }
          contacts {
            type
            value
          }
          languages {
            language
            proficiency
          }
          availability {
            lookingForWork
            disability
            remoteOnly
            freelance
          }
        }
      }
    `

    const response = await this.httpClient.request(query, {
      variables: {
        username
      }
    })

    return response?.findResume
  }
}
