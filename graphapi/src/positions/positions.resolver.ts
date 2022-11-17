import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  Position,
  PositionInput,
  PositionUpdate,
} from './models/position.model';
import { PositionsService } from './positions.service';
import { DeleteResult } from 'src/util/models/deleteResult.model';
import { Role } from 'src/roles/models/role.model';
import { User } from 'src/users/models/user.model';
import { Team } from 'src/teams/models/team.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import { DecodedJwt } from 'src/auth/models/auth.model';
import { Organization } from 'src/organizations/models/organization.model';
import { OrganizationsService } from 'src/organizations/organizations.service';

@Resolver((of: any) => Position)
export class PositionsResolver {
  constructor(private positionsService: PositionsService) {}

  @Mutation((returns) => Position)
  @UseGuards(GqlAuthGuard)
  async createPosition(
    @Args('position') position: PositionInput,
    @CurrentUser() jwtValues: DecodedJwt,
  ) {
    const p = new Position();
    p.role = new Role();
    p.team = new Team();
    p.role.id = position.roleId;
    p.team.id = position.teamId;
    p.organization = new Organization();
    p.organization.id = jwtValues.organizationId;

    if (position.userId) {
      p.user = new User();
      p.user.id = position.userId;
    }
    const saved = await this.positionsService.save(p);
    return saved;
  }

  @Query((returns) => Position, { name: 'position' })
  @UseGuards(GqlAuthGuard)
  async getPosition(
    @Args('id') id: number,
    @CurrentUser() jwtValues: DecodedJwt,
  ) {
    return await this.positionsService.findById(id, jwtValues.organizationId);
  }

  @Query((returns) => [Position], { name: 'positions' })
  @UseGuards(GqlAuthGuard)
  async getPositions(@CurrentUser() jwtValues: DecodedJwt) {
    return await this.positionsService.findAll(jwtValues.organizationId);
  }

  @Mutation((returns) => DeleteResult, { name: 'deleteSkill' })
  @UseGuards(GqlAuthGuard)
  async deletePosition(id: number, @CurrentUser() jwtValues: DecodedJwt) {
    return this.positionsService.delete(id, jwtValues.organizationId);
  }

  @Mutation((returns) => Position)
  @UseGuards(GqlAuthGuard)
  async updatePosition(
    @Args('id') id: number,
    @Args('position') position: PositionUpdate,
    @CurrentUser() jwtValues: DecodedJwt,
  ) {
    const p = new Position();
    p.id = id;
    if (position.roleId) {
      p.role = new Role();
      p.role.id = position.roleId;
    }

    if (position.teamId) {
      p.team = new Team();
      p.team.id = position.teamId;
    }

    if (position.userId) {
      p.user = new User();
      p.user.id = position.userId;
    }
    const updatedPostion = await this.positionsService.update(
      p,
      jwtValues.organizationId,
    );
    return updatedPostion;
  }

}
