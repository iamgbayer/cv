import { GraphQLHttpClient } from 'infra/protocols/http/graphql-http-client'
import { Container } from 'inversify'

const container = new Container()

container.bind(GraphQLHttpClient).to(GraphQLHttpClient)

export { container }
