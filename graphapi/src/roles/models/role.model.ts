import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Organization } from 'src/organizations/models/organization.model';
import { Skill } from 'src/skills/models/skill.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Role {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column('text')
  description: string;

  @Field()
  @Column('text')
  responsibilities: string;

  @Field(() => [Skill])
  @ManyToMany(() => Skill)
  @JoinTable()
  skills: Skill[];

  @Field(() => String)
  @CreateDateColumn()
  createdDate: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedDate: Date;

    @Field()
    @ManyToOne(() => Organization)
  organization: Organization
}
