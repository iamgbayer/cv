import { Injectable } from '@nestjs/common';
import { InjectFirebase } from 'src/core/firebase/firebase.inject';
import { Firebase } from 'src/core/firebase/firebase.module';
import { ResumeService } from '../resume/resume.service';
import { CreateUserInput, User } from './models/user';
import { merge } from 'lodash';

@Injectable()
export class UserService {
  constructor(
    @InjectFirebase() private readonly admin: Firebase,
    private readonly resumeService: ResumeService,
  ) {}

  public async findById(id: string): Promise<User> {
    const user = await this.admin.firestore().collection('Users').doc(id).get();

    return user.data() as User;
  }

  public async create(
    createUserInput: CreateUserInput,
    id: string,
  ): Promise<User> {
    const user = merge(createUserInput, { id });

    await this.admin.firestore().collection('Users').doc(id).set(user);
    await this.resumeService.create(createUserInput);

    return user;
  }
}
