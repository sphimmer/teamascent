/* eslint-disable @typescript-eslint/no-unused-vars */
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
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
import { DeleteResult } from 'src/util/models/deleteResult.model';
import { UserToSkill } from './models/userToSkill.model';
import { UserToSkillInput, UserToSkillUpdateInput } from './models/userToSkillInput.model';
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

  @Mutation(() => DeleteResult, {name: "removeSkillFromUser"})
  @UseGuards(GqlAuthGuard)
  async removeSkill(@Args({name: 'userToSkillId', type: () => Int}) userToSkillId: number, @CurrentUser() cUser: DecodedJwt): Promise<DeleteResult>{
    const isDeleted = await this.userToSkillService.delete(userToSkillId, cUser.id)
    if (isDeleted) {
      return {
        message: "Skill Removed",
        status: "SUCCESS"
      }  
    } else {
      return {
        message: "Skill Not Removed",
        status: "FAILED"
      }
    }
    
  }

  @Mutation((returns) => UserToSkill, {name: 'updateUserSkill'})
  @UseGuards(GqlAuthGuard)
  async updateSkill(@Args('updateData') userToSkillUpdate: UserToSkillUpdateInput, @CurrentUser() currentUser: DecodedJwt) {
    const userId = currentUser.id;
    const owns = await this.userToSkillService.checkOwnership(currentUser.id, userToSkillUpdate.userToSkillId)
    if (owns){
      return await this.userToSkillService.update(userToSkillUpdate);
    } else {
      throw new UnauthorizedException();
    }
  }

  @ResolveField('skill', (returns) => Skill)
  async skill(@Parent() userToSkill: UserToSkill) {
    return await this.skillService.findById(userToSkill.skillId);
  }
}
