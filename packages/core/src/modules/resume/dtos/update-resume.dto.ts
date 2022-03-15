import {
  AvailabilityEntity,
  ContactEntity,
  ExperienceEntity,
  GeneralEntity,
  LanguageEntity,
  ProjectEntity
} from '../entities'

export interface UpdateResumeDto {
  id: string
  skills?: string[]
  general?: Partial<GeneralEntity>
  contacts?: Partial<ContactEntity[]>
  languages?: Partial<LanguageEntity[]>
  projects?: Partial<ProjectEntity[]>
  availability?: Partial<AvailabilityEntity>
  experiences?: Partial<ExperienceEntity[]>
}
