import { Injectable, Logger } from '@nestjs/common';
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
}
