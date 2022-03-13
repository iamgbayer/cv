import axios, { AxiosResponse } from 'axios'
import {
  HttpClient,
  HttpRequest,
  HttpResponse
} from 'domain/protocols/http/HttpClient'
import { getAuth } from 'firebase/auth'

export class AxiosHttpClient implements HttpClient {
  async request(data: HttpRequest): Promise<HttpResponse> {
    const auth = getAuth()
    const token = await new Promise((resolve: (idToken: string) => void) => {
      auth.onAuthStateChanged(async (currentUser) =>
        resolve(await currentUser?.getIdToken(true))
      )
    })
    let axiosResponse: AxiosResponse

    console.log(token)

    try {
      axiosResponse = await axios.request({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        url: data.url,
        method: data.method,
        data: data.body,
        params: data.params,
        headers: {
          Authorization: `Bearer ${token}`
        },
        onUploadProgress: data.onUploadProgress,
        withCredentials: data.withCredentials
      })
    } catch (error) {
      console.error(error)
      axiosResponse = error
    }
    return {
      statusCode: axiosResponse.status,
      data: axiosResponse.data
    }
  }
}
