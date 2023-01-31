import { Injectable } from '@nestjs/common';
import { getRepository, Repository } from 'typeorm';
import { UserToSkill } from './models/userToSkill.model';
import {
  UserToSkillInput,
  UserToSkillUpdateInput,
} from './models/userToSkillInput.model';

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

  async checkOwnership(
    userId: string,
    userToSkillId: number,
  ): Promise<boolean> {
    const result = await this.repository.find({ userId, userToSkillId });
    if (result.length === 1) {
      return true;
    } else {
      return false;
    }
  }

  async new(skill: UserToSkillInput): Promise<UserToSkill> {
    const newSkillSaved = await this.repository.save(skill);
    return newSkillSaved;
  }

  async delete(userToSkillId: number, userId: string): Promise<boolean> {
    const result = await this.repository.delete({
      userToSkillId,
      user: { id: userId },
    });
    return result.affected > 0;
  }

  async update(
    userToSkillUpdate: UserToSkillUpdateInput,
  ): Promise<UserToSkill> {
    const result = await this.repository.update(
      userToSkillUpdate.userToSkillId,
      { competencyLevel: userToSkillUpdate.competencyLevel },
    );
    if (result.affected > 0) {
      return this.repository.findOne(userToSkillUpdate.userToSkillId);
    }
  }
}
