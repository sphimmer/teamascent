import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
  Query,
} from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-core';
import { Organization } from 'src/organizations/models/organization.model';
import { UserToSkill } from 'src/userToSkill/models/userToSkill.model';
import { UserToSkillService } from 'src/userToSkill/userToSkills.service';
import { User } from './models/user.model';
import { UserInput, validate } from './models/userInput.model';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt'; 
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import { DecodedJwt } from 'src/auth/models/auth.model';
import { UpdateUser } from './models/userUpdate.model';
import { OrganizationsService } from 'src/organizations/organizations.service';

@Resolver((of: any) => User)
export class UsersResolver {
  constructor(
    private userService: UsersService,
    private userToSkillService: UserToSkillService,
    private orgService: OrganizationsService
  ) {}

  @Mutation((returns) => User)
  async createUser(@Args('userInputData') userInput: UserInput): Promise<User> {
    let [valid, errors] = validate(userInput)
    if (!valid && errors.length > 0) {
      throw new Error("Invalid input: " + errors.toString());
    }
    const user = new User();
    user.firstName = userInput.firstName;
    user.lastName = userInput.lastName;
    user.email = userInput.email;
    user.password = await bcrypt.hash(userInput.password, 10);
    user.dateOfBirth = userInput.dateOfBirth;
    user.organization = new Organization()
    user.organization.id = userInput.organizationId

    return await this.userService.createUser(user);
  }

  @Query((returns) => User, { name: 'user' })
  @UseGuards(GqlAuthGuard)
  async getUser(@Args('id') id: string, @CurrentUser() currentUser: DecodedJwt) {
    const user = await this.userService.findUser(id, currentUser.organizationId);
    if (!user) {
      throw new ApolloError('User Not Found', 'NOT FOUND');
    }
    return user;
  }

  @Query((returns) => User, { name: 'me' })
  @UseGuards(GqlAuthGuard)
  async getMe(@CurrentUser() currentUser: DecodedJwt) {
    const user = await this.userService.findUser(currentUser.id, currentUser.organizationId);
    if (!user) {
      throw new ApolloError('User Not Found', 'NOT FOUND');
    }
    return user;
  }

  @Mutation(() => User, {name: "updateMe"})
  @UseGuards(GqlAuthGuard)
  async updateMe(@Args('me') user: UpdateUser, @CurrentUser() cUser: DecodedJwt) {

    const newU: User = new User()
    newU.id = cUser.id
    Object.entries(user).forEach(([key, value]) => {
      if(value){
        newU[key] = value
      }
    })
    return await this.userService.updateUser(newU, cUser.organizationId)
  }

  @ResolveField('skills', (returns) => [UserToSkill])
  async getSkills(@Parent() user: User) {
    const skills = await this.userToSkillService.findAllByUser(user.id);
    return skills;
  }

  @ResolveField('organization', () => Organization)
  async getOrg(@Parent() user: User, @CurrentUser() cUser: DecodedJwt) {
    return await this.orgService.findById(cUser.organizationId || user.organization.id)
  }
}
