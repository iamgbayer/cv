import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { ResumeService } from '../resume/resume.service';

@Module({
  providers: [ResumeService, UserService, UserResolver],
})
export class UserModule {}
