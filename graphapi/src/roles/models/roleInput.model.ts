import { InputType, Field } from '@nestjs/graphql';
import { Skill } from 'src/skills/models/skill.model';
import { Column, OneToMany } from 'typeorm';
import { Role } from './role.model';

@InputType()
export class RoleInput extends Role {
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
  @OneToMany(() => Skill, (s) => s.role)
  skills: Skill[];
}
