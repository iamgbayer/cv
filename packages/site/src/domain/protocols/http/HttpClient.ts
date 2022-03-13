import { injectable } from 'inversify'

export type HttpRequest<T = any> = {
  url: string
  method: HttpMethod
  body?: T
  params?: T
  headers?: any
  onUploadProgress?: (progressEvent: ProgressEvent) => void
  withCredentials?: boolean
}

type Options = {
  headers?: Record<string, string>
  variables?: Record<string, any>
}

@injectable()
export abstract class HttpClient {
  public abstract request(query: string, options?: Options)
}

export type HttpMethod = 'post' | 'get' | 'put' | 'patch' | 'delete'

export enum HttpStatusCode {
  ok = 200,
  created = 201,
  accepted = 202,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  unprocessableEntity = 422,
  serverError = 500
}

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode
  data?: T
}
