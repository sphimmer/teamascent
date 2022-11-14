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
import { UserInput } from './models/userInput.model';
import { UsersService } from './users.service';

@Resolver((of: any) => User)
export class UsersResolver {
  constructor(
    private userService: UsersService,
    private userToSkillService: UserToSkillService,
  ) {}

  @Mutation((returns) => User)
  async createUser(@Args('userInputData') userInput: UserInput): Promise<User> {
    let [valid, errors] = userInput.validate()
    if (!valid && errors.length > 0) {
      throw new Error("Invalid input: " + errors.toString());
    }
    const user = new User();
    user.firstName = userInput.firstName;
    user.lastName = userInput.lastName;
    user.email = userInput.email;
    user.password = userInput.password;
    user.dateOfBirth = userInput.dateOfBirth;
    user.organization = new Organization()
    user.organization.id = userInput.organizationId

    return await this.userService.createUser(user);
  }

  @Query((returns) => User, { name: 'user' })
  async getUser(@Args('id') id: string) {
    const user = await this.userService.findUser(id);
    if (!user) {
      throw new ApolloError('User Not Found', 'NOT FOUND');
    }
    return user;
  }

  @ResolveField('skills', (returns) => [UserToSkill])
  async getSkills(@Parent() user: User) {
    const skills = await this.userToSkillService.findAllByUser(user.id);
    return skills;
  }
}
