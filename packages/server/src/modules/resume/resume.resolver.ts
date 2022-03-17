import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserGuard } from '../auth/auth.guard';
import { UserService } from '../user/user.service';
import { ResumeService } from './resume.service';
import { Resume, UpdateResumeInput } from './models/resume';

@Resolver()
export class ResumeResolver {
  constructor(
    private readonly resumeService: ResumeService,
    private readonly userService: UserService,
  ) {}

  @Query(() => [Resume])
  public findAll() {
    return this.resumeService.findAll();
  }

  @Query(() => Resume)
  public async findResume(@Args('username') username: string) {
    const resume = await this.resumeService.find(username);

    return {
      ...resume,
    };
  }

  @UseGuards(UserGuard)
  @Mutation(() => Resume)
  public update(
    @Args({ name: 'updateResumeInput', nullable: true })
    updateResumeInput: UpdateResumeInput,
  ) {
    return this.resumeService.update(updateResumeInput);
  }
}
