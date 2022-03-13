import { Module } from '@nestjs/common';
import { ResumeModule } from './resume/resume.module';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { FirebaseModule } from 'src/core/firebase/firebase.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'src/core/logger/logger.module';
import { UserModule } from './user/user.module';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    FirebaseModule.forRoot(),
    LoggerModule,
    AuthModule,
    UserModule,
    ResumeModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
})
export class AppModule {}
