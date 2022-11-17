import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { DecodedJwt } from 'src/auth/models/auth.model';
import { Organization } from 'src/organizations/models/organization.model';
import { OrganizationsService } from 'src/organizations/organizations.service';
import { Position } from 'src/positions/models/position.model';
import { PositionsService } from 'src/positions/positions.service';
import { Team, TeamInput } from './models/team.model';
import { TeamsService } from './teams.service';

@Resolver((of: any) => Team)
export class TeamsResolver {
  constructor(
      private teamsService: TeamsService,
      private positionsService: PositionsService,
      private orgService: OrganizationsService,
      ) {}

  @Mutation((returns) => Team)
  @UseGuards(GqlAuthGuard)
  async createTeam(@Args('teamInput') team: TeamInput, @CurrentUser() jwtValues: DecodedJwt) {
    team.organization = new Organization()
    team.organization.id = jwtValues.organizationId;
    return await this.teamsService.create(team);
  }

  @Query((returns) => Team, { name: 'team' })
  @UseGuards(GqlAuthGuard)
  async getTeam(@Args('id') id: number, @CurrentUser() jwtValues: DecodedJwt) {
    const t = await this.teamsService.findById(id, jwtValues.organizationId);
    return t
  }

  @Query((returns) => [Team], { name: 'teams' })
  @UseGuards(GqlAuthGuard)
  async getTeams(@Args('name', { nullable: true }) name: string,  @CurrentUser() jwtValues: DecodedJwt) {
    if (name) {
      return await this.teamsService.search(name, jwtValues.organizationId);
    }
    const teams = await this.teamsService.findAll(jwtValues.organizationId);
    console.log(teams)
    return teams;
  }


  async deleteTeam() {}

  @Mutation((returns) => Team)
  @UseGuards(GqlAuthGuard)
  async publishTeam(@Args('id') id: number, @CurrentUser() jwtValues: DecodedJwt) {
    return await this.teamsService.publishTeam(id, jwtValues.organizationId);
  }

  @Mutation((returns) => Team)
  @UseGuards(GqlAuthGuard)
  async updateTeam(@Args('id') id: number) {}

  @ResolveField('positions', (returns) => [Position])
  async positions(@Parent() team: Team, @CurrentUser() jwtValues: DecodedJwt) {
    return await this.positionsService.findByTeamId(team.id, jwtValues.organizationId);
  }

  @ResolveField('organization', () => Organization)
  async organization(@Parent() team: Team): Promise<Organization>{
    return await this.orgService.findById(team.organization.id)
  }
}
