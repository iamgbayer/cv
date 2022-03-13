export interface ResumeEntity {
  general: GeneralEntity
  contacts: ContactEntity[]
  languages: LanguageEntity[]
  projects: ProjectEntity[]
  availability: AvailabilityEntity
  experiences: ExperienceEntity[]
  createdAt: Date
  skills: string[]
  views: number
  id: string
}

export interface ExperienceEntity {
  from: string
  id: string
  to: string
  title: string
  url: string
  company: string
  location: string
  description: string
}

export interface AvailabilityEntity {
  freelance: boolean
  lookingForWork: boolean
  disability: boolean
  remoteOnly: boolean
}

export interface ContactEntity {
  type: string
  value: string
}

export interface LanguageEntity {
  language: string
  proficiency: string
}

export interface ProjectEntity {
  title: string
  year: string
  url: string
  description: string
}

export interface GeneralEntity {
  username: string
  displayName: string
  role: string
  location: string
  website: string
  photoUrl: string
  about: string
}
