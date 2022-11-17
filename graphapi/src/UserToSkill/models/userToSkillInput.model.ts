
import { Optional } from '@nestjs/common';
import { Field, InputType, Int } from '@nestjs/graphql';


@InputType()
export class UserToSkillInput {
  @Field({nullable: true})
  userId?: string;

  @Field()
  skillId!: number;

  @Field(() => Int)
  compentencyLevel: number;
}
