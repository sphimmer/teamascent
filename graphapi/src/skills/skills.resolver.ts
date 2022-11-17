import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { DeleteResult } from 'src/util/models/deleteResult.model';
import { Skill, SkillInput } from './models/skill.model';
import { SkillsService } from './skills.service';

@Resolver((of) => Skill)
export class SkillsResolver {
  constructor(private skillsService: SkillsService) {}

  @Mutation((returns) => Skill, { name: "createSkill"})
  @UseGuards(GqlAuthGuard)
  async create(@Args('skillInput') skill: SkillInput): Promise<Skill> {
    return await this.skillsService.create(skill);
  }

  @Query((returns) => [Skill], { name: 'skills' })
  @UseGuards(GqlAuthGuard)
  async search(
    @Args('name', { nullable: true }) name: string,
  ): Promise<Skill[]> {
    if (name) {
      return await this.skillsService.search(name);
    }
    return await this.skillsService.findAll();
  }

  @Mutation((returns) => DeleteResult, { name: "deleteSkill" })
  @UseGuards(GqlAuthGuard)
  async delete(@Args('id') id: number): Promise<DeleteResult> {
    const isDeleted = await this.skillsService.delete(id);
    if (isDeleted) {
      return { message: 'Skill deleted', status: 'SUCCESS' };
    } else {
      return { message: 'Skill not deleted', status: 'FAILED' };
    }
  }
}
