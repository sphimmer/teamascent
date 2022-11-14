import { Injectable, Logger } from "@nestjs/common";
import { getRepository, Repository } from "typeorm";
import { Organization } from "./models/organization.model";

@Injectable()
export class OrganizationsService {
    private repository: Repository<Organization>;
  constructor() {
    this.repository = getRepository(Organization);
  }

  async save(Organization: Organization): Promise<Organization> {
    return await this.repository.save(Organization);
  }

  async findAll(): Promise<Organization[]> {
    return await this.repository.find();
  }

  async findById(id: string): Promise<Organization> {
    return await this.repository.findOne(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete({ id: id });
    return result.affected > 0;
  }
}