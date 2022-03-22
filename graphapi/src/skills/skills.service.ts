import { Injectable } from '@nestjs/common';
import { getRepository, Repository } from 'typeorm';
import { Skill } from './models/skill.model';

@Injectable()
export class SkillsService {
  private repository: Repository<Skill>;
  constructor() {
    this.repository = getRepository(Skill);
  }

  async create(skill: Skill): Promise<Skill> {
    return await this.repository.save(skill);
  }

  async findAll(): Promise<Skill[]> {
    return await this.repository.find();
  }

  async search(keyWord: string): Promise<Skill[]> {
    return await this.repository.find({ where: { name: keyWord } });
  }

  async findById(id: number): Promise<Skill> {
    return await this.repository.findOne(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete({ id: id });
    return result.affected > 0;
  }
}
