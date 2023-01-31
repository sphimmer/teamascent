import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Skill } from 'src/skills/models/skill.model';
import { User } from 'src/users/models/user.model';
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
@Index("user_skill_unique", ['userId', 'skillId'], {unique: true})
export class UserToSkill {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  userToSkillId: number;

  @Column()
  userId!: string;

  @Column()
  skillId!: number;

  @Field(() => Int)
  @Column()
  competencyLevel: number;

  @ManyToOne(() => User, (user) => user.skills)
  user!: User;

  @Field(() => Skill)
  @ManyToOne(() => Skill, (skill) => skill.userToSkill)
  skill!: Skill;
}
