import { Request } from 'express';
import { CanActivate, Injectable, Logger } from '@nestjs/common';
import { Firebase } from 'src/core/firebase/firebase.module';
import { InjectFirebase } from 'src/core/firebase/firebase.inject';
import { auth } from 'firebase-admin';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    private readonly logger: Logger,
    @InjectFirebase() private readonly admin: Firebase,
  ) {}

  public async canActivate(context): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    let request = ctx.req;

    if (!request) {
      request = context.switchToHttp().getRequest();
    }

    try {
      const auth = await this.verify(this.getToken(request));

      if (!auth?.uid) {
        return false;
      }

      request.user = auth.uid;

      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  private async verify(
    token: string,
  ): Promise<auth.DecodedIdToken | { uid: string }> {
    return await this.admin.auth().verifyIdToken(token);
  }

  private getToken(request: Request): string {
    let token = request.headers['authorization']?.split(' ')[1] ?? null;

    if (token) {
      return token;
    }

    return '';
  }
}
