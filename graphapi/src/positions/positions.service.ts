import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { getConnection, getRepository, ILike, Repository, SaveOptions } from 'typeorm';
import { Position } from './models/position.model';


@Injectable()
export class PositionsService {
  private repository: Repository<Position>;
  constructor() {
    this.repository = getRepository(Position);
  }

  async save(position: Position): Promise<Position> {
    const savedPosition = await this.repository.save(position);
    return await this.findById(savedPosition.id, savedPosition.organization.id)
  }

  async update(position: Position, organizationId: string): Promise<Position> {
    const conn = getConnection()
    const qr = conn.createQueryRunner()
    await qr.connect()
    try {
      await qr.startTransaction()
      const foundP = await qr.manager.findOne(Position, position.id, {where: {organization: {id: organizationId}}})
      if(foundP){
        await qr.manager.save<Position>(position);
        await qr.commitTransaction();
        await qr.release();
        return await this.findById(position.id, organizationId)
      } else{
        throw new NotFoundException()
      }
    } catch (error) {
      await qr.rollbackTransaction();
      await qr.release()
      throw error
    }
  }

  async findAll(organizationId: string): Promise<Position[]> {
    return await this.repository.find({where: {organization: {id: organizationId}}, relations: ['role', 'team', 'user', "organization"]});
  }

  async findById(id: number, organizationId: string): Promise<Position> {
    return await this.repository.findOne(id, {relations: ["role", "team", "user", "organization"], where: {organization: {id: organizationId}}});
  }

  async delete(id: number, organizationId: string): Promise<boolean> {
    const result = await this.repository.delete({ id: id, organization: {id: organizationId} });
    return result.affected > 0;
  }

  async findByTeamId(teamId: number, organizationId: string): Promise<Position[]> {
    const result = await this.repository.find({where: { team: {id: teamId}, organization: {id: organizationId}}, relations: ["role", "user"]})
    return result
  }
}
