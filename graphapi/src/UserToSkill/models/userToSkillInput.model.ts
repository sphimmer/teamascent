import { Field, InputType, Int } from '@nestjs/graphql';
import { UserToSkill } from './userToSkill.model';

@InputType()
export class UserToSkillInput extends UserToSkill {
  @Field()
  userId!: string;

  @Field()
  skillId!: number;

  @Field(() => Int)
  compentencyLevel: number;
}
