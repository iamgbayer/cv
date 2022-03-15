import { Injectable } from '@nestjs/common';
import { InjectFirebase } from 'src/core/firebase/firebase.inject';
import { Firebase } from 'src/core/firebase/firebase.module';
import { UpdateResumeDto, ResumeEntity, CreateResumeInput } from '@cv/core';
import { v4 } from 'uuid';
import { Resume } from './models/resume';

@Injectable()
export class ResumeService {
  constructor(@InjectFirebase() private readonly admin: Firebase) {}

  public async create(createUserInput: CreateResumeInput) {
    const id = v4();
    const resume: Resume = {
      id,
      contacts: [],
      createdAt: new Date(),
      skills: [],
      experiences: [],
      languages: [],
      projects: [],
      general: {
        about: '',
        displayName: createUserInput.displayName,
        photoUrl: createUserInput.photoUrl,
        location: '',
        role: '',
        username: createUserInput.username,
        website: '',
      },
      views: 0,
      availability: {
        disability: false,
        freelance: false,
        lookingForWork: false,
        remoteOnly: false,
      },
    };

    await this.admin.firestore().collection('Resumes').doc(id).set(resume);
  }

  public async findAll(): Promise<Array<ResumeEntity>> {
    const resumes = await this.admin.firestore().collection('Resumes').get();

    return Promise.resolve([]);
  }

  public async find(username: string): Promise<ResumeEntity | null> {
    const snapshot = await this.admin
      .firestore()
      .collection('Resumes')
      .where('general.username', '==', username)
      .get();

    if (snapshot.empty) {
      return null;
    }

    return snapshot.docs[0].data() as ResumeEntity;
  }

  public async update(updateResumeInput: UpdateResumeDto) {
    try {
      await this.admin
        .firestore()
        .collection('Resumes')
        .doc(updateResumeInput.id)
        .update(updateResumeInput);
    } catch (error) {
      console.log(error);
    }

    return updateResumeInput;
  }
}
