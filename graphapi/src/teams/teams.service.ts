import { BadRequestException, Injectable } from '@nestjs/common';
import { Position } from 'src/positions/models/position.model';
import { createQueryBuilder, FindManyOptions, getRepository, ILike, Repository } from 'typeorm';
import { Team } from './models/team.model';

@Injectable()
export class TeamsService {
  private repository: Repository<Team>;
  constructor() {
    this.repository = getRepository(Team);
  }

  async create(team: Team): Promise<Team> {
    return await this.repository.save(team);
  }

  async findAll(organizationId: string): Promise<Team[]> {
    const options: FindManyOptions = {where: {organization: {id: organizationId}}, relations: ['organization', 'positions']}
    return await this.repository.find(options);
  }

  async search(keyWord: string, organizationId: string): Promise<Team[]> {
    return await this.repository.find({where: { name: ILike(`%${keyWord}%`), organization: {id: organizationId} }, relations: ['organization', 'positions']});
  }

  async findById(id: number, organizationId: string): Promise<Team> {
    return await this.repository.findOne(id, {where: {organization: {id: organizationId}}, relations: ['organization', 'positions']});
  }

  async delete(id: number, organizationId: string): Promise<boolean> {
    const result = await this.repository.delete({ id: id, organization: {id: organizationId}});
    return result.affected > 0;
  }

  async publishTeam(id: number, organizationId: string): Promise<Team>{
    const result = await this.repository.update({id, organization: {id: organizationId}}, {state: "PUBLISHED"});
    if(result.affected){
      return await this.findById(id, organizationId);
    }
    return null;
  }
}
