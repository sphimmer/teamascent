import { Injectable } from '@nestjs/common';
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

  async delete(skillId: number, userId: string): Promise<boolean>{
    const result = await this.repository.delete({skill: {id: skillId}, user: {id: userId}})
    return result.affected > 0
  }
}
