import { Logger, Module } from '@nestjs/common';
import { UserGuard } from './auth.guard';

@Module({
  imports: [Logger],
  providers: [UserGuard],
  exports: [UserGuard],
})
export class AuthModule {}
