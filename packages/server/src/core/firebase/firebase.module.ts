import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import * as admin from 'firebase-admin';

export const Firebase = 'FIREBASE';
export type Firebase = admin.app.App;

export const getAdmin = (): Firebase => {
  return admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: process.env.CLIENT_MAIL,
      projectId: process.env.PROJECT_ID,
      privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  });
};

@Global()
@Module({})
export class FirebaseModule {
  public static forRoot(): DynamicModule {
    const provider: Provider<Firebase> = {
      provide: Firebase,
      useValue: getAdmin(),
    };

    return {
      exports: [provider],
      module: FirebaseModule,
      providers: [provider],
    };
  }
}
