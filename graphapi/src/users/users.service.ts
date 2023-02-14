import { Injectable, Logger } from '@nestjs/common';
import transactionalUpdate from 'src/util/transactionUpdate';
import { getRepository, Repository } from 'typeorm';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  private repository: Repository<User>;
  constructor() {
    this.repository = getRepository(User);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async createUser(user: User): Promise<User> {
    const savedUser = await this.repository.save(user);
    return savedUser;
  }

  async updateUser(user: User, organizationId: string): Promise<User> {
    return await transactionalUpdate<User>(User, user, organizationId)
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async findUser(id: string, organizationId: string): Promise<User | null> {
    try {
      const foundUser = await this.repository.findOne(id, {where: {organization: {id: organizationId}}});
      if (!foundUser) {
        Logger.log('User not found', 'UserService.findUser');
        return null;
      }
      return foundUser;
    } catch (error) {
      Logger.error('Error in retrieving user', 'UserService.findUser');
    }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    try{
      const foundUser = await this.repository.findOne({where: {email: email}, relations: ['organization']})
      if (!foundUser) {
        Logger.log('User not found', 'UserService.findUser');
        return null;
      }
      return foundUser;
    } catch (error) {
      Logger.error('Error in retrieving user', 'UserService.findUser');
    }
  }

  async findUsersOfOrg(organizationId: string): Promise<User[]>{
    try {
      const users = await this.repository.find({organization: {id: organizationId}})
      return users;
    } catch (error) {
      Logger.error('Error in retrieving users', 'UserService.findUsersOfOrg', error)
    }
  }
}
