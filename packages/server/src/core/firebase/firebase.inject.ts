import { Inject } from '@nestjs/common';
import { Firebase } from './firebase.module';

export function InjectFirebase() {
  return Inject(Firebase);
}
