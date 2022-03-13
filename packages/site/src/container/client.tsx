import { AuthToken } from '@cv/core'
import { HttpClient } from 'domain/protocols/http/HttpClient'
import { FirebaseAuthToken } from 'infra/adapters/firebase-auth-token'
import { CredentialsGraphQLHttpClient } from 'infra/protocols/http/auth-graphql-http-client'
import { GraphQLHttpClient } from 'infra/protocols/http/graphql-http-client'
import { Container } from 'inversify'
import { createContext, useContext } from 'react'

export const container = new Container()

export const HttpClientFactory = Symbol('Factory<HttpClient>')

type HttpClientFactoryOptions = {
  credentials: boolean
}
export type IHttpClientFactory = (
  options: HttpClientFactoryOptions
) => HttpClient

container.bind(AuthToken).to(FirebaseAuthToken)
container.bind(GraphQLHttpClient).to(GraphQLHttpClient)
container.bind(CredentialsGraphQLHttpClient).to(CredentialsGraphQLHttpClient)

container.bind(HttpClientFactory).toFactory((context) => {
  return (options: HttpClientFactoryOptions) =>
    options.credentials
      ? new CredentialsGraphQLHttpClient(
        context.container.get(GraphQLHttpClient),
        context.container.get(AuthToken)
      )
      : context.container.get(GraphQLHttpClient)
})

export const ContainerContext = createContext(container)

export const ContainerProvider = ({ children }) => (
  <ContainerContext.Provider value={container}>
    {children}
  </ContainerContext.Provider>
)

export const useContainer = () => {
  return useContext(ContainerContext)
}
