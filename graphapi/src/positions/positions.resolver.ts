import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Position, PositionInput, PositionUpdate } from "./models/position.model";
import { PositionsService } from "./positions.service";
import { DeleteResult } from 'src/util/models/deleteResult.model';
import { Role } from "src/roles/models/role.model";
import { User } from "src/users/models/user.model";
import { Team } from "src/teams/models/team.model";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "src/auth/gql-auth.guard";


@Resolver((of: any) => Position)
export class PositionsResolver {
    constructor(
        private positionsService: PositionsService,
    ){}

    @Mutation(returns => Position)
    @UseGuards(GqlAuthGuard)
    async createPosition(@Args('position') position: PositionInput){
        const p = new Position()
        p.role = new Role()
        p.team = new Team()
        p.role.id = position.roleId
        p.team.id = position.teamId

        if (position.userId) {
            p.user = new User()
            p.user.id = position.userId
        }
        const saved = await this.positionsService.save(p)
        return await this.positionsService.findById(saved.id)
    }

    @Query((returns) => Position, {name: 'position'})
    @UseGuards(GqlAuthGuard)
    async getPosition(@Args("id") id: number){
        return await this.positionsService.findById(id);
    }

    @Mutation((returns) => DeleteResult, { name: "deleteSkill" })
    @UseGuards(GqlAuthGuard)
    async deletePosition(id: number){
        return this.positionsService.delete(id)
    }

    @Mutation(returns => Position)
    @UseGuards(GqlAuthGuard)
    async updatePosition(@Args('id') id: number, @Args('position') position: PositionUpdate){
        const p = new Position()
        p.id = id
        if (position.roleId) {
            p.role = new Role()
            p.role.id = position.roleId
        }

        if (position.teamId) {
            p.team = new Team()
            p.team.id = position.teamId
        }
        
        if (position.userId) {
            p.user = new User()
            p.user.id = position.userId
        }
        const updatedPostion = await this.positionsService.save(p)
        return updatedPostion
    }
}