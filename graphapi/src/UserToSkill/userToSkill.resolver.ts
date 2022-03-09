/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Skill } from 'src/skills/models/skill.model';
import { SkillsService } from 'src/skills/skills.service';
import { UserToSkill } from './models/userToSkill.model';
import { UserToSkillInput } from './models/userToSkillInput.model';
import { UserToSkillService } from './userToSkills.service';

@Resolver((of) => UserToSkill)
export class UserToSkillResolver {
  constructor(
    private userToSkillService: UserToSkillService,
    private skillService: SkillsService,
  ) {}

  @Mutation((returns) => UserToSkill)
  async addSkill(@Args('addSkillData') userToSkillInput: UserToSkillInput) {
    return await this.userToSkillService.new(userToSkillInput);
  }

  @ResolveField('skill', (returns) => Skill)
  async skill(@Parent() userToSkill: UserToSkill) {
    return await this.skillService.findById(userToSkill.skillId);
  }
}
