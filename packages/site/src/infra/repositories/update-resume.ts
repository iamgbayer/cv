import { gql } from 'graphql-request'
import { GraphQLHttpClient } from 'infra/protocols/http/graphql-http-client'
import { UpdateResumeDto } from '@cv/core'

export class UpdateResumeRepository {
  public constructor(private httpClient: GraphQLHttpClient) {}

  public async execute(data: UpdateResumeDto) {
    console.log(data)

    const query = gql`
      mutation UpdateResume(
        $id: String!
        $experiences: [ExperienceInput!]
        $availability: AvailabilityInput!
        $skills: [String!]
        $general: GeneralInput
        $contacts: [ContactInput!]
        $languages: [LanguageInput!]
        $projects: [ProjectInput!]
      ) {
        update(
          updateResumeInput: {
            id: $id
            experiences: $experiences
            skills: $skills
            availability: $availability
            projects: $projects
            languages: $languages
            contacts: $contacts
            general: $general
          }
        ) {
          id
        }
      }
    `

    const response = await this.httpClient.request(query, {
      variables: data
    })

    return response.updateColor
  }
}
