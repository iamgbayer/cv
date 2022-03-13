import { Test, TestingModule } from '@nestjs/testing';
import { ResumeResolver } from './resume.resolver';
import { ResumeService } from './resume.service';

describe('ResumeResolver', () => {
  let resolver: ResumeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResumeResolver, ResumeService],
    }).compile();

    resolver = module.get<ResumeResolver>(ResumeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
