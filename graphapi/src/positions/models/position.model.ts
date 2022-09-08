import { Field, InputType, ObjectType } from "@nestjs/graphql";
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

    @OneToOne(() => User, {nullable: true})
    @JoinColumn()
    @Field({nullable: true})
    user?: User

    @Index()
    @ManyToOne(() => Team, (t) => t.positions)
    @Field(() => Team)
    team: Team
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