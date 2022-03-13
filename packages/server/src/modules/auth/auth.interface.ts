export type Token = { uid: string };

export abstract class TokenVerification {
  abstract verify(id: string): Token | Promise<Token>;
}
