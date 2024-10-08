import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Organization } from "src/organizations/models/organization.model";
import { Role } from "src/roles/models/role.model";
import { Team } from "src/teams/models/team.model";
import { User } from "src/users/models/user.model";
import { Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Position{

    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @ManyToOne(()=>Role)
    @JoinColumn()
    @Field()
    role: Role

    // TODO: make manyToOne to allow for users to hold multiple positions or decide how a team of teams structure would work
    @OneToOne(() => User, {nullable: true})
    @JoinColumn()
    @Field({nullable: true})
    user?: User

    @Index()
    @ManyToOne(() => Team, (t) => t.positions)
    @Field(() => Team)
    team: Team

    @Field()
    @Index()
    @ManyToOne(() => Organization)
    organization: Organization
}

@InputType()
export class PositionInput{

    @Field()
    roleId: number;

    @Field()
    teamId: number;

    @Field({nullable: true})
    userId?: string;
}

@InputType()
export class PositionUpdate{

    @Field({nullable: true})
    roleId?: number;

    @Field({nullable: true})
    teamId?: number;

    @Field({nullable: true})
    userId?: string;
}