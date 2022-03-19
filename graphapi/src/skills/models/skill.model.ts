import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Role } from 'src/roles/models/role.model';
import { UserToSkill } from 'src/UserToSkill/models/userToSkill.model';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Skill {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @OneToMany(() => UserToSkill, (uts) => uts.skill)
  userToSkill: UserToSkill;

  @ManyToOne(() => Role, (r) => r.skills)
  role: Role;
}

@InputType()
export class SkillInput extends Skill {
  @Field()
  name: string;
}
