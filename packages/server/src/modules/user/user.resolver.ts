import { UseGuards } from '@nestjs/common';
import { Resolver, Context, Query, Mutation, Args } from '@nestjs/graphql';
import { UserGuard } from '../auth/auth.guard';
import { UserService } from './user.service';
import { CreateUserInput, User } from './models/user';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(UserGuard)
  @Query(() => User)
  public findUser(@Context() context) {
    const user = context.req.user;

    return this.userService.findById(user);
  }

  @UseGuards(UserGuard)
  @Mutation(() => User)
  public createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
    @Context() context,
  ) {
    const id = context.req.user;
    return this.userService.create(createUserInput, id);
  }
}
