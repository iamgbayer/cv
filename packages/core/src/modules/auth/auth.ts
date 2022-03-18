import { injectable } from 'inversify'

export type AuthUserType = {
  additionalUserInfo?: {
    isNewUser: boolean
  }
  user: {
    displayName: string
    email: string
    photoURL: string
  }
}

export enum AuthProvider {
  GOOGLE = 'GOOGLE'
}

@injectable()
export abstract class Auth {
  public abstract getToken(): Promise<string | undefined>

  public abstract authenticate(provider: AuthProvider): Promise<AuthUserType>

  public abstract unauthenticate(): Promise<void>
}
