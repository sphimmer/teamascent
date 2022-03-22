import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { DeleteResult } from 'src/util/models/deleteResult.model';
import { Skill, SkillInput } from './models/skill.model';
import { SkillsService } from './skills.service';

@Resolver((of) => Skill)
export class SkillsResolver {
  constructor(private skillsService: SkillsService) {}

  @Mutation((returns) => Skill)
  async createSkill(@Args('skillInput') skill: SkillInput): Promise<Skill> {
    return await this.skillsService.create(skill);
  }

  @Query((returns) => [Skill], { name: 'skills' })
  async getSkills(): Promise<Skill[]> {
    return await this.skillsService.findAll();
  }

  @Mutation((returns) => DeleteResult)
  async deleteSkill(@Args('id') id: number): Promise<DeleteResult> {
    const isDeleted = await this.skillsService.delete(id);
    if (isDeleted) {
      return { message: 'Skill deleted', status: 'SUCCESS' };
    } else {
      return { message: 'Skill not deleted', status: 'FAILED' };
    }
  }
}
