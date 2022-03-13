import { Module } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { UserService } from '../user/user.service';
import { ResumeResolver } from './resume.resolver';

@Module({
  providers: [UserService, ResumeService, ResumeResolver],
})
export class ResumeModule {}
