import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
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
}
