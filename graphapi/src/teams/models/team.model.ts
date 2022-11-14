import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Organization } from "src/organizations/models/organization.model";
import { Position } from "src/positions/models/position.model";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity()
export class Team {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @CreateDateColumn()
    createdDate: Date;
    
    @Field()
    @UpdateDateColumn()
    updatedDate: Date;

    @Field()
    @Column({default: "DRAFT"})
    state: string = 'DRAFT' || 'PUBLISHED';

    @OneToMany(()=> Position, (p) => p.team)
    @Field(() => Position)
    positions: Position[];

    @Field()
    @ManyToOne(() => Organization)
    organization: Organization
}

@InputType()
export class TeamInput extends Team{
    @Field()
    name: string;
}