import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { UserToSkill } from 'src/userToSkill/models/userToSkill.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
}

@InputType()
export class SkillInput extends Skill {
  @Field()
  name: string;
}
