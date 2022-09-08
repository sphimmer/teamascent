import { Injectable } from '@nestjs/common';

import { getRepository, Repository } from 'typeorm';
import { Role } from './models/role.model';

@Injectable()
export class RolesService {
  private repository: Repository<Role>;
  constructor() {
    this.repository = getRepository(Role);
  }

  async save(role: Role): Promise<Role> {
    const savedRole = await this.repository.save(role);
    return savedRole;
  }

  async findOne(roleId: number, withSkill = false): Promise<Role> {
    const options = {};
    if (withSkill) {
      options['relations'] = ['skills'];
    }
    const role = await this.repository.findOne(roleId, options);
    return role;
  }

  async findAll(title: string): Promise<Role[]> {
    let options = {};
    if (title) {
      options = { where: { title: title } };
    }
    const roles = await this.repository.find(options);
    return roles;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete({ id: id });
    return result.affected > 0;
  }
}
