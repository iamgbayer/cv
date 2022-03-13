import { injectable } from 'inversify'

@injectable()
export abstract class AuthToken {
  public abstract getToken(): Promise<string | undefined>
}
