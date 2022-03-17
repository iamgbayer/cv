import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import {
  AvailabilityEntity,
  ContactEntity,
  ResumeEntity,
  ExperienceEntity,
  GeneralEntity,
  LanguageEntity,
  ProjectEntity,
} from '@cv/core';

@ObjectType()
@InputType('AvailabilityInput')
export class Availability implements AvailabilityEntity {
  @Field()
  freelance: boolean;

  @Field()
  lookingForWork: boolean;

  @Field()
  disability: boolean;

  @Field()
  remoteOnly: boolean;
}

@ObjectType()
@InputType('ExperienceInput')
export class Experience implements ExperienceEntity {
  @Field()
  id: string;

  @Field()
  from: string;

  @Field()
  to: string;

  @Field()
  title: string;

  @Field()
  url: string;

  @Field()
  company: string;

  @Field()
  location: string;

  @Field()
  description: string;
}

@ObjectType()
@InputType('GeneralInput')
export class General implements GeneralEntity {
  @Field()
  username: string;

  @Field()
  displayName: string;

  @Field()
  role: string;

  @Field()
  location: string;

  @Field()
  website: string;

  @Field()
  about: string;

  @Field()
  photoUrl: string;
}

@ObjectType()
@InputType('ProjectInput')
export class Project implements ProjectEntity {
  @Field()
  title: string;

  @Field()
  year: string;

  @Field()
  url: string;

  @Field()
  description: string;
}

@ObjectType()
@InputType('ContactInput')
export class Contact implements ContactEntity {
  @Field()
  id: string;

  @Field()
  type: string;

  @Field()
  value: string;
}

@ObjectType()
@InputType('LanguageInput')
export class Language implements LanguageEntity {
  @Field()
  id: string;

  @Field()
  language: string;

  @Field()
  proficiency: string;
}

@ObjectType('Resume')
export class Resume implements ResumeEntity {
  @Field()
  id: string;

  @Field()
  views: number;

  @Field(() => [String], { nullable: 'items' })
  skills: string[];

  @Field()
  createdAt: Date;

  @Field()
  availability: Availability;

  @Field(() => [Experience], { nullable: 'items' })
  experiences: Experience[];

  @Field(() => General)
  general: General;

  @Field(() => [Project], { nullable: 'items' })
  projects: Project[];

  @Field(() => [Contact], { nullable: 'items' })
  contacts: Contact[];

  @Field(() => [Language], { nullable: 'items' })
  languages: Language[];
}

@InputType()
export class UpdateResumeInput extends PartialType(Resume, InputType) {
  @Field()
  id: string;
}
