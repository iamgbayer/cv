import { AuthToken } from '@cv/core'
import { getAuth } from 'firebase/auth'
import { injectable } from 'inversify'

@injectable()
export class FirebaseAuthToken extends AuthToken {
  public getToken(): Promise<string> {
    return new Promise((resolve) =>
      getAuth().onAuthStateChanged((user) => resolve(user?.getIdToken(true)))
    )
  }
}
