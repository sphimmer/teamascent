import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Skill } from 'src/skills/models/skill.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
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
}

@ObjectType()
export class DeletedRoleResult {
  @Field()
  message: string;

  @Field()
  status: 'SUCCESS' | 'FAILED';
}
