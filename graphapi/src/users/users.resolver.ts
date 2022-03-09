import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
  Query,
} from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-core';
import { UserToSkill } from 'src/UserToSkill/models/userToSkill.model';
import { UserToSkillService } from 'src/UserToSkill/userToSkills.service';
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
    const user = new User();
    user.firstName = userInput.firstName;
    user.lastName = userInput.lastName;
    user.email = userInput.email;
    user.password = userInput.password;
    user.dateOfBirth = userInput.dateOfBirth;

    return await this.userService.createUser(user);
  }

  @Query((returns) => User, { name: 'user' })
  async getUser(@Args('id') id: string) {
    const user = await this.userService.findUser(id);
    if (!user) {
      throw new ApolloError('User Not Found', 'NOT FOUND');
    }
    return await this.userService.findUser(id);
  }

  @ResolveField('skills', (returns) => [UserToSkill])
  async getSkills(@Parent() user: User) {
    const skills = await this.userToSkillService.findAllByUser(user.id);
    return skills;
  }
}
