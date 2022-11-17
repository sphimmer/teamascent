/* eslint-disable @typescript-eslint/no-unused-vars */
import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { DecodedJwt } from 'src/auth/models/auth.model';
import { Skill } from 'src/skills/models/skill.model';
import { SkillsService } from 'src/skills/skills.service';
import { User } from 'src/users/models/user.model';
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
  @UseGuards(GqlAuthGuard)
  async addSkill(@Args('addSkillData') userToSkillInput: UserToSkillInput, @CurrentUser() currentUser: DecodedJwt) {
    if (!userToSkillInput.userId) {
      userToSkillInput.userId = currentUser.id
      
    }
    return await this.userToSkillService.new(userToSkillInput);
  }

  @ResolveField('skill', (returns) => Skill)
  async skill(@Parent() userToSkill: UserToSkill) {
    return await this.skillService.findById(userToSkill.skillId);
  }
}
