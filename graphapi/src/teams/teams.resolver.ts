import { Args, Mutation, Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Position } from 'src/positions/models/position.model';
import { PositionsService } from 'src/positions/positions.service';
import { Team, TeamInput } from './models/team.model';
import { TeamsService } from './teams.service';

@Resolver((of: any) => Team)
export class TeamsResolver {
  constructor(
      private teamsService: TeamsService,
      private positionsService: PositionsService
      ) {}

  @Mutation((returns) => Team)
  async createTeam(@Args('teamInput') team: TeamInput) {
    return await this.teamsService.create(team);
  }

  @Query((returns) => Team, { name: 'team' })
  async getTeam(@Args('id') id: number) {
    const t = await this.teamsService.findById(id);
    return t
  }

  @Query((returns) => Team, { name: 'teams' })
  async getTeams(@Args('name', { nullable: true }) name: string) {
    if (name) {
      return await this.teamsService.search(name);
    }
    return await this.teamsService.findAll();
  }


  async deleteTeam() {}

  @Mutation((returns) => Team)
  async publishTeam(@Args('id') id: number) {
    return await this.teamsService.publishTeam(id);
  }

  @Mutation((returns) => Team)
  async updateTeam(@Args('id') id: number) {}

  @ResolveField('positions', (returns) => [Position])
  async skill(@Parent() team: Team) {
    return await this.positionsService.findByTeamId(team.id);
  }
}
