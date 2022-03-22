/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Args,
  Mutation,
  Resolver,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-errors';
import { Skill } from 'src/skills/models/skill.model';
import { DeleteResult } from 'src/util/models/deleteResult.model';
import { Role } from './models/role.model';
import { RoleInput } from './models/roleInput.model';
import { RolesService } from './roles.service';

@Resolver((of: any) => Role)
export class RolesResolver {
  constructor(private roleService: RolesService) {}

  @Mutation((returns) => Role)
  async createRole(@Args('roleInputData') roleInput: RoleInput): Promise<Role> {
    const newRole = new Role();
    newRole.title = roleInput.title;
    newRole.description = roleInput.description;
    newRole.responsibilities = roleInput.responsibilities;
    newRole.skills = roleInput.skillIds.map((id) => {
      const s = new Skill();
      s.id = id;
      return s;
    });

    return await this.roleService.save(newRole);
  }

  @Mutation((returns) => Role)
  async updateRole(
    @Args('id') id: number,
    @Args('roleInputData') roleInput: RoleInput,
  ): Promise<Role> {
    const updateRole = new Role();
    updateRole.id = id;
    updateRole.title = roleInput.title;
    updateRole.description = roleInput.description;
    updateRole.responsibilities = roleInput.responsibilities;
    updateRole.skills = roleInput.skillIds.map((id) => {
      const s = new Skill();
      s.id = id;
      return s;
    });

    return await this.roleService.save(updateRole);
  }

  @Mutation((returns) => DeleteResult)
  async deleteRole(@Args('id') id: number): Promise<DeleteResult> {
    const isDeleted = await this.roleService.delete(id);
    const result = new DeleteResult();
    if (isDeleted) {
      result.message = 'Role Successfully deleted';
      result.status = 'SUCCESS';
    } else {
      result.message = 'Role Failed to delete';
      result.status = 'FAILED';
    }
    return result;
  }

  @Query(() => Role, { name: 'role' })
  async role(@Args('id') id: number): Promise<Role> {
    const role = await this.roleService.findOne(id);
    if (!role) {
      throw new ApolloError('Role Not Found', 'NOT FOUND');
    }
    return role;
  }

  @ResolveField('skills', (returns) => [Skill])
  async getSkills(@Parent() role: Role): Promise<Skill[]> {
    const roleWithSkills = await this.roleService.findOne(role.id, true);
    return roleWithSkills.skills;
  }

  @Query(() => [Role], { name: 'roles' })
  async roles(
    @Args('title', { nullable: true }) title: string,
  ): Promise<Role[]> {
    return this.roleService.findAll(title);
  }
}
