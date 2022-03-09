import { Injectable, Logger } from '@nestjs/common';
import { Skill } from 'src/skills/models/skill.model';
import { getRepository, Repository } from 'typeorm';
import { UserToSkill } from './models/userToSkill.model';
import { UserToSkillInput } from './models/userToSkillInput.model';

@Injectable()
export class UserToSkillService {
  private repository: Repository<UserToSkill>;
  constructor() {
    this.repository = getRepository(UserToSkill);
  }

  async findAllByUser(userId: string): Promise<UserToSkill[]> {
    const skills = await this.repository.find({
      relations: ['skill'],
      where: { userId: userId },
    });
    return skills;
  }

  async new(skill: UserToSkillInput): Promise<UserToSkill> {
    const newSkillSaved = await this.repository.save(skill);
    return newSkillSaved;
  }
}
