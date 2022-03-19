import { Auth, AuthProvider, AuthUserType } from '@cv/core'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  getAdditionalUserInfo,
  UserCredential
} from 'firebase/auth'
import { injectable } from 'inversify'
import firebase from 'firebase/compat/app'

@injectable()
export class FirebaseAuth extends Auth {
  public constructor() {
    super()

    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
      })
    }
  }

  public getToken(): Promise<string> {
    return new Promise((resolve) =>
      getAuth().onAuthStateChanged((user) => resolve(user?.getIdToken(true)))
    )
  }

  public listen(callable: (user: unknown) => void) {
    return getAuth().onAuthStateChanged(callable)
  }

  public unauthenticate(): Promise<void> {
    return getAuth().signOut()
  }

  public authenticate(provider: AuthProvider): Promise<AuthUserType> {
    return new Promise((resolve: (authUser: AuthUserType) => void, reject) =>
      signInWithPopup(getAuth(), this.getProvider(provider))
        .then(async (response: UserCredential) => {
          const { isNewUser } = await getAdditionalUserInfo(response)

          resolve({
            isNewUser,
            user: {
              displayName: response.user.displayName,
              email: response.user.email,
              photoURL: response.user.photoURL
            }
          })
        })
        .catch(reject)
    )
  }

  private getProvider(provider: AuthProvider): firebase.auth.AuthProvider {
    const providers = {
      [AuthProvider.GOOGLE]: new GoogleAuthProvider()
    }

    const p = providers[provider]

    p.addScope('email')

    return p
  }
}
