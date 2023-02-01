export interface ISkill {
  id: number
  name: string
}

export interface ISkillsResult {
  skills: ISkill[]
}


export interface IUserSkill{
  userToSkillId: number
  competencyLevel: number
  skill: ISkill
}

export interface IMySkills{
  me: {
    skills: IUserSkill[]
  }
}
