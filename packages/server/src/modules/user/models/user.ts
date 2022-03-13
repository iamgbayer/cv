import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  username: string;

  @Field()
  displayName: string;

  @Field()
  email: string;

  @Field()
  id: string;

  @Field()
  photoUrl: string;
}

@InputType()
export class CreateUserInput extends OmitType(User, ['id'], InputType) {}
