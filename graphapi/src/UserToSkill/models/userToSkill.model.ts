import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Skill } from 'src/skills/models/skill.model';
import { User } from 'src/users/models/user.model';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class UserToSkill {
  @PrimaryGeneratedColumn()
  userToSkillId: number;

  @Column()
  userId!: string;

  @Column()
  skillId!: number;

  @Field(() => Int)
  @Column()
  compentencyLevel: number;

  @ManyToOne(() => User, (user) => user.skills)
  user!: User;

  @Field(() => Skill)
  @ManyToOne(() => Skill, (skill) => skill.userToSkill)
  skill!: Skill;
}
