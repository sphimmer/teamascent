import { BadRequestException, Injectable } from '@nestjs/common';
import { getRepository, ILike, Repository } from 'typeorm';
import { Position } from './models/position.model';


@Injectable()
export class PositionsService {
  private repository: Repository<Position>;
  constructor() {
    this.repository = getRepository(Position);
  }

  async save(position: Position): Promise<Position> {
    const savedPosition = await this.repository.save(position);
    return await this.findById(savedPosition.id)
  }

  async findAll(): Promise<Position[]> {
    return await this.repository.find();
  }

  async findById(id: number): Promise<Position> {
    return await this.repository.findOne(id, {relations: ["role", "team"]});
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete({ id: id });
    return result.affected > 0;
  }

  async findByTeamId(teamId: number): Promise<Position[]> {
    const result = await this.repository.find({where: { team: {id: teamId}}, relations: ["role", "user"]})
    return result
  }
}
