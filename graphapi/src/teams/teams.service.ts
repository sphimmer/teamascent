import { BadRequestException, Injectable } from '@nestjs/common';
import { Position } from 'src/positions/models/position.model';
import { createQueryBuilder, getRepository, ILike, Repository } from 'typeorm';
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

  async findAll(): Promise<Team[]> {
    return await this.repository.find();
  }

  async search(keyWord: string): Promise<Team[]> {
    return await this.repository.find({ name: ILike(`%${keyWord}%`) });
  }

  async findById(id: number): Promise<Team> {
    return await this.repository.findOne(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete({ id: id });
    return result.affected > 0;
  }

  async publishTeam(id: number): Promise<Team>{
    const result = await this.repository.update(id, {state: "PUBLISHED"});
    if(result.affected){
      return await this.findById(id);
    }
    return null;
  }
}
